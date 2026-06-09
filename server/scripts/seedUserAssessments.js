import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding UserAssessments...');
  
  // Get all users
  const users = await prisma.user.findMany({
    select: { id: true, name: true }
  });

  if (users.length === 0) {
    console.log('No users found in database to seed assessments.');
    return;
  }

  // Get all assessments
  const assessments = await prisma.assessment.findMany({
    select: { id: true }
  });

  if (assessments.length === 0) {
    console.log('No assessments found in database to seed.');
    return;
  }

  let count = 0;
  
  // Give each user between 1 to 5 random completed assessments
  for (const user of users) {
    const numAssessments = Math.floor(Math.random() * 5) + 1;
    
    for (let i = 0; i < numAssessments; i++) {
      const randomAssessment = assessments[Math.floor(Math.random() * assessments.length)];
      const randomScore = Math.floor(Math.random() * 40) + 60; // Random score between 60 and 100
      
      await prisma.userAssessment.create({
        data: {
          userId: user.id,
          assessmentId: randomAssessment.id,
          score: randomScore,
          progress: 'completed',
          completed_at: new Date(Date.now() - Math.random() * 10000000000) // Random time in the past
        }
      });
      count++;
    }
  }

  console.log(`Successfully seeded ${count} UserAssessment records across ${users.length} users.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
