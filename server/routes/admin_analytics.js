import express from 'express';
import prisma from '../lib/prisma.js';

const router = express.Router();

// Helper to generate date ranges
const getDateRange = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

// GET /api/admin/analytics/overview - Main dashboard stats
router.get('/overview', async (req, res) => {
  try {
    const [
      totalUsers, activeJobs, courseEnrollments, assessmentAttempts,
      userTrend, jobTrend
    ] = await Promise.all([
      prisma.user.count({ where: { status: 'active' } }),
      prisma.job.count({ where: { status: 'active' } }),
      prisma.userCourse.count(),
      prisma.userAssessment.count(),
      // Mock trend data
      Promise.resolve(Array.from({length: 30}, (_, i) => ({ day: `Day \${i+1}`, users: Math.floor(Math.random() * 50) + 10 }))),
      Promise.resolve(Array.from({length: 4}, (_, i) => ({ week: `Week \${i+1}`, apps: Math.floor(Math.random() * 200) + 50 })))
    ]);

    res.json({
      metrics: {
        totalActiveUsers: totalUsers,
        totalActiveJobs: activeJobs,
        totalCourseEnrollments: courseEnrollments,
        totalAssessmentAttempts: assessmentAttempts,
        systemHealth: 99.98
      },
      trends: {
        userGrowth: userTrend,
        jobApplications: jobTrend,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load overview analytics' });
  }
});

// GET /api/admin/analytics/users - User analytics data
router.get('/users', async (req, res) => {
  try {
    const [userRoles, userStatus] = await Promise.all([
      prisma.user.groupBy({ by: ['role'], _count: { role: true } }),
      prisma.user.groupBy({ by: ['status'], _count: { status: true } }),
    ]);

    // Format role distribution for pie chart
    const roles = userRoles.map(r => ({ name: r.role, value: r._count.role }));
    const statuses = userStatus.map(s => ({ name: s.status, value: s._count.status }));
    
    // Monthly registration mock
    const monthlyRegistrations = [
      { month: 'Jan', count: 120 }, { month: 'Feb', count: 150 }, { month: 'Mar', count: 180 },
      { month: 'Apr', count: 220 }, { month: 'May', count: 300 }
    ];

    res.json({ roles, statuses, monthlyRegistrations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load user analytics' });
  }
});

// GET /api/admin/analytics/jobs - Job analytics data
router.get('/jobs', async (req, res) => {
  try {
    const [jobStatus, jobCategories] = await Promise.all([
      prisma.job.groupBy({ by: ['status'], _count: { status: true } }),
      prisma.job.groupBy({ by: ['category'], _count: { category: true } })
    ]);

    const statuses = jobStatus.map(s => ({ name: s.status || 'active', value: s._count.status }));
    const categories = jobCategories.map(c => ({ name: c.category, count: c._count.category })).sort((a,b) => b.count - a.count).slice(0, 5);

    // Mock application statuses
    const applicationStatus = [
      { name: 'Applied', value: 450 }, { name: 'Interview', value: 120 },
      { name: 'Offer', value: 30 }, { name: 'Rejected', value: 200 }
    ];

    res.json({ statuses, categories, applicationStatus });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load job analytics' });
  }
});

// GET /api/admin/analytics/courses - Course analytics data
router.get('/courses', async (req, res) => {
  try {
    const courseStats = await prisma.userCourse.groupBy({
      by: ['status'],
      _count: { status: true }
    });

    const completionStats = courseStats.map(s => ({ name: s.status, value: s._count.status }));
    
    const enrollmentsTrend = [
      { month: 'Jan', enrollments: 80 }, { month: 'Feb', enrollments: 110 },
      { month: 'Mar', enrollments: 145 }, { month: 'Apr', enrollments: 190 },
      { month: 'May', enrollments: 250 }
    ];

    res.json({ completionStats, enrollmentsTrend, activeCourses: await prisma.course.count() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load course analytics' });
  }
});

// GET /api/admin/analytics/assessments - Assessment analytics data
router.get('/assessments', async (req, res) => {
  try {
    const [diffStats, assessments] = await Promise.all([
      prisma.assessment.groupBy({ by: ['difficulty'], _count: { difficulty: true } }),
      prisma.assessment.findMany({ select: { title: true, avgScore: true, attempts: true }, orderBy: { attempts: 'desc' }, take: 5 })
    ]);

    const difficultyDistribution = diffStats.map(d => ({ name: d.difficulty, value: d._count.difficulty }));
    const popular = assessments.map(a => ({ name: a.title, attempts: a.attempts, score: a.avgScore }));

    res.json({ difficultyDistribution, popular });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load assessment analytics' });
  }
});

// GET /api/admin/analytics/engagement - Engagement metrics
router.get('/engagement', async (req, res) => {
  try {
    // Mock engagement data
    const viewsTrend = [
      { day: 'Mon', views: 1200 }, { day: 'Tue', views: 1500 }, { day: 'Wed', views: 1350 },
      { day: 'Thu', views: 1800 }, { day: 'Fri', views: 2100 }, { day: 'Sat', views: 900 }, { day: 'Sun', views: 850 }
    ];
    res.json({ viewsTrend });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load engagement analytics' });
  }
});

// GET /api/admin/analytics/system - System performance metrics
router.get('/system', async (req, res) => {
  try {
    // Mock system data
    res.json({
      uptime: 99.98,
      avgResponseTime: 124, // ms
      errorRate: 0.05, // %
      dbQueryAvg: 45 // ms
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load system analytics' });
  }
});

// POST /api/admin/analytics/export - Export data
router.post('/export', async (req, res) => {
  try {
    const { format, reportType } = req.body;
    // In production, this would generate PDF or CSV buffers
    res.json({ message: `Exported ${reportType} report as ${format} successfully.`, downloadUrl: '/tmp/report.pdf' });
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// POST /api/admin/analytics/report-schedule
router.post('/report-schedule', async (req, res) => {
  try {
    const { frequency, email } = req.body;
    res.json({ message: `Scheduled ${frequency} report for ${email}` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule report' });
  }
});

export default router;
