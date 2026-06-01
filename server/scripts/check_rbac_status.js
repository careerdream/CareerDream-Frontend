import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- Roles in Database ---');
  const roles = await prisma.adminRole.findMany();
  roles.forEach(r => {
    console.log(`ID: ${r.id}, Name: ${r.roleName}, Description: ${r.description}`);
  });

  console.log('\n--- Admin Profiles ---');
  const profiles = await prisma.adminProfile.findMany({
    include: {
      role: true
    }
  });
  
  for (const p of profiles) {
    const user = await prisma.user.findUnique({ where: { id: p.userId } });
    console.log(`User: ${user?.name} (${user?.email})`);
    console.log(`Role: ${p.role.roleName}`);
    console.log(`Status: ${p.isActive ? 'Active' : 'Inactive'}`);
    console.log('---');
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
