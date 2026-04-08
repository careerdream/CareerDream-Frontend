import pkg from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const jobs = [
  // AI/ML Jobs
  {
    title: 'Senior ML Engineer', company: 'TechCorp AI', location: 'Remote', salary: '$150k – $200k', type: 'Remote', experience: 'Senior', logo: '🚀', category: 'AI/ML', posted: '2 days ago', applicants: 45, featured: true,
    description: 'Join our world-class AI team to build and deploy production ML systems at scale. Work on cutting-edge projects including computer vision, NLP, and reinforcement learning.',
    aboutCompany: 'TechCorp AI is a leading AI-first company with 200+ ML engineers solving complex problems at global scale.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'MLOps', 'Docker', 'Kubernetes'],
    responsibilities: ['Design and deploy ML models in production', 'Lead technical architecture decisions', 'Mentor junior engineers', 'Optimize ML pipelines for performance'],
    requirements: ['5+ years ML engineering experience', 'Expert-level Python', 'Production deployment experience', 'Strong math background'],
    niceToHave: ['PhD in ML/CS', 'Published research', 'Open-source contributions'],
    benefits: ['$50k signing bonus', 'Equity package', 'Remote work', 'Health insurance', '401k matching']
  },
  {
    title: 'ML Engineer (NLP)', company: 'LinguaAI', location: 'San Francisco, CA', salary: '$130k – $180k', type: 'Full-time', experience: 'Mid Level',
    description: 'Build NLP models for advanced language understanding. Work with transformer architectures and deploy to millions of users.',
    aboutCompany: 'LinguaAI specializes in natural language processing for enterprise customers.',
    skills: ['Python', 'PyTorch', 'Transformers', 'BERT', 'GPT', 'SQL', 'AWS'],
    responsibilities: ['Develop NLP models', 'Create data pipelines', 'Evaluate model performance', 'Collaborate with product team'],
    requirements: ['3+ years ML experience', 'NLP knowledge', 'Python proficiency', 'Transformer architecture understanding'],
    niceToHave: ['LLM experience', 'Publication record'],
    benefits: ['$30k signing bonus', 'Equity', 'Relocation assistance', 'Learning budget'],
    featured: true,
  },
  {
    title: 'Computer Vision Engineer', company: 'VisionTech Labs', location: 'Seattle, WA', salary: '$120k – $170k', type: 'Full-time', experience: 'Mid Level',
    description: 'Develop computer vision solutions for autonomous systems. Build and optimize CNN architectures for real-time inference.',
    aboutCompany: 'VisionTech Labs develops cutting-edge computer vision for robotics and autonomous vehicles.',
    skills: ['Python', 'OpenCV', 'TensorFlow', 'CUDA', 'C++', 'ROS'],
    responsibilities: ['Design CV pipelines', 'Optimize models for edge devices', 'Build datasets', 'Improve inference speed'],
    requirements: ['3+ years computer vision experience', 'CNN expertise', 'Python and C++', 'GPU optimization knowledge'],
    niceToHave: ['Robotics experience', 'Real-time systems'],
    benefits: ['Competitive salary', 'Equity', 'Gym membership', 'Flexible hours'],
  },

  // Cloud/DevOps Jobs
  {
    title: 'Cloud Solutions Architect', company: 'CloudSys Inc', location: 'New York, NY', salary: '$140k – $185k', type: 'Full-time', experience: 'Senior', logo: '☁️', category: 'Cloud', posted: '1 day ago', applicants: 62, urgent: true,
    description: 'Design enterprise cloud architectures for Fortune 500 companies. Lead cloud transformation initiatives across multiple sectors.',
    aboutCompany: 'CloudSys Inc is a top AWS consulting partner serving enterprise clients globally.',
    skills: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation', 'Kubernetes', 'Architecture Design'],
    responsibilities: ['Design scalable cloud solutions', 'Architect for high availability', 'Lead client engagements', 'Build cost optimization strategies'],
    requirements: ['7+ years cloud experience', 'AWS certification required', 'Architecture expertise', 'Client management experience'],
    niceToHave: ['Azure certification', 'GCP experience', 'SAP/Oracle knowledge'],
    benefits: ['$60k bonus', 'Equity', 'Travel', 'Executive coaching', '$10k learning budget'],
  },
  {
    title: 'DevOps Engineer', company: 'DeployFlow', location: 'Austin, TX', salary: '$110k – $150k', type: 'Full-time', experience: 'Mid Level',
    description: 'Build and maintain CI/CD pipelines for a SaaS platform serving 100k+ users. Improve deployment reliability and speed.',
    aboutCompany: 'DeployFlow is a DevOps-focused company helping startups scale their infrastructure.',
    skills: ['Docker', 'Kubernetes', 'GitLab CI', 'Jenkins', 'Python', 'Linux', 'AWS'],
    responsibilities: ['Design CI/CD pipelines', 'Manage Kubernetes clusters', 'Monitor infrastructure', 'Improve deployment automation'],
    requirements: ['2+ years DevOps experience', 'Docker & Kubernetes', 'Linux administration', 'scripting skills'],
    niceToHave: ['Helm experience', 'GitOps knowledge'],
    benefits: ['Competitive salary', 'Equity', 'Unlimited PTO', 'Home office setup'],
  },
  {
    title: 'Infrastructure Engineer', company: 'CloudScale', location: 'San Francisco, CA', salary: '$130k – $170k', type: 'Full-time', experience: 'Senior',
    description: 'Design and maintain infrastructure for millions of daily active users. Ensure 99.99% uptime across global deployments.',
    aboutCompany: 'CloudScale manages infrastructure for leading tech companies.',
    skills: ['Terraform', 'Kubernetes', 'Go', 'AWS', 'Network Architecture', 'Linux'],
    responsibilities: ['Design infrastructure as code', 'Manage multi-region deployments', 'Implement disaster recovery', 'Optimize costs'],
    requirements: ['5+ years infrastructure experience', 'IaC proficiency', 'Kubernetes expertise', 'Network knowledge'],
    niceToHave: ['Go expertise', 'Distributed systems'],
    benefits: ['Stock options', 'Premium benefits', 'Sabbatical program'],
  },

  // Backend/Full Stack Jobs
  {
    title: 'Senior Backend Engineer', company: 'DataFlow Systems', location: 'Remote', salary: '$140k – $195k', type: 'Remote', experience: 'Senior',
    description: 'Build scalable backend systems processing petabytes of data. Design high-performance APIs and data pipelines.',
    aboutCompany: 'DataFlow Systems is a leader in real-time data processing.',
    skills: ['Go', 'Python', 'Rust', 'PostgreSQL', 'Kafka', 'Redis', 'gRPC'],
    responsibilities: ['Design backend architecture', 'Build data pipelines', 'Optimize query performance', 'Lead code reviews'],
    requirements: ['6+ years backend experience', 'Advanced SQL', 'Distributed systems', 'High concurrency systems'],
    niceToHave: ['Rust experience', 'Kafka expertise'],
    benefits: ['Stock options', 'Remote work', '$20k learning budget', 'Free hardware'],
  },
  {
    title: 'Full Stack Engineer', company: 'WebFlow Inc', location: 'Denver, CO', salary: '$100k – $140k', type: 'Full-time', experience: 'Mid Level',
    description: 'Build full-stack features for a growing SaaS platform. Work across React, Node.js, and PostgreSQL.',
    aboutCompany: 'WebFlow Inc is a fast-growing SaaS company focused on workflow automation.',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Docker', 'AWS'],
    responsibilities: ['Build full-stack features', 'Design database schemas', 'Implement APIs', 'Write tests'],
    requirements: ['3+ years web development', 'React expertise', 'Node.js knowledge', 'SQL skills'],
    niceToHave: ['Next.js experience', 'Mobile development'],
    benefits: ['$15k signing bonus', 'Relocation assistance', 'Flexible hours'],
  },
  {
    title: 'Backend Engineer (Payments)', company: 'PaymentHub', location: 'New York, NY', salary: '$120k – $160k', type: 'Full-time', experience: 'Mid Level',
    description: 'Build payment processing systems handling billions in transactions. Focus on security, reliability, and performance.',
    aboutCompany: 'PaymentHub is a fintech startup processing payments for 10k+ merchants.',
    skills: ['Java', 'Python', 'PostgreSQL', 'Redis', 'AWS', 'Payment APIs'],
    responsibilities: ['Build payment processors', 'Ensure transaction security', 'Optimize latency', 'Handle edge cases'],
    requirements: ['3+ years backend experience', 'Java or Python', 'Database design', 'API design'],
    niceToHave: ['Fintech experience', 'Security knowledge'],
    benefits: ['$20k bonus', 'Equity', 'Learning budget'],
  },

  // Frontend Jobs
  {
    title: 'Senior Frontend Engineer', company: 'DesignStudio Pro', location: 'Remote', salary: '$130k – $180k', type: 'Remote', experience: 'Senior',
    description: 'Build beautiful, performant UIs for a design tool used by 100k+ designers. Optimize rendering performance and user experience.',
    aboutCompany: 'DesignStudio Pro is a leading digital design platform.',
    skills: ['React', 'TypeScript', 'WebGL', 'Canvas API', 'Performance Optimization', 'WebSockets'],
    responsibilities: ['Design component architecture', 'Optimize rendering performance', 'Build canvas-based features', 'Lead frontend team'],
    requirements: ['6+ years frontend experience', 'Advanced React', 'Performance expertise', 'Team leadership'],
    niceToHave: ['Graphics programming', 'WebGL knowledge'],
    benefits: ['Stock options', 'Remote work', 'Conference budget'],
  },
  {
    title: 'React Developer', company: 'ShopFlow', location: 'Boston, MA', salary: '$100k – $140k', type: 'Full-time', experience: 'Mid Level',
    description: 'Build e-commerce features for a modern shopping platform. Work with React, Redux, and GraphQL.',
    aboutCompany: 'ShopFlow is a rapid-growth e-commerce platform.',
    skills: ['React', 'Redux', 'GraphQL', 'CSS-in-JS', 'Testing', 'TypeScript'],
    responsibilities: ['Build UI components', 'Implement features', 'Write tests', 'Improve performance'],
    requirements: ['3+ years React experience', 'Modern JavaScript', 'Testing knowledge', 'CSS skills'],
    niceToHave: ['Next.js experience', 'State management'],
    benefits: ['$12k signing bonus', 'Relocation support', 'Gym membership'],
  },
  {
    title: 'Frontend Engineer (Mobile Web)', company: 'MobileFirst', location: 'San Francisco, CA', salary: '$110k – $150k', type: 'Full-time', experience: 'Mid Level',
    description: 'Build responsive mobile web applications. Focus on performance and accessibility for low-bandwidth users.',
    aboutCompany: 'MobileFirst specializes in mobile-first web experiences.',
    skills: ['React Native Web', 'React', 'TypeScript', 'PWA', 'Webpack'],
    responsibilities: ['Build responsive UIs', 'Optimize for mobile', 'Implement PWA features', 'Handle performance'],
    requirements: ['3+ years frontend experience', 'Mobile web knowledge', 'React skills', 'CSS proficiency'],
    niceToHave: ['React Native', 'PWA expertise'],
    benefits: ['$15k bonus', 'Equity', 'Flexible schedule'],
  },

  // Data Engineering Jobs
  {
    title: 'Senior Data Engineer', company: 'DataLake Corp', location: 'Remote', salary: '$150k – $200k', type: 'Remote', experience: 'Senior',
    description: 'Build data infrastructure for petabyte-scale analytics. Design data lakes, pipelines, and warehousing solutions.',
    aboutCompany: 'DataLake Corp provides data infrastructure for 50+ enterprise clients.',
    skills: ['Spark', 'Airflow', 'Delta Lake', 'Python', 'SQL', 'Scala', 'Kubernetes'],
    responsibilities: ['Design data architectures', 'Build ETL pipelines', 'Optimize query performance', 'Mentor engineers'],
    requirements: ['6+ years data engineering', 'Spark expertise', 'SQL mastery', 'Big data systems'],
    niceToHave: ['Delta Lake', 'dbt experience'],
    benefits: ['$70k bonus', 'Stock options', 'Learning budget'],
  },
  {
    title: 'Data Engineer', company: 'AnalyticsHub', location: 'Austin, TX', salary: '$110k – $150k', type: 'Full-time', experience: 'Mid Level',
    description: 'Build data pipelines for real-time analytics platform. Work with Kafka, Spark, and Snowflake.',
    aboutCompany: 'AnalyticsHub provides real-time analytics for growth companies.',
    skills: ['Python', 'SQL', 'Kafka', 'Spark', 'Snowflake', 'dbt'],
    responsibilities: ['Build data pipelines', 'Optimize data models', 'Manage data quality', 'Support analytics team'],
    requirements: ['2+ years data engineering', 'SQL proficiency', 'Python skills', 'ETL knowledge'],
    niceToHave: ['Spark experience', 'Snowflake'],
    benefits: ['$18k signing bonus', 'Flexible hours', 'Learning stipend'],
  },

  // Security Jobs
  {
    title: 'Senior Security Engineer', company: 'CyberShield', location: 'Remote', salary: '$160k – $210k', type: 'Remote', experience: 'Senior',
    description: 'Lead security at a cybersecurity company protecting Fortune 500 companies. Design security architectures and threat detection systems.',
    aboutCompany: 'CyberShield is a leading cybersecurity firm.',
    skills: ['Security Architecture', 'Threat Modeling', 'Zero Trust', 'SIEM', 'Go', 'Python'],
    responsibilities: ['Design security systems', 'Threat analysis', 'Lead security initiatives', 'Mentor team'],
    requirements: ['7+ years security experience', 'Security certifications', 'Threat modeling', 'Leadership'],
    niceToHave: ['CISSP', 'Security research'],
    benefits: ['$80k bonus', 'Stock options', 'Premium benefits'],
  }
];

