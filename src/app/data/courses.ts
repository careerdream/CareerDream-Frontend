export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed?: boolean;
}

export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorBio: string;
  instructorAvatar: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  price: string;
  originalPrice?: string;
  bestseller?: boolean;
  skills: string[];
  category: string;
  description: string;
  whatYouLearn: string[];
  prerequisites: string[];
  modules: Module[];
  language: string;
  lastUpdated: string;
  certificate: boolean;
  color: string;
}

export const courses: Course[] = [
  {
    id: 1,
    title: 'Advanced Machine Learning with Python',
    instructor: 'Dr. Sarah Chen',
    instructorBio: 'PhD from MIT, ex-Google Brain researcher, 15+ years in ML. Author of "Practical Deep Learning".',
    instructorAvatar: '👩‍🔬',
    rating: 4.9,
    reviews: 12450,
    students: 45200,
    duration: '8 weeks',
    level: 'Advanced',
    image: '🎓',
    price: '$149',
    originalPrice: '$299',
    bestseller: true,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Neural Networks', 'CNNs', 'RNNs', 'Transformers'],
    category: 'AI/ML',
    description: 'Master advanced machine learning with hands-on projects. From CNNs to Transformers, build production-ready ML systems. This course goes deep into the mathematics and implementation of modern deep learning architectures.',
    whatYouLearn: [
      'Build and train deep neural networks from scratch',
      'Implement CNNs for computer vision tasks',
      'Build Transformer architectures for NLP',
      'Deploy ML models to production with Flask/FastAPI',
      'Optimize model performance and reduce inference time',
      'Use MLflow for experiment tracking and model registry',
    ],
    prerequisites: [
      'Python programming (intermediate level)',
      'Basic linear algebra and calculus',
      'Familiarity with classical ML (regression, classification)',
    ],
    language: 'English',
    lastUpdated: 'March 2026',
    certificate: true,
    color: 'from-violet-500 to-purple-600',
    modules: [
      {
        id: 1, title: 'Deep Learning Foundations', lessons: [
          { id: 1, title: 'Neural Network Architecture Overview', duration: '18 min', type: 'video', completed: true },
          { id: 2, title: 'Backpropagation Mathematics', duration: '25 min', type: 'video', completed: true },
          { id: 3, title: 'Activation Functions Deep Dive', duration: '15 min', type: 'reading', completed: true },
          { id: 4, title: 'Module 1 Quiz', duration: '10 min', type: 'quiz', completed: false },
        ]
      },
      {
        id: 2, title: 'Convolutional Neural Networks', lessons: [
          { id: 5, title: 'Convolution Operations Explained', duration: '22 min', type: 'video', completed: false },
          { id: 6, title: 'Pooling and Feature Maps', duration: '18 min', type: 'video', completed: false },
          { id: 7, title: 'Transfer Learning with ResNet & VGG', duration: '30 min', type: 'video', completed: false },
          { id: 8, title: 'Building an Image Classifier', duration: '45 min', type: 'video', completed: false },
        ]
      },
      {
        id: 3, title: 'Transformers & Attention Mechanisms', lessons: [
          { id: 9, title: 'Attention Is All You Need — Paper Review', duration: '35 min', type: 'video', completed: false },
          { id: 10, title: 'Implementing Self-Attention from Scratch', duration: '40 min', type: 'video', completed: false },
          { id: 11, title: 'BERT Fine-Tuning for NLP Tasks', duration: '50 min', type: 'video', completed: false },
        ]
      },
      {
        id: 4, title: 'Production ML Systems', lessons: [
          { id: 12, title: 'MLOps Pipeline Design', duration: '28 min', type: 'video', completed: false },
          { id: 13, title: 'Model Serving with FastAPI', duration: '35 min', type: 'video', completed: false },
          { id: 14, title: 'Monitoring Models in Production', duration: '20 min', type: 'reading', completed: false },
          { id: 15, title: 'Final Project: Build a Production ML System', duration: '120 min', type: 'video', completed: false },
        ]
      },
    ],
  },
  {
    id: 2,
    title: 'AWS Cloud Mastery: Solutions Architect',
    instructor: 'John Mitchell',
    instructorBio: 'AWS Principal Solutions Architect, 12+ certifications, ex-Amazon. Trained 100,000+ cloud engineers.',
    instructorAvatar: '👨‍💼',
    rating: 4.8,
    reviews: 8900,
    students: 38100,
    duration: '6 weeks',
    level: 'Intermediate',
    image: '☁️',
    price: '$129',
    originalPrice: '$249',
    skills: ['AWS', 'EC2', 'S3', 'Lambda', 'RDS', 'VPC', 'CloudFormation', 'EKS'],
    category: 'Cloud',
    description: 'Become an AWS Solutions Architect with hands-on labs covering all major services. Prepare for the AWS SAA-C03 exam with real-world architecture scenarios.',
    whatYouLearn: [
      'Design highly available and fault-tolerant AWS architectures',
      'Implement security best practices with IAM, VPC, and KMS',
      'Deploy containerized workloads on EKS',
      'Build serverless applications with Lambda and API Gateway',
      'Design cost-optimized architectures using AWS Well-Architected Framework',
      'Pass the AWS Solutions Architect Associate exam',
    ],
    prerequisites: [
      'Basic cloud computing concepts',
      'Linux command line familiarity',
      'Basic networking (TCP/IP, DNS, HTTP)',
    ],
    language: 'English',
    lastUpdated: 'February 2026',
    certificate: true,
    color: 'from-orange-400 to-yellow-500',
    modules: [
      {
        id: 1, title: 'AWS Fundamentals', lessons: [
          { id: 1, title: 'AWS Global Infrastructure', duration: '15 min', type: 'video', completed: true },
          { id: 2, title: 'IAM: Users, Roles, and Policies', duration: '30 min', type: 'video', completed: true },
          { id: 3, title: 'VPC Design and Subnets', duration: '25 min', type: 'video', completed: false },
        ]
      },
      {
        id: 2, title: 'Compute & Storage', lessons: [
          { id: 4, title: 'EC2: Instance Types and Launch Templates', duration: '25 min', type: 'video', completed: false },
          { id: 5, title: 'Auto Scaling and Load Balancing', duration: '30 min', type: 'video', completed: false },
          { id: 6, title: 'S3: Storage Classes and Lifecycle Policies', duration: '20 min', type: 'video', completed: false },
        ]
      },
      {
        id: 3, title: 'Databases & Serverless', lessons: [
          { id: 7, title: 'RDS: Multi-AZ and Read Replicas', duration: '22 min', type: 'video', completed: false },
          { id: 8, title: 'DynamoDB Patterns and Global Tables', duration: '28 min', type: 'video', completed: false },
          { id: 9, title: 'Lambda + API Gateway: Serverless Patterns', duration: '35 min', type: 'video', completed: false },
        ]
      },
      {
        id: 4, title: 'Containers & DevOps', lessons: [
          { id: 10, title: 'ECS vs EKS: When to Use What', duration: '20 min', type: 'video', completed: false },
          { id: 11, title: 'CloudFormation & CDK', duration: '30 min', type: 'video', completed: false },
          { id: 12, title: 'CodePipeline: End-to-End CI/CD on AWS', duration: '35 min', type: 'video', completed: false },
        ]
      },
    ],
  },
  {
    id: 3,
    title: 'Full Stack Development Bootcamp',
    instructor: 'Maria Garcia',
    instructorBio: 'Senior SWE at Netflix, full-stack developer for 12 years, creator of 5 popular open-source tools.',
    instructorAvatar: '👩‍💻',
    rating: 4.9,
    reviews: 15600,
    students: 52300,
    duration: '12 weeks',
    level: 'Beginner',
    image: '💻',
    price: '$199',
    originalPrice: '$399',
    bestseller: true,
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    category: 'Full Stack',
    description: 'Go from zero to full-stack developer in 12 weeks. Build 10+ real-world projects including a LinkedIn clone, e-commerce platform, and real-time chat app.',
    whatYouLearn: [
      'Build modern React apps with hooks, context, and TypeScript',
      'Create REST APIs with Node.js and Express',
      'Design NoSQL databases with MongoDB and SQL with PostgreSQL',
      'Implement authentication with JWT and OAuth',
      'Deploy full-stack apps on Vercel and Railway',
      'Write tests with Jest and Cypress',
    ],
    prerequisites: [
      'Basic HTML and CSS knowledge',
      'No programming experience required',
    ],
    language: 'English',
    lastUpdated: 'March 2026',
    certificate: true,
    color: 'from-blue-500 to-cyan-500',
    modules: [
      {
        id: 1, title: 'JavaScript & TypeScript Mastery', lessons: [
          { id: 1, title: 'Modern JavaScript ES2024 Features', duration: '30 min', type: 'video', completed: true },
          { id: 2, title: 'TypeScript: Types, Interfaces, Generics', duration: '35 min', type: 'video', completed: true },
          { id: 3, title: 'Async/Await and Promises Deep Dive', duration: '25 min', type: 'video', completed: true },
        ]
      },
      {
        id: 2, title: 'React Development', lessons: [
          { id: 4, title: 'React 18 New Features', duration: '20 min', type: 'video', completed: false },
          { id: 5, title: 'Custom Hooks and State Management', duration: '30 min', type: 'video', completed: false },
          { id: 6, title: 'React Query for Server State', duration: '25 min', type: 'video', completed: false },
          { id: 7, title: 'Project: Build a Job Portal', duration: '120 min', type: 'video', completed: false },
        ]
      },
      {
        id: 3, title: 'Backend with Node.js', lessons: [
          { id: 8, title: 'Express.js Routing and Middleware', duration: '28 min', type: 'video', completed: false },
          { id: 9, title: 'REST API Design Best Practices', duration: '20 min', type: 'video', completed: false },
          { id: 10, title: 'JWT Authentication from Scratch', duration: '35 min', type: 'video', completed: false },
          { id: 11, title: 'File Uploads with Multer and S3', duration: '25 min', type: 'video', completed: false },
        ]
      },
      {
        id: 4, title: 'Databases', lessons: [
          { id: 12, title: 'MongoDB: Schema Design Patterns', duration: '25 min', type: 'video', completed: false },
          { id: 13, title: 'PostgreSQL and Prisma ORM', duration: '30 min', type: 'video', completed: false },
          { id: 14, title: 'Database Indexing and Query Optimization', duration: '20 min', type: 'reading', completed: false },
        ]
      },
      {
        id: 5, title: 'Deployment & DevOps', lessons: [
          { id: 15, title: 'Docker Fundamentals for Developers', duration: '30 min', type: 'video', completed: false },
          { id: 16, title: 'CI/CD with GitHub Actions', duration: '25 min', type: 'video', completed: false },
          { id: 17, title: 'Deploy to Vercel + Railway', duration: '20 min', type: 'video', completed: false },
        ]
      },
    ],
  },
  {
    id: 4,
    title: 'Data Science with Python & Pandas',
    instructor: 'David Kumar',
    instructorBio: 'Lead Data Scientist at Spotify, ex-McKinsey Analytics, MS in Applied Mathematics from Stanford.',
    instructorAvatar: '👨‍🔬',
    rating: 4.7,
    reviews: 10200,
    students: 41500,
    duration: '10 weeks',
    level: 'Intermediate',
    image: '📊',
    price: '$139',
    originalPrice: '$279',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'SQL'],
    category: 'Data Science',
    description: 'Master data science from data wrangling to machine learning. Analyze real-world datasets from Netflix, Airbnb, and Kaggle competitions.',
    whatYouLearn: [
      'Data manipulation with Pandas (merge, groupby, pivot tables)',
      'Statistical analysis and hypothesis testing',
      'Machine learning: classification, regression, clustering',
      'Data visualization with Matplotlib, Seaborn, and Plotly',
      'Feature engineering and model selection',
      'Kaggle competition strategies',
    ],
    prerequisites: [
      'Python basics (functions, loops, lists)',
      'High school statistics knowledge',
    ],
    language: 'English',
    lastUpdated: 'January 2026',
    certificate: true,
    color: 'from-green-500 to-emerald-600',
    modules: [
      {
        id: 1, title: 'Python for Data Science', lessons: [
          { id: 1, title: 'NumPy: Arrays and Vectorization', duration: '22 min', type: 'video', completed: true },
          { id: 2, title: 'Pandas: DataFrames and Series', duration: '30 min', type: 'video', completed: true },
          { id: 3, title: 'Data Cleaning: Handling Missing Values', duration: '25 min', type: 'video', completed: false },
        ]
      },
      {
        id: 2, title: 'Exploratory Data Analysis', lessons: [
          { id: 4, title: 'Statistical Summaries and Distributions', duration: '20 min', type: 'video', completed: false },
          { id: 5, title: 'Data Visualization Best Practices', duration: '25 min', type: 'video', completed: false },
          { id: 6, title: 'Correlation and Feature Relationships', duration: '18 min', type: 'video', completed: false },
        ]
      },
      {
        id: 3, title: 'Machine Learning', lessons: [
          { id: 7, title: 'Regression: Linear and Polynomial', duration: '30 min', type: 'video', completed: false },
          { id: 8, title: 'Classification: Decision Trees and RF', duration: '35 min', type: 'video', completed: false },
          { id: 9, title: 'Clustering with K-Means and DBSCAN', duration: '25 min', type: 'video', completed: false },
          { id: 10, title: 'Model Evaluation and Cross-Validation', duration: '20 min', type: 'video', completed: false },
        ]
      },
    ],
  },
  {
    id: 5,
    title: 'Kubernetes for DevOps Engineers',
    instructor: 'Alex Johnson',
    instructorBio: 'CKA/CKAD certified, CNCF ambassador, 10 years in platform engineering. Author of "Kubernetes in Production".',
    instructorAvatar: '👨‍🚀',
    rating: 4.8,
    reviews: 7300,
    students: 28900,
    duration: '5 weeks',
    level: 'Advanced',
    image: '🚀',
    price: '$119',
    originalPrice: '$219',
    skills: ['Kubernetes', 'Docker', 'CI/CD', 'Helm', 'Istio', 'Prometheus', 'Grafana'],
    category: 'DevOps',
    description: 'Master Kubernetes in production environments. Covers advanced topics: RBAC, network policies, service mesh with Istio, GitOps with ArgoCD, and observability.',
    whatYouLearn: [
      'Deploy and manage Kubernetes clusters on EKS, AKS, and GKE',
      'Implement RBAC, network policies, and pod security standards',
      'Set up service mesh with Istio for traffic management',
      'Implement GitOps workflows with ArgoCD',
      'Monitor Kubernetes with Prometheus and Grafana',
      'Prepare for CKA/CKAD certifications',
    ],
    prerequisites: [
      'Docker container experience (1+ year)',
      'Command-line and Linux proficiency',
      'Basic YAML knowledge',
    ],
    language: 'English',
    lastUpdated: 'March 2026',
    certificate: true,
    color: 'from-indigo-500 to-blue-600',
    modules: [
      {
        id: 1, title: 'Kubernetes Core Concepts', lessons: [
          { id: 1, title: 'Pods, Deployments, and ReplicaSets', duration: '25 min', type: 'video', completed: false },
          { id: 2, title: 'Services, Ingress, and DNS', duration: '30 min', type: 'video', completed: false },
          { id: 3, title: 'ConfigMaps and Secrets Management', duration: '20 min', type: 'video', completed: false },
        ]
      },
      {
        id: 2, title: 'Production-Grade K8s', lessons: [
          { id: 4, title: 'RBAC: Roles, ClusterRoles, Bindings', duration: '25 min', type: 'video', completed: false },
          { id: 5, title: 'Network Policies and Pod Security', duration: '22 min', type: 'video', completed: false },
          { id: 6, title: 'Horizontal and Vertical Pod Autoscaling', duration: '20 min', type: 'video', completed: false },
        ]
      },
      {
        id: 3, title: 'Service Mesh & Observability', lessons: [
          { id: 7, title: 'Istio: Traffic Management & mTLS', duration: '35 min', type: 'video', completed: false },
          { id: 8, title: 'Prometheus Metrics Stack', duration: '28 min', type: 'video', completed: false },
          { id: 9, title: 'Grafana Dashboards for Kubernetes', duration: '25 min', type: 'video', completed: false },
        ]
      },
    ],
  },
  {
    id: 6,
    title: 'Cybersecurity Fundamentals & Ethical Hacking',
    instructor: 'Emma Williams',
    instructorBio: 'OSCP, CISSP certified, ex-NSA security researcher, founder of a bug bounty firm. Author of 3 security books.',
    instructorAvatar: '👩‍💻',
    rating: 4.6,
    reviews: 9400,
    students: 35600,
    duration: '7 weeks',
    level: 'Beginner',
    image: '🔒',
    price: '$109',
    originalPrice: '$199',
    skills: ['Network Security', 'Ethical Hacking', 'Penetration Testing', 'Kali Linux', 'OWASP', 'Wireshark'],
    category: 'Cybersecurity',
    description: 'Learn cybersecurity from fundamentals to ethical hacking. Practice in legal lab environments, understand attacker mindsets, and prepare for Security+ certification.',
    whatYouLearn: [
      'Network security concepts: firewalls, IDS/IPS, VPN',
      'Web application security: OWASP Top 10, SQLi, XSS',
      'Penetration testing methodology with Kali Linux',
      'Network scanning with Nmap and traffic analysis with Wireshark',
      'Cryptography: symmetric, asymmetric encryption, PKI',
      'Security certifications: CompTIA Security+ prep',
    ],
    prerequisites: [
      'Basic networking concepts (TCP/IP, OSI model)',
      'Linux command line basics',
    ],
    language: 'English',
    lastUpdated: 'February 2026',
    certificate: true,
    color: 'from-red-500 to-orange-500',
    modules: [
      {
        id: 1, title: 'Security Foundations', lessons: [
          { id: 1, title: 'CIA Triad and Security Fundamentals', duration: '18 min', type: 'video', completed: false },
          { id: 2, title: 'Network Protocols and Attack Surfaces', duration: '25 min', type: 'video', completed: false },
          { id: 3, title: 'Cryptography: From Caesar Cipher to AES', duration: '30 min', type: 'video', completed: false },
        ]
      },
      {
        id: 2, title: 'Web Application Security', lessons: [
          { id: 4, title: 'OWASP Top 10: SQL Injection', duration: '25 min', type: 'video', completed: false },
          { id: 5, title: 'Cross-Site Scripting (XSS) Attacks', duration: '20 min', type: 'video', completed: false },
          { id: 6, title: 'Authentication Vulnerabilities and CSRF', duration: '22 min', type: 'video', completed: false },
        ]
      },
      {
        id: 3, title: 'Penetration Testing', lessons: [
          { id: 7, title: 'Kali Linux Setup and Tool Overview', duration: '20 min', type: 'video', completed: false },
          { id: 8, title: 'Nmap Scanning and Enumeration', duration: '28 min', type: 'video', completed: false },
          { id: 9, title: 'Metasploit Framework Basics', duration: '30 min', type: 'video', completed: false },
          { id: 10, title: 'Writing Your First Penetration Test Report', duration: '25 min', type: 'reading', completed: false },
        ]
      },
    ],
  },
  {
    id: 7,
    title: 'Apache Spark & Big Data Engineering',
    instructor: 'Raj Patel',
    instructorBio: 'Data Platform Lead at Databricks, Apache Spark committer, IIT Bombay alumnus. 10+ years in big data.',
    instructorAvatar: '👨‍🔬',
    rating: 4.7,
    reviews: 4200,
    students: 18300,
    duration: '6 weeks',
    level: 'Intermediate',
    image: '📈',
    price: '$129',
    originalPrice: '$249',
    skills: ['Apache Spark', 'PySpark', 'Kafka', 'Airflow', 'Databricks', 'Delta Lake'],
    category: 'Data Engineering',
    description: 'Master big data engineering with Apache Spark, Kafka, and modern data lakehouse architecture. Build end-to-end data pipelines processing terabytes of data.',
    whatYouLearn: [
      'Build batch and streaming pipelines with PySpark',
      'Design data lakehouse architecture with Delta Lake',
      'Real-time stream processing with Apache Kafka',
      'Orchestrate pipelines with Apache Airflow',
      'Optimize Spark jobs for performance',
      'Implement data quality frameworks',
    ],
    prerequisites: [
      'Python proficiency',
      'SQL knowledge',
      'Basic cloud experience',
    ],
    language: 'English',
    lastUpdated: 'March 2026',
    certificate: true,
    color: 'from-yellow-500 to-orange-500',
    modules: [
      {
        id: 1, title: 'Apache Spark Core', lessons: [
          { id: 1, title: 'Spark Architecture: Driver, Executors, DAG', duration: '25 min', type: 'video', completed: false },
          { id: 2, title: 'RDDs vs DataFrames vs Datasets', duration: '20 min', type: 'video', completed: false },
          { id: 3, title: 'Spark SQL and Complex Aggregations', duration: '30 min', type: 'video', completed: false },
        ]
      },
      {
        id: 2, title: 'Streaming with Kafka & Spark', lessons: [
          { id: 4, title: 'Kafka Architecture and Producers/Consumers', duration: '28 min', type: 'video', completed: false },
          { id: 5, title: 'Structured Streaming with PySpark', duration: '35 min', type: 'video', completed: false },
          { id: 6, title: 'Kafka + Spark Streaming Pipeline Lab', duration: '60 min', type: 'video', completed: false },
        ]
      },
    ],
  },
  {
    id: 8,
    title: 'React Native: Build Mobile Apps',
    instructor: 'Priya Sharma',
    instructorBio: 'Mobile architect at Swiggy, 8 years in cross-platform mobile development. NIT Trichy graduate.',
    instructorAvatar: '👩‍💻',
    rating: 4.8,
    reviews: 6800,
    students: 24500,
    duration: '7 weeks',
    level: 'Intermediate',
    image: '📱',
    price: '$119',
    originalPrice: '$239',
    skills: ['React Native', 'TypeScript', 'Expo', 'Redux', 'React Navigation', 'Firebase'],
    category: 'Mobile',
    description: 'Build cross-platform iOS and Android apps with React Native. From UI components to app store deployment, create production-ready mobile applications.',
    whatYouLearn: [
      'Build beautiful UI with React Native components',
      'Navigation with React Navigation (stack, tabs, drawer)',
      'State management with Redux Toolkit',
      'Backend integration with REST APIs and Firebase',
      'Device features: camera, location, notifications',
      'Deploy to App Store and Google Play',
    ],
    prerequisites: [
      'React.js experience (6+ months)',
      'JavaScript/TypeScript knowledge',
    ],
    language: 'English',
    lastUpdated: 'February 2026',
    certificate: true,
    color: 'from-pink-500 to-rose-500',
    modules: [
      {
        id: 1, title: 'React Native Fundamentals', lessons: [
          { id: 1, title: 'React Native vs React Web', duration: '15 min', type: 'video', completed: false },
          { id: 2, title: 'Core Components: View, Text, StyleSheet', duration: '25 min', type: 'video', completed: false },
          { id: 3, title: 'Flexbox Layout in Mobile', duration: '20 min', type: 'video', completed: false },
        ]
      },
      {
        id: 2, title: 'Navigation and State', lessons: [
          { id: 4, title: 'Stack Navigator and Params', duration: '25 min', type: 'video', completed: false },
          { id: 5, title: 'Redux Toolkit: Slices and RTK Query', duration: '30 min', type: 'video', completed: false },
        ]
      },
    ],
  },
];

export function getCourseById(id: number): Course | undefined {
  return courses.find(c => c.id === id);
}

export function getCoursesByCategory(category: string): Course[] {
  if (category === 'All') return courses;
  return courses.filter(c => c.category === category);
}
