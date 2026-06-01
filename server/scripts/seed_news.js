import pkg from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const newsPosts = [
  {
    title: "India's Tech Surge: Bangalore Overtakes London as Global IT Hub in 2026",
    excerpt: "New market data reveals that India's digital capital has seen a 40% increase in multinational headquarters this fiscal year.",
    content: "The landscape of global technology has shifted dramatically. Bangalore, often called the Silicon Valley of India, has officially surpassed London in the total number of tech headquarters and R&D centers. This surge is driven by aggressive digitalization, a massive talent pool, and supportive government policies like 'Digital India 2.0'. Experts predict this trend will continue to attract over $50 billion in FDI over the next two years.",
    category: "Indian IT",
    slug: "india-tech-surge-bangalore-2026",
    featured: true,
  },
  {
    title: "Global AI Accord: Top 50 Nations Sign Ethics & Safety Protocol",
    excerpt: "A landmark treaty in Geneva establishes new standards for Large Language Model deployment and digital copyright protection.",
    content: "In a historic moment for the digital age, representatives from 50 nations have signed the Geneva AI Accord. The protocol sets strict guidelines for AI transparency, bias mitigation, and data privacy. It also introduces a global framework for digital copyright, ensuring that creators are compensated when their work is used to train foundation models. Major tech giants have pledged compliance, marking a new era of responsible innovation.",
    category: "Global Tech",
    slug: "global-ai-accord-2026",
    featured: true,
  },
  {
    title: "Hyderabad's New 'Cloud City' Expected to Create 100,000 Jobs by 2027",
    excerpt: "The massive 500-acre infrastructure project aimed at cloud computing and edge data centers holds promise for Indian techies.",
    content: "The state government has unveiled the roadmap for 'Cloud City', a dedicated tech zone in Hyderabad. With investments from major hyperscalers, the project is designed to be a hub for cloud architecture, cybersecurity, and edge computing. The first phase is expected to be operational by late 2026, with an estimated 100,000 high-paying jobs being created for software engineers, network architects, and data scientists.",
    category: "Indian IT",
    slug: "hyderabad-cloud-city-2027",
    featured: true,
  }
];

async function seedNews() {
  try {
    console.log('🌱 Seeding Trending IT News...');

    // Find the admin user to associate these posts with
    const admin = await prisma.user.findFirst({
      where: { role: 'admin' }
    });

    if (!admin) {
      console.error('❌ Admin user not found. Please run setup-admin.js first.');
      process.exit(1);
    }

    for (const post of newsPosts) {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: post,
        create: {
          ...post,
          authorId: admin.id,
        },
      });
    }

    console.log('✅ News seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding news:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedNews();
