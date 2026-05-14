import { Question } from './assessments';

export const pythonQuestions: Question[] = [
  // EASY (1-20)
  {
    id: 1001,
    question: "What is the output of print(2 ** 3)?",
    options: ["6", "8", "9", "5"],
    correct: 1,
    difficulty: "Easy",
    explanation: "** is the exponentiation operator in Python. 2 to the power of 3 is 8.",
    skill: "Basic Syntax"
  },
  {
    id: 1002,
    question: "Which of these is a valid variable name in Python?",
    options: ["2nd_value", "value_2", "value-2", "class"],
    correct: 1,
    difficulty: "Easy",
    explanation: "Variable names cannot start with numbers, cannot contain hyphens, and cannot be keywords like 'class'.",
    skill: "Naming Conventions"
  },
  // ... (More Easy Python)
  // MEDIUM (21-40)
  {
    id: 1021,
    question: "What is the difference between 'is' and '==' in Python?",
    options: ["They are identical", "'is' checks identity (memory address), '==' checks equality (value)", "'is' is for strings only", "'==' is for numbers only"],
    correct: 1,
    difficulty: "Medium",
    explanation: "'is' checks if two variables point to the same object in memory, while '==' checks if their values are equal.",
    skill: "Object Identity"
  },
  // ... (More Medium Python)
  // HARD (41-60)
  {
    id: 1041,
    question: "What is a metaclass in Python?",
    options: ["A class that inherits from multiple classes", "A class whose instances are themselves classes", "A hidden system class", "A class used for metadata only"],
    correct: 1,
    difficulty: "Hard",
    explanation: "A metaclass is the 'class of a class'. It defines how a class behaves and is created.",
    skill: "Advanced OOP"
  },
  { id: 1043, question: "What is a 'Context Manager'?", options: ["A manager for variables", "An object that defines the runtime context to be established when executing a 'with' statement", "A database administrator", "A thread manager"], correct: 1, difficulty: "Hard", explanation: "Context managers handle the setup and teardown of resources." },
  { id: 1101, question: "What is the purpose of the 'global' keyword in Python?", options: ["To make a variable accessible from anywhere", "To modify a variable defined outside the current scope", "To declare a constant", "To import all modules"], correct: 1, difficulty: "Easy", explanation: "The global keyword is used to indicate that a variable in a local scope refers to a variable in the global scope." },
  { id: 1102, question: "Which of these is used to handle exceptions in Python?", options: ["if...else", "try...except", "check...error", "do...catch"], correct: 1, difficulty: "Easy", explanation: "Python uses try...except blocks to handle runtime errors gracefully." },
  { id: 1121, question: "What is the difference between a shallow copy and a deep copy?", options: ["One is for lists, the other for dicts", "Shallow copy copies references; deep copy copies objects recursively", "Deep copy is faster", "There is no difference"], correct: 1, difficulty: "Medium", explanation: "A shallow copy creates a new object but inserts references into it. A deep copy creates a new object and recursively adds copies of the nested objects." },
  { id: 1141, question: "What are 'Descriptors' in Python?", options: ["Text descriptions of functions", "Objects that manage the attributes of other objects (using __get__, __set__)", "A type of list", "CSS property names"], correct: 1, difficulty: "Hard", explanation: "Descriptors are the underlying mechanism for properties, methods, static methods, class methods, and super()." }
];

