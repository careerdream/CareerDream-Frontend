import express from 'express';
import nodemailer from 'nodemailer';
import prisma from '../lib/prisma.js';
import { verifyToken } from '../middleware/auth.js';
import { cacheMiddleware } from '../utils/cache.js';
import { formatPaginatedResponse } from '../utils/pagination.js';
import { notifySubscribers } from '../services/emailService.js';

const router = express.Router();

// Helper function to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// @route   GET /api/blog/posts
// @desc    Get all blog posts with pagination
// @access  Public
router.get('/posts', cacheMiddleware(60), async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;
    const { featured, category } = req.query;

    // Build where clause properly
    const where = {};
    if (featured === 'true') where.featured = true;
    if (category && category !== 'all') where.category = category;

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            title: true,
          },
        },
        _count: {
          select: {
            comments: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const total = await prisma.blogPost.count({ where });

    res.json(formatPaginatedResponse(posts, total, page, limit));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
});

// @route   GET /api/blog/posts/:id
// @desc    Get a single blog post by ID
// @access  Public
router.get('/posts/:id', cacheMiddleware(60), async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            title: true,
            email: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              }
            }
          },
          orderBy: {
            created_at: 'desc',
          }
        },
        _count: {
          select: {
            comments: true,
          }
        }
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment views
    await prisma.blogPost.update({
      where: { id: parseInt(req.params.id) },
      data: { views: { increment: 1 } },
    });

    let isLiked = false;
    if (req.header('Authorization')) {
      try {
        const token = req.header('Authorization').split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'careerdream_secret_key');
        // Note: For this implementation, we removed individual user tracking,
        // so we just return the aggregate likesCount.
        // If we need user tracking, we would check Redis sets here.
        isLiked = false; 
      } catch (e) {
        // Token invalid or expired, ignore isLiked
      }
    }

    const { _count, ...postData } = post;
    res.json({ ...postData, likesCount: _count.likes, isLiked });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
});

// @route   POST /api/blog/posts
// @desc    Create a new blog post
// @access  Private
router.post('/posts', verifyToken, async (req, res) => {
  try {
    const { title, content, excerpt, category, image } = req.body;

    if (!title || !content || !excerpt) {
      return res.status(400).json({ message: 'Missing required fields: title, content, excerpt' });
    }

    // Check for duplicate slug
    let slug = generateSlug(title);
    let counter = 1;
    let existingSlug = await prisma.blogPost.findUnique({ where: { slug } });
    while (existingSlug) {
      slug = `${generateSlug(title)}-${counter}`;
      existingSlug = await prisma.blogPost.findUnique({ where: { slug } });
      counter++;
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        image,
        slug,
        category: category || 'IT Career',
        authorId: req.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            title: true,
          },
        },
      },
    });

    // Notify subscribers
    notifySubscribers(title, `https://careerdream.in/news/${post.id}`, excerpt);

    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'Failed to create blog post' });
  }
});

// @route   PUT /api/blog/posts/:id
// @desc    Update a blog post
// @access  Private
router.put('/posts/:id', verifyToken, async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const { title, content, excerpt, category, featured } = req.body;

    // Check ownership
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({ message: 'You can only edit your own posts' });
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id: postId },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(excerpt && { excerpt }),
        ...(category && { category }),
        ...(featured !== undefined && { featured }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
            title: true,
          },
        },
      },
    });

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({ message: 'Failed to update blog post' });
  }
});

