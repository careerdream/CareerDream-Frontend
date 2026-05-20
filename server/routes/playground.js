import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { playgroundLimiter } from '../middleware/rateLimiter.js';
import {
  getProblems,
  getProblemBySlug,
  submitCode,
  getSubmissionResult,
  getUserSubmissions,
  getUserProgress,
  getLeaderboard,
} from '../controllers/playgroundController.js';

const router = express.Router();

// Public routes — no auth required
router.get('/problems', getProblems);
router.get('/problems/:slug', getProblemBySlug);
router.get('/leaderboard', getLeaderboard);

// Protected routes — require JWT
router.post('/submit', verifyToken, playgroundLimiter, submitCode);
router.post('/submit/:slug', verifyToken, playgroundLimiter, submitCode);
router.get('/submission/:id', verifyToken, getSubmissionResult);
router.get('/submissions', verifyToken, getUserSubmissions);
router.get('/progress', verifyToken, getUserProgress);

export default router;
