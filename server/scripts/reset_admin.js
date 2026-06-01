import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function resetAdmin() {
  try {
    const email = 'admin@careerdream.in';
    const password = 'Admin123!';
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role: 'admin'
      },
      create: {
        email,
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        title: 'System Administrator'
      }
    });

    console.log(`✅ Admin user ${user.email} has been reset/created.`);
    console.log(`Password set to: ${password}`);
  } catch (error) {
    console.error('Error resetting admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdmin();
