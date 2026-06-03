import express from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken } from '../middleware/auth.js';
import redisClient from '../lib/redis.js';

const router = express.Router();

/**
 * @route   POST /api/activity
 * @desc    Record user actions (likes, comments, job saves)
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const { type, articleId, jobId, commentText, action } = req.body;
    const userId = parseInt(req.user.id);

    let result;

    switch (type) {
      case 'like':
        if (!articleId) return res.status(400).json({ error: 'Article ID required' });
        
        const targetArticle = await prisma.blogPost.findUnique({ where: { id: parseInt(articleId) } });
        if (!targetArticle) return res.status(404).json({ error: 'Article not found in database' });

        // Since we are moving to aggregate counts in Redis to avoid DB load, 
        // we'll just increment. If Redis is down, we fallback to DB update.
        if (redisClient.isReady) {
          const newCount = await redisClient.incr(`article:likes:${articleId}`);
          // Note: We don't track 'isLiked' state here because it's purely aggregate
          result = { liked: true, likeCount: newCount + targetArticle.likesCount };
        } else {
          // Fallback to direct DB update if Redis is unavailable
          await prisma.blogPost.update({
            where: { id: parseInt(articleId) },
            data: { likesCount: { increment: 1 } }
          });
          result = { liked: true, likeCount: targetArticle.likesCount + 1 };
        }
        break;

      case 'comment':
        if (!articleId || !commentText) return res.status(400).json({ error: 'Article ID and text required' });
        const commentArticle = await prisma.blogPost.findUnique({ where: { id: parseInt(articleId) } });
        if (!commentArticle) return res.status(404).json({ error: 'Article not found in database' });

        result = await prisma.comment.create({
          data: {
            userId,
            articleId: parseInt(articleId),
            comment_text: commentText,
          },
        });
        break;

      case 'save_job':
        if (!jobId) return res.status(400).json({ error: 'Job ID required' });
        const job = await prisma.job.findUnique({ where: { id: parseInt(jobId) } });
        if (!job) return res.status(404).json({ error: 'Job not found in database' });

        result = await prisma.savedJob.upsert({
          where: { userId_jobId: { userId, jobId: parseInt(jobId) } },
          create: { userId, jobId: parseInt(jobId) },
          update: {}, // Already saved
        });
        break;

      case 'generic':
        if (!action) return res.status(400).json({ error: 'Action name required' });
        result = await prisma.userActivity.create({
          data: {
            userId,
            action,
            details: JSON.stringify(req.body.details || {}),
          },
        });
        break;

      default:
        return res.status(400).json({ error: 'Invalid activity type' });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Activity Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Failed to record activity' });
  }
});

/**
 * @route   POST /api/activity/assessment
 * @desc    Record assessment progress or completion
 */
router.post('/assessment', verifyToken, async (req, res) => {
  try {
    const { assessmentId, score, progress, completed } = req.body;
    const userId = parseInt(req.user.id);

    const result = await prisma.userAssessment.create({
      data: {
        userId,
        assessmentId: parseInt(assessmentId),
        score: score || 0,
        progress: progress || 'started',
        completed_at: completed ? new Date() : null,
      },
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Assessment Record Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});

/**
 * @route   POST /api/activity/resume-analysis
 * @desc    Store AI resume match results
 */
router.post('/resume-analysis', verifyToken, async (req, res) => {
  try {
    const { matchScore, report } = req.body;
    const userId = parseInt(req.user.id);

    const result = await prisma.resumeAnalysis.create({
      data: {
        userId,
        match_score: matchScore,
        analysis_report: report,
      },
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Resume Analysis Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});

/**
 * @route   PUT /api/activity/settings
 * @desc    Update user preferences
 */
router.put('/settings', verifyToken, async (req, res) => {
  try {
    const { settings } = req.body; // Expecting { key: value, ... }
    const userId = parseInt(req.user.id);

    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ error: 'Settings object required' });
    }

    const updates = Object.entries(settings).map(([key, value]) => {
      return prisma.userSetting.upsert({
        where: { userId_preference_key: { userId, preference_key: key } },
        create: { userId, preference_key: key, preference_value: String(value) },
        update: { preference_value: String(value), updated_at: new Date() },
      });
    });

    await Promise.all(updates);
    res.json({ success: true, message: 'Settings updated' });
  } catch (error) {
    console.error('Settings Update Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});

/**
 * @route   POST /api/activity/course
 * @desc    Enroll or update course status
 */
router.post('/course', verifyToken, async (req, res) => {
  try {
    const { courseId, status } = req.body;
    const userId = parseInt(req.user.id);

    const result = await prisma.userCourse.upsert({
      where: { userId_courseId: { userId, courseId: parseInt(courseId) } },
      create: { userId, courseId: parseInt(courseId), status: status || 'Enrolled' },
      update: { 
        status: status || 'Enrolled', 
        completed_at: status === 'Completed' ? new Date() : null 
      },
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Course Activity Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});

/**
 * @route   POST /api/activity/certificate
 * @desc    Add a user certificate
 */
router.post('/certificate', verifyToken, async (req, res) => {
  try {
    const { name, authority, issuedAt, expiryDate } = req.body;
    const userId = parseInt(req.user.id);

    const result = await prisma.userCertificate.create({
      data: {
        userId,
        certificate_name: name,
        issuing_authority: authority,
        issued_at: issuedAt ? new Date(issuedAt) : new Date(),
        expiry_date: expiryDate ? new Date(expiryDate) : null,
      },
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Certificate Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});

/**
 * @route   POST /api/activity/skills
 * @desc    Update user skill proficiency
 */
router.post('/skills', verifyToken, async (req, res) => {
  try {
    const { skillName, level } = req.body;
    const userId = parseInt(req.user.id);

    const result = await prisma.userSkill.upsert({
      where: { userId_skill_name: { userId, skill_name: skillName } },
      create: { userId, skill_name: skillName, proficiency_level: parseInt(level) },
      update: { proficiency_level: parseInt(level), updated_at: new Date() },
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Skill Update Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});

/**
 * @route   GET /api/activity/summary
 * @desc    Get user's history and preferences (Enhanced for new dashboard)
 */
router.get('/summary', verifyToken, async (req, res) => {
  try {
    const userId = parseInt(req.user.id);

    const [settings, savedJobs, applications, courses, certificates, skills, rank, trajectory, analyses] = await Promise.all([
      prisma.userSetting.findMany({ where: { userId } }),
      prisma.savedJob.findMany({ where: { userId }, include: { job: true } }),
      prisma.jobApplication.findMany({ where: { userId }, include: { job: true } }),
      prisma.userCourse.findMany({ where: { userId }, include: { course: true } }),
      prisma.userCertificate.findMany({ where: { userId } }),
      prisma.userSkill.findMany({ where: { userId } }),
      prisma.userRank.findUnique({ where: { userId } }),
      prisma.userGrowthTrajectory.findMany({ where: { userId }, orderBy: { recorded_at: 'desc' }, take: 10 }),
      prisma.resumeAnalysis.findMany({ where: { userId }, orderBy: { created_at: 'desc' } }),
    ]);

    res.json({
      settings: settings.reduce((acc, s) => ({ ...acc, [s.preference_key]: s.preference_value }), {}),
      savedJobs,
      applications,
      courses,
      certificates,
      skills,
      rank,
      trajectory,
      resumeAnalyses: analyses,
    });
  } catch (error) {
    console.error('Activity Summary Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});

export default router;
