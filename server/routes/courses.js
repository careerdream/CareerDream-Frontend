import express from 'express';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json(courses);
  } catch (error) {
    console.error('Fetch Courses Error:', error);
    res.status(500).json({ message: 'Server error fetching courses' });
  }
});

// @route   GET /api/courses/:id
// @desc    Get a single course by ID
router.get('/:id', async (req, res) => {
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
