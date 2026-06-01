import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const user = await prisma.user.findUnique({
  where: { email: 'admin@careerdream.in' }
});

console.log('User from DB:', JSON.stringify(user, null, 2));
await prisma.$disconnect();
