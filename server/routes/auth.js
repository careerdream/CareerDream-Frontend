import express from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import prisma from '../lib/prisma.js';
import { verifyToken } from '../middleware/auth.js';
import axios from 'axios';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load base64 icons - embedded directly in email HTML (no attachments)
const iconsB64Path = path.join(__dirname, '..', 'icons', 'icons_b64.json');
const iconB64 = JSON.parse(fs.readFileSync(iconsB64Path, 'utf-8'));

// Email transporter (configure in .env)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

const getOtpEmailTemplate = (otp, type = 'register') => {
  const desc = type === 'register' 
    ? "Please verify you're really you by entering this 6-digit code to complete your registration. Just a heads up, this code will expire in 10 minutes for security reasons."
    : "Please verify you're really you by entering this 6-digit code when you sign in. Just a heads up, this code will expire in 10 minutes for security reasons.";

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
  .header { background-color: #dcfce7; padding: 40px 20px; text-align: center; }
  .logo { font-size: 28px; font-weight: bold; color: #166534; text-decoration: none; display: inline-block; margin-bottom: 20px; }
  .content { padding: 40px 40px 20px 40px; text-align: center; }
  .title { font-size: 24px; font-weight: bold; color: #000000; margin-bottom: 30px; }
  .otp-box { border: 2px solid #000000; padding: 15px 40px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #000000; display: inline-block; margin-bottom: 30px; }
  .desc { font-size: 14px; line-height: 1.6; color: #000000; margin-bottom: 40px; max-width: 450px; margin-left: auto; margin-right: auto; }
  .footer { background-color: #f3f4f6; padding: 40px 20px; text-align: center; border-top: 1px solid #e5e7eb; }
  .footer-text { font-size: 13px; color: #4b5563; margin-bottom: 20px; line-height: 1.5; }
  .footer-links { font-size: 14px; margin-bottom: 20px; }
  .footer-links a { color: #111827; text-decoration: none; padding: 0 10px; }
  .social-icons { margin-top: 20px; }
  .social-icons span { display: inline-block; width: 32px; height: 32px; background-color: #000000; color: #ffffff; border-radius: 6px; line-height: 32px; margin: 0 5px; font-weight: bold; text-align: center; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="text-align: center;">
        <!-- Logo -->
        <a href="https://careerdream.in" style="display: inline-flex; align-items: center; text-decoration: none; margin-bottom: 25px;">
          <div style="display: inline-block; vertical-align: middle; width: 80px; height: 80px; border-radius: 20px; background: linear-gradient(135deg, #3b82f6, #06b6d4); text-align: center; line-height: 80px; margin-right: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            <span style="color: #ffffff; font-weight: bold; font-size: 32px; font-family: sans-serif;">CD</span>
          </div>
          <span style="font-size: 34px; font-weight: bold; color: #1f2937; font-family: sans-serif; vertical-align: middle; letter-spacing: -0.5px;">CareerDream</span>
        </a>
      </div>
      <!-- Star motif from the image -->
      <div style="background-color: #166534; color: white; display: inline-block; padding: 5px 20px; border-radius: 20px; letter-spacing: 4px; font-size: 18px;">
        ✱✱✱✱✱
      </div>
    </div>
    
    <div class="content">
      <div class="title">Your one-time code is</div>
      
      <div class="otp-box">
        ${otp}
      </div>
      
      <div class="desc">
        ${desc}
      </div>
    </div>
    
    <div class="footer">
      <div class="footer-text">
        If you have any questions, contact : info@careerdream.in
      </div>
      <div style="border-top: 1px solid #000; margin: 30px 0;"></div>
      <div class="footer-links" style="margin-bottom: 20px;">
        <a href="#">Jobs</a> &nbsp;|&nbsp; 
        <a href="#">Courses</a> &nbsp;|&nbsp; 
        <a href="#">Assessments</a>
      </div>
      <!-- Social Icons using table layout for email client compatibility -->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:24px;">
        <tr>
          <td align="center">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <!-- WhatsApp -->
                <td style="padding:0 8px;">
                  <a href="https://whatsapp.com/channel/0029VbCUhAq2kNFsL5vFwE1N" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/whatsapp--v1.png" alt="WhatsApp" width="22" height="22" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <!-- Email -->
                <td style="padding:0 8px;">
                  <a href="mailto:info@careerdream.in" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/new-post.png" alt="Email" width="22" height="22" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <!-- Instagram -->
                <td style="padding:0 8px;">
                  <a href="https://www.instagram.com/careerdream.in/" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/instagram-new--v1.png" alt="Instagram" width="22" height="22" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <!-- Telegram -->
                <td style="padding:0 8px;">
                  <a href="https://t.me/careerdream365" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/telegram-app.png" alt="Telegram" width="22" height="22" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <!-- Facebook -->
                <td style="padding:0 8px;">
                  <a href="https://www.facebook.com/profile.php?id=61572023950143" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="Facebook" width="22" height="22" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <!-- X / Twitter -->
                <td style="padding:0 8px;">
                  <a href="https://x.com/CDream85874" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/twitterx--v1.png" alt="Twitter" width="22" height="22" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <!-- YouTube -->
                <td style="padding:0 8px;">
                  <a href="https://youtube.com/@careerdream365" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/youtube-play.png" alt="YouTube" width="22" height="22" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <!-- LinkedIn -->
                <td style="padding:0 8px;">
                  <a href="https://linkedin.com/company/careerdream.in" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" alt="LinkedIn" width="22" height="22" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
  `;
};

// Helper: generate JWT with optional remember-me duration

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
}

function generateToken(userId, rememberMe = false) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: rememberMe ? '90d' : '7d',
  });
}

// ──────────────────────────────────────────────
// REGISTER
// ──────────────────────────────────────────────
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').trim().isEmail().withMessage('Invalid email format').toLowerCase(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().matches(/^\+?[1-9]\d{1,14}$/).withMessage('Invalid phone number format')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'validation_error', errors: errors.array() });

  try {
    const { name, email, password, phone } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'email_exists', message: 'This email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, phone, emailOtp, emailOtpExpiry, isEmailVerified: false },
    });

    // Send OTP Email
    console.log(`[DEVELOPMENT] OTP for ${email} is ${emailOtp}`);
    try {
      await transporter.sendMail({
        from: `"CareerDream" <${process.env.SMTP_USER || 'noreply@careerdream.in'}>`,
        to: email,
        subject: 'Verify your CareerDream Account',
        html: getOtpEmailTemplate(emailOtp, 'register')
      });
    } catch (e) {
      console.error('Email send error:', e.message);
    }

    res.status(201).json({
      message: 'Registration successful. Please verify your email with the OTP sent.',
      userId: user.id,
      requiresVerification: true
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Unable to create account.' });
  }
});

// ──────────────────────────────────────────────
// LOGIN
// ──────────────────────────────────────────────
router.post('/login', [
  body('email').trim().isEmail().withMessage('Invalid email').toLowerCase(),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: 'validation_error', errors: errors.array() });

  try {
    const { email, password, rememberMe } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) return res.status(401).json({ error: 'invalid_credentials', message: 'Invalid credentials.' });
    if (!user.isEmailVerified) return res.status(403).json({ error: 'unverified', message: 'Please verify your email first.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'invalid_credentials', message: 'Invalid credentials.' });

    if (user.mfaEnabled) {
      const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
      await prisma.user.update({
        where: { id: user.id },
        data: { emailOtp, emailOtpExpiry: new Date(Date.now() + 10 * 60 * 1000) }
      });
      console.log(`[DEVELOPMENT] MFA OTP for ${email} is ${emailOtp}`);
      try {
        await transporter.sendMail({
          from: `"CareerDream" <${process.env.SMTP_USER || 'noreply@careerdream.in'}>`,
          to: email,
          subject: 'Your Login OTP',
          html: getOtpEmailTemplate(emailOtp, 'login')
        });
      } catch (e) { console.error('MFA Email error:', e.message); }

      return res.json({ mfaRequired: true, userId: user.id, message: 'MFA OTP sent to email.' });
    }

    const token = generateToken(user.id, !!rememberMe);
    setAuthCookie(res, token);
    await prisma.user.update({ where: { id: user.id }, data: { updatedAt: new Date() } });

    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, token }); // Token returned for backward compatibility if needed, but cookie is set
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Unable to log in.' });
  }
});

// ──────────────────────────────────────────────
// RECRUITER REGISTER
// ──────────────────────────────────────────────
router.post('/recruiter/register', async (req, res) => {
  try {
    const { name, email, password, companyName, industry } = req.body;

    if (!name || !email || !password || !companyName) {
      return res.status(400).json({ error: 'missing_fields', message: 'All fields are required.' });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: 'email_exists', message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Create Employer first
    const employer = await prisma.employer.create({
      data: {
        company_name: companyName,
        industry: industry || 'Technology',
      },
    });

    // Create User linked to Employer
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'recruiter',
        employerId: employer.id,
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      employer,
      token,
    });
  } catch (error) {
    console.error('Recruiter Reg Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});

// ──────────────────────────────────────────────
// RECRUITER LOGIN
// ──────────────────────────────────────────────
router.post('/recruiter/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      include: { employer: true },
    });

    if (!user || user.role !== 'recruiter') {
      return res.status(401).json({ error: 'invalid_credentials', message: 'Invalid recruiter credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'invalid_credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      employer: user.employer,
      token,
    });
  } catch (error) {
    console.error('Recruiter Login Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'email_required', message: 'Please provide your email address.' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    // Build reset URL
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password?token=${resetToken}`;

    // Send email
    try {
      await transporter.sendMail({
        from: `"CareerDream" <${process.env.SMTP_USER || 'noreply@careerdream.in'}>`,
        to: email,
        subject: 'Reset Your CareerDream Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #1e293b; margin-bottom: 16px;">Reset Your Password</h2>
            <p style="color: #475569; line-height: 1.6;">
              We received a request to reset your password. Click the button below to set a new password.
              This link will expire in <strong>15 minutes</strong>.
            </p>
            <a href="${resetUrl}" style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Reset Password
            </a>
            <p style="color: #94a3b8; font-size: 13px;">
              If you didn't request this, you can safely ignore this email.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the request — token is saved in DB, user can retry
    }

    res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Unable to process request. Please try again later.' });
  }
});

// ──────────────────────────────────────────────
// RESET PASSWORD
// ──────────────────────────────────────────────
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'missing_fields', message: 'Token and new password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'password_too_short', message: 'Password must be at least 6 characters.' });
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'invalid_token', message: 'This reset link is invalid or has expired. Please request a new one.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    res.json({ message: 'Password has been reset successfully. You can now log in.' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Unable to reset password. Please try again later.' });
  }
});

// ──────────────────────────────────────────────
// GOOGLE OAUTH
// ──────────────────────────────────────────────
router.post('/google', async (req, res) => {
  try {
    const { tokenId: accessToken } = req.body;
    if (!accessToken) return res.status(400).json({ error: 'missing_token', message: 'Google login failed: missing token.' });

    const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
    const { email, name, picture: avatar } = googleResponse.data;

    if (!email) return res.status(400).json({ error: 'no_email', message: 'Google account is missing an email address.' });

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || email.split('@')[0],
          email,
          password: await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 12),
          avatar,
          role: 'user',
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { avatar: user.avatar || avatar, updatedAt: new Date() },
      });
    }

    // Record Login History
    try {
      await prisma.loginHistory.create({
        data: {
          userId: user.id,
          ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown',
        },
      });
    } catch (historyError) {
      console.error('Failed to record login history (Google):', historyError);
    }

    const token = generateToken(user.id);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ error: 'google_failed', message: 'Google authentication failed. Please try again.' });
  }
});

