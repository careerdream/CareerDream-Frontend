import express from 'express';
import pkg from '@prisma/client';
import multer from 'multer';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

// Multer config — memory storage for CSV parsing
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are supported'), false);
    }
  }
});

// ─── BULK ACTIONS ────────────────────────────────────────────────────────────

// POST /api/admin/bulk/action — Execute a bulk action on any module
router.post('/action', async (req, res) => {
  try {
    const { module, action, ids, value, emailSubject, emailBody } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'No IDs provided' });
    }

    const parsedIds = ids.map(id => parseInt(id));
    let result = { affected: 0, message: '' };

    // ── USER MODULE ──
    if (module === 'users') {
      if (action === 'ban' || action === 'suspend' || action === 'activate') {
        const statusMap = { ban: 'banned', suspend: 'suspended', activate: 'active' };
        const { count } = await prisma.user.updateMany({
          where: { id: { in: parsedIds } },
          data: { status: statusMap[action] }
        });
        result = { affected: count, message: `${count} users ${action}ned successfully` };
      }
      else if (action === 'change_role') {
        const { count } = await prisma.user.updateMany({
          where: { id: { in: parsedIds } },
          data: { role: value }
        });
        result = { affected: count, message: `Role changed to "${value}" for ${count} users` };
      }
      else if (action === 'delete') {
        const { count } = await prisma.user.deleteMany({ where: { id: { in: parsedIds } } });
        result = { affected: count, message: `${count} users deleted permanently` };
      }
      else if (action === 'reset_password') {
        // Simulate sending password reset emails
        result = { affected: parsedIds.length, message: `Password reset links sent to ${parsedIds.length} users` };
      }
    }

    // ── JOB MODULE ──
    else if (module === 'jobs') {
      if (action === 'delete') {
        const { count } = await prisma.job.deleteMany({ where: { id: { in: parsedIds } } });
        result = { affected: count, message: `${count} jobs deleted` };
      }
      else if (action === 'change_status') {
        const { count } = await prisma.job.updateMany({
          where: { id: { in: parsedIds } },
          data: { status: value }
        });
        result = { affected: count, message: `${count} jobs updated to "${value}"` };
      }
      else if (action === 'feature' || action === 'unfeature') {
        const { count } = await prisma.job.updateMany({
          where: { id: { in: parsedIds } },
          data: { featured: action === 'feature' }
        });
        result = { affected: count, message: `${count} jobs ${action}d` };
      }
    }

    // ── COURSE MODULE ──
    else if (module === 'courses') {
      if (action === 'delete') {
        const { count } = await prisma.course.deleteMany({ where: { id: { in: parsedIds } } });
        result = { affected: count, message: `${count} courses deleted` };
      }
      else if (action === 'change_status') {
        const { count } = await prisma.course.updateMany({
          where: { id: { in: parsedIds } },
          data: { status: value }
        });
        result = { affected: count, message: `${count} courses updated to "${value}"` };
      }
    }

    // ── ASSESSMENT MODULE ──
    else if (module === 'assessments') {
      if (action === 'delete') {
        const { count } = await prisma.assessment.deleteMany({ where: { id: { in: parsedIds } } });
        result = { affected: count, message: `${count} assessments deleted` };
      }
      else if (action === 'change_status') {
        const { count } = await prisma.assessment.updateMany({
          where: { id: { in: parsedIds } },
          data: { status: value }
        });
        result = { affected: count, message: `${count} assessments updated to "${value}"` };
      }
    }

    // ── BLOG MODULE ──
    else if (module === 'blog') {
      if (action === 'delete') {
        const { count } = await prisma.blogPost.deleteMany({ where: { id: { in: parsedIds } } });
        result = { affected: count, message: `${count} posts deleted` };
      }
      else if (action === 'change_status') {
        const { count } = await prisma.blogPost.updateMany({
          where: { id: { in: parsedIds } },
          data: { status: value }
        });
        result = { affected: count, message: `${count} posts updated to "${value}"` };
      }
    }

    else {
      return res.status(400).json({ error: `Unknown module: ${module}` });
    }

    res.json({ success: true, ...result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Bulk action failed: ' + error.message });
  }
});

