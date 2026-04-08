import express from 'express';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

// @route   GET /api/assessments
// @desc    Get all assessments
router.get('/', async (req, res) => {
  try {
    const assessments = await prisma.assessment.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        difficulty: true,
        duration: true,
        badge: true,
        color: true,
        skills: true,
        avgScore: true,
        attempts: true,
        description: true,
        // Typically omit the 'questions' array when fetching the list so it loads faster
      }
    });
    res.json(assessments);
  } catch (error) {
    console.error('Fetch Assessments Error:', error);
    res.status(500).json({ message: 'Server error fetching assessments' });
  }
});

// @route   GET /api/assessments/:id
// @desc    Get a single assessment with questions
router.get('/:id', async (req, res) => {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' });
    
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching assessment' });
  }
});

export default router;
