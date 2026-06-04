import express from 'express';
import multer from 'multer';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import { PrismaClient } from '@prisma/client';
import { parseResumeWithAI, matchJobsAndAnalyzeGaps } from '../services/aiService.js';
import { verifyToken as auth } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}).single('resume');

// Wrapper to handle multer errors gracefully
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error('Multer Error:', err);
      return res.status(400).json({ success: false, message: 'File upload error: ' + err.message });
    } else if (err) {
      console.error('Unknown Upload Error:', err);
      return res.status(500).json({ success: false, message: 'Unknown upload error: ' + err.message });
    }
    next();
  });
};

// @route   POST /api/resume/analyze
// @desc    Upload and analyze resume using OpenRouter AI
// @access  Public (temporarily for testing)
router.post('/analyze', uploadMiddleware, async (req, res) => {
  try {
    console.log('Received file:', req.file ? req.file.originalname : 'No file');
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a file' });
    }

    let resumeText = '';

    // Extract text based on file type
    if (req.file.mimetype === 'application/pdf') {
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text;
    } else if (req.file.mimetype === 'text/plain' || req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Very basic text extraction fallback for docx
      resumeText = req.file.buffer.toString('utf8');
    } else {
      return res.status(400).json({ success: false, message: 'Unsupported file type. Please upload a PDF or TXT.' });
    }

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Could not extract text from the file' });
    }

    console.log('Text extracted, sending to AI...');

    // Parse resume with OpenRouter AI
    const resumeDetails = await parseResumeWithAI(resumeText);
    
    console.log('AI parsing complete, matching jobs...');

    // Match jobs and analyze gaps
    const matchResults = await matchJobsAndAnalyzeGaps(resumeDetails.skills);

    // Provide some insights based on skills
    const careerInsights = resumeDetails.skills.length > 0 
      ? [{ category: 'Software Engineering', level: 'Mid-Level', icon: '💻' }]
      : [];

    // Optionally save the analysis in DB if user is authenticated
    if (req.user && req.user.id) {
      await prisma.resumeAnalysis.create({
        data: {
          userId: req.user.id,
          match_score: matchResults.length > 0 ? matchResults[0].matchScore : 0,
          analysis_report: JSON.stringify({ resumeDetails, matchResults })
        }
      });
      
      // Update user profile to indicate resume was uploaded
      await prisma.user.update({
        where: { id: req.user.id },
        data: { resumeUploaded: true, skills: resumeDetails.skills }
      });
    }

    console.log('Analysis complete. Sending response.');

    res.json({
      success: true,
      resumeDetails,
      matchResults,
      careerInsights
    });

  } catch (err) {
    console.error('Resume Analysis Error:', err);
    res.status(500).json({ success: false, message: err.message || 'Server Error during analysis' });
  }
});

export default router;
