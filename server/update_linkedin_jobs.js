import pkg from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const jobsToSeed = [
  {
    title: 'Senior Software Engineer (AI/ML & Infrastructure)',
    company: 'Google India',
    location: 'Bengaluru, Karnataka (Hybrid)',
    type: 'Full-time',
    salary: '₹35L – ₹55L',
    experience: 'Senior',
    logo: '🤖',
    category: 'AI/ML',
    featured: true,
    urgent: true,
    description: 'Build and scale production machine learning models and large-scale model infrastructure supporting Gemini and Google Search platforms.',
    responsibilities: [
      'Design large-scale distributed training systems',
      'Optimize deep learning models for production scale and low-latency inference',
      'Collaborate with research and hardware acceleration teams (TPUs/GPUs)'
    ],
    requirements: [
      '5+ years of software development experience in production environments',
      'Strong background in AI/ML architectures and cloud systems infrastructure',
      'Master’s or PhD in Computer Science, Machine Learning, or equivalent practical experience'
    ],
    niceToHave: [
      'Experience scaling transformer models and large language models',
      'Contributions to open-source deep learning compilers or frameworks'
    ],
    benefits: [
      'Top-tier base compensation and performance bonus',
      'Substantial Alphabet stock grant (GSUs)',
      'Comprehensive healthcare and wellness allowance',
      'Free gourmet meals and modern hybrid office spaces',
      'Unlimited learning resources and conference attendance'
    ],
    aboutCompany: 'Google is a global technology leader focused on improving the ways people connect with information.',
    posted: 'Just now',
    skills: ['Python', 'C++', 'PyTorch', 'TensorFlow', 'Distributed Systems', 'ML Infrastructure']
  },
  {
    title: 'Senior MLOps Engineer (SageMaker Platforms)',
    company: 'AWS (Amazon Web Services)',
    location: 'Hyderabad, Telangana (Hybrid)',
    type: 'Full-time',
    salary: '₹30L – ₹50L',
    experience: 'Senior',
    logo: '☁️',
    category: 'Cloud',
    featured: true,
    urgent: true,
    description: 'Own the production reliability, deployment governance, and infrastructure scalability for large-scale enterprise machine learning workloads on Amazon Web Services.',
    responsibilities: [
      'Develop continuous integration and continuous deployment pipelines (CI/CD) for ML models',
      'Manage GPU clusters and cloud auto-scaling policies',
      'Implement monitoring and observability for model health and inference latency'
    ],
    requirements: [
      '8+ years in cloud and DevOps engineering, with 3+ years dedicated to MLOps',
      'Deep knowledge of Amazon SageMaker, feature stores, and model endpoints',
      'Proficiency with Terraform and Kubernetes in production environments'
    ],
    niceToHave: [
      'AWS Certified DevOps Engineer or Machine Learning Specialty',
      'Experience with Triton Inference Server or SageMaker Neo model compilation'
    ],
    benefits: [
      'Competitive base salary with Amazon restricted stock units (RSUs)',
      'Comprehensive health insurance for self and family',
      'Generous internet, wellness, and phone allowances',
      'Certification reimbursement and career advancement pathways'
    ],
    aboutCompany: 'Amazon Web Services provides on-demand cloud computing platforms and APIs to individuals, companies, and governments.',
    posted: '1 day ago',
    skills: ['AWS SageMaker', 'Terraform', 'Kubernetes', 'Python', 'ML Pipelines', 'Docker']
  },
  {
    title: 'Cloud Solution Architect (Azure AI Transformation)',
    company: 'Microsoft India',
    location: 'Noida, UP (Hybrid)',
    type: 'Full-time',
    salary: '₹28L – ₹45L',
    experience: 'Lead',
    logo: '💻',
    category: 'Cloud',
    featured: true,
    urgent: false,
    description: 'Guide enterprise customers through end-to-end transformation journeys, from solution envisioning and AI architect design to full-scale Azure deployments.',
    responsibilities: [
      'Design end-to-end enterprise AI solutions using Azure OpenAI and LLMs',
      'Act as a technical subject matter expert for application development and cloud modernization',
      'Provide technical architecture guidance and deliver hands-on proofs of concept (PoCs)'
    ],
    requirements: [
      '6-8+ years of experience in cloud infrastructure, IT consulting, systems architecture, or software development',
      'Deep knowledge of Microsoft Azure, AI/ML pipelines, Conversational AI, and Infrastructure as Code',
      'Strong stakeholder management and technical presentation skills'
    ],
    niceToHave: [
      'Microsoft Certified: Azure Solutions Architect Expert or Azure AI Engineer Associate',
      'Familiarity with enterprise zero-trust frameworks'
    ],
    benefits: [
      'Highly competitive CTC package with performance incentives',
      'Microsoft RSU grant and employee stock purchase plan',
      'World-class medical, dental, and vision coverage',
      'Subsidized physical fitness, transport, and remote equipment budgets',
      'Annual learning budget and community volunteering options'
    ],
    aboutCompany: 'Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.',
    posted: '2 days ago',
    skills: ['Microsoft Azure', 'Azure OpenAI', 'LLMs', 'Terraform', 'Cognitive Services', 'Enterprise Architecture']
  }
];

