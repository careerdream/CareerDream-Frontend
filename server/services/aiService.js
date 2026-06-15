import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

let openaiInstance = null;

function getOpenAIClient() {
  if (!openaiInstance) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey || apiKey === 'sk-or-v1-dummy') {
      console.error('CRITICAL: OPENROUTER_API_KEY is missing from environment variables.');
    }
    
    openaiInstance = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: apiKey || 'sk-or-v1-dummy',
    });
  }
  return openaiInstance;
}

export async function parseResumeWithAI(resumeText) {
  const modelsToTry = [
    'google/gemini-2.0-flash-lite-preview-02-05:free', // Extremely fast model
    'openrouter/free',
    'openrouter/free',
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
  "achievements": ["Key achievement 1", "Key achievement 2"],
  "atsScore": 85, 
  "keywordMatch": 75, 
  "readinessScore": 80, 
  "missingSkills": ["List of missing IT skills"],
  "formatIssues": ["List of formatting issues"],
  "recommendedCourseKeywords": ["cloud", "devops"] 
}

Guidelines for extreme speed:
1. Extract a maximum of 20 most important skills.
2. Keep experience to max 3 recent roles.
3. Keep education to max 2 degrees.
4. Keep achievements to max 3 items.
5. Provide realistic, critical ATS scores (out of 100).
6. Return ONLY the JSON object, no markdown blocks or surrounding text.

Resume Text:
${resumeText.substring(0, 4000)}
  `;

  for (const model of modelsToTry) {
    try {
      console.log(`Trying model: ${model}`);
      const openai = getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      });

      let content = response.choices[0].message.content;
      
      if (!content) {
        throw new Error('AI returned an empty or blocked response.');
      }
      
      // Clean markdown and extra text
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        content = content.substring(firstBrace, lastBrace + 1);
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

export async function generateBlogPost(userPrompt) {
  const modelsToTry = [
    'google/gemini-2.0-flash-lite-preview-02-05:free',
    'openrouter/free',
    'openrouter/free',
    'openrouter/free'
  ];

  const prompt = `
You are an expert technical blog writer and IT professional.
A user has provided the following brief idea/prompt for a blog post:
"${userPrompt}"

Write a comprehensive, engaging IT/Tech blog post based on this idea.
Return the result STRICTLY as a JSON object with the following structure:
{
  "title": "A catchy, engaging title (max 100 chars)",
  "category": "Must be exactly one of: Indian IT, Global Tech, Career Advice, AI/ML, Cloud, Full Stack, Data Science, DevOps, Cybersecurity, IT Career, Others",
  "excerpt": "A short summary of the post (50-150 characters)",
  "content": "The detailed content of the blog post (in plain text or simple markdown, min 100 characters)"
}

Guidelines:
1. Ensure the JSON is valid and well-formed.
2. Return ONLY the JSON object, no markdown code blocks wrapping the JSON (e.g., no \`\`\`json), and no conversational text.
3. Make the content professional yet engaging, suitable for a tech career platform.
  `;

  let lastError;
  for (const model of modelsToTry) {
    try {
      console.log(`Trying model: ${model} for blog generation`);
      const openai = getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      });

      let content = response.choices[0].message.content;
      
      if (!content) {
        throw new Error('AI returned an empty or blocked response.');
      }
      
      // Clean markdown and extra text
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        content = content.substring(firstBrace, lastBrace + 1);
      }
      
      const parsedData = JSON.parse(content);
      return parsedData;
    } catch (error) {
      console.warn(`Model ${model} failed for blog generation: ${error.message}`);
      lastError = error;
      // Continue to next model
    }
  }

  throw new Error(lastError ? `AI Error: ${lastError.message}` : 'AI models are currently unavailable. Please try again later.');
}

