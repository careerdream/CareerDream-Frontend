import pkg from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const jobs = [
  // AI/ML Jobs
  { title: 'Senior ML Engineer', company: 'TechCorp AI', location: 'Remote', salary: '₹15,00,000 - ₹25,00,000', type: 'Remote', experience: 'Senior', logo: '🤖', category: 'AI/ML', posted: '2 days ago', featured: true, description: 'Join our world-class AI team. Build and deploy production ML systems at scale.', aboutCompany: 'TechCorp AI is a leading AI-first company with 200+ ML engineers.', skills: ['Python', 'TensorFlow', 'PyTorch', 'AWS'], responsibilities: ['Design ML models', 'Lead architecture'], requirements: ['5+ years experience', 'Python expertise'], niceToHave: ['PhD in ML'], benefits: ['Bonus', 'Equity', 'Remote'] },
  { title: 'ML Engineer (NLP)', company: 'LinguaAI', location: 'Bengaluru, KA', salary: '₹12,00,000 - ₹18,00,000', type: 'Full-time', experience: 'Mid Level', logo: '🧠', category: 'AI/ML', posted: '2 days ago', featured: false, description: 'Build NLP models for advanced language understanding.', aboutCompany: 'LinguaAI specializes in natural language processing.', skills: ['Python', 'Transformers', 'PyTorch'], responsibilities: ['Build NLP models', 'Create pipelines'], requirements: ['3+ years ML experience'], niceToHave: ['LLM experience'], benefits: ['Bonus', 'Equity'] },
  { title: 'Full Stack Developer', company: 'WebFlow', location: 'Hyderabad, TS', salary: '₹8,00,000 - ₹14,00,000', type: 'Full-time', experience: 'Mid Level', logo: '⚛️', category: 'Full Stack', posted: '1 day ago', featured: true, description: 'Build end-to-end web applications using MERN stack.', aboutCompany: 'WebFlow is a leading web agency.', skills: ['React', 'Node.js', 'MongoDB', 'Express'], responsibilities: ['Develop frontend', 'Design APIs'], requirements: ['2+ years experience'], niceToHave: ['TypeScript'], benefits: ['Health insurance', 'Hybrid work'] },
  { title: 'Cloud Solutions Architect', company: 'CloudSys Inc', location: 'Remote', salary: '₹20,00,000 - ₹35,00,000', type: 'Remote', experience: 'Senior', logo: '☁️', category: 'Cloud', posted: '1 day ago', urgent: true, featured: true, description: 'Design enterprise cloud architectures for Fortune 500.', aboutCompany: 'CloudSys is a top AWS consulting partner.', skills: ['AWS', 'Azure', 'GCP'], responsibilities: ['Architect solutions'], requirements: ['7+ years cloud'], niceToHave: ['AWS cert'], benefits: ['Bonus', 'Equity'] },
  { title: 'DevOps Engineer', company: 'DeployFlow', location: 'Pune, MH', salary: '₹10,00,000 - ₹16,00,000', type: 'Full-time', experience: 'Mid Level', logo: '🐳', category: 'DevOps', posted: '2 days ago', featured: false, description: 'Build CI/CD pipelines for SaaS platform.', aboutCompany: 'DeployFlow helps startups scale infrastructure.', skills: ['Docker', 'Kubernetes', 'AWS'], responsibilities: ['Build pipelines'], requirements: ['2+ years DevOps'], niceToHave: ['GitOps'], benefits: ['Equity'] }
];

