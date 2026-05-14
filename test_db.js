import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: './server/.env' });
const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Connected to DB');
    const jobs = await prisma.job.findMany({ take: 1 });
    console.log('Jobs:', jobs);
  } catch (e) {
    console.error('Error connecting to DB:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