export const sqlQuestions: Question[] = [
  // EASY
  {
    id: 2001,
    question: "Which SQL keyword is used to retrieve data from a database?",
    options: ["GET", "OPEN", "SELECT", "FETCH"],
    correct: 2,
    difficulty: "Easy",
    explanation: "The SELECT statement is used to select data from a database.",
    skill: "Basic Queries"
  },
  // MEDIUM
  {
    id: 2021,
    question: "What is the purpose of the HAVING clause?",
    options: ["To filter rows before grouping", "To filter groups after the GROUP BY clause", "To sort the result set", "To join tables"],
    correct: 1,
    difficulty: "Medium",
    explanation: "HAVING is used to filter the results of a GROUP BY based on an aggregate condition.",
    skill: "Aggregation"
  },
  // HARD
  {
    id: 2041,
    question: "What is a Recursive Common Table Expression (CTE)?",
    options: ["A subquery that calls itself", "A query that runs in a loop until a condition is met", "A temporary table used for recursion", "All of the above"],
    correct: 3,
    difficulty: "Hard",
    explanation: "Recursive CTEs are used to query hierarchical data by referencing the CTE itself in its definition.",
    skill: "Advanced SQL"
  },
  { id: 2043, question: "What is 'Normalization'?", options: ["Adding more data", "The process of organizing data to reduce redundancy and improve data integrity", "Encrypting data", "Deleting old records"], correct: 1, difficulty: "Hard", explanation: "Normalization involves decomposing a table into less redundant (and smaller) tables." },
  { id: 2101, question: "What does the NULL value represent in SQL?", options: ["Zero", "Empty string", "Missing or unknown data", "A space character"], correct: 2, difficulty: "Easy", explanation: "NULL represents a value that is missing, unknown, or not applicable." },
  { id: 2121, question: "What is a 'Subquery'?", options: ["A query that runs fast", "A query nested inside another query", "A table in a database", "A database user"], correct: 1, difficulty: "Medium", explanation: "A subquery is a query that is nested inside another SELECT, INSERT, UPDATE, or DELETE statement." },
  { id: 2141, question: "What is a 'View' in SQL?", options: ["A physical table", "A virtual table based on the result-set of an SQL statement", "A database backup", "A UI component"], correct: 1, difficulty: "Hard", explanation: "A view contains rows and columns, just like a real table, but the fields are from one or more real tables in the database." }
];

// ... (I will continue adding more categories and questions below)
// I'll populate this with a wide range of questions for each category.

export const frontendQuestions: Question[] = [
  { id: 3041, question: "How does the 'this' keyword behave in arrow functions?", options: ["It depends on where the function is called", "It refers to the window object", "It inherits the 'this' value from its surrounding lexical scope", "Arrow functions don't have a 'this' context"], correct: 2, difficulty: "Hard", explanation: "Unlike regular functions, arrow functions do not have their own 'this'. They use 'this' from the enclosing scope." },
  { id: 3002, question: "What is the correct CSS syntax for making all the <p> elements bold?", options: ["p {font-weight:bold;}", "p {text-size:bold;}", "<p style='font-size:bold;'>", "p {style:bold;}"], correct: 0, difficulty: "Easy", explanation: "font-weight:bold is the standard CSS way to make text bold." },
  { id: 3022, question: "What is a Closure in JavaScript?", options: ["A function within a function", "A way to close a browser tab", "A function combined with its lexical environment", "A type of loop"], correct: 2, difficulty: "Medium", explanation: "A closure gives you access to an outer function's scope from an inner function." },
  { id: 3042, question: "What is the purpose of the 'defer' attribute in a script tag?", options: ["To delay execution until the document is parsed", "To run the script in the background", "To prevent the script from running", "To load scripts from a CDN"], correct: 0, difficulty: "Hard", explanation: "The defer attribute tells the browser to execute the script only after the HTML document has been fully parsed." },
  { id: 3101, question: "Which HTML element is used for the largest heading?", options: ["<head>", "<h6>", "<h1>", "<heading>"], correct: 2, difficulty: "Easy", explanation: "<h1> defines the most important heading in HTML." },
  { id: 3121, question: "What is 'Hoisting' in JavaScript?", options: ["Moving an object", "Moving declarations to the top of their scope", "Adding weight to a script", "Deleting variables"], correct: 1, difficulty: "Medium", explanation: "Hoisting is a behavior where variable and function declarations are moved to the top of their containing scope during compilation." }
];