const courses = [
  { 
    title: 'Advanced Machine Learning with Python', 
    instructor: 'Programming with Mosh', 
    instructorBio: 'Mosh Hamedani is a software engineer with over 20 years of experience, known for his clear, concise, and practical coding tutorials.', 
    instructorAvatar: 'M', 
    rating: 4.9, 
    reviews: 12450, 
    students: 45200, 
    duration: '8 weeks', 
    level: 'Advanced', 
    image: '🤖', 
    price: 'Free', 
    originalPrice: 'Free', 
    bestseller: true, 
    skills: ['Python', 'TensorFlow', 'Neural Networks'], 
    category: 'AI/ML', 
    language: 'English', 
    lastUpdated: 'March 2026', 
    certificate: true, 
    color: 'from-violet-500 to-purple-600', 
    description: 'Master advanced ML with hands-on projects building production systems.', 
    videoUrl: 'https://www.youtube.com/embed/7eh4d6sabA0',
    whatYouLearn: ['Build neural networks', 'Deploy models to production', 'Optimize ML pipelines'], 
    prerequisites: ['Python intermediate', 'Math basics'], 
    modules: [] 
  },
  { 
    title: 'Natural Language Processing Masterclass', 
    instructor: 'Simplilearn', 
    instructorBio: 'Simplilearn is a leading online bootcamp provider that offers comprehensive training in digital skills like Data Science, Cloud Computing, and AI.', 
    instructorAvatar: 'S', 
    rating: 4.8, 
    reviews: 8920, 
    students: 32100, 
    duration: '10 weeks', 
    level: 'Advanced', 
    image: '🧠', 
    price: 'Free', 
    originalPrice: 'Free', 
    bestseller: true, 
    skills: ['Transformers', 'BERT', 'GPT', 'PyTorch'], 
    category: 'AI/ML', 
    language: 'English', 
    lastUpdated: 'February 2026', 
    certificate: true, 
    color: 'from-blue-500 to-cyan-500', 
    description: 'Become NLP expert. Learn transformers, fine-tune LLMs, deploy at scale.', 
    videoUrl: 'https://www.youtube.com/embed/CMrHM8a3hqw',
    whatYouLearn: ['Transformers', 'Fine-tune BERT', 'Question answering'], 
    prerequisites: ['Deep learning basics'], 
    modules: [] 
  },
  { 
    title: 'AWS Solutions Architect Professional (SAP-C02)', 
    instructor: 'Andrew Brown (freeCodeCamp.org)', 
    instructorBio: 'Andrew Brown is a cloud educator and Co-Founder of ExamPro. He specializes in deep-dive, hands-on certification training.', 
    instructorAvatar: 'A', 
    rating: 4.9, 
    reviews: 18200, 
    students: 54000, 
    duration: '70 hours', 
    level: 'Expert', 
    image: '☁️', 
    price: 'Free', 
    originalPrice: 'Free', 
    bestseller: true, 
    skills: ['AWS', 'SAP-C02', 'VPC', 'Lambda', 'Security'], 
    category: 'Cloud', 
    language: 'English', 
    lastUpdated: 'May 2026', 
    certificate: true, 
    color: 'from-orange-500 to-red-500', 
    description: 'Master advanced AWS architecture and prepare for the SAP-C02 certification.', 
    videoUrl: 'https://www.youtube.com/embed/hyEw7dQ9-JE',
    whatYouLearn: ['Architect complex solutions', 'VPC and Networking', 'Security Best Practices'], 
    prerequisites: ['AWS Associate', 'Hands-on experience'], 
    modules: [] 
  },
  { 
    title: 'Kubernetes for DevOps Engineers', 
    instructor: 'TechWorld with Nana', 
    instructorBio: 'Nana Janashia is a DevOps expert who simplifies complex cloud technologies like Kubernetes and Docker.', 
    instructorAvatar: 'T', 
    rating: 4.8, 
    reviews: 9200, 
    students: 34500, 
    duration: '8 weeks', 
    level: 'Intermediate', 
    image: '🐳', 
    price: 'Free', 
    originalPrice: 'Free', 
    bestseller: true, 
    skills: ['Kubernetes', 'Docker', 'Helm', 'GitOps'], 
    category: 'DevOps', 
    language: 'English', 
    lastUpdated: 'March 2026', 
    certificate: true, 
    color: 'from-blue-600 to-blue-400', 
    description: 'Master Kubernetes from basics to advanced production patterns.', 
    videoUrl: 'https://www.youtube.com/embed/VnvRFRk_51k',
    whatYouLearn: ['Deploy applications', 'Scale clusters', 'Monitor systems'], 
    prerequisites: ['Docker basics'], 
    modules: [] 
  },
  { 
    title: 'React: Build Modern Web Apps', 
    instructor: 'freeCodeCamp.org', 
    instructorBio: 'freeCodeCamp.org is a non-profit organization that provides thousands of hours of free programming education.', 
    instructorAvatar: 'F', 
    rating: 4.9, 
    reviews: 28560, 
    students: 120340, 
    duration: '6 weeks', 
    level: 'Intermediate', 
    image: '⚛️', 
    price: 'Free', 
    originalPrice: 'Free', 
    bestseller: true, 
    skills: ['React', 'JavaScript', 'TypeScript', 'Redux'], 
    category: 'Frontend', 
    language: 'English', 
    lastUpdated: 'March 2026', 
    certificate: true, 
    color: 'from-cyan-500 to-blue-500', 
    description: 'Learn React by building real-world applications from hooks to patterns.', 
    videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
    whatYouLearn: ['React fundamentals', 'Hooks deep dive', 'Performance optimization'], 
    prerequisites: ['JavaScript ES6+'], 
    modules: [] 
  },
  { 
    title: 'Full Stack Development with MERN', 
    instructor: 'freeCodeCamp.org', 
    instructorBio: 'freeCodeCamp.org is a non-profit organization providing free programming education.', 
    instructorAvatar: 'F', 
    rating: 4.7, 
    reviews: 12340, 
    students: 45670, 
    duration: '10 weeks', 
    level: 'Intermediate', 
    image: '🚀', 
    price: 'Free', 
    originalPrice: 'Free', 
    bestseller: false, 
    skills: ['React', 'Node.js', 'MongoDB', 'Express'], 
    category: 'Backend', 
    language: 'English', 
    lastUpdated: 'February 2026', 
    certificate: true, 
    color: 'from-green-500 to-emerald-500', 
    description: 'Build complete web applications with MongoDB, Express, React, Node.js.', 
    videoUrl: 'https://www.youtube.com/embed/7CqJlxBYj-M',
    whatYouLearn: ['RESTful APIs', 'React frontend', 'Database design'], 
    prerequisites: ['JavaScript'], 
    modules: [] 
  },
  { 
    title: 'Data Science with Python', 
    instructor: 'freeCodeCamp.org', 
    instructorBio: 'freeCodeCamp.org is a non-profit organization providing free programming education.', 
    instructorAvatar: 'F', 
    rating: 4.8, 
    reviews: 16720, 
    students: 67200, 
    duration: '9 weeks', 
    level: 'Intermediate', 
    image: '📊', 
    price: 'Free', 
    originalPrice: 'Free', 
    bestseller: true, 
    skills: ['Python', 'Pandas', 'Scikit-learn', 'Statistics'], 
    category: 'Data Science', 
    language: 'English', 
    lastUpdated: 'March 2026', 
    certificate: true, 
    color: 'from-pink-500 to-rose-500', 
    description: 'Master data science from exploration to ML models and visualization.', 
    videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30',
    whatYouLearn: ['Data cleaning', 'Statistical analysis', 'ML models'], 
    prerequisites: ['Python basics'], 
    modules: [] 
  },
  { 
    title: 'SQL for Data Analysis', 
    instructor: 'freeCodeCamp.org', 
    instructorBio: 'freeCodeCamp.org is a non-profit organization providing free programming education.', 
    instructorAvatar: 'F', 
    rating: 4.9, 
    reviews: 22100, 
    students: 89340, 
    duration: '4 weeks', 
    level: 'Beginner', 
    image: '🗄️', 
    price: 'Free', 
    originalPrice: 'Free', 
    bestseller: true, 
    skills: ['SQL', 'Database Design', 'Query Optimization'], 
    category: 'Databases', 
    language: 'English', 
    lastUpdated: 'March 2026', 
    certificate: true, 
    color: 'from-indigo-500 to-purple-500', 
    description: 'Master SQL for data analysis and efficient queries.', 
    videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
    whatYouLearn: ['SELECT queries', 'JOINs and aggregations', 'Window functions'], 
    prerequisites: [], 
    modules: [] 
  }
];

