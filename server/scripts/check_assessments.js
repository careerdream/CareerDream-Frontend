import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const assessments = await prisma.assessment.findMany({
    select: { id: true, title: true, questions: true }
  });
  console.log(`Found ${assessments.length} assessments`);
  assessments.forEach(a => {
    const qCount = Array.isArray(a.questions) ? a.questions.length : 0;
    console.log(`- ${a.title} (ID: ${a.id}): ${qCount} questions`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
