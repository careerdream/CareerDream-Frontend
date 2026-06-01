import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import prisma from '../lib/prisma.js';

const router = express.Router();

router.use(verifyToken, verifyAdmin);

// POST /api/admin/playground/bulk
router.post('/bulk', async (req, res) => {
  try {
    const { problems } = req.body;
    if (!Array.isArray(problems)) {
      return res.status(400).json({ message: 'Problems must be an array' });
    }

    let added = 0;
    let updated = 0;

    for (const prob of problems) {
      const pData = {
        title: prob.title,
        slug: prob.slug,
        category: prob.category,
        difficulty: prob.difficulty,
        points: prob.points || 10,
        description: prob.description,
        constraints: prob.constraints,
        inputFormat: prob.inputFormat,
        outputFormat: prob.outputFormat,
        editorial: prob.editorial,
      };

      const created = await prisma.codingProblem.upsert({
        where: { slug: prob.slug },
        update: pData,
        create: pData,
      });

      // Handle tags manually
      if (prob.tags && Array.isArray(prob.tags)) {
        await prisma.codingProblemTag.deleteMany({ where: { problemId: created.id } });
        await prisma.codingProblemTag.createMany({
          data: prob.tags.map(name => ({ problemId: created.id, name }))
        });
      }

      // Handle stubs manually
      if (prob.stubs && typeof prob.stubs === 'object') {
        await prisma.codingProblemStub.deleteMany({ where: { problemId: created.id } });
        await prisma.codingProblemStub.createMany({
          data: Object.entries(prob.stubs).map(([language, code]) => ({ problemId: created.id, language, code }))
        });
      }

      if (prob.testCases && Array.isArray(prob.testCases)) {
        await prisma.testCase.deleteMany({ where: { problemId: created.id } });
        for (const tc of prob.testCases) {
          await prisma.testCase.create({ 
            data: { 
              problemId: created.id, 
              input: tc.input, 
              expected: tc.expected, 
              isSample: tc.isSample 
            } 
          });
        }
      }
      added++;
    }

    res.json({ message: `Successfully processed ${added} problems.`, added });
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ message: 'Failed to process bulk upload', error: error.message });
  }
});

export default router;
