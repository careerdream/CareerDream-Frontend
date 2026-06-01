// Direct DB upload script using Prisma
import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const prisma = new PrismaClient();

const questionsPath = path.resolve('C:/Users/shrey/.gemini/antigravity/brain/26db612f-eb3a-4a2c-8f12-7f4ef9508a79/playground_questions.json');
const problems = JSON.parse(readFileSync(questionsPath, 'utf-8'));

console.log(`\n🚀 Uploading ${problems.length} playground questions to database...\n`);

let added = 0;
let updated = 0;
let errors = 0;

for (const prob of problems) {
  try {
    const pData = {
      title: prob.title,
      slug: prob.slug,
      category: prob.category,
      difficulty: prob.difficulty,
      points: prob.points || 10,
      description: prob.description,
      constraints: prob.constraints || '',
      inputFormat: prob.inputFormat || '',
      outputFormat: prob.outputFormat || '',
      editorial: prob.editorial || '',
      stubs: prob.stubs || {},
      tags: prob.tags || [],
    };

    const existed = await prisma.codingProblem.findUnique({ where: { slug: prob.slug } });

    const created = await prisma.codingProblem.upsert({
      where: { slug: prob.slug },
      update: pData,
      create: pData,
    });

    if (prob.testCases && Array.isArray(prob.testCases)) {
      await prisma.testCase.deleteMany({ where: { problemId: created.id } });
      for (const tc of prob.testCases) {
        await prisma.testCase.create({
          data: {
            problemId: created.id,
            input: tc.input,
            expected: tc.expected,
            isSample: tc.isSample ?? false,
          }
        });
      }
    }

    if (existed) {
      updated++;
      console.log(`  ✏️  Updated: ${prob.title}`);
    } else {
      added++;
      console.log(`  ✅ Added:   ${prob.title}`);
    }
  } catch (err) {
    errors++;
    console.error(`  ❌ Error on "${prob.title}": ${err.message}`);
  }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`📊 Upload Complete!`);
console.log(`   ✅ Added:   ${added}`);
console.log(`   ✏️  Updated: ${updated}`);
console.log(`   ❌ Errors:  ${errors}`);
console.log(`   📝 Total:   ${problems.length}`);
console.log(`${'='.repeat(50)}\n`);

await prisma.$disconnect();
