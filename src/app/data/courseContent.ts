export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl?: string;
  content: string;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface LearningPathContent {
  title: string;
  description: string;
  duration: string;
  level: string;
  icon: string;
  instructor: string;
  students: number;
  rating: number;
  videoUrl?: string;
  modules: Module[];
}

export const courseDatabase: Record<string, LearningPathContent> = {
  'data-scientist': {
    title: 'Data Science Career Path',
    description: 'A comprehensive roadmap from statistics basics to advanced machine learning and AI deployment.',
    duration: '6-8 months',
    level: 'Beginner to Advanced',
    icon: '📊',
    instructor: 'CareerDream Expert Faculty',
    students: 45000,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Foundations of Data Science',
        lessons: [
          {
            id: 1,
            title: 'Mathematics & Statistics Fundamentals',
            duration: '2 weeks',
            content: `# Foundations of Statistics\n\n### Objectives\nUnderstand the mathematical pillars of data science: Probability, Linear Algebra, and Calculus.\n\n### Skills to be Gained\n- Descriptive Statistics (Mean, Median, Mode, Variance)\n- Inferential Statistics (Hypothesis Testing, P-values)\n- Matrix Manipulations\n\n### Recommended Practice\n- Calculate standard deviation manually for a small dataset.\n- Conduct a Z-test on a sample population.\n\n### Resources\n- "Practical Statistics for Data Scientists" by Peter Bruce\n- Khan Academy: Statistics and Probability`
          },
          {
            id: 2,
            title: 'Python for Data Analysis',
            duration: '3 weeks',
            content: `# Programming with Python\n\n### Objectives\nLearn Python syntax and data structures specifically for data manipulation.\n\n### Skills to be Gained\n- Data Types & Control Flow\n- NumPy for Numerical Arrays\n- Pandas for DataFrames\n\n### Practical Example\nLoading a CSV file using Pandas: \`df = pd.read_csv('data.csv')\` and using \`df.describe()\` to see summary statistics.\n\n### Exercises\n- Write a script to clean a dataset with missing values.\n- Merge two DataFrames based on a common ID column.`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Machine Learning & EDA',
        lessons: [
          {
            id: 3,
            title: 'Exploratory Data Analysis (EDA)',
            duration: '3 weeks',
            content: `# Exploratory Data Analysis\n\n### Objectives\nLearn how to visualize data to find patterns, anomalies, and relationships.\n\n### Skills to be Gained\n- Matplotlib & Seaborn for visualization\n- Outlier detection techniques\n- Feature engineering basics\n\n### Step-by-Step Progression\nOnce you can manipulate data in Pandas, you move to EDA to understand *what* the data is telling you before building models.`
          },
          {
            id: 4,
            title: 'Supervised & Unsupervised Learning',
            duration: '5 weeks',
            content: `# Machine Learning Algorithms\n\n### Objectives\nMaster the core ML algorithms and know when to apply them.\n\n### Skills to be Gained\n- Regression (Linear, Logistic)\n- Classification (Decision Trees, SVM)\n- Clustering (K-Means)\n\n### Practice Activities\n- Build a house price prediction model using Scikit-Learn.\n- Use K-Means to segment customers from a retail dataset.`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Deep Learning & MLOps',
        lessons: [
          {
            id: 5,
            title: 'Deep Learning & Neural Networks',
            duration: '6 weeks',
            content: `# Deep Learning Fundamentals\n\n### Objectives\nUnderstand the architecture of neural networks and deep learning frameworks.\n\n### Skills to be Gained\n- TensorFlow/PyTorch proficiency\n- Convolutional Neural Networks (CNN)\n- Natural Language Processing (NLP)\n\n### Resources\n- "Deep Learning with Python" by François Chollet\n- Fast.ai Courses`
          },
          {
            id: 6,
            title: 'MLOps & Deployment',
            duration: '4 weeks',
            content: `# Taking Models to Production\n\n### Objectives\nLearn how to deploy models as APIs and monitor their performance.\n\n### Skills to be Gained\n- Model Serving with Flask/FastAPI\n- Version control for models (DVC)\n- Monitoring for data drift`
          }
        ]
      }
    ]
  },
  'cloud-architect': {
    title: 'Cloud Architect Learning Path',
    description: 'Master the architecture and implementation of scalable cloud solutions on AWS, Azure, and GCP.',
    duration: '4-6 months',
    level: 'Intermediate to Advanced',
    icon: '☁️',
    instructor: 'CareerDream Cloud Experts',
    students: 38000,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Cloud Fundamentals',
        lessons: [
          {
            id: 1,
            title: 'Introduction to Cloud Computing',
            duration: '2 weeks',
            content: `# Cloud Foundations\n\n### Objectives\nUnderstand the basic models of cloud computing (IaaS, PaaS, SaaS).\n\n### Skills to be Gained\n- Understanding virtualization\n- Shared responsibility models\n- Regional vs Global infrastructure`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Cloud Services & Architecture',
        lessons: [
          {
            id: 2,
            title: 'Core Infrastructure Services',
            duration: '4 weeks',
            content: `# Virtual Networks & Compute\n\n### Objectives\nLearn how to set up networks (VPC) and virtual machines (EC2/VMs).\n\n### Practice Activities\n- Create a private subnet within a VPC.\n- Launch a web server on a Linux VM and configure security groups.`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Solutions Architecture',
        lessons: [
          {
            id: 3,
            title: 'Designing High Availability Systems',
            duration: '6 weeks',
            content: `# Solutions Architecture Professional\n\n### Objectives\nDesign systems that are fault-tolerant, scalable, and secure.\n\n### Skills to be Gained\n- Load Balancing (ALB/NLB)\n- Auto-scaling groups\n- Disaster Recovery strategies`
          }
        ]
      }
    ]
  },
  'full-stack-engineer': {
    title: 'Full Stack Engineer Path',
    description: 'Become a versatile developer capable of building complex frontend and backend applications.',
    duration: '8-10 months',
    level: 'Beginner to Advanced',
    icon: '💻',
    instructor: 'CareerDream Full-Stack Team',
    students: 52000,
    rating: 4.7,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Frontend Essentials',
        lessons: [
          {
            id: 1,
            title: 'HTML, CSS & Modern Styling',
            duration: '4 weeks',
            content: `# Web Foundations\n\n### Objectives\nMaster the building blocks of the web and responsive design.\n\n### Skills to be Gained\n- Semantic HTML5\n- Flexbox & CSS Grid\n- Responsive Media Queries`
          },
          {
            id: 2,
            title: 'JavaScript Fundamentals',
            duration: '6 weeks',
            content: `# Programming with JS\n\n### Objectives\nMaster core JavaScript concepts required for dynamic applications.\n\n### Skills to be Gained\n- DOM Manipulation\n- Async/Await & Promises\n- ES6+ Syntax`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Frontend Frameworks & Backend',
        lessons: [
          {
            id: 3,
            title: 'React.js & State Management',
            duration: '8 weeks',
            content: `# Modern Frontend Frameworks\n\n### Objectives\nBuild component-based applications using React.\n\n### Skills to be Gained\n- Functional Components & Hooks\n- Context API & Redux\n- Client-side Routing`
          },
          {
            id: 4,
            title: 'Node.js & Express Backend',
            duration: '6 weeks',
            content: `# Server-side Development\n\n### Objectives\nBuild scalable APIs and server-side logic.\n\n### Skills to be Gained\n- RESTful API Design\n- Middleware usage\n- Authentication (JWT)`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Databases & DevOps',
        lessons: [
          {
            id: 5,
            title: 'Database Systems (SQL & NoSQL)',
            duration: '4 weeks',
            content: `# Persistent Data Storage\n\n### Objectives\nLearn to design schemas and manage data persistence.\n\n### Skills to be Gained\n- PostgreSQL/MySQL for SQL\n- MongoDB for NoSQL\n- ORMs like Prisma or Mongoose`
          },
          {
            id: 6,
            title: 'Full Stack Integration & Deployment',
            duration: '4 weeks',
            content: `# CI/CD and Production\n\n### Objectives\nDeploy complete applications and set up automated pipelines.\n\n### Skills to be Gained\n- Docker containerization\n- GitHub Actions for CI/CD\n- Cloud deployment (Vercel, AWS)`
          }
        ]
      }
    ]
  },
  'devops-engineer': {
    title: 'DevOps Engineer Learning Path',
    description: 'Bridge the gap between development and operations through automation and infrastructure as code.',
    duration: '6 months',
    level: 'Intermediate',
    icon: '⚙️',
    instructor: 'Arjun Mehta',
    students: 31000,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Automation & CI/CD',
        lessons: [
          {
            id: 1,
            title: 'Linux Systems & Scripting',
            duration: '4 weeks',
            content: `# Linux for DevOps\n\n### Objectives\nMaster the command line and shell scripting for automation.\n\n### Skills to be Gained\n- Bash/Python Scripting\n- System Administration Basics\n- SSH & Security`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Containers & Orchestration',
        lessons: [
          {
            id: 2,
            title: 'Docker & Kubernetes',
            duration: '8 weeks',
            content: `# Containerization Mastery\n\n### Objectives\nLearn to package applications and manage them at scale.\n\n### Skills to be Gained\n- Dockerfile and Images\n- K8s Pods, Services, and Deployments\n- Helm Charts`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Infrastructure as Code (IaC)',
        lessons: [
          {
            id: 3,
            title: 'Terraform & Configuration Management',
            duration: '6 weeks',
            content: `# Automating Infrastructure\n\n### Objectives\nManage entire cloud infrastructures using code.\n\n### Skills to be Gained\n- Terraform Providers & Modules\n- Ansible for Configuration\n- Monitoring (Prometheus/Grafana)`
          }
        ]
      }
    ]
  },
  'cybersecurity-analyst': {
    title: 'Cybersecurity Analyst Path',
    description: 'Protect systems and networks by mastering defensive and offensive security strategies.',
    duration: '7 months',
    level: 'Beginner to Intermediate',
    icon: '🔒',
    instructor: 'Sanjay Dutt',
    students: 28000,
    rating: 4.7,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Security Foundations',
        lessons: [
          {
            id: 1,
            title: 'Networking & Security Basics',
            duration: '4 weeks',
            content: `# Networking for Security\n\n### Objectives\nUnderstand how data travels and where vulnerabilities exist.\n\n### Skills to be Gained\n- TCP/IP Stack\n- Firewalls & IDS/IPS\n- Cryptography Basics`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Ethical Hacking & Defense',
        lessons: [
          {
            id: 2,
            title: 'Penetration Testing Fundamentals',
            duration: '8 weeks',
            content: `# Offesive Security\n\n### Objectives\nLearn to identify vulnerabilities through authorized simulated attacks.\n\n### Skills to be Gained\n- Nmap Scanning\n- Metasploit Framework\n- OWASP Top 10 Web Vulnerabilities`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Incident Response & GRC',
        lessons: [
          {
            id: 3,
            title: 'Monitoring & Threat Hunting',
            duration: '6 weeks',
            content: `# Blue Team Operations\n\n### Objectives\nDetect and respond to live threats in an organization.\n\n### Skills to be Gained\n- SIEM (Splunk/ELK)\n- Digital Forensics\n- Compliance (SOC2/GDPR)`
          }
        ]
      }
    ]
  },
  'ml-engineer': {
    title: 'ML Engineer Learning Path',
    description: 'Master the transition from building models to deploying and scaling machine learning systems in production.',
    duration: '5 months',
    level: 'Intermediate to Advanced',
    icon: '🤖',
    instructor: 'Harshit Tyagi',
    students: 42000,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Intermediate - Mathematics & Advanced Modeling',
        lessons: [
          {
            id: 1,
            title: 'Mathematical Optimization & Feature Engineering',
            duration: '6 weeks',
            content: `# Beyond the Black Box\n\n### Objectives\nUnderstand the mathematical foundations of machine learning algorithms to better optimize and troubleshoot models.\n\n### Skills to be Gained\n- Advanced Gradient Descent (Adam, RMSProp)\n- Regularization (L1, L2, Elastic Net)\n- Automated Feature Engineering\n- Handling High-Dimensional Data\n\n### Practice Activities\n- Implement a custom Neural Network backpropagation algorithm using only NumPy.\n- Build a feature selection pipeline that automatically identifies the most predictive variables in a 100+ column dataset.\n\n### References\n- "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow" by Aurélien Géron\n- Andrew Ng's Machine Learning Specialization`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Advanced - Deep Learning & Large Scale Systems',
        lessons: [
          {
            id: 2,
            title: 'Deep Learning Architectures & Fine-Tuning',
            duration: '8 weeks',
            content: `# Architecting Intelligence\n\n### Objectives\nMaster the design and implementation of complex deep learning models for NLP and Computer Vision.\n\n### Skills to be Gained\n- Transformer Architectures (BERT, GPT)\n- Convolutional Neural Networks (CNN) Optimization\n- Transfer Learning & Fine-Tuning LLMs\n- Reinforcement Learning Foundations\n\n### Practice Activities\n- Fine-tune a pre-trained BERT model for a specific industry-related sentiment analysis task.\n- Build an object detection system using YOLOv8 for real-time video processing.\n\n### References\n- PyTorch Official Tutorials\n- DeepLearning.ai NLP Specialization`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - MLOps & Production Engineering',
        lessons: [
          {
            id: 3,
            title: 'MLOps: Deployment, Monitoring & Scaling',
            duration: '6 weeks',
            content: `# Engineering the Lifecycle\n\n### Objectives\nBridge the gap between data science and DevOps by automating model deployment and monitoring.\n\n### Skills to be Gained\n- Model Versioning with MLflow\n- Pipeline Orchestration (Kubeflow/Airflow)\n- Real-time Inference with Triton Inference Server\n- Monitoring Model Decay & Drift\n\n### Practice Activities\n- Create a complete CI/CD pipeline for a machine learning model using GitHub Actions and Docker.\n- Implement a monitoring dashboard that alerts when a model's prediction accuracy drops below a specific threshold in production.\n\n### References\n- "Machine Learning Engineering" by Andriy Burkov\n- Google Cloud MLOps Whitepaper`
          }
        ]
      }
    ]
  },
  'data-engineer': {
    title: 'Data Engineer Learning Path',
    description: 'Architect robust data infrastructures, automated pipelines, and large-scale data warehouses.',
    duration: '5 months',
    level: 'Beginner to Advanced',
    icon: '💾',
    instructor: 'Anjali Rao',
    students: 22000,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Data Modeling & SQL Foundations',
        lessons: [
          {
            id: 1,
            title: 'Advanced SQL & Schema Design',
            duration: '6 weeks',
            content: `# Designing for Performance\n\n### Objectives\nMaster the art of structuring data for efficient retrieval and storage in enterprise environments.\n\n### Skills to be Gained\n- Star & Snowflake Schemas\n- Window Functions & Recursive CTEs\n- Data Normalization vs Denormalization\n- Indexing Strategies for Large Tables\n\n### Practice Activities\n- Design a data warehouse schema for a global retail business processing millions of transactions daily.\n- Write a complex SQL query to calculate rolling 30-day user retention across multiple regions.\n\n### References\n- "The Data Warehouse Toolkit" by Ralph Kimball\n- PostgreSQL Performance Tuning Guide`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - ETL Pipelines & Distributed Computing',
        lessons: [
          {
            id: 2,
            title: 'Apache Spark & Big Data Processing',
            duration: '8 weeks',
            content: `# Scaling Data Processing\n\n### Objectives\nLearn to process massive datasets using distributed computing frameworks and build efficient ETL pipelines.\n\n### Skills to be Gained\n- Apache Spark (PySpark) Essentials\n- Batch vs Stream Processing\n- Data Lakehouse Architectures (Delta Lake)\n- ETL Tooling (dbt/Informatica)\n\n### Practice Activities\n- Build a Spark job to process 10GB of log data and extract meaningful user behavior metrics.\n- Implement a Delta Lake solution to handle ACID transactions on a data lake.\n\n### References\n- "Designing Data-Intensive Applications" by Martin Kleppmann\n- Databricks Spark Academy`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Orchestration & Real-time Streaming',
        lessons: [
          {
            id: 3,
            title: 'Airflow Orchestration & Kafka Streaming',
            duration: '6 weeks',
            content: `# Real-time Data Ecosystems\n\n### Objectives\nMaster the tools required to schedule complex data workflows and handle live data streams.\n\n### Skills to be Gained\n- Airflow DAG Design & Management\n- Kafka Streams & KSQL\n- Change Data Capture (CDC) Patterns\n- Data Quality & Observability\n\n### Practice Activities\n- Create a multi-stage Airflow DAG that fetches data from an API, processes it in Spark, and loads it into Snowflake.\n- Build a real-time event processing pipeline using Kafka and Spark Streaming to detect fraudulent transactions.\n\n### References\n- Astronomer.io Airflow Guides\n- Confluent Kafka Documentation`
          }
        ]
      }
    ]
  },
  'mobile-developer': {
    title: 'Mobile Developer Path',
    description: 'Build stunning mobile apps for iOS and Android.',
    duration: '5 months',
    level: 'Beginner to Intermediate',
    icon: '📱',
    instructor: 'Rohan Verma',
    students: 35000,
    rating: 4.7,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Cross-Platform UI',
        lessons: [
          {
            id: 1,
            title: 'React Native Basics',
            duration: '6 weeks',
            content: `# Mobile UI Foundations\n\n### Objectives\nBuild responsive layouts for mobile devices using React Native.\n\n### Skills to be Gained\n- Flexbox for Mobile\n- Component Styling\n- Handling User Input`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Native Features & State',
        lessons: [
          {
            id: 2,
            title: 'Integrating Native APIs & Redux',
            duration: '6 weeks',
            content: `# Beyond the Screen\n\n### Objectives\nAccess hardware features like Camera and GPS while managing complex application state.\n\n### Skills to be Gained\n- Expo & Bare workflow\n- Persistent storage (AsyncStorage)\n- Push Notifications\n- Global State Management for Mobile`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Deployment & Optimization',
        lessons: [
          {
            id: 3,
            title: 'App Store Submission & Performance',
            duration: '6 weeks',
            content: `# Production Ready Apps\n\n### Objectives\nOptimize your mobile app for performance and navigate the App Store/Play Store submission process.\n\n### Skills to be Gained\n- App Performance Profiling\n- Code Splitting & Asset Optimization\n- CI/CD for Mobile (Fastlane)\n- App Store Optimization (ASO) Basics`
          }
        ]
      }
    ]
  },
  'ui-ux-designer': {
    title: 'UI/UX Designer Learning Path',
    description: 'Master the art of user-centered design, from research to high-fidelity prototyping.',
    duration: '4 months',
    level: 'Beginner to Advanced',
    icon: '🎨',
    instructor: 'Sarah Jenkins',
    students: 19000,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Design Foundations & UX Research',
        lessons: [
          {
            id: 1,
            title: 'UX Research & User Psychology',
            duration: '4 weeks',
            content: `# Understanding the User Mindset\n\n### Objectives\nMaster the scientific approach to understanding user needs, behaviors, and pain points.\n\n### Skills to be Gained\n- User Interview Techniques\n- Creating Data-Driven Personas\n- Empathy Mapping & User Journeys\n- Cognitive Bias in Design\n\n### Practice Activities\n- Conduct a 1-on-1 user interview for a shopping app.\n- Build a comprehensive User Journey Map for a travel booking experience.\n\n### References\n- "Don't Make Me Think" by Steve Krug\n- Nielsen Norman Group UX Research Articles`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Interface Design & Figma Mastery',
        lessons: [
          {
            id: 2,
            title: 'High-Fidelity UI Design with Figma',
            duration: '6 weeks',
            content: `# The Art of the Interface\n\n### Objectives\nTransition from wireframes to polished, interactive, and accessible user interfaces.\n\n### Skills to be Gained\n- Figma Auto-Layout & Variants\n- Design Systems & Component Libraries\n- Accessibility Standards (WCAG)\n- Advanced Micro-interactions\n\n### Practice Activities\n- Build a responsive dashboard UI with a dark/light mode toggle.\n- Create a functional design system for a fintech startup including typography, colors, and 20+ components.\n\n### References\n- Apple Human Interface Guidelines\n- Google Material Design 3 Documentation`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Strategic UX & Product Design',
        lessons: [
          {
            id: 3,
            title: 'Design Strategy & Handoff',
            duration: '6 weeks',
            content: `# Designing for Business Impact\n\n### Objectives\nLearn to align design decisions with business goals and collaborate effectively with engineering teams.\n\n### Skills to be Gained\n- A/B Testing & Data-Informed Design\n- Developer Handoff Best Practices\n- Strategic Product Thinking\n- UX Writing & Microcopy\n\n### Practice Activities\n- Redesign a high-traffic landing page to improve conversion rates by 15% (mock data).\n- Prepare a complete handoff documentation in Zeplin or Figma for a complex multi-page app.\n\n### References\n- "About Face" by Alan Cooper\n- Growth.design Case Studies`
          }
        ]
      }
    ]
  },
  'backend-developer': {
    title: 'Backend Developer Learning Path',
    description: 'Build robust, scalable, and secure server-side applications and distributed systems.',
    duration: '6 months',
    level: 'Beginner to Advanced',
    icon: '🖥️',
    instructor: 'David Chen',
    students: 26000,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Server Foundations & Databases',
        lessons: [
          {
            id: 1,
            title: 'Node.js & Database Architecture',
            duration: '8 weeks',
            content: `# Building Secure Foundations\n\n### Objectives\nMaster the core of backend development using Node.js and SQL/NoSQL databases.\n\n### Skills to be Gained\n- RESTful API Design\n- Schema Design & Normalization\n- Authentication (JWT & OAuth)\n- Middleware & Error Handling\n\n### Practice Activities\n- Build a fully functional task management API with PostgreSQL and Express.\n- Implement a secure authentication system with password hashing and session management.\n\n### References\n- MDN Express Guide\n- PostgreSQL Official Documentation`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Scalability & Performance',
        lessons: [
          {
            id: 2,
            title: 'Redis, Caching & Message Queues',
            duration: '8 weeks',
            content: `# Optimizing for Speed\n\n### Objectives\nLearn to handle high traffic and background processing efficiently.\n\n### Skills to be Gained\n- Distributed Caching with Redis\n- Background Jobs (BullMQ/RabbitMQ)\n- SQL Optimization & Indexing\n- API Rate Limiting\n\n### Practice Activities\n- Implement a leaderboard system using Redis sorted sets.\n- Build a notification service that processes emails in the background using a message queue.\n\n### References\n- Redis University\n- High Scalability Blog`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Microservices & Cloud Native',
        lessons: [
          {
            id: 3,
            title: 'Distributed Systems & Docker',
            duration: '8 weeks',
            content: `# Engineering at Scale\n\n### Objectives\nArchitect complex distributed systems and deploy them using modern containerization.\n\n### Skills to be Gained\n- Microservices Architecture\n- Docker & Container Orchestration\n- gRPC & Service Mesh\n- CI/CD Pipelines for Backend\n\n### Practice Activities\n- Decompose a monolithic blog app into three microservices (Auth, Content, Media).\n- Containerize a multi-service application and deploy it to a Kubernetes cluster.\n\n### References\n- "Microservices Patterns" by Chris Richardson\n- Docker Mastery Guide`
          }
        ]
      }
    ]
  },
  'frontend-developer': {
    title: 'Frontend Developer Learning Path',
    description: 'Master the art of building blazing-fast, interactive, and accessible user interfaces.',
    duration: '6 months',
    level: 'Beginner to Advanced',
    icon: '✨',
    instructor: 'Elena Rodriguez',
    students: 33000,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Stage 1: Beginner - Modern React & State',
        lessons: [
          {
            id: 1,
            title: 'React Fundamentals & State Management',
            duration: '8 weeks',
            content: `# Thinking in React\n\n### Objectives\nBuild a solid foundation in modern React, focusing on hooks and component architecture.\n\n### Skills to be Gained\n- Functional Components & Hooks\n- State Management (Context/Redux)\n- Component Lifecycle Mastery\n- Responsive Design with Tailwind\n\n### Practice Activities\n- Build a multi-step form with validation and complex state transitions.\n- Create a responsive landing page using Tailwind CSS with animations.\n\n### References\n- React.dev Documentation\n- Tailwind CSS Documentation`
          }
        ]
      },
      {
        id: 2,
        title: 'Stage 2: Intermediate - Advanced Frameworks & Tooling',
        lessons: [
          {
            id: 2,
            title: 'Next.js & Server Components',
            duration: '8 weeks',
            content: `# The Full Stack Frontend\n\n### Objectives\nMaster Next.js for server-side rendering, SEO, and enterprise-level architecture.\n\n### Skills to be Gained\n- App Router & Server Components\n- Data Fetching Patterns\n- SEO Optimization & Meta Tags\n- Middleware & Auth Integration\n\n### Practice Activities\n- Build a full-featured blog engine using Next.js with Static Site Generation (SSG).\n- Implement an e-commerce product catalog with server-side filtering and sorting.\n\n### References\n- Next.js Learn Course\n- Vercel Web Vitals Guide`
          }
        ]
      },
      {
        id: 3,
        title: 'Stage 3: Advanced - Performance & Large Scale Apps',
        lessons: [
          {
            id: 3,
            title: 'Optimization & Design Systems',
            duration: '8 weeks',
            content: `# Performance Engineering\n\n### Objectives\nLearn to scale large frontend codebases and optimize for maximum speed.\n\n### Skills to be Gained\n- Core Web Vitals Optimization\n- Build Tools (Vite/Webpack)\n- Component Library Development\n- Unit & E2E Testing (Vitest/Cypress)\n\n### Practice Activities\n- Audit a slow website and improve its Lighthouse score by 30+ points.\n- Build and publish a reusable UI component library to NPM.\n\n### References\n- Web.dev Performance Patterns\n- Testing-Library.com`
          }
        ]
      }
    ]
  }
};
