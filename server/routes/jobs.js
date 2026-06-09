import express from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import { cacheMiddleware } from '../utils/cache.js';
import { formatPaginatedResponse } from '../utils/pagination.js';
import { generateJobPost, evaluateCandidatesForJob } from '../services/aiService.js';

const router = express.Router();


// @route   POST /api/jobs/generate
// @desc    Generate a job posting using AI
router.post('/generate', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true }
    });

    if (!user || (user.role !== 'admin' && user.role !== 'recruiter')) {
      return res.status(403).json({ message: 'Unauthorized to use AI generation' });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const generatedJob = await generateJobPost(prompt);
    res.json(generatedJob);
  } catch (error) {
    console.error('Job Generation Error:', error);
    res.status(500).json({ message: error.message || 'Failed to generate job using AI' });
  }
});

// @route   GET /api/jobs

// @desc    Get all jobs (with optional employer filter)
router.get('/', cacheMiddleware(60), async (req, res) => {
  try {
    const { employerId, page = 1, limit = 20 } = req.query;
    const where = {};
    if (employerId) {
      where.employerId = parseInt(employerId);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const jobs = await prisma.job.findMany({
      where,
      include: {
        employer: true,
        stats: true
      },
      orderBy: { id: 'desc' },
      skip,
      take
    });

    const total = await prisma.job.count({ where });

    res.json(formatPaginatedResponse(jobs, total, page, limit));
  } catch (error) {
    console.error('Fetch Jobs Error:', error);
    res.status(500).json({ message: 'Server error fetching jobs' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get a single job by ID (and increment view count)
router.get('/:id', cacheMiddleware(60), async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { 
        employer: true,
        stats: true,
        detailedSkills: true
      }
    });
    
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Increment view count in JobStats
    try {
      await prisma.jobStats.upsert({
        where: { jobId },
        create: { jobId, views_count: 1 },
        update: { views_count: { increment: 1 } }
      });
    } catch (e) {
      console.warn('Failed to increment job views', e);
    }
    
    res.json(job);
  } catch (error) {
    console.error('Fetch Job Error:', error);
    res.status(500).json({ message: 'Server error fetching job' });
  }
});

// @route   POST /api/jobs
// @desc    Create a new job (Admin or Recruiter)
router.post('/', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    if (!user || (user.role !== 'admin' && user.role !== 'recruiter')) {
      return res.status(403).json({ message: 'Unauthorized to post jobs' });
    }

    const {
      title, company, location, salary, type, experience, logo, category,
      posted, description, aboutCompany, skills, responsibilities,
      requirements, niceToHave, benefits, featured, urgent, status
    } = req.body;

    if (!title || !company || !location || !salary || !type || !experience || !category || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newJob = await prisma.job.create({
      data: {
        title, company, location, salary, type, experience,
        logo: logo || '💼',
        category,
        posted: posted || 'Just now',
        description,
        aboutCompany: aboutCompany || '',
        skills: skills || [],
        responsibilities: responsibilities || [],
        requirements: requirements || [],
        niceToHave: niceToHave || [],
        benefits: benefits || [],
        featured: featured || false,
        urgent: urgent || false,
        status: status || 'active',
        employerId: user.employerId // Link to employer if recruiter
      }
    });

    res.status(201).json({ message: 'Job posting created successfully', job: newJob });
  } catch (error) {
    console.error('Create Job Error:', error);
    res.status(500).json({ message: 'Server error creating job posting' });
  }
});

// @route   POST /api/jobs/bulk
// @desc    Bulk create jobs
router.post('/bulk', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    if (!user || (user.role !== 'admin' && user.role !== 'recruiter')) {
      return res.status(403).json({ message: 'Unauthorized to post jobs' });
    }

    const jobsData = req.body.jobs;
    if (!Array.isArray(jobsData) || jobsData.length === 0) {
      return res.status(400).json({ message: 'Invalid jobs data' });
    }

    const createdJobs = await prisma.job.createMany({
      data: jobsData.map(job => ({
        title: job.title,
        company: job.company || job.companyName || 'Unknown Company',
        location: job.location || 'Remote',
        salary: String(job.salaryMin && job.salaryMax ? `₹${job.salaryMin} - ₹${job.salaryMax}` : job.salary || 'Negotiable'),
        type: job.locationType || job.type || 'Full-time',
        experience: job.experienceLevel || job.experience || 'Fresher',
        category: job.category || 'Technology',
        description: job.description || '',
        aboutCompany: job.aboutCompany || '',
        skills: Array.isArray(job.skills) ? job.skills : [],
        responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
        requirements: Array.isArray(job.requirements) ? job.requirements : [],
        benefits: Array.isArray(job.benefits) ? job.benefits : [],
        logo: job.logo || '💼',
        posted: 'Just now',
        employerId: user.employerId
      }))
    });

    res.status(201).json({ message: `Successfully created ${createdJobs.count} jobs`, count: createdJobs.count });
  } catch (error) {
    console.error('Bulk Job Creation Error:', error);
    res.status(500).json({ message: 'Server error during bulk job creation' });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply for a job (and increment applicant count)
router.post('/:id/apply', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const userId = parseInt(req.user.id);

    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Record application in JobApplication model
    await prisma.jobApplication.upsert({
      where: { userId_jobId: { userId, jobId } },
      create: { userId, jobId, status: 'Applied' },
      update: { applied_at: new Date() }
    });

    // Increment applicants count in JobStats
    try {
      await prisma.jobStats.upsert({
        where: { jobId },
        create: { jobId, applicants_count: 1 },
        update: { applicants_count: { increment: 1 } }
      });
    } catch (e) {
      console.warn('Failed to increment applicants count', e);
    }

    res.json({ message: 'Application successful' });
  } catch (error) {
    console.error('Apply Job Error:', error);
    res.status(500).json({ message: 'Server error during application' });
  }
});