const courses = [
  // AI/ML Courses
  {
    title: 'Advanced Machine Learning with Python', instructor: 'Dr. Sarah Chen', instructorBio: 'PhD from MIT, ex-Google Brain researcher, 15+ years in ML', instructorAvatar: '👩‍🔬', rating: 4.9, reviews: 12450, students: 45200, duration: '8 weeks', level: 'Advanced', image: '🎓', price: '$149', originalPrice: '$299', bestseller: true, skills: ['Python', 'TensorFlow', 'PyTorch', 'Neural Networks'], category: 'AI/ML', language: 'English', lastUpdated: 'March 2026', certificate: true, color: 'from-violet-500 to-purple-600',
    description: 'Master advanced machine learning with hands-on projects. Build production-ready ML systems from CNNs to Transformers.',
    whatYouLearn: ['Build deep neural networks from scratch', 'Implement CNNs for computer vision', 'Create Transformer architectures', 'Deploy models to production', 'Optimize ML pipelines'],
    prerequisites: ['Python intermediate', 'Linear algebra basics', 'Classical ML knowledge'],
    modules: [
      {
        id: 1, title: 'Deep Learning Foundations', lessons: [
          { id: 1, title: 'Neural Networks Basics', duration: '45 min', type: 'video' },
          { id: 2, title: 'Backpropagation & Optimization', duration: '50 min', type: 'video' },
          { id: 3, title: 'Quiz: Fundamentals', duration: '15 min', type: 'quiz' }
        ]
      },
      {
        id: 2, title: 'Convolutional Neural Networks', lessons: [
          { id: 4, title: 'CNN Architecture', duration: '40 min', type: 'video' },
          { id: 5, title: 'Building Image Classifiers', duration: '55 min', type: 'video' },
          { id: 6, title: 'Project: Image Classification', duration: '120 min', type: 'video' }
        ]
      }
    ]
  },
  {
    title: 'Natural Language Processing Masterclass', instructor: 'Prof. James Wilson', instructorBio: 'Ex-OpenAI, 12 years NLP research', instructorAvatar: '👨‍🏫', rating: 4.8, reviews: 8920, students: 32100, duration: '10 weeks', level: 'Advanced', image: '📚', price: '$179', originalPrice: '$349', bestseller: true, skills: ['Python', 'Transformers', 'PyTorch', 'BERT', 'GPT'], category: 'AI/ML', language: 'English', lastUpdated: 'February 2026', certificate: true, color: 'from-blue-500 to-cyan-500',
    description: 'Become an NLP expert. Learn transformer architectures, fine-tune LLMs, and deploy NLP systems at scale.',
    whatYouLearn: ['Understand Transformer architecture', 'Fine-tune BERT and GPT models', 'Build text classification systems', 'Implement question answering', 'Deploy LLMs to production'],
    prerequisites: ['Python advanced', 'Deep learning basics', 'PyTorch knowledge'],
    modules: [
      {
        id: 1, title: 'NLP Fundamentals', lessons: [
          { id: 1, title: 'Tokenization & Embeddings', duration: '40 min', type: 'video' },
          { id: 2, title: 'Word2Vec and GloVe', duration: '45 min', type: 'video' }
        ]
      },
      {
        id: 2, title: 'Transformer Architecture', lessons: [
          { id: 3, title: 'Attention Mechanisms', duration: '55 min', type: 'video' },
          { id: 4, title: 'Building Transformers', duration: '60 min', type: 'video' }
        ]
      }
    ]
  },

  // Cloud/DevOps Courses
  {
    title: 'AWS Solutions Architect Professional', instructor: 'Mark Johnson', instructorBio: 'AWS Certified Solutions Architect, 10+ years cloud', instructorAvatar: '👨‍💼', rating: 4.7, reviews: 15600, students: 78900, duration: '12 weeks', level: 'Advanced', image: '☁️', price: '$129', originalPrice: '$249', bestseller: true, skills: ['AWS', 'Architecture', 'Security', 'Scalability'], category: 'Cloud', language: 'English', lastUpdated: 'March 2026', certificate: true, color: 'from-orange-500 to-red-500',
    description: 'Master AWS architecture for enterprise-scale applications. Prepare for AWS Solutions Architect Professional certification.',
    whatYouLearn: ['Design scalable AWS solutions', 'Implement high availability', 'Optimize costs', 'Implement security best practices', 'Pass the certification exam'],
    prerequisites: ['AWS fundamentals', 'Basic networking', 'Linux basics'],
    modules: [
      {
        id: 1, title: 'Core AWS Services', lessons: [
          { id: 1, title: 'EC2, RDS, S3 Deep Dive', duration: '50 min', type: 'video' },
          { id: 2, title: 'Networking in AWS', duration: '45 min', type: 'video' }
        ]
      }
    ]
  },
  {
    title: 'Kubernetes for DevOps Engineers', instructor: 'Emily Rodriguez', instructorBio: 'Ex-Google, Kubernetes contributor, 8 years DevOps', instructorAvatar: '👩‍💻', rating: 4.8, reviews: 9200, students: 34500, duration: '8 weeks', level: 'Intermediate', image: '🐳', price: '$99', originalPrice: '$199', bestseller: true, skills: ['Kubernetes', 'Docker', 'DevOps', 'Container Orchestration'], category: 'DevOps', language: 'English', lastUpdated: 'March 2026', certificate: true, color: 'from-blue-600 to-blue-400',
    description: 'Master Kubernetes from basics to advanced production patterns. Deploy, scale, and manage containerized applications.',
    whatYouLearn: ['Kubernetes fundamentals', 'Deploy applications with Helm', 'Implement CI/CD with GitOps', 'Monitor and debug clusters', 'Implement security best practices'],
    prerequisites: ['Docker basics', 'Linux command line', 'YAML knowledge'],
    modules: [
      {
        id: 1, title: 'Kubernetes Basics', lessons: [
          { id: 1, title: 'Pods and Deployments', duration: '40 min', type: 'video' },
          { id: 2, title: 'Services and Networking', duration: '45 min', type: 'video' }
        ]
      }
    ]
  },

  // Web Development Courses
  {
    title: 'React: Build Modern Web Apps', instructor: 'Lisa Anderson', instructorBio: 'React Core Contributor, 10 years frontend', instructorAvatar: '👩‍🔬', rating: 4.9, reviews: 28560, students: 120340, duration: '6 weeks', level: 'Intermediate', image: '⚛️', price: '$89', originalPrice: '$199', bestseller: true, skills: ['React', 'JavaScript', 'TypeScript', 'State Management'], category: 'Web Development', language: 'English', lastUpdated: 'March 2026', certificate: true, color: 'from-cyan-500 to-blue-500',
    description: 'Learn React by building real-world applications. From hooks to advanced patterns, become a React expert.',
    whatYouLearn: ['React fundamentals and hooks', 'State management with Redux', 'Performance optimization', 'Testing React components', 'TypeScript with React'],
    prerequisites: ['JavaScript ES6+', 'HTML/CSS', 'Node.js basics'],
    modules: [
      {
        id: 1, title: 'React Fundamentals', lessons: [
          { id: 1, title: 'Components and JSX', duration: '35 min', type: 'video' },
          { id: 2, title: 'Hooks Deep Dive', duration: '50 min', type: 'video' }
        ]
      }
    ]
  },
  {
    title: 'Full Stack Development with MERN', instructor: 'David Lee', instructorBio: 'Full stack engineer, startup founder', instructorAvatar: '👨‍💼', rating: 4.7, reviews: 12340, students: 45670, duration: '10 weeks', level: 'Intermediate', image: '📱', price: '$119', originalPrice: '$259', skills: ['React', 'Node.js', 'MongoDB', 'Express'], category: 'Web Development', language: 'English', lastUpdated: 'February 2026', certificate: true, color: 'from-green-500 to-emerald-500',
    description: 'Build complete web applications with MongoDB, Express, React, and Node.js. Ship production-ready apps.',
    whatYouLearn: ['Build RESTful APIs', 'Create responsive frontends', 'Database design with MongoDB', 'Authentication and authorization', 'Deploy to production'],
    prerequisites: ['JavaScript proficiency', 'HTM/CSS basics', 'Command line basics'],
    modules: [
      {
        id: 1, title: 'Backend Fundamentals', lessons: [
          { id: 1, title: 'Express and REST APIs', duration: '45 min', type: 'video' },
          { id: 2, title: 'MongoDB Basics', duration: '40 min', type: 'video' }
        ]
      }
    ]
  },

  // Data Science Courses
  {
    title: 'Data Science with Python', instructor: 'Dr. Michael Wong', instructorBio: 'Data scientist, Kaggle Master, 8 years DS', instructorAvatar: '👨‍🔬', rating: 4.8, reviews: 16720, students: 67200, duration: '9 weeks', level: 'Intermediate', image: '📊', price: '$109', originalPrice: '$229', bestseller: true, skills: ['Python', 'Pandas', 'Scikit-learn', 'Statistics', 'Data Visualization'], category: 'Data Science', language: 'English', lastUpdated: 'March 2026', certificate: true, color: 'from-pink-500 to-rose-500',
    description: 'Master data science fundamentals. From exploratory analysis to machine learning models, become a data scientist.',
    whatYouLearn: ['Data cleaning and exploration', 'Statistical analysis', 'Build machine learning models', 'Data visualization', 'Communicate insights'],
    prerequisites: ['Python basics', 'Math fundamentals', 'Statistics basics'],
    modules: [
      {
        id: 1, title: 'Data Exploration', lessons: [
          { id: 1, title: 'Pandas for Data Analysis', duration: '45 min', type: 'video' },
          { id: 2, title: 'Data Visualization', duration: '40 min', type: 'video' }
        ]
      }
    ]
  },
  {
    title: 'SQL for Data Analysis', instructor: 'Robert Kim', instructorBio: 'Database architect, 12 years data', instructorAvatar: '👨‍💼', rating: 4.9, reviews: 22100, students: 89340, duration: '4 weeks', level: 'Beginner', image: '🗄️', price: '$59', originalPrice: '$129', bestseller: true, skills: ['SQL', 'Database Design', 'Query Optimization'], category: 'Data Science', language: 'English', lastUpdated: 'March 2026', certificate: true, color: 'from-indigo-500 to-purple-500',
    description: 'Master SQL for data analysis. Write efficient queries, design databases, and analyze big data.',
    whatYouLearn: ['SELECT queries and filtering', 'JOINs and aggregations', 'Window functions', 'Query optimization', 'Database design'],
    prerequisites: ['Basic database knowledge', 'Logical thinking'],
    modules: [
      {
        id: 1, title: 'SQL Basics', lessons: [
          { id: 1, title: 'SELECT and WHERE', duration: '30 min', type: 'video' },
          { id: 2, title: 'JOINs Explained', duration: '40 min', type: 'video' }
        ]
      }
    ]
  }
];

