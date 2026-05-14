import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// @route   GET /api/assessments
// @desc    Get all assessments (optimized: excludes full questions array)
router.get('/', async (req, res) => {
  try {
    const assessments = await prisma.assessment.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        difficulty: true,
        duration: true,
        badge: true,
        color: true,
        skills: true,
        avgScore: true,
        attempts: true,
        description: true,
        questions: true, // Still need it to calculate counts, but we'll remove it before sending
      }
    });

    const formatted = assessments.map(a => {
      const q = (Array.isArray(a.questions) ? a.questions : []);

      return {
        id: a.id,
        title: a.title,
        category: a.category,
        difficulty: a.difficulty,
        duration: a.duration,
        badge: a.badge,
        color: a.color,
        skills: a.skills,
        avgScore: a.avgScore,
        attempts: a.attempts,
        description: a.description,
        questionsCount: q.length,
        categoryCounts: {
          Easy: q.filter(x => x.difficulty === 'Easy').length,
          Medium: q.filter(x => x.difficulty === 'Medium').length,
          Hard: q.filter(x => x.difficulty === 'Hard').length,
        }
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error('Fetch Assessments Error:', error);
    res.status(500).json({ message: 'Server error fetching assessments' });
  }
});


// @route   GET /api/assessments/:id/leaderboard
// @desc    Get top scores for an assessment (real, persisted leaderboard)
// IMPORTANT: Must be before /:id to avoid route conflict
router.get('/:id/leaderboard', async (req, res) => {
  try {
    const assessmentId = parseInt(req.params.id);

    const entries = await prisma.userAssessment.findMany({
      where: {
        assessmentId,
        completed_at: { not: null },
      },
      include: {
        user: {
          select: { id: true, name: true, avatar: true }
        }
      },
      orderBy: { score: 'desc' },
      take: 50,
    });

    const leaderboard = entries.map((e, idx) => ({
      rank: idx + 1,
      userId: e.userId,
      userName: e.user.name,
      userAvatar: e.user.avatar || null,
      score: parseFloat(e.score.toString()),
      completedAt: e.completed_at,
    }));

    res.json(leaderboard);
  } catch (error) {
    console.error('Leaderboard Error:', error);
    res.status(500).json({ message: 'Server error fetching leaderboard' });
  }
});

// @route   GET /api/assessments/:id
// @desc    Get a single assessment with questions
router.get('/:id', async (req, res) => {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
    
    const q = assessment.questions || [];
    res.json({
      ...assessment,
      questionsCount: q.length,
      categoryCounts: {
        Easy: q.filter(x => x.difficulty === 'Easy').length,
        Medium: q.filter(x => x.difficulty === 'Medium').length,
        Hard: q.filter(x => x.difficulty === 'Hard').length,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching assessment' });
  }
});

// @route   PATCH /api/assessments/:id
// @desc    Update assessment difficulty
router.patch('/:id', async (req, res) => {
  try {
    const { difficulty } = req.body;
    const id = parseInt(req.params.id);

    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({ message: 'Invalid difficulty level. Use Easy, Medium, or Hard.' });
    }

    const updated = await prisma.assessment.update({
      where: { id },
      data: { difficulty },
    });

    res.json(updated);
  } catch (error) {
    console.error('Update Difficulty Error:', error);
    res.status(500).json({ message: 'Server error updating difficulty' });
  }
});

export default router;