// @route   POST /api/jobs/:id/save
// @desc    Toggle save job
router.post('/:id/save', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const userId = parseInt(req.user.id);

    // Check if already saved
    const existing = await prisma.savedJob.findUnique({
      where: { userId_jobId: { userId, jobId } }
    });

    if (existing) {
      // Unsave
      await prisma.savedJob.delete({
        where: { id: existing.id }
      });
      res.json({ message: 'Job unsaved', saved: false });
    } else {
      // Save
      await prisma.savedJob.create({
        data: { userId, jobId }
      });
      res.json({ message: 'Job saved', saved: true });
    }
  } catch (error) {
    console.error('Save Job Error:', error);
    res.status(500).json({ message: 'Server error saving job' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update a job
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Permission check: Admin or the Recruiter who belongs to the employer
    if (user.role !== 'admin' && job.employerId !== user.employerId) {
      return res.status(403).json({ message: 'Unauthorized to edit this job' });
    }

    const {
      title, company, location, salary, type, experience, logo, category,
      description, aboutCompany, skills, responsibilities,
      requirements, niceToHave, benefits, featured, urgent, status
    } = req.body;

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: {
        title, company, location, salary, type, experience,
        logo: logo || job.logo,
        category,
        description,
        aboutCompany: aboutCompany || '',
        skills: skills || [],
        responsibilities: responsibilities || [],
        requirements: requirements || [],
        niceToHave: niceToHave || [],
        benefits: benefits || [],
        featured: featured !== undefined ? featured : job.featured,
        urgent: urgent !== undefined ? urgent : job.urgent,
        status: status || job.status
      }
    });

    res.json({ message: 'Job updated successfully', job: updatedJob });
  } catch (error) {
    console.error('Update Job Error:', error);
    res.status(500).json({ message: 'Server error updating job' });
  }
});

// @route   PATCH /api/jobs/:id/status
// @desc    Quickly update a job's status or featured flag
router.patch('/:id/toggle', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (user.role !== 'admin' && job.employerId !== user.employerId) {
      return res.status(403).json({ message: 'Unauthorized to edit this job' });
    }

    const { status, featured } = req.body;
    
    const updateData = {};
    if (status !== undefined) updateData.status = status;
    if (featured !== undefined) updateData.featured = featured;

    const updatedJob = await prisma.job.update({
      where: { id: jobId },
      data: updateData
    });

    res.json({ message: 'Job toggled successfully', job: updatedJob });
  } catch (error) {
    console.error('Toggle Job Error:', error);
    res.status(500).json({ message: 'Server error toggling job' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Permission check: Admin or the Recruiter who belongs to the employer
    if (user.role !== 'admin' && job.employerId !== user.employerId) {
      return res.status(403).json({ message: 'Unauthorized to delete this job' });
    }

    await prisma.job.delete({ where: { id: jobId } });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete Job Error:', error);
    res.status(500).json({ message: 'Server error deleting job' });
  }
});

// @route   GET /api/jobs/:id/applications
// @desc    Get applications for a job (Recruiter/Admin)
router.get('/:id/applications', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Permission check: Admin or the Recruiter who belongs to the employer
    if (user.role !== 'admin' && job.employerId !== user.employerId) {
      return res.status(403).json({ message: 'Unauthorized to view these applications' });
    }

    const applications = await prisma.jobApplication.findMany({
      where: { jobId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            title: true,
            location: true,
            skills: true,
            avatar: true,
            bio: true,
            phone: true,
            socials: true,
            resumeUploaded: true,
            testResults: true,
          }
        }
      },
      orderBy: { applied_at: 'desc' }
    });

    const jobSkills = Array.isArray(job.skills) ? job.skills.map(s => String(s).toLowerCase().trim()) : [];

    const applicationsWithMatches = applications.map(app => {
      if (!app.user) return app;
      
      const candidateSkills = Array.isArray(app.user.skills) ? app.user.skills.map(s => String(s).toLowerCase().trim()) : [];
      let matchedSkills = [];
      let missingSkills = [];
      
      jobSkills.forEach(reqSkill => {
        if (!reqSkill) return;
        const hasSkill = candidateSkills.some(cs => cs && (cs.includes(reqSkill) || reqSkill.includes(cs)));
        if (hasSkill) matchedSkills.push(reqSkill);
        else missingSkills.push(reqSkill);
      });

      let score = 0;
      if (jobSkills.length > 0) {
        score = (matchedSkills.length / jobSkills.length) * 80;
      } else {
        score = 60;
      }

      let assessmentBoost = 0;
      if (app.user.testResults && Object.keys(app.user.testResults).length > 0) {
         assessmentBoost = 20; 
      }
      
      score = Math.min(100, Math.round(score + assessmentBoost));

      return {
        ...app,
        matchPercentage: score,
        matchedSkills,
        missingSkills
      };
    });

    res.json(applicationsWithMatches);
  } catch (error) {
    console.error('Get Job Applications Error:', error);
    res.status(500).json({ message: 'Server error fetching applications' });
  }
});

