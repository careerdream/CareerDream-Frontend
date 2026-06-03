import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import { formatPaginatedResponse } from '../utils/pagination.js';

const router = express.Router();

// GET /api/admin/assessments - List all assessments
router.get('/', async (req, res) => {
  try {
    const { status, category, difficulty, search, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (status && status !== 'all') where.status = status;
    if (category && category !== 'all') where.category = category;
    if (difficulty && difficulty !== 'all') where.difficulty = difficulty;
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { category: { contains: search } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const assessments = await prisma.assessment.findMany({
      where,
      skip,
      take,
      orderBy: { id: 'desc' }
    });

    const total = await prisma.assessment.count({ where });

    res.json(formatPaginatedResponse(assessments, total, page, limit));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assessments' });
  }
});

// POST /api/admin/assessments/bulk-delete
router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    await prisma.assessment.deleteMany({
      where: { id: { in: ids.map(id => parseInt(id)) } }
    });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Bulk delete failed' });
  }
});

// GET /api/admin/assessments/:id - Get assessment + questions
router.get('/:id', async (req, res) => {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });
    
    // Parse questions if they are stored as a JSON string
    if (typeof assessment.questions === 'string') {
      try { assessment.questions = JSON.parse(assessment.questions); } catch(e) {}
    }
    
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assessment' });
  }
});

// POST /api/admin/assessments - Create assessment
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newAssessment = await prisma.assessment.create({
      data: {
        title: data.title,
        category: data.category,
        difficulty: data.difficulty,
        duration: data.duration,
        badge: data.badge || '📝',
        color: data.color || 'bg-blue-500',
        skills: data.skills || [],
        description: data.description || '',
        questions: data.questions || [],
        status: data.status || 'draft',
        avgScore: 0,
        attempts: 0
      }
    });
    res.json(newAssessment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create assessment' });
  }
});

// PUT /api/admin/assessments/:id - Update assessment details
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.assessment.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title: data.title,
        category: data.category,
        difficulty: data.difficulty,
        duration: data.duration,
        badge: data.badge,
        color: data.color,
        skills: data.skills,
        description: data.description,
        status: data.status,
        questions: data.questions // If updating all questions at once
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/admin/assessments/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.assessment.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// GET /api/admin/assessments/:id/analytics
router.get('/:id/analytics', async (req, res) => {
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        userAttempts: true
      }
    });
    
    if (!assessment) return res.status(404).json({ error: 'Assessment not found' });

    const attemptsCount = assessment.userAttempts.length;
    const completedAttempts = assessment.userAttempts.filter(a => a.status === 'Completed' || a.completed_at);
    
    // Calculate passing rate (assuming 60% is passing)
    const passedCount = completedAttempts.filter(a => parseFloat(a.score) >= 60).length;
    const passRate = completedAttempts.length > 0 ? Math.round((passedCount / completedAttempts.length) * 100) : 0;

    res.json({
      totalAttempts: attemptsCount,
      averageScore: assessment.avgScore || 0,
      passRate: passRate,
      mostMissedQuestion: "Q14 - Data Structures", // Simulated
      avgTimeTaken: "18 mins", // Simulated
      completionRate: attemptsCount > 0 ? Math.round((completedAttempts.length / attemptsCount) * 100) : 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Analytics failed' });
  }
});

// POST /api/admin/assessments/:id/duplicate
router.post('/:id/duplicate', async (req, res) => {
  try {
    const existing = await prisma.assessment.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    
    if (!existing) return res.status(404).json({ error: 'Not found' });
    
    const duplicate = await prisma.assessment.create({
      data: {
        title: existing.title + ' (Copy)',
        category: existing.category,
        difficulty: existing.difficulty,
        duration: existing.duration,
        badge: existing.badge,
        color: existing.color,
        skills: existing.skills,
        description: existing.description,
        questions: existing.questions,
        status: 'draft',
        avgScore: 0,
        attempts: 0
      }
    });
    
    res.json(duplicate);
  } catch (error) {
    res.status(500).json({ error: 'Duplication failed' });
  }
});

export default router;