// ──────────────────────────────────────────────
// GITHUB OAUTH
// ──────────────────────────────────────────────
router.post('/github', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: 'missing_code', message: 'GitHub login failed: missing authorization code.' });

    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }, { headers: { Accept: 'application/json' } });

    const accessToken = tokenResponse.data.access_token;
    if (!accessToken) throw new Error('Failed to get GitHub access token');

    // Fetch user profile
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { login: githubUsername, name, avatar_url: avatar } = userResponse.data;

    // Fetch primary email
    const emailsResponse = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const primaryEmailObj = emailsResponse.data.find(e => e.primary);
    const primaryEmail = primaryEmailObj?.email;

    if (!primaryEmail) throw new Error('Primary email not found on GitHub');

    let user = await prisma.user.findUnique({ where: { email: primaryEmail } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || githubUsername || primaryEmail.split('@')[0],
          email: primaryEmail,
          password: await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 12),
          avatar,
          role: 'user',
        },
      });
    } else {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          avatar: user.avatar || avatar,
          name: user.name || name || githubUsername,
          updatedAt: new Date(),
        },
      });
    }

    // Record Login History
    try {
      await prisma.loginHistory.create({
        data: {
          userId: user.id,
          ip: req.ip || req.headers['x-forwarded-for'] || 'unknown',
          userAgent: req.headers['user-agent'] || 'unknown',
        },
      });
    } catch (historyError) {
      console.error('Failed to record login history (GitHub):', historyError);
    }

    const token = generateToken(user.id);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('GitHub Auth Error:', error);
    res.status(500).json({ error: 'github_failed', message: 'GitHub authentication failed. Please try again.' });
  }
});

