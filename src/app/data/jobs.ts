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
    "title": "Google Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "Google",
    "companyLogo": "🤖",
    "location": "Bengaluru, India (Hybrid)",
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
      "Google"
    ],
    "applicants": 32,
    "description": "Join the team at Google as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "Google is a leading organization in the Hyperscale & AI sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.google.com/"
  },
  {
    "id": 2,
    "title": "Microsoft Senior MLOps Engineer",
    "company": "Microsoft",
    "companyLogo": "💻",
    "location": "Bengaluru, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💻",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": true,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Microsoft"
    ],
    "applicants": 26,
    "description": "Join the team at Microsoft as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Microsoft is a leading organization in the Hyperscale & Cloud sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.microsoft.com/"
  },
  {
    "id": 3,
    "title": "AWS (Amazon Web Services) Full Stack Developer (React & Node.js)",
    "company": "AWS (Amazon Web Services)",
    "companyLogo": "☁️",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "☁️",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": true,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Full Stack",
      "AWS (Amazon Web Services)"
    ],
    "applicants": 8,
    "description": "Join the team at AWS (Amazon Web Services) as a Full Stack Developer (React & Node.js). Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "AWS (Amazon Web Services) is a leading organization in the Hyperscale & Cloud sector, committed to driving innovation globally.",
    "externalUrl": "https://www.amazon.jobs/en/teams/amazon-web-services"
  },
  {
    "id": 4,
    "title": "Meta Cloud Architect (AWS / Azure Solutions)",
    "company": "Meta",
    "companyLogo": "👁️",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "👁️",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": true,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "Meta"
    ],
    "applicants": 29,
    "description": "Join the team at Meta as a Cloud Architect (AWS / Azure Solutions). Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "Meta is a leading organization in the Social Media & AI sector, committed to driving innovation globally.",
    "externalUrl": "https://www.metacareers.com/"
  },
  {
    "id": 5,
    "title": "Apple Senior Cybersecurity Engineer",
    "company": "Apple",
    "companyLogo": "🍎",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🍎",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": true,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Cybersecurity",
      "Apple"
    ],
    "applicants": 15,
    "description": "Join the team at Apple as a Senior Cybersecurity Engineer. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "Apple is a leading organization in the Consumer Tech & Hardware sector, committed to driving innovation globally.",
    "externalUrl": "https://www.apple.com/careers/"
  },
  {
    "id": 6,
    "title": "Netflix Data Scientist (Analytics & Forecasting)",
    "company": "Netflix",
    "companyLogo": "🍿",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🍿",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Data Science",
      "Netflix"
    ],
    "applicants": 22,
    "description": "Join the team at Netflix as a Data Scientist (Analytics & Forecasting). Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "Netflix is a leading organization in the Streaming & Infrastructure sector, committed to driving innovation globally.",
    "externalUrl": "https://jobs.netflix.com/"
  },
  {
    "id": 7,
    "title": "TCS (Tata Consultancy Services) Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "TCS (Tata Consultancy Services)",
    "companyLogo": "🏢",
    "location": "Bengaluru, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
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
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "AI/ML",
      "TCS (Tata Consultancy Services)"
    ],
    "applicants": 18,
    "description": "Join the team at TCS (Tata Consultancy Services) as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "TCS (Tata Consultancy Services) is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://www.tcs.com/careers"
  },
  {
    "id": 8,
    "title": "Infosys Senior MLOps Engineer",
    "company": "Infosys",
    "companyLogo": "🏢",
    "location": "Bengaluru, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Infosys"
    ],
    "applicants": 22,
    "description": "Join the team at Infosys as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Infosys is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://www.infosys.com/careers.html"
  },
  {
    "id": 9,
    "title": "Wipro Full Stack Developer (React & Node.js)",
    "company": "Wipro",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Full Stack",
      "Wipro"
    ],
    "applicants": 27,
    "description": "Join the team at Wipro as a Full Stack Developer (React & Node.js). Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "Wipro is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.wipro.com/"
  },
  {
    "id": 10,
    "title": "HCLTech Cloud Architect (AWS / Azure Solutions)",
    "company": "HCLTech",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "HCLTech"
    ],
    "applicants": 17,
    "description": "Join the team at HCLTech as a Cloud Architect (AWS / Azure Solutions). Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "HCLTech is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://www.hcltech.com/careers"
  },
  {
    "id": 11,
    "title": "Cognizant Senior Cybersecurity Engineer",
    "company": "Cognizant",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cybersecurity",
      "Cognizant"
    ],
    "applicants": 34,
    "description": "Join the team at Cognizant as a Senior Cybersecurity Engineer. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "Cognizant is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.cognizant.com/"
  },
  {
    "id": 12,
    "title": "Tech Mahindra Data Scientist (Analytics & Forecasting)",
    "company": "Tech Mahindra",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Data Science",
      "Tech Mahindra"
    ],
    "applicants": 14,
    "description": "Join the team at Tech Mahindra as a Data Scientist (Analytics & Forecasting). Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "Tech Mahindra is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.techmahindra.com/"
  },
  {
    "id": 13,
    "title": "LTIMindtree Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "LTIMindtree",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
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
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "AI/ML",
      "LTIMindtree"
    ],
    "applicants": 30,
    "description": "Join the team at LTIMindtree as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "LTIMindtree is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://www.ltimindtree.com/careers/"
  },
  {
    "id": 14,
    "title": "Swiggy Senior MLOps Engineer",
    "company": "Swiggy",
    "companyLogo": "🍔",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🍔",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Swiggy"
    ],
    "applicants": 21,
    "description": "Join the team at Swiggy as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Swiggy is a leading organization in the On-Demand Delivery sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.swiggy.com/"
  },
  {
    "id": 15,
    "title": "Zomato Full Stack Developer (React & Node.js)",
    "company": "Zomato",
    "companyLogo": "🍕",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🍕",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Full Stack",
      "Zomato"
    ],
    "applicants": 12,
    "description": "Join the team at Zomato as a Full Stack Developer (React & Node.js). Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "Zomato is a leading organization in the On-Demand Delivery sector, committed to driving innovation globally.",
    "externalUrl": "https://www.zomato.com/careers"
  },
  {
    "id": 16,
    "title": "PhonePe Cloud Architect (AWS / Azure Solutions)",
    "company": "PhonePe",
    "companyLogo": "💳",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💳",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "PhonePe"
    ],
    "applicants": 33,
    "description": "Join the team at PhonePe as a Cloud Architect (AWS / Azure Solutions). Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "PhonePe is a leading organization in the Fintech & Payments sector, committed to driving innovation globally.",
    "externalUrl": "https://www.phonepe.com/careers/"
  },
  {
    "id": 17,
    "title": "Paytm Senior Cybersecurity Engineer",
    "company": "Paytm",
    "companyLogo": "💳",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💳",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Cybersecurity",
      "Paytm"
    ],
    "applicants": 18,
    "description": "Join the team at Paytm as a Senior Cybersecurity Engineer. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "Paytm is a leading organization in the Fintech & Payments sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.paytm.com/"
  },
  {
    "id": 18,
    "title": "Razorpay Data Scientist (Analytics & Forecasting)",
    "company": "Razorpay",
    "companyLogo": "💳",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💳",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Data Science",
      "Razorpay"
    ],
    "applicants": 22,
    "description": "Join the team at Razorpay as a Data Scientist (Analytics & Forecasting). Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "Razorpay is a leading organization in the Fintech & Payments sector, committed to driving innovation globally.",
    "externalUrl": "https://razorpay.com/jobs/"
  },
  {
    "id": 19,
    "title": "Cred Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "Cred",
    "companyLogo": "💳",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💳",
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
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "AI/ML",
      "Cred"
    ],
    "applicants": 11,
    "description": "Join the team at Cred as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "Cred is a leading organization in the Fintech & Payments sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.cred.club/"
  },
  {
    "id": 20,
    "title": "Uber Senior MLOps Engineer",
    "company": "Uber",
    "companyLogo": "🚗",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🚗",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Uber"
    ],
    "applicants": 13,
    "description": "Join the team at Uber as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Uber is a leading organization in the Mobility & Logistics sector, committed to driving innovation globally.",
    "externalUrl": "https://www.uber.com/careers/"
  },
  {
    "id": 21,
    "title": "Ola Full Stack Developer (React & Node.js)",
    "company": "Ola",
    "companyLogo": "🚕",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🚕",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Full Stack",
      "Ola"
    ],
    "applicants": 30,
    "description": "Join the team at Ola as a Full Stack Developer (React & Node.js). Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "Ola is a leading organization in the Mobility & Logistics sector, committed to driving innovation globally.",
    "externalUrl": "https://www.olacabs.com/careers"
  },
  {
    "id": 22,
    "title": "Jio Cloud Architect (AWS / Azure Solutions)",
    "company": "Jio",
    "companyLogo": "📶",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "📶",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "Jio"
    ],
    "applicants": 31,
    "description": "Join the team at Jio as a Cloud Architect (AWS / Azure Solutions). Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "Jio is a leading organization in the Telecom & Cloud sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.jio.com/"
  },
  {
    "id": 23,
    "title": "Airtel Senior Cybersecurity Engineer",
    "company": "Airtel",
    "companyLogo": "📶",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "📶",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cybersecurity",
      "Airtel"
    ],
    "applicants": 31,
    "description": "Join the team at Airtel as a Senior Cybersecurity Engineer. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "Airtel is a leading organization in the Telecom & Cloud sector, committed to driving innovation globally.",
    "externalUrl": "https://www.airtel.in/careers"
  },
  {
    "id": 24,
    "title": "IBM Data Scientist (Analytics & Forecasting)",
    "company": "IBM",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Data Science",
      "IBM"
    ],
    "applicants": 31,
    "description": "Join the team at IBM as a Data Scientist (Analytics & Forecasting). Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "IBM is a leading organization in the Enterprise SaaS & AI sector, committed to driving innovation globally.",
    "externalUrl": "https://www.ibm.com/careers"
  },
  {
    "id": 25,
    "title": "Accenture Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "Accenture",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
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
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "AI/ML",
      "Accenture"
    ],
    "applicants": 8,
    "description": "Join the team at Accenture as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "Accenture is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://www.accenture.com/careers"
  },
  {
    "id": 26,
    "title": "Capgemini Senior MLOps Engineer",
    "company": "Capgemini",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Capgemini"
    ],
    "applicants": 13,
    "description": "Join the team at Capgemini as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Capgemini is a leading organization in the IT Consulting & Services sector, committed to driving innovation globally.",
    "externalUrl": "https://www.capgemini.com/careers/"
  },
  {
    "id": 27,
    "title": "Deloitte Full Stack Developer (React & Node.js)",
    "company": "Deloitte",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Full Stack",
      "Deloitte"
    ],
    "applicants": 8,
    "description": "Join the team at Deloitte as a Full Stack Developer (React & Node.js). Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "Deloitte is a leading organization in the Consulting & Advisory sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.deloitte.com/"
  },
  {
    "id": 28,
    "title": "PwC Cloud Architect (AWS / Azure Solutions)",
    "company": "PwC",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "PwC"
    ],
    "applicants": 32,
    "description": "Join the team at PwC as a Cloud Architect (AWS / Azure Solutions). Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "PwC is a leading organization in the Consulting & Advisory sector, committed to driving innovation globally.",
    "externalUrl": "https://www.pwc.com/careers"
  },
  {
    "id": 29,
    "title": "EY Senior Cybersecurity Engineer",
    "company": "EY",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Cybersecurity",
      "EY"
    ],
    "applicants": 12,
    "description": "Join the team at EY as a Senior Cybersecurity Engineer. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "EY is a leading organization in the Consulting & Advisory sector, committed to driving innovation globally.",
    "externalUrl": "https://www.ey.com/careers"
  },
  {
    "id": 30,
    "title": "KPMG Data Scientist (Analytics & Forecasting)",
    "company": "KPMG",
    "companyLogo": "🏢",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🏢",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Data Science",
      "KPMG"
    ],
    "applicants": 11,
    "description": "Join the team at KPMG as a Data Scientist (Analytics & Forecasting). Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "KPMG is a leading organization in the Consulting & Advisory sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.kpmg"
  },
  {
    "id": 31,
    "title": "Salesforce Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "Salesforce",
    "companyLogo": "☁️",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "☁️",
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
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "AI/ML",
      "Salesforce"
    ],
    "applicants": 10,
    "description": "Join the team at Salesforce as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "Salesforce is a leading organization in the Enterprise SaaS sector, committed to driving innovation globally.",
    "externalUrl": "https://www.salesforce.com/company/careers/"
  },
  {
    "id": 32,
    "title": "Adobe Senior MLOps Engineer",
    "company": "Adobe",
    "companyLogo": "🎨",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🎨",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Adobe"
    ],
    "applicants": 8,
    "description": "Join the team at Adobe as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Adobe is a leading organization in the Creative Software & SaaS sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.adobe.com/"
  },
  {
    "id": 33,
    "title": "Oracle Full Stack Developer (React & Node.js)",
    "company": "Oracle",
    "companyLogo": "🔴",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🔴",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Full Stack",
      "Oracle"
    ],
    "applicants": 6,
    "description": "Join the team at Oracle as a Full Stack Developer (React & Node.js). Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "Oracle is a leading organization in the Enterprise Cloud & Database sector, committed to driving innovation globally.",
    "externalUrl": "https://www.oracle.com/corporate/careers/"
  },
  {
    "id": 34,
    "title": "Cisco Cloud Architect (AWS / Azure Solutions)",
    "company": "Cisco",
    "companyLogo": "🔌",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🔌",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "Cisco"
    ],
    "applicants": 21,
    "description": "Join the team at Cisco as a Cloud Architect (AWS / Azure Solutions). Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "Cisco is a leading organization in the Networking & Security sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.cisco.com/"
  },
  {
    "id": 35,
    "title": "Intel Senior Cybersecurity Engineer",
    "company": "Intel",
    "companyLogo": "🔌",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🔌",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cybersecurity",
      "Intel"
    ],
    "applicants": 12,
    "description": "Join the team at Intel as a Senior Cybersecurity Engineer. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "Intel is a leading organization in the Hardware & Semiconductors sector, committed to driving innovation globally.",
    "externalUrl": "https://jobs.intel.com/"
  },
  {
    "id": 36,
    "title": "AMD Data Scientist (Analytics & Forecasting)",
    "company": "AMD",
    "companyLogo": "🔌",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🔌",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Data Science",
      "AMD"
    ],
    "applicants": 13,
    "description": "Join the team at AMD as a Data Scientist (Analytics & Forecasting). Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "AMD is a leading organization in the Hardware & Semiconductors sector, committed to driving innovation globally.",
    "externalUrl": "https://www.amd.com/en/corporate/careers"
  },
  {
    "id": 37,
    "title": "HP Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "HP",
    "companyLogo": "💻",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💻",
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
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "AI/ML",
      "HP"
    ],
    "applicants": 19,
    "description": "Join the team at HP as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "HP is a leading organization in the Hardware & Computing sector, committed to driving innovation globally.",
    "externalUrl": "https://jobs.hp.com/"
  },
  {
    "id": 38,
    "title": "Dell Senior MLOps Engineer",
    "company": "Dell",
    "companyLogo": "💻",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💻",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Dell"
    ],
    "applicants": 6,
    "description": "Join the team at Dell as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Dell is a leading organization in the Hardware & Computing sector, committed to driving innovation globally.",
    "externalUrl": "https://jobs.dell.com/"
  },
  {
    "id": 39,
    "title": "VMware Full Stack Developer (React & Node.js)",
    "company": "VMware",
    "companyLogo": "☁️",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "☁️",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Full Stack",
      "VMware"
    ],
    "applicants": 20,
    "description": "Join the team at VMware as a Full Stack Developer (React & Node.js). Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "VMware is a leading organization in the Cloud & Virtualization sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.vmware.com/"
  },
  {
    "id": 40,
    "title": "ServiceNow Cloud Architect (AWS / Azure Solutions)",
    "company": "ServiceNow",
    "companyLogo": "☁️",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "☁️",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "ServiceNow"
    ],
    "applicants": 12,
    "description": "Join the team at ServiceNow as a Cloud Architect (AWS / Azure Solutions). Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "ServiceNow is a leading organization in the Enterprise Workflow SaaS sector, committed to driving innovation globally.",
    "externalUrl": "https://www.servicenow.com/careers.html"
  },
  {
    "id": 41,
    "title": "Stripe Senior Cybersecurity Engineer",
    "company": "Stripe",
    "companyLogo": "💳",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💳",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Cybersecurity",
      "Stripe"
    ],
    "applicants": 32,
    "description": "Join the team at Stripe as a Senior Cybersecurity Engineer. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "Stripe is a leading organization in the Fintech & Payments sector, committed to driving innovation globally.",
    "externalUrl": "https://stripe.com/jobs"
  },
  {
    "id": 42,
    "title": "Zoom Data Scientist (Analytics & Forecasting)",
    "company": "Zoom",
    "companyLogo": "📹",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "📹",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Data Science",
      "Zoom"
    ],
    "applicants": 27,
    "description": "Join the team at Zoom as a Data Scientist (Analytics & Forecasting). Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "Zoom is a leading organization in the Collaboration & Video sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.zoom.us/"
  },
  {
    "id": 43,
    "title": "Slack Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "Slack",
    "companyLogo": "💬",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💬",
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
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "AI/ML",
      "Slack"
    ],
    "applicants": 24,
    "description": "Join the team at Slack as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "Slack is a leading organization in the Collaboration & SaaS sector, committed to driving innovation globally.",
    "externalUrl": "https://slack.com/careers"
  },
  {
    "id": 44,
    "title": "Atlassian Senior MLOps Engineer",
    "company": "Atlassian",
    "companyLogo": "🔷",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🔷",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Atlassian"
    ],
    "applicants": 13,
    "description": "Join the team at Atlassian as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Atlassian is a leading organization in the Collaboration & DevOps sector, committed to driving innovation globally.",
    "externalUrl": "https://www.atlassian.com/company/careers"
  },
  {
    "id": 45,
    "title": "Snowflake Full Stack Developer (React & Node.js)",
    "company": "Snowflake",
    "companyLogo": "❄️",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "❄️",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "Full Stack",
      "Snowflake"
    ],
    "applicants": 9,
    "description": "Join the team at Snowflake as a Full Stack Developer (React & Node.js). Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "Snowflake is a leading organization in the Cloud Data Platform sector, committed to driving innovation globally.",
    "externalUrl": "https://www.snowflake.com/careers/"
  },
  {
    "id": 46,
    "title": "Databricks Cloud Architect (AWS / Azure Solutions)",
    "company": "Databricks",
    "companyLogo": "🧱",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🧱",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cloud",
      "Databricks"
    ],
    "applicants": 24,
    "description": "Join the team at Databricks as a Cloud Architect (AWS / Azure Solutions). Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "Databricks is a leading organization in the AI & Big Data sector, committed to driving innovation globally.",
    "externalUrl": "https://www.databricks.com/company/careers"
  },
  {
    "id": 47,
    "title": "Twilio Senior Cybersecurity Engineer",
    "company": "Twilio",
    "companyLogo": "📞",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "📞",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Cybersecurity",
      "Twilio"
    ],
    "applicants": 21,
    "description": "Join the team at Twilio as a Senior Cybersecurity Engineer. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "Twilio is a leading organization in the Cloud Communications sector, committed to driving innovation globally.",
    "externalUrl": "https://www.twilio.com/company/jobs"
  },
  {
    "id": 48,
    "title": "Shopify Data Scientist (Analytics & Forecasting)",
    "company": "Shopify",
    "companyLogo": "🛍️",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🛍️",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "Data Science",
      "Shopify"
    ],
    "applicants": 19,
    "description": "Join the team at Shopify as a Data Scientist (Analytics & Forecasting). Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "Shopify is a leading organization in the E-Commerce SaaS sector, committed to driving innovation globally.",
    "externalUrl": "https://www.shopify.com/careers"
  },
  {
    "id": 49,
    "title": "PayPal Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "PayPal",
    "companyLogo": "💳",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "💳",
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
    "featured": false,
    "urgent": true,
    "tags": [
      "Hybrid",
      "AI/ML",
      "PayPal"
    ],
    "applicants": 8,
    "description": "Join the team at PayPal as a Senior Software Engineer (AI/ML & Infrastructure). Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "PayPal is a leading organization in the Fintech & Payments sector, committed to driving innovation globally.",
    "externalUrl": "https://careers.paypal-corp.com/"
  },
  {
    "id": 50,
    "title": "Grab Senior MLOps Engineer",
    "company": "Grab",
    "companyLogo": "🚗",
    "location": "Hyderabad, India (Hybrid)",
    "country": "India",
    "type": "Full-time",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "Just now",
    "postedDays": 0,
    "logo": "🚗",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Hybrid",
      "DevOps",
      "Grab"
    ],
    "applicants": 22,
    "description": "Join the team at Grab as a Senior MLOps Engineer. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Grab is a leading organization in the Mobility & On-Demand sector, committed to driving innovation globally.",
    "externalUrl": "https://grab.careers/"
  },
  {
    "id": 51,
    "title": "Specialist Cloud Architect (AWS / Azure Solutions)",
    "company": "Google Labs",
    "companyLogo": "🤖",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "🤖",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Cloud",
      "Google"
    ],
    "applicants": 13,
    "description": "Join Google Labs to work on cutting-edge research. Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "Google Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://careers.google.com/"
  },
  {
    "id": 52,
    "title": "Specialist Senior Cybersecurity Engineer",
    "company": "Microsoft Labs",
    "companyLogo": "💻",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "💻",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Cybersecurity",
      "Microsoft"
    ],
    "applicants": 25,
    "description": "Join Microsoft Labs to work on cutting-edge research. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "Microsoft Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://careers.microsoft.com/"
  },
  {
    "id": 53,
    "title": "Specialist Data Scientist (Analytics & Forecasting)",
    "company": "AWS (Amazon Web Services) Labs",
    "companyLogo": "☁️",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "☁️",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Data Science",
      "AWS (Amazon Web Services)"
    ],
    "applicants": 23,
    "description": "Join AWS (Amazon Web Services) Labs to work on cutting-edge research. Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "AWS (Amazon Web Services) Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://www.amazon.jobs/en/teams/amazon-web-services"
  },
  {
    "id": 54,
    "title": "Specialist Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "Meta Labs",
    "companyLogo": "👁️",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "👁️",
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
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "AI/ML",
      "Meta"
    ],
    "applicants": 16,
    "description": "Join Meta Labs to work on cutting-edge research. Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "Meta Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://www.metacareers.com/"
  },
  {
    "id": 55,
    "title": "Specialist Senior MLOps Engineer",
    "company": "Apple Labs",
    "companyLogo": "🍎",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹30L – ₹50L",
    "salaryMin": 3000000,
    "salaryMax": 5000000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "🍎",
    "skills": [
      "AWS SageMaker",
      "Terraform",
      "Kubernetes",
      "Python",
      "ML Pipelines",
      "Docker"
    ],
    "experience": "Senior",
    "category": "DevOps",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "DevOps",
      "Apple"
    ],
    "applicants": 30,
    "description": "Join Apple Labs to work on cutting-edge research. Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads.",
    "responsibilities": [
      "Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models.",
      "Manage GPU clusters and cloud auto-scaling policies.",
      "Implement monitoring and observability for model health and inference latency."
    ],
    "requirements": [
      "5+ years in cloud and DevOps engineering, with 2+ years dedicated to MLOps.",
      "Deep knowledge of Amazon SageMaker, feature stores, and model endpoints.",
      "Proficiency with Terraform and Kubernetes in production environments."
    ],
    "niceToHave": [
      "AWS Certified DevOps or ML Specialty",
      "Experience with Triton Inference Server."
    ],
    "benefits": [
      "Performance bonuses",
      "RSUs",
      "Internet & wellness allowance",
      "Certification coverage"
    ],
    "aboutCompany": "Apple Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://www.apple.com/careers/"
  },
  {
    "id": 56,
    "title": "Specialist Full Stack Developer (React & Node.js)",
    "company": "Google Labs",
    "companyLogo": "🤖",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹18L – ₹30L",
    "salaryMin": 1800000,
    "salaryMax": 3000000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "🤖",
    "skills": [
      "React",
      "Node.js",
      "TypeScript",
      "Next.js",
      "MySQL",
      "Tailwind CSS"
    ],
    "experience": "Mid Level",
    "category": "Full Stack",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Full Stack",
      "Google"
    ],
    "applicants": 36,
    "description": "Join Google Labs to work on cutting-edge research. Build highly responsive web applications, interactive admin panels, and scalable server-side REST APIs for our consumer and enterprise products.",
    "responsibilities": [
      "Develop modular React frontend components using TypeScript.",
      "Architect secure and optimized database queries in Node.js.",
      "Collaborate with product designers to implement premium user interfaces."
    ],
    "requirements": [
      "3+ years of professional full-stack development experience.",
      "Strong proficiency in modern JavaScript/TypeScript, React 18, and Node.js.",
      "Experience with ORMs like Prisma or Sequelize and SQL databases."
    ],
    "niceToHave": [
      "Experience with Next.js App Router",
      "Familiarity with serverless deployments."
    ],
    "benefits": [
      "Competitive base salary",
      "Generous medical benefits",
      "Flex-hours & hybrid options",
      "Latest hardware support"
    ],
    "aboutCompany": "Google Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://careers.google.com/"
  },
  {
    "id": 57,
    "title": "Specialist Cloud Architect (AWS / Azure Solutions)",
    "company": "Microsoft Labs",
    "companyLogo": "💻",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹32L – ₹52L",
    "salaryMin": 3200000,
    "salaryMax": 5200000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "💻",
    "skills": [
      "AWS",
      "Azure",
      "Terraform",
      "Infrastructure as Code",
      "Enterprise Architecture",
      "Security"
    ],
    "experience": "Lead",
    "category": "Cloud",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Cloud",
      "Microsoft"
    ],
    "applicants": 34,
    "description": "Join Microsoft Labs to work on cutting-edge research. Guide enterprise customers through end-to-end cloud transformation journeys, from solution design to full-scale infrastructure deployments.",
    "responsibilities": [
      "Design end-to-end resilient and cost-optimized cloud solutions.",
      "Lead migration pipelines from legacy systems to cloud-native platforms.",
      "Provide architecture guidance and deliver hands-on proofs of concept (PoCs)."
    ],
    "requirements": [
      "7+ years of experience in cloud infrastructure and systems architecture.",
      "Deep knowledge of AWS or Azure, container orchestrations, and IaC.",
      "Excellent communication and technical presentation skills."
    ],
    "niceToHave": [
      "AWS Certified Solutions Architect Professional",
      "Familiarity with zero-trust security."
    ],
    "benefits": [
      "RSU programs",
      "Comprehensive healthcare package",
      "Remote equipment budget",
      "Volunteering benefits"
    ],
    "aboutCompany": "Microsoft Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://careers.microsoft.com/"
  },
  {
    "id": 58,
    "title": "Specialist Senior Cybersecurity Engineer",
    "company": "AWS (Amazon Web Services) Labs",
    "companyLogo": "☁️",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹25L – ₹42L",
    "salaryMin": 2500000,
    "salaryMax": 4200000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "☁️",
    "skills": [
      "Zero Trust",
      "IAM",
      "OIDC",
      "SAML",
      "Penetration Testing",
      "Security Auditing"
    ],
    "experience": "Senior",
    "category": "Cybersecurity",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Cybersecurity",
      "AWS (Amazon Web Services)"
    ],
    "applicants": 26,
    "description": "Join AWS (Amazon Web Services) Labs to work on cutting-edge research. Lead the security assessment, threat modeling, and implementation of identity protection controls across our distributed cloud platforms.",
    "responsibilities": [
      "Design and deploy robust Zero Trust identity architectures.",
      "Conduct continuous penetration testing and vulnerability reviews.",
      "Implement incident response pipelines and security auditing dashboards."
    ],
    "requirements": [
      "5+ years of software security or enterprise engineering experience.",
      "Deep familiarity with IAM protocols, WebAuthn, and auth mechanisms.",
      "Strong understanding of network protocols, firewalls, and encryption standards."
    ],
    "niceToHave": [
      "CISSP or CEH certifications",
      "Experience with AWS security controls."
    ],
    "benefits": [
      "Annual health checks",
      "Gym memberships",
      "Flexible PTO",
      "Corporate discounts"
    ],
    "aboutCompany": "AWS (Amazon Web Services) Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://www.amazon.jobs/en/teams/amazon-web-services"
  },
  {
    "id": 59,
    "title": "Specialist Data Scientist (Analytics & Forecasting)",
    "company": "Meta Labs",
    "companyLogo": "👁️",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹16L – ₹28L",
    "salaryMin": 1600000,
    "salaryMax": 2800000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "👁️",
    "skills": [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "Statistical Modeling",
      "Data Visualization"
    ],
    "experience": "Mid Level",
    "category": "Data Science",
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "Data Science",
      "Meta"
    ],
    "applicants": 12,
    "description": "Join Meta Labs to work on cutting-edge research. Leverage advanced statistical modeling and machine learning to build customer behavior profiles, churn forecasts, and predictive insights.",
    "responsibilities": [
      "Analyze massive customer transaction datasets to isolate behavioral trends.",
      "Build and evaluate machine learning models for forecasting metrics.",
      "Present actionable business recommendations to product leads."
    ],
    "requirements": [
      "3+ years of professional data science or analytics experience.",
      "Master's in Statistics, Applied Mathematics, or Computer Science.",
      "Exceptional command of Python/R and SQL."
    ],
    "niceToHave": [
      "Experience with Tableau or PowerBI dashboards",
      "Familiarity with Snowflake."
    ],
    "benefits": [
      "Performance bonuses",
      "Hybrid work models",
      "Professional training reimbursement",
      "Paid parental leave"
    ],
    "aboutCompany": "Meta Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://www.metacareers.com/"
  },
  {
    "id": 60,
    "title": "Specialist Senior Software Engineer (AI/ML & Infrastructure)",
    "company": "Apple Labs",
    "companyLogo": "🍎",
    "location": "Remote (India)",
    "country": "India",
    "type": "Remote",
    "salary": "₹35L – ₹55L",
    "salaryMin": 3500000,
    "salaryMax": 5500000,
    "posted": "1 day ago",
    "postedDays": 1,
    "logo": "🍎",
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
    "featured": false,
    "urgent": false,
    "tags": [
      "Remote",
      "AI/ML",
      "Apple"
    ],
    "applicants": 38,
    "description": "Join Apple Labs to work on cutting-edge research. Build and scale production machine learning models and large-scale model infrastructure supporting generative AI systems and search platforms.",
    "responsibilities": [
      "Design large-scale distributed training systems.",
      "Optimize deep learning models for production scale and low-latency inference.",
      "Collaborate with research and hardware acceleration teams (TPUs/GPUs)."
    ],
    "requirements": [
      "5+ years of software development experience in production environments.",
      "Strong background in AI/ML architectures and cloud systems infrastructure.",
      "Proficiency in Python, C++, and deep learning frameworks like PyTorch."
    ],
    "niceToHave": [
      "Experience scaling transformer models",
      "Contributions to open-source compilers."
    ],
    "benefits": [
      "Top-tier compensation",
      "Stock grants (RSUs)",
      "Comprehensive healthcare",
      "Learning budgets"
    ],
    "aboutCompany": "Apple Labs focuses on pushing technology frontiers through rigorous cloud R&D.",
    "externalUrl": "https://www.apple.com/careers/"
  }
];
