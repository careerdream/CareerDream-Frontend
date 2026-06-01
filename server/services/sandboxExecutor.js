import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TIMEOUT_MS = 5000;  // 5 second hard wall-clock limit
const SCRATCH_DIR = path.join(__dirname, '../scratch');

// Ensure scratch dir exists
if (!fs.existsSync(SCRATCH_DIR)) fs.mkdirSync(SCRATCH_DIR, { recursive: true });

// Judge0 Cloud config (optional — set JUDGE0_URL + JUDGE0_KEY in .env to enable)
const JUDGE0_URL = process.env.JUDGE0_URL;
const JUDGE0_KEY = process.env.JUDGE0_KEY;

// Judge0 language IDs
const JUDGE0_LANG_IDS = {
  python: 71,      // Python 3
  javascript: 63,  // Node.js
  cpp: 54,         // C++ 17
  java: 62,        // Java
  go: 60,          // Go
  rust: 73,        // Rust
  sql: 82,         // SQL (PostgreSQL)
  bash: 46,        // Bash
};

import vm from 'vm';

/**
 * Main dispatch function — uses Judge0 if configured, else local sandbox
 */
export async function sandboxExecute({ code, language, input = '' }) {
  if (JUDGE0_URL && JUDGE0_KEY) {
    return await runWithJudge0({ code, language, input });
  }
  return await runLocal({ code, language, input });
}

/**
 * Judge0 Cloud/Self-hosted execution
 */
async function runWithJudge0({ code, language, input }) {
  const langId = JUDGE0_LANG_IDS[language];
  if (!langId) return { status: 'COMPILE_ERROR', error: `Unsupported language: ${language}` };

  try {
    const submitRes = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=false&wait=true`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': JUDGE0_KEY,
      },
      body: JSON.stringify({
        source_code: code,
        language_id: langId,
        stdin: input,
        cpu_time_limit: 5,
        memory_limit: 131072,  // 128 MB
      }),
    });

    const data = await submitRes.json();
    const descId = data.status?.id;

    if (descId === 3) {
      return { status: 'SUCCESS', output: data.stdout || '', runtime: Math.round((data.time || 0) * 1000), memory: data.memory || 0 };
    } else if (descId === 4) {
      return { status: 'WRONG_ANSWER', output: data.stdout || '' };
    } else if (descId === 5) {
      return { status: 'TIME_LIMIT_EXCEEDED', error: 'Time limit exceeded' };
    } else if (descId === 6) {
      return { status: 'COMPILE_ERROR', error: data.compile_output || 'Compilation error' };
    } else {
      return { status: 'RUNTIME_ERROR', error: data.stderr || data.message || 'Runtime error' };
    }
  } catch (err) {
    console.error('Judge0 error:', err.message);
    return { status: 'RUNTIME_ERROR', error: 'Judge0 connection failed. Is the service running?' };
  }
}

/**
 * Secure local sandboxed execution
 * Only JavaScript is supported locally for security reasons.
 */
async function runLocal({ code, language, input }) {
  if (language === 'javascript') {
    return await runLocalJS(code, input);
  } else {
    // Prevent RCE: Disallow direct execution of system processes without Judge0 or Docker
    return {
      status: 'RUNTIME_ERROR',
      output: `[Security Policy] Local execution for ${language} is disabled to prevent Remote Code Execution (RCE). Please configure JUDGE0_URL in your .env file to enable secure execution for this language.`,
      runtime: 0,
      memory: 0,
    };
  }
}

function runLocalJS(code, input) {
  return new Promise((resolve) => {
    const start = Date.now();
    let outputBuffer = [];
    
    // Create a safe sandbox environment
    const sandbox = {
      console: {
        log: (...args) => outputBuffer.push(args.join(' ')),
        error: (...args) => outputBuffer.push(args.join(' ')),
        warn: (...args) => outputBuffer.push(args.join(' ')),
      },
      process: {
        stdin: {
          read: () => input
        }
      },
      Buffer: Buffer,
      Math: Math,
      JSON: JSON,
      Array: Array,
      String: String,
      Number: Number,
      Object: Object,
    };

    try {
      const script = new vm.Script(code);
      const context = vm.createContext(sandbox);
      
      // Execute the script with a 2-second timeout
      script.runInContext(context, { timeout: 2000 });
      
      const runtime = Date.now() - start;
      resolve({ 
        status: 'SUCCESS', 
        output: outputBuffer.join('\n').trim(), 
        runtime, 
        memory: 0 
      });
      
    } catch (err) {
      const runtime = Date.now() - start;
      if (err.message.includes('Script execution timed out')) {
        resolve({ status: 'TIME_LIMIT_EXCEEDED', error: 'Execution timed out', runtime });
      } else {
        resolve({ status: 'RUNTIME_ERROR', error: err.message, runtime });
      }
    }
  });
}