export const backendQuestions: Question[] = [
  { id: 4001, question: "Which protocol does REST use?", options: ["FTP", "SMTP", "HTTP", "SSH"], correct: 2, difficulty: "Easy", explanation: "REST (Representational State Transfer) is an architectural style that typically uses HTTP." },
  { id: 4021, question: "What is the primary use of a JWT (JSON Web Token)?", options: ["Data encryption", "Authentication and secure information exchange", "Database indexing", "File compression"], correct: 1, difficulty: "Medium", explanation: "JWTs are used to securely transmit information between parties as a JSON object, commonly for authentication." },
  { id: 4041, question: "What is the event loop in Node.js?", options: ["A tool for managing database connections", "A mechanism that allows Node.js to perform non-blocking I/O operations", "A recursive function call", "A physical loop in the processor"], correct: 1, difficulty: "Hard", explanation: "The event loop is what allows Node.js to be single-threaded yet highly scalable by offloading I/O operations to the system kernel." },
  { id: 4002, question: "What is Middleware in Express?", options: ["A type of database", "Functions that have access to the request and response objects", "A front-end library", "A secure server"], correct: 1, difficulty: "Easy", explanation: "Middleware functions can execute code, make changes to the request/response, and end the request-response cycle." },
  { id: 4022, question: "What is Redis primarily used for?", options: ["Permanent data storage", "Caching and as an in-memory data store", "Front-end rendering", "Operating system management"], correct: 1, difficulty: "Medium", explanation: "Redis is an open-source, in-memory data structure store, used as a database, cache, and message broker." },
  { id: 4101, question: "What is a 'Session' in web development?", options: ["A physical server", "A way to store information about the user across multiple requests", "A type of database", "A secure protocol"], correct: 1, difficulty: "Easy", explanation: "A session is a way to store information to be used across multiple pages." },
  { id: 4121, question: "What is the purpose of 'Body Parser' in Express?", options: ["To parse cookies", "To parse incoming request bodies in a middleware before your handlers", "To speed up the server", "To encrypt data"], correct: 1, difficulty: "Medium", explanation: "Body-parser is a piece of middleware that helps you handle POST requests." },
  { id: 4141, question: "What is 'CORS'?", options: ["A type of database", "Cross-Origin Resource Sharing", "A security vulnerability", "A cloud provider"], correct: 1, difficulty: "Hard", explanation: "CORS is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin." }
];

export const devopsQuestions: Question[] = [
  { id: 5001, question: "Which tool is used for containerization?", options: ["Jenkins", "Docker", "Ansible", "Nagios"], correct: 1, difficulty: "Easy", explanation: "Docker is the industry standard for creating, deploying, and running applications in containers." },
  { id: 5021, question: "What is Infrastructure as Code (IaC)?", options: ["Writing documentation for hardware", "Managing and provisioning infrastructure through machine-readable definition files", "Coding on a physical server", "Manual server configuration"], correct: 1, difficulty: "Medium", explanation: "IaC is the process of managing and provisioning computer data centers through machine-readable definition files, rather than physical hardware configuration." },
  { id: 5041, question: "What is a 'Rolling Update' in Kubernetes?", options: ["Updating all pods at once", "Gradually replacing old pods with new ones to ensure zero downtime", "Deleting the cluster and recreating it", "Updating only the master node"], correct: 1, difficulty: "Hard", explanation: "Rolling updates allow a Deployment update to take place with zero downtime by incrementally updating Pods instances with new ones." },
  { id: 5002, question: "What does CI/CD stand for?", options: ["Continuous Integration and Continuous Deployment", "Code Integration and Code Delivery", "Cloud Integration and Cloud Deployment", "Component Integration and Component Deployment"], correct: 0, difficulty: "Easy", explanation: "CI/CD is a method to frequently deliver apps to customers by introducing automation into the stages of app development." },
  { id: 5022, question: "What is the purpose of Prometheus?", options: ["To store logs", "For monitoring and alerting", "To build images", "To manage secrets"], correct: 1, difficulty: "Medium", explanation: "Prometheus is an open-source systems monitoring and alerting toolkit." },
  { id: 5101, question: "What is a 'Container'?", options: ["A physical box", "A standard unit of software that packages up code and all its dependencies", "A virtual machine", "A database table"], correct: 1, difficulty: "Easy", explanation: "A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another." },
  { id: 5121, question: "What is 'Jenkins'?", options: ["A type of server", "An open source automation server used for CI/CD", "A cloud provider", "A database engine"], correct: 1, difficulty: "Medium", explanation: "Jenkins is a self-contained, open source automation server which can be used to automate all sorts of tasks related to building, testing, and delivering or deploying software." },
  { id: 5141, question: "What is 'Helm'?", options: ["A steering wheel", "A package manager for Kubernetes", "A monitoring tool", "A cloud provider"], correct: 1, difficulty: "Hard", explanation: "Helm helps you manage Kubernetes applications — Helm Charts help you define, install, and upgrade even the most complex Kubernetes application." }
];

