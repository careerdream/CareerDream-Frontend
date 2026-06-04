import dotenv from 'dotenv';
dotenv.config();
import { parseResumeWithAI } from './services/aiService.js';

async function test() {
  try {
    const result = await parseResumeWithAI('Software Engineer with 5 years experience in React and Node.js');
    console.log(result);
  } catch(e) {
    console.error('Test Failed:', e.message);
  }
}

test();
