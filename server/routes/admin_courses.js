import express from 'express';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const router = express.Router();

// GET /api/admin/courses - List all courses (with filters)
router.get('/', async (req, res) => {
  try {
    const { status, level, category, price, search, page = 1, limit = 25, sort = 'recent' } = req.query;
    
    const where = {};
    if (status && status !== 'all') where.status = status;
    if (level && level !== 'all') where.level = level;
    if (category && category !== 'all') where.category = category;
    if (price === 'free') where.price = 'Free';
    else if (price === 'paid') where.price = { not: 'Free' };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { instructor: { contains: search } },
        { category: { contains: search } }
      ];
    }

    let orderBy = { id: 'desc' }; // default 'recent'
    if (sort === 'enrollments_desc') orderBy = { students: 'desc' };
    if (sort === 'rating_desc') orderBy = { rating: 'desc' };
    if (sort === 'price_desc') orderBy = { price: 'desc' };
    if (sort === 'price_asc') orderBy = { price: 'asc' };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const courses = await prisma.course.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        _count: { select: { enrolledUsers: true } }
      }
    });

    const total = await prisma.course.count({ where });

    res.json({
      courses,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / take)
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// GET /api/admin/courses/export - Export courses to CSV
router.get('/export', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: { _count: { select: { enrolledUsers: true } } }
    });
    
    let csv = 'ID,Title,Instructor,Category,Level,Status,Price,Rating,Students\n';
    courses.forEach(c => {
      csv += `${c.id},"${c.title}","${c.instructor}","${c.category}","${c.level}","${c.status}","${c.price}",${c.rating},${c._count.enrolledUsers}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('courses_export.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

// POST /api/admin/courses/bulk-delete
router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    const numericIds = Array.isArray(ids) ? ids.map(id => parseInt(id)) : [];
    await prisma.course.deleteMany({
      where: { id: { in: numericIds } }
    });
    res.json({ message: 'Courses deleted successfully' });
  } catch (error) {
    console.error('Bulk Delete Error:', error);
    res.status(500).json({ error: 'Bulk delete failed' });
  }
});

// GET /api/admin/courses/:id - Get course details
router.get('/:id', async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { _count: { select: { enrolledUsers: true } } }
    });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// POST /api/admin/courses - Create course
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newCourse = await prisma.course.create({
      data: {
        title: data.title,
        instructor: data.instructor,
        instructorBio: data.instructorBio || '',
        instructorAvatar: data.instructorAvatar,
        category: data.category,
        level: data.level,
        duration: data.duration,
        language: data.language,
        price: data.price,
        originalPrice: data.originalPrice,
        image: data.image || '',
        videoUrl: data.videoUrl,
        description: data.description,
        whatYouLearn: data.whatYouLearn || [],
        prerequisites: data.prerequisites || [],
        modules: data.modules || [],
        skills: data.skills || [],
        bestseller: data.bestseller || false,
        certificate: data.certificate || false,
        status: data.status || 'draft',
        lastUpdated: new Date().toLocaleDateString(),
        color: data.color || 'bg-blue-500',
        rating: 0,
        reviews: 0,
        students: 0
      }
    });
    res.json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// PUT /api/admin/courses/:id - Update course
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const updated = await prisma.course.update({
      where: { id: parseInt(req.params.id) },
      data: {
        title: data.title,
        instructor: data.instructor,
        instructorBio: data.instructorBio,
        instructorAvatar: data.instructorAvatar,
        category: data.category,
        level: data.level,
        duration: data.duration,
        language: data.language,
        price: data.price,
        originalPrice: data.originalPrice,
        image: data.image,
        videoUrl: data.videoUrl,
        description: data.description,
        whatYouLearn: data.whatYouLearn,
        prerequisites: data.prerequisites,
        modules: data.modules,
        skills: data.skills,
        bestseller: data.bestseller,
        certificate: data.certificate,
        status: data.status,
        lastUpdated: new Date().toLocaleDateString()
      }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// DELETE /api/admin/courses/:id - Delete course
router.delete('/:id', async (req, res) => {
  try {
    await prisma.course.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// PUT /api/admin/courses/:id/publish
router.put('/:id/publish', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await prisma.course.update({
      where: { id: parseInt(req.params.id) },
      data: { status } // 'published', 'draft', or 'archived'
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Status update failed' });
  }
});

// PUT /api/admin/courses/:id/modules
router.put('/:id/modules', async (req, res) => {
  try {
    const { modules } = req.body;
    const updated = await prisma.course.update({
      where: { id: parseInt(req.params.id) },
      data: { modules }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Modules update failed' });
  }
});

// GET /api/admin/courses/:id/students
router.get('/:id/students', async (req, res) => {
  try {
    const students = await prisma.userCourse.findMany({
      where: { courseId: parseInt(req.params.id) },
      include: {
        user: { select: { id: true, name: true, email: true, location: true } }
      },
      orderBy: { timestamp: 'desc' }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// GET /api/admin/courses/:id/analytics
router.get('/:id/analytics', async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    
    const enrollments = await prisma.userCourse.count({ where: { courseId } });
    
    const completed = await prisma.userCourse.count({
      where: { courseId, status: 'Completed' }
    });
    
    // Calculate simple completion rate
    const completionRate = enrollments > 0 ? Math.round((completed / enrollments) * 100) : 0;
    
    // Mock demographic data for dashboard representation
    const demographics = [
      { country: 'United States', count: Math.floor(enrollments * 0.4) },
      { country: 'India', count: Math.floor(enrollments * 0.3) },
      { country: 'United Kingdom', count: Math.floor(enrollments * 0.15) },
      { country: 'Canada', count: Math.floor(enrollments * 0.1) },
      { country: 'Other', count: enrollments - Math.floor(enrollments * 0.95) }
    ];

    res.json({
      totalEnrollments: enrollments,
      completionRate,
      averageRating: course?.rating || 0,
      reviewsCount: course?.reviews || 0,
      demographics
    });
  } catch (error) {
    res.status(500).json({ error: 'Analytics failed' });
  }
});

// POST /api/admin/courses/:id/announce
router.post('/:id/announce', async (req, res) => {
  try {
    // In a real app, this would use a mailer service to email students
    // For now, we simulate success
    res.json({ message: 'Announcement sent to all enrolled students successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Announcement failed' });
  }
});

export default router;
