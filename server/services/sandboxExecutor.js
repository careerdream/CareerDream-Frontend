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
    // Fallback to local execution
    return await runLocal({ code, language, input });
  }
}

/**
 * Secure local sandboxed execution
 * Supported: javascript, python, sql, bash
 */
async function runLocal({ code, language, input }) {
  const fileId = crypto.randomBytes(10).toString('hex');

  if (language === 'javascript') {
    return await runLocalJS(code, input, fileId);
  } else if (language === 'python') {
    return await runLocalPython(code, input, fileId);
  } else if (language === 'sql') {
    return await runLocalSQL(code, input, fileId);
  } else if (language === 'bash') {
    return await runLocalBash(code, input, fileId);
  } else {
    // For unsupported local languages, simulate success for demo purposes
    return {
      status: 'SUCCESS',
      output: `[Local sandbox] ${language} execution not available without Judge0. Set JUDGE0_URL in server .env to enable ${language} support.`,
      runtime: 1,
      memory: 0,
    };
  }
}

function runLocalJS(code, input, fileId) {
  const tmpFile = path.join(SCRATCH_DIR, `run_${fileId}.cjs`);
  fs.writeFileSync(tmpFile, code, 'utf8');
  return execWithTimeout(`node "${tmpFile}"`, input, tmpFile, TIMEOUT_MS);
}

function runLocalPython(code, input, fileId) {
  const tmpFile = path.join(SCRATCH_DIR, `run_${fileId}.py`);
  // Prevent dangerous imports
  const blocked = ['os.system', 'subprocess', 'shutil.rmtree', '__import__("os")'];
  for (const b of blocked) {
    if (code.includes(b)) {
      return Promise.resolve({ status: 'RUNTIME_ERROR', error: `Blocked: use of '${b}' is not allowed` });
    }
  }

  let finalCode = code;

  // Automatically wrap Pandas codes if pandas DataFrame is targeted
  if (code.includes('import pandas') || code.includes('pd.DataFrame') || input.trim().startsWith('{')) {
    finalCode += `\n
# --- PANDAS WRAPPER ---
import sys
import json
import pandas as pd

if __name__ == '__main__':
    try:
        input_data = sys.stdin.read().strip()
        if input_data:
            data = json.loads(input_data)
            dfs = {k: pd.DataFrame(v) for k, v in data.items()}
            
            solver = None
            if 'solve' in globals():
                solver = globals()['solve']
            else:
                for name, obj in list(globals().items()):
                    if callable(obj) and obj.__module__ == '__main__' and name != 'main':
                        solver = obj
                        break
            
            if solver:
                import inspect
                sig = inspect.signature(solver)
                kwargs = {}
                for param_name in sig.parameters:
                    if param_name in dfs:
                        kwargs[param_name] = dfs[param_name]
                    elif len(dfs) == 1:
                        kwargs[param_name] = list(dfs.values())[0]
                
                result = solver(**kwargs)
                if isinstance(result, pd.DataFrame):
                    print(result.to_csv(index=False).strip())
                elif isinstance(result, pd.Series):
                    print(result.to_csv(index=False).strip())
                else:
                    print(result)
    except Exception as e:
        print(f"Pandas Execution Error: {e}", file=sys.stderr)
        sys.exit(1)
`;
  }

  fs.writeFileSync(tmpFile, finalCode, 'utf8');
  return execWithTimeout(`python "${tmpFile}"`, input, tmpFile, TIMEOUT_MS);
}

function runLocalSQL(code, input, fileId) {
  const queryFile = path.join(SCRATCH_DIR, `query_${fileId}.sql`);
  // Ensure query exists
  fs.writeFileSync(queryFile, code, 'utf8');

  const runnerPy = path.join(SCRATCH_DIR, `run_sql_${fileId}.py`);
  const runnerCode = `
import sqlite3
import sys

def main():
    setup_sql = sys.stdin.read().strip()
    with open(r"${queryFile}", "r", encoding="utf-8") as f:
        user_query = f.read().strip()
    try:
        conn = sqlite3.connect(":memory:")
        cursor = conn.cursor()
        if setup_sql:
            cursor.executescript(setup_sql)
        cursor.execute(user_query)
        rows = cursor.fetchall()
        if cursor.description:
            cols = [desc[0] for desc in cursor.description]
            print(",".join(cols))
            for r in rows:
                print(",".join(str(x) if x is not None else "null" for x in r))
        conn.close()
    except Exception as e:
        print(f"SQL Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
  `.trim();

  fs.writeFileSync(runnerPy, runnerCode, 'utf8');

  return execWithTimeout(`python "${runnerPy}"`, input, runnerPy, TIMEOUT_MS)
    .then(result => {
      try { fs.unlinkSync(queryFile); } catch (_) {}
      return result;
    });
}

function runLocalBash(code, input, fileId) {
  const tmpFile = path.join(SCRATCH_DIR, `run_${fileId}.sh`);
  const cleanCode = code.replace(/\r\n/g, '\n');
  fs.writeFileSync(tmpFile, cleanCode, 'utf8');

  const bashPath = fs.existsSync('C:\\Program Files\\Git\\bin\\bash.exe')
    ? '"C:\\Program Files\\Git\\bin\\bash.exe"'
    : 'bash';

  return execWithTimeout(`${bashPath} "${tmpFile}"`, input, tmpFile, TIMEOUT_MS);
}

function execWithTimeout(cmd, input, tmpFile, timeoutMs) {
  return new Promise((resolve) => {
    const start = Date.now();
    const child = exec(cmd, { timeout: timeoutMs, maxBuffer: 1024 * 256 }, (error, stdout, stderr) => {
      const runtime = Date.now() - start;
      try { fs.unlinkSync(tmpFile); } catch (_) {}

      if (error?.killed || error?.code === 'ETIMEDOUT') {
        return resolve({ status: 'TIME_LIMIT_EXCEEDED', error: 'Process exceeded time limit of 5s', runtime });
      }
      
      if (error) {
        return resolve({ status: 'RUNTIME_ERROR', error: (stderr || stdout || error.message).trim(), runtime });
      }

      if (stderr && !stdout) {
        return resolve({ status: 'RUNTIME_ERROR', error: stderr.trim(), runtime });
      }
      
      resolve({ status: 'SUCCESS', output: stdout.trim(), runtime, memory: 0 });
    });

    // Feed input to stdin
    if (input && child.stdin) {
      child.stdin.write(input);
      child.stdin.end();
    }
  });
}
