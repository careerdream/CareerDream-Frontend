import express from 'express';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await prisma.job.findMany();
    res.json(jobs);
  } catch (error) {
    console.error('Fetch Jobs Error:', error);
    res.status(500).json({ message: 'Server error fetching jobs' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching job' });
  }
});

export default router;
