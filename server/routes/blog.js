import express from 'express';
import nodemailer from 'nodemailer';
import prisma from '../lib/prisma.js';
import { verifyToken } from '../middleware/auth.js';
import { cacheMiddleware } from '../utils/cache.js';

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
            comments: true,
            likes: true,
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

    res.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
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
            likes: true,
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
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const jwt = await import('jsonwebtoken');
        const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'careerdream_secret_key');
        const userId = parseInt(decoded.id);
        const like = await prisma.articleLike.findUnique({
          where: { userId_articleId: { userId, articleId: parseInt(req.params.id) } }
        });
        isLiked = !!like;
      } catch (err) {
        // Token invalid or expired, ignore isLiked
      }
    }

    res.json({ ...post, isLiked });
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
  .logo-box{display:inline-block;width:60px;height:60px;border-radius:16px;background:rgba(255,255,255,0.2);text-align:center;line-height:60px;margin-bottom:16px;}
  .logo-text{color:#fff;font-weight:bold;font-size:24px;font-family:sans-serif;}
  .brand{color:#fff;font-size:28px;font-weight:bold;margin:0;}
  .content{padding:40px 30px;}
  .title{font-size:22px;font-weight:bold;color:#111827;margin-bottom:12px;}
  .subtitle{color:#4b5563;font-size:15px;line-height:1.6;margin-bottom:32px;}
  .features{background:#f9fafb;border-radius:12px;padding:24px;margin-bottom:32px;}
  .feature{display:flex;align-items:flex-start;gap:12px;margin-bottom:16px;}
  .feature:last-child{margin-bottom:0;}
  .feature-icon{width:36px;height:36px;border-radius:10px;text-align:center;line-height:36px;font-size:18px;flex-shrink:0;}
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
      <div class="logo-box"><span class="logo-text">CD</span></div>
      <p class="brand">CareerDream</p>
    </div>
    <div class="content">
      <h2 class="title">You're on the list!</h2>
      <p class="subtitle">Welcome to the CareerDream newsletter. You'll be the first to know about exciting updates from India's fastest-growing IT career platform.</p>
      <div class="features">
        <div class="feature">
          <div class="feature-icon" style="background:#ecfdf5;">📰</div>
          <div class="feature-text">
            <h4>Blog &amp; Articles</h4>
            <p>Expert career advice, IT industry insights, and how-to guides delivered to your inbox.</p>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon" style="background:#eff6ff;">💼</div>
          <div class="feature-text">
            <h4>New Job Alerts</h4>
            <p>Be the first to know about top remote, government, and global IT job opportunities.</p>
          </div>
        </div>
        <div class="feature">
          <div class="feature-icon" style="background:#faf5ff;">🎓</div>
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
      <p class="footer-text">You subscribed with <strong>${email}</strong>. Questions? Contact us at <a href="mailto:info@careerdream.in" class="email-link">info@careerdream.in</a></p>
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
