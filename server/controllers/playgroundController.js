import prisma from '../lib/prisma.js';
import { sandboxExecute } from '../services/sandboxExecutor.js';

// GET /api/playground/problems
export const getProblems = async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 20 } = req.query;
    const where = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;
    if (search) where.title = { contains: search };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [problems, total] = await Promise.all([
      prisma.codingProblem.findMany({
        where,
        select: {
          id: true, title: true, slug: true, category: true,
          difficulty: true, points: true, tags: { select: { name: true } },
          _count: { select: { submissions: true } },
        },
        orderBy: [{ difficulty: 'asc' }, { id: 'asc' }],
        skip,
        take: parseInt(limit),
      }),
      prisma.codingProblem.count({ where }),
    ]);

    const formattedProblems = problems.map(p => ({
      ...p,
      tags: p.tags ? p.tags.map(t => t.name) : []
    }));

    res.json({
      problems: formattedProblems,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) {
    console.error('getProblems error:', err);
    res.status(500).json({ message: 'Failed to fetch problems' });
  }
};

// GET /api/playground/problems/:slug
export const getProblemBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const problem = await prisma.codingProblem.findUnique({
      where: { slug },
      include: {
        testCases: { where: { isSample: true }, select: { id: true, input: true, expected: true } },
        stubs: true,
        tags: true,
      },
    });
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    
    // Map relations back to JSON format for frontend compatibility
    const stubsObj = {};
    if (problem.stubs) {
      problem.stubs.forEach(stub => {
        stubsObj[stub.language] = stub.code;
      });
    }
    
    const formattedProblem = {
      ...problem,
      tags: problem.tags ? problem.tags.map(t => t.name) : [],
      stubs: stubsObj
    };

    res.json(formattedProblem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch problem' });
  }
};

// POST /api/playground/submit
export const submitCode = async (req, res) => {
  try {
    const problemSlug = req.params.slug || req.body.problemSlug;
    const { language } = req.body;
    const code = req.body.code || req.body.sourceCode;
    const userId = req.user.id;

    if (!problemSlug || !language || !code) {
      return res.status(400).json({ message: 'problemSlug (or slug param), language and code (or sourceCode) are required' });
    }

    const problem = await prisma.codingProblem.findUnique({
      where: { slug: problemSlug },
      include: { testCases: true },
    });
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    const startTime = Date.now();
    let passedCount = 0;
    let status = 'ACCEPTED';
    let errorMessage = null;
    let lastRuntime = 0;
    let lastMemory = 0;

    for (const tc of problem.testCases) {
      const result = await sandboxExecute({ code, language, input: tc.input });
      lastRuntime = result.runtime || 0;
      lastMemory = result.memory || 0;

      if (result.status === 'TIME_LIMIT_EXCEEDED') { status = 'TIME_LIMIT_EXCEEDED'; errorMessage = 'Time limit exceeded'; break; }
      if (result.status === 'COMPILE_ERROR') { status = 'COMPILE_ERROR'; errorMessage = result.error; break; }
      if (result.status === 'RUNTIME_ERROR') { status = 'RUNTIME_ERROR'; errorMessage = result.error; break; }

      let actual = (result.output || '').replace(/\r\n/g, '\n').trim();
      const expected = (tc.expected || '').replace(/\r\n/g, '\n').trim();
      
      // Normalize Python booleans
      if (actual === 'True') actual = 'true';
      if (actual === 'False') actual = 'false';

      if (actual === expected) {
        passedCount++;
      } else {
        status = 'WRONG_ANSWER';
        errorMessage = `Expected: ${expected}\nGot: ${actual}`;
        break;
      }
    }

    const totalTime = Date.now() - startTime;
    const correctness = problem.testCases.length > 0 
      ? (passedCount / problem.testCases.length) * 100 
      : 0;

    // Save submission
    const submission = await prisma.codeSubmission.create({
      data: {
        userId,
        problemId: problem.id,
        language,
        code,
        status,
        runtime: lastRuntime,
        memory: lastMemory,
        errorMessage,
        passedCount,
        totalCount: problem.testCases.length,
        correctness,
      },
    });

    // Update user progress
    const solved = status === 'ACCEPTED';
    await prisma.userCodeProgress.upsert({
      where: { userId_problemId: { userId, problemId: problem.id } },
      update: {
        attempts: { increment: 1 },
        solved: solved ? true : undefined,
        pointsEarned: solved ? problem.points : undefined,
      },
      create: {
        userId,
        problemId: problem.id,
        solved,
        attempts: 1,
        pointsEarned: solved ? problem.points : 0,
      },
    });

    res.json({
      submissionId: submission.id,
      status,
      passedCount,
      totalCount: problem.testCases.length,
      correctness,
      runtime: lastRuntime,
      memory: lastMemory,
      errorMessage,
    });
  } catch (err) {
    console.error('submitCode error:', err);
    res.status(500).json({ message: 'Submission failed', error: err.message });
  }
};

// GET /api/playground/submission/:id
export const getSubmissionResult = async (req, res) => {
  try {
    const sub = await prisma.codeSubmission.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { problem: { select: { title: true, slug: true } } },
    });
    if (!sub) return res.status(404).json({ message: 'Submission not found' });
    if (sub.userId !== req.user.id) return res.status(403).json({ message: 'Access denied' });
    res.json(sub);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submission' });
  }
};

// GET /api/playground/submissions?slug=...
export const getUserSubmissions = async (req, res) => {
  try {
    const { slug } = req.query;
    const where = { userId: req.user.id };
    if (slug) {
      const problem = await prisma.codingProblem.findUnique({ where: { slug } });
      if (problem) where.problemId = problem.id;
    }
    const subs = await prisma.codeSubmission.findMany({
      where,
      orderBy: { submittedAt: 'desc' },
      take: 50,
      include: { problem: { select: { title: true, slug: true, difficulty: true } } },
    });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};

// GET /api/playground/progress
export const getUserProgress = async (req, res) => {
  try {
    const progress = await prisma.userCodeProgress.findMany({
      where: { userId: req.user.id },
      include: { problem: { select: { title: true, slug: true, category: true, difficulty: true, points: true } } },
    });
    const totalPoints = progress.reduce((s, p) => s + (p.pointsEarned || 0), 0);
    const solved = progress.filter(p => p.solved).length;
    res.json({ progress, totalPoints, solved });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch progress' });
  }
};

// GET /api/playground/leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const rows = await prisma.userCodeProgress.groupBy({
      by: ['userId'],
      where: { solved: true },
      _sum: { pointsEarned: true },
      _count: { problemId: true },
      orderBy: { _sum: { pointsEarned: 'desc' } },
      take: 50,
    });

    const userIds = rows.map(r => r.userId);
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, avatar: true, title: true },
    });

    const leaderboard = rows.map((row, i) => {
      const user = users.find(u => u.id === row.userId);
      return {
        rank: i + 1,
        user,
        points: row._sum.pointsEarned || 0,
        solved: row._count.problemId,
      };
    });

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};
