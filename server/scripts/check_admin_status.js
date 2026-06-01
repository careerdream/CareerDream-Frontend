import pkg from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function checkAdmin() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@careerdream.in' }
    });
    
    if (user) {
      console.log('✅ Admin found:');
      console.log(`   ID: ${user.id}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password hash starts with: ${user.password.substring(0, 10)}...`);
    } else {
      console.log('❌ Admin not found in database.');
    }
  } catch (error) {
    console.error('Error checking admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
