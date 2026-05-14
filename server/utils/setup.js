import pkg from '@prisma/client';
import bcrypt from 'bcryptjs';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const jobs = [
  {
    title: 'Principal ML Architect',
    company: 'NeuralFlow AI',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$220k - $310k',
    type: 'Full-time',
    experience: 'Expert',
    logo: '🧠',
    category: 'AI/ML',
    posted: '1 day ago',
    applicants: 124,
    featured: true,
    urgent: true,
    description: 'Lead the next generation of large-scale language model infrastructure.',
    aboutCompany: 'NeuralFlow is the world leader in decentralized AI training.',
    skills: ['PyTorch', 'Distributed Systems', 'CUDA', 'Python'],
    responsibilities: ['Design distributed training systems', 'Lead team of 15+ engineers'],
    requirements: ['PhD in CS or equivalent experience', 'Published research'],
    niceToHave: ['Experience with Transformers at scale'],
    benefits: ['Equity', 'Unlimited PTO', 'Health/Dental/Vision'],
  },
  {
     title: 'Senior Computer Vision Engineer',
     company: 'AutoDrive Systems',
     location: 'Remote',
     salary: '$180k - $240k',
     type: 'Remote',
     experience: 'Senior',
     logo: '👁️',
     category: 'AI/ML',
     posted: '3 days ago',
     applicants: 56,
     featured: true,
     description: 'Develop real-time object detection for autonomous vehicles.',
     aboutCompany: 'AutoDrive is building the future of safe autonomous transportation.',
     skills: ['C++', 'OpenCV', 'TensorFlow', 'ROS'],
     responsibilities: ['Develop CV algorithms', 'Optimize for edge hardware'],
     requirements: ['5+ years CV experience', 'Expert C++'],
     niceToHave: ['CUDA optimization'],
     benefits: ['Top-tier salary', 'Modern equipment'],
  },
  {
    title: 'Cloud Security Lead',
    company: 'Fortress Cloud',
    location: 'Austin, TX',
    salary: '$190k - $260k',
    type: 'Full-time',
    experience: 'Lead',
    logo: '🛡️',
    category: 'Cloud',
    posted: 'Just now',
    applicants: 12,
    urgent: true,
    featured: true,
    description: 'Architect secure cloud foundations for enterprise clients.',
    aboutCompany: 'Fortress Cloud is a leading innovator in the Cloud space, dedicated to excellence and professional growth.',
    skills: ['AWS Security', 'Azure', 'Terraform', 'Vault'],
    responsibilities: ['Oversee security audits', 'Implement zero-trust architecture'],
    requirements: ['CISSP preferred', '8+ years security'],
    niceToHave: [],
    benefits: ['Remote options', 'Education budget'],
  },
  {
    title: 'Staff Full Stack Engineer',
    company: 'Visionary Tech',
    location: 'New York, NY',
    salary: '$200k - $280k',
    type: 'Full-time',
    experience: 'Staff',
    logo: '💎',
    category: 'Full Stack',
    posted: '2 days ago',
    applicants: 142,
    featured: true,
    description: 'Own the entire stack for our flagship product.',
    aboutCompany: 'Visionary Tech is a leading innovator in the Full Stack space, dedicated to excellence and professional growth.',
    skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    responsibilities: [],
    requirements: [],
    niceToHave: [],
    benefits: ['Elite healthcare', 'Annual retreat'],
  }
];

const courses = [
  {
    title: 'Advanced Machine Learning with Python',
    instructor: 'Programming with Mosh',
    instructorBio: 'Mosh Hamedani is a software engineer with over 20 years of experience, known for his clear, concise, and practical coding tutorials. His channel provides no-fluff, professional-grade training for both beginners and experienced developers.',
    instructorAvatar: 'M',
    rating: 4.9,
    reviews: 15400,
    students: 68000,
    duration: '12 weeks',
    level: 'Advanced',
    image: '🤖',
    price: 'Free',
    originalPrice: 'Free',
    bestseller: true,
    category: 'AI/ML',
    language: 'English',
    lastUpdated: 'April 2026',
    certificate: true,
    color: 'from-violet-500 to-purple-600',
    description: 'The definitive guide to building and scaling ML systems.',
    skills: ['PyTorch', 'Ops', 'Python', 'Mathematics'],
    whatYouLearn: ['Architectural patterns', 'Production deployment', 'Optimization'],
    prerequisites: [],
    modules: [],
  },
  {
    title: 'AWS Solutions Architect Professional (SAP-C02)',
    instructor: 'Andrew Brown (freeCodeCamp.org)',
    instructorBio: 'Andrew Brown is a cloud educator and Co-Founder of ExamPro. He specializes in deep-dive, hands-on certification training for AWS, Azure, and GCP, helping thousands of students pass professional-level cloud exams.',
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
    category: 'Cloud',
    language: 'English',
    lastUpdated: 'May 2026',
    certificate: true,
    color: 'from-orange-500 to-red-500',
    description: 'Master advanced AWS architecture and prepare for the SAP-C02 certification with this comprehensive hands-on course.',
    skills: ['AWS', 'SAP-C02', 'VPC', 'Lambda', 'Security'],
    whatYouLearn: [
      'Architect complex, multi-tier solutions on AWS',
      'Deep dive into S3, VPC, Lambda, and CloudFront',
      'Optimize system performance and cost-efficiency',
      'Implement automation for manual cloud processes',
      'Full alignment with SAP-C02 exam objectives'
    ],
    prerequisites: ['AWS Associate certification', 'Hands-on AWS experience'],
    modules: [],
  }
];

