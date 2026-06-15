import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function testPasswordReset() {
  try {
    // 1. Get a user
    const user = await prisma.user.findFirst();
    if (!user) {
      console.log('No user found to test with.');
      return;
    }
    console.log(`Testing with user: ${user.email}`);

    // 2. Generate a token just like auth.js does
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry }
    });
    console.log(`Set token: ${resetToken}`);
    console.log(`Token expiry: ${resetTokenExpiry.toISOString()}`);
    console.log(`Current Date: ${new Date().toISOString()}`);

    // 3. Try to find the user with the token (simulating reset-password POST)
    const foundUser = await prisma.user.findFirst({
      where: {
        resetToken: resetToken,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (foundUser) {
      console.log('SUCCESS: Token is valid and user was found!');
    } else {
      console.log('FAILED: User not found with token and valid expiry.');
      
      // Let's see what the DB actually has
      const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
      console.log(`DB Token: ${dbUser.resetToken}`);
      console.log(`DB Expiry: ${dbUser.resetTokenExpiry ? dbUser.resetTokenExpiry.toISOString() : null}`);
      console.log(`Is DB Expiry > Now? ${dbUser.resetTokenExpiry > new Date()}`);
    }
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testPasswordReset();
