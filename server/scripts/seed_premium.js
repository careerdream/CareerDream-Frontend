import pkg from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const jobs = [
  // AI/ML Jobs
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
    aboutCompany: 'Fortress Cloud is the security-first infrastructure provider for Fortune 500 companies.',
    posted: 'Just now',
    applicants: 12,
    urgent: true,
    featured: true,
    description: 'Architect secure cloud foundations for enterprise clients.',
    skills: ['AWS Security', 'Azure', 'Terraform', 'Vault'],
    responsibilities: ['Oversee security audits', 'Implement zero-trust architecture'],
    requirements: ['CISSP preferred', '8+ years security'],
    benefits: ['Remote options', 'Education budget'],
  },
  {
    title: 'Site Reliability Engineer',
    company: 'ScaleUp SaaS',
    location: 'Remote',
    salary: '$160k - $210k',
    type: 'Remote',
    experience: 'Senior',
    logo: '⚡',
    category: 'DevOps',
    aboutCompany: 'ScaleUp is the fastest growing SaaS optimization platform.',
    posted: '2 days ago',
    applicants: 89,
    featured: false,
    description: 'Ensure 99.99% availability for our global user base.',
    skills: ['Go', 'Kubernetes', 'Prometheus', 'GCP'],
    responsibilities: ['Automate everything', 'On-call rotation'],
    requirements: ['Deep Linux knowledge', 'K8s expert'],
    benefits: ['Wellness stipend'],
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
    aboutCompany: 'Visionary Tech is redefining creative software for the 21st century.',
    posted: '2 days ago',
    applicants: 142,
    featured: true,
    description: 'Own the entire stack for our flagship product.',
    skills: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    benefits: ['Elite healthcare', 'Annual retreat'],
  },
  {
    title: 'Backend Systems Engineer',
    company: 'Nexus Core',
    location: 'Remote',
    salary: '$170k - $230k',
    type: 'Remote',
    experience: 'Senior',
    logo: '🔗',
    category: 'Backend',
    aboutCompany: 'Nexus Core provides high-throughput blockchain infrastructure.',
    posted: '1 day ago',
    applicants: 45,
    featured: true,
    description: 'Build high-performance microservices in Rust and Go.',
    skills: ['Rust', 'Go', 'gRPC', 'Kafka'],
    benefits: ['Stock options'],
  }
];

const courses = [
  {
    title: 'Machine Learning: From Theory to Production',
    instructor: 'Dr. Sarah Chen',
    instructorBio: 'Ex-Google Brain, PhD MIT, 15+ years experience',
    instructorAvatar: '👩‍🔬',
    rating: 4.9,
    reviews: 15400,
    students: 68000,
    duration: '12 weeks',
    level: 'Advanced',
    image: '🤖',
    price: '$199',
    originalPrice: '$399',
    bestseller: true,
    category: 'AI/ML',
    language: 'English',
    lastUpdated: 'April 2026',
    certificate: true,
    color: 'from-violet-500 to-purple-600',
    description: 'The definitive guide to building and scaling ML systems.',
    skills: ['PyTorch', 'Ops', 'Python', 'Mathematics'],
    whatYouLearn: ['Architectural patterns', 'Production deployment', 'Optimization'],
  },
  {
    title: 'The Elite Cloud Architect Track',
    instructor: 'Mark Johnson',
    instructorBio: 'Multiple AWS Certified, Cloud Lead at 3 Unicorns',
    instructorAvatar: '👨‍💼',
    rating: 4.8,
    reviews: 9800,
    students: 42000,
    duration: '10 weeks',
    level: 'Expert',
    image: '☁️',
    price: '$149',
    originalPrice: '$299',
    bestseller: true,
    category: 'Cloud',
    language: 'English',
    lastUpdated: 'April 2026',
    certificate: true,
    color: 'from-orange-500 to-red-500',
    description: 'Become a top 1% Cloud Architect.',
    skills: ['AWS', 'Azure', 'Terraform', 'Security'],
  },
  {
    title: 'Full Stack Mastery: React + Rust',
    instructor: 'Alex Rivera',
    instructorBio: 'Creator of several open source libraries, 12 years XP',
    instructorAvatar: '👨‍💻',
    rating: 4.9,
    reviews: 5600,
    students: 18000,
    duration: '8 weeks',
    level: 'Intermediate',
    image: '🚀',
    price: '$99',
    originalPrice: '$199',
    bestseller: false,
    category: 'Full Stack',
    language: 'English',
    lastUpdated: 'March 2026',
    certificate: true,
    color: 'from-blue-600 to-cyan-500',
    description: 'Learn the most performant web stack in existence.',
    skills: ['React', 'Rust', 'WebAssembly', 'Next.js'],
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
  },
  {
    title: 'AWS Cloud Architecture',
    category: 'Cloud',
    difficulty: 'Senior',
    duration: 60,
    badge: '☁️',
    color: 'from-orange-500 to-red-500',
    skills: ['Infrastructure', 'Security', 'Scalability'],
    attempts: 8900,
    avgScore: 71,
    description: 'Advanced assessment for Cloud Architects.',
  }
];

const seed = async () => {
  try {
    console.log('🚀 Starting Premium Seed...');

    // Clear existing
    await prisma.job.deleteMany();
    await prisma.course.deleteMany();
    await prisma.assessment.deleteMany();
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

    console.log('✅ Users created.');

    // Create Jobs
    await prisma.job.createMany({ data: jobs });
    console.log(`✅ ${jobs.length} Jobs created.`);

    // Create Courses
    await prisma.course.createMany({ data: courses });
    console.log(`✅ ${courses.length} Courses created.`);

    // Create Assessments
    await prisma.assessment.createMany({ data: assessments });
    console.log(`✅ ${assessments.length} Assessments created.`);

    console.log('✨ Premium Seeding complete! Login with alex@example.com / user123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

seed();
