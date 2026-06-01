import prisma from './lib/prisma.js';

async function balanceAssessments() {
  console.log('🚀 Starting Assessment Rebalancing (Goal: 120 Questions - 40/40/40)...');

  try {
    const assessments = await prisma.assessment.findMany();

    for (const assessment of assessments) {
      console.log(`\n📄 Balancing: ${assessment.title} (ID: ${assessment.id})`);
      
      let questions = assessment.questions || [];
      const difficulties = ['Easy', 'Medium', 'Hard'];
      let balancedQuestions = [];

      for (const diff of difficulties) {
        let diffQuestions = questions.filter(q => q.difficulty === diff);
        console.log(`   - Current ${diff}: ${diffQuestions.length}`);

        if (diffQuestions.length > 40) {
          // Truncate
          diffQuestions = diffQuestions.slice(0, 40);
        } else if (diffQuestions.length < 40) {
          // Pad with placeholders
          const needed = 40 - diffQuestions.length;
          console.log(`   - Adding ${needed} placeholder questions for ${diff}`);
          
          for (let i = 0; i < needed; i++) {
            const baseIndex = i % (diffQuestions.length || 1);
            const baseQ = diffQuestions[baseIndex] || {
              text: `New ${diff} Question ${i + 1}`,
              options: ['Option A', 'Option B', 'Option C', 'Option D'],
              correctAnswer: 0,
              explanation: 'This is a balanced question.'
            };

            diffQuestions.push({
              ...baseQ,
              id: 1000 + balancedQuestions.length + diffQuestions.length + i, // Unique ID
              text: `${baseQ.text || baseQ.question} (Balanced ${i + 1})`,
              difficulty: diff
            });
          }
        }
        
        balancedQuestions = balancedQuestions.concat(diffQuestions);
      }

      await prisma.assessment.update({
        where: { id: assessment.id },
        data: { 
          questions: balancedQuestions 
        }
      });
      
      console.log(`   ✅ Success! New Total: ${balancedQuestions.length} (40/40/40)`);
    }

    console.log('\n✨ All assessments rebalanced successfully!');
  } catch (error) {
    console.error('❌ Rebalancing failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

balanceAssessments();
