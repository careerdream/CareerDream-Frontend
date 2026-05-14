import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: { role: 'admin' }
  });
  
  console.log(`Found ${users.length} admin users:`);
  users.forEach(u => {
    console.log(`- ${u.name} (${u.email}), Role: ${u.role}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
