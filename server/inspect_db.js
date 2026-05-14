import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const courses = await prisma.course.findMany();
  console.log("Found", courses.length, "courses");
  
  for (const course of courses) {
    console.log(`Course ID: ${course.id}, Title: "${course.title}", Instructor: "${course.instructor}"`);
  }
}

main().finally(() => prisma.$disconnect());