// ──────────────────────────────────────────────
// GET CURRENT USER
// ──────────────────────────────────────────────
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.user.id) },
      include: {
        settings: true,
        savedJobs: { include: { job: true } },
        appliedJobs: { include: { job: true } },
        enrolledCourses: { include: { course: true } },
        certificates: true,
        rank: true,
        detailedSkills: true,
        growthTrajectory: { orderBy: { recorded_at: 'desc' }, take: 12 },
        testAssessments: { include: { assessment: true } },
        resumeAnalyses: { orderBy: { created_at: 'desc' }, take: 5 },
      },
    });

    if (!user) return res.status(404).json({ error: 'not_found', message: 'User not found.' });

    // Format settings as a simple object
    const settingsObj = user.settings.reduce((acc, s) => ({ ...acc, [s.preference_key]: s.preference_value }), {});
    
    // Cleanup internal fields
    const { password, resetToken, resetTokenExpiry, ...safeUser } = user;

    res.json({
      ...safeUser,
      settings: settingsObj
    });
  } catch (error) {
    console.error('Get Me Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Server error.' });
  }
});

// ──────────────────────────────────────────────
// UPDATE PROFILE (Now includes results & progress)
// ──────────────────────────────────────────────
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, title, location, phone, bio, avatar, skills, socials, testResults, courseProgress, savedJobIds, appliedJobIds, language, timezone } = req.body;

    let completion = 30;
    if (title) completion += 10;
    if (location) completion += 10;
    if (avatar) completion += 10;
    if (skills && Array.isArray(skills) && skills.length > 0) completion += 20;
    if (bio) completion += 5;
    if (socials && Object.values(socials).some(v => v)) completion += 5;
    if (testResults && Array.isArray(testResults) && testResults.length > 0) completion += 5;
    if (courseProgress && Object.keys(courseProgress).length > 0) completion += 5;
    if (completion > 100) completion = 100;

    const data = {
      name, title, location, avatar, skills, language, timezone,
      profileCompletion: completion,
      updatedAt: new Date(),
    };

    if (bio !== undefined) data.bio = bio;
    if (phone !== undefined) data.phone = phone;
    if (socials !== undefined) data.socials = socials;
    if (testResults) data.testResults = testResults;
    if (courseProgress) data.courseProgress = courseProgress;
    // NOTE: savedJobIds and appliedJobIds are managed by /api/jobs/:id/save
    // and /api/jobs/:id/apply endpoints respectively — do NOT set them here.

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.user.id) },
      data,
      select: {
        id: true, name: true, email: true, role: true, title: true,
        location: true, avatar: true, profileCompletion: true,
        skills: true, resumeUploaded: true, testResults: true, courseProgress: true,
        language: true, timezone: true, phone: true, bio: true, socials: true,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Profile Update Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Failed to update profile.' });
  }
});

