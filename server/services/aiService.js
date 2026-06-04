import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || 'sk-or-v1-dummy', // Needs to be in .env
});

export async function parseResumeWithAI(resumeText) {
  const modelsToTry = [
    'google/gemini-2.0-flash-lite-preview-02-05:free', // Extremely fast model
    'openrouter/free'
  ];

  const prompt = `
You are an expert technical recruiter and resume parser.
Extract the following information from the provided resume text and return it strictly as a JSON object.

Required JSON Structure:
{
  "skills": ["list", "of", "detected", "skills"],
  "summary": "A brief 1-2 sentence professional summary",
  "experience": ["Company - Role", "Company - Role"],
  "education": ["Degree - University"],
  "achievements": ["Key achievement 1", "Key achievement 2"]
}

Guidelines for extreme speed:
1. Extract a maximum of 20 most important skills.
2. Keep experience to max 3 recent roles.
3. Keep education to max 2 degrees.
4. Keep achievements to max 3 items.
5. Return ONLY the JSON object, no markdown blocks or surrounding text.

Resume Text:
${resumeText.substring(0, 4000)}
  `;

  for (const model of modelsToTry) {
    try {
      console.log(`Trying model: ${model}`);
      const response = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      });

      let content = response.choices[0].message.content;
      
      // Clean markdown if the model hallucinated it
      if (content.startsWith('```json')) {
        content = content.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (content.includes('```json')) {
        content = content.split('```json')[1].split('```')[0].trim();
      }
      
      const parsedData = JSON.parse(content);
      return parsedData;
    } catch (error) {
      console.warn(`Model ${model} failed: ${error.message}`);
      // Continue to next model
    }
  }

  throw new Error('All free AI models are currently unavailable or rate-limited. Please try again later.');
}

export async function matchJobsAndAnalyzeGaps(userSkills) {
  // Fetch active jobs with their skills
  const jobs = await prisma.job.findMany({
    where: { status: 'active' },
    select: {
      id: true,
      title: true,
      company: true,
      skills: true,
      description: true,
    }
  });

  const normalizedUserSkills = userSkills.map(s => s.toLowerCase());

  const matches = jobs.map(job => {
    // Handle Prisma Json field which might be stringified array or array
    let jobSkills = [];
    if (Array.isArray(job.skills)) {
      jobSkills = job.skills;
    } else if (typeof job.skills === 'string') {
      try { jobSkills = JSON.parse(job.skills); } catch (e) {}
    }

    if (!Array.isArray(jobSkills)) jobSkills = [];

    const normalizedJobSkills = jobSkills.map(s => typeof s === 'string' ? s.toLowerCase() : '');
    
    // Find intersection
    const matchedSkills = jobSkills.filter(s => 
      normalizedUserSkills.some(us => us.includes(s.toLowerCase()) || s.toLowerCase().includes(us))
    );
    
    const missingSkills = jobSkills.filter(s => !matchedSkills.includes(s));
    
    // Calculate Title Match Bonus (up to 30 points)
    let titleBonus = 0;
    const titleWords = job.title.toLowerCase().split(/[\s,.-]+/).filter(w => w.length > 2 && !['and', 'for', 'the', 'with', 'developer', 'engineer', 'manager'].includes(w));
    const matchedTitleWords = titleWords.filter(tw => 
      normalizedUserSkills.some(us => us.includes(tw)) || 
      jobSkills.some(js => js.toLowerCase().includes(tw) && matchedSkills.includes(js))
    );
    if (titleWords.length > 0) {
      titleBonus = Math.round((matchedTitleWords.length / titleWords.length) * 30);
    }

    // Skills Base Score (up to 70 points)
    // Penalize jobs with fewer than 4 skills so they don't get an automatic 100% just for matching 1 skill
    const effectiveJobSkillsCount = Math.max(jobSkills.length, 4);
    const skillsScore = jobSkills.length > 0 
      ? Math.round((matchedSkills.length / effectiveJobSkillsCount) * 70) 
      : 0;

    let matchScore = skillsScore + titleBonus;
    if (matchScore > 100) matchScore = 100;
    
    // Give a small bump (up to 15 points) for absolute number of matched skills to reward highly qualified candidates
    matchScore = Math.min(100, matchScore + (matchedSkills.length * 2));

    return {
      jobId: job.id,
      title: job.title,
      company: job.company,
      matchScore,
      matchedSkills,
      missingSkills
    };
  });

  // Sort by highest match score
  matches.sort((a, b) => b.matchScore - a.matchScore);
  
  return matches.slice(0, 10); // Return top 10 matches
}
