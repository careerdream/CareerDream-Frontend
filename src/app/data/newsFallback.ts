export interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  category: string;
  featured: boolean;
  views: number;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
    title?: string;
  };
}

export const fallbackPosts: BlogPost[] = [
  // --- ORIGINAL FEATURED ARTICLES ---
  {
    id: 9991,
    title: "India's Tech Surge: Bangalore Overtakes London as Global IT Hub in 2026",
    excerpt: "New market data reveals that India's digital capital has seen a 40% increase in multinational headquarters this fiscal year.",
    content: `The landscape of global technology has shifted dramatically. Bangalore, often called the Silicon Valley of India, has officially surpassed London in the total number of tech headquarters and R&D centers.

This surge is driven by aggressive digitalization, a massive talent pool, and supportive government policies like 'Digital India 2.0'. Experts predict this trend will continue to attract over $50 billion in FDI over the next two years.

"We are seeing a massive migration of top-tier engineering talent moving from Europe and North America back to India," says a lead analyst. "The infrastructure in Bangalore has caught up, and the ecosystem of startups is now unparalleled globaly."`,
    slug: "india-tech-surge-bangalore-2026",
    category: "Indian IT",
    featured: true,
    views: 12500,
    createdAt: new Date().toISOString(),
    author: { id: 999, name: "Aditi Rao", title: "Tech Analyst", avatar: "" }
  },
  {
    id: 9992,
    title: "Global AI Accord: Top 50 Nations Sign Ethics & Safety Protocol",
    excerpt: "A landmark treaty in Geneva establishes new standards for Large Language Model deployment and digital copyright protection.",
    content: `In a historic moment for the digital age, representatives from 50 nations have signed the Geneva AI Accord. The protocol sets strict guidelines for AI transparency, bias mitigation, and data privacy.

It also introduces a global framework for digital copyright, ensuring that creators are compensated when their work is used to train foundation models. Major tech giants have pledged compliance, marking a new era of responsible innovation.

The accord also addresses the environmental impact of large-scale AI training, requiring companies to report their carbon footprint and transition to sustainable energy sources for data centers.`,
    slug: "global-ai-accord-2026",
    category: "Global Tech",
    featured: true,
    views: 8200,
    createdAt: new Date().toISOString(),
    author: { id: 998, name: "Marcus Chen", title: "AI Researcher", avatar: "" }
  },
  {
    id: 9993,
    title: "Hyderabad's New 'Cloud City' Expected to Create 100,000 Jobs by 2027",
    excerpt: "The massive 500-acre infrastructure project aimed at cloud computing and edge data centers holds promise for Indian techies.",
    content: `The state government has unveiled the roadmap for 'Cloud City', a dedicated tech zone in Hyderabad. With investments from major hyperscalers, the project is designed to be a hub for cloud architecture, cybersecurity, and edge computing.

The first phase is expected to be operational by late 2026, with an estimated 100,000 high-paying jobs being created for software engineers, network architects, and data scientists.

"Hyderabad has become a primary target for US-based cloud providers looking to diversify their infrastructure," says a government official. "Cloud City will provide subsidized power and world-class connectivity to attract the best in the business."`,
    slug: "hyderabad-cloud-city-2027",
    category: "Market News",
    featured: true,
    views: 15900,
    createdAt: new Date().toISOString(),
    author: { id: 997, name: "Rajesh Kumar", title: "Career Coach", avatar: "" }
  },

  // --- ADDITIONAL CATEGORIZED ARTICLES ---
  {
    id: 1001,
    title: "Bangalore's 'Silicon Square' Project to Rival Cupertino",
    excerpt: "The Karnataka government greenlights a 200-acre tech park dedicated to hardware innovation and semiconductor design.",
    content: "The Silicon Square project is set to transform the outskirts of Bangalore into a world-class hardware hub. With a focus on VLSI design and semiconductor manufacturing, it aims to reduce India's reliance on imports and create a self-sustaining electronics ecosystem.",
    slug: "bangalore-silicon-square",
    category: "Indian IT",
    featured: false,
    views: 15400,
    createdAt: "2026-04-10T10:00:00Z",
    author: { id: 1, name: "Aditi Rao", title: "Tech analyst" }
  },
  {
    id: 2001,
    title: "Quantum Supremacy Achieved in Commercial Optimization",
    excerpt: "A startup in Boston uses quantum annealing to solve global logistics problems 100x faster than supercomputers.",
    content: "Quantum computing has moved from the laboratory to the boardroom. By focusing on specific optimization tasks, researchers have demonstrated clear 'quantum advantage' in real-world scenarios.",
    slug: "quantum-optimization-breakthrough",
    category: "Global Tech",
    featured: false,
    views: 22500,
    createdAt: "2026-04-11T08:00:00Z",
    author: { id: 6, name: "Marcus Chen", title: "AI Researcher" }
  },
  {
    id: 3001,
    title: "The 'T-Shaped' Developer: Why Generalists are Winning in AI",
    excerpt: "While deep expertise is valuable, the ability to bridge domains like DevOps and Data Science is becoming the top recruiter find.",
    content: "In an era where AI can handle routine coding tasks, the most valuable engineers are those who understand the 'big picture'. T-shaped individuals possess deep knowledge in one core area but have a broad understanding of the entire product lifecycle.",
    slug: "t-shaped-developer-career",
    category: "Career Advice",
    featured: true,
    views: 31000,
    createdAt: "2026-04-11T11:00:00Z",
    author: { id: 11, name: "Karen Lee", title: "HR Director" }
  },
  {
    id: 4001,
    title: "Generative Video: The Next Frontier in Digital Content",
    excerpt: "New diffusion models allow creators to generate cinematic 4K video from simple text prompts, revolutionizing the film industry.",
    content: "Video generation is the latest space to be disrupted by AI. These models understand physics and lighting at a deep level, allowing for incredibly realistic output. Filmmakers and advertisers are already exploring how to integrate these tools into their workflows.",
    slug: "generative-video-frontier",
    category: "AI/ML",
    featured: true,
    views: 45000,
    createdAt: "2026-04-12T09:00:00Z",
    author: { id: 16, name: "Dr. Alan Turing", title: "AI Ethicist" }
  },
  {
    id: 5001,
    title: "Serverless at Scale: Reducing Infrastructure Overhead by 60%",
    excerpt: "Case studies from top tech firms show how migrating to event-driven serverless architectures drastically cuts costs.",
    content: "Serverless is no longer just for small projects. Modern enterprises are moving their mission-critical workloads to FaaS (Function as a Service) to gain agility and reduce operational toil. The pay-per-execution model is proving to be a game-changer for cost optimization.",
    slug: "serverless-at-scale",
    category: "Cloud",
    featured: false,
    views: 18900,
    createdAt: "2026-04-13T11:20:00Z",
    author: { id: 17, name: "Jeff Bezos", title: "Cloud Architect" }
  },
  {
    id: 6001,
    title: "Is the MERN Stack Still King in 2026?",
    excerpt: "A look at the evolving landscape of web development, including the rise of Next.js, Remix, and Bun.",
    content: "The web ecosystem moves fast. While MERN remains a popular choice, newer frameworks and runtimes are challenging the status quo by offering better performance and developer experience out of the box. We analyze the pros and cons of sticking with the classics vs embracing the new.",
    slug: "mern-stack-status-2026",
    category: "Full Stack",
    featured: true,
    views: 32400,
    createdAt: "2026-04-14T14:00:00Z",
    author: { id: 18, name: "Dan Abramov", title: "Core Contributor" }
  },
  {
    id: 7001,
    title: "Real-time Ethics: Governing Big Data in the Age of Privacy",
    excerpt: "New laws requiring 'Explainable AI' are forcing data scientists to move beyond black-box models.",
    content: "Data science is no longer just about accuracy; it's about accountability. Regulatory frameworks are demanding that models be transparent and unbiased. This shift is leading to the development of new tools for model interpretability and fair data sampling.",
    slug: "data-science-ethics-governance",
    category: "Data Science",
    featured: false,
    views: 12100,
    createdAt: "2026-04-15T10:30:00Z",
    author: { id: 19, name: "Cathy O'Neil", title: "Data Ethicist" }
  },
  {
    id: 8001,
    title: "GitOps 2.0: The Future of Declarative Infrastructure",
    excerpt: "Infrastructure as Code (IaC) is evolving. Learn how the next generation of GitOps tools handle complex deployments.",
    content: "GitOps has simplified CI/CD, but managing distributed systems still poses challenges. New tools are emerging that allow for even more granular control over infrastructure state, including automatic drift detection and self-healing systems.",
    slug: "gitops-future-declarative",
    category: "DevOps",
    featured: true,
    views: 21600,
    createdAt: "2026-04-16T13:15:00Z",
    author: { id: 20, name: "Kelsey Hightower", title: "Developer Advocate" }
  },
  {
    id: 9001,
    title: "Zero Trust: Building Resilience in a Perimeter-Less World",
    excerpt: "Why the 'Never Trust, Always Verify' model is the only way to protect against modern ransomware attacks.",
    content: "Traditional network security is failing. Zero Trust architectures assume that the network is already compromised and require strict identity verification for every user and device. This approach is essential for securing remote workforces and hybrid cloud environments.",
    slug: "zero-trust-resilience",
    category: "Cybersecurity",
    featured: true,
    views: 28400,
    createdAt: "2026-04-17T09:45:00Z",
    author: { id: 21, name: "Bruce Schneier", title: "Security Guru" }
  },
  {
    id: 1101,
    title: "Navigating Your First Staff Engineer Promotion",
    excerpt: "Moving from Senior to Staff requires a fundamental shift in mindset from task delivery to broad technical leadership.",
    content: "The path to Staff Engineer is rarely linear. It requires demonstrating impact beyond your immediate team and influencing the technical direction of the entire organization. We discuss the skills and strategies needed to make the leap.",
    slug: "staff-engineer-promotion-guide",
    category: "IT Career",
    featured: false,
    views: 19500,
    createdAt: "2026-04-18T10:00:00Z",
    author: { id: 22, name: "Will Larson", title: "Engineering Director" }
  }
];
