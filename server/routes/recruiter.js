import express from 'express';
import prisma from '../lib/prisma.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.js';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

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

/**
 * @route   PUT /api/recruiter/profile
 * @desc    Update Recruiter profile (User and Employer info)
 */
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, companyName } = req.body;
    
    // Ensure the user is a recruiter
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.user.id) },
      include: { employer: true }
    });

    if (!user || user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update User
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { name }
    });

    // Update Employer if it exists
    let updatedEmployer = null;
    if (user.employerId && companyName) {
      updatedEmployer = await prisma.employer.update({
        where: { id: user.employerId },
        data: { company_name: companyName }
      });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        ...updatedUser,
        employer: updatedEmployer || user.employer
      }
    });

  } catch (error) {
    console.error('Recruiter Profile Update Error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

/**
 * @route   POST /api/recruiter/request-email-update
 * @desc    Generate OTP and send to new email
 */
router.post('/request-email-update', verifyToken, async (req, res) => {
  try {
    const { newEmail } = req.body;
    if (!newEmail) return res.status(400).json({ message: 'New email is required' });

    const existingUser = await prisma.user.findUnique({ where: { email: newEmail } });
    if (existingUser) return res.status(409).json({ message: 'Email is already in use by another account' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await prisma.user.update({
      where: { id: parseInt(req.user.id) },
      data: { emailOtp: otp, emailOtpExpiry: otpExpiry }
    });

    const mailOptions = {
      from: `"CareerDream" <${process.env.SMTP_USER}>`,
      to: newEmail,
      subject: 'Verify your new CareerDream Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-w-md; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="padding: 24px; text-align: center;">
            <h2 style="color: #0f172a; margin-top: 0;">Verify Email Update</h2>
            <p style="color: #475569; font-size: 16px;">Use this 6-digit code to verify your new email address. This code expires in 10 minutes.</p>
            <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #3b82f6; margin: 24px 0;">
              ${otp}
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent to new email' });

  } catch (error) {
    console.error('Request Email Update Error:', error);
    res.status(500).json({ message: 'Server error requesting email update' });
  }
});

/**
 * @route   PUT /api/recruiter/verify-email-update
 * @desc    Verify OTP and update email
 */
router.put('/verify-email-update', verifyToken, async (req, res) => {
  try {
    const { newEmail, otp } = req.body;
    
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.user.id) },
      include: { employer: true }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.emailOtp || user.emailOtp !== otp) {
      return res.status(400).json({ message: 'Invalid or incorrect OTP' });
    }
    if (new Date() > new Date(user.emailOtpExpiry)) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { 
        email: newEmail,
        emailOtp: null,
        emailOtpExpiry: null
      }
    });

    res.json({ 
      message: 'Email updated successfully',
      user: {
        ...updatedUser,
        employer: user.employer
      }
    });

  } catch (error) {
    console.error('Verify Email Update Error:', error);
    res.status(500).json({ message: 'Server error verifying email' });
  }
});

export default router;
