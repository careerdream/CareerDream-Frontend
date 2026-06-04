import dotenv from 'dotenv';
dotenv.config();

import { parseResumeWithAI, matchJobsAndAnalyzeGaps } from './services/aiService.js';

const dummyResume = `
Name: Alex Smith
Email: alex.smith@example.com

Summary: Passionate Full Stack Developer with 4 years of experience building scalable web applications using modern JavaScript frameworks and cloud infrastructure.

Skills:
- JavaScript, TypeScript, Node.js, Express
- React, Next.js, Tailwind CSS
- AWS, Docker, Kubernetes, CI/CD
- PostgreSQL, MongoDB, Redis

Experience:
Senior Software Engineer at TechCorp (2020 - Present)
- Developed and maintained high-traffic web applications using React and Node.js.
- Deployed microservices to AWS using Docker and Kubernetes.
- Improved database query performance by 40%.

Education:
Bachelor of Science in Computer Science, State University, 2019
`;

async function runTest() {
  console.log('Testing AI Resume Parser with OpenRouter...');
  
  try {
    console.log('1. Parsing Resume Text...');
    const extractedData = await parseResumeWithAI(dummyResume);
    console.log('\n--- EXTRACTED DATA ---');
    console.log(JSON.stringify(extractedData, null, 2));

    console.log('\n2. Matching Jobs and Analyzing Gaps...');
    const matchResults = await matchJobsAndAnalyzeGaps(extractedData.skills || []);
    console.log('\n--- TOP MATCHES ---');
    console.log(JSON.stringify(matchResults.slice(0, 3), null, 2)); // Show top 3

    console.log('\nTest Completed Successfully!');
  } catch (error) {
    console.error('\nTest Failed:', error);
  }
}

runTest();