// @route   DELETE /api/blog/posts/:id
// @desc    Delete a blog post
// @access  Private
router.delete('/posts/:id', verifyToken, async (req, res) => {
  try {
    const postId = parseInt(req.params.id);

    // Check ownership
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (post.authorId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own posts' });
    }

    await prisma.blogPost.delete({
      where: { id: postId },
    });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NEWSLETTER_FILE = path.join(__dirname, '../newsletter_subscribers.json');

const readSubscribers = () => {
  try {
    if (fs.existsSync(NEWSLETTER_FILE)) {
      return JSON.parse(fs.readFileSync(NEWSLETTER_FILE, 'utf8'));
    }
  } catch {}
  return [];
};

// @route   POST /api/blog/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Valid email is required' });
    }

    const subscribers = readSubscribers();

    // Check for duplicate
    if (subscribers.includes(email)) {
      return res.status(200).json({ message: 'You are already subscribed!' });
    }

    subscribers.push(email);
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));

    // Send welcome email
    try {
      const welcomeTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure: true,
        auth: {
          user: process.env.SMTP_USER || 'noreply@careerdream.in',
          pass: process.env.SMTP_PASS || '',
        },
      });
      const welcomeHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f4f4f5;margin:0;padding:0;}
  .container{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;}
  .header{background:linear-gradient(135deg,#3b82f6,#06b6d4);padding:40px 30px;text-align:center;}
  .logo-box{display:inline-block;width:80px;height:80px;border-radius:20px;background:rgba(255,255,255,0.2);text-align:center;line-height:80px;margin-bottom:16px;box-shadow:0 4px 10px rgba(0,0,0,0.15);}
  .logo-text{color:#fff;font-weight:bold;font-size:32px;font-family:sans-serif;}
  .brand{color:#fff;font-size:34px;font-weight:bold;margin:0;letter-spacing:-0.5px;}
  .content{padding:40px 30px;}
  .title{font-size:22px;font-weight:bold;color:#111827;margin-bottom:12px;}
  .subtitle{color:#4b5563;font-size:15px;line-height:1.6;margin-bottom:32px;}
  .features{background:#f9fafb;border-radius:12px;padding:24px;margin-bottom:32px;}
  .feature{display:flex;align-items:flex-start;gap:12px;margin-bottom:16px;}
  .feature:last-child{margin-bottom:0;}
  .feature-icon{width:40px;height:40px;border-radius:12px;text-align:center;line-height:40px;flex-shrink:0;}
  .feature-text h4{margin:0 0 4px;font-size:14px;font-weight:bold;color:#111827;}
  .feature-text p{margin:0;font-size:13px;color:#6b7280;}
  .cta-btn{display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#3b82f6,#06b6d4);color:#fff;text-decoration:none;border-radius:10px;font-weight:bold;font-size:15px;}
  .footer{background:#f3f4f6;padding:24px 30px;text-align:center;border-top:1px solid #e5e7eb;}
  .footer-text{font-size:12px;color:#9ca3af;}
  .email-link{color:#3b82f6;text-decoration:none;font-weight:bold;}
</style></head><body>
<div style="background:#f4f4f5;padding:24px 0;">
  <div class="container">
    <div class="header">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            <div class="logo-box" style="margin-bottom:0; display:inline-block; vertical-align:middle; margin-right:15px;"><span class="logo-text">CD</span></div>
            <p class="brand" style="display:inline-block; vertical-align:middle; margin:0;">CareerDream</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="content">
      <h2 class="title">You're on the list!</h2>
      <p class="subtitle">Welcome to the CareerDream newsletter. You'll be the first to know about exciting updates from India's fastest-growing IT career platform.</p>
      <div class="features">
        <div class="feature">
          <div class="feature-icon" style="background:#ecfdf5;"><img src="https://cdn-icons-png.flaticon.com/512/1043/1043305.png" alt="Blog" width="20" height="20" style="vertical-align:middle;border:none;" /></div>
          <div class="feature-text">
            <h4>Blog &amp; Articles</h4>
            <p>Expert career advice, IT industry insights, and how-to guides delivered to your inbox.</p>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon" style="background:#eff6ff;"><img src="https://cdn-icons-png.flaticon.com/512/2910/2910791.png" alt="Jobs" width="20" height="20" style="vertical-align:middle;border:none;" /></div>
          <div class="feature-text">
            <h4>New Job Alerts</h4>
            <p>Be the first to know about top remote, government, and global IT job opportunities.</p>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon" style="background:#faf5ff;"><img src="https://cdn-icons-png.flaticon.com/512/3362/3362095.png" alt="Courses" width="20" height="20" style="vertical-align:middle;border:none;" /></div>
          <div class="feature-text">
            <h4>New Courses</h4>
            <p>Get notified when new AI/ML, Cloud, Full Stack, and DevOps courses go live.</p>
          </div>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:32px;">
        <a href="https://careerdream.in" class="cta-btn">Explore CareerDream</a>
      </div>
    </div>
    <div class="footer">
      <p class="footer-text" style="margin-bottom:20px;">If you have any questions, contact : info@careerdream.in</p>
      <div style="border-top:1px solid #e5e7eb; margin:20px 0;"></div>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:0 8px;">
                  <a href="https://whatsapp.com/channel/0029VbCUhAq2kNFsL5vFwE1N" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="mailto:info@careerdream.in" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://www.instagram.com/careerdream.in/" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://t.me/careerdream365" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" alt="Telegram" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://www.facebook.com/profile.php?id=61572023950143" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://x.com/CDream85874" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://youtube.com/@careerdream365" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
                <td style="padding:0 8px;">
                  <a href="https://linkedin.com/company/careerdream.in" style="display:block; width:40px; height:40px; border:1.5px solid #d1d5db; border-radius:12px; background:#fff; text-align:center; text-decoration:none; line-height:40px;">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733561.png" alt="LinkedIn" width="20" height="20" style="display:inline-block;vertical-align:middle;border:none;" />
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <p class="footer-text" style="margin-top:24px;">You subscribed with <strong>${email}</strong>.</p>
      <p class="footer-text" style="margin-top:8px;">© ${new Date().getFullYear()} CareerDream. All rights reserved.</p>
    </div>
  </div>
</div>
</body></html>`;
      await welcomeTransporter.sendMail({
        from: `"CareerDream" <${process.env.SMTP_USER || 'noreply@careerdream.in'}>`,
        to: email,
        subject: 'You\'re subscribed to CareerDream updates!',
        html: welcomeHtml,
      });
    } catch (emailError) {
      console.error('Welcome email failed (non-critical):', emailError.message);
    }

    console.log(`Newsletter subscription: ${email} (Total: ${subscribers.length})`);
    res.status(200).json({ message: 'Successfully subscribed to newsletter!' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(500).json({ message: 'Failed to subscribe to newsletter' });
  }
});

export default router;
