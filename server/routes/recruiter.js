import express from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   GET /api/recruiter/candidates
 * @desc    Search for candidates (Admins/Recruiters)
 */
router.get('/candidates', verifyToken, async (req, res) => {
  try {
    const { skill, location, title } = req.query;
    
    // Build filter
    const where = {
      role: 'user' // Only search users, not admins
    };
    
    if (location) {
      where.location = { contains: location };
    }
    
    if (title) {
      where.title = { contains: title };
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        title: true,
        location: true,
        avatar: true,
        skills: true,
        profileCompletion: true,
        resumeUploaded: true,
        testResults: true,
        createdAt: true
      }
    });

    // Client-side skill filtering if skill provided (since skills is Json)
    let filteredUsers = users;
    if (skill) {
      const searchSkill = String(skill).toLowerCase();
      filteredUsers = users.filter(u => {
        const skillsArray = Array.isArray(u.skills) ? u.skills : [];
        return skillsArray.some(s => String(s).toLowerCase().includes(searchSkill));
      });
    }

    res.json(filteredUsers);
  } catch (error) {
    console.error('Candidate Search Error:', error);
    res.status(500).json({ message: 'Server error searching candidates' });
  }
});

export default router;
