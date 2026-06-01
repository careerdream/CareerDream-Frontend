import bcrypt from 'bcryptjs';
import pkg from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const createAdminUser = async () => {
  try {
    console.log('🚀 Setting up admin user...');
    
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@careerdream.in' }
    });

    if (existingAdmin) {
      // Update existing user to admin
      const updated = await prisma.user.update({
        where: { email: 'admin@careerdream.in' },
        data: { role: 'admin' }
      });
      console.log('✅ Updated existing user to admin');
      console.log(`Email: ${updated.email}`);
      console.log(`Role: ${updated.role}`);
      return;
    }

    // Create new admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin123!', salt);

    const adminUser = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@careerdream.in',
        password: hashedPassword,
        role: 'admin',
        title: 'Administrator',
        profileCompletion: 100,
        skills: ['Job Management', 'Admin Panel'],
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Admin Credentials:');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Password: Admin123!`);
    console.log(`   Role: ${adminUser.role}`);
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');
  } catch (error) {
    console.error('❌ Error setting up admin user:', error.message);
  } finally {
    await prisma.$disconnect();
  }
};

createAdminUser();