const assessments = [
  {
    title: 'Python Programming',
    category: 'Programming',
    difficulty: 'Intermediate',
    duration: 45,
    badge: '🐍',
    color: 'from-blue-500 to-cyan-500',
    skills: ['Python', 'OOP', 'Data Structures'],
    attempts: 25400,
    avgScore: 82,
    description: 'Benchmark your proficiency in modern Python.',
    questions: [
      { id: 1, question: 'What is the output of: print(type([]))?', options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], correct: 0, explanation: 'Empty brackets [] create a list.' },
      { id: 2, question: 'How do you define a function in Python?', options: ['function x()', 'def x():', 'void x()', 'fun x():'], correct: 1, explanation: 'The def keyword is used to define functions.' }
    ]
  }
];

const blogPosts = [
  {
    id: 9991,
    title: "India's Tech Surge: Bangalore Overtakes London as Global IT Hub in 2026",
    excerpt: "New market data reveals that India's digital capital has seen a 40% increase in multinational headquarters this fiscal year.",
    content: "The landscape of global technology has shifted dramatically. Bangalore, often called the Silicon Valley of India, has officially surpassed London in the total number of tech headquarters and R&D centers...",
    slug: "india-tech-surge-bangalore-2026",
    category: "Indian IT",
    featured: true,
    views: 12500,
    createdAt: new Date('2026-04-20'),
  },
  {
    id: 9992,
    title: "Global AI Accord: Top 50 Nations Sign Ethics & Safety Protocol",
    excerpt: "A landmark treaty in Geneva establishes new standards for Large Language Model deployment and digital copyright protection.",
    content: "In a historic moment for the digital age, representatives from 50 nations have signed the Geneva AI Accord...",
    slug: "global-ai-accord-2026",
    category: "Global Tech",
    featured: true,
    views: 8200,
    createdAt: new Date('2026-04-21'),
  },
  {
    id: 9993,
    title: "Hyderabad's New 'Cloud City' Expected to Create 100,000 Jobs by 2027",
    excerpt: "The massive 500-acre infrastructure project aimed at cloud computing and edge data centers holds promise for Indian techies.",
    content: "The state government has unveiled the roadmap for 'Cloud City', a dedicated tech zone in Hyderabad...",
    slug: "hyderabad-cloud-city-2027",
    category: "Market News",
    featured: true,
    views: 15900,
    createdAt: new Date('2026-04-22'),
  },
  {
    id: 1001,
    title: "Bangalore's 'Silicon Square' Project to Rival Cupertino",
    excerpt: "The Karnataka government greenlights a 200-acre tech park dedicated to hardware innovation and semiconductor design.",
    content: "The Silicon Square project is set to transform the outskirts of Bangalore into a world-class hardware hub...",
    slug: "bangalore-silicon-square",
    category: "Indian IT",
    featured: false,
    views: 15400,
    createdAt: new Date('2026-04-10'),
  },
  {
    id: 2001,
    title: "Quantum Supremacy Achieved in Commercial Optimization",
    excerpt: "A startup in Boston uses quantum annealing to solve global logistics problems 100x faster than supercomputers.",
    content: "Quantum computing has moved from the laboratory to the boardroom...",
    slug: "quantum-optimization-breakthrough",
    category: "Global Tech",
    featured: false,
    views: 22500,
    createdAt: new Date('2026-04-11'),
  },
  {
    id: 3001,
    title: "The 'T-Shaped' Developer: Why Generalists are Winning in AI",
    excerpt: "While deep expertise is valuable, the ability to bridge domains like DevOps and Data Science is becoming the top recruiter find.",
    content: "In an era where AI can handle routine coding tasks, the most valuable engineers are those who understand the 'big picture'...",
    slug: "t-shaped-developer-career",
    category: "Career Advice",
    featured: true,
    views: 31000,
    createdAt: new Date('2026-04-11'),
  },
  {
    id: 4001,
    title: "Generative Video: The Next Frontier in Digital Content",
    excerpt: "New diffusion models allow creators to generate cinematic 4K video from simple text prompts, revolutionizing the film industry.",
    content: "Video generation is the latest space to be disrupted by AI...",
    slug: "generative-video-frontier",
    category: "AI/ML",
    featured: true,
    views: 45000,
    createdAt: new Date('2026-04-12'),
  },
  {
    id: 5001,
    title: "Serverless at Scale: Reducing Infrastructure Overhead by 60%",
    excerpt: "Case studies from top tech firms show how migrating to event-driven serverless architectures drastically cuts costs.",
    content: "Serverless is no longer just for small projects...",
    slug: "serverless-at-scale",
    category: "Cloud",
    featured: false,
    views: 18900,
    createdAt: new Date('2026-04-13'),
  },
  {
    id: 6001,
    title: "Is the MERN Stack Still King in 2026?",
    excerpt: "A look at the evolving landscape of web development, including the rise of Next.js, Remix, and Bun.",
    content: "The web ecosystem moves fast. While MERN remains a popular choice, newer frameworks and runtimes are challenging the status quo...",
    slug: "mern-stack-status-2026",
    category: "Full Stack",
    featured: true,
    views: 32400,
    createdAt: new Date('2026-04-14'),
  },
  {
    id: 7001,
    title: "Real-time Ethics: Governing Big Data in the Age of Privacy",
    excerpt: "New laws requiring 'Explainable AI' are forcing data scientists to move beyond black-box models.",
    content: "Data science is no longer just about accuracy; it's about accountability...",
    slug: "data-science-ethics-governance",
    category: "Data Science",
    featured: false,
    views: 12100,
    createdAt: new Date('2026-04-15'),
  },
  {
    id: 8001,
    title: "GitOps 2.0: The Future of Declarative Infrastructure",
    excerpt: "Infrastructure as Code (IaC) is evolving. Learn how the next generation of GitOps tools handle complex deployments.",
    content: "GitOps has simplified CI/CD, but managing distributed systems still poses challenges...",
    slug: "gitops-future-declarative",
    category: "DevOps",
    featured: true,
    views: 21600,
    createdAt: new Date('2026-04-16'),
  },
  {
    id: 9001,
    title: "Zero Trust: Building Resilience in a Perimeter-Less World",
    excerpt: "Why the 'Never Trust, Always Verify' model is the only way to protect against modern ransomware attacks.",
    content: "Traditional network security is failing...",
    slug: "zero-trust-resilience",
    category: "Cybersecurity",
    featured: true,
    views: 28400,
    createdAt: new Date('2026-04-17'),
  },
  {
    id: 1101,
    title: "Navigating Your First Staff Engineer Promotion",
    excerpt: "Moving from Senior to Staff requires a fundamental shift in mindset from task delivery to broad technical leadership.",
    content: "The path to Staff Engineer is rarely linear...",
    slug: "staff-engineer-promotion-guide",
    category: "IT Career",
    featured: false,
    views: 19500,
    createdAt: new Date('2026-04-18'),
  }
];

