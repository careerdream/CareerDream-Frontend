import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany();
  console.log('Total courses in DB:', courses.length);
  courses.forEach(c => {
    console.log(`- ID: ${c.id}, Title: ${c.title}, Category: ${c.category}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
