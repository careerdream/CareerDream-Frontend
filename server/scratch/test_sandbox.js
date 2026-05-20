import { sandboxExecute } from '../services/sandboxExecutor.js';

async function testAll() {
  console.log("=========================================");
  console.log("STARTING SANDBOX RUNNER VERIFICATION TEST");
  console.log("=========================================");

  // 1. JavaScript Test
  console.log("\n1. Testing JavaScript Sandbox...");
  const jsCode = `
const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim();
console.log("JS RECEIVED: " + input);
`;
  const jsRes = await sandboxExecute({
    code: jsCode,
    language: 'javascript',
    input: 'Hello JS World'
  });
  console.log('Result Status:', jsRes.status);
  if (jsRes.error) console.log('Error:', jsRes.error);
  console.log('Output:', JSON.stringify(jsRes.output));
  console.log('Runtime:', jsRes.runtime, 'ms');

  // 2. Python Test
  console.log("\n2. Testing Python Sandbox...");
  const pyCode = `
import sys
input_data = sys.stdin.read().strip()
print("PYTHON RECEIVED: " + input_data)
`;
  const pyRes = await sandboxExecute({
    code: pyCode,
    language: 'python',
    input: 'Hello Python World'
  });
  console.log('Result Status:', pyRes.status);
  if (pyRes.error) console.log('Error:', pyRes.error);
  console.log('Output:', JSON.stringify(pyRes.output));
  console.log('Runtime:', pyRes.runtime, 'ms');

  // 3. SQL Test
  console.log("\n3. Testing SQL/SQLite Sandbox...");
  const sqlSetup = `
CREATE TABLE Person (personId INT, firstName VARCHAR(50), lastName VARCHAR(50));
CREATE TABLE Address (addressId INT, personId INT, city VARCHAR(50), state VARCHAR(50));
INSERT INTO Person VALUES (1, 'Allen', 'Wang');
INSERT INTO Address VALUES (1, 1, 'New York City', 'New York');
`.trim();
  const sqlCode = `
SELECT firstName, lastName, city, state FROM Person LEFT JOIN Address ON Person.personId = Address.personId;
`.trim();
  const sqlRes = await sandboxExecute({
    code: sqlCode,
    language: 'sql',
    input: sqlSetup
  });
  console.log('Result Status:', sqlRes.status);
  if (sqlRes.error) console.log('Error:', sqlRes.error);
  console.log('Output:', JSON.stringify(sqlRes.output));
  console.log('Runtime:', sqlRes.runtime, 'ms');

  // 4. Bash Test
  console.log("\n4. Testing Bash/Shell Sandbox...");
  const bashCode = `
head -n 10 | tail -n 1
`.trim();
  const bashInput = "Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10\nLine 11";
  const bashRes = await sandboxExecute({
    code: bashCode,
    language: 'bash',
    input: bashInput
  });
  console.log('Result Status:', bashRes.status);
  if (bashRes.error) console.log('Error:', bashRes.error);
  console.log('Output:', JSON.stringify(bashRes.output));
  console.log('Runtime:', bashRes.runtime, 'ms');

  // 5. Pandas Test
  console.log("\n5. Testing Pandas DataFrame Sandbox...");
  const pandasCode = `
import pandas as pd
def solve(country: pd.DataFrame) -> pd.DataFrame:
    return country[(country['area'] >= 3000000) | (country['population'] >= 25000000)][['name', 'population', 'area']]
`.trim();
  const pandasInput = JSON.stringify({
    country: [
      { name: "Afghanistan", continent: "Asia", area: 652230, population: 25500100, gdp: 20343000 },
      { name: "Albania", continent: "Europe", area: 28748, population: 2831741, gdp: 12960000 },
      { name: "Algeria", continent: "Africa", area: 2381741, population: 37100000, gdp: 188681000 }
    ]
  });
  const pandasRes = await sandboxExecute({
    code: pandasCode,
    language: 'python',
    input: pandasInput
  });
  console.log('Result Status:', pandasRes.status);
  if (pandasRes.error) console.log('Error:', pandasRes.error);
  console.log('Output:', JSON.stringify(pandasRes.output));
  console.log('Runtime:', pandasRes.runtime, 'ms');

  console.log("\n=========================================");
  console.log("SANDBOX RUNNER VERIFICATION COMPLETE");
  console.log("=========================================");
}

testAll().catch(console.error);
