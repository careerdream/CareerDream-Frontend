import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const router = express.Router();

// GET /api/admin/users - List all users (with filters, search, pagination)
router.get('/', async (req, res) => {
  try {
    const { role, status, search, page = 1, limit = 25, sort = 'joined_desc' } = req.query;
    
    const where = {};
    if (role && role !== 'all') where.role = role;
    if (status && status !== 'all') where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { location: { contains: search } }
      ];
    }

    let orderBy = { createdAt: 'desc' };
    if (sort === 'joined_asc') orderBy = { createdAt: 'asc' };
    if (sort === 'profile_desc') orderBy = { profileCompletion: 'desc' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const users = await prisma.user.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        location: true,
        profileCompletion: true,
        createdAt: true,
        loginHistory: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      }
    });

    const total = await prisma.user.count({ where });

    res.json({
      users,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / take)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/admin/users - Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;
    
    // In a real app, hash the password
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // In production, hash this!
        role: role || 'user',
        status: status || 'active',
        profileCompletion: 25 // Base completion
      }
    });
    
    const { password: _, ...safeUser } = user;
    res.status(201).json(safeUser);
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// GET /api/admin/users/export - Export users
router.get('/export', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, status: true, location: true, createdAt: true }
    });
    
    let csv = 'ID,Name,Email,Role,Status,Location,Joined At\n';
    users.forEach(u => {
      csv += `${u.id},"${u.name}","${u.email}","${u.role}","${u.status}","${u.location || ''}",${u.createdAt}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('users_export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// POST /api/admin/users/bulk-action
router.post('/bulk-action', async (req, res) => {
  try {
    const { ids, action, value } = req.body;
    const numericIds = Array.isArray(ids) ? ids.map(id => parseInt(id)) : [];

    if (action === 'delete') {
      await prisma.user.deleteMany({ where: { id: { in: numericIds } } });
    } else if (action === 'status') {
      await prisma.user.updateMany({ where: { id: { in: numericIds } }, data: { status: value } });
    } else if (action === 'role') {
      await prisma.user.updateMany({ where: { id: { in: numericIds } }, data: { role: value } });
    }
    res.json({ message: 'Bulk action applied successfully' });
  } catch (error) {
    console.error('Bulk Action Error:', error);
    res.status(500).json({ error: 'Bulk action failed' });
  }
});

// GET /api/admin/users/:id - Get user profile + details
router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        appliedJobs: { include: { job: { select: { title: true, company: true } } }, take: 5, orderBy: { applied_at: 'desc' } },
        enrolledCourses: { include: { course: { select: { title: true } } }, take: 5, orderBy: { timestamp: 'desc' } },
        testAssessments: { include: { assessment: { select: { title: true } } }, take: 5, orderBy: { timestamp: 'desc' } },
        certificates: { take: 5, orderBy: { issued_at: 'desc' } },
        _count: {
          select: { appliedJobs: true, enrolledCourses: true, testAssessments: true, savedJobs: true, certificates: true }
        }
      }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    // Hide password hash
    const { password, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// PUT /api/admin/users/:id - Update user details
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
        title: data.title,
        bio: data.bio,
        timezone: data.timezone,
        language: data.language,
        skills: data.skills
      }
    });
    const { password, ...safeUser } = updated;
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/admin/users/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// PUT /api/admin/users/:id/role
router.put('/:id/role', async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { role: req.body.role }
    });
    res.json({ message: 'Role updated', role: updated.role });
  } catch (error) {
    res.status(500).json({ error: 'Role update failed' });
  }
});

// PUT /api/admin/users/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const updated = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { status: req.body.status }
    });
    res.json({ message: 'Status updated', status: updated.status });
  } catch (error) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

// GET /api/admin/users/:id/login-history
router.get('/:id/login-history', async (req, res) => {
  try {
    const history = await prisma.loginHistory.findMany({
      where: { userId: parseInt(req.params.id) },
      orderBy: { timestamp: 'desc' },
      take: 10
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch login history' });
  }
});

// GET /api/admin/users/:id/activity
router.get('/:id/activity', async (req, res) => {
  try {
    const activity = await prisma.userActivity.findMany({
      where: { userId: parseInt(req.params.id) },
      orderBy: { timestamp: 'desc' },
      take: 20
    });
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity log' });
  }
});

// POST /api/admin/users/:id/send-message
router.post('/:id/send-message', async (req, res) => {
  try {
    // Simulated mail sender
    res.json({ message: 'Email sent successfully to user.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// POST /api/admin/users/:id/reset-password
router.post('/:id/reset-password', async (req, res) => {
  try {
    // Simulated mail sender for password reset
    res.json({ message: 'Password reset link sent to user.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send password reset' });
  }
});

export default router;
