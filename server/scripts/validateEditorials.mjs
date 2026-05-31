import { PrismaClient } from '@prisma/client';
import { sandboxExecute } from '../services/sandboxExecutor.js';

const prisma = new PrismaClient();

function extractCodeBlocks(markdown) {
  const blocks = [];
  const regex = /```(javascript|python)\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    blocks.push({ language: match[1], code: match[2].trim() });
  }
  return blocks;
}

async function validateEditorials() {
  const problems = await prisma.codingProblem.findMany({
    include: { testCases: true },
  });

  console.log(`Validating editorials for ${problems.length} problems...`);
  let missing = 0;
  let failed = 0;
  let passed = 0;

  for (const problem of problems) {
    if (problem.testCases.length === 0) continue;

    const blocks = problem.editorial ? extractCodeBlocks(problem.editorial) : [];
    if (blocks.length === 0) {
      console.log(`[MISSING] ${problem.slug} - No runnable editorial code found.`);
      missing++;
      
      // Inject a dummy correct solution for demonstration (in a real scenario, this would use an LLM or mapping)
      // Here, we just flag it as missing for the user to review.
      continue;
    }

    let allPassed = true;
    for (const block of blocks) {
      const stub = problem.stubs && problem.stubs[block.language];
      let runnableCode = block.code;
      if (stub) {
        // Find the function name, usually 'function solve' or 'def solve' or similar
        const isPython = block.language === 'python';
        if (isPython) {
          runnableCode = stub.replace(/def\s+[a-zA-Z0-9_]+\s*\([^)]*\):[\s\S]*?(?=\n+if\s+__name__)/, block.code + '\n');
        } else if (!isPython) {
          runnableCode = stub.replace(/function\s+[a-zA-Z0-9_]+\s*\([^)]*\)\s*\{[\s\S]*?\}(?=\s*\n+(?:const\s|let\s|var\s|module\.exports|if\s*\())/, block.code + '\n');
        }
      }

      for (const tc of problem.testCases) {
        const result = await sandboxExecute({
          code: runnableCode,
          language: block.language,
          input: tc.input
        });

        let exp = String(tc.expected).trim().replace(/\r\n/g, '\n');
        let got = String(result.output || '').trim().replace(/\r\n/g, '\n');
        
        if (got === 'True') got = 'true';
        if (got === 'False') got = 'false';

        if (result.status !== 'SUCCESS' || got !== exp) {
          console.log(`[FAILED] ${problem.slug} (${block.language})`);
          console.log(`  Expected: ${exp}`);
          console.log(`  Got: ${got}`);
          console.log(`  Error: ${result.error || result.status}`);
          allPassed = false;
          break;
        }
      }
      if (!allPassed) break;
    }

    if (allPassed) {
      passed++;
    } else {
      failed++;
    }
  }

  console.log('\n--- Validation Complete ---');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Missing Code: ${missing}`);
  
  await prisma.$disconnect();
}

validateEditorials().catch(console.error);
