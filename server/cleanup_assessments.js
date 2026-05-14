import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up assessments table...');
  await prisma.assessment.deleteMany({});
  console.log('Cleanup complete.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
