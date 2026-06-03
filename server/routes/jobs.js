import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import { cacheMiddleware } from '../utils/cache.js';
import { formatPaginatedResponse } from '../utils/pagination.js';

const router = express.Router();


// @route   GET /api/jobs
// @desc    Get all jobs (with optional employer filter)
router.get('/', cacheMiddleware(60), async (req, res) => {
  try {
    const { employerId, page = 1, limit = 20 } = req.query;
    const where = {};
    if (employerId) {
      where.employerId = parseInt(employerId);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const jobs = await prisma.job.findMany({
      where,
      include: {
        employer: true,
        stats: true
      },
      orderBy: { id: 'desc' },
      skip,
      take
    });

    const total = await prisma.job.count({ where });

    res.json(formatPaginatedResponse(jobs, total, page, limit));
  } catch (error) {
    console.error('Fetch Jobs Error:', error);
    res.status(500).json({ message: 'Server error fetching jobs' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID (and increment view count)
router.get('/:id', cacheMiddleware(60), async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { 
        employer: true,
        stats: true,
        detailedSkills: true
      }
    });
    
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Increment view count in JobStats
    try {
      await prisma.jobStats.upsert({
        where: { jobId },
        create: { jobId, views_count: 1 },
        update: { views_count: { increment: 1 } }
      });
    } catch (e) {
      console.warn('Failed to increment job views', e);
    }
    
    res.json(job);
  } catch (error) {
    console.error('Fetch Job Error:', error);
    res.status(500).json({ message: 'Server error fetching job' });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job (Admin or Recruiter)
router.post('/', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    if (!user || (user.role !== 'admin' && user.role !== 'recruiter')) {
      return res.status(403).json({ message: 'Unauthorized to post jobs' });
    }

    const {
      title, company, location, salary, type, experience, logo, category,
      posted, description, aboutCompany, skills, responsibilities,
      requirements, niceToHave, benefits, featured, urgent
    } = req.body;

    if (!title || !company || !location || !salary || !type || !experience || !category || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newJob = await prisma.job.create({
      data: {
        title, company, location, salary, type, experience,
        logo: logo || '💼',
        category,
        posted: posted || 'Just now',
        description,
        aboutCompany: aboutCompany || '',
        skills: skills || [],
        responsibilities: responsibilities || [],
        requirements: requirements || [],
        niceToHave: niceToHave || [],
        benefits: benefits || [],
        featured: featured || false,
        urgent: urgent || false,
        employerId: user.employerId // Link to employer if recruiter
      }
    });

    res.status(201).json({ message: 'Job posting created successfully', job: newJob });
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(500).json({ message: 'Server error creating job posting' });
  }
});

// @route   POST /api/jobs/bulk
// @desc    Bulk create jobs
router.post('/bulk', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    if (!user || (user.role !== 'admin' && user.role !== 'recruiter')) {
      return res.status(403).json({ message: 'Unauthorized to post jobs' });
    }

    const jobsData = req.body.jobs;
    if (!Array.isArray(jobsData) || jobsData.length === 0) {
      return res.status(400).json({ message: 'Invalid jobs data' });
    }

    const createdJobs = await prisma.job.createMany({
      data: jobsData.map(job => ({
        title: job.title,
        company: job.company || job.companyName || 'Unknown Company',
        location: job.location || 'Remote',
        salary: String(job.salaryMin && job.salaryMax ? `₹${job.salaryMin} - ₹${job.salaryMax}` : job.salary || 'Negotiable'),
        type: job.locationType || job.type || 'Full-time',
        experience: job.experienceLevel || job.experience || 'Fresher',
        category: job.category || 'Technology',
        description: job.description || '',
        aboutCompany: job.aboutCompany || '',
        skills: Array.isArray(job.skills) ? job.skills : [],
        logo: job.logo || '💼',
        posted: 'Just now',
        employerId: user.employerId
      }))
    });

    res.status(201).json({ message: `Successfully created ${createdJobs.count} jobs`, count: createdJobs.count });
  } catch (error) {
    console.error('Bulk Job Creation Error:', error);
    res.status(500).json({ message: 'Server error during bulk job creation' });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply for a job (and increment applicant count)
router.post('/:id/apply', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const userId = parseInt(req.user.id);

    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Record application in JobApplication model
    await prisma.jobApplication.upsert({
      where: { userId_jobId: { userId, jobId } },
      create: { userId, jobId, status: 'Applied' },
      update: { applied_at: new Date() }
    });

    // Increment applicants count in JobStats
    try {
      await prisma.jobStats.upsert({
        where: { jobId },
        create: { jobId, applicants_count: 1 },
        update: { applicants_count: { increment: 1 } }
      });
    } catch (e) {
      console.warn('Failed to increment applicants count', e);
    }

    res.json({ message: 'Application successful' });
  } catch (error) {
    console.error('Apply Job Error:', error);
    res.status(500).json({ message: 'Server error during application' });
  }
});

// @route   POST /api/jobs/:id/save
// @desc    Toggle save job
router.post('/:id/save', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const userId = parseInt(req.user.id);

    // Check if already saved
    const existing = await prisma.savedJob.findUnique({
      where: { userId_jobId: { userId, jobId } }
    });

    if (existing) {
      // Unsave
      await prisma.savedJob.delete({
        where: { id: existing.id }
      });
      res.json({ message: 'Job unsaved', saved: false });
    } else {
      // Save
      await prisma.savedJob.create({
        data: { userId, jobId }
      });
      res.json({ message: 'Job saved', saved: true });
    }
  } catch (error) {
    console.error('Save Job Error:', error);
    res.status(500).json({ message: 'Server error saving job' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Permission check: Admin or the Recruiter who belongs to the employer
    if (user.role !== 'admin' && job.employerId !== user.employerId) {
      return res.status(403).json({ message: 'Unauthorized to delete this job' });
    }

    await prisma.job.delete({ where: { id: jobId } });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete Job Error:', error);
    res.status(500).json({ message: 'Server error deleting job' });
  }
});

export default router;
