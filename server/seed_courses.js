import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const courses = {
  'data-scientist': {
    title: 'Data Scientist Learning Path',
    description: 'Complete guide to becoming a Data Scientist',
    duration: '6 months',
    level: 'Beginner to Advanced',
    icon: '📊',
    instructor: 'Dr. Mayank Sharma',
    students: 45000,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Python Fundamentals for Data Science',
        lessons: [
          {
            id: 1,
            title: 'Getting Started with Python',
            duration: '45 min',
            content: `# Getting Started with Python for Data Science\n\nPython is the de facto language for data science. Set up your environment and learn basic syntax.\n\n## Core Concepts\n- Variables, Types, Lists, Dictionaries\n- Control Flow (if, for, while)\n- Functions and Lambda expressions\n\n## Practice\nWrite a simple function to calculate the mean of a list.`
          },
          {
            id: 2,
            title: 'NumPy & Pandas',
            duration: '90 min',
            content: `# Numerical Computing\n\nNumPy and Pandas are essential for data manipulation.\n\n## NumPy Arrays\n- Broadcasting, vectorization\n- Matrix operations\n\n## Pandas DataFrames\n- Loading CSVs, filtering, groupby\n- Handling missing values\n- Merging and joining datasets`
          }
        ]
      },
      {
        id: 2,
        title: 'Machine Learning Basics',
        lessons: [
          {
            id: 3,
            title: 'Supervised Learning',
            duration: '60 min',
            content: `# Supervised Learning\n\nLearn algorithms that train on labeled data.\n\n## Key Algorithms\n- Linear Regression\n- Logistic Regression\n- Decision Trees & Random Forests\n\n## Model Evaluation\n- Train/Test Split\n- Cross-Validation\n- Metrics: Accuracy, Precision, Recall, F1, RMSE`
          }
        ]
      }
    ]
  },
  'cloud-architect': {
    title: 'Cloud Architect Learning Path',
    description: 'Master cloud architecture principles and AWS/Azure',
    duration: '4 months',
    level: 'Intermediate to Advanced',
    icon: '☁️',
    instructor: 'Vikrant Singh',
    students: 38000,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Cloud Computing Fundamentals',
        lessons: [
          {
            id: 1,
            title: 'Understanding Cloud Architecture',
            duration: '50 min',
            content: `# Cloud Architecture\n\nLearn how to design scalable and reliable systems on the cloud.\n\n## Core Concepts\n- IaaS, PaaS, SaaS\n- Scalability vs Elasticity\n- High Availability & Fault Tolerance\n\n## Deployment Models\n- Public, Private, Hybrid Cloud\n- Multi-cloud strategies`
          },
          {
            id: 2,
            title: 'AWS & Azure Basics',
            duration: '70 min',
            content: `# Major Cloud Providers\n\nDeep dive into AWS and Azure.\n\n## AWS Core Services\n- EC2, S3, RDS, VPC\n- IAM and Security Groups\n\n## Azure Equivalents\n- Azure VMs, Blob Storage, Azure SQL\n- Resource Groups and RBAC`
          }
        ]
      }
    ]
  },
  'full-stack-engineer': {
    title: 'Full Stack Engineer Learning Path',
    description: 'Build complete web applications from frontend to database',
    duration: '8 months',
    level: 'Beginner to Advanced',
    icon: '💻',
    instructor: 'Priya Kapoor',
    students: 52000,
    rating: 4.7,
    modules: [
      {
        id: 1,
        title: 'Frontend with React',
        lessons: [
          {
            id: 1,
            title: 'React Fundamentals',
            duration: '55 min',
            content: `# React Basics\n\nBuild dynamic user interfaces.\n\n## Concepts\n- JSX and Components\n- Props and State (useState, useEffect)\n- Component Lifecycle\n\n## Practice\nBuild a counter and a todo list.`
          }
        ]
      },
      {
        id: 2,
        title: 'Backend with Node.js',
        lessons: [
          {
            id: 2,
            title: 'Express & APIs',
            duration: '60 min',
            content: `# Node.js Backend\n\nCreate REST APIs.\n\n## Concepts\n- Routing in Express\n- Middleware\n- Error Handling\n- Connecting to Databases (MongoDB/PostgreSQL)`
          }
        ]
      }
    ]
  },
  'ml-engineer': {
    title: 'ML Engineer Learning Path',
    description: 'Build and deploy production machine learning systems',
    duration: '5 months',
    level: 'Intermediate to Advanced',
    icon: '🤖',
    instructor: 'Harshit Tyagi',
    students: 42000,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Advanced Machine Learning',
        lessons: [
          {
            id: 1,
            title: 'Deep Learning with PyTorch',
            duration: '80 min',
            content: `# PyTorch Fundamentals\n\nBuild neural networks.\n\n## Tensors and Autograd\n- Tensor operations\n- Automatic differentiation\n\n## Neural Networks\n- Linear layers, Activation functions\n- Loss functions and Optimizers (Adam, SGD)`
          }
        ]
      },
      {
        id: 2,
        title: 'MLOps & Deployment',
        lessons: [
          {
            id: 2,
            title: 'Model Serving',
            duration: '70 min',
            content: `# Deploying Models\n\nTake models to production.\n\n## Concepts\n- Containerizing models with Docker\n- REST APIs with FastAPI\n- CI/CD for ML (GitHub Actions, MLflow)`
          }
        ]
      }
    ]
  },
  'devops-engineer': {
    title: 'DevOps Engineer Learning Path',
    description: 'Master the bridge between development and operations',
    duration: '6 months',
    level: 'Intermediate',
    icon: '⚙️',
    instructor: 'Arjun Mehta',
    students: 31000,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'CI/CD and Automation',
        lessons: [
          {
            id: 1,
            title: 'Docker & Kubernetes',
            duration: '90 min',
            content: `# Containerization\n\nPackage and orchestrate applications.\n\n## Docker\n- Images vs Containers\n- Dockerfile instructions\n- Docker Compose\n\n## Kubernetes\n- Pods, Deployments, Services\n- ConfigMaps and Secrets\n- Ingress Controllers`
          },
          {
            id: 2,
            title: 'Infrastructure as Code (IaC)',
            duration: '75 min',
            content: `# Terraform & Ansible\n\nManage infrastructure via code.\n\n## Terraform\n- Providers, Resources, Variables\n- State management\n\n## Ansible\n- Playbooks, Roles, Inventory\n- Configuration management`
          }
        ]
      }
    ]
  },
  'cybersecurity-analyst': {
    title: 'Cybersecurity Analyst Learning Path',
    description: 'Protect digital assets and defend against cyber threats',
    duration: '7 months',
    level: 'Beginner to Intermediate',
    icon: '🔒',
    instructor: 'Sanjay Dutt',
    students: 28000,
    rating: 4.7,
    modules: [
      {
        id: 1,
        title: 'Network Security Fundamentals',
        lessons: [
          {
            id: 1,
            title: 'Understanding Cyber Threats',
            duration: '50 min',
            content: `# Cyber Threats\n\nIdentify and mitigate attacks.\n\n## Attack Types\n- Phishing, Malware, Ransomware\n- DDoS, SQL Injection, XSS\n\n## Defense Strategies\n- Firewalls, IDS/IPS\n- Encryption and VPNs\n- Zero Trust Architecture`
          },
          {
            id: 2,
            title: 'Ethical Hacking Basics',
            duration: '80 min',
            content: `# Penetration Testing\n\nThink like a hacker to secure systems.\n\n## Tools\n- Nmap for reconnaissance\n- Metasploit for exploitation\n- Wireshark for packet analysis\n- Burp Suite for web testing`
          }
        ]
      }
    ]
  },
  'data-engineer': {
    title: 'Data Engineer Learning Path',
    description: 'Build robust data pipelines and big data systems',
    duration: '5 months',
    level: 'Intermediate',
    icon: '💾',
    instructor: 'Anjali Rao',
    students: 22000,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Big Data Processing',
        lessons: [
          {
            id: 1,
            title: 'Apache Spark & Hadoop',
            duration: '75 min',
            content: `# Distributed Computing\n\nProcess massive datasets.\n\n## Apache Spark\n- RDDs, DataFrames, Datasets\n- Transformations and Actions\n- Spark SQL and Streaming\n\n## Hadoop Ecosystem\n- HDFS and MapReduce\n- Hive and Presto`
          },
          {
            id: 2,
            title: 'Data Pipelines with Airflow',
            duration: '65 min',
            content: `# Orchestration\n\nAutomate your workflows.\n\n## Apache Airflow\n- DAGs (Directed Acyclic Graphs)\n- Operators and Tasks\n- Scheduling and Monitoring\n- XComs for task communication`
          }
        ]
      }
    ]
  },
  'mobile-developer': {
    title: 'Mobile Developer Learning Path',
    description: 'Build stunning mobile apps for iOS and Android',
    duration: '5 months',
    level: 'Beginner to Intermediate',
    icon: '📱',
    instructor: 'Rohan Verma',
    students: 35000,
    rating: 4.7,
    modules: [
      {
        id: 1,
        title: 'Cross-Platform Development',
        lessons: [
          {
            id: 1,
            title: 'React Native Fundamentals',
            duration: '60 min',
            content: `# React Native\n\nBuild once, run anywhere.\n\n## Core Concepts\n- View, Text, Image components\n- Styling with StyleSheet\n- Navigation (React Navigation)\n\n## Native APIs\n- Accessing camera, geolocation\n- Push notifications`
          },
          {
            id: 2,
            title: 'State Management & API Integration',
            duration: '70 min',
            content: `# App Architecture\n\nManage complex data flows.\n\n## State Management\n- Context API vs Redux vs Zustand\n- Async Storage for persistence\n\n## APIs\n- Fetching data with Axios/Fetch\n- Handling offline states and caching`
          }
        ]
      }
    ]
  },
  'ui-ux-designer': {
    title: 'UI/UX Designer Learning Path',
    description: 'Master user-centered design and modern UI tools',
    duration: '4 months',
    level: 'Beginner to Intermediate',
    icon: '🎨',
    instructor: 'Sarah Jenkins',
    students: 19000,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'UX Research & Wireframing',
        lessons: [
          {
            id: 1,
            title: 'The Design Thinking Process',
            duration: '50 min',
            content: `# Design Thinking\n\nSolve problems for users.\n\n## Phases\n1. Empathize: User interviews, personas\n2. Define: Problem statements\n3. Ideate: Brainstorming solutions\n4. Prototype: Low-fidelity wireframes\n5. Test: Usability testing`
          },
          {
            id: 2,
            title: 'Figma Mastery',
            duration: '90 min',
            content: `# Visual Design with Figma\n\nCreate high-fidelity mockups.\n\n## Figma Features\n- Auto Layout and Constraints\n- Components and Variants\n- Design Systems and Variables\n- Interactive Prototyping and Animations`
          }
        ]
      }
    ]
  },
  'backend-developer': {
    title: 'Backend Developer Learning Path',
    description: 'Build scalable server-side systems and microservices',
    duration: '6 months',
    level: 'Intermediate',
    icon: '🖥️',
    instructor: 'David Chen',
    students: 26000,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'System Design & Architecture',
        lessons: [
          {
            id: 1,
            title: 'Microservices Fundamentals',
            duration: '65 min',
            content: `# Microservices vs Monoliths\n\nScale systems effectively.\n\n## Microservices Architecture\n- Domain-Driven Design\n- Service Discovery and API Gateways\n- Inter-service communication (REST, gRPC, Message Queues)\n\n## Data Management\n- Database per service\n- Saga pattern for distributed transactions`
          },
          {
            id: 2,
            title: 'Performance & Scalability',
            duration: '70 min',
            content: `# High Performance Backends\n\nHandle massive traffic.\n\n## Techniques\n- Caching strategies (Redis, Memcached)\n- Database indexing and query optimization\n- Load balancing and rate limiting\n- Asynchronous processing with workers (RabbitMQ, Kafka)`
          }
        ]
      }
    ]
  },
  'frontend-developer': {
    title: 'Frontend Developer Learning Path',
    description: 'Master modern frontend frameworks and performance',
    duration: '6 months',
    level: 'Intermediate',
    icon: '✨',
    instructor: 'Elena Rodriguez',
    students: 33000,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Advanced React & Architecture',
        lessons: [
          {
            id: 1,
            title: 'TypeScript for React',
            duration: '60 min',
            content: `# Type-Safe Frontend\n\nCatch errors before runtime.\n\n## TypeScript Basics\n- Interfaces vs Types\n- Generics and Utility Types\n\n## React + TS\n- Typing props and state\n- Typing event handlers and refs\n- Advanced component patterns (Render Props, HOCs)`
          },
          {
            id: 2,
            title: 'Next.js & Performance',
            duration: '80 min',
            content: `# Full-Stack React with Next.js\n\nBuild SEO-friendly applications.\n\n## Next.js Features\n- App Router and Server Components\n- Data Fetching (SSR, SSG, ISR)\n- Routing and Layouts\n\n## Web Performance\n- Core Web Vitals (LCP, FID, CLS)\n- Code splitting and lazy loading\n- Image optimization`
          }
        ]
      }
    ]
  }
};

async function updateDatabase() {
  console.log('Updating database with detailed learning paths...');
  for (const [slug, data] of Object.entries(courses)) {
    const existing = await prisma.course.findFirst({
      where: { title: data.title }
    });

    const courseData = {
      title: data.title,
      instructor: data.instructor,
      instructorBio: 'Expert in the field',
      rating: data.rating,
      reviews: Math.floor(data.students * 0.1),
      students: data.students,
      duration: data.duration,
      level: data.level,
      image: data.icon,
      price: 'Free',
      category: 'Learning Path',
      language: 'English',
      lastUpdated: new Date().toISOString().split('T')[0],
      color: 'from-blue-500 to-indigo-600',
      description: data.description,
      modules: data.modules
    };

    if (existing) {
      await prisma.course.update({
        where: { id: existing.id },
        data: courseData
      });
      console.log(`Updated: ${data.title}`);
    } else {
      await prisma.course.create({
        data: courseData
      });
      console.log(`Created: ${data.title}`);
    }
  }
}

async function main() {
  await updateDatabase();
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
