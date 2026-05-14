import express from 'express';
// Note: In a real app, you would import a role-checking middleware here.
// import { checkRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/admin/dashboard/stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    // In a real app, these would be Prisma DB queries:
    // const totalUsers = await prisma.user.count();
    
    // Returning dummy data as per requirements
    res.json({
      totalUsers: 12450,
      activeRecruiters: 342,
      totalJobs: 1856,
      totalCourses: 45,
      totalAssessments: 120,
      totalBlogs: 89,
      systemHealth: "99.9%"
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET /api/admin/dashboard/activity
router.get('/dashboard/activity', async (req, res) => {
  try {
    const activities = [
      { id: '1', action: 'approved a new recruiter account for Microsoft.', user: 'Admin Sarah', timestamp: '10 mins ago', type: 'success' },
      { id: '2', action: 'deleted a fraudulent job posting (ID: #4059).', user: 'Admin Mike', timestamp: '25 mins ago', type: 'warning' },
      { id: '3', action: 'published a new blog post "Career Trends 2026".', user: 'Admin Sarah', timestamp: '1 hour ago', type: 'info' },
      { id: '4', action: 'updated the Python Programming assessment.', user: 'Admin John', timestamp: '3 hours ago', type: 'info' },
      { id: '5', action: 'resolved User Report #1029.', user: 'Admin Mike', timestamp: '4 hours ago', type: 'success' },
      { id: '6', action: 'banned user account (violation of ToS).', user: 'Admin Sarah', timestamp: '5 hours ago', type: 'warning' },
    ];
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity log' });
  }
});

// GET /api/admin/dashboard/charts/user-growth
router.get('/dashboard/charts/user-growth', async (req, res) => {
  try {
    const data = [
      { date: 'Apr 12', users: 11200 },
      { date: 'Apr 17', users: 11450 },
      { date: 'Apr 22', users: 11800 },
      { date: 'Apr 27', users: 12050 },
      { date: 'May 02', users: 12150 },
      { date: 'May 07', users: 12300 },
      { date: 'May 12', users: 12450 },
    ];
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user growth data' });
  }
});

// GET /api/admin/dashboard/charts/job-applications
router.get('/dashboard/charts/job-applications', async (req, res) => {
  try {
    const data = [
      { day: 'Mon', apps: 120 },
      { day: 'Tue', apps: 250 },
      { day: 'Wed', apps: 340 },
      { day: 'Thu', apps: 280 },
      { day: 'Fri', apps: 390 },
      { day: 'Sat', apps: 150 },
      { day: 'Sun', apps: 90 },
    ];
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch application data' });
  }
});

export default router;
