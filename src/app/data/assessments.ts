export interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Assessment {
  id: number;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // minutes
  questions: Question[];
  badge: string;
  skills: string[];
  attempts: number;
  avgScore: number;
  description: string;
  color: string;
}

export const assessments: Assessment[] = [
  {
    id: 1,
    title: 'Python Programming',
    category: 'Programming',
    difficulty: 'Intermediate',
    duration: 45,
    badge: '🐍',
    skills: ['Python', 'OOP', 'Data Structures', 'Algorithms'],
    attempts: 12450,
    avgScore: 78,
    description: 'Test your Python programming knowledge covering OOP, data structures, and algorithmic thinking.',
    color: 'from-blue-500 to-cyan-500',
    questions: [
      {
        id: 1,
        question: "What is the output of: print(type([]))?",
        options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"],
        correct: 0,
        explanation: "The type() function returns the type of an object. Empty brackets [] create a list."
      },
      {
        id: 2,
        question: "Which keyword is used to define a function in Python?",
        options: ['function', 'def', 'fun', 'define'],
        correct: 1,
        explanation: "'def' is the Python keyword to define a function, followed by the function name and parentheses."
      },
      {
        id: 3,
        question: "What does the following code output?\n\nx = [1, 2, 3]\nprint(x[-1])",
        options: ['1', '3', '-1', 'IndexError'],
        correct: 1,
        explanation: "Negative indexing in Python starts from the end. x[-1] returns the last element, which is 3."
      },
      {
        id: 4,
        question: "Which data structure uses LIFO (Last In, First Out) order?",
        options: ['Queue', 'Stack', 'Deque', 'Priority Queue'],
        correct: 1,
        explanation: "A Stack follows LIFO — the last element pushed is the first one popped."
      },
      {
        id: 5,
        question: "What is the time complexity of accessing an element in a Python dictionary by key?",
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correct: 2,
        explanation: "Python dictionaries use hash tables, giving O(1) average-case time complexity for key lookups."
      },
      {
        id: 6,
        question: "What will `list(range(2, 10, 3))` return?",
        options: ['[2, 5, 8]', '[2, 3, 4, 5, 6, 7, 8, 9]', '[2, 4, 6, 8]', '[3, 6, 9]'],
        correct: 0,
        explanation: "range(start, stop, step) generates: 2, 5, 8. Stop is exclusive, step is 3."
      },
      {
        id: 7,
        question: "Which of the following creates a shallow copy of a list?",
        options: ['list.deepcopy()', 'list[:]', 'copy.deepcopy(list)', 'list.clone()'],
        correct: 1,
        explanation: "list[:] creates a shallow copy by slicing the entire list. deepcopy creates a deep copy."
      },
      {
        id: 8,
        question: "What is a lambda function in Python?",
        options: [
          'A named function defined with def',
          'An anonymous function defined with the lambda keyword',
          'A function imported from a library',
          'A recursive function'
        ],
        correct: 1,
        explanation: "Lambda functions are anonymous single-expression functions: lambda x: x * 2"
      },
      {
        id: 9,
        question: "What does `__init__` do in a Python class?",
        options: [
          'Destroys the object',
          'Is called when the module imports',
          'Initializes object attributes when a class is instantiated',
          'Defines class methods'
        ],
        correct: 2,
        explanation: "__init__ is the constructor/initializer called when creating a new object instance."
      },
      {
        id: 10,
        question: "What is the purpose of the `with` statement in Python?",
        options: [
          'To define a loop',
          'To handle context management (e.g., automatically close files)',
          'To import modules conditionally',
          'To create generators'
        ],
        correct: 1,
        explanation: "The 'with' statement ensures proper resource cleanup via context managers (e.g., file handles, DB connections)."
      },
    ],
  },
  {
    id: 2,
    title: 'SQL & Database Design',
    category: 'Database',
    difficulty: 'Beginner',
    duration: 30,
    badge: '🗄️',
    skills: ['SQL', 'Queries', 'Joins', 'Indexing', 'Normalization'],
    attempts: 18200,
    avgScore: 82,
    description: 'Evaluate your SQL skills including queries, joins, aggregations, and database design concepts.',
    color: 'from-green-500 to-teal-500',
    questions: [
      {
        id: 1,
        question: "Which SQL clause is used to filter rows in a query?",
        options: ['HAVING', 'WHERE', 'GROUP BY', 'ORDER BY'],
        correct: 1,
        explanation: "WHERE filters individual rows before aggregation. HAVING filters groups after aggregation."
      },
      {
        id: 2,
        question: "What type of JOIN returns all rows from the left table and matching rows from the right?",
        options: ['INNER JOIN', 'FULL OUTER JOIN', 'LEFT JOIN', 'RIGHT JOIN'],
        correct: 2,
        explanation: "LEFT JOIN returns all rows from the left table; rows from the right table that don't match get NULL values."
      },
      {
        id: 3,
        question: "Which aggregate function counts only non-NULL values?",
        options: ['SUM()', 'COUNT(*)', 'COUNT(column_name)', 'MAX()'],
        correct: 2,
        explanation: "COUNT(column_name) ignores NULLs. COUNT(*) counts all rows including those with NULLs."
      },
      {
        id: 4,
        question: "What does the DISTINCT keyword do?",
        options: [
          'Sorts results in descending order',
          'Returns only unique values from a column',
          'Excludes NULL values',
          'Limits the number of rows'
        ],
        correct: 1,
        explanation: "DISTINCT eliminates duplicate rows/values from the result set."
      },
      {
        id: 5,
        question: "Which normal form eliminates transitive dependencies?",
        options: ['1NF', '2NF', '3NF', 'BCNF'],
        correct: 2,
        explanation: "3NF (Third Normal Form) eliminates transitive dependencies — non-key attributes depending on other non-key attributes."
      },
      {
        id: 6,
        question: "What is an index in a database?",
        options: [
          'A constraint ensuring uniqueness',
          'A data structure that speeds up row retrieval',
          'A type of primary key',
          'A foreign key reference'
        ],
        correct: 1,
        explanation: "An index (B-tree or hash) allows faster data retrieval at the cost of additional storage and write overhead."
      },
      {
        id: 7,
        question: "What does ACID stand for in database transactions?",
        options: [
          'Atomicity, Consistency, Isolation, Durability',
          'Access, Control, Integrity, Data',
          'Authentication, Commit, Integrity, Distribution',
          'Atomicity, Completeness, Isolation, Dependency'
        ],
        correct: 0,
        explanation: "ACID properties ensure reliable database transactions: Atomicity, Consistency, Isolation, Durability."
      },
      {
        id: 8,
        question: "Which clause is used with GROUP BY to filter aggregated results?",
        options: ['WHERE', 'HAVING', 'FILTER', 'LIMIT'],
        correct: 1,
        explanation: "HAVING filters after aggregation (GROUP BY), while WHERE filters before aggregation."
      },
      {
        id: 9,
        question: "What is a primary key?",
        options: [
          'A key shared between two tables',
          'A column that uniquely identifies each row and cannot be NULL',
          'An encrypted column',
          'A column with a default value'
        ],
        correct: 1,
        explanation: "A primary key uniquely identifies each row, must be unique, and cannot contain NULL values."
      },
      {
        id: 10,
        question: "Which SQL command removes all rows from a table without logging individual deletions?",
        options: ['DELETE', 'DROP', 'TRUNCATE', 'REMOVE'],
        correct: 2,
        explanation: "TRUNCATE removes all rows quickly without logging each deletion. DELETE logs each row removal and can be rolled back."
      },
    ],
  },
  {
    id: 3,
    title: 'AWS Cloud Practitioner',
    category: 'Cloud',
    difficulty: 'Intermediate',
    duration: 60,
    badge: '☁️',
    skills: ['AWS', 'EC2', 'S3', 'IAM', 'VPC', 'Lambda', 'RDS'],
    attempts: 9800,
    avgScore: 75,
    description: 'Test your AWS knowledge covering core services, security, billing, and architecture best practices.',
    color: 'from-orange-400 to-yellow-400',
    questions: [
      {
        id: 1,
        question: "What does AWS IAM stand for?",
        options: ['Internet Access Manager', 'Identity and Access Management', 'Internal Authentication Module', 'Integrated Application Manager'],
        correct: 1,
        explanation: "IAM (Identity and Access Management) controls who can access AWS services and resources."
      },
      {
        id: 2,
        question: "Which AWS service provides serverless compute?",
        options: ['EC2', 'RDS', 'Lambda', 'ECS'],
        correct: 2,
        explanation: "AWS Lambda runs code without provisioning servers. You only pay for the compute time consumed."
      },
      {
        id: 3,
        question: "What is the AWS service for managed relational databases?",
        options: ['DynamoDB', 'ElastiCache', 'RDS', 'Redshift'],
        correct: 2,
        explanation: "Amazon RDS (Relational Database Service) manages MySQL, PostgreSQL, Oracle, and SQL Server databases."
      },
      {
        id: 4,
        question: "Which S3 storage class is cheapest for infrequently accessed data?",
        options: ['S3 Standard', 'S3 Glacier', 'S3 Standard-IA', 'S3 Intelligent-Tiering'],
        correct: 1,
        explanation: "S3 Glacier is the cheapest storage class, designed for archival data with retrieval times of minutes to hours."
      },
      {
        id: 5,
        question: "What does a VPC in AWS provide?",
        options: [
          'Virtual machine instances',
          'An isolated virtual network in the AWS cloud',
          'A content delivery network',
          'A managed container registry'
        ],
        correct: 1,
        explanation: "VPC (Virtual Private Cloud) provides a logically isolated network within AWS where you control IP ranges, subnets, and routing."
      },
      {
        id: 6,
        question: "Which AWS service distributes traffic across multiple EC2 instances?",
        options: ['Route 53', 'CloudFront', 'Elastic Load Balancing', 'Auto Scaling'],
        correct: 2,
        explanation: "Elastic Load Balancing (ELB) automatically distributes incoming traffic across multiple targets."
      },
      {
        id: 7,
        question: "What is the AWS shared responsibility model?",
        options: [
          'AWS handles all security responsibilities',
          'Customer handles all security responsibilities',
          'AWS secures the infrastructure; customers secure their data and applications',
          'Security is shared equally in all aspects'
        ],
        correct: 2,
        explanation: "AWS secures 'security of the cloud' (hardware, infrastructure). Customers are responsible for 'security in the cloud' (data, OS, applications)."
      },
      {
        id: 8,
        question: "Which service is used for DNS in AWS?",
        options: ['CloudFront', 'Route 53', 'VPC', 'API Gateway'],
        correct: 1,
        explanation: "Amazon Route 53 is a scalable DNS web service that routes users to internet applications."
      },
      {
        id: 9,
        question: "What AWS service provides a content delivery network (CDN)?",
        options: ['S3', 'CloudFront', 'Route 53', 'ElastiCache'],
        correct: 1,
        explanation: "Amazon CloudFront is AWS's CDN that delivers content with low latency from edge locations worldwide."
      },
      {
        id: 10,
        question: "Which pricing model allows you to commit to a specific instance type for 1 or 3 years for significant discounts?",
        options: ['On-Demand', 'Spot Instances', 'Reserved Instances', 'Savings Plans'],
        correct: 2,
        explanation: "Reserved Instances offer up to 72% discount vs On-Demand in exchange for a 1 or 3-year commitment."
      },
    ],
  },
  {
    id: 4,
    title: 'Cybersecurity Fundamentals',
    category: 'Security',
    difficulty: 'Advanced',
    duration: 50,
    badge: '🔒',
    skills: ['Security', 'Encryption', 'Network Security', 'OWASP', 'Penetration Testing'],
    attempts: 5600,
    avgScore: 71,
    description: 'Advanced cybersecurity test covering network security, cryptography, penetration testing, and incident response.',
    color: 'from-red-500 to-pink-500',
    questions: [
      {
        id: 1,
        question: "What does the OWASP stand for?",
        options: [
          'Open Web Application Security Project',
          'Online Web Application Standard Protocol',
          'Open Wireless Access Security Policy',
          'Operational Web Application Security Platform'
        ],
        correct: 0,
        explanation: "OWASP (Open Web Application Security Project) is a nonprofit foundation that publishes security guidelines and the Top 10 vulnerabilities list."
      },
      {
        id: 2,
        question: "Which type of attack involves injecting malicious SQL into a web form?",
        options: ['XSS', 'CSRF', 'SQL Injection', 'Buffer Overflow'],
        correct: 2,
        explanation: "SQL Injection attackers insert malicious SQL statements into input fields that are executed by the database."
      },
      {
        id: 3,
        question: "What is the difference between symmetric and asymmetric encryption?",
        options: [
          'Symmetric uses two keys; asymmetric uses one key',
          'Symmetric uses one shared key; asymmetric uses a public/private key pair',
          'Symmetric is slower than asymmetric',
          'Asymmetric is used for bulk data; symmetric for key exchange'
        ],
        correct: 1,
        explanation: "Symmetric encryption uses a single shared key (AES). Asymmetric uses a key pair — public for encryption, private for decryption (RSA)."
      },
      {
        id: 4,
        question: "What is a Zero-Day vulnerability?",
        options: [
          'A vulnerability with a patch available',
          'An exploit that requires zero technical skill',
          'A vulnerability unknown to the vendor with no patch available',
          'A vulnerability that causes zero system downtime'
        ],
        correct: 2,
        explanation: "Zero-Day refers to a vulnerability that is unknown to the software vendor — there are zero days between discovery and exploitation."
      },
      {
        id: 5,
        question: "What does HTTPS use to secure communications?",
        options: ['SSH', 'TLS/SSL', 'IPSec', 'SFTP'],
        correct: 1,
        explanation: "HTTPS uses TLS (Transport Layer Security) to encrypt data in transit between client and server."
      },
      {
        id: 6,
        question: "What is the purpose of a Web Application Firewall (WAF)?",
        options: [
          'To protect against network layer DDoS attacks',
          'To filter HTTP traffic and block application-layer attacks',
          'To encrypt database connections',
          'To manage SSL certificates'
        ],
        correct: 1,
        explanation: "A WAF inspects HTTP requests and blocks application-layer attacks like SQL injection, XSS, and CSRF."
      },
      {
        id: 7,
        question: "In the MITRE ATT&CK framework, what does 'Lateral Movement' mean?",
        options: [
          'The attacker exits the network',
          'The attacker moves from one compromised system to others within the network',
          'The attacker escalates to admin privileges',
          'The attacker conducts network scanning'
        ],
        correct: 1,
        explanation: "Lateral Movement techniques allow attackers to progressively move through a network while looking for key assets and data."
      },
      {
        id: 8,
        question: "What is multi-factor authentication (MFA)?",
        options: [
          'Using multiple passwords',
          'Authentication using two or more verification factors from different categories',
          'Authentication by multiple administrators',
          'Using the same password on multiple sites'
        ],
        correct: 1,
        explanation: "MFA requires 2+ factors: something you know (password), something you have (TOTP), or something you are (biometric)."
      },
      {
        id: 9,
        question: "What does a penetration test involve?",
        options: [
          'Installing penetration-resistant software',
          'Authorized simulated attacks to identify vulnerabilities before malicious attackers do',
          'Testing network bandwidth penetration',
          'Testing physical security measures'
        ],
        correct: 1,
        explanation: "A penetration test (pentest) is an authorized, simulated cyberattack performed to find and fix security vulnerabilities."
      },
      {
        id: 10,
        question: "What is the principle of least privilege?",
        options: [
          'Give all users the minimum number of passwords',
          'Grant users only the minimum permissions needed to perform their job',
          'Use the cheapest authentication system',
          'Allow access only during off-peak hours'
        ],
        correct: 1,
        explanation: "Least privilege limits user access rights to the minimum required. This reduces the attack surface if an account is compromised."
      },
    ],
  },
  {
    id: 5,
    title: 'JavaScript & ES2024 Mastery',
    category: 'Programming',
    difficulty: 'Intermediate',
    duration: 45,
    badge: '⚡',
    skills: ['JavaScript', 'ES6+', 'Async/Await', 'Closures', 'Prototypes'],
    attempts: 15300,
    avgScore: 79,
    description: 'Test your modern JavaScript knowledge including closures, prototypes, promises, and advanced patterns.',
    color: 'from-yellow-400 to-orange-400',
    questions: [
      {
        id: 1,
        question: "What is a closure in JavaScript?",
        options: [
          'A function that calls itself',
          'A function that has access to its outer scope even after the outer function returns',
          'A method to close browser windows',
          'An arrow function with no parameters'
        ],
        correct: 1,
        explanation: "A closure is a function that retains access to variables in its lexical scope even after the parent function has returned."
      },
      {
        id: 2,
        question: "What does the `typeof null` return in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correct: 2,
        explanation: "typeof null returns 'object' — this is a long-standing JavaScript bug/feature that cannot be changed for backward compatibility."
      },
      {
        id: 3,
        question: "What is the output of: console.log(1 + '2' + 3)?",
        options: ["6", "'123'", "'15'", "'6'"],
        correct: 1,
        explanation: "1 + '2' = '12' (string concatenation), then '12' + 3 = '123'. Once a string is involved, + becomes concatenation."
      },
      {
        id: 4,
        question: "What is the difference between `==` and `===` in JavaScript?",
        options: [
          '== checks type, === checks value',
          '== checks value with type coercion, === checks value and type strictly',
          '=== is used for objects only',
          'They are identical in behavior'
        ],
        correct: 1,
        explanation: "== allows type coercion (0 == '0' is true). === requires same type and value (0 === '0' is false)."
      },
      {
        id: 5,
        question: "What does `Promise.all()` do?",
        options: [
          'Runs promises sequentially and returns all results',
          'Returns the first settled promise',
          'Runs all promises in parallel and resolves when all resolve (or rejects on first failure)',
          'Ignores rejected promises'
        ],
        correct: 2,
        explanation: "Promise.all() runs promises in parallel. If all resolve, the result is an array of results. If any reject, it immediately rejects."
      },
      {
        id: 6,
        question: "What is the event loop in JavaScript?",
        options: [
          'A loop that handles DOM events only',
          'A mechanism that allows JS to perform non-blocking I/O despite being single-threaded',
          'A for loop for iterating events',
          'A garbage collection mechanism'
        ],
        correct: 1,
        explanation: "The event loop continuously checks the call stack and callback queue, enabling async operations in single-threaded JavaScript."
      },
      {
        id: 7,
        question: "What is the spread operator (...) used for?",
        options: [
          'To define rest parameters in functions',
          'To multiply arrays',
          'To expand iterables into individual elements',
          'To spread errors across try-catch blocks'
        ],
        correct: 2,
        explanation: "The spread operator (...) expands iterables: [...arr1, ...arr2] merges arrays, {  ...obj1 } copies objects."
      },
      {
        id: 8,
        question: "What is prototype chain in JavaScript?",
        options: [
          'A linked list of prototypes that JavaScript traverses when looking up properties',
          'The order in which constructors are called',
          'A chain of promises',
          'The inheritance order of DOM events'
        ],
        correct: 0,
        explanation: "JavaScript uses prototype-based inheritance. When a property is not found on an object, JS traverses up the prototype chain."
      },
      {
        id: 9,
        question: "What does `Array.prototype.reduce()` do?",
        options: [
          'Removes elements from an array',
          'Executes a reducer function to produce a single output value from an array',
          'Filters array elements',
          'Sorts array elements'
        ],
        correct: 1,
        explanation: "reduce() applies a function cumulatively to array elements, reducing the array to a single value (sum, object, etc.)."
      },
      {
        id: 10,
        question: "What is 'use strict' in JavaScript?",
        options: [
          'Forces the use of typed variables',
          'Enables a strict mode that catches common JavaScript mistakes',
          'Requires all functions to return values',
          'Disables prototype inheritance'
        ],
        correct: 1,
        explanation: "'use strict' opts in to a restricted variant of JS that disallows certain error-prone patterns like undeclared variables."
      },
    ],
  },
  {
    id: 6,
    title: 'Machine Learning Fundamentals',
    category: 'AI/ML',
    difficulty: 'Advanced',
    duration: 60,
    badge: '🤖',
    skills: ['ML Algorithms', 'Statistics', 'Scikit-learn', 'Model Evaluation', 'Feature Engineering'],
    attempts: 7200,
    avgScore: 68,
    description: 'Test advanced ML concepts including algorithm selection, bias-variance tradeoff, and model evaluation.',
    color: 'from-purple-500 to-violet-600',
    questions: [
      {
        id: 1,
        question: "What is the bias-variance tradeoff in machine learning?",
        options: [
          'Balancing training time vs accuracy',
          'The tension between a model being too simple (underfitting) and too complex (overfitting)',
          'Balancing the number of features vs samples',
          'The tradeoff between precision and recall'
        ],
        correct: 1,
        explanation: "High bias = underfitting (too simple), high variance = overfitting (too complex). The goal is to minimize both."
      },
      {
        id: 2,
        question: "Which algorithm is best suited for a classification problem with non-linear boundaries?",
        options: ['Linear Regression', 'Logistic Regression', 'Random Forest', 'Linear SVM'],
        correct: 2,
        explanation: "Random Forest uses ensemble decision trees that can model non-linear boundaries. Linear models assume linearly separable data."
      },
      {
        id: 3,
        question: "What does cross-validation help prevent?",
        options: ['Underfitting', 'Overfitting and data leakage', 'Data imbalance', 'Feature correlation'],
        correct: 1,
        explanation: "Cross-validation provides a more reliable estimate of model performance and helps detect overfitting to a specific train/test split."
      },
      {
        id: 4,
        question: "What is the purpose of regularization in ML models?",
        options: [
          'To speed up training',
          'To normalize input features',
          'To penalize model complexity and prevent overfitting',
          'To balance class distribution'
        ],
        correct: 2,
        explanation: "L1 (Lasso) and L2 (Ridge) regularization add a penalty term to the loss function, discouraging overly complex models."
      },
      {
        id: 5,
        question: "What metric is most appropriate for highly imbalanced classification datasets?",
        options: ['Accuracy', 'F1-Score', 'Mean Squared Error', 'R² Score'],
        correct: 1,
        explanation: "F1-Score (harmonic mean of precision and recall) is better for imbalanced data where accuracy can be misleading."
      },
      {
        id: 6,
        question: "What is gradient descent?",
        options: [
          'An algorithm that randomly searches for optimal parameters',
          'An optimization algorithm that iteratively moves towards the minimum of the loss function',
          'A method to normalize gradients',
          'A technique for feature selection'
        ],
        correct: 1,
        explanation: "Gradient descent iteratively adjusts model parameters in the direction opposite to the gradient of the loss function."
      },
      {
        id: 7,
        question: "What is the 'curse of dimensionality'?",
        options: [
          'Having too many training samples',
          'Machine learning models becoming exponentially harder to train as the number of features increases',
          'Memory limitations when processing large datasets',
          'The difficulty of labeling high-dimensional data'
        ],
        correct: 1,
        explanation: "As dimensionality increases, data becomes sparse, distances become meaningless, and models require exponentially more data."
      },
      {
        id: 8,
        question: "What does PCA (Principal Component Analysis) do?",
        options: [
          'Creates new features from existing ones using domain knowledge',
          'Reduces dimensionality by projecting data onto orthogonal components of maximum variance',
          'Removes duplicate features',
          'Normalizes feature scales'
        ],
        correct: 1,
        explanation: "PCA transforms features into orthogonal principal components ordered by variance, enabling dimensionality reduction."
      },
      {
        id: 9,
        question: "In a Random Forest, what technique is used to reduce correlation between trees?",
        options: ['Pruning', 'Bootstrapping + random feature subsets (bagging)', 'Boosting', 'Regularization'],
        correct: 1,
        explanation: "Random Forest uses bootstrap sampling and random feature subsets at each split, ensuring trees are diverse and decorrelated."
      },
      {
        id: 10,
        question: "What is the vanishing gradient problem in deep neural networks?",
        options: [
          'Gradients becoming too large during backpropagation',
          'Gradients becoming too small during backpropagation, preventing early layers from learning',
          'The loss function reaching zero too quickly',
          'Model weights vanishing after training'
        ],
        correct: 1,
        explanation: "In deep networks, gradients shrink exponentially as they backpropagate through many layers, making early layers train very slowly."
      },
    ],
  },
];

export function getAssessmentById(id: number): Assessment | undefined {
  return assessments.find(a => a.id === id);
}
