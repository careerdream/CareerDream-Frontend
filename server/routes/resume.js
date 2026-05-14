import express from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken } from '../middleware/auth.js';
import { calculateMatchScore } from '../utils/matchingEngine.js';
import { analyzeResume } from '../utils/resumeScorer.js';
import { analyzeSkillGaps, getTrendingSkills, prioritizeLearningPath } from '../utils/skillGapAnalyzer.js';

const router = express.Router();

/**
 * ============================================
 * RESUME MANAGEMENT ENDPOINTS
 * ============================================
 */

/**
 * GET /api/resume/current
 * Get user's current resume data
 */
router.get('/current', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    
    // Get user with resume data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        skills: true,
        resumeUploaded: true,
        resumeAnalyses: {
          take: 1,
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      success: true,
      user: {
        ...user,
        skills: user.skills || []
      }
    });
  } catch (error) {
    console.error('Fetch current resume error:', error);
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
});

/**
 * POST /api/resume/save-skills
 * Save extracted skills from uploaded resume
 */
router.post('/save-skills', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const { skills, yearsOfExperience, education } = req.body;
    
    if (!skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'Invalid skills data' });
    }
    
    // Update user with resume data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        skills: skills,
        resumeUploaded: true
      }
    });
    
    // Log activity
    await prisma.userActivity.create({
      data: {
        userId,
        action: 'resume_skills_saved',
        details: JSON.stringify({ skillCount: skills.length, yearsOfExperience })
      }
    });
    
    res.json({
      success: true,
      message: 'Skills saved successfully',
      user: {
        id: updatedUser.id,
        skills: updatedUser.skills || []
      }
    });
  } catch (error) {
    console.error('Save skills error:', error);
    res.status(500).json({ error: 'Failed to save skills' });
  }
});

/**
 * ============================================
 * RESUME ANALYSIS ENDPOINTS
 * ============================================
 */

/**
 * POST /api/resume/analyze
 * Analyze resume quality and provide scoring
 */
router.post('/analyze', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const { resumeData } = req.body;
    
    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data required' });
    }
    
    // Analyze resume
    const analysis = analyzeResume(resumeData);
    
    // Save analysis to database
    const saved = await prisma.resumeAnalysis.create({
      data: {
        userId,
        overallScore: analysis.overallScore,
        details: analysis,
        createdAt: new Date()
      }
    });
    
    // Log activity
    await prisma.userActivity.create({
      data: {
        userId,
        action: 'resume_analyzed',
        details: JSON.stringify({ score: analysis.overallScore, level: analysis.scoreLevel })
      }
    });
    
    res.json({
      success: true,
      analysis: {
        ...analysis,
        analysisId: saved.id
      }
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

/**
 * GET /api/resume/analysis-history
 * Get past resume analyses
 */
router.get('/analysis-history', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const { limit = 10, offset = 0 } = req.query;
    
    const analyses = await prisma.resumeAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      skip: parseInt(offset),
      select: {
        id: true,
        overallScore: true,
        details: true,
        createdAt: true
      }
    });
    
    res.json({
      success: true,
      analyses,
      count: analyses.length
    });
  } catch (error) {
    console.error('Fetch analysis history error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

/**
 * ============================================
 * JOB MATCHING ENDPOINTS
 * ============================================
 */

/**
 * POST /api/resume/match-jobs
 * Calculate matches for all available jobs with advanced scoring
 */
router.post('/match-jobs', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const { limit = 20, offset = 0, sortBy = 'matchScore' } = req.body;
    
    // Get user profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        skills: true,
        location: true,
        title: true
      }
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get jobs
    const jobs = await prisma.job.findMany({
      take: parseInt(limit),
      skip: parseInt(offset),
      orderBy: { id: 'desc' }
    });
    
    // Calculate match scores
    const matches = jobs.map(job => {
      const matchData = calculateMatchScore(user, job);
      
      return {
        jobId: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        type: job.type,
        matchScore: matchData.matchScore,
        matchBreakdown: matchData.breakdown,
        matchedSkills: matchData.matchedSkills,
        missingSkills: matchData.missingSkills,
        matchConfidence: matchData.matchConfidence,
        recommendation: matchData.recommendation,
        bonusPoints: matchData.bonusPoints
      };
    });
    
    // Sort matches
    const sortedMatches = matches.sort((a, b) => {
      if (sortBy === 'matchScore') return b.matchScore - a.matchScore;
      if (sortBy === 'salary') return (parseInt(b.salary) || 0) - (parseInt(a.salary) || 0);
      return b.matchScore - a.matchScore;
    });
    
    // Save top match to database
    if (sortedMatches.length > 0) {
      const topMatch = sortedMatches[0];
      await prisma.precisionJobMatch.upsert({
        where: {
          userId_jobId: { userId, jobId: topMatch.jobId }
        },
        create: {
          userId,
          jobId: topMatch.jobId,
          matchScore: topMatch.matchScore,
          details: topMatch
        },
        update: {
          matchScore: topMatch.matchScore,
          details: topMatch
        }
      });
    }
    
    res.json({
      success: true,
      matches: sortedMatches,
      totalMatches: sortedMatches.length
    });
  } catch (error) {
    console.error('Job matching error:', error);
    res.status(500).json({ error: 'Matching failed' });
  }
});

