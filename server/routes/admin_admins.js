import express from 'express';
import pkg from '@prisma/client';
import bcrypt from 'bcryptjs';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

// ── DEFAULT ROLE PERMISSIONS ──────────────────────────────────────────────────
const DEFAULT_ROLES = [
  {
    roleName: 'super_admin',
    description: 'Full platform access. Can manage admins and system settings.',
    isDefault: true,
    permissions: {
      users:       { read: true, create: true, update: true, delete: true, ban: true, suspend: true },
      recruiters:  { read: true, create: true, update: true, delete: true, verify: true },
      jobs:        { read: true, create: true, update: true, delete: true, feature: true },
      courses:     { read: true, create: true, update: true, delete: true, publish: true },
      assessments: { read: true, create: true, update: true, delete: true, publish: true },
      blog:        { read: true, create: true, update: true, delete: true, publish: true, moderate: true },
      analytics:   { read: true },
      settings:    { read: true, update: true, execute: true },
      reports:     { read: true, create: true, export: true },
      admins:      { read: true, create: true, update: true, delete: true }
    }
  },
  {
    roleName: 'content_admin',
    description: 'Manage Courses, Assessments, Blog. No user or settings access.',
    isDefault: true,
    permissions: {
      courses:     { read: true, create: true, update: true, delete: true, publish: true },
      assessments: { read: true, create: true, update: true, delete: true, publish: true },
      blog:        { read: true, create: true, update: true, delete: true, publish: true, moderate: true },
      analytics:   { read: true }
    }
  },
  {
    roleName: 'job_admin',
    description: 'Manage Job Postings and Applications only.',
    isDefault: true,
    permissions: {
      jobs:      { read: true, create: true, update: true, delete: true, feature: true },
      analytics: { read: true }
    }
  },
  {
    roleName: 'user_support',
    description: 'Manage User Accounts. Cannot delete data or modify settings.',
    isDefault: true,
    permissions: {
      users:     { read: true, update: true, ban: true, suspend: true },
      analytics: { read: true }
    }
  },
  {
    roleName: 'recruiter_manager',
    description: 'Manage Recruiters, Verify, and view Job Postings.',
    isDefault: true,
    permissions: {
      recruiters: { read: true, update: true, verify: true },
      jobs:       { read: true }
    }
  },
  {
    roleName: 'analytics_admin',
    description: 'View-only access to Analytics and Reports.',
    isDefault: true,
    permissions: {
      analytics: { read: true },
      reports:   { read: true, export: true }
    }
  }
];

