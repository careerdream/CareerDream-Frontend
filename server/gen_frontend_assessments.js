import fs from 'fs';
import path from 'path';

const generateQuestions = (topic) => {
  const questions = [];
  let idCounter = 1;


  for (let i = 0; i < 40; i++) {
    questions.push({
      id: idCounter++,
      question: `Which of the following is a basic concept in ${topic}? (Easy Q${i + 1})`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 0,
      difficulty: 'Easy',
      explanation: `This is a fundamental concept in ${topic} that every beginner should know.`
    });
  }

  for (let i = 0; i < 40; i++) {
    questions.push({
      id: idCounter++,
      question: `How would you implement a standard design pattern in ${topic}? (Medium Q${i + 1})`,
      options: ['By using approach A', 'By using approach B', 'By using approach C', 'By using approach D'],
      correct: 1,
      difficulty: 'Medium',
      explanation: `Approach B is widely considered the standard way to handle this in ${topic}.`
    });
  }

  for (let i = 0; i < 40; i++) {
    questions.push({
      id: idCounter++,
      question: `What is the time complexity of the most optimal solution for an advanced ${topic} architecture? (Hard Q${i + 1})`,
      options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'],
      correct: 2,
      difficulty: 'Hard',
      explanation: `O(n log n) is required to optimize the advanced structures correctly in ${topic}.`
    });
  }

  return questions;
};

const assessmentsData = [
  {
    id: 1,
    title: 'Python Programming',
    category: 'Software Engineering',
    difficulty: 'All Levels',
    duration: 60,
    badge: '🐍',
    color: 'from-green-500 to-emerald-700',
    skills: ['Data Types', 'OOP', 'Data Science', 'Web Dev'],
    avgScore: 78,
    attempts: 1205,
    description: 'Comprehensive assessment of Python skills from basic syntax to advanced architectural patterns. Includes 120 questions (Easy, Medium, Hard).'
  },
  {
    id: 2,
    title: 'React.js Mastery',
    category: 'Frontend',
    difficulty: 'All Levels',
    duration: 60,
    badge: '⚛️',
    color: 'from-blue-400 to-cyan-600',
    skills: ['Hooks', 'Context API', 'Performance', 'Architecture'],
    avgScore: 72,
    attempts: 3400,
    description: 'Test your React.js knowledge thoroughly across 120 questions covering everything from basic components to advanced rendering optimizations.'
  },
  {
    id: 3,
    title: 'Full-Stack Architecture',
    category: 'System Design',
    difficulty: 'All Levels',
    duration: 90,
    badge: '🏗️',
    color: 'from-purple-500 to-indigo-700',
    skills: ['Microservices', 'Databases', 'API Design', 'Caching'],
    avgScore: 65,
    attempts: 890,
    description: 'Evaluate your ability to design robust, scalable systems with this 120-question comprehensive test ranging from simple to complex scenarios.'
  },
  {
    id: 4,
    title: 'Data Science & ML',
    category: 'AI / ML',
    difficulty: 'All Levels',
    duration: 120,
    badge: '🧠',
    color: 'from-orange-500 to-red-600',
    skills: ['Statistics', 'Algorithms', 'Deep Learning', 'Data Preprocessing'],
    avgScore: 70,
    attempts: 2100,
    description: 'Prove your ML chops with 120 questions categorized into Easy, Medium, and Hard, covering theory and practical applications.'
  },
  {
    id: 5,
    title: 'Cybersecurity Fundamentals',
    category: 'Security',
    difficulty: 'All Levels',
    duration: 60,
    badge: '🛡️',
    color: 'from-slate-600 to-gray-900',
    skills: ['Networking', 'Cryptography', 'Ethical Hacking', 'Threat Modeling'],
    avgScore: 81,
    attempts: 1500,
    description: 'A 120-question assessment to test your knowledge of how to protect digital assets against modern cyber threats.'
  }
];

const exportData = assessmentsData.map(a => ({
  ...a,
  questions: generateQuestions(a.title)
}));

const fileContent = `export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty?: string;
}

export interface Assessment {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  duration: number;
  badge: string;
  color: string;
  skills: string[];
  avgScore: number;
  attempts: number;
  description: string;
  questions: Question[];
}

export const assessments: Assessment[] = ${JSON.stringify(exportData, null, 2)};
`;

const targetPath = path.resolve(process.cwd(), './src/app/data/assessments.ts');
fs.writeFileSync(targetPath, fileContent, 'utf8');
console.log('Successfully generated src/app/data/assessments.ts with 120 questions per assessment.');