export async function generateJobPost(userPrompt) {
  const modelsToTry = [
    'google/gemini-2.0-flash-lite-preview-02-05:free',
    'openrouter/free',
    'openrouter/free',
    'openrouter/free'
  ];

  const prompt = `
You are an expert technical recruiter and HR specialist.
A user has provided the following brief requirement for a job posting:
"${userPrompt}"

Write a comprehensive, professional job posting based on this idea.
Return the result STRICTLY as a JSON object with the following structure:
{
  "title": "A professional job title (e.g., Senior Full Stack Developer)",
  "companyName": "The name of the company hiring, if provided",
  "location": "The location of the job, if provided (e.g., Bengaluru, Remote)",
  "locationType": "Must be exactly one of: 'Remote', 'On-site', 'Hybrid'",
  "description": "A brief overview of the role (min 200 characters). Do NOT include responsibilities or requirements here.",
  "responsibilities": ["List", "of", "key", "responsibilities"],
  "requirements": ["List", "of", "key", "requirements", "and", "qualifications"],
  "benefits": ["List", "of", "perks", "and", "benefits"],
  "skills": ["Array", "of", "5-8", "relevant", "technical", "skills"],
  "experienceLevel": "Must be exactly one of: 'Fresher', '0-2 years', '2-5 years', '5-10 years', '10+ years'",
  "salaryMin": "Estimated minimum salary in numbers (e.g., 500000)",
  "salaryMax": "Estimated maximum salary in numbers (e.g., 1500000)",
  "externalUrl": "The direct apply link or company website URL, if provided"
}

Guidelines:
1. Ensure the JSON is valid and well-formed.
2. Return ONLY the JSON object, no markdown code blocks wrapping the JSON (e.g., no \`\`\`json), and no conversational text.
3. Make the description professional and engaging.
4. Base salary estimates on typical Indian tech industry standards (INR) if not provided by the user. If the user provides a figure like "12 LPA", translate it to 1200000.
  `;

  let lastError;
  for (const model of modelsToTry) {
    try {
      console.log(`Trying model: ${model} for job generation`);
      const openai = getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      });

      let content = response.choices[0].message.content;
      
      if (!content) {
        throw new Error('AI returned an empty or blocked response.');
      }
      
      // Clean markdown and extra text
      const firstBrace = content.indexOf('{');
      const lastBrace = content.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        content = content.substring(firstBrace, lastBrace + 1);
      }
      
      const parsedData = JSON.parse(content);
      
      // Ensure arrays are arrays
      if (!Array.isArray(parsedData.skills)) parsedData.skills = [];
      if (!Array.isArray(parsedData.responsibilities)) parsedData.responsibilities = [];
      if (!Array.isArray(parsedData.requirements)) parsedData.requirements = [];
      if (!Array.isArray(parsedData.benefits)) parsedData.benefits = [];
      
      return parsedData;
    } catch (error) {
      console.warn(`Model ${model} failed for job generation: ${error.message}`);
      lastError = error;
    }
  }

  throw new Error(lastError ? `AI Error: ${lastError.message}` : 'AI models are currently unavailable. Please try again later.');
}

export async function evaluateCandidatesForJob(job, candidates) {
  const modelsToTry = [
    'google/gemini-2.0-flash-lite-preview-02-05:free',
    'openrouter/free',
    'openrouter/free'
  ];

  const prompt = `
You are an expert technical recruiter matching candidates to a job.
Job Details:
Title: ${job.title}
Skills Required: ${job.skills.join(', ')}

Candidates:
${candidates.map(c => `ID: ${c.id}\nName: ${c.name}\nSkills: ${(c.skills || []).join(', ')}`).join('\n\n')}

For each candidate, provide a semantic match score (0-100) and a brief 1-2 sentence reasoning on why they are or are not a good fit.
Return the result STRICTLY as a JSON array of objects with the following structure:
[
  {
    "candidateId": "id-from-input",
    "matchScore": 85,
    "aiReasoning": "Strong match due to overlapping skills in React and Node.js. Lacks explicit AWS experience."
  }
]

Guidelines:
1. Return ONLY the JSON array, no markdown blocks.
2. Be critical and objective in your scoring.
  `;

  let lastError;
  for (const model of modelsToTry) {
    try {
      console.log(`Trying model: ${model} for candidate evaluation`);
      const openai = getOpenAIClient();
      const response = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      });

      let content = response.choices[0].message.content;
      
      const firstBracket = content.indexOf('[');
      const lastBracket = content.lastIndexOf(']');
      if (firstBracket !== -1 && lastBracket !== -1) {
        content = content.substring(firstBracket, lastBracket + 1);
      }
      
      return JSON.parse(content);
    } catch (error) {
      console.warn(`Model ${model} failed for evaluation: ${error.message}`);
      lastError = error;
    }
  }

  throw new Error(lastError ? `AI Error: ${lastError.message}` : 'AI models are currently unavailable. Please try again later.');
}