// ── SEED DEFAULT ROLES ────────────────────────────────────────────────────────
router.post('/seed-roles', async (req, res) => {
  try {
    for (const role of DEFAULT_ROLES) {
      await prisma.adminRole.upsert({
        where: { roleName: role.roleName },
        update: { description: role.description, permissions: role.permissions },
        create: role
      });
    }
    res.json({ message: `${DEFAULT_ROLES.length} default roles seeded successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Role seeding failed: ' + error.message });
  }
});

// ── ROLES ─────────────────────────────────────────────────────────────────────
router.get('/roles', async (req, res) => {
  try {
    const roles = await prisma.adminRole.findMany({
      include: { _count: { select: { admins: true } } },
      orderBy: { createdAt: 'asc' }
    });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

router.post('/roles', async (req, res) => {
  try {
    const { roleName, description, permissions } = req.body;
    const role = await prisma.adminRole.create({ data: { roleName, description, permissions } });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create role: ' + error.message });
  }
});

router.put('/roles/:id', async (req, res) => {
  try {
    const { description, permissions } = req.body;
    const role = await prisma.adminRole.update({
      where: { id: parseInt(req.params.id) },
      data: { description, permissions }
    });
    res.json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});

router.delete('/roles/:id', async (req, res) => {
  try {
    await prisma.adminRole.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Cannot delete role (may have assigned admins)' });
  }
});

// ── ADMINS ────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const { roleId, page = 1, limit = 25 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const adminProfiles = await prisma.adminProfile.findMany({
      where: { ...(roleId && { roleId: parseInt(roleId) }) },
      include: {
        role: true,
        // Join with User to get name/email
      },
      skip,
      take: parseInt(limit),
      orderBy: { invitedAt: 'desc' }
    });

    // Hydrate with User data
    const enriched = await Promise.all(adminProfiles.map(async profile => {
      const user = await prisma.user.findUnique({
        where: { id: profile.userId },
        select: { id: true, name: true, email: true, createdAt: true }
      });
      return { ...profile, user };
    }));

    const total = await prisma.adminProfile.count({ where: { ...(roleId && { roleId: parseInt(roleId) }) } });
    res.json({ admins: enriched, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admins' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, name, roleId, sendInvite } = req.body;

    // Check if user already exists
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const tempPassword = Math.random().toString(36).slice(-10);
      const hashed = await bcrypt.hash(tempPassword, 10);
      user = await prisma.user.create({
        data: { name: name || email.split('@')[0], email, password: hashed, role: 'admin' }
      });
    } else {
      await prisma.user.update({ where: { id: user.id }, data: { role: 'admin' } });
    }

    // Check no duplicate profile
    const existing = await prisma.adminProfile.findUnique({ where: { userId: user.id } });
    if (existing) return res.status(409).json({ error: 'This user is already an admin' });

    const profile = await prisma.adminProfile.create({
      data: { userId: user.id, roleId: parseInt(roleId) },
      include: { role: true }
    });

    await prisma.adminAuditLog.create({
      data: { action: 'create_admin', resourceType: 'admin', resourceId: String(user.id), adminEmail: 'system', changesAfter: { email, roleId } }
    });

    res.json({ profile, user: { id: user.id, email: user.email, name: user.name } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create admin: ' + error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const profile = await prisma.adminProfile.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { role: true }
    });
    if (!profile) return res.status(404).json({ error: 'Admin not found' });
    const user = await prisma.user.findUnique({ where: { id: profile.userId }, select: { id: true, name: true, email: true } });
    res.json({ ...profile, user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin' });
  }
});

router.put('/:id/role', async (req, res) => {
  try {
    const updated = await prisma.adminProfile.update({
      where: { id: parseInt(req.params.id) },
      data: { roleId: parseInt(req.body.roleId) },
      include: { role: true }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Role update failed' });
  }
});

router.put('/:id/permissions', async (req, res) => {
  try {
    const updated = await prisma.adminProfile.update({
      where: { id: parseInt(req.params.id) },
      data: { customPerms: req.body.permissions }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Permissions update failed' });
  }
});

router.put('/:id/status', async (req, res) => {
  try {
    const updated = await prisma.adminProfile.update({
      where: { id: parseInt(req.params.id) },
      data: { isActive: req.body.isActive }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const profile = await prisma.adminProfile.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!profile) return res.status(404).json({ error: 'Admin not found' });

    await prisma.adminProfile.delete({ where: { id: parseInt(req.params.id) } });
    // Downgrade user role back to 'user'
    await prisma.user.update({ where: { id: profile.userId }, data: { role: 'user' } });

    await prisma.adminAuditLog.create({
      data: { action: 'delete_admin', resourceType: 'admin', resourceId: String(profile.userId), adminEmail: 'system' }
    });

    res.json({ message: 'Admin removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed: ' + error.message });
  }
});

router.post('/:id/reset-password', async (req, res) => {
  try {
    const profile = await prisma.adminProfile.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!profile) return res.status(404).json({ error: 'Admin not found' });
    // Simulate reset email
    res.json({ message: 'Password reset email sent to admin' });
  } catch (error) {
    res.status(500).json({ error: 'Reset failed' });
  }
});

router.get('/:id/activity', async (req, res) => {
  try {
    const profile = await prisma.adminProfile.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!profile) return res.status(404).json({ error: 'Admin not found' });

    const logs = await prisma.adminAuditLog.findMany({
      where: { adminId: profile.userId },
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// ── AUDIT LOG ─────────────────────────────────────────────────────────────────
router.get('/audit-log', async (req, res) => {
  try {
    const { adminId, action, resourceType, page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      ...(adminId && { adminId: parseInt(adminId) }),
      ...(action && { action: { contains: action } }),
      ...(resourceType && { resourceType })
    };

    const [logs, total] = await Promise.all([
      prisma.adminAuditLog.findMany({ where, orderBy: { timestamp: 'desc' }, skip, take: parseInt(limit) }),
      prisma.adminAuditLog.count({ where })
    ]);

    res.json({ logs, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit log' });
  }
});

export default router;
