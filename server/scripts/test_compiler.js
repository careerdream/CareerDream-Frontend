import { sandboxExecute } from '../services/sandboxExecutor.js';

async function test() {
  console.log("Testing JavaScript Execution...");
  const jsCode = `
    const args = process.argv?.slice(2) || [];
    console.log("Hello Sandbox!");
  `;
  const jsResult = await sandboxExecute({ language: 'javascript', code: jsCode, input: '5\n10' });
  console.log("JS Result:", jsResult);

  console.log("\nTesting Python Execution (should fail gracefully)...");
  const pyCode = `print(int(input()) + int(input()))`;
  const pyResult = await sandboxExecute({ language: 'python', code: pyCode, input: '5\n10' });
  console.log("Python Result:", pyResult);
}

test();
