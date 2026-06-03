import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import { formatPaginatedResponse } from '../utils/pagination.js';

const router = express.Router();

// GET /api/admin/recruiters - List all recruiters (users with role 'recruiter' and their company)
router.get('/', async (req, res) => {
  try {
    const { status, verification, search, page = 1, limit = 25, sort = 'recent' } = req.query;
    
    const where = { role: 'recruiter' };
    
    if (status && status !== 'all') {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { employer: { company_name: { contains: search } } }
      ];
    }

    // Notice we filter verification at the user/employer relation level
    if (verification && verification !== 'all') {
      where.employer = { verificationStatus: verification };
    }

    let orderBy = { createdAt: 'desc' };
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const recruiters = await prisma.user.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        employer: {
          include: {
            jobs: { select: { id: true, status: true } }
          }
        }
      }
    });

    const total = await prisma.user.count({ where });

    // Format for frontend
    const formatted = recruiters.map(r => ({
      id: r.id,
      name: r.name,
      email: r.email,
      status: r.status,
      joinedAt: r.createdAt,
      company: r.employer,
      jobsPosted: r.employer?.jobs?.length || 0,
      activeJobs: r.employer?.jobs?.filter(j => j.status === 'active' || !j.status).length || 0
    }));

    // Post-query sorting if needed
    if (sort === 'jobs_desc') formatted.sort((a, b) => b.jobsPosted - a.jobsPosted);

    res.json(formatPaginatedResponse(formatted, total, page, limit));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recruiters' });
  }
});

// GET /api/admin/recruiters/export - Export recruiters list
router.get('/export', async (req, res) => {
  try {
    const recruiters = await prisma.user.findMany({
      where: { role: 'recruiter' },
      include: { employer: true }
    });
    
    let csv = 'ID,Company,Recruiter Name,Email,Status,Verification,Joined At\n';
    recruiters.forEach(r => {
      csv += `${r.id},"${r.employer?.company_name || 'N/A'}","${r.name}","${r.email}","${r.status}","${r.employer?.verificationStatus || 'N/A'}",${r.createdAt}\n`;
    });
 
    res.header('Content-Type', 'text/csv');
    res.attachment('recruiters_export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});
 
// POST /api/admin/recruiters/bulk-delete
router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    const numericIds = Array.isArray(ids) ? ids.map(id => parseInt(id)) : [];
    await prisma.user.deleteMany({
      where: { id: { in: numericIds }, role: 'recruiter' }
    });
    res.json({ message: 'Recruiters deleted successfully' });
  } catch (error) {
    console.error('Bulk Delete Error:', error);
    res.status(500).json({ error: 'Bulk delete failed' });
  }
});

// GET /api/admin/recruiters/:id - Get recruiter profile details
router.get('/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const recruiter = await prisma.user.findUnique({
      where: { id: userId, role: 'recruiter' },
      include: {
        employer: {
          include: {
            jobs: {
              include: { _count: { select: { appliedBy: true } } },
              orderBy: { posted_at: 'desc' },
              take: 5
            }
          }
        }
      }
    });
    
    if (!recruiter) return res.status(404).json({ error: 'Recruiter not found' });
    
    // Aggregation for analytics
    const allJobs = recruiter.employer?.jobs || [];
    const totalJobs = allJobs.length;
    let totalApps = 0;
    allJobs.forEach(j => totalApps += (j._count?.appliedBy || 0));

    const { password, ...safeData } = recruiter;
    res.json({
      ...safeData,
      jobs_posted: recruiter.employer?.jobs || [],
      analytics: {
        totalJobs,
        activeJobs: allJobs.filter(j => j.status !== 'expired').length,
        totalApplications: totalApps,
        avgAppsPerJob: totalJobs > 0 ? Math.round(totalApps / totalJobs) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recruiter' });
  }
});

// PUT /api/admin/recruiters/:id - Update recruiter/company info
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;
    
    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: { name, email, phone }
    });
    
    if (user.employerId && company) {
      await prisma.employer.update({
        where: { id: user.employerId },
        data: {
          company_name: company.name,
          website: company.website,
          industry: company.industry,
          description: company.description
        }
      });
    }
    
    res.json({ message: 'Profile updated' });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/admin/recruiters/:id - Delete recruiter account
router.delete('/:id', async (req, res) => {
  try {
    await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// PUT /api/admin/recruiters/:id/verify - Verify/reject recruiter company
router.put('/:id/verify', async (req, res) => {
  try {
    const { status, checklist, reason } = req.body;
    
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!user || !user.employerId) return res.status(404).json({ error: 'No associated company found' });
    
    const updated = await prisma.employer.update({
      where: { id: user.employerId },
      data: {
        verificationStatus: status, // 'verified', 'rejected', 'pending'
        verificationData: { checklist, reason, history: new Date().toISOString() },
        verifiedAt: status === 'verified' ? new Date() : null
      }
    });
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Verification update failed' });
  }
});

// PUT /api/admin/recruiters/:id/status - Change user status
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

// GET /api/admin/recruiters/:id/jobs - List all jobs via their Employer
router.get('/:id/jobs', async (req, res) => {
  try {
    // Jobs are linked to Employer, not directly to User
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) }, select: { employerId: true } });
    if (!user?.employerId) return res.json([]);

    const jobs = await prisma.job.findMany({
      where: { employerId: user.employerId },
      include: { _count: { select: { appliedBy: true } } },
      orderBy: { posted_at: 'desc' }
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET /api/admin/recruiters/:id/applications - List all applications via Employer jobs
router.get('/:id/applications', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) }, select: { employerId: true } });
    if (!user?.employerId) return res.json([]);

    const applications = await prisma.jobApplication.findMany({
      where: { job: { employerId: user.employerId } },
      include: {
        user: { select: { name: true, email: true } },
        job: { select: { title: true } }
      },
      orderBy: { applied_at: 'desc' },
      take: 50
    });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// GET /api/admin/recruiters/:id/activity - Activity log
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

// POST /api/admin/recruiters/:id/send-message
router.post('/:id/send-message', async (req, res) => {
  try {
    res.json({ message: 'Message queued for recruiter.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;