export const performDatabaseSetup = async () => {
  try {
    console.log('🚀 Starting Database Setup...');

    // Clear existing
    await prisma.job.deleteMany();
    await prisma.course.deleteMany();
    await prisma.assessment.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.employer.deleteMany();
    await prisma.user.deleteMany();

    // Create Admin
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const userPassword = await bcrypt.hash('user123', salt);

    const admin = await prisma.user.create({
      data: {
        name: 'CareerDream Admin',
        email: 'admin@careerdream.in',
        password: adminPassword,
        role: 'admin',
        title: 'Master Administrator',
        avatar: '💎',
      }
    });

    // Create Premium Demo User
    const demoUser = await prisma.user.create({
      data: {
        name: 'Alex Johnson',
        email: 'alex@example.com',
        password: userPassword,
        role: 'user',
        title: 'Senior ML Engineer',
        location: 'San Francisco, CA',
        avatar: '👨‍💻',
        profileCompletion: 85,
        skills: ['Python', 'Cloud', 'ML', 'SQL', 'DevOps', 'JS'],
        resumeUploaded: true,
      }
    });

    // Create Jobs
    const jobData = jobs.map(j => {
      const { applicants, ...rest } = j;
      return rest;
    });
    await prisma.job.createMany({ data: jobData });
    
    // Create JobStats
    const allJobs = await prisma.job.findMany();
    await prisma.jobStats.createMany({
      data: allJobs.map((j, i) => ({
        jobId: j.id,
        applicants_count: jobs[i]?.applicants || 0,
        views_count: Math.floor(Math.random() * 500) + 100
      }))
    });

    // Create Courses
    await prisma.course.createMany({ data: courses });
    // Create Assessments
    await prisma.assessment.createMany({ data: assessments });
    // Create Blog Posts (associated with admin)
    await prisma.blogPost.createMany({ 
      data: blogPosts.map(p => ({ ...p, authorId: admin.id })) 
    });

    return { success: true, message: 'Database Setup Complete!' };
  } catch (error) {
    console.error('❌ Setup failed:', error);
    return { success: false, error: error.message };
  } finally {
    await prisma.$disconnect();
  }
};