// ──────────────────────────────────────────────
// CHANGE PASSWORD
// ──────────────────────────────────────────────
router.put('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'missing_fields', message: 'Current and new password are required.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'password_too_short', message: 'New password must be at least 6 characters.' });
    }
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.user.id) } });
    if (!user) return res.status(404).json({ error: 'not_found', message: 'User not found.' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'wrong_password', message: 'Current password is incorrect.' });
    }
    const hashed = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { id: user.id }, data: { password: hashed } });
    res.json({ message: 'Password changed successfully.' });
  } catch (error) {
    console.error('Change Password Error:', error);
    res.status(500).json({ error: 'server_error', message: 'Failed to change password.' });
  }
});

// ──────────────────────────────────────────────
// RECORD ACTIVITY
// ──────────────────────────────────────────────
router.post('/activity', verifyToken, async (req, res) => {
  try {
    const { action, details } = req.body;
    if (!action) return res.status(400).json({ error: 'missing_action' });

    await prisma.userActivity.create({
      data: {
        userId: parseInt(req.user.id),
        action,
        details: typeof details === 'object' ? JSON.stringify(details) : details,
      },
    });

    res.json({ success: true, message: 'Activity recorded' });
  } catch (error) {
    console.error('Activity Recording Error:', error);
    res.status(500).json({ error: 'server_error' });
  }
});