const trendingArticle = {
  title: "Big Tech AI Hiring Surge: Real-Time Openings at Google, AWS, and Microsoft India",
  excerpt: "A comprehensive breakdown of active senior engineering and cloud architect openings at Google Cloud AI, AWS SageMaker, and Azure AI, including skills, requirements, and salaries.",
  slug: "big-tech-ai-hiring-surge-2026",
  category: "IT Career",
  featured: true,
  content: `The landscape of global technology has entered a hyper-specialized phase in 2026. Major hyperscalers and tech giants like Google, Amazon Web Services (AWS), and Microsoft are actively expanding their engineering capacities in India, focusing heavily on bridging the gap between cutting-edge AI research and production-scale cloud infrastructure.

The Big Tech Focus: Real-Time Openings
Rather than generic engineering roles, the hiring market is strongly rewarding professionals with specialized AI fluency, MLOps capability, and deep cloud systems experience. Here is an inside look at three major roles currently open in their Indian offices:

1. Senior Software Engineer (AI/ML and Infrastructure) at Google India (Bengaluru)
Google Cloud AI is expanding its core engineering team in Bengaluru to support Gemini and Search platform scaling.
• Role Focus: Designing distributed training systems and optimizing deep learning models for production scale.
• Required Stack: Python, C++, PyTorch, TensorFlow, and Distributed Systems.
• Estimated Package: ₹35L - ₹55L per annum.

2. Senior MLOps Engineer (SageMaker Platforms) at AWS (Hyderabad)
Amazon Web Services is recruiting lead engineers to manage production pipelines, observability, and scaling governance for its enterprise clients.
• Role Focus: Developing robust CI/CD pipelines for ML, auto-scaling GPU clusters, and setting up model monitoring systems.
• Required Stack: AWS SageMaker, Kubernetes, Terraform, Docker, and Python.
• Estimated Package: ₹30L - ₹50L per annum.

3. Cloud Solution Architect (Azure AI Transformation) at Microsoft India (Noida)
Microsoft CE&S is leading AI-driven enterprise transformation by hiring Cloud Solution Architects to implement generative AI pipelines.
• Role Focus: Architecting Azure OpenAI applications, building customer-facing solutions, and designing end-to-end cloud platforms.
• Required Stack: Microsoft Azure, Azure OpenAI, LLMs, Terraform, and Cognitive Services.
• Estimated Package: ₹28L - ₹45L per annum.

Key Skills to Master for Big Tech
If you are preparing your application for these positions, tech recruiters suggest focusing heavily on the following areas:
1. AI Fluency & Tool Integration: Demonstrate hands-on experience integrating large models (LLMs/VLMs) with production enterprise services using orchestration systems.
2. Infrastructure as Code (IaC): Platform reliability is key. Mastery of Terraform, Kubernetes, and containerized pipelines is a non-negotiable standard.
3. Measurable Impact: Big Tech resumes must quantify impact (e.g., 'reduced model training costs by 15% through GPU cluster optimization' or 'improved inference latency by 80ms').

These openings represent the vanguard of the modern tech workforce. Accelerate your career preparation and align your skills to the exact requirements of these roles.`,
  status: "published"
};

async function updateLinkedinJobs() {
  try {
    console.log('🧹 Wiping all old dummy jobs from the database...');
    // Delete any foreign key dependent records if any, but savedJobs and appliedJobs have onDelete: Cascade
    // Wait, let's make sure we clean up properly.
    const deletedJobsCount = await prisma.job.deleteMany();
    console.log(`✅ Deleted ${deletedJobsCount.count} dummy jobs.`);

    console.log('🌱 Seeding new premium Big Tech jobs...');
    for (const job of jobsToSeed) {
      const createdJob = await prisma.job.create({
        data: {
          title: job.title,
          company: job.company,
          location: job.location,
          type: job.type,
          salary: job.salary,
          experience: job.experience,
          logo: job.logo,
          category: job.category,
          featured: job.featured,
          urgent: job.urgent,
          description: job.description,
          aboutCompany: job.aboutCompany,
          posted: job.posted,
          skills: job.skills,
          responsibilities: job.responsibilities,
          requirements: job.requirements,
          niceToHave: job.niceToHave,
          benefits: job.benefits,
          status: 'active'
        }
      });
      
      // Seed default job stats
      await prisma.jobStats.create({
        data: {
          jobId: createdJob.id,
          applicants_count: createdJob.title.includes('Google') ? 12 : (createdJob.title.includes('AWS') ? 24 : 18),
          views_count: createdJob.title.includes('Google') ? 145 : (createdJob.title.includes('AWS') ? 210 : 167)
        }
      });

      // Seed detailed skills if available
      for (const skill of job.skills) {
        await prisma.jobSkill.create({
          data: {
            jobId: createdJob.id,
            skill_name: skill,
            importance_level: 8
          }
        });
      }
      
      console.log(`   - Created Job: ${job.title} at ${job.company}`);
    }

    console.log('✍️  Seeding/Upserting trending career article...');
    const admin = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (!admin) {
      console.warn('⚠️  Warning: Admin user not found. Checking for any available user...');
      const fallbackUser = await prisma.user.findFirst();
      if (!fallbackUser) {
        console.error('❌ Error: No user exists in database to attribute the article to.');
        process.exit(1);
      }
      console.log(`   - Attributing article to fallback user: ${fallbackUser.name} (ID: ${fallbackUser.id})`);
      
      await prisma.blogPost.upsert({
        where: { slug: trendingArticle.slug },
        update: trendingArticle,
        create: {
          ...trendingArticle,
          authorId: fallbackUser.id
        }
      });
    } else {
      console.log(`   - Attributing article to admin: ${admin.name} (ID: ${admin.id})`);
      await prisma.blogPost.upsert({
        where: { slug: trendingArticle.slug },
        update: trendingArticle,
        create: {
          ...trendingArticle,
          authorId: admin.id
        }
      });
    }

    console.log('🎉 Seeding and update successfully completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Script failed with error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateLinkedinJobs();
