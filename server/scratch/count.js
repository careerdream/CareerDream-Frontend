import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const counts = await prisma.codingProblem.groupBy({
    by: ['category'],
    _count: true
  });
  console.log('Category Counts:', counts);
  
  const total = await prisma.codingProblem.count();
  console.log('Total problems:', total);
}

main().catch(console.error).finally(() => prisma.$disconnect());
