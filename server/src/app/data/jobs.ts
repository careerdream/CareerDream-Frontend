export type JobType = 'Remote' | 'Full-time' | 'Contract' | 'Government' | 'Abroad' | 'Internship' | 'Part-time';
export type ExperienceLevel = 'Entry Level' | 'Mid Level' | 'Senior' | 'Lead' | 'Executive';

export interface Employer {
  id: number;
  company_name: string;
  industry?: string;
  website?: string;
  logo?: string;
  description?: string;
}

export interface JobStats {
  applicants_count: number;
  views_count: number;
  last_updated: string;
}

export interface JobSkill {
  skill_name: string;
  importance_level: number;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  country: string;
  type: JobType;
  salary: string;
  salaryMin: number;
  salaryMax: number;
  posted: string;
  postedDays: number;
  posted_at?: string;
  expires_at?: string;
  logo: string;
  skills: string[];
  detailedSkills?: JobSkill[];
  experience: ExperienceLevel;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  applicants: number;
  stats?: JobStats;
  employer?: Employer;
  aboutCompany: string;
  featured?: boolean;
  urgent?: boolean;
  category: string;
  matchScore?: number;
  tags: string[];
  externalUrl?: string;
}

export const jobs: Job[] = [
  {
    "id": 1,
    "title": "Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "Google India",
    "companyLogo": "🤖",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🤖",
    "skills": [
      "Python",
      "C++",
      "PyTorch",
      "TensorFlow",
      "Distributed Systems",
      "ML Infrastructure"
    ],
    "experience": "Senior",
    "category": "AI/ML",
    "featured": true,
    "urgent": true,
    "tags": [
      "Hybrid",
      "AI/ML",
      "Bengaluru"
    ],
    "applicants": 12,
    "description": "Build and scale production machine learning models and large-scale model infrastructure supporting Gemini and Google Search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems",
      "Optimize deep learning models for production scale and low-latency inference",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)"
    ],
    "requirements": [
      "5+ years of software development experience in production environments",
      "Strong background in AI/ML architectures and cloud systems infrastructure",
      "Master’s or PhD in Computer Science, Machine Learning, or equivalent practical experience"
    ],
    "niceToHave": [
      "Experience scaling transformer models and large language models",
      "Contributions to open-source deep learning compilers or frameworks"
    ],
    "benefits": [
      "Top-tier base compensation and performance bonus",
      "Substantial Alphabet stock grant (GSUs)",
      "Comprehensive healthcare and wellness allowance",
      "Free gourmet meals and modern hybrid office spaces",
      "Unlimited learning resources and conference attendance"
    ],
    "aboutCompany": "Google is a global technology leader focused on improving the ways people connect with information.",
    "externalUrl": "https://www.google.com/about/careers/applications/"
  },
  {
    "id": 2,
    "title": "Senior MLOps Engineer (SageMaker Platforms)",
    "company": "AWS (Amazon Web Services)",
    "companyLogo": "☁️",
    "location": "Hyderabad, Telangana (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "☁️",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "Cloud",
    "featured": true,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Cloud",
      "MLOps"
    ],
    "applicants": 24,
    "description": "Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads on Amazon Web Services.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models",
      "Manage GPU clusters and cloud auto-scaling policies",
      "Implement monitoring and observability for model health and inference latency"
    ],
    "requirements": [
      "8+ years in cloud and DevOps engineering, with 3+ years dedicated to MLOps",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints",
      "Proficiency with Terraform and Kubernetes in production environments"
    ],
    "niceToHave": [
      "AWS Certified DevOps Engineer or Machine Learning Specialty",
      "Experience with Triton Inference Server or SageMaker Neo model compilation"
    ],
    "benefits": [
      "Competitive base salary with Amazon restricted stock units (RSUs)",
      "Comprehensive health insurance for self and family",
      "Generous internet, wellness, and phone allowances",
      "Certification reimbursement and career advancement pathways"
    ],
    "aboutCompany": "Amazon Web Services provides on-demand cloud computing platforms and APIs to individuals, companies, and governments.",
    "externalUrl": "https://www.amazon.jobs/en/teams/amazon-web-services"
  },
  {
    "id": 3,
    "title": "Cloud Solution Architect (Azure AI Transformation)",
    "company": "Microsoft India",
    "companyLogo": "💻",
    "location": "Noida, UP (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹28L – ₹45L",
    "salaryMin": 2800000,
    "salaryMax": 4500000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "💻",
    "skills": [
      "Microsoft Azure",
      "Azure OpenAI",
      "LLMs",
      "Terraform",
      "Cognitive Services",
      "Enterprise Architecture"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": true,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "Azure AI"
    ],
    "applicants": 18,
    "description": "Guide enterprise customers through end-to-end transformation journeys, from solution envisioning and AI architect design to full-scale Azure deployments.",
    "responsibilities": [
      "Design end-to-end enterprise AI solutions using Azure OpenAI and LLMs",
      "Act as a technical subject matter expert for application development and cloud modernization",
      "Provide technical architecture guidance and deliver hands-on proofs of concept (PoCs)"
    ],
    "requirements": [
      "6-8+ years of experience in cloud infrastructure, IT consulting, systems architecture, or software development",
      "Deep knowledge of Microsoft Azure, AI/ML pipelines, Conversational AI, and Infrastructure as Code",
      "Strong stakeholder management and technical presentation skills"
    ],
    "niceToHave": [
      "Microsoft Certified: Azure Solutions Architect Expert or Azure AI Engineer Associate",
      "Familiarity with enterprise zero-trust frameworks"
    ],
    "benefits": [
      "Highly competitive CTC package with performance incentives",
      "Microsoft RSU grant and employee stock purchase plan",
      "World-class medical, dental, and vision coverage",
      "Subsidized physical fitness, transport, and remote equipment budgets",
      "Annual learning budget and community volunteering options"
    ],
    "aboutCompany": "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
    "externalUrl": "https://careers.microsoft.com/us/en/search-results"
  },
  {
    "id": 4,
    "title": "Lead Deep Learning Compiler Engineer",
    "company": "NVIDIA India",
    "companyLogo": "🟢",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹40L – ₹65L",
    "salaryMin": 4000000,
    "salaryMax": 6500000,
    "posted": "3 days ago",
    "postedDays": 3,
    "logo": "🟢",
    "skills": [
      "C++",
      "CUDA",
      "LLVM",
      "PyTorch Compilation",
      "GPU Architecture",
      "Python"
    ],
    "experience": "Lead",
    "category": "AI/ML",
    "featured": true,
    "urgent": true,
    "tags": [
      "NVIDIA",
      "CUDA",
      "Compilers"
    ],
    "applicants": 15,
    "description": "Design and optimize compilers for deep learning accelerators, enabling maximum performance for LLM training and inference on Hopper and Blackwell architectures.",
    "responsibilities": [
      "Develop backend optimizations in LLVM and MLIR for Tensor Cores",
      "Improve model compile times and runtime efficiencies in PyTorch 2.0 (Dynamo/Inductor)",
      "Benchmark and profile deep learning workloads to identify compiler-level bottlenecks"
    ],
    "requirements": [
      "7+ years in compiler design or high-performance computer graphics",
      "Deep knowledge of C++, CUDA programming, and GPU memory hierarchies",
      "Bachelor’s/Master’s in Computer Engineering, Computer Science, or Electrical Engineering"
    ],
    "niceToHave": [
      "Active contributor to LLVM, TVM, or Triton open-source compiler projects",
      "Familiarity with sparse-matrix computations"
    ],
    "benefits": [
      "Top-of-market base salary with NVIDIA stock options (ESPP)",
      "Annual performance bonus and recognition grants",
      "Flexi-work model and extensive wellness programs",
      "Premium health, accident, and life insurance"
    ],
    "aboutCompany": "NVIDIA is the pioneer of GPU-accelerated computing and the global leader in AI hardware and software architectures.",
    "externalUrl": "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite"
  },
  {
    "id": 5,
    "title": "Member of Technical Staff, Real-Time Synthesis",
    "company": "OpenAI",
    "companyLogo": "👁️",
    "location": "San Francisco, CA (Remote Friendly)",
    "country": "United States",
    "type": "Remote",
    "salary": "$300k – $450k",
    "salaryMin": 25000000,
    "salaryMax": 38000000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "👁️",
    "skills": [
      "Python",
      "Rust",
      "PyTorch",
      "Generative Voice",
      "Large Language Models",
      "Distributed Inference"
    ],
    "experience": "Senior",
    "category": "AI/ML",
    "featured": true,
    "urgent": true,
    "tags": [
      "Remote",
      "OpenAI",
      "Generative AI"
    ],
    "applicants": 156,
    "description": "Work on OpenAI’s core audio synthesis and real-time conversation models, pushing the boundaries of human-machine communication systems.",
    "responsibilities": [
      "Train and refine state-of-the-art voice generation and auditory models",
      "Design low-latency audio processing pipelines integrated with LLM endpoints",
      "Ensure safety standards, watermark integration, and alignment in generative media"
    ],
    "requirements": [
      "4+ years in active deep learning research or systems engineering",
      "Expertise in generative models (Diffusion, GANs, Autoregressive transformers)",
      "Solid experience in PyTorch and low-latency systems engineering (Rust/C++)"
    ],
    "niceToHave": [
      "Publications at NeurIPS, ICML, CVPR, or Interspeech",
      "Experience in scaling voice cloning and multilingual speech synthesis"
    ],
    "benefits": [
      "Uncapped base compensation and substantial startup equity packages",
      "100% covered health, dental, and vision insurance premiums",
      "Flexible home office setup allowance ($5,000 USD)",
      "Unlimited mental health counseling and fitness allowances"
    ],
    "aboutCompany": "OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general intelligence benefits all of humanity.",
    "externalUrl": "https://openai.com/careers"
  },
  {
    "id": 6,
    "title": "Senior Product Designer (Instagram Core)",
    "company": "Meta India",
    "companyLogo": "♾️",
    "location": "Mumbai, Maharashtra (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹40L",
    "salaryMin": 2500000,
    "salaryMax": 4000000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "♾️",
    "skills": [
      "Figma",
      "Prototyping",
      "User Research",
      "Product Strategy",
      "UI/UX Design"
    ],
    "experience": "Senior",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Meta",
      "Figma",
      "Instagram"
    ],
    "applicants": 42,
    "description": "Lead visual design and product user journeys for Instagram’s growth, creator platforms, and conversational surfaces in global markets.",
    "responsibilities": [
      "Create high-fidelity interactive prototypes illustrating intuitive navigation flows",
      "Collaborate with product managers and engineers to implement pixel-perfect layouts",
      "Synthesize user research findings into practical design iteration pipelines"
    ],
    "requirements": [
      "6+ years of UX/UI design experience in high-growth B2C consumer applications",
      "Exceptional portfolio showcasing problem-solving and visual polish",
      "Strong communication skills and cross-functional leadership qualities"
    ],
    "niceToHave": [
      "Basic knowledge of React, React Native, or CSS animation tools",
      "Experience designing for emerging market audiences"
    ],
    "benefits": [
      "Highly competitive base compensation with Meta stock grants (RSUs)",
      "Subsidized dining options and transport programs",
      "Top-tier wellness reimbursement and standard health benefits"
    ],
    "aboutCompany": "Meta builds technologies that help people connect, find communities, and grow businesses.",
    "externalUrl": "https://www.metacareers.com/"
  },
  {
    "id": 7,
    "title": "Senior Frontend Engineer (UI Frameworks)",
    "company": "Netflix",
    "companyLogo": "🍿",
    "location": "Los Gatos, CA (Remote)",
    "country": "United States",
    "type": "Remote",
    "salary": "$220k – $320k",
    "salaryMin": 18000000,
    "salaryMax": 26000000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "🍿",
    "skills": [
      "React",
      "TypeScript",
      "Web Performance",
      "Node.js",
      "Redux",
      "Design Systems"
    ],
    "experience": "Senior",
    "category": "Full Stack",
    "featured": true,
    "urgent": false,
    "tags": [
      "Remote",
      "React",
      "Netflix"
    ],
    "applicants": 89,
    "description": "Own the performance, modularity, and responsiveness of the core web player interface accessed by hundreds of millions of users daily.",
    "responsibilities": [
      "Develop high-performance UI components using modern React and TypeScript",
      "Optimize network utilization, asset bundles, and client-side rendering bottlenecks",
      "Maintain Netflix’s internal cross-platform design system and reusable component libraries"
    ],
    "requirements": [
      "5+ years writing production-grade frontend applications",
      "Deep mastery of vanilla JavaScript, modern CSS features, and browser APIs",
      "Proven experience profiling and resolving rendering performance bugs"
    ],
    "niceToHave": [
      "Experience in web television ecosystems or smart TV browser optimizations",
      "Familiarity with Canvas-based or WebGL UI rendering patterns"
    ],
    "benefits": [
      "Netflix cash-compensation model (choose stock option ratio manually)",
      "100% covered health benefits and standard retirement match",
      "Unlimited PTO and flexible work schedule configurations",
      "Generous parental leave policies"
    ],
    "aboutCompany": "Netflix is the world's leading streaming entertainment service with over 230 million paid memberships.",
    "externalUrl": "https://jobs.netflix.com/"
  },
  {
    "id": 8,
    "title": "iOS Systems Engineer (Core Graphics)",
    "company": "Apple India",
    "companyLogo": "🍎",
    "location": "Hyderabad, Telangana (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹48L",
    "salaryMin": 3000000,
    "salaryMax": 4800000,
    "posted": "5 days ago",
    "postedDays": 5,
    "logo": "🍎",
    "skills": [
      "Swift",
      "Objective-C",
      "Metal",
      "CoreGraphics",
      "C++",
      "iOS SDK"
    ],
    "experience": "Senior",
    "category": "Mobile",
    "featured": false,
    "urgent": false,
    "tags": [
      "Apple",
      "Swift",
      "Metal"
    ],
    "applicants": 31,
    "description": "Work inside the core operating system team optimizing display frameworks, rendering engines, and graphics performance across iOS, iPadOS, and visionOS.",
    "responsibilities": [
      "Implement display engine rendering optimizations using Metal API",
      "Collaborate with silicon validation teams to ensure hardware-software graphic compatibility",
      "Identify and fix deep OS kernel-level graphic bottlenecks and memory leaks"
    ],
    "requirements": [
      "5+ years writing low-level graphic systems or robust iOS applications",
      "Strong programming capability in Swift, C++, and Core Graphics concepts",
      "Degree in Computer Engineering, Electrical Engineering, or related fields"
    ],
    "niceToHave": [
      "Experience building custom graphics engines or working with Vulkan/OpenGL APIs",
      "Familiarity with spatial audio or ARKit architectures"
    ],
    "benefits": [
      "Highly competitive base salary and Apple stock purchase discount plan",
      "Outstanding medical and family insurance setups",
      "Subsidized Apple hardware purchases and training allowances"
    ],
    "aboutCompany": "Apple designs consumer electronics, computer software, and online services.",
    "externalUrl": "https://www.apple.com/careers/"
  },
  {
    "id": 9,
    "title": "Staff Backend Engineer (Billing Infrastructure)",
    "company": "Stripe",
    "companyLogo": "💳",
    "location": "Dublin, Ireland (Remote Friendly)",
    "country": "Ireland",
    "type": "Remote",
    "salary": "€140k – €210k",
    "salaryMin": 12000000,
    "salaryMax": 18000000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "💳",
    "skills": [
      "Ruby",
      "Go",
      "Distributed Systems",
      "MySQL",
      "APIs",
      "High Availability"
    ],
    "experience": "Staff",
    "category": "Backend",
    "featured": true,
    "urgent": true,
    "tags": [
      "Remote",
      "Go",
      "Stripe"
    ],
    "applicants": 112,
    "description": "Architect secure, fault-tolerant billing pipelines managing multi-billion dollar transaction ledgers for the world’s largest online companies.",
    "responsibilities": [
      "Redesign distributed ledger platforms to increase system reliability and reduce double-entry errors",
      "Build robust API endpoints supporting thousands of global transaction formats",
      "Mentor senior engineers and provide architectural guidance across billing subdivisions"
    ],
    "requirements": [
      "8+ years in production systems development with expertise in Go, Java, or Ruby",
      "Strong experience designing double-entry ledgers or high-availability financial databases",
      "Outstanding system architecture design capabilities"
    ],
    "niceToHave": [
      "Contributions to enterprise database systems or global payment gateway standard protocols",
      "Strong public presence or developer advocacy background"
    ],
    "benefits": [
      "Stripe premium base salary, bonus, and equity plans",
      "Unmatched global medical, dental, and life coverages",
      "Generous learning, fitness, and home-office stipends"
    ],
    "aboutCompany": "Stripe is a financial infrastructure platform for the internet.",
    "externalUrl": "https://stripe.com/jobs"
  },
  {
    "id": 10,
    "title": "Frontend Developer Relations Engineer",
    "company": "Vercel",
    "companyLogo": "▲",
    "location": "Remote (Worldwide)",
    "country": "United States",
    "type": "Remote",
    "salary": "$130k – $180k",
    "salaryMin": 10000000,
    "salaryMax": 15000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "▲",
    "skills": [
      "Next.js",
      "React",
      "TailwindCSS",
      "TypeScript",
      "Technical Writing",
      "Public Speaking"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": true,
    "urgent": false,
    "tags": [
      "Remote",
      "Vercel",
      "Next.js"
    ],
    "applicants": 245,
    "description": "Empower developers globally by creating educational content, representing Vercel at tech conferences, and shaping the future of Next.js alongside the core framework team.",
    "responsibilities": [
      "Produce comprehensive video tutorials, blog posts, and interactive code sandboxes",
      "Engage with open-source communities to gather valuable feedback on Next.js features",
      "Build open-source templates and starter kits highlighting edge deployment best practices"
    ],
    "requirements": [
      "3+ years in professional software development with high competency in Next.js",
      "Excellent technical writing skills and proven presentation or public speaking portfolios",
      "Strong empathy for developer workflows and passion for open-source"
    ],
    "niceToHave": [
      "Prior DevRel or community management experience",
      "Substantial GitHub open-source contributions"
    ],
    "benefits": [
      "Flexible remote schedule with globally adjusted competitive base rates",
      "Vercel equity package and home setup budget",
      "Unlimited educational resource subscriptions"
    ],
    "aboutCompany": "Vercel provides developer tools and cloud infrastructure to build and deploy fast frontend applications.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 11,
    "title": "Senior Data Platform Engineer",
    "company": "Snowflake",
    "companyLogo": "❄️",
    "location": "Pune, Maharashtra (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹28L – ₹42L",
    "salaryMin": 2800000,
    "salaryMax": 4200000,
    "posted": "6 days ago",
    "postedDays": 6,
    "logo": "❄️",
    "skills": [
      "Java",
      "C++",
      "Python",
      "SQL",
      "Data Warehousing",
      "Distributed Query Optimization"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "Snowflake",
      "Database",
      "Pune"
    ],
    "applicants": 19,
    "description": "Optimize execution runtimes, query parsers, and metadata processing layers within the core Snowflake Cloud Data Platform.",
    "responsibilities": [
      "Improve performance of distributed analytical engines processing petabytes of enterprise data",
      "Design robust transactional mechanisms and replication services across cloud architectures",
      "Debug and resolve low-level concurrency and synchronization bugs"
    ],
    "requirements": [
      "5+ years writing systems software using C++ or Java in high-throughput environments",
      "Deep comprehension of query optimization, indexing strategies, and database engines",
      "Master’s or Bachelor’s in CS or Computer Engineering"
    ],
    "niceToHave": [
      "Experience building custom analytical databases or column-store architectures",
      "Familiarity with Arrow, Spark, or DuckDB APIs"
    ],
    "benefits": [
      "Highly competitive base compensation with annual stock grant extensions",
      "Top-tier wellness credits and multi-tier health insurance coverages",
      "Free lunch programs and modern onsite campus resources"
    ],
    "aboutCompany": "Snowflake enables every organization to mobilize their data with Snowflake’s Cloud Data Platform.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 12,
    "title": "Lead Site Reliability Engineer",
    "company": "Datadog",
    "companyLogo": "🐕",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹52L",
    "salaryMin": 3500000,
    "salaryMax": 5200000,
    "posted": "3 days ago",
    "postedDays": 3,
    "logo": "🐕",
    "skills": [
      "Go",
      "Kubernetes",
      "Linux Kernel",
      "AWS",
      "Prometheus",
      "Terraform"
    ],
    "experience": "Lead",
    "category": "DevOps",
    "featured": true,
    "urgent": true,
    "tags": [
      "Datadog",
      "Kubernetes",
      "SRE"
    ],
    "applicants": 29,
    "description": "Provide operational excellence, incident management, and auto-scaling solutions for Datadog’s multi-region Kubernetes clusters handling trillions of telemetry events daily.",
    "responsibilities": [
      "Establish robust system architectures reducing incident resolution periods",
      "Manage cloud infrastructure scaling configurations across AWS, Azure, and GCP platforms",
      "Optimize observability, log aggregation pipelines, and monitoring alerts for interior systems"
    ],
    "requirements": [
      "7+ years working inside SRE or DevOps subdivisions at scale",
      "Expert level understanding of Kubernetes clustering, Docker, and Linux systems internals",
      "Proficiency in Go or Python coding"
    ],
    "niceToHave": [
      "Experience writing custom Kubernetes operators or orchestrators",
      "Active contributor to CNCF projects"
    ],
    "benefits": [
      "Strong CTC package with high-yield RSUs",
      "Substantial training budget, internet allowance, and tech budget",
      "Modern, supportive hybrid office configurations"
    ],
    "aboutCompany": "Datadog is the monitoring and security platform for cloud applications.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 13,
    "title": "Senior Security Engineer (AppSec)",
    "company": "GitHub",
    "companyLogo": "🐙",
    "location": "Remote (APAC)",
    "country": "India",
    "type": "Remote",
    "salary": "₹26L – ₹40L",
    "salaryMin": 2600000,
    "salaryMax": 4000000,
    "posted": "1 week ago",
    "postedDays": 7,
    "logo": "🐙",
    "skills": [
      "Static Analysis",
      "AppSec",
      "Ruby on Rails",
      "Go",
      "OAuth",
      "Threat Modeling"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Security",
      "GitHub"
    ],
    "applicants": 38,
    "description": "Ensure the highest security standards for GitHub.com by implementing secure coding frameworks, performing comprehensive code reviews, and threat modeling core APIs.",
    "responsibilities": [
      "Analyze and patch code vulnerabilities within Ruby on Rails, Go, and React frameworks",
      "Integrate static analysis (SAST) and dynamic analysis (DAST) utilities into development lifecycles",
      "Lead incident response investigations for application-layer security incidents"
    ],
    "requirements": [
      "5+ years dedicated to application security, penetration testing, or software development",
      "Strong expertise in threat modeling, OAuth integration, and web-vulnerability remediation",
      "Proficient coding capacity in Ruby, Go, or Node.js"
    ],
    "niceToHave": [
      "OSCP, CASE, or equivalent certifications",
      "Prior history hunting web application bugs in public bug bounty platforms"
    ],
    "benefits": [
      "Competitive remote compensation and Microsoft ESPP integration",
      "Flexible home-office equipment budgets and training allowances",
      "Comprehensive healthcare for family members"
    ],
    "aboutCompany": "GitHub is the developer company. We are the home for all developers to build, secure, and deploy software.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 14,
    "title": "Senior Full Stack Engineer (Creative Cloud)",
    "company": "Adobe",
    "companyLogo": "🅰️",
    "location": "Noida, UP (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹22L – ₹36L",
    "salaryMin": 2200000,
    "salaryMax": 3600000,
    "posted": "5 days ago",
    "postedDays": 5,
    "logo": "🅰️",
    "skills": [
      "C++",
      "React",
      "TypeScript",
      "WebAssembly",
      "WebGL",
      "Node.js"
    ],
    "experience": "Senior",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Adobe",
      "Noida",
      "React"
    ],
    "applicants": 47,
    "description": "Port Adobe’s premium creative applications to the web, utilizing cutting-edge WebAssembly, WebGL, and modern React architectures.",
    "responsibilities": [
      "Build pixel-perfect, highly responsive web canvas tools managing millions of assets",
      "Compile high-performance C++ rendering engines to WebAssembly (Wasm)",
      "Optimize web canvas rendering frame-rates using WebGL/WebGPU optimization practices"
    ],
    "requirements": [
      "5+ years as a full-stack developer with professional competency in React/Node.js",
      "Solid programming experience in C++ and browser graphics systems",
      "Bachelor’s degree in CS or equivalent field"
    ],
    "niceToHave": [
      "Experience in image-processing algorithms or custom video rendering",
      "Familiarity with vector editing or UI engine systems"
    ],
    "benefits": [
      "Excellent base compensation with yearly stock allocation plans",
      "Substantial education reimbursement and Adobe hardware credits",
      "Extensive modern wellness platforms and flexible medical coverages"
    ],
    "aboutCompany": "Adobe is the global leader in digital media and digital marketing solutions.",
    "externalUrl": "https://adobe.wd5.myworkdayjobs.com/external_careers"
  },
  {
    "id": 15,
    "title": "Senior Mobile Android Engineer (Rider App)",
    "company": "Uber India",
    "companyLogo": "🚗",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹50L",
    "salaryMin": 3200000,
    "salaryMax": 5000000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "🚗",
    "skills": [
      "Kotlin",
      "Java",
      "Android SDK",
      "RxJava",
      "Dagger/Hilt",
      "System Architecture"
    ],
    "experience": "Senior",
    "category": "Mobile",
    "featured": true,
    "urgent": false,
    "tags": [
      "Uber",
      "Kotlin",
      "Android"
    ],
    "applicants": 54,
    "description": "Architect, optimize, and scale the Uber Rider mobile app utilized by millions of commuters every second across emerging global markets.",
    "responsibilities": [
      "Develop modular Kotlin features utilizing clean architectures and unidirectional flow patterns",
      "Optimize location tracking, offline caching, and network bandwidth overhead",
      "Maintain modular design components and UI standardization libraries"
    ],
    "requirements": [
      "5+ years dedicated to professional Android app development using Kotlin",
      "Deep comprehension of reactive programming, dependency injection, and mobile system design",
      "Outstanding track record publishing high-growth apps in Google Play Store"
    ],
    "niceToHave": [
      "Experience with Jetpack Compose in large production application bases",
      "Prior understanding of map-rendering engines or real-time web-socket integrations"
    ],
    "benefits": [
      "High base salary and performance incentives with Uber RSU components",
      "Uber credits and commute allowances",
      "World-class family healthcare insurance packages"
    ],
    "aboutCompany": "Uber is changing the way the world moves, connecting riders, drivers, and businesses globally.",
    "externalUrl": "https://www.uber.com/careers/"
  },
  {
    "id": 16,
    "title": "Backend Infrastructure Developer",
    "company": "Spotify",
    "companyLogo": "🎵",
    "location": "Stockholm, Sweden (Remote Friendly)",
    "country": "Sweden",
    "type": "Remote",
    "salary": "SEK 70k – 95k/mo",
    "salaryMin": 8000000,
    "salaryMax": 11000000,
    "posted": "3 days ago",
    "postedDays": 3,
    "logo": "🎵",
    "skills": [
      "Java",
      "C++",
      "Python",
      "Kafka",
      "Google Cloud",
      "Distributed Systems"
    ],
    "experience": "Mid Level",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Java",
      "Spotify"
    ],
    "applicants": 74,
    "description": "Ensure low-latency audio delivery pipelines, massive content catalog management, and playlist metadata synchronization services for Spotify worldwide.",
    "responsibilities": [
      "Design high-throughput backend services using Java and Google Cloud Platform APIs",
      "Implement real-time processing pipelines utilizing Kafka for streaming data",
      "Ensure 99.9% uptime for core content APIs"
    ],
    "requirements": [
      "3+ years of professional backend developer experience with Java or Python",
      "Deep understanding of RESTful APIs, relational databases, and distributed concepts",
      "Strong problem-solving capacity and system engineering foundations"
    ],
    "niceToHave": [
      "Experience with Bigtable, GKE, or GCP cloud platforms",
      "Passion for audio compression and streaming architectures"
    ],
    "benefits": [
      "Highly competitive European salary scale with Spotify options",
      "Generous pension plan and global parental leave coverage",
      "Annual home-office setup stipends and subscription credits"
    ],
    "aboutCompany": "Spotify is the world's most popular audio streaming subscription service with over 500 million users.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 17,
    "title": "Senior Threat Intelligence Analyst",
    "company": "CrowdStrike",
    "companyLogo": "🦅",
    "location": "Pune, Maharashtra (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹22L – ₹35L",
    "salaryMin": 2200000,
    "salaryMax": 3500000,
    "posted": "1 week ago",
    "postedDays": 7,
    "logo": "🦅",
    "skills": [
      "Malware Analysis",
      "Reverse Engineering",
      "Threat Hunting",
      "YARA",
      "Python",
      "Network Forensics"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "CrowdStrike",
      "Security",
      "Pune"
    ],
    "applicants": 16,
    "description": "Perform advanced malware reverse engineering and trace complex advanced persistent threats (APTs) for global corporate enterprise bases.",
    "responsibilities": [
      "Reverse engineer advanced binary malware to determine capabilities and indicator footprints",
      "Author detailed technical intelligence reports on emerging threat actors and attack campaigns",
      "Develop custom detection signatures (YARA, Snort) to shield client organizations"
    ],
    "requirements": [
      "5+ years dedicated to incident response, malware analysis, or cyber threat hunting",
      "Strong capability with IDA Pro, Ghidra, x64dbg, or dynamic analysis platforms",
      "Proficiency writing automation scripts in Python or Go"
    ],
    "niceToHave": [
      "GIAC Reverse Engineering Malware (GREM) or equivalent certifications",
      "Prior public security advisory or tracking publications"
    ],
    "benefits": [
      "Highly competitive package with excellent ESPP options",
      "Fully-covered premium family medical protection packages",
      "Generous work equipment and continuous study funding allocations"
    ],
    "aboutCompany": "CrowdStrike is a global cybersecurity leader that has redefined modern security with the world’s most advanced cloud-native platform.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 18,
    "title": "Cloud Security Architect",
    "company": "Palo Alto Networks",
    "companyLogo": "🛡️",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹46L",
    "salaryMin": 3000000,
    "salaryMax": 4600000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "🛡️",
    "skills": [
      "Prisma Cloud",
      "AWS Security",
      "Azure Security",
      "Kubernetes Security",
      "IAM",
      "Compliance"
    ],
    "experience": "Lead",
    "category": "Cybersecurity",
    "featured": true,
    "urgent": false,
    "tags": [
      "PaloAlto",
      "CloudSec",
      "Architect"
    ],
    "applicants": 21,
    "description": "Architect, implement, and standardise secure multi-tenant cloud environments utilizing Prisma Cloud and industry zero-trust standards.",
    "responsibilities": [
      "Provide secure platform architectures across large-scale AWS and Azure enterprise footprints",
      "Establish robust Identity and Access Management (IAM) and network security isolation models",
      "Lead compliance audits (SOC2, ISO27001, GDPR) across dynamic cloud applications"
    ],
    "requirements": [
      "6+ years experience in network security with 3+ years specifically in Cloud Security Architectures",
      "Deep expertise in Prisma Cloud, AWS Security Hub, or GCP Security Command Center solutions",
      "Excellent architecture-level communication capabilities"
    ],
    "niceToHave": [
      "CCSP, AWS Certified Security, or Google Cloud Professional Cloud Security Engineer certifications",
      "Hands-on experience with Terraform security linters"
    ],
    "benefits": [
      "Market-leading base salary with generous performance incentives",
      "Outstanding RSU program and discount stock purchase options",
      "World-class wellness centers and family support programs"
    ],
    "aboutCompany": "Palo Alto Networks is the global cybersecurity leader, shaping the cloud-centric future with technology.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 19,
    "title": "Lead Frontend Engineer (Jira Cloud)",
    "company": "Atlassian",
    "companyLogo": "🟦",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "🟦",
    "skills": [
      "React",
      "TypeScript",
      "Redux",
      "Webpack",
      "CSS-in-JS",
      "Performance Optimization"
    ],
    "experience": "Lead",
    "category": "Full Stack",
    "featured": true,
    "urgent": true,
    "tags": [
      "Atlassian",
      "React",
      "Jira"
    ],
    "applicants": 41,
    "description": "Transform the user experience of Atlassian Jira by leading front-end performance sprints, migrating legacy components to React, and guiding junior developers.",
    "responsibilities": [
      "Optimize web vitals, bundle sizes, and interaction delays for Jira Core features",
      "Coordinate architectural front-end paradigms across international collaboration teams",
      "Write highly clean, documented, and reusable typescript UI elements"
    ],
    "requirements": [
      "7+ years writing modern web applications with 3+ years leading engineering teams",
      "Absolute mastery of React, TypeScript, and front-end build pipelines",
      "Excellent engineering coordination and task breakdown capabilities"
    ],
    "niceToHave": [
      "Experience with GraphQL, Apollo client, or state management frameworks at scale",
      "Familiarity with server-side rendering or micro-frontend configurations"
    ],
    "benefits": [
      "Highly competitive base CTC, stock awards, and performance incentives",
      "Excellent flexible allowances for home setup, wellness, and internet needs",
      "Paid volunteer leaves and global learning budgets"
    ],
    "aboutCompany": "Atlassian unleashes the potential in every team. Our collaboration tools help teams organize and complete their work.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 20,
    "title": "Senior Product Manager (Collaboration)",
    "company": "Figma",
    "companyLogo": "🎨",
    "location": "London, UK (Remote Friendly)",
    "country": "United Kingdom",
    "type": "Remote",
    "salary": "£110k – £150k",
    "salaryMin": 11000000,
    "salaryMax": 15000000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "🎨",
    "skills": [
      "Product Roadmap",
      "Agile",
      "Figma",
      "UX/UI Research",
      "SQL",
      "Data Analytics"
    ],
    "experience": "Senior",
    "category": "Full Stack",
    "featured": true,
    "urgent": false,
    "tags": [
      "Remote",
      "Figma",
      "PM"
    ],
    "applicants": 134,
    "description": "Drive the product roadmap and user research paradigms for Figma’s multi-player collaboration workspace and team sharing layers.",
    "responsibilities": [
      "Define long-term strategy and deliver high-impact feature specifications for multiplayer environments",
      "Coordinate tightly with top engineers and designers to launch intuitive design features",
      "Analyze qualitative user studies and quantitative product telemetry data"
    ],
    "requirements": [
      "5+ years dedicated to Product Management in fast-scaling SaaS or consumer products",
      "Excellent understanding of visual tools, collaborative workflows, or web application constraints",
      "Strong data fluency and ability to write basic SQL queries"
    ],
    "niceToHave": [
      "Prior design portfolio or experience working as a visual designer",
      "Experience scaling real-time collaboration platforms"
    ],
    "benefits": [
      "Highly lucrative base scale, annual bonuses, and Figma options",
      "Complete comprehensive medical coverages",
      "Substantial training budgets and home utility credits"
    ],
    "aboutCompany": "Figma is a leading design platform helping teams build products collaboratively.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 21,
    "title": "Senior React Native Developer",
    "company": "Shopify",
    "companyLogo": "🛍️",
    "location": "Remote (APAC)",
    "country": "India",
    "type": "Remote",
    "salary": "₹24L – ₹38L",
    "salaryMin": 2400000,
    "salaryMax": 3800000,
    "posted": "6 days ago",
    "postedDays": 6,
    "logo": "🛍️",
    "skills": [
      "React Native",
      "JavaScript",
      "TypeScript",
      "iOS SDK",
      "Android SDK",
      "Performance Profiling"
    ],
    "experience": "Senior",
    "category": "Mobile",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Shopify",
      "React Native"
    ],
    "applicants": 52,
    "description": "Help build and optimize Shopify’s flagship consumer mobile applications using React Native, targeting absolute native-parity fluidity.",
    "responsibilities": [
      "Write highly performance-tuned React Native components spanning both iOS and Android layouts",
      "Bridge native Swift/Kotlin APIs into JavaScript application domains",
      "Optimize JS thread frame execution, startup lag, and bundle metrics"
    ],
    "requirements": [
      "5+ years dedicated to mobile engineering with 3+ years writing React Native code",
      "Familiarity with native iOS (Swift) or Android (Kotlin) development environments",
      "Exceptional performance profiling and rendering debugging capabilities"
    ],
    "niceToHave": [
      "Active contributor to React Native or React Navigation open-source packages",
      "Familiarity with GraphQL and Apollo Client architectures"
    ],
    "benefits": [
      "Competitive remote base rate and Shopify stock options (RSUs)",
      "Substantial work-from-home setup stipends and continuous learning allowances",
      "Globally recognized flexible PTO systems"
    ],
    "aboutCompany": "Shopify is the global commerce platform, powering millions of businesses worldwide.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 22,
    "title": "Senior Backend Engineer (Realtime Messaging)",
    "company": "Slack",
    "companyLogo": "💬",
    "location": "Pune, Maharashtra (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹26L – ₹40L",
    "salaryMin": 2600000,
    "salaryMax": 4000000,
    "posted": "5 days ago",
    "postedDays": 5,
    "logo": "💬",
    "skills": [
      "Go",
      "Java",
      "PHP/Hack",
      "Redis",
      "WebSockets",
      "MySQL"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "Slack",
      "Go",
      "WebSockets"
    ],
    "applicants": 35,
    "description": "Ensure absolute messaging reliability, instant status synchronization, and web-socket durability for millions of concurrent Slack users worldwide.",
    "responsibilities": [
      "Design highly scalable, fault-tolerant messaging channels and presence notification engines",
      "Optimize web-socket server pooling and routing layers to minimize memory footprint",
      "Debug and resolve complex concurrent race-conditions and high-load bottlenecks"
    ],
    "requirements": [
      "5+ years of software development experience using Go, Java, or PHP in enterprise databases",
      "Strong expertise with Redis caching, WebSockets, and asynchronous task queues",
      "Bachelor’s in CS or equivalent field"
    ],
    "niceToHave": [
      "Prior experience handling high-volume pub/sub infrastructure or chat architectures",
      "Familiarity with Kafka or Kubernetes operations"
    ],
    "benefits": [
      "Highly competitive CTC package with Salesforce ESPP benefits",
      "Extensive modern wellness platforms and flexible medical coverages",
      "Substantial career advancement training and development options"
    ],
    "aboutCompany": "Slack is the productivity platform that brings people, tools, and data together in one place.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 23,
    "title": "Data Science Manager",
    "company": "ZoomInfo",
    "companyLogo": "📈",
    "location": "Chennai, Tamil Nadu (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹48L",
    "salaryMin": 3200000,
    "salaryMax": 4800000,
    "posted": "1 week ago",
    "postedDays": 7,
    "logo": "📈",
    "skills": [
      "Python",
      "SQL",
      "NLP",
      "Data Science",
      "Machine Learning",
      "Team Leadership"
    ],
    "experience": "Lead",
    "category": "Data Science",
    "featured": true,
    "urgent": false,
    "tags": [
      "ZoomInfo",
      "Leadership",
      "NLP"
    ],
    "applicants": 18,
    "description": "Lead a talented team of 8+ Data Scientists and NLP Engineers building next-generation B2B demographic databases and predictive recommendation models.",
    "responsibilities": [
      "Oversee the technical design and deployment of large-scale NLP parsing pipelines",
      "Coordinate roadmap alignments with product managers and corporate leaders",
      "Mentor and manage team growth, conducting standard code reviews and reviews"
    ],
    "requirements": [
      "7+ years in professional Data Science or Machine Learning environments",
      "2+ years dedicated to leadership or managing technical teams",
      "Deep competency with NLP techniques, information extraction, and database design"
    ],
    "niceToHave": [
      "PhD or Master’s in Data Science, Statistics, or related technical fields",
      "Experience with transformer-based embedding pipelines at scale"
    ],
    "benefits": [
      "Lucrative base package with annual performance incentives and bonuses",
      "Exceptional medical coverage setups for employee and dependents",
      "Modern Chennai campus with high-end workspace tools"
    ],
    "aboutCompany": "ZoomInfo is a leader in modern go-to-market software, data, and intelligence platforms.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 24,
    "title": "Data Scientist (Algorithmic Recommendations)",
    "company": "Spotify",
    "companyLogo": "🎵",
    "location": "New York, NY (Remote Friendly)",
    "country": "United States",
    "type": "Remote",
    "salary": "$160k – $220k",
    "salaryMin": 13000000,
    "salaryMax": 18000000,
    "posted": "3 days ago",
    "postedDays": 3,
    "logo": "🎵",
    "skills": [
      "Python",
      "Scala",
      "PySpark",
      "Machine Learning",
      "Recommendation Engines",
      "A/B Testing"
    ],
    "experience": "Senior",
    "category": "Data Science",
    "featured": true,
    "urgent": false,
    "tags": [
      "Remote",
      "DataScience",
      "Spotify"
    ],
    "applicants": 142,
    "description": "Invent, test, and productionize recommendation algorithms behind Spotify’s \"Discover Weekly\" and algorithmic playlist layouts.",
    "responsibilities": [
      "Build scalable collaborative filtering and deep retrieval models for personalized recommendations",
      "Design, execute, and analyze rigorous high-throughput client A/B testing campaigns",
      "Process massive user interaction telemetry logs utilizing PySpark and Scala pipelines"
    ],
    "requirements": [
      "4+ years as a working Data Scientist or ML Engineer in consumer web domains",
      "Deep understanding of Recommendation Algorithms, matrix factorization, and statistics",
      "Strong proficiency with Python, SQL, and distributed frameworks (Spark)"
    ],
    "niceToHave": [
      "Publications at RecSys, KDD, or related analytical forums",
      "Prior experience with real-time vector databases or search engines"
    ],
    "benefits": [
      "Market-leading base compensation, bonuses, and equity options",
      "Generous pension plan and global parental leave coverage",
      "Extensive home office setup allowance"
    ],
    "aboutCompany": "Spotify is the world's most popular audio streaming subscription service.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 25,
    "title": "Senior Smart Contract Engineer (Solidity)",
    "company": "Coinbase",
    "companyLogo": "🪙",
    "location": "Remote (Worldwide)",
    "country": "United States",
    "type": "Remote",
    "salary": "$180k – $250k",
    "salaryMin": 15000000,
    "salaryMax": 21000000,
    "posted": "5 days ago",
    "postedDays": 5,
    "logo": "🪙",
    "skills": [
      "Solidity",
      "Rust",
      "Web3",
      "Smart Contract Auditing",
      "Cryptography",
      "Go"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": false,
    "urgent": true,
    "tags": [
      "Remote",
      "Coinbase",
      "Solidity"
    ],
    "applicants": 87,
    "description": "Design secure, institutional-grade smart contracts for Coinbase’s decentralized finance (DeFi) platforms and Layer-2 scaling layers (Base).",
    "responsibilities": [
      "Write highly performance-optimized, secure Solidity and Rust contracts",
      "Conduct rigorous security audits, mathematical validations, and threat testing",
      "Integrate off-chain indexers and cryptographic oracle services"
    ],
    "requirements": [
      "4+ years dedicated to professional smart contract design in public EVM mainnets",
      "Deep understanding of EVM execution architectures, assembly (Yul), and DeFi primitives",
      "Outstanding commitment to software security and bug-free execution"
    ],
    "niceToHave": [
      "Prior public security bug disclosure history or protocol audits",
      "Familiarity with zero-knowledge cryptographic systems (ZKPs)"
    ],
    "benefits": [
      "Coinbase premium global compensation packages with equity options",
      "100% remote working conditions and complete technology budgets",
      "Standard health, dental, and retirement programs"
    ],
    "aboutCompany": "Coinbase is building the cryptoeconomy – a more fair, accessible, efficient, and transparent financial system.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 26,
    "title": "AI Safety Alignment Researcher",
    "company": "Anthropic",
    "companyLogo": "🕯️",
    "location": "San Francisco, CA (Hybrid)",
    "country": "United States",
    "type": "Full-time",
    "salary": "$280k – $400k",
    "salaryMin": 23000000,
    "salaryMax": 33000000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "🕯️",
    "skills": [
      "PyTorch",
      "Python",
      "Reinforcement Learning",
      "RLHF",
      "Mechanistic Interpretability"
    ],
    "experience": "Senior",
    "category": "AI/ML",
    "featured": true,
    "urgent": true,
    "tags": [
      "Anthropic",
      "Research",
      "AI Safety"
    ],
    "applicants": 98,
    "description": "Lead research in AI alignment, mechanistic interpretability, and reinforcement learning from human feedback (RLHF), ensuring the Claude model family remains safe and helpful.",
    "responsibilities": [
      "Design innovative training protocols focused on model truthfulness and safety alignments",
      "Examine interior neural activations to diagnose underlying model reasoning and bias elements",
      "Publish high-impact research papers and coordinate safety frameworks with international institutions"
    ],
    "requirements": [
      "PhD in Computer Science, Mathematics, or equivalent deep learning research backgrounds",
      "Proven record publishing at Top-Tier AI conferences (NeurIPS, ICML, ICLR)",
      "Exceptional python and PyTorch coding capabilities"
    ],
    "niceToHave": [
      "Experience working with frontier language models (>100B parameters)",
      "Background in philosophy, ethics, or complex decision sciences"
    ],
    "benefits": [
      "Uncapped base compensation and substantial startup equity packages",
      "100% covered health, dental, and vision insurance premiums",
      "Modern hybrid campus spaces with advanced server infrastructure access"
    ],
    "aboutCompany": "Anthropic is an AI safety and research company that builds reliable, beneficial, and controllable AI systems.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 27,
    "title": "Edge Network Infrastructure Engineer",
    "company": "Cloudflare",
    "companyLogo": "🧡",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹28L – ₹44L",
    "salaryMin": 2800000,
    "salaryMax": 4400000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "🧡",
    "skills": [
      "Rust",
      "C",
      "Linux Kernel",
      "eBPF",
      "BGP Routing",
      "Anycast Network"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Cloudflare",
      "Rust",
      "eBPF"
    ],
    "applicants": 23,
    "description": "Optimize high-throughput, low-latency packet routing, CDN caching architectures, and eBPF kernel network processing models across Cloudflare’s Indian edge nodes.",
    "responsibilities": [
      "Write performance-optimized systems code in Rust and C for routing servers",
      "Implement network observability and security rules utilizing eBPF within Linux kernels",
      "Debug real-world packet drops and routing anomalies across multi-region ISPs"
    ],
    "requirements": [
      "5+ years dedicated to low-level systems engineering or network programming",
      "Deep comprehension of Linux network stack internals, TCP/IP, and BGP routing protocols",
      "Expert systems programming capability using Rust, Go, or C"
    ],
    "niceToHave": [
      "Contributions to eBPF tools or the Linux kernel networking subsystem",
      "Familiarity with Anycast networks or DNS protocol design"
    ],
    "benefits": [
      "Highly competitive base CTC, stock awards, and performance incentives",
      "Extensive home office utility credits and modern hardware setups",
      "Exceptional medical coverage setups for employee and family dependents"
    ],
    "aboutCompany": "Cloudflare is on a mission to help build a better Internet, protecting and accelerating web sites globally.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 28,
    "title": "Senior Go Developer (Terraform Core)",
    "company": "HashiCorp",
    "companyLogo": "🪵",
    "location": "Remote (Worldwide)",
    "country": "United States",
    "type": "Remote",
    "salary": "$150k – $210k",
    "salaryMin": 12000000,
    "salaryMax": 17000000,
    "posted": "1 week ago",
    "postedDays": 7,
    "logo": "🪵",
    "skills": [
      "Go",
      "Terraform",
      "HCL",
      "Distributed Systems",
      "Git",
      "APIs"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": true,
    "urgent": false,
    "tags": [
      "Remote",
      "Go",
      "Terraform"
    ],
    "applicants": 154,
    "description": "Architect, optimize, and maintain the open-source Terraform Core framework and HashiCorp Configuration Language (HCL) compilation layers.",
    "responsibilities": [
      "Design new core plugin paradigms and state management configurations in Go",
      "Address critical performance bottlenecks during massive multi-cloud environment graph parsing",
      "Review and collaborate with the public open-source Terraform contributor base"
    ],
    "requirements": [
      "5+ years writing production-grade Go code in enterprise environments",
      "Deep understanding of graph theory, directed acyclic graphs (DAGs), and parser design",
      "Excellent collaborative capabilities and experience with open-source project management"
    ],
    "niceToHave": [
      "Maintainer of a popular open-source Go package or Terraform Provider",
      "Expert level understanding of AWS, Azure, or GCP provider systems"
    ],
    "benefits": [
      "HashiCorp remote base rate scales and option incentives",
      "Complete remote setup stipend, phone, and internet reimbursements",
      "Unlimited educational support funding and standard medical coverages"
    ],
    "aboutCompany": "HashiCorp provides infrastructure automation software for multi-cloud environments.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 29,
    "title": "Senior Identity Access Management Engineer",
    "company": "Okta",
    "companyLogo": "🔵",
    "location": "Noida, UP (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹22L – ₹35L",
    "salaryMin": 2200000,
    "salaryMax": 3500000,
    "posted": "5 days ago",
    "postedDays": 5,
    "logo": "🔵",
    "skills": [
      "OIDC",
      "OAuth2",
      "SAML",
      "Java",
      "Spring Boot",
      "Zero Trust"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Okta",
      "Noida",
      "SAML"
    ],
    "applicants": 19,
    "description": "Build and scale Okta’s core customer identity platforms (CIAM) handling high-velocity user logins, multi-factor authentications, and federated directory services.",
    "responsibilities": [
      "Design secure federated token validation engines utilizing Java and Spring Boot",
      "Lead secure protocol implementations (OIDC, SAML, WebAuthn) for high-growth clients",
      "Profile and optimize database replication latency for concurrent user states"
    ],
    "requirements": [
      "5+ years dedicated to IAM platform development or general software engineering with a focus on security",
      "Deep competency with OAuth2, SAML, PKCE, and federated authorization models",
      "Proficiency writing production-grade Java or Node.js applications"
    ],
    "niceToHave": [
      "Familiarity with Directory architectures (Active Directory, LDAP)",
      "Experience in security-focused cloud deployments"
    ],
    "benefits": [
      "Highly competitive salary scale with Okta stock programs",
      "Substantial training budget, internet allowance, and tech budget",
      "Modern, supportive hybrid office configurations"
    ],
    "aboutCompany": "Okta is the World’s Identity Company. We secure identity for enterprises and users globally.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 30,
    "title": "Developer Relations Lead",
    "company": "Google India",
    "companyLogo": "🤖",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹48L",
    "salaryMin": 3000000,
    "salaryMax": 4800000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "🤖",
    "skills": [
      "Technical Writing",
      "Public Speaking",
      "React",
      "Python",
      "Community Management"
    ],
    "experience": "Lead",
    "category": "Full Stack",
    "featured": true,
    "urgent": false,
    "tags": [
      "Google",
      "DevRel",
      "Bengaluru"
    ],
    "applicants": 88,
    "description": "Represent Google Cloud and Android developer ecosystems across India, establishing strong developer communities and speaking at tech summits.",
    "responsibilities": [
      "Coordinate developers summits, hackathons, and technical training events across India",
      "Publish high-impact documentation, technical tutorials, and sample repositories",
      "Gather and relay local developer friction points to central product divisions"
    ],
    "requirements": [
      "6+ years experience in developer relations, technical consulting, or software development",
      "Excellent public presentation skills and professional writing capabilities",
      "Solid programming proficiency in JavaScript, Python, or Go"
    ],
    "niceToHave": [
      "Active leadership role in a prominent open-source developer community",
      "Prior developer relations experience at a global tech firm"
    ],
    "benefits": [
      "Google standard competitive CTC, bonus, and GSU allocations",
      "World-class meals, health facilities, and hybrid working comforts",
      "Continuous learning allowances"
    ],
    "aboutCompany": "Google is a global technology leader focused on improving the ways people connect with information.",
    "externalUrl": "https://www.google.com/about/careers/applications/"
  },
  {
    "id": 31,
    "title": "Azure Cloud Operations Specialist",
    "company": "Microsoft India",
    "companyLogo": "💻",
    "location": "Noida, UP (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹28L",
    "salaryMin": 1800000,
    "salaryMax": 2800000,
    "posted": "1 week ago",
    "postedDays": 7,
    "logo": "💻",
    "skills": [
      "Microsoft Azure",
      "PowerShell",
      "ARM Templates",
      "Active Directory",
      "Monitoring"
    ],
    "experience": "Mid Level",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Microsoft",
      "Azure",
      "Noida"
    ],
    "applicants": 45,
    "description": "Ensure smooth operations, monitoring, and scaling of Microsoft’s internal enterprise cloud workloads and customer platform environments.",
    "responsibilities": [
      "Monitor and resolve Azure service alerts, virtual machine health, and network connectivity",
      "Automate resource deployments and system updates using PowerShell or ARM templates",
      "Coordinate with security teams to enforce identity policies via Active Directory"
    ],
    "requirements": [
      "3+ years in cloud operations, system administration, or IT support with focus on Azure",
      "Strong knowledge of Azure resource management, billing models, and network setups",
      "Proficiency writing scripts in PowerShell or Bash"
    ],
    "niceToHave": [
      "Microsoft Certified: Azure Administrator Associate (AZ-104)",
      "Basic understanding of Terraform or Terraform Enterprise configuration"
    ],
    "benefits": [
      "Highly competitive CTC package with performance incentives",
      "Microsoft RSU grant and employee stock purchase plan",
      "World-class medical, dental, and vision coverage"
    ],
    "aboutCompany": "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.",
    "externalUrl": "https://careers.microsoft.com/us/en/search-results"
  },
  {
    "id": 32,
    "title": "Solutions Architect (Startup Segment)",
    "company": "AWS (Amazon Web Services)",
    "companyLogo": "☁️",
    "location": "Hyderabad, Telangana (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹38L",
    "salaryMin": 2500000,
    "salaryMax": 3800000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "☁️",
    "skills": [
      "AWS Services",
      "Cloud Architecture",
      "Serverless",
      "Terraform",
      "Technical Consulting"
    ],
    "experience": "Mid Level",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "AWS",
      "Startups",
      "Architecture"
    ],
    "applicants": 33,
    "description": "Accelerate the growth of high-potential tech startups by architecting scalable, cost-effective, and robust cloud platforms on AWS.",
    "responsibilities": [
      "Conduct architecture review sessions (Well-Architected) for early-stage startup engineering teams",
      "Design modern serverless and containerized deployment templates",
      "Deliver hands-on technical presentations and product proof-of-concepts"
    ],
    "requirements": [
      "4+ years in software engineering, technical consulting, or systems architecture",
      "Deep technical knowledge of AWS core services (EC2, S3, RDS, ECS, Lambda)",
      "Exceptional stakeholder engagement and communication skills"
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect – Professional",
      "Prior experience working inside a fast-scaling tech startup"
    ],
    "benefits": [
      "Competitive base salary with Amazon restricted stock units (RSUs)",
      "Generous internet, wellness, and phone allowances",
      "Certification reimbursement and career advancement pathways"
    ],
    "aboutCompany": "Amazon Web Services provides on-demand cloud computing platforms and APIs to individuals, companies, and governments.",
    "externalUrl": "https://www.amazon.jobs/en/teams/amazon-web-services"
  },
  {
    "id": 33,
    "title": "Senior Hardware Systems Architect",
    "company": "Intel India",
    "companyLogo": "🟦",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹50L",
    "salaryMin": 3200000,
    "salaryMax": 5000000,
    "posted": "6 days ago",
    "postedDays": 6,
    "logo": "🟦",
    "skills": [
      "Verilog",
      "SystemVerilog",
      "ASIC Design",
      "SoC Architecture",
      "PCIE"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "Intel",
      "Hardware",
      "ASIC"
    ],
    "applicants": 14,
    "description": "Architect and design next-generation silicon substrates, System-on-Chip (SoC) logic layers, and high-bandwidth interconnect systems.",
    "responsibilities": [
      "Define specifications for silicon microarchitectures and SoC data paths",
      "Implement validation tests in SystemVerilog to verify bus protocol logic",
      "Coordinate hardware logic optimization with deep manufacturing teams"
    ],
    "requirements": [
      "6+ years in digital logic design, ASIC architecture, or silicon fabrication design",
      "Expertise in Verilog/SystemVerilog, bus architectures (PCIe, AXI), and CPU caching",
      "Bachelor’s/Master’s in Electrical or Electronics Engineering"
    ],
    "niceToHave": [
      "Experience with high-performance graphics cores or tensor units",
      "Familiarity with FPGA emulation environments"
    ],
    "benefits": [
      "Strong base CTC and annual performance-linked stock grants",
      "Premium medical protection plans and family support benefits",
      "Subsidized dining options and modern Bengaluru campus resources"
    ],
    "aboutCompany": "Intel is a global technology company that designs and manufactures silicon, processors, and server platforms.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 34,
    "title": "Embedded Firmware Engineer (5G Modems)",
    "company": "Qualcomm India",
    "companyLogo": "📱",
    "location": "Chennai, Tamil Nadu (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "5 days ago",
    "postedDays": 5,
    "logo": "📱",
    "skills": [
      "C",
      "C++",
      "RTOS",
      "Embedded Systems",
      "5G Protocols",
      "Microcontrollers"
    ],
    "experience": "Mid Level",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "Qualcomm",
      "Firmware",
      "RTOS"
    ],
    "applicants": 22,
    "description": "Design and implement low-level firmware, real-time operating system logic, and signal processing drivers for Qualcomm's world-leading 5G smartphone modems.",
    "responsibilities": [
      "Develop real-time signal processing firmware in C/C++ running on RTOS platforms",
      "Debug low-level register conflicts, interrupts, and memory leakage issues using JTAG",
      "Optimize network protocol processing and battery consumption on SoC hardware"
    ],
    "requirements": [
      "3+ years in embedded software development or firmware engineering",
      "Strong programming proficiency in C/C++ and real-time operating system concepts (FreeRTOS, VxWorks)",
      "Comprehension of cellular telecommunication standards (LTE, 5G NR)"
    ],
    "niceToHave": [
      "Experience working with Qualcomm chipset architectures (Hexagon DSP)",
      "Hands-on experience with hardware logic analyzers or RF testing gear"
    ],
    "benefits": [
      "Highly competitive salary and annual performance-linked cash bonuses",
      "Excellent family medical coverage and wellness credits",
      "Certification and education reimbursement opportunities"
    ],
    "aboutCompany": "Qualcomm is the world's leading wireless technology innovator and the driving force behind the development and launch of 5G.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 35,
    "title": "Senior Vision Processing Engineer",
    "company": "Samsung R&D",
    "companyLogo": "🌌",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹22L – ₹35L",
    "salaryMin": 2200000,
    "salaryMax": 3500000,
    "posted": "1 week ago",
    "postedDays": 7,
    "logo": "🌌",
    "skills": [
      "C++",
      "OpenCV",
      "Image Processing",
      "CUDA",
      "Camera ISP",
      "Android NDK"
    ],
    "experience": "Senior",
    "category": "AI/ML",
    "featured": false,
    "urgent": false,
    "tags": [
      "Samsung",
      "OpenCV",
      "Camera"
    ],
    "applicants": 29,
    "description": "Research and develop real-time image processing, computational photography, and vision algorithms for flagship Samsung mobile phone cameras.",
    "responsibilities": [
      "Design advanced low-light enhancement and noise-reduction algorithms using OpenCV and CUDA",
      "Optimize vision pipelines to run on mobile NPU/GPU platforms via Android NDK",
      "Collaborate with hardware sensor teams to design next-generation camera tuning pipelines"
    ],
    "requirements": [
      "5+ years dedicated to professional digital image processing, computer vision, or computer graphics",
      "Deep programming knowledge of C++ and GPU optimization frameworks (CUDA, OpenCL)",
      "Bachelor’s/Master’s degree in CS, Computer Engineering, or related fields"
    ],
    "niceToHave": [
      "Experience compiling machine learning models onto smartphone edge hardware",
      "Familiarity with camera ISP pipelines"
    ],
    "benefits": [
      "Highly competitive base salary and annual performance incentives",
      "Outstanding medical and family insurance setups",
      "Onsite campus amenities including food, sports, and recreation areas"
    ],
    "aboutCompany": "Samsung Electronics is a global leader in technology, opening new possibilities for people everywhere.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 36,
    "title": "Senior Frontend Architect",
    "company": "Zoho Corporation",
    "companyLogo": "⚙️",
    "location": "Chennai, Tamil Nadu (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹20L – ₹32L",
    "salaryMin": 2000000,
    "salaryMax": 3200000,
    "posted": "3 days ago",
    "postedDays": 3,
    "logo": "⚙️",
    "skills": [
      "Vanilla JavaScript",
      "HTML5",
      "CSS3",
      "Web Components",
      "Framework Design",
      "Security"
    ],
    "experience": "Senior",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Zoho",
      "JavaScript",
      "Architecture"
    ],
    "applicants": 42,
    "description": "Lead visual design systems, component framework structures, and secure client-side rendering paradigms across Zoho’s comprehensive B2B SaaS suite.",
    "responsibilities": [
      "Design lightweight, reusable client-side component libraries without relying on heavy external frameworks",
      "Analyze and optimize rendering speeds, DOM manipulations, and memory usage across Zoho Mail/CRM applications",
      "Implement strict client-side data validations and cross-site scripting (XSS) prevention models"
    ],
    "requirements": [
      "6+ years writing high-performance web applications using vanilla JavaScript",
      "Deep mastery of HTML5, CSS3, browser layout engines, and Web Components API",
      "Excellent engineering coordination and architecture skills"
    ],
    "niceToHave": [
      "Experience building in-house UI frameworks or rendering engines",
      "Prior public tech blogging or open-source community history"
    ],
    "benefits": [
      "Highly stable and competitive compensation structure with profit sharing packages",
      "Subsidized transport and organic farm-to-table food setups",
      "Excellent work-life balance and creative freedom"
    ],
    "aboutCompany": "Zoho is a global technology company providing business software, cloud services, and IT solutions.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 37,
    "title": "Customer Experience Product Manager",
    "company": "Freshworks",
    "companyLogo": "☘️",
    "location": "Chennai, Tamil Nadu (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹28L",
    "salaryMin": 1800000,
    "salaryMax": 2800000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "☘️",
    "skills": [
      "Product Roadmap",
      "Agile",
      "Jira",
      "UI/UX Research",
      "Customer Feedback",
      "Analytics"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Freshworks",
      "Product",
      "CRM"
    ],
    "applicants": 31,
    "description": "Drive feature discovery, product roadmaps, and agile sprint executions for Freshworks' global customer experience and helpdesk software platform.",
    "responsibilities": [
      "Author detailed product specification requirements and user story mappings",
      "Execute continuous customer discovery sessions and compile feedback pipelines",
      "Collaborate with designers and developers to ship intuitive self-service ticket options"
    ],
    "requirements": [
      "3+ years as a Product Manager in fast-scaling SaaS or consumer products",
      "Solid experience driving user research and translating analytics data into features",
      "Excellent communication and cross-functional leadership qualities"
    ],
    "niceToHave": [
      "Prior experience designing or engineering customer service ticketing software",
      "Basic knowledge of software development processes"
    ],
    "benefits": [
      "Competitive base salary, annual bonuses, and equity options",
      "Substantial training budget, internet allowance, and tech budget",
      "Outstanding medical and family insurance setups"
    ],
    "aboutCompany": "Freshworks makes business software people love. Our products are easy to set up, use, and scale.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 38,
    "title": "Senior Backend Engineer (Merchant API)",
    "company": "Razorpay",
    "companyLogo": "💳",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹22L – ₹35L",
    "salaryMin": 2200000,
    "salaryMax": 3500000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "💳",
    "skills": [
      "PHP",
      "Go",
      "MySQL",
      "Redis",
      "API Design",
      "Microservices"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": true,
    "urgent": true,
    "tags": [
      "Razorpay",
      "Go",
      "Fintech"
    ],
    "applicants": 51,
    "description": "Build, secure, and optimize backend payment processing APIs and transaction reconciliation engines processing billions of rupees in real-time.",
    "responsibilities": [
      "Write highly performance-optimized, secure Merchant APIs in Go and PHP",
      "Optimize database write-flows and caching structures during high-volume sale events",
      "Implement strict security and fraud-prevention rules across transaction execution pathways"
    ],
    "requirements": [
      "5+ years as a professional backend developer with expertise in Go, Java, or PHP",
      "Deep comprehension of relational database optimization, transactional integrity, and RESTful API standards",
      "Outstanding commitment to software security and bug-free execution"
    ],
    "niceToHave": [
      "Prior fintech experience designing double-entry systems or payment gateways",
      "Experience scaling high-velocity microservice platforms"
    ],
    "benefits": [
      "Highly competitive CTC package with performance incentives",
      "Comprehensive health insurance for self and family",
      "Subsidized physical fitness, transport, and remote equipment budgets"
    ],
    "aboutCompany": "Razorpay is India's leading converged payments and financial services platform for businesses.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 39,
    "title": "Senior iOS Engineer",
    "company": "CRED",
    "companyLogo": "💳",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹24L – ₹38L",
    "salaryMin": 2400000,
    "salaryMax": 3800000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "💳",
    "skills": [
      "Swift",
      "UIKit",
      "SwiftUI",
      "CoreAnimation",
      "iOS SDK",
      "System Architecture"
    ],
    "experience": "Senior",
    "category": "Mobile",
    "featured": false,
    "urgent": false,
    "tags": [
      "CRED",
      "SwiftUI",
      "Animation"
    ],
    "applicants": 39,
    "description": "Build and refine the premium visual layouts, customized components, and secure payment layers within the CRED mobile application.",
    "responsibilities": [
      "Write pixel-perfect, highly dynamic Swift layouts using SwiftUI and CoreAnimation frameworks",
      "Implement secure biometric logins, encrypted tokens, and robust background syncing services",
      "Ensure 99.9% crash-free sessions across all iOS configurations"
    ],
    "requirements": [
      "5+ years dedicated to professional iOS mobile application development using Swift",
      "Deep comprehension of complex UIKit design, visual custom layouts, and UI transitions",
      "Outstanding track record publishing high-growth apps in Apple App Store"
    ],
    "niceToHave": [
      "Prior history building high-end graphics, interactive animations, or mobile game layouts",
      "Experience with modular and clean framework architecture design"
    ],
    "benefits": [
      "Top-of-market base salary and performance incentives with CRED coins/equity",
      "Substantial training budget and high-end remote workspace tools",
      "Comprehensive healthcare for family members"
    ],
    "aboutCompany": "CRED is an exclusive members-only club that rewards individuals for their high credit score.",
    "externalUrl": "https://cred.club/careers"
  },
  {
    "id": 40,
    "title": "Machine Learning Engineer (Recommendation Systems)",
    "company": "Flipkart",
    "companyLogo": "🛍️",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹22L – ₹35L",
    "salaryMin": 2200000,
    "salaryMax": 3500000,
    "posted": "3 days ago",
    "postedDays": 3,
    "logo": "🛍️",
    "skills": [
      "Python",
      "Scala",
      "TensorFlow",
      "PySpark",
      "RecSys",
      "A/B Testing"
    ],
    "experience": "Mid Level",
    "category": "AI/ML",
    "featured": false,
    "urgent": false,
    "tags": [
      "Flipkart",
      "Recommendation",
      "TensorFlow"
    ],
    "applicants": 43,
    "description": "Design, optimize, and evaluate collaborative filtering, personalized rankers, and semantic search algorithms powering India’s largest e-commerce platform.",
    "responsibilities": [
      "Train deep retrieval and recommender models on massive consumer interaction catalogs",
      "Manage real-time predictive models running on Kubernetes clusters at high scale",
      "Execute continuous offline model evaluation and online client A/B testing"
    ],
    "requirements": [
      "3+ years as a professional machine learning engineer or data scientist",
      "Deep knowledge of matrix factorization, deep recommenders, and statistics",
      "Proficiency writing production-grade scripts in Python, Scala, or SQL"
    ],
    "niceToHave": [
      "Experience building search ranking systems",
      "Familiarity with PyTorch or JAX deep learning compilers"
    ],
    "benefits": [
      "Highly competitive CTC package with performance incentives",
      "World-class medical, dental, and vision coverage",
      "Subsidized physical fitness, transport, and remote equipment budgets"
    ],
    "aboutCompany": "Flipkart is India's leading e-commerce marketplace, making online shopping accessible to millions.",
    "externalUrl": "https://careers.flipkart.com/"
  },
  {
    "id": 41,
    "title": "Senior Cybersecurity Specialist",
    "company": "Paytm",
    "companyLogo": "📱",
    "location": "Noida, UP (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹22L – ₹34L",
    "salaryMin": 2200000,
    "salaryMax": 3400000,
    "posted": "6 days ago",
    "postedDays": 6,
    "logo": "📱",
    "skills": [
      "Penetration Testing",
      "SIEM",
      "PCI-DSS",
      "OWASP Top 10",
      "Python",
      "Incident Response"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Paytm",
      "Security",
      "PCI-DSS"
    ],
    "applicants": 17,
    "description": "Enforce strict security, compliance, and cyber defence layers across Paytm’s consumer payment wallets and merchant platforms.",
    "responsibilities": [
      "Perform regular application penetration testing and secure code assessments (SAST/DAST)",
      "Monitor and investigate network security alerts using SIEM and firewall analysis models",
      "Ensure absolute PCI-DSS, ISO27001, and regulatory compliance standards"
    ],
    "requirements": [
      "5+ years dedicated to cybersecurity, security analysis, or application security auditing",
      "Deep knowledge of payment network security standards, cryptography, and OWASP guides",
      "Proficient coding capacity in Python, Bash, or Go"
    ],
    "niceToHave": [
      "CEH, OSCP, or equivalent cyber security certifications",
      "Familiarity with financial API security and Zero Trust environments"
    ],
    "benefits": [
      "Highly competitive salary scale with Paytm stock options",
      "Top-tier wellness credits and multi-tier health insurance coverages",
      "Certification and education reimbursement opportunities"
    ],
    "aboutCompany": "Paytm is India's leading mobile payments and financial services platform.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 42,
    "title": "Lead Cloud Consultant",
    "company": "TCS",
    "companyLogo": "⚙️",
    "location": "Mumbai, Maharashtra (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹15L – ₹24L",
    "salaryMin": 1500000,
    "salaryMax": 2400000,
    "posted": "1 week ago",
    "postedDays": 7,
    "logo": "⚙️",
    "skills": [
      "AWS",
      "Azure",
      "Cloud Migration",
      "Enterprise Architecture",
      "Terraform",
      "Pre-Sales"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "TCS",
      "Consulting",
      "Migration"
    ],
    "applicants": 28,
    "description": "Provide architectural, technical, and migration consulting for TCS' global Fortune 500 enterprise clients moving to AWS and Azure environments.",
    "responsibilities": [
      "Author robust enterprise cloud migration roadmap assessments and cost analyses",
      "Design multi-tenant cloud networks, landing zones, and security baselines",
      "Present technical pitches and solutions to corporate executive leaders (C-Suite)"
    ],
    "requirements": [
      "7+ years in IT infrastructure with 3+ years specifically in Cloud Architectures or consulting",
      "Broad knowledge of both AWS and Microsoft Azure services and migration pathways",
      "Exceptional customer engagement and presentation capabilities"
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect – Professional or Azure Solutions Architect Expert",
      "Familiarity with hybrid cloud designs (Azure Stack, Outposts)"
    ],
    "benefits": [
      "Highly stable and competitive compensation structure with performance bonuses",
      "Comprehensive family medical coverage and health programs",
      "Access to TCS' extensive global learning and development university"
    ],
    "aboutCompany": "Tata Consultancy Services is a global leader in IT services, consulting, and business solutions.",
    "externalUrl": "https://www.tcs.com/careers"
  },
  {
    "id": 43,
    "title": "Senior Enterprise Architect (Java/Spring)",
    "company": "Infosys",
    "companyLogo": "ℹ️",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹25L",
    "salaryMin": 1600000,
    "salaryMax": 2500000,
    "posted": "5 days ago",
    "postedDays": 5,
    "logo": "ℹ️",
    "skills": [
      "Java",
      "Spring Boot",
      "Hibernate",
      "Microservices",
      "Oracle DB",
      "Design Patterns"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "Infosys",
      "Java",
      "Spring"
    ],
    "applicants": 36,
    "description": "Design robust, highly scalable microservices, relational database mappings, and messaging pipelines for large-scale enterprise financial platforms.",
    "responsibilities": [
      "Write highly maintainable, secure microservice architectures using Java and Spring Boot",
      "Design complex relational database schemas, index strategies, and caching layers",
      "Mentor senior engineers, review pull requests, and enforce clean coding conventions"
    ],
    "requirements": [
      "6+ years writing high-performance enterprise systems in Java/J2EE environments",
      "Deep mastery of Spring Boot, Hibernate, relational databases, and enterprise design patterns",
      "Excellent software architecture and class diagram creation skills"
    ],
    "niceToHave": [
      "Experience migrating legacy monolith systems to modern microservices",
      "Basic understanding of Docker or Kubernetes deployments"
    ],
    "benefits": [
      "Competitive base CTC with performance bonuses",
      "Comprehensive family medical coverage and health programs",
      "Paid volunteer leaves and global learning budgets"
    ],
    "aboutCompany": "Infosys is a global leader in next-generation digital services and consulting.",
    "externalUrl": "https://www.infosys.com/careers.html"
  },
  {
    "id": 44,
    "title": "Full Stack Engineer (Node.js/React)",
    "company": "Wipro",
    "companyLogo": "⚙️",
    "location": "Pune, Maharashtra (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹10L – ₹16L",
    "salaryMin": 1000000,
    "salaryMax": 1600000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "⚙️",
    "skills": [
      "Node.js",
      "React",
      "JavaScript",
      "Express",
      "MongoDB",
      "REST APIs"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Wipro",
      "React",
      "Node"
    ],
    "applicants": 61,
    "description": "Develop responsive user interfaces, backend API routes, and database models for high-impact commercial client systems.",
    "responsibilities": [
      "Build responsive front-end dashboards in React and TypeScript",
      "Develop secure, authenticated REST API routes in Node.js and Express",
      "Implement data modeling and indexing using MongoDB databases"
    ],
    "requirements": [
      "3+ years as a full-stack developer with professional competency in React/Node.js",
      "Solid programming experience in JavaScript, HTML5, and CSS3 layouts",
      "Understanding of git, version control, and basic DevOps processes"
    ],
    "niceToHave": [
      "Familiarity with SQL databases (MySQL, PostgreSQL)",
      "Experience writing unit tests using Jest or Mocha"
    ],
    "benefits": [
      "Competitive base salary, annual bonuses, and wellness perks",
      "Outstanding medical and family insurance setups",
      "Certification and education reimbursement opportunities"
    ],
    "aboutCompany": "Wipro is a leading technology services and consulting company focused on building innovative solutions.",
    "externalUrl": "https://careers.wipro.com/global-careers"
  },
  {
    "id": 45,
    "title": "DevOps Engineer (Kubernetes)",
    "company": "HCLTech",
    "companyLogo": "⚙️",
    "location": "Noida, UP (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹12L – ₹18L",
    "salaryMin": 1200000,
    "salaryMax": 1800000,
    "posted": "3 days ago",
    "postedDays": 3,
    "logo": "⚙️",
    "skills": [
      "Kubernetes",
      "Docker",
      "Jenkins",
      "Terraform",
      "Linux",
      "AWS"
    ],
    "experience": "Mid Level",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "HCLTech",
      "Kubernetes",
      "DevOps"
    ],
    "applicants": 47,
    "description": "Establish, automate, and monitor CI/CD pipelines, container cluster scaling configurations, and infrastructure assets.",
    "responsibilities": [
      "Manage production-grade Kubernetes clusters, resource limits, and ingress configs",
      "Build robust Jenkins/GitLab CI pipeline scripts automating application testing and deployments",
      "Deploy and coordinate cloud infrastructure modules using Terraform"
    ],
    "requirements": [
      "3+ years in DevOps or systems engineering with a focus on Kubernetes clustering",
      "Strong scripting capability in Python, Bash, or Go",
      "Deep knowledge of Linux operating systems and AWS/Azure cloud foundations"
    ],
    "niceToHave": [
      "Certified Kubernetes Administrator (CKA)",
      "Basic understanding of Prometheus/Grafana monitoring alerts"
    ],
    "benefits": [
      "Highly competitive CTC package with performance incentives",
      "Comprehensive family medical coverage and health programs",
      "Continuous learning and certification subsidies"
    ],
    "aboutCompany": "HCLTech is a global technology company, home to 220,000+ people across 60 countries.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 46,
    "title": "Telecom Network Specialist",
    "company": "Tech Mahindra",
    "companyLogo": "⚙️",
    "location": "Pune, Maharashtra (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹14L – ₹22L",
    "salaryMin": 1400000,
    "salaryMax": 2200000,
    "posted": "1 week ago",
    "postedDays": 7,
    "logo": "⚙️",
    "skills": [
      "5G Protocols",
      "NFV",
      "OpenRAN",
      "Cisco Network",
      "SIP",
      "Linux"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "TechM",
      "Telecom",
      "5G"
    ],
    "applicants": 15,
    "description": "Deploy, configure, and troubleshoot virtualized telecom network cores, OpenRAN configurations, and 5G cellular communication channels.",
    "responsibilities": [
      "Implement network functions virtualization (NFV) frameworks in OpenStack and Kubernetes",
      "Troubleshoot network routing, latency, and SIP signal dropped calls in real-time",
      "Collaborate with international telecom operators to validate modem and base-station firmware"
    ],
    "requirements": [
      "5+ years dedicated to telecom engineering, network virtualization, or routing environments",
      "Deep understanding of 4G/5G core protocols, signaling pathways, and OpenRAN frameworks",
      "Cisco CCNA/CCNP or related network certifications"
    ],
    "niceToHave": [
      "Experience working inside major cellular carrier cores",
      "Familiarity with software-defined networking (SDN) configurations"
    ],
    "benefits": [
      "Competitive base CTC with performance bonuses",
      "World-class training academy and network lab environments",
      "Substantial training budget and continuous study funding allocations"
    ],
    "aboutCompany": "Tech Mahindra offers innovative and customer-centric digital experiences, enabling enterprises to Rise.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 47,
    "title": "Senior Database Systems Engineer",
    "company": "Oracle India",
    "companyLogo": "🅾️",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹24L – ₹38L",
    "salaryMin": 2400000,
    "salaryMax": 3800000,
    "posted": "5 days ago",
    "postedDays": 5,
    "logo": "🅾️",
    "skills": [
      "C",
      "C++",
      "SQL",
      "Oracle DB",
      "Query Optimizer",
      "Operating Systems"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "Oracle",
      "Database",
      "C++"
    ],
    "applicants": 22,
    "description": "Design and optimize core relational storage engines, transaction recovery pipelines, and query execution optimizations in Oracle DB.",
    "responsibilities": [
      "Write highly performance-optimized, secure C++ code for relational engines",
      "Design query cost algorithms and semantic analysis layers in query parsers",
      "Debug and resolve low-level concurrency, resource deadlock, and memory bugs"
    ],
    "requirements": [
      "5+ years writing low-level systems code in C/C++ in multi-threaded environments",
      "Deep comprehension of B-Trees, transaction logs, locking schemes, and relational theory",
      "Master’s or Bachelor’s in CS or Computer Engineering"
    ],
    "niceToHave": [
      "Active contributor to open-source database engines (Postgres, MySQL)",
      "Experience designing query languages or compiler engines"
    ],
    "benefits": [
      "Highly competitive base CTC, stock awards, and performance incentives",
      "Premium medical protection plans and family support benefits",
      "Modern campus cafeteria and gym resources"
    ],
    "aboutCompany": "Oracle is a cloud technology company that provides organizations around the world with computing infrastructure.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 48,
    "title": "Cloud Security Engineer (Duo)",
    "company": "Cisco",
    "companyLogo": "🔵",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹22L – ₹35L",
    "salaryMin": 2200000,
    "salaryMax": 3500000,
    "posted": "2 days ago",
    "postedDays": 2,
    "logo": "🔵",
    "skills": [
      "Python",
      "AWS Security",
      "Cryptography",
      "SIEM",
      "Penetration Testing",
      "SAML"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": true,
    "tags": [
      "Cisco",
      "Duo",
      "Security"
    ],
    "applicants": 31,
    "description": "Ensure the absolute safety, encryption standards, and threat prevention layers for Cisco Duo’s global multi-factor authentication (MFA) client surfaces.",
    "responsibilities": [
      "Lead secure protocol implementations (SAML, WebAuthn, OAuth) for Duo authentication servers",
      "Write custom security scan scripts in Python inspecting AWS cloud configs",
      "Respond to and remediate application layer security incidents and microservice exploits"
    ],
    "requirements": [
      "5+ years dedicated to cybersecurity, incident response, or secure coding frameworks",
      "Strong expertise in threat modeling, SAML/OIDC federated security, and AWS security modules",
      "Proficient coding capacity in Python, Go, or Ruby"
    ],
    "niceToHave": [
      "OSCP, CISSP, or equivalent certifications",
      "Prior history hunting authentication bugs in public bug bounty platforms"
    ],
    "benefits": [
      "Highly competitive CTC package with performance incentives and stock options",
      "World-class family healthcare insurance packages",
      "Substantial training budget, certification reimbursements"
    ],
    "aboutCompany": "Cisco is the global leader in networking, security, and unified collaboration solutions.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 49,
    "title": "Senior Backend Engineer (MuleSoft Core)",
    "company": "Salesforce",
    "companyLogo": "☁️",
    "location": "Hyderabad, Telangana (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹38L",
    "salaryMin": 2500000,
    "salaryMax": 3800000,
    "posted": "6 days ago",
    "postedDays": 6,
    "logo": "☁️",
    "skills": [
      "Java",
      "Spring Boot",
      "MuleSoft",
      "Integration APIs",
      "SQL",
      "Kubernetes"
    ],
    "experience": "Senior",
    "category": "Backend",
    "featured": false,
    "urgent": false,
    "tags": [
      "Salesforce",
      "MuleSoft",
      "Java"
    ],
    "applicants": 27,
    "description": "Develop high-performance data integration engines, API management networks, and transactional synchronization channels inside Salesforce MuleSoft.",
    "responsibilities": [
      "Write highly maintainable, secure microservice architectures using Java and Spring Boot",
      "Design complex integration pipelines and relational database connectors",
      "Profile and optimize thread pooling, garbage collection, and JVM resource limits"
    ],
    "requirements": [
      "5+ years writing high-performance enterprise systems in Java/J2EE environments",
      "Deep knowledge of MuleSoft, API gateway design, and relational databases",
      "Bachelor’s in CS or equivalent field"
    ],
    "niceToHave": [
      "MuleSoft Certified Developer or Architect",
      "Basic understanding of Docker or Kubernetes deployments"
    ],
    "benefits": [
      "Highly competitive base CTC, stock awards, and performance incentives",
      "Excellent flexible allowances for home setup, wellness, and internet needs",
      "Paid volunteer leaves and global learning budgets"
    ],
    "aboutCompany": "Salesforce is the global leader in Customer Relationship Management (CRM) and cloud-based business solutions.",
    "externalUrl": "https://careerdream.in/jobs/apply-direct"
  },
  {
    "id": 50,
    "title": "Machine Learning Research Scientist",
    "company": "Adobe India",
    "companyLogo": "🅰️",
    "location": "Noida, UP (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹48L",
    "salaryMin": 3000000,
    "salaryMax": 4800000,
    "posted": "4 days ago",
    "postedDays": 4,
    "logo": "🅰️",
    "skills": [
      "Python",
      "PyTorch",
      "Generative Models",
      "Computer Vision",
      "Diffusion Models",
      "Mathematics"
    ],
    "experience": "Senior",
    "category": "AI/ML",
    "featured": true,
    "urgent": false,
    "tags": [
      "Adobe",
      "Research",
      "Diffusion"
    ],
    "applicants": 34,
    "description": "Pioneer next-generation generative AI, text-to-image/video diffusion models, and advanced neural rendering techniques for Adobe Photoshop and Premiere.",
    "responsibilities": [
      "Train, optimize, and evaluate state-of-the-art image diffusion and generative vision models",
      "Publish high-impact research papers at top-tier forums (CVPR, ICCV, SIGGRAPH)",
      "Collaborate with product teams to transition research prototypes into production Creative Cloud tools"
    ],
    "requirements": [
      "Master’s or PhD in Computer Science, Computer Vision, or Deep Learning research",
      "Proven record publishing at Top-Tier AI/Graphics conferences (CVPR, SIGGRAPH, NeurIPS)",
      "Exceptional python and PyTorch coding capabilities with strong foundations in linear algebra"
    ],
    "niceToHave": [
      "Contributions to open-source deep learning compilers or frameworks",
      "Experience with custom CUDA kernel optimization"
    ],
    "benefits": [
      "Highly competitive base CTC, stock awards, and performance incentives",
      "Continuous learning and conference budgets",
      "Premium medical protection plans and family support benefits"
    ],
    "aboutCompany": "Adobe is the global leader in digital media and digital marketing solutions.",
    "externalUrl": "https://adobe.wd5.myworkdayjobs.com/external_careers"
  },
  {
    "id": 51,
    "title": "Senior Frontend Architect (React & Tailwind)",
    "company": "LinkedIn India",
    "companyLogo": "🔗",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹28L – ₹45L",
    "salaryMin": 2800000,
    "salaryMax": 4500000,
    "posted": "2 hours ago (Scraped from LinkedIn)",
    "postedDays": 0,
    "logo": "🔗",
    "skills": [
      "React",
      "TypeScript",
      "TailwindCSS",
      "Web Performance",
      "Micro-Frontends"
    ],
    "experience": "Senior",
    "category": "Full-Stack",
    "featured": true,
    "urgent": true,
    "tags": [
      "LinkedIn",
      "Frontend",
      "Bengaluru"
    ],
    "applicants": 8,
    "description": "Lead the design, standardization, and architectural roadmap of premium responsive micro-frontends powering LinkedIn's enterprise talent systems in India.",
    "responsibilities": [
      "Design high-performance modular frontend components using React and TailwindCSS",
      "Improve web performance metrics and Core Web Vitals across core product areas",
      "Mentor mid-level frontend engineers and coordinate with product/design teams"
    ],
    "requirements": [
      "6+ years of specialized experience building complex React-based web applications at scale",
      "Deep understanding of TypeScript, module federation, and modern bundlers (Vite/Webpack)",
      "Strong design aesthetics and eye for accessibility (WCAG) compliance"
    ],
    "niceToHave": [
      "Prior experience building design systems or white-label UI libraries",
      "Active open-source contributions to React or Tailwind ecosystems"
    ],
    "benefits": [
      "World-class compensation package and performance bonuses",
      "Restricted Stock Units (RSUs) and wellness subsidies",
      "Flexible hybrid workplace with premium health and dental insurance"
    ],
    "aboutCompany": "LinkedIn is the world's largest professional network, connecting professionals all over the globe.",
    "externalUrl": "https://www.linkedin.com/jobs/"
  },
  {
    "id": 52,
    "title": "Autopilot Software Engineer (C++ & Computer Vision)",
    "company": "Tesla India",
    "companyLogo": "⚡",
    "location": "Pune, Maharashtra (On-site)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹40L – ₹65L",
    "salaryMin": 4000000,
    "salaryMax": 6500000,
    "posted": "1 day ago (Scraped from LinkedIn)",
    "postedDays": 1,
    "logo": "⚡",
    "skills": [
      "C++",
      "Python",
      "Computer Vision",
      "CUDA",
      "Real-time Systems",
      "PyTorch"
    ],
    "experience": "Mid-Senior",
    "category": "AI/ML",
    "featured": true,
    "urgent": true,
    "tags": [
      "Tesla",
      "Autopilot",
      "Pune"
    ],
    "applicants": 45,
    "description": "Develop ultra-low latency real-time neural network inference systems and vision processing pipelines running locally on Tesla's Autopilot hardware.",
    "responsibilities": [
      "Implement efficient deep learning operators and layers in C++ and CUDA",
      "Analyze and optimize CPU/GPU/NPU memory bandwidth and computational bottlenecks",
      "Deliver highly reliable software modules under rigorous safety standards (ISO 26262)"
    ],
    "requirements": [
      "4+ years of robust modern C++ development experience (C++17/20)",
      "Solid understanding of low-level optimization, memory models, and cache utilization",
      "Hands-on experience deploying computer vision models on edge devices"
    ],
    "niceToHave": [
      "Experience writing custom CUDA/TensorRT kernels",
      "Strong foundation in robotics, kinematics, or sensor fusion algorithms"
    ],
    "benefits": [
      "Outstanding base salary plus performance-linked equity options",
      "Relocation support and premium health coverage",
      "Direct access to advanced hardware platforms and global training bootcamps"
    ],
    "aboutCompany": "Tesla is accelerating the world's transition to sustainable energy through electric vehicles, solar power, and clean energy integrations.",
    "externalUrl": "https://www.tesla.com/careers/"
  },
  {
    "id": 53,
    "title": "Cloud Infrastructure Architect",
    "company": "Zomato",
    "companyLogo": "❤️",
    "location": "Gurugram, Haryana (On-site)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "12 hours ago (Scraped from LinkedIn)",
    "postedDays": 0,
    "logo": "❤️",
    "skills": [
      "Kubernetes",
      "AWS",
      "Terraform",
      "Go",
      "Prometheus",
      "Chaos Engineering"
    ],
    "experience": "Senior",
    "category": "Cloud",
    "featured": true,
    "urgent": false,
    "tags": [
      "Zomato",
      "DevOps",
      "Gurugram"
    ],
    "applicants": 19,
    "description": "Architect, scale, and secure high-availability Kubernetes clusters handling millions of requests per minute during peak food delivery hours.",
    "responsibilities": [
      "Design and implement self-healing cloud infrastructure platforms using Terraform and Kubernetes",
      "Develop automated capacity planning and real-time auto-scaling mechanisms",
      "Conduct chaos engineering simulations to improve system disaster tolerance"
    ],
    "requirements": [
      "5+ years of production experience managing multi-region Kubernetes deployments",
      "Strong programming skills in Go or Python for building custom operator extensions",
      "Proficiency in Prometheus, Grafana, and distributed tracing systems (Jaeger)"
    ],
    "niceToHave": [
      "Experience running micro-frontends and API gateways (Envoy/Kong) under extreme load",
      "Active CKAD or CKA certifications"
    ],
    "benefits": [
      "Competitive cash CTC and generous performance bonuses",
      "Subsidized food, health cover, and modern, open collaborative workspaces",
      "Paid leaves and wellness assistance programs"
    ],
    "aboutCompany": "Zomato is a technology platform connecting customers, restaurant partners, and delivery partners, serving users across multiple nations.",
    "externalUrl": "https://www.zomato.com/careers"
  },
  {
    "id": 54,
    "title": "Lead Mobile Engineer (React Native & Performance)",
    "company": "Swiggy",
    "companyLogo": "🍔",
    "location": "Bengaluru, Karnataka (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹26L – ₹44L",
    "salaryMin": 2600000,
    "salaryMax": 4400000,
    "posted": "3 hours ago (Scraped from LinkedIn)",
    "postedDays": 0,
    "logo": "🍔",
    "skills": [
      "React Native",
      "TypeScript",
      "iOS",
      "Android",
      "Mobile Performance",
      "GraphQL"
    ],
    "experience": "Senior",
    "category": "Mobile",
    "featured": true,
    "urgent": true,
    "tags": [
      "Swiggy",
      "Mobile",
      "Bengaluru"
    ],
    "applicants": 15,
    "description": "Own the modular app architecture, render performance, and dynamic feature delivery workflows for Swiggy's consumer application.",
    "responsibilities": [
      "Optimize startup latency and bridge-less execution inside Swiggy's React Native app",
      "Author high-performance native modules in Swift/Objective-C and Kotlin/Java",
      "Establish rigid testing standards for memory consumption and battery efficiency"
    ],
    "requirements": [
      "6+ years of mobile software engineering with 3+ years focused on React Native",
      "Deep insights into native mobile lifecycles, memory layout, and app profiling tools",
      "Excellent typescript coding capabilities with a passion for robust type safety"
    ],
    "niceToHave": [
      "Experience deploying React Native Hermés engine or new architecture (JSI/Fabric)",
      "Familiarity with CI/CD tools like Fastlane and App Center"
    ],
    "benefits": [
      "Premium base pay plus stock options (ESOPs)",
      "Comprehensive health and personal accident coverage",
      "Dynamic learning environment with industry mentors"
    ],
    "aboutCompany": "Swiggy is India's leading on-demand convenience platform, delivering food, groceries, and instant packages to millions.",
    "externalUrl": "https://careers.swiggy.com/"
  },
  {
    "id": 55,
    "title": "Staff Security Engineer (Cloud DevSecOps)",
    "company": "PhonePe",
    "companyLogo": "💜",
    "location": "Bengaluru, Karnataka (On-site)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹52L",
    "salaryMin": 3500000,
    "salaryMax": 5200000,
    "posted": "1 day ago (Scraped from LinkedIn)",
    "postedDays": 1,
    "logo": "💜",
    "skills": [
      "Cloud Security",
      "Kubernetes Security",
      "IAM",
      "Go",
      "Penetration Testing",
      "SecOps"
    ],
    "experience": "Staff",
    "category": "Security",
    "featured": true,
    "urgent": false,
    "tags": [
      "PhonePe",
      "Security",
      "Fintech"
    ],
    "applicants": 7,
    "description": "Enforce advanced cloud infrastructure guardrails, secure Kubernetes workloads, and oversee DevSecOps integrations for a highly critical fintech payment engine.",
    "responsibilities": [
      "Design and implement fine-grained IAM policies and zero-trust mesh architectures",
      "Build custom automated static/dynamic scanning hooks into standard CI/CD pipelines",
      "Triage vulnerability findings, lead incident responses, and run threat modeling reviews"
    ],
    "requirements": [
      "7+ years in professional security engineering, with a solid focus on cloud systems security",
      "Hands-on expertise securing multi-tenant Kubernetes and container environments",
      "Fluent programming in Go, Python, or bash for automated compliance controls"
    ],
    "niceToHave": [
      "Recognized security certifications like OSCP, CCSP, or CKA-Security",
      "Experience working in highly regulated industries (PCI-DSS / RBI compliance)"
    ],
    "benefits": [
      "Top-tier base compensation and lucrative variable components",
      "Substantial employee stock options plan (ESOPs)",
      "Premium healthcare protection plans and family support systems"
    ],
    "aboutCompany": "PhonePe is India's leading digital payments and financial services platform, catering to over 500 million registered users.",
    "externalUrl": "https://www.phonepe.com/careers/"
  }
];

export function getJobById(id: number): Job | undefined {
  return jobs.find(j => j.id === id);
}

export function getJobsByCategory(category: string): Job[] {
  if (category === 'All') return jobs;
  if (category === 'Remote') return jobs.filter(j => j.type === 'Remote');
  if (category === 'Government') return jobs.filter(j => j.type === 'Government');
  if (category === 'Abroad') return jobs.filter(j => j.type === 'Abroad');
  if (category === 'Contract') return jobs.filter(j => j.type === 'Contract');
  return jobs.filter(j => j.category === category);
}
