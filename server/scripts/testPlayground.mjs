import { sandboxExecute } from '../services/sandboxExecutor.js';

async function runTest() {
  const code = `
function solve(inputData) {
    const input = JSON.parse(inputData);
    const nums = input.nums;
    const target = input.target;
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map.has(diff)) {
            return JSON.stringify([map.get(diff), i]);
        }
        map.set(nums[i], i);
    }
    return '[]';
}
`;

  // We need to provide the stub structure similar to how it's done in validateEditorials
  const fullCode = `const fs = require('fs');

${code}

const input = fs.readFileSync(0, 'utf-8').trim();
const result = solve(input);
if (result !== null && result !== undefined) console.log(result);
`;

  const input = JSON.stringify({ nums: [2, 7, 11, 15], target: 9 });
  
  console.log('Running test with input:', input);
  const result = await sandboxExecute({
    code: fullCode,
    language: 'javascript',
    input: input
  });

  console.log('\\nExecution Result:');
  console.log(result);

  const expected = '[0,1]';
  const actual = (result.output || '').trim();

  console.log('\\nValidation:');
  console.log('Expected:', expected);
  console.log('Got:', actual);
  console.log('Passed:', expected === actual);
}

runTest();
