import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const assessment = await prisma.assessment.findFirst({
    where: { title: 'SQL Fundamentals' }
  });
  if (assessment) {
    console.log('Title:', assessment.title);
    console.log('Question count:', Array.isArray(assessment.questions) ? assessment.questions.length : 'Not an array');
    if (Array.isArray(assessment.questions)) {
      console.log('First 2 questions:');
      console.log(JSON.stringify(assessment.questions.slice(0, 2), null, 2));
    }
  } else {
    console.log('SQL Fundamentals not found');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
