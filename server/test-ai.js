import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || 'sk-or-v1-dummy',
});

const prompt = `
You are an expert technical blog writer and IT professional.
A user has provided the following brief idea/prompt for a blog post:
"YouTube https://lnkd.in/gfwz2Pg6
WhatsApp Channel https://lnkd.in/g3jVSK3S
LinkedIn https://lnkd.in/gFhQEQZm"

Write a comprehensive, engaging IT/Tech blog post based on this idea.
Return the result STRICTLY as a JSON object with the following structure:
{
  "title": "A catchy, engaging title (max 100 chars)",
  "category": "Must be exactly one of: Indian IT, Global Tech, Career Advice, AI/ML, Cloud, Full Stack, Data Science, DevOps, Cybersecurity, IT Career, Others",
  "excerpt": "A short summary of the post (50-150 characters)",
  "content": "The detailed content of the blog post (in plain text or simple markdown, min 100 characters)"
}
`;

const modelsToTry = [
  'meta-llama/llama-3.1-8b-instruct:free',
  'microsoft/phi-3-mini-128k-instruct:free',
  'qwen/qwen-2-7b-instruct:free',
  'google/gemma-2-9b-it:free',
  'openrouter/free'
];

async function run() {
  for (const model of modelsToTry) {
    try {
      console.log(`\nTrying model: ${model}`);
      const response = await openai.chat.completions.create({
        model: model,
        messages: [{ role: 'user', content: prompt }],
      });
      const content = response.choices[0].message.content;
      console.log(`Success with ${model}: content length = ${content?.length}`);
      if (!content) console.log("CONTENT WAS NULL!");
    } catch (e) {
      console.error(`Failed with ${model}: ${e.message}`);
    }
  }
}

run();
