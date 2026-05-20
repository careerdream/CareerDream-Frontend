import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clean() {
  await prisma.codingProblem.deleteMany({
    where: { category: { in: ['Cloud', 'Cybersecurity', 'Web Dev'] } }
  });
  console.log('Cleaned old categories');
}
clean().catch(console.error).finally(() => prisma.$disconnect());