// ─── BULK IMPORT ─────────────────────────────────────────────────────────────

// POST /api/admin/bulk/import — Import CSV data
router.post('/import', upload.single('file'), async (req, res) => {
  try {
    const { module, fieldMap: fieldMapRaw } = req.body;
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const csvText = req.file.buffer.toString('utf-8');
    const rows = parse(csvText, { columns: true, skip_empty_lines: true, trim: true });

    if (rows.length === 0) return res.status(400).json({ error: 'CSV is empty' });

    const fieldMap = fieldMapRaw ? JSON.parse(fieldMapRaw) : null;
    const mapRow = (row) => {
      if (!fieldMap) return row;
      const mapped = {};
      for (const [dbField, csvHeader] of Object.entries(fieldMap)) {
        mapped[dbField] = row[csvHeader];
      }
      return mapped;
    };

    let successCount = 0;
    const errors = [];

    if (module === 'users') {
      for (let i = 0; i < rows.length; i++) {
        try {
          const r = mapRow(rows[i]);
          if (!r.email || !r.name) { errors.push({ row: i + 2, msg: 'Missing name or email' }); continue; }
          await prisma.user.upsert({
            where: { email: r.email },
            update: { name: r.name, role: r.role || 'user', location: r.location },
            create: { name: r.name, email: r.email, password: 'IMPORT_PLACEHOLDER', role: r.role || 'user', location: r.location }
          });
          successCount++;
        } catch (e) {
          errors.push({ row: i + 2, msg: e.message });
        }
      }
    }

    else if (module === 'jobs') {
      for (let i = 0; i < rows.length; i++) {
        try {
          const r = mapRow(rows[i]);
          if (!r.title || !r.company) { errors.push({ row: i + 2, msg: 'Missing title or company' }); continue; }
          await prisma.job.create({
            data: {
              title: r.title,
              company: r.company,
              location: r.location || 'Remote',
              salary: r.salary || 'Not disclosed',
              type: r.type || 'Full-time',
              experience: r.experience || 'Any',
              logo: r.logo || '',
              description: r.description || '',
              aboutCompany: r.aboutCompany || '',
              posted: new Date().toLocaleDateString(),
              category: r.category || 'Technology',
              status: r.status || 'active'
            }
          });
          successCount++;
        } catch (e) {
          errors.push({ row: i + 2, msg: e.message });
        }
      }
    }

    else if (module === 'courses') {
      for (let i = 0; i < rows.length; i++) {
        try {
          const r = mapRow(rows[i]);
          if (!r.title) { errors.push({ row: i + 2, msg: 'Missing title' }); continue; }
          await prisma.course.create({
            data: {
              title: r.title,
              instructor: r.instructor || 'Unknown',
              instructorBio: r.instructorBio || '',
              rating: parseFloat(r.rating) || 4.0,
              reviews: parseInt(r.reviews) || 0,
              students: parseInt(r.students) || 0,
              duration: r.duration || 'N/A',
              level: r.level || 'Beginner',
              image: r.image || '',
              price: r.price || 'Free',
              category: r.category || 'Technology',
              language: r.language || 'English',
              lastUpdated: r.lastUpdated || new Date().toISOString().split('T')[0],
              color: r.color || '#3b82f6',
              description: r.description || '',
              status: r.status || 'published'
            }
          });
          successCount++;
        } catch (e) {
          errors.push({ row: i + 2, msg: e.message });
        }
      }
    }

    else {
      return res.status(400).json({ error: `Import not supported for module: ${module}` });
    }

    res.json({
      success: true,
      successCount,
      errorCount: errors.length,
      totalRows: rows.length,
      errors: errors.slice(0, 20), // Return first 20 errors
      preview: rows.slice(0, 5)    // Preview of first 5 rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Import failed: ' + error.message });
  }
});

// ─── EXPORT ──────────────────────────────────────────────────────────────────

// POST /api/admin/bulk/export — Export data in CSV or JSON
router.post('/export', async (req, res) => {
  try {
    const { module, format = 'csv', columns, filters, fileName } = req.body;

    let data = [];
    let headers = [];

    if (module === 'users') {
      headers = columns || ['id', 'name', 'email', 'role', 'status', 'location', 'createdAt'];
      const users = await prisma.user.findMany({
        where: {
          ...(filters?.status && filters.status !== 'all' && { status: filters.status }),
          ...(filters?.role && filters.role !== 'all' && { role: filters.role })
        },
        select: headers.reduce((acc, h) => ({ ...acc, [h]: true }), {})
      });
      data = users;
    }

    else if (module === 'jobs') {
      headers = columns || ['id', 'title', 'company', 'location', 'salary', 'type', 'status', 'posted_at', 'category'];
      const jobs = await prisma.job.findMany({
        where: {
          ...(filters?.status && filters.status !== 'all' && { status: filters.status }),
          ...(filters?.category && { category: filters.category })
        },
        select: headers.reduce((acc, h) => ({ ...acc, [h]: true }), {})
      });
      data = jobs;
    }

    else if (module === 'courses') {
      headers = columns || ['id', 'title', 'instructor', 'level', 'students', 'rating', 'status', 'category'];
      const courses = await prisma.course.findMany({
        select: headers.reduce((acc, h) => ({ ...acc, [h]: true }), {})
      });
      data = courses;
    }

    else if (module === 'assessments') {
      headers = columns || ['id', 'title', 'category', 'difficulty', 'attempts', 'avgScore', 'status'];
      const assessments = await prisma.assessment.findMany({
        select: headers.reduce((acc, h) => ({ ...acc, [h]: true }), {})
      });
      data = assessments;
    }

    else if (module === 'blog') {
      headers = columns || ['id', 'title', 'category', 'status', 'views', 'featured', 'createdAt'];
      const posts = await prisma.blogPost.findMany({
        include: { author: { select: { name: true } } }
      });
      data = posts.map(p => ({
        ...headers.reduce((acc, h) => ({ ...acc, [h]: p[h] ?? '' }), {}),
        author: p.author?.name
      }));
    }

    else if (module === 'enrollments') {
      const enrollments = await prisma.userCourse.findMany({
        include: { user: { select: { name: true, email: true } }, course: { select: { title: true } } }
      });
      data = enrollments.map(e => ({
        userId: e.userId, courseName: e.course.title, userName: e.user.name,
        email: e.user.email, status: e.status, enrolledAt: e.timestamp
      }));
      headers = ['userId', 'courseName', 'userName', 'email', 'status', 'enrolledAt'];
    }

    else if (module === 'assessment_results') {
      const results = await prisma.userAssessment.findMany({
        include: {
          user: { select: { name: true, email: true } },
          assessment: { select: { title: true } }
        }
      });
      data = results.map(r => ({
        assessmentTitle: r.assessment.title, userName: r.user.name, email: r.user.email,
        score: r.score, progress: r.progress, attemptedAt: r.timestamp
      }));
      headers = ['assessmentTitle', 'userName', 'email', 'score', 'progress', 'attemptedAt'];
    }

    else {
      return res.status(400).json({ error: 'Unknown export module' });
    }

    const outputName = fileName || `${module}_export_${Date.now()}`;

    if (format === 'json') {
      res.header('Content-Type', 'application/json');
      res.attachment(`${outputName}.json`);
      return res.send(JSON.stringify(data, null, 2));
    }

    // Default: CSV
    const csvOutput = stringify(data, { header: true, columns: headers });
    res.header('Content-Type', 'text/csv');
    res.attachment(`${outputName}.csv`);
    res.send(csvOutput);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Export failed: ' + error.message });
  }
});

// GET /api/admin/bulk/export-templates — Download CSV templates
router.get('/export-templates', (req, res) => {
  const { module } = req.query;

  const templates = {
    users: 'name,email,role,location,phone\nJohn Doe,john@example.com,user,Mumbai,+91-9876543210',
    jobs: 'title,company,location,salary,type,experience,category,description,status\nSoftware Engineer,Acme Corp,Remote,15-20 LPA,Full-time,2-5 years,Technology,Job description here,active',
    courses: 'title,instructor,level,duration,category,price,language,description\nReact Fundamentals,Jane Smith,Beginner,8 hours,Development,Free,English,Course description',
    questions: 'question_text,type,option_a,option_b,option_c,option_d,correct_answer,difficulty,explanation\nWhat is React?,mcq,A library,A framework,A language,A database,A,easy,React is a JavaScript library'
  };

  const template = templates[module] || templates.users;
  res.header('Content-Type', 'text/csv');
  res.attachment(`${module || 'users'}_import_template.csv`);
  res.send(template);
});

// POST /api/admin/bulk/email-campaign — Send bulk email to users
router.post('/email-campaign', async (req, res) => {
  try {
    const { module, ids, subject, body, scheduleAt } = req.body;

    let recipients = [];
    if (ids && ids.length > 0) {
      const users = await prisma.user.findMany({
        where: { id: { in: ids.map(id => parseInt(id)) } },
        select: { name: true, email: true }
      });
      recipients = users;
    } else if (module === 'users') {
      const users = await prisma.user.findMany({ select: { name: true, email: true }, take: 1000 });
      recipients = users;
    }

    // Simulate campaign — in production: integrate nodemailer/sendgrid
    const campaignId = `CAMP_${Date.now()}`;

    res.json({
      success: true,
      campaignId,
      recipientCount: recipients.length,
      scheduledAt: scheduleAt || new Date().toISOString(),
      message: `Campaign queued for ${recipients.length} recipients`
    });
  } catch (error) {
    res.status(500).json({ error: 'Campaign failed: ' + error.message });
  }
});

// POST /api/admin/bulk/schedule-export — Schedule recurring exports
router.post('/schedule-export', async (req, res) => {
  try {
    const { module, format, frequency, recipients, time } = req.body;
    // Store in SystemSetting as JSON config
    await prisma.systemSetting.upsert({
      where: { settingKey: `scheduled_export_${module}` },
      update: { value: { module, format, frequency, recipients, time, createdAt: new Date() }, category: 'exports' },
      create: { settingKey: `scheduled_export_${module}`, value: { module, format, frequency, recipients, time, createdAt: new Date() }, category: 'exports' }
    });
    res.json({ success: true, message: `Scheduled ${frequency} ${module} export to ${recipients?.join(', ')}` });
  } catch (error) {
    res.status(500).json({ error: 'Schedule failed: ' + error.message });
  }
});

// GET /api/admin/bulk/export-history — List previous exports
router.get('/export-history', async (req, res) => {
  try {
    // Mock history — in production: track in ExportLog table
    const history = [
      { id: 1, module: 'users', format: 'csv', size: '42 KB', createdAt: new Date(Date.now() - 86400000), expiresAt: new Date(Date.now() + 6 * 86400000) },
      { id: 2, module: 'jobs', format: 'csv', size: '18 KB', createdAt: new Date(Date.now() - 172800000), expiresAt: new Date(Date.now() + 5 * 86400000) },
      { id: 3, module: 'assessments', format: 'json', size: '234 KB', createdAt: new Date(Date.now() - 259200000), expiresAt: new Date(Date.now() + 4 * 86400000) }
    ];
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch export history' });
  }
});

export default router;