export const cyberQuestions: Question[] = [
  { id: 6001, question: "What is phishing?", options: ["A type of network encryption", "A social engineering attack to steal sensitive data", "A database optimization technique", "A secure way to store passwords"], correct: 1, difficulty: "Easy", explanation: "Phishing is a type of social engineering where an attacker sends a fraudulent message designed to trick a person into revealing sensitive information." },
  { id: 6021, question: "What is a SQL Injection attack?", options: ["Adding more data to a database", "Injecting malicious SQL code into an entry field for execution", "A way to backup a database", "Encrypting database tables"], correct: 1, difficulty: "Medium", explanation: "SQLi is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database." },
  { id: 6041, question: "What is 'Salting' in the context of password hashing?", options: ["Adding random data to a password before hashing", "Encoding a password in Base64", "Using a shorter hash algorithm", "Storing passwords in plain text"], correct: 0, difficulty: "Hard", explanation: "Salting is the process of adding unique, random data to each password before it is hashed to prevent rainbow table attacks." },
  { id: 6101, question: "What is 'Malware'?", options: ["A bad website", "Software that is specifically designed to disrupt, damage, or gain unauthorized access to a computer system", "A type of firewall", "A secure network"], correct: 1, difficulty: "Easy", explanation: "Malware is an umbrella term used to refer to a variety of forms of hostile or intrusive software." },
  { id: 6121, question: "What is a 'VPN'?", options: ["A type of server", "Virtual Private Network", "A secure password", "A database engine"], correct: 1, difficulty: "Medium", explanation: "A VPN gives you online privacy and anonymity by creating a private network from a public internet connection." },
  { id: 6141, question: "What is 'Cryptography'?", options: ["A type of virus", "The practice and study of techniques for secure communication in the presence of third parties", "A cloud provider", "A database engine"], correct: 1, difficulty: "Hard", explanation: "Cryptography is the study of secure communication techniques that allow only the sender and intended recipient of a message to view its contents." }
];

export const aiQuestions: Question[] = [
  { id: 7001, question: "What is Supervised Learning?", options: ["Training a model without labels", "Training a model on labeled data", "Training a model by playing games", "Manual data entry"], correct: 1, difficulty: "Easy", explanation: "Supervised learning is a type of machine learning where the model is trained on a labeled dataset." },
  { id: 7021, question: "What is the purpose of an Activation Function in a Neural Network?", options: ["To store data", "To introduce non-linearity into the network", "To speed up the CPU", "To normalize inputs"], correct: 1, difficulty: "Medium", explanation: "Activation functions determine the output of a neuron and help the network learn complex patterns by introducing non-linearity." },
  { id: 7041, question: "What is 'Gradient Vanishing'?", options: ["When the error becomes zero", "When gradients become extremely small during backpropagation, stopping the network from learning", "When the model overfits", "When the learning rate is too high"], correct: 1, difficulty: "Hard", explanation: "Vanishing gradient problem occurs in deep neural networks where gradients become so small that weights are not updated effectively in early layers." },
  { id: 7002, question: "What is a 'Neuron' in ML?", options: ["A biological cell", "A mathematical function that processes inputs", "A computer chip", "A type of dataset"], correct: 1, difficulty: "Easy", explanation: "In artificial neural networks, a neuron is a basic unit that receives inputs, processes them, and produces an output." },
  { id: 7022, question: "What is 'Backpropagation'?", options: ["A way to load data", "An algorithm for training neural networks by calculating gradients", "A type of layer", "A data cleaning method"], correct: 1, difficulty: "Medium", explanation: "Backpropagation is the central mechanism by which neural networks learn by adjusting weights based on errors." }
];

