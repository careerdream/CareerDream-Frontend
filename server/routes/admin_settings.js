import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import { formatPaginatedResponse } from '../utils/pagination.js';

const router = express.Router();

// Helper to log audit events
const logAudit = async (adminId, action, category, details, before = null, after = null) => {
  try {
    await prisma.systemAuditLog.create({
      data: {
        adminId,
        action,
        category,
        details,
        beforeValue: before ? JSON.stringify(before) : null,
        afterValue: after ? JSON.stringify(after) : null,
      }
    });
  } catch (e) {
    console.error("Audit log failed:", e);
  }
};

// GET /api/admin/settings - Get all settings categorized
router.get('/', async (req, res) => {
  try {
    const settings = await prisma.systemSetting.findMany();
    
    // Group by category
    const categorized = settings.reduce((acc, curr) => {
      if (!acc[curr.category]) acc[curr.category] = {};
      acc[curr.category][curr.settingKey] = curr.value;
      return acc;
    }, {});

    res.json(categorized);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// GET /api/admin/settings/:category - Get settings by category
router.get('/:category', async (req, res) => {
  try {
    const settings = await prisma.systemSetting.findMany({
      where: { category: req.params.category }
    });
    
    const mapped = settings.reduce((acc, curr) => {
      acc[curr.settingKey] = curr.value;
      return acc;
    }, {});

    res.json(mapped);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT /api/admin/settings/:category - Update settings for a category
router.put('/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const updates = req.body; // e.g. { "platformName": "CareerDream", "forceHttps": true }
    
    // Admin context (Mocking ID 1 for now)
    const adminId = req.user?.id || 1; 

    // Fetch existing for audit
    const existing = await prisma.systemSetting.findMany({
      where: { category, settingKey: { in: Object.keys(updates) } }
    });
    const beforeState = existing.reduce((acc, curr) => ({...acc, [curr.settingKey]: curr.value}), {});

    // Upsert each setting
    for (const [key, value] of Object.entries(updates)) {
      await prisma.systemSetting.upsert({
        where: { settingKey: key },
        update: { value, category, updatedBy: adminId },
        create: { settingKey: key, value, category, updatedBy: adminId }
      });
    }

    await logAudit(adminId, 'Update Settings', category, `Updated \${Object.keys(updates).length} settings`, beforeState, updates);

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// POST /api/admin/settings/test-email
router.post('/test-email', async (req, res) => {
  try {
    const { to } = req.body;
    // Simulate sending email
    await logAudit(req.user?.id || 1, 'Test Email', 'email', `Sent test email to \${to}`);
    res.json({ message: 'Test email dispatched successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

// POST /api/admin/settings/backup
router.post('/backup', async (req, res) => {
  try {
    // Simulate database backup
    await logAudit(req.user?.id || 1, 'Manual Backup', 'data', 'Triggered full database backup');
    res.json({ message: 'Backup triggered successfully', url: '/backups/db_backup_latest.sql' });
  } catch (error) {
    res.status(500).json({ error: 'Backup failed' });
  }
});

// GET /api/admin/settings/audit-log
router.get('/audit-log', async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const logs = await prisma.systemAuditLog.findMany({
      orderBy: { timestamp: 'desc' },
      skip,
      take: parseInt(limit)
    });
    
    const total = await prisma.systemAuditLog.count();
    res.json(formatPaginatedResponse(logs, total, page, limit));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit log' });
  }
});

// GET /api/admin/settings/audit-log/export - Export audit logs
router.get('/audit-log/export', async (req, res) => {
  try {
    const logs = await prisma.systemAuditLog.findMany({
      orderBy: { timestamp: 'desc' }
    });
    
    let csv = 'ID,Timestamp,AdminID,Action,Category,Details,Before,After\n';
    logs.forEach(l => {
      csv += `${l.id},${l.timestamp},${l.adminId},"${l.action}","${l.category}","${(l.details || '').replace(/"/g, '""')}","${(l.beforeValue || '').replace(/"/g, '""')}","${(l.afterValue || '').replace(/"/g, '""')}"\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('system_audit_logs.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// POST /api/admin/settings/reset
router.post('/reset', async (req, res) => {
  try {
    const { category } = req.body;
    if (category) {
      await prisma.systemSetting.deleteMany({ where: { category } });
    } else {
      await prisma.systemSetting.deleteMany();
    }
    await logAudit(req.user?.id || 1, 'Reset Settings', category || 'all', 'Reset settings to defaults');
    res.json({ message: 'Settings reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Reset failed' });
  }
});

export default router;
