import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { PrismaClient } = pkg;

// Load env vars
dotenv.config();

// Init Prisma SQL Client
const prisma = new PrismaClient();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load Routers
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import courseRoutes from './routes/courses.js';
import assessmentRoutes from './routes/assessments.js';

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assessments', assessmentRoutes);

// Serve specific API endpoints first
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerDream API is running!' });
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