// @route   PUT /api/jobs/:id/applications/:appId/status
// @desc    Update the status of an application (Recruiter/Admin)
router.put('/:id/applications/:appId/status', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const appId = parseInt(req.params.appId);
    const { status } = req.body;

    const validStatuses = ['Applied', 'Shortlisted', 'Interviewing', 'Hired', 'Rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Permission check: Admin or the Recruiter who belongs to the employer
    if (user.role !== 'admin' && job.employerId !== user.employerId) {
      return res.status(403).json({ message: 'Unauthorized to update this application' });
    }

    const application = await prisma.jobApplication.findUnique({ where: { id: appId } });
    if (!application || application.jobId !== jobId) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id: appId },
      data: { status }
    });

    res.json({ message: 'Application status updated successfully', application: updatedApplication });
  } catch (error) {
    console.error('Update Application Status Error:', error);
    res.status(500).json({ message: 'Server error updating application status' });
  }
});

// @route   GET /api/jobs/:id/match
// @desc    Match candidates to a specific job based on skills
router.get('/:id/match', verifyToken, async (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true, employerId: true }
    });

    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (user.role !== 'admin' && job.employerId !== user.employerId) {
      return res.status(403).json({ message: 'Unauthorized to match candidates for this job' });
    }

    const jobSkills = Array.isArray(job.skills) ? job.skills.map(s => String(s).toLowerCase().trim()) : [];
    
    const candidates = await prisma.user.findMany({
      where: { role: 'user' },
      select: {
        id: true,
        name: true,
        title: true,
        location: true,
        avatar: true,
        skills: true,
        testResults: true,
      }
    });

    let matchedCandidates = candidates.map(candidate => {
      const candidateSkills = Array.isArray(candidate.skills) ? candidate.skills.map(s => String(s).toLowerCase().trim()) : [];
      let matchedSkills = [];
      let missingSkills = [];
      
      jobSkills.forEach(reqSkill => {
        if (!reqSkill) return;
        const hasSkill = candidateSkills.some(cs => cs && (cs.includes(reqSkill) || reqSkill.includes(cs)));
        if (hasSkill) matchedSkills.push(reqSkill);
        else missingSkills.push(reqSkill);
      });

      let score = 0;
      if (jobSkills.length > 0) {
        score = (matchedSkills.length / jobSkills.length) * 80;
      } else {
        score = 60; // If no skills required, reasonable base score
      }

      let assessmentBoost = 0;
      if (candidate.testResults && Object.keys(candidate.testResults).length > 0) {
         assessmentBoost = 20; 
      }
      
      score = Math.min(100, Math.round(score + assessmentBoost));

      return {
        ...candidate,
        matchPercentage: score,
        matchedSkills,
        missingSkills
      };
    });

    // Only return top candidates (score >= 20%)
    matchedCandidates = matchedCandidates.filter(c => c.matchPercentage >= 20);
    matchedCandidates.sort((a, b) => b.matchPercentage - a.matchPercentage);

    const topCandidates = matchedCandidates.slice(0, 15);

    // Deep evaluation using True AI Matchmaker
    try {
      if (topCandidates.length > 0) {
        console.log(`Sending ${topCandidates.length} candidates to AI for deep evaluation...`);
        const aiResults = await evaluateCandidatesForJob(job, topCandidates);
        
        topCandidates.forEach(tc => {
          const aiMatch = aiResults.find(ar => String(ar.candidateId) === String(tc.id));
          if (aiMatch) {
             tc.matchPercentage = aiMatch.matchScore;
             tc.aiReasoning = aiMatch.aiReasoning;
          } else {
             tc.aiReasoning = "AI could not determine a specific reasoning.";
          }
        });
        
        // Re-sort based on AI's semantic scoring
        topCandidates.sort((a, b) => b.matchPercentage - a.matchPercentage);
      }
    } catch (e) {
       console.error("AI matching failed, falling back to basic string matching", e);
       // We keep the original basic matched scores if AI fails
    }

    res.json(topCandidates);
  } catch (error) {
    console.error('Match Candidates Error:', error);
    res.status(500).json({ message: 'Server error matching candidates' });
  }
});

export default router;