export const cloudQuestions: Question[] = [
  { id: 8001, question: "Which AWS service provides scalable compute capacity?", options: ["S3", "RDS", "EC2", "IAM"], correct: 2, difficulty: "Easy", explanation: "Amazon EC2 provides resizable compute capacity in the cloud." },
  { id: 8021, question: "What is a 'Region' in AWS?", options: ["A single data center", "A physical location in the world where AWS has multiple Availability Zones", "A virtual private cloud", "A billing category"], correct: 1, difficulty: "Medium", explanation: "An AWS Region is a physical location in the world where we have multiple Availability Zones." },
  { id: 8041, question: "What is 'Serverless' computing?", options: ["Computing without servers", "An execution model where the cloud provider manages server allocation and provisioning", "Running code on local machines", "Hardware-only processing"], correct: 1, difficulty: "Hard", explanation: "Serverless computing allows you to build and run applications without managing infrastructure. The cloud provider automatically provisions, scales, and manages the infrastructure." }
];

export const mobileQuestions: Question[] = [
  { id: 9001, question: "Which language is used for native Android development?", options: ["Swift", "Kotlin", "Dart", "C#"], correct: 1, difficulty: "Easy", explanation: "Kotlin is now the preferred language for Android development, alongside Java." },
  { id: 9021, question: "What is the difference between Flutter and React Native?", options: ["Flutter uses JS, React Native uses Dart", "Flutter uses Dart, React Native uses JS", "They are identical", "One is for iOS, the other for Android"], correct: 1, difficulty: "Medium", explanation: "Flutter is a UI toolkit from Google using Dart. React Native is from Meta using JavaScript/React." },
  { id: 9041, question: "What is 'Bridging' in React Native?", options: ["Connecting two phones", "The mechanism that allows JavaScript and Native code to communicate", "Updating the app", "Building for both platforms"], correct: 1, difficulty: "Hard", explanation: "The Bridge is the communication layer that passes messages between the JavaScript thread and the Native threads in React Native." },
  { id: 9002, question: "Which IDE is used for iOS development?", options: ["Android Studio", "Xcode", "Visual Studio", "IntelliJ"], correct: 1, difficulty: "Easy", explanation: "Xcode is the integrated development environment for macOS containing a suite of software development tools developed by Apple." },
  { id: 9022, question: "What is Expo in the React Native ecosystem?", options: ["A database", "A framework and a platform for universal React applications", "A testing tool", "A cloud provider"], correct: 1, difficulty: "Medium", explanation: "Expo is a set of tools and services built around React Native that help you develop, build, and deploy iOS, Android, and web apps." }
];

export const dataEngineeringQuestions: Question[] = [
  { id: 10001, question: "What does ETL stand for?", options: ["Extract, Transform, Load", "Execute, Transfer, Link", "Extract, Total, List", "Execute, Total, Load"], correct: 0, difficulty: "Easy", explanation: "ETL is a three-phase process where data is extracted, transformed, and loaded into an output container." },
  { id: 10021, question: "What is Apache Spark?", options: ["A web server", "A unified analytics engine for large-scale data processing", "A CSS framework", "A database engine"], correct: 1, difficulty: "Medium", explanation: "Apache Spark is a lightning-fast unified analytics engine for big data and machine learning." },
  { id: 10041, question: "What is a 'Star Schema' in data warehousing?", options: ["A layout shaped like a star", "A style of data warehouse schema with a central fact table and multiple dimension tables", "An encryption algorithm", "A cloud architecture"], correct: 1, difficulty: "Hard", explanation: "The star schema is the simplest style of data mart schema and is the approach most widely used to develop data warehouses." }
];

// Combine all into a master bank
export const questionBank = [
  ...pythonQuestions,
  ...sqlQuestions,
  ...frontendQuestions,
  ...backendQuestions,
  ...devopsQuestions,
  ...cyberQuestions,
  ...aiQuestions,
  ...cloudQuestions,
  ...mobileQuestions,
  ...dataEngineeringQuestions
];