const assessments = [
  { title: 'Python Programming', category: 'Programming', difficulty: 'Intermediate', duration: 45, badge: '🐍', skills: ['Python', 'OOP', 'Data Structures'], attempts: 12450, avgScore: 78, description: 'Test your Python programming knowledge with 20+ questions.', color: 'from-blue-500 to-cyan-500', questions: [{ id: 1, question: 'What is the output of: print(type([]))?', options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], correct: 0, explanation: 'Empty brackets [] create a list.' }] },
  { title: 'JavaScript Fundamentals', category: 'Programming', difficulty: 'Beginner', duration: 40, badge: '✨', skills: ['JavaScript', 'ES6', 'DOM'], attempts: 15600, avgScore: 82, description: 'Test your JavaScript knowledge covering basics and modern features.', color: 'from-yellow-400 to-orange-500', questions: [{ id: 1, question: 'How do you declare a variable?', options: ['v x = 5', 'var x = 5', 'variable x = 5', 'let x = 5'], correct: 1, explanation: 'var, let, or const declare variables.' }] }
];

const importData = async () => {
  try {
    console.log('Connecting to database...');
    
    // Clear existing data (optional, but ensures a clean seed)
    // await prisma.assessment.deleteMany();
    // await prisma.course.deleteMany();
    // await prisma.job.deleteMany();
    
    console.log('Upserting Jobs...');
    for (const job of jobs) {
      await prisma.job.upsert({
        where: { id: -1 }, // Force create or find by title if we had a unique constraint
        create: job,
        update: job,
      });
    }
    
    console.log('Upserting Courses with Video URLs...');
    for (const course of courses) {
      const existing = await prisma.course.findFirst({ where: { title: course.title } });
      if (existing) {
        await prisma.course.update({
          where: { id: existing.id },
          data: course
        });
      } else {
        await prisma.course.create({ data: course });
      }
    }
    
    console.log('Upserting Assessments...');
    for (const assessment of assessments) {
       const existing = await prisma.assessment.findFirst({ where: { title: assessment.title } });
       if (existing) {
         const existingCount = Array.isArray(existing.questions) ? existing.questions.length : 0;
         if (existingCount >= 120 && assessment.questions.length < 120) {
           console.log(`Preserving ${existingCount} questions for ${assessment.title}`);
           const { questions, ...otherData } = assessment;
           await prisma.assessment.update({ where: { id: existing.id }, data: otherData });
         } else {
           await prisma.assessment.update({ where: { id: existing.id }, data: assessment });
         }
       } else {
         await prisma.assessment.create({ data: assessment });
       }
    }

    console.log('✓ Production Database sync complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database sync:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

importData();
