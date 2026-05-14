import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import prisma from '../lib/prisma.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = crypto.randomUUID();
    cb(null, `issue-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
  }
});

// POST /api/issues - Submit a new issue
router.post('/', upload.single('screenshot'), async (req, res) => {
  try {
    const { name, email, issue_title, issue_description } = req.body;
    
    if (!name || !email || !issue_title || !issue_description) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const screenshot_path = req.file ? `/uploads/${req.file.filename}` : null;

    const issue = await prisma.issue.create({
      data: {
        name,
        email,
        issue_title,
        issue_description,
        screenshot_path,
      }
    });

    res.status(201).json({ message: 'Your issue has been logged successfully. Our team will review it.', issue });
  } catch (error) {
    console.error('Error submitting issue:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET /api/issues - Admin view all issues
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const issues = await prisma.issue.findMany({
      orderBy: { timestamp: 'desc' }
    });
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// PUT /api/issues/:id/resolve - Admin mark issue as resolved
router.put('/:id/resolve', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const issue = await prisma.issue.update({
      where: { id: parseInt(id) },
      data: { status: 'resolved' }
    });
    res.json(issue);
  } catch (error) {
    console.error('Error resolving issue:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// DELETE /api/issues/:id - Admin delete issue
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.issue.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Issue deleted successfully.' });
  } catch (error) {
    console.error('Error deleting issue:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

export default router;
