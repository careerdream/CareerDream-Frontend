import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from '@prisma/client';
import { performDatabaseSetup } from './utils/setup.js';
import { apiLimiter, authLimiter, testLimiter } from './middleware/rateLimiter.js';
import { securityHeaders } from './middleware/securityHeaders.js';
import { verifyToken, verifyAdmin } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PrismaClient } = pkg;

// Load env vars
dotenv.config();

// Init Prisma SQL Client
const prisma = new PrismaClient();

const app = express();

// Security Headers — must be applied first, before all other middleware
app.use(securityHeaders);

// Middleware - CORS configuration
const allowedOrigins = [
  'https://careerdream.in',
  'https://www.careerdream.in',
  'https://api.careerdream.in',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.careerdream.in')) {
      callback(null, true);
    } else {
      console.warn(`Origin ${origin} not allowed by CORS`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Apply general API rate limiting to all requests starting with /api
app.use('/api/', apiLimiter);

// Load Routers
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import courseRoutes from './routes/courses.js';
import assessmentRoutes from './routes/assessments.js';
import blogRoutes from './routes/blog.js';
import recruiterRoutes from './routes/recruiter.js';
import issuesRoutes from './routes/issues.js';
import activityRoutes from './routes/activity.js';
import adminRoutes from './routes/admin.js';
import adminJobRoutes from './routes/admin_jobs.js';
import adminCourseRoutes from './routes/admin_courses.js';
import adminAssessmentRoutes from './routes/admin_assessments.js';
import adminUserRoutes from './routes/admin_users.js';
import adminRecruiterRoutes from './routes/admin_recruiters.js';
import adminBlogRoutes from './routes/admin_blog.js';
import adminAnalyticsRoutes from './routes/admin_analytics.js';
import adminSettingsRoutes from './routes/admin_settings.js';
import adminBulkRoutes from './routes/admin_bulk.js';
import adminAdminsRoutes from './routes/admin_admins.js';
import resumeRoutes from './routes/resume.js';

// Apply stricter rate limiting to authentication routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/issues', issuesRoutes);
app.use('/api/activity', activityRoutes);
// Protected Admin Routes
app.use('/api/admin/jobs', verifyToken, verifyAdmin, adminJobRoutes);
app.use('/api/admin/courses', verifyToken, verifyAdmin, adminCourseRoutes);
app.use('/api/admin/assessments', verifyToken, verifyAdmin, adminAssessmentRoutes);
app.use('/api/admin/users', verifyToken, verifyAdmin, adminUserRoutes);
app.use('/api/admin/recruiters', verifyToken, verifyAdmin, adminRecruiterRoutes);
app.use('/api/admin/blog', verifyToken, verifyAdmin, adminBlogRoutes);
app.use('/api/admin/analytics', verifyToken, verifyAdmin, adminAnalyticsRoutes);
app.use('/api/admin/settings', verifyToken, verifyAdmin, adminSettingsRoutes);
app.use('/api/admin/bulk', verifyToken, verifyAdmin, adminBulkRoutes);
app.use('/api/admin/admins', verifyToken, verifyAdmin, adminAdminsRoutes);
app.use('/api/admin', verifyToken, verifyAdmin, adminRoutes);

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve specific API endpoints first
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerDream API is running!' });
});

// Dedicated endpoint for rate limiting testing
app.get('/api/test-limit', testLimiter, (req, res) => {
  res.json({ message: 'Success! You have not hit the rate limit yet.' });
});

app.get('/api/setup-db', async (req, res) => {
  const result = await performDatabaseSetup();
  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

// Serve React Frontend Production Build
app.use(express.static(path.join(__dirname, '../dist')));

// Any unknown route should fall back to React Router (for SPA navigation)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/api/health`);
});