/**
 * GET /api/resume/match/:jobId
 * Get detailed match analysis for specific job
 */
router.get('/match/:jobId', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const jobId = parseInt(req.params.jobId);
    
    // Get user and job
    const [user, job] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: { skills: true, location: true, title: true }
      }),
      prisma.job.findUnique({
        where: { id: jobId }
      })
    ]);
    
    if (!user || !job) {
      return res.status(404).json({ error: 'User or job not found' });
    }
    
    // Calculate detailed match
    const matchData = calculateMatchScore(user, job);
    
    res.json({
      success: true,
      jobId,
      jobTitle: job.title,
      company: job.company,
      ...matchData
    });
  } catch (error) {
    console.error('Fetch match details error:', error);
    res.status(500).json({ error: 'Failed to fetch match details' });
  }
});

/**
 * ============================================
 * SKILL GAP ENDPOINTS
 * ============================================
 */

/**
 * GET /api/resume/skill-gaps/:jobId
 * Analyze skill gaps and get recommended courses
 */
router.get('/skill-gaps/:jobId', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const jobId = parseInt(req.params.jobId);
    
    // Get user and job
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { skills: true }
    });
    
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });
    
    if (!user || !job) {
      return res.status(404).json({ error: 'User or job not found' });
    }
    
    // Get all courses
    const courses = await prisma.course.findMany();
    
    // Analyze skill gaps
    const resumeData = { skills: user.skills || [] };
    const gapAnalysis = analyzeSkillGaps(resumeData, job, courses);
    
    // Get trending skills for this job
    const trendingSkills = getTrendingSkills(job);
    
    // Prioritize learning
    const prioritizedSkills = prioritizeLearningPath(
      gapAnalysis.missingSkills.critical,
      courses
    );
    
    res.json({
      success: true,
      gapAnalysis,
      trendingSkills,
      prioritizedSkills
    });
  } catch (error) {
    console.error('Skill gap analysis error:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

/**
 * GET /api/resume/trending-skills/:jobId
 * Get trending skills for a job
 */
router.get('/trending-skills/:jobId', async (req, res) => {
  try {
    const jobId = parseInt(req.params.jobId);
    
    const job = await prisma.job.findUnique({
      where: { id: jobId }
    });
    
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    
    const trendingSkills = getTrendingSkills(job);
    
    res.json({
      success: true,
      jobId,
      trendingSkills
    });
  } catch (error) {
    console.error('Fetch trending skills error:', error);
    res.status(500).json({ error: 'Failed to fetch trending skills' });
  }
});

/**
 * ============================================
 * STATISTICS ENDPOINTS
 * ============================================
 */

/**
 * GET /api/resume/stats
 * Get user's resume statistics
 */
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    
    const [analysisCount, matchCount, activities] = await Promise.all([
      prisma.resumeAnalysis.count({ where: { userId } }),
      prisma.precisionJobMatch.count({ where: { userId } }),
      prisma.userActivity.findMany({
        where: { 
          userId,
          action: { contains: 'resume' }
        },
        orderBy: { timestamp: 'desc' },
        take: 10
      })
    ]);
    
    res.json({
      success: true,
      stats: {
        analysesPerformed: analysisCount,
        jobsMatched: matchCount,
        recentActivities: activities
      }
    });
  } catch (error) {
    console.error('Fetch stats error:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