// ──────────────────────────────────────────────
// VERIFY EMAIL OTP
// ──────────────────────────────────────────────
router.post('/verify-email', [
  body('email').isEmail().toLowerCase(),
  body('otp').isLength({ min: 6, max: 6 })
], async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'not_found' });
    if (user.isEmailVerified) return res.status(400).json({ message: 'Already verified' });
    if (user.emailOtp !== otp || new Date() > user.emailOtpExpiry) {
      return res.status(400).json({ error: 'invalid_otp', message: 'Invalid or expired OTP' });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { isEmailVerified: true, emailOtp: null, emailOtpExpiry: null }
    });
    // Auto login after verification
    const token = generateToken(user.id);
    setAuthCookie(res, token);
    res.json({ message: 'Email verified successfully.', token });
  } catch (e) { res.status(500).json({ error: 'server_error' }); }
});

// ──────────────────────────────────────────────
// RESEND OTP
// ──────────────────────────────────────────────
router.post('/resend-otp', [
  body('email').isEmail().toLowerCase()
], async (req, res) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'not_found', message: 'User not found' });
    
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { emailOtp, emailOtpExpiry }
    });

    console.log(`[DEVELOPMENT] Resent OTP for ${email} is ${emailOtp}`);
    try {
      await transporter.sendMail({
        from: `"CareerDream" <${process.env.SMTP_USER || 'noreply@careerdream.in'}>`,
        to: email,
        subject: 'Your CareerDream OTP',
        html: getOtpEmailTemplate(emailOtp, 'resend')
      });
    } catch (e) {
      console.error('Email send error:', e.message);
    }

    res.json({ message: 'OTP resent successfully.' });
  } catch (e) {
    console.error('Resend OTP Error:', e);
    res.status(500).json({ error: 'server_error', message: 'Failed to resend OTP.' });
  }
});

// ──────────────────────────────────────────────
// MFA LOGIN
// ──────────────────────────────────────────────
router.post('/login/mfa', [
  body('email').isEmail().toLowerCase(),
  body('otp').isLength({ min: 6, max: 6 })
], async (req, res) => {
  try {
    const { email, otp, rememberMe } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'not_found' });
    if (user.emailOtp !== otp || new Date() > user.emailOtpExpiry) {
      return res.status(400).json({ error: 'invalid_otp', message: 'Invalid or expired OTP' });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { emailOtp: null, emailOtpExpiry: null, updatedAt: new Date() }
    });
    const token = generateToken(user.id, !!rememberMe);
    setAuthCookie(res, token);
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, token });
  } catch (e) { res.status(500).json({ error: 'server_error' }); }
});

// ──────────────────────────────────────────────
// LOGOUT
// ──────────────────────────────────────────────
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});


export default router;
