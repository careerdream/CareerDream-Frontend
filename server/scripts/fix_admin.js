import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const password = 'admin123';
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@careerdream.in' },
    update: {
      password: hashedPassword,
      role: 'admin'
    },
    create: {
      name: 'CareerDream Admin',
      email: 'admin@careerdream.in',
      password: hashedPassword,
      role: 'admin'
    }
  });
  
  console.log(`Admin user updated/created: ${user.email}`);
  console.log(`Password is set to: ${password}`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
