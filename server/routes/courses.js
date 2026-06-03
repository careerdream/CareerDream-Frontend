import express from 'express';
import prisma from '../lib/prisma.js';
import { cacheMiddleware } from '../utils/cache.js';
import { formatPaginatedResponse } from '../utils/pagination.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
router.get('/', cacheMiddleware(60), async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const courses = await prisma.course.findMany({
      skip,
      take
    });
    const total = await prisma.course.count();

    res.json(formatPaginatedResponse(courses, total, page, limit));
  } catch (error) {
    console.error('Fetch Courses Error:', error);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get a single course by ID
router.get('/:id', cacheMiddleware(60), async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    
    if (!course) return res.status(404).json({ message: 'Course not found' });
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching course' });
  }
});

export default router;
