import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const c = await prisma.job.count();
  console.log('Job count:', c);
}
main().catch(console.error).finally(() => prisma.$disconnect());
