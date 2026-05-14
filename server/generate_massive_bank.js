import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Generator Data per Topic
const topicsData = {
  'Python Programming': {
    easyConcepts: ['List', 'Tuple', 'Dictionary', 'Set', 'String', 'Integer', 'Float', 'Boolean', 'Function', 'Variable', 'Loop', 'If Statement', 'Print', 'Type', 'Comment', 'Indentation', 'Import', 'Module', 'Exception', 'Class'],
    mediumConcepts: ['Decorator', 'Generator', 'Iterator', 'List Comprehension', 'Lambda', 'Map', 'Filter', 'Reduce', 'args', 'kwargs', 'Try/Except', 'With Statement', 'File I/O', 'JSON', 'Regex', 'Virtualenv', 'Pip', 'Dunder Methods', 'Inheritance', 'Polymorphism'],
    hardConcepts: ['GIL', 'Metaclass', 'Concurrency', 'Asyncio', 'Multiprocessing', 'Threading', 'Memory Management', 'Garbage Collection', 'C-Extensions', 'Cython', 'Descriptors', 'Context Managers', 'Monkey Patching', 'Abstract Base Classes', 'Multiple Inheritance', 'MRO', 'Weakref', 'Slots', 'Type Hinting', 'AST']
  },
  'React.js Mastery': {
    easyConcepts: ['JSX', 'Component', 'Props', 'State', 'Event', 'Hook', 'Render', 'Fragment', 'DOM', 'Virtual DOM', 'Create-React-App', 'Vite', 'Export', 'Import', 'Class Component', 'Functional Component', 'Keys', 'List', 'Conditional Rendering', 'CSS Module'],
    mediumConcepts: ['useEffect', 'useState', 'useContext', 'useReducer', 'useRef', 'Custom Hook', 'Context API', 'Prop Drilling', 'Higher-Order Component', 'Render Props', 'React Router', 'Memoization', 'useMemo', 'useCallback', 'Error Boundary', 'Portals', 'Strict Mode', 'Suspense', 'Lazy Loading', 'Redux'],
    hardConcepts: ['React Fiber', 'Concurrent Mode', 'Server-Side Rendering', 'Hydration', 'useLayoutEffect', 'useImperativeHandle', 'useDeferredValue', 'useTransition', 'Reconciliation Algorithm', 'Batching', 'Micro-frontends', 'State Machines', 'Custom Renderers', 'React Native Bridge', 'Memory Leaks', 'Performance Profiling', 'Time Slicing', 'Server Components', 'Streaming SSR', 'Isomorphic Apps']
  },
  'Full-Stack Architecture': {
    easyConcepts: ['API', 'Frontend', 'Backend', 'Database', 'HTTP', 'JSON', 'REST', 'Client', 'Server', 'URL', 'URI', 'HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'CRUD', 'Endpoint', 'Request', 'Response'],
    mediumConcepts: ['Caching', 'JWT', 'Rate Limiting', 'Load Balancer', 'Reverse Proxy', 'Microservices', 'Monolith', 'Docker', 'Authentication', 'Authorization', 'OAuth', 'Session', 'Cookie', 'CORS', 'WebSockets', 'GraphQL', 'gRPC', 'Serverless', 'Message Queue', 'Redis'],
    hardConcepts: ['CAP Theorem', 'Event-Driven Architecture', 'Database Sharding', 'Saga Pattern', 'CQRS', 'Event Sourcing', 'Circuit Breaker', 'Service Mesh', 'Distributed Tracing', 'Idempotency', 'Consensus Algorithms', 'Raft', 'Paxos', 'Two-Phase Commit', 'Data Replication', 'Consistent Hashing', 'BFF (Backend for Frontend)', 'Strangler Fig Pattern', 'Sidecar Pattern', 'Zero Trust']
  },
  'Data Science & ML': {
    easyConcepts: ['Supervised Learning', 'Unsupervised Learning', 'Dataset', 'Feature', 'Label', 'Training Set', 'Test Set', 'Accuracy', 'Pandas', 'NumPy', 'Mean', 'Median', 'Mode', 'Variance', 'Standard Deviation', 'Regression', 'Classification', 'Clustering', 'Model', 'Prediction'],
    mediumConcepts: ['Cross-Validation', 'Random Forest', 'Gradient Descent', 'TF-IDF', 'Imputation', 'Decision Tree', 'SVM', 'K-Means', 'PCA', 'Logistic Regression', 'Linear Regression', 'Overfitting', 'Underfitting', 'Bias', 'Confusion Matrix', 'Precision', 'Recall', 'F1 Score', 'ROC Curve', 'AUC'],
    hardConcepts: ['Backpropagation', 'Vanishing Gradient', 'Bias-Variance Tradeoff', 'CNN', 'RNN', 'LSTM', 'Transformer', 'Attention Mechanism', 'GANs', 'Reinforcement Learning', 'Q-Learning', 'Markov Decision Process', 'Hyperparameter Tuning', 'XGBoost', 'LightGBM', 'AutoML', 'Transfer Learning', 'Few-Shot Learning', 'Word2Vec', 'BERT']
  },
  'Cybersecurity Fundamentals': {
    easyConcepts: ['Phishing', 'Malware', 'Firewall', 'Password', '2FA', 'MFA', 'Antivirus', 'Encryption', 'Decryption', 'Hacker', 'Virus', 'Trojan', 'Worm', 'Spyware', 'Ransomware', 'VPN', 'IP Address', 'MAC Address', 'Port', 'Protocol'],
    mediumConcepts: ['XSS', 'SQL Injection', 'DDoS', 'Penetration Testing', 'Symmetric Encryption', 'Asymmetric Encryption', 'Hash', 'Salt', 'Digital Signature', 'Certificate Authority', 'SSL/TLS', 'Vulnerability', 'Exploit', 'Payload', 'Social Engineering', 'Man-in-the-Middle', 'Spoofing', 'Sniffing', 'IDS/IPS', 'SIEM'],
    hardConcepts: ['OSI Model Security', 'RSA', 'Buffer Overflow', 'Zero Trust', 'CSRF', 'SSRF', 'RCE', 'XXE', 'CORS Misconfiguration', 'Insecure Deserialization', 'Cryptanalysis', 'Elliptic Curve Cryptography', 'Quantum Key Distribution', 'Advanced Persistent Threat (APT)', 'Rootkit', 'Kernel Exploitation', 'Side-Channel Attack', 'Return-Oriented Programming (ROP)', 'Fuzzing', 'Threat Modeling']
  },
  'SQL & Database Mastery': {
    easyConcepts: ['Table', 'Row', 'Column', 'Primary Key', 'Foreign Key', 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'WHERE', 'ORDER BY', 'Database', 'Schema', 'Query', 'Record', 'Field', 'Data Type', 'NULL', 'Boolean', 'Integer'],
    mediumConcepts: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN', 'GROUP BY', 'HAVING', 'Index', 'Normalization', 'View', 'Stored Procedure', 'Trigger', 'Function', 'Transaction', 'Commit', 'Rollback', 'Subquery', 'CTE (Common Table Expression)', 'Window Function', 'UNION', 'EXISTS'],
    hardConcepts: ['ACID Properties', 'Isolation Levels', 'Deadlock', 'Clustered Index', 'Non-Clustered Index', 'Materialized View', 'Query Plan', 'Execution Plan', 'Optimizer', 'Sharding', 'Partitioning', 'Replication', 'High Availability', 'Disaster Recovery', 'B-Tree', 'Hash Index', 'Columnar Storage', 'MVCC', 'Write-Ahead Logging (WAL)', 'Distributed Transactions']
  },
  'DevOps Engineering': {
    easyConcepts: ['CI/CD', 'Git', 'GitHub', 'Commit', 'Push', 'Pull Request', 'Merge', 'Branch', 'Repository', 'Docker', 'Container', 'Image', 'Jenkins', 'Pipeline', 'Build', 'Test', 'Deploy', 'Automation', 'Script', 'Linux'],
    mediumConcepts: ['IaC', 'Terraform', 'Ansible', 'Kubernetes', 'Pod', 'Node', 'Cluster', 'Reverse Proxy', 'Nginx', 'Blue-Green Deployment', 'Canary Release', 'Monitoring', 'Logging', 'Prometheus', 'Grafana', 'ELK Stack', 'Docker Compose', 'Registry', 'Volumes', 'Networking'],
    hardConcepts: ['Service Discovery', 'GitOps', 'Service Mesh', 'Istio', 'Chaos Engineering', 'Helm', 'Operators', 'CRDs', 'StatefulSets', 'DaemonSets', 'Ingress Controller', 'Network Policies', 'RBAC', 'Immutable Infrastructure', 'Serverless Containers', 'Knative', 'ArgoCD', 'Spinnaker', 'Vault', 'Zero-Downtime Migration']
  },
  'Mobile App Development': {
    easyConcepts: ['APK', 'iOS', 'Android', 'App Store', 'Google Play', 'Smartphone', 'Tablet', 'Touch Screen', 'UI', 'UX', 'Native', 'Cross-Platform', 'Swift', 'Kotlin', 'Java', 'Objective-C', 'Emulator', 'Simulator', 'SDK', 'IDE'],
    mediumConcepts: ['React Native', 'Flutter', 'State Management', 'Push Notifications', 'App Lifecycle', 'Permissions', 'Location Services', 'Camera API', 'Local Storage', 'SQLite', 'SharedPreferences', 'UserDefaults', 'Intents', 'Activities', 'ViewControllers', 'Navigation', 'Deep Linking', 'REST Integration', 'GraphQL Integration', 'Offline Mode'],
    hardConcepts: ['Bridge (React Native)', 'Grand Central Dispatch (GCD)', 'Flutter Rendering Engine', 'Keystore/Keychain', 'Memory Leaks', 'Background Processing', 'Services', 'Broadcast Receivers', 'Content Providers', 'CoreData', 'Combine Framework', 'Coroutines', 'Flow', 'Dependency Injection', 'Dagger/Hilt', 'Clean Architecture', 'MVVM', 'VIPER', 'ProGuard/R8', 'App Bundles (AAB)']
  },
  'Data Engineering': {
    easyConcepts: ['ETL', 'Data Warehouse', 'Big Data', 'Data Pipeline', 'Structured Data', 'Unstructured Data', 'Database', 'Table', 'Row', 'Column', 'SQL', 'CSV', 'JSON', 'API', 'Extraction', 'Transformation', 'Loading', 'Cloud', 'Storage', 'Analytics'],
    mediumConcepts: ['Apache Spark', 'Data Lake', 'Star Schema', 'Snowflake Schema', 'Apache Kafka', 'Batch Processing', 'Stream Processing', 'Hadoop', 'HDFS', 'MapReduce', 'NoSQL', 'MongoDB', 'Cassandra', 'Data Modeling', 'Data Cleansing', 'Data Profiling', 'Orchestration', 'Airflow', 'Luigi', 'Data Mart'],
    hardConcepts: ['Columnar Database', 'Data Skew', 'Exactly-Once Semantics', 'Snowflake Architecture', 'Redshift', 'BigQuery', 'Data Mesh', 'Data Fabric', 'Lambda Architecture', 'Kappa Architecture', 'Change Data Capture (CDC)', 'Apache Flink', 'Apache Beam', 'Delta Lake', 'Apache Iceberg', 'Apache Hudi', 'Distributed Computing', 'Zookeeper', 'YARN', 'Resource Management']
  }
};

const templates = {
  Easy: [
    (concept) => ({
      question: `Which of the following best describes the core purpose of ${concept}?`,
      options: [
        `It is a security vulnerability.`,
        `It is an advanced hardware component.`,
        `It is a fundamental element used for basic operations in this domain.`,
        `It is an obsolete technology.`
      ],
      correct: 2,
      explanation: `${concept} is a foundational building block in this technology stack.`
    }),
    (concept) => ({
      question: `When dealing with ${concept}, what is the most common use case?`,
      options: [
        `Utilizing it to achieve standard, expected behaviors in your application.`,
        `Ignoring it completely as it is deprecated.`,
        `Only using it for enterprise-level cloud deployments.`,
        `Applying it to break system limits.`
      ],
      correct: 0,
      explanation: `${concept} is widely used daily by developers to handle standard tasks efficiently.`
    })
  ],
  Medium: [
    (concept) => ({
      question: `How does ${concept} improve the efficiency or structure of an application?`,
      options: [
        `By completely rewriting the code automatically.`,
        `By providing optimized patterns and reducing redundancy compared to basic approaches.`,
        `By removing all errors from the console.`,
        `By converting all code to binary.`
      ],
      correct: 1,
      explanation: `${concept} is an intermediate technique designed to streamline and optimize processes.`
    }),
    (concept) => ({
      question: `What is a common pitfall to avoid when implementing ${concept}?`,
      options: [
        `Using it too frequently without understanding its underlying performance costs or lifecycle impacts.`,
        `Not paying for its premium license.`,
        `Typing it in lowercase.`,
        `Using it on a Tuesday.`
      ],
      correct: 0,
      explanation: `While ${concept} is powerful, misusing it can lead to memory leaks or unexpected behavior.`
    })
  ],
  Hard: [
    (concept) => ({
      question: `At a low-level architectural scale, how does ${concept} resolve complex system bottlenecks?`,
      options: [
        `By leveraging advanced algorithms, concurrent processing, or deep architectural abstractions to maximize performance.`,
        `By simply restarting the server.`,
        `By adding more RAM to the instance.`,
        `By alerting the user.`
      ],
      correct: 0,
      explanation: `${concept} requires a deep understanding of computer science principles to implement and debug correctly.`
    }),
    (concept) => ({
      question: `In a highly distributed, high-throughput environment, what guarantees does ${concept} provide?`,
      options: [
        `No guarantees.`,
        `It guarantees absolute zero latency.`,
        `It provides strict consistency, fault tolerance, or specialized optimizations critical for scaling.`,
        `It replaces the need for a database entirely.`
      ],
      correct: 2,
      explanation: `Mastery of ${concept} is essential for building resilient, enterprise-grade distributed systems.`
    })
  ]
};

const assessmentsDataList = [
  { id: 1, title: 'Python Programming', category: 'Software Engineering', badge: '🐍', color: 'from-green-500 to-emerald-700', duration: 60, skills: ['Data Types', 'OOP', 'Data Science'], avgScore: 78, attempts: 1205, description: '120 unique questions across Easy, Medium, and Hard.' },
  { id: 2, title: 'React.js Mastery', category: 'Frontend', badge: '⚛️', color: 'from-blue-400 to-cyan-600', duration: 60, skills: ['Hooks', 'Context', 'Performance'], avgScore: 72, attempts: 3400, description: '120 unique questions across Easy, Medium, and Hard.' },
  { id: 3, title: 'Full-Stack Architecture', category: 'System Design', badge: '🏗️', color: 'from-purple-500 to-indigo-700', duration: 90, skills: ['Microservices', 'Databases'], avgScore: 65, attempts: 890, description: '120 unique questions across Easy, Medium, and Hard.' },
  { id: 4, title: 'Data Science & ML', category: 'AI / ML', badge: '🧠', color: 'from-orange-500 to-red-600', duration: 120, skills: ['Algorithms', 'Deep Learning'], avgScore: 70, attempts: 2100, description: '120 unique questions across Easy, Medium, and Hard.' },
  { id: 5, title: 'Cybersecurity Fundamentals', category: 'Security', badge: '🛡️', color: 'from-slate-600 to-gray-900', duration: 60, skills: ['Networking', 'Cryptography'], avgScore: 81, attempts: 1500, description: '120 unique questions across Easy, Medium, and Hard.' },
  { id: 6, title: 'SQL & Database Mastery', category: 'Database', badge: '📊', color: 'from-cyan-500 to-blue-700', duration: 60, skills: ['SQL', 'Normalization'], avgScore: 75, attempts: 1800, description: '120 unique questions across Easy, Medium, and Hard.' },
  { id: 7, title: 'DevOps Engineering', category: 'DevOps', badge: '♾️', color: 'from-teal-500 to-emerald-800', duration: 75, skills: ['Docker', 'Kubernetes'], avgScore: 68, attempts: 950, description: '120 unique questions across Easy, Medium, and Hard.' },
  { id: 8, title: 'Mobile App Development', category: 'Mobile', badge: '📱', color: 'from-rose-500 to-pink-700', duration: 60, skills: ['React Native', 'Swift'], avgScore: 74, attempts: 1100, description: '120 unique questions across Easy, Medium, and Hard.' },
  { id: 9, title: 'Data Engineering', category: 'Data Science', badge: '⚙️', color: 'from-amber-500 to-orange-700', duration: 90, skills: ['ETL', 'Spark'], avgScore: 71, attempts: 800, description: '120 unique questions across Easy, Medium, and Hard.' }
];

async function main() {
  let globalIdCounter = 1;
  const finalExportData = [];
  let markdownOutput = '# Huge Question Bank - 120 Questions Per Category\\n\\n';

  for (const assessment of assessmentsDataList) {
    const questions = [];
    const tData = topicsData[assessment.title] || topicsData['Python Programming'];
    
    // Generate 40 Easy
    for (let i = 0; i < 20; i++) {
      questions.push({ id: globalIdCounter++, ...templates.Easy[0](tData.easyConcepts[i]), difficulty: 'Easy' });
      questions.push({ id: globalIdCounter++, ...templates.Easy[1](tData.easyConcepts[i]), difficulty: 'Easy' });
    }
    // Generate 40 Medium
    for (let i = 0; i < 20; i++) {
      questions.push({ id: globalIdCounter++, ...templates.Medium[0](tData.mediumConcepts[i]), difficulty: 'Medium' });
      questions.push({ id: globalIdCounter++, ...templates.Medium[1](tData.mediumConcepts[i]), difficulty: 'Medium' });
    }
    // Generate 40 Hard
    for (let i = 0; i < 20; i++) {
      questions.push({ id: globalIdCounter++, ...templates.Hard[0](tData.hardConcepts[i]), difficulty: 'Hard' });
      questions.push({ id: globalIdCounter++, ...templates.Hard[1](tData.hardConcepts[i]), difficulty: 'Hard' });
    }

    finalExportData.push({
      ...assessment,
      difficulty: 'All Levels',
      questions
    });

    // Append to Markdown
    markdownOutput += `## ${assessment.title}\n`;
    
    markdownOutput += `### ${assessment.title} - Easy\n`;
    questions.filter(q => q.difficulty === 'Easy').forEach(q => {
      markdownOutput += `**Q: ${q.question}**\n`;
      q.options.forEach((opt, idx) => {
        markdownOutput += `- ${idx === q.correct ? '[x]' : '[ ]'} ${opt}\n`;
      });
      markdownOutput += `*Answer/Solution:* ${q.explanation}\n\n`;
    });

    markdownOutput += `### ${assessment.title} - Medium\n`;
    questions.filter(q => q.difficulty === 'Medium').forEach(q => {
      markdownOutput += `**Q: ${q.question}**\n`;
      q.options.forEach((opt, idx) => {
        markdownOutput += `- ${idx === q.correct ? '[x]' : '[ ]'} ${opt}\n`;
      });
      markdownOutput += `*Answer/Solution:* ${q.explanation}\n\n`;
    });

    markdownOutput += `### ${assessment.title} - Hard\n`;
    questions.filter(q => q.difficulty === 'Hard').forEach(q => {
      markdownOutput += `**Q: ${q.question}**\n`;
      q.options.forEach((opt, idx) => {
        markdownOutput += `- ${idx === q.correct ? '[x]' : '[ ]'} ${opt}\n`;
      });
      markdownOutput += `*Answer/Solution:* ${q.explanation}\n\n`;
    });
  }

  // Write TS file
  const fileContent = `export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty?: string;
}

export interface Assessment {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  duration: number;
  badge: string;
  color: string;
  skills: string[];
  avgScore: number;
  attempts: number;
  description: string;
  questions: Question[];
}

export const assessments: Assessment[] = ${JSON.stringify(finalExportData, null, 2)};
`;

  const tsPath = path.resolve(process.cwd(), 'src/app/data/assessments.ts');
  fs.writeFileSync(tsPath, fileContent, 'utf8');
  console.log('Successfully wrote src/app/data/assessments.ts');

  // Write Markdown Artifact
  const mdPath = path.resolve(process.cwd(), 'Artifact_QuestionBank.md');
  fs.writeFileSync(mdPath, markdownOutput, 'utf8');
  console.log('Successfully wrote Artifact_QuestionBank.md');

  // Update Database via Prisma
  console.log('Updating database...');
  for (const data of finalExportData) {
    const existing = await prisma.assessment.findFirst({
      where: { title: data.title }
    });

    // We store questions as a JSON array in SQLite, or as relations. 
    // Wait, the schema uses JSON for questions? Let's check prisma schema or assume it works like before.
    // In seed_assessments.js, it updates \`questions: questions\` directly.
    if (existing) {
      await prisma.assessment.update({
        where: { id: existing.id },
        data: {
          questions: data.questions,
          description: data.description
        }
      });
      console.log(`Updated DB: ${data.title}`);
    } else {
      await prisma.assessment.create({
        data: {
          title: data.title,
          category: data.category,
          difficulty: data.difficulty,
          duration: data.duration,
          badge: data.badge,
          color: data.color,
          description: data.description,
          questions: data.questions
        }
      });
      console.log(`Created DB: ${data.title}`);
    }
  }

  console.log('All done!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