const assessments = [
  // Programming Assessments
  {
    title: 'Python Programming', category: 'Programming', difficulty: 'Intermediate', duration: 45, badge: '🐍', skills: ['Python', 'OOP', 'Data Structures'], attempts: 12450, avgScore: 78, description: 'Test your Python programming knowledge.', color: 'from-blue-500 to-cyan-500',
    questions: [
      { id: 1, question: "What is the output of: print(type([]))?", options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], correct: 0, explanation: "Empty brackets [] create a list." },
      { id: 2, question: "Which of these is NOT a built-in Python data type?", options: ['list', 'tuple', 'set', 'matrix'], correct: 3, explanation: "Matrix is not a built-in type; you need NumPy. List, tuple, and set are all built-in." },
      { id: 3, question: "What does list.pop() do?", options: ['Removes first element', 'Removes last element', 'Removes all elements', 'Returns the list'], correct: 1, explanation: "pop() removes and returns the last element. Use pop(0) to remove the first." },
      { id: 4, question: "How do you create a dictionary in Python?", options: ['dict = []', 'dict = {}', 'dict = ()', 'dict = <>'], correct: 1, explanation: "Curly braces {} create a dictionary. [] creates a list, () creates a tuple." },
      { id: 5, question: "What is the correct way to define a function?", options: ['function myFunc():', 'def myFunc():', 'define myFunc():', 'func myFunc():'], correct: 1, explanation: "Use the 'def' keyword to define a function in Python." }
    ]
  },
  {
    title: 'JavaScript Fundamentals', category: 'Programming', difficulty: 'Beginner', duration: 40, badge: '✨', skills: ['JavaScript', 'Async', 'DOM'], attempts: 15600, avgScore: 82, description: 'Test your JavaScript knowledge.', color: 'from-yellow-400 to-orange-500',
    questions: [
      { id: 1, question: "What is the correct way to declare a variable?", options: ['v myVar = 5;', 'var myVar = 5;', 'variable myVar = 5;', 'let var myVar = 5;'], correct: 1, explanation: "Use var, let, or const. 'var' was the original keyword; 'let' and 'const' are preferred in modern JS." },
      { id: 2, question: "What does 'typeof' return for an array?", options: ['array', 'object', 'list', 'collection'], correct: 1, explanation: "Arrays are objects in JavaScript. typeof [] returns 'object'." },
      { id: 3, question: "How do you write a comment in JavaScript?", options: ['# This is a comment', '// This is a comment', '-- This is a comment', '/* This is a comment */'], correct: 1, explanation: "Use // for single-line comments or /* */ for multi-line comments." },
      { id: 4, question: "What is the output of: console.log(1 + '1')?", options: ['2', '11', 'error', 'NaN'], correct: 1, explanation: "JavaScript coerces the number to a string, resulting in '11'." },
      { id: 5, question: "Which method removes the last element of an array?", options: ['shift()', 'pop()', 'remove()', 'delete()'], correct: 1, explanation: "pop() removes the last element. shift() removes the first." }
    ]
  },
  {
    title: 'SQL Basics', category: 'Databases', difficulty: 'Beginner', duration: 35, badge: '🗄️', skills: ['SQL', 'Databases', 'Queries'], attempts: 18900, avgScore: 85, description: 'Test your SQL knowledge.', color: 'from-indigo-500 to-purple-500',
    questions: [
      { id: 1, question: "Which SQL keyword is used to select data?", options: ['FETCH', 'SELECT', 'GET', 'RETRIEVE'], correct: 1, explanation: "SELECT is used to select data from a database." },
      { id: 2, question: "How do you select all records where the age is greater than 30?", options: ['SELECT * WHERE age > 30;', 'SELECT * FROM users WHERE age > 30;', 'FIND * WHERE age > 30;', 'SELECT FROM users age > 30;'], correct: 1, explanation: "Always use FROM to specify the table, then WHERE for conditions." },
      { id: 3, question: "What does the DISTINCT keyword do?", options: ['Makes distinct users', 'Removes duplicates', 'Orders results', 'Groups by distinct'], correct: 1, explanation: "DISTINCT removes duplicate rows from your results." },
      { id: 4, question: "What is a PRIMARY KEY?", options: ['The first column', 'Uniquely identifies a row', 'A secret key', 'Required for all tables'], correct: 1, explanation: "PRIMARY KEY uniquely identifies each row in a table." },
      { id: 5, question: "How do you join two tables?", options: ['SELECT t1 + t2', 'SELECT * FROM t1 JOIN t2 ON t1.id = t2.id', 'SELECT * FROM t1, t2', 'Both B and C are correct'], correct: 3, explanation: "Both explicit JOIN and comma syntax work, but JOIN is more readable." }
    ]
  },
  {
    title: 'React & Frontend', category: 'Web Development', difficulty: 'Intermediate', duration: 50, badge: '⚛️', skills: ['React', 'JavaScript', 'JSX'], attempts: 10200, avgScore: 76, description: 'Test your React knowledge.', color: 'from-cyan-500 to-blue-500',
    questions: [
      { id: 1, question: "What is JSX?", options: ['JavaScript XML', 'Java Simple XML', 'JSON Extra', 'Java Syntax Extension'], correct: 0, explanation: "JSX stands for JavaScript XML. It's a syntax extension for React." },
      { id: 2, question: "How do you pass props to a component?", options: ['<Component props={data} />', '<Component data />', 'Component(data)', 'Component.props = data'], correct: 0, explanation: "Props are passed as attributes in JSX: <Component prop={value} />" },
      { id: 3, question: "What hook replaces componentDidMount?", options: ['useState', 'useEffect', 'useContext', 'useReducer'], correct: 1, explanation: "useEffect with no dependencies array replaces componentDidMount." },
      { id: 4, question: "When should you use useCallback?", options: ['Always', 'For expensive functions passed to children', 'For every function', 'Never'], correct: 1, explanation: "useCallback memoizes functions to optimize performance when passing to children." },
      { id: 5, question: "What does the spread operator do in React?", options: ['Spreads CSS', 'Spreads props', 'Creates arrays', 'Copies objects'], correct: 3, explanation: "In React, ...props spreads all properties. It can copy objects and merge props." }
    ]
  },

  // AWS/Cloud Assessments
  {
    title: 'AWS Fundamentals', category: 'Cloud', difficulty: 'Beginner', duration: 55, badge: '☁️', skills: ['AWS', 'Cloud', 'EC2', 'S3'], attempts: 22400, avgScore: 79, description: 'Test your AWS knowledge.', color: 'from-orange-500 to-yellow-500',
    questions: [
      { id: 1, question: "What does S3 stand for?", options: ['Simple Service Storage', 'Simple Storage Service', 'Server Standard Storage', 'Secure Storage System'], correct: 1, explanation: "S3 stands for Simple Storage Service, AWS's object storage." },
      { id: 2, question: "Which EC2 instance type offers the best compute power?", options: ['t2.micro', 'c5.large', 'x1.xlarge', 'm5.xlarge'], correct: 2, explanation: "x1 instances are memory-optimized for high compute. c5 is good for general-purpose." },
      { id: 3, question: "What is an Availability Zone?", options: ['A geographic region', 'A physical data center', 'A billing zone', 'A security group'], correct: 1, explanation: "An AZ is a physical data center within a region." },
      { id: 4, question: "How do you ensure high availability in AWS?", options: ['Use one instance', 'Spread across multiple AZs', 'Use RDS', 'Use VPC'], correct: 1, explanation: "Deploy across multiple Availability Zones for high availability." },
      { id: 5, question: "What is IAM?", options: ['Inter AWS Management', 'Identity and Access Management', 'Important Access Method', 'Internal Admin Module'], correct: 1, explanation: "IAM (Identity and Access Management) controls who can do what on AWS." }
    ]
  },
  {
    title: 'Docker & Containers', category: 'DevOps', difficulty: 'Intermediate', duration: 45, badge: '🐳', skills: ['Docker', 'Containers', 'Kubernetes'], attempts: 8900, avgScore: 81, description: 'Test your Docker knowledge.', color: 'from-blue-600 to-cyan-400',
    questions: [
      { id: 1, question: "What is a Docker container?", options: ['A type of virtual machine', 'A lightweight process with isolated environment', 'A storage device', 'A network protocol'], correct: 1, explanation: "Containers are lightweight, isolated processes that include everything needed to run." },
      { id: 2, question: "What is a Dockerfile?", options: ['A text file with Docker configuration', 'A list of Docker files', 'A Docker security file', 'An image repository'], correct: 0, explanation: "A Dockerfile contains instructions to build a Docker image." },
      { id: 3, question: "How do you run a Docker container?", options: ['docker create imagename', 'docker run imagename', 'docker start imagename', 'docker execute imagename'], correct: 1, explanation: "docker run creates and starts a container from an image." },
      { id: 4, question: "What does 'docker-compose' do?", options: ['Composes Docker images', 'Manages multi-container applications', 'Compresses Docker files', 'Deletes containers'], correct: 1, explanation: "docker-compose manages multiple containers and their configurations." },
      { id: 5, question: "What is the difference between an image and container?", options: ['No difference', 'Image is template, container is running instance', 'Container is template', 'Both are the same'], correct: 1, explanation: "An image is a blueprint; a container is a running instance of an image." }
    ]
  },

  // Data Science Assessments
  {
    title: 'Machine Learning Basics', category: 'Data Science', difficulty: 'Intermediate', duration: 50, badge: '�-', skills: ['ML', 'Python', 'Scikit-learn'], attempts: 9450, avgScore: 74, description: 'Test your machine learning knowledge.', color: 'from-purple-500 to-pink-500',
    questions: [
      { id: 1, question: "What is supervised learning?", options: ['Learning without labels', 'Learning with labeled data', 'Learning to supervise', 'Self-taught learning'], correct: 1, explanation: "Supervised learning uses labeled data to train models." },
      { id: 2, question: "What does overfitting mean?", options: ['Fitting too much data', 'Model memorizes training data, poor on new data', 'Not enough features', 'Too few samples'], correct: 1, explanation: "Overfitting occurs when a model learns the training data too well, including noise." },
      { id: 3, question: "How do you split data for ML?", options: ['50-50', '70-30 or 80-20 train-test', 'All training', 'Random split'], correct: 1, explanation: "Common splits are 70-30 or 80-20 for training and testing." },
      { id: 4, question: "What is the purpose of cross-validation?", options: ['Validate code', 'Better estimate model performance', 'Validate data', 'Speed up training'], correct: 1, explanation: "Cross-validation provides a more robust performance estimate." },
      { id: 5, question: "Which metric measures classification accuracy?", options: ['MSE', 'Accuracy', 'RMSE', 'MAE'], correct: 1, explanation: "Accuracy measures the percentage of correct predictions." }
    ]
  },
  {
    title: 'Statistics for Data Science', category: 'Data Science', difficulty: 'Intermediate', duration: 55, badge: '📊', skills: ['Statistics', 'Probability', 'Data Analysis'], attempts: 7200, avgScore: 72, description: 'Test your statistics knowledge.', color: 'from-green-500 to-emerald-500',
    questions: [
      { id: 1, question: "What is standard deviation?", options: ['Average of data', 'Measure of spread around mean', 'Deviation from standard', 'Range of data'], correct: 1, explanation: "Standard deviation measures how spread out data is from the mean." },
      { id: 2, question: "What is a p-value?", options: ['Price value', 'Probability of observing data if null is true', 'Parameter value', 'Point value'], correct: 1, explanation: "P-value indicates the probability of the data occurring by chance." },
      { id: 3, question: "What is correlation?", options: ['Same as causation', 'Measure of relationship between variables', 'Correction of data', 'Correlation matrix'], correct: 1, explanation: "Correlation measures the relationship between variables; it's not causation." },
      { id: 4, question: "What is a normal distribution?", options: ['Common distribution', 'Bell curve with specific properties', 'Distribution without outliers', 'Equal distribution'], correct: 1, explanation: "Normal distribution is a bell curve; symmetric around the mean." },
      { id: 5, question: "What is the 95% confidence interval?", options: ['Mean ± 1 std', 'Mean ± 1.96 std', 'Mean ± 2 std', 'Mean ± 3 std'], correct: 1, explanation: "95% CI is approximately mean ± 1.96 standard deviations." }
    ]
  },

  // Soft Skills Assessments
  {
    title: 'Problem Solving & Algorithms', category: 'Problem Solving', difficulty: 'Advanced', duration: 60, badge: '🧩', skills: ['Algorithms', 'Data Structures', 'Problem Solving'], attempts: 6700, avgScore: 68, description: 'Test your algorithmic problem-solving skills.', color: 'from-red-500 to-orange-500',
    questions: [
      { id: 1, question: "What is the time complexity of binary search?", options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1, explanation: "Binary search divides the search space in half each time: O(log n)." },
      { id: 2, question: "Which sorting algorithm is most efficient?", options: ['Bubble sort', 'Merge sort', 'Insertion sort', 'Selection sort'], correct: 1, explanation: "Merge sort has O(n log n) average and worst case." },
      { id: 3, question: "What is a hash table collision?", options: ['Tables crashing', 'Two keys map to same index', 'Deletion failure', 'Full table'], correct: 1, explanation: "A collision occurs when two different keys hash to the same index." },
      { id: 4, question: "What is dynamic programming?", options: ['Programming without planning', 'Solving with memoization & subproblems', 'Changing code at runtime', 'Multiple problems'], correct: 1, explanation: "DP solves problems by breaking them into subproblems and memoizing results." },
      { id: 5, question: "What is the space complexity of quicksort?", options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correct: 2, explanation: "Quicksort uses O(log n) space for the recursion stack." }
    ]
  },
  {
    title: 'System Design Fundamentals', category: 'Architecture', difficulty: 'Advanced', duration: 70, badge: '🏗️', skills: ['System Design', 'Scalability', 'Architecture'], attempts: 4500, avgScore: 65, description: 'Test your system design knowledge.', color: 'from-slate-600 to-gray-700',
    questions: [
      { id: 1, question: "What is horizontal scaling?", options: ['Adding power to one server', 'Adding more servers', 'Increasing RAM', 'Faster CPU'], correct: 1, explanation: "Horizontal scaling adds more servers; vertical adds power to one." },
      { id: 2, question: "What is eventual consistency?", options: ['Data always consistent', 'Data eventually becomes consistent', 'Consistency check', 'Eventual backup'], correct: 1, explanation: "Eventual consistency: data is temporarily inconsistent but becomes consistent." },
      { id: 3, question: "What is a load balancer?", options: ['Balances weight', 'Distributes traffic across servers', 'Balances code', 'Database tool'], correct: 1, explanation: "Load balancer distributes incoming requests across multiple servers." },
      { id: 4, question: "What is caching?", options: ['Crashing issues', 'Storing frequently used data', 'Cash system', 'Temporary storage'], correct: 1, explanation: "Caching stores frequently accessed data for faster retrieval." },
      { id: 5, question: "What is the CAP theorem?", options: ['Server capacity', 'Consistency, Availability, Partition tolerance', 'Network capacity', 'Data cap'], correct: 1, explanation: "CAP: you can have (at most) 2 of 3: Consistency, Availability, Partition tolerance." }
    ]
  }
];

const importData = async () => {
  try {
    console.log('Connecting to SQL Database via Prisma...');
    
    // Clear out existing data
    await prisma.job.deleteMany();
    await prisma.course.deleteMany();
    await prisma.assessment.deleteMany();
    
    console.log('Inserting Mock Data...');
    await prisma.job.createMany({ data: jobs });
    await prisma.course.createMany({ data: courses });
    await prisma.assessment.createMany({ data: assessments });

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

importData();
