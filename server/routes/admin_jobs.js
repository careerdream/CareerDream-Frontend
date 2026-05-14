import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const router = express.Router();

// GET /api/admin/jobs - List all jobs (with filters, pagination, sort)
router.get('/', async (req, res) => {
  try {
    const { status, company, search, page = 1, limit = 25, sort = 'recent' } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (company) where.company = { contains: company };
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { company: { contains: search } },
        { location: { contains: search } }
      ];
    }

    let orderBy = { posted_at: 'desc' };
    if (sort === 'salary_asc') orderBy = { salary: 'asc' };
    if (sort === 'salary_desc') orderBy = { salary: 'desc' };
    if (sort === 'popular') {
      orderBy = { stats: { applicants_count: 'desc' } };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const jobs = await prisma.job.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        stats: true,
        _count: { select: { appliedBy: true } }
      }
    });

    const total = await prisma.job.count({ where });

    res.json({
      jobs,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / take)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET /api/admin/jobs/export - Export jobs as CSV
router.get('/export', async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      include: { stats: true, _count: { select: { appliedBy: true } } }
    });
    
    let csv = 'ID,Title,Company,Location,Type,Status,Posted At,Views,Applications\n';
    jobs.forEach(j => {
      csv += `${j.id},"${j.title}","${j.company}","${j.location}","${j.type}","${j.status}",${j.posted_at},${j.stats?.views_count || 0},${j._count.appliedBy}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('jobs_export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// POST /api/admin/jobs/bulk-delete - Delete multiple jobs
router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    const numericIds = Array.isArray(ids) ? ids.map(id => parseInt(id)) : [];
    await prisma.job.deleteMany({
      where: { id: { in: numericIds } }
    });
    res.json({ message: 'Jobs deleted successfully' });
  } catch (error) {
    console.error('Bulk Delete Error:', error);
    res.status(500).json({ error: 'Bulk delete failed' });
  }
});

// GET /api/admin/jobs/:id - Get job details
router.get('/:id', async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { stats: true }
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// POST /api/admin/jobs - Create job
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    
    const newJob = await prisma.job.create({
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        salary: data.salary,
        type: data.type,
        experience: data.experience,
        logo: data.logo || '💼',
        description: data.description,
        aboutCompany: data.aboutCompany || '',
        category: data.category,
        skills: data.skills || [],
        responsibilities: data.responsibilities || [],
        requirements: data.requirements || [],
        niceToHave: data.niceToHave || [],
        benefits: data.benefits || [],
        featured: data.featured || false,
        urgent: data.urgent || false,
        posted: new Date().toLocaleDateString(),
        status: data.status || 'active',
        stats: {
          create: { views_count: 0, applicants_count: 0 }
        }
      }
    });
    res.json(newJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// PUT /api/admin/jobs/:id - Update job
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.job.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        salary: data.salary,
        type: data.type,
        experience: data.experience,
        logo: data.logo,
        description: data.description,
        aboutCompany: data.aboutCompany,
        category: data.category,
        skills: data.skills,
        responsibilities: data.responsibilities,
        requirements: data.requirements,
        niceToHave: data.niceToHave,
        benefits: data.benefits,
        featured: data.featured,
        urgent: data.urgent,
        status: data.status
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/admin/jobs/:id - Delete job
router.delete('/:id', async (req, res) => {
  try {
    await prisma.job.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// PUT /api/admin/jobs/:id/status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await prisma.job.update({
      where: { id: parseInt(req.params.id) },
      data: { status }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

// PUT /api/admin/jobs/:id/feature
router.put('/:id/feature', async (req, res) => {
  try {
    const { featured } = req.body;
    const updated = await prisma.job.update({
      where: { id: parseInt(req.params.id) },
      data: { featured }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Feature update failed' });
  }
});

// GET /api/admin/jobs/:id/applicants
router.get('/:id/applicants', async (req, res) => {
  try {
    const applicants = await prisma.jobApplication.findMany({
      where: { jobId: parseInt(req.params.id) },
      include: {
        user: {
          select: { id: true, name: true, email: true, location: true, skills: true }
        }
      },
      orderBy: { applied_at: 'desc' }
    });
    res.json(applicants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applicants' });
  }
});

// GET /api/admin/jobs/:id/analytics
router.get('/:id/analytics', async (req, res) => {
  try {
    const stats = await prisma.jobStats.findUnique({
      where: { jobId: parseInt(req.params.id) }
    });
    
    // Aggregate applications status
    const apps = await prisma.jobApplication.groupBy({
      by: ['status'],
      where: { jobId: parseInt(req.params.id) },
      _count: { id: true }
    });
    
    // Transform to expected format
    const statusDistribution = apps.reduce((acc, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 });

    res.json({
      views: stats?.views_count || 0,
      applications: stats?.applicants_count || 0,
      statusDistribution
    });
  } catch (error) {
    res.status(500).json({ error: 'Analytics failed' });
  }
});

export default router;
