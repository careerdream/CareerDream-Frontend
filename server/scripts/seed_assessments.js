import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateQuestions = (topic) => {
  const questions = [];
  let idCounter = 1;

  // Easy (34 questions)
  for (let i = 0; i < 34; i++) {
    questions.push({
      id: idCounter++,
      text: `Which of the following is a basic concept in ${topic}? (Easy Q${i + 1})`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      difficulty: 'Easy',
      explanation: `This is a fundamental concept in ${topic} that every beginner should know.`
    });
  }

  // Medium (33 questions)
  for (let i = 0; i < 33; i++) {
    questions.push({
      id: idCounter++,
      text: `How would you implement a standard design pattern in ${topic}? (Medium Q${i + 1})`,
      options: ['By using approach A', 'By using approach B', 'By using approach C', 'By using approach D'],
      correctAnswer: 1,
      difficulty: 'Medium',
      explanation: `Approach B is widely considered the standard way to handle this in ${topic}.`
    });
  }

  // Hard (33 questions)
  for (let i = 0; i < 33; i++) {
    questions.push({
      id: idCounter++,
      text: `What is the time complexity of the most optimal solution for an advanced ${topic} architecture? (Hard Q${i + 1})`,
      options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'],
      correctAnswer: 2,
      difficulty: 'Hard',
      explanation: `O(n log n) is required to optimize the advanced structures correctly in ${topic}.`
    });
  }

  return questions;
};

const assessmentsData = [
  {
    title: 'Python Programming',
    category: 'Software Engineering',
    difficulty: 'All Levels',
    duration: 60,
    badge: '🐍 Python Developer',
    color: 'from-green-500 to-emerald-700',
    skills: ['Data Types', 'OOP', 'Data Science', 'Web Dev'],
    description: 'Comprehensive assessment of Python skills from basic syntax to advanced architectural patterns. Includes 100 questions (Easy, Medium, Hard).'
  },
  {
    title: 'React.js Mastery',
    category: 'Frontend',
    difficulty: 'All Levels',
    duration: 60,
    badge: '⚛️ React Expert',
    color: 'from-blue-400 to-cyan-600',
    skills: ['Hooks', 'Context API', 'Performance', 'Architecture'],
    description: 'Test your React.js knowledge thoroughly across 100 questions covering everything from basic components to advanced rendering optimizations.'
  },
  {
    title: 'Full-Stack Architecture',
    category: 'System Design',
    difficulty: 'All Levels',
    duration: 90,
    badge: '🏗️ Architect',
    color: 'from-purple-500 to-indigo-700',
    skills: ['Microservices', 'Databases', 'API Design', 'Caching'],
    description: 'Evaluate your ability to design robust, scalable systems with this 100-question comprehensive test ranging from simple to complex scenarios.'
  },
  {
    title: 'Data Science & Machine Learning',
    category: 'AI / ML',
    difficulty: 'All Levels',
    duration: 120,
    badge: '🧠 ML Specialist',
    color: 'from-orange-500 to-red-600',
    skills: ['Statistics', 'Algorithms', 'Deep Learning', 'Data Preprocessing'],
    description: 'Prove your ML chops with 100 questions categorized into Easy, Medium, and Hard, covering theory and practical applications.'
  },
  {
    title: 'Cybersecurity Fundamentals',
    category: 'Security',
    difficulty: 'All Levels',
    duration: 60,
    badge: '🛡️ Security Pro',
    color: 'from-slate-600 to-gray-900',
    skills: ['Networking', 'Cryptography', 'Ethical Hacking', 'Threat Modeling'],
    description: 'A 100-question assessment to test your knowledge of how to protect digital assets against modern cyber threats.'
  }
];

async function main() {
  console.log('Seeding 100-question assessments into the database...');
  
  for (const data of assessmentsData) {
    const questions = generateQuestions(data.title);
    
    const existing = await prisma.assessment.findFirst({
      where: { title: data.title }
    });

    if (existing) {
      await prisma.assessment.update({
        where: { id: existing.id },
        data: {
          ...data,
          questions: questions
        }
      });
      console.log(`Updated: ${data.title} (100 Questions)`);
    } else {
      await prisma.assessment.create({
        data: {
          ...data,
          questions: questions
        }
      });
      console.log(`Created: ${data.title} (100 Questions)`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
