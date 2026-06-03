import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import { formatPaginatedResponse } from '../utils/pagination.js';

const router = express.Router();

// GET /api/admin/blog - List all posts
router.get('/', async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 25, sort = 'recent' } = req.query;
    
    const where = {};
    if (status && status !== 'all') where.status = status;
    if (category && category !== 'all') where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { author: { name: { contains: search } } }
      ];
    }

    let orderBy = { createdAt: 'desc' };
    if (sort === 'views_desc') orderBy = { views: 'desc' };
    if (sort === 'likes_desc') orderBy = { likes: { _count: 'desc' } };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: sort === 'likes_desc' ? undefined : orderBy,
      skip,
      take,
      include: {
        author: { select: { name: true } },
        _count: { select: { likes: true, comments: true } }
      }
    });

    // Handle prisma unsupported sorting for aggregates without extra query effort
    if (sort === 'likes_desc') {
      posts.sort((a, b) => b._count.likes - a._count.likes);
    }

    const total = await prisma.blogPost.count({ where });

    res.json(formatPaginatedResponse(posts, total, page, limit));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/admin/blog/export - Export posts
router.get('/export', async (req, res) => {
  try {
    const posts = await prisma.blogPost.findMany({
      include: { author: { select: { name: true } }, _count: { select: { likes: true, comments: true } } }
    });
    
    let csv = 'ID,Title,Author,Category,Status,Views,Likes,Comments,Created\n';
    posts.forEach(p => {
      csv += `${p.id},"${p.title.replace(/"/g, '""')}","${p.author.name}","${p.category}","${p.status}",${p.views},${p._count.likes},${p._count.comments},${p.createdAt}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('blog_posts_export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// POST /api/admin/blog/bulk-delete
router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    const numericIds = Array.isArray(ids) ? ids.map(id => parseInt(id)) : [];
    await prisma.blogPost.deleteMany({ where: { id: { in: numericIds } } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Bulk Delete Error:', error);
    res.status(500).json({ error: 'Bulk delete failed' });
  }
});

// POST /api/admin/blog - Create blog post
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    
    // Auto generate slug if not provided
    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Use authorId from body, or fallback to authenticated user ID
    const authorId = data.authorId ? parseInt(data.authorId) : parseInt(req.user.id);

    if (isNaN(authorId)) {
       return res.status(400).json({ error: 'Valid Author ID is required' });
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        image: data.image,
        authorId: authorId,
        category: data.category,
        slug: slug,
        featured: data.featured || false,
        status: data.status || 'draft'
      }
    });
    res.json(post);
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ error: 'Failed to create post: ' + error.message });
  }
});

// GET /api/admin/blog/:id - Get post details + comments
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        author: { select: { name: true, avatar: true } },
        _count: { select: { likes: true, comments: true } }
      }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    const comments = await prisma.comment.findMany({
      where: { articleId: post.id },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { created_at: 'desc' }
    });

    res.json({ ...post, commentsList: comments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post details' });
  }
});

// PUT /api/admin/blog/:id - Update post
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.blogPost.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        image: data.image,
        category: data.category,
        featured: data.featured,
        status: data.status,
        ...(data.slug && { slug: data.slug })
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE /api/admin/blog/:id - Delete post
router.delete('/:id', async (req, res) => {
  try {
    await prisma.blogPost.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// PUT /api/admin/blog/:id/status - Change post status
router.put('/:id/status', async (req, res) => {
  try {
    const updated = await prisma.blogPost.update({
      where: { id: parseInt(req.params.id) },
      data: { status: req.body.status }
    });
    res.json({ message: 'Status updated', status: updated.status });
  } catch (error) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

// PUT /api/admin/blog/:id/featured - Toggle featured
router.put('/:id/featured', async (req, res) => {
  try {
    const updated = await prisma.blogPost.update({
      where: { id: parseInt(req.params.id) },
      data: { featured: req.body.featured }
    });
    res.json({ message: 'Featured updated', featured: updated.featured });
  } catch (error) {
    res.status(500).json({ error: 'Featured toggle failed' });
  }
});

// PUT /api/admin/blog/:id/comments/:cid - Update comment status
router.put('/:id/comments/:cid', async (req, res) => {
  try {
    const updated = await prisma.comment.update({
      where: { id: parseInt(req.params.cid) },
      data: { status: req.body.status } // 'approved', 'pending', 'spam'
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
});

// DELETE /api/admin/blog/:id/comments/:cid - Delete comment
router.delete('/:id/comments/:cid', async (req, res) => {
  try {
    await prisma.comment.delete({ where: { id: parseInt(req.params.cid) } });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Delete comment failed' });
  }
});

// GET /api/admin/blog-analytics - Platform Analytics
router.get('/analytics/dashboard', async (req, res) => {
  try {
    const [published, drafts, archived, views] = await Promise.all([
      prisma.blogPost.count({ where: { status: 'published' } }),
      prisma.blogPost.count({ where: { status: 'draft' } }),
      prisma.blogPost.count({ where: { status: 'archived' } }),
      prisma.blogPost.aggregate({ _sum: { views: true } })
    ]);
    
    res.json({
      totalPosts: published + drafts + archived,
      published, drafts, archived,
      totalViews: views._sum.views || 0
    });
  } catch(error) {
    res.status(500).json({ error: 'Failed to load analytics' });
  }
});

export default router;
