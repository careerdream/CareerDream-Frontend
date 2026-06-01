import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.adminRole.findMany();
  console.log(`System has ${roles.length} roles defined in the database.\n`);

  console.log('--- DEFINED ROLES ---');
  roles.forEach(r => {
    console.log(`- ${r.roleName}: ${r.description}`);
  });

  const profiles = await prisma.adminProfile.findMany({
    include: { role: true }
  });

  console.log(`\n--- ASSIGNED ADMIN USERS (${profiles.length}) ---`);
  if (profiles.length === 0) {
    console.log('No users currently assigned to these specific roles.');
  } else {
    for (const p of profiles) {
      const user = await prisma.user.findUnique({ where: { id: p.userId } });
      console.log(`- ${user?.name} (${user?.email})`);
      console.log(`  Assigned Role: ${p.role.roleName}`);
      console.log(`  Status: ${p.isActive ? 'Active' : 'Inactive'}`);
      console.log(`  Joined Admin Team: ${p.invitedAt}`);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
