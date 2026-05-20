import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const baseStubs = {
  python: "import sys\n\ndef solve(input_data):\n    # Write your code here\n    return input_data\n\nif __name__ == '__main__':\n    print(solve(sys.stdin.read().strip()))",
  javascript: "const fs = require('fs');\n\nfunction solve(inputData) {\n    // Write your code here\n    return inputData;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst result = solve(input);\nif (result !== null && result !== undefined) console.log(result);",
  cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstring solve(string input_data) {\n    // Write your code here\n    return input_data;\n}\n\nint main() {\n    string input_data, temp;\n    while (cin >> temp) {\n        input_data += temp + \" \";\n    }\n    if (!input_data.empty()) input_data.pop_back();\n    cout << solve(input_data) << endl;\n    return 0;\n}",
  java: "import java.util.Scanner;\n\npublic class Main {\n    public static String solve(String inputData) {\n        // Write your code here\n        return inputData;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        StringBuilder input = new StringBuilder();\n        while (scanner.hasNextLine()) {\n            input.append(scanner.nextLine()).append(\"\\n\");\n        }\n        System.out.println(solve(input.toString().trim()));\n    }\n}",
  go: "package main\n\nimport (\n\t\"fmt\"\n\t\"io/ioutil\"\n\t\"os\"\n)\n\nfunc solve(inputData string) string {\n\t// Write your code here\n\treturn inputData\n}\n\nfunc main() {\n\tinput, _ := ioutil.ReadAll(os.Stdin)\n\tfmt.Println(solve(string(input)))\n}",
  rust: "use std::io::{self, Read};\n\nfn solve(input_data: &str) -> String {\n    // Write your code here\n    input_data.to_string()\n}\n\nfn main() {\n    let mut input = String::new();\n    io::stdin().read_to_string(&mut input).unwrap();\n    println!(\"{}\", solve(input.trim()));\n}"
};

const dsaProblems = [
  {
    title: "Two Sum", slug: "two-sum", category: "Algorithms/DSA", difficulty: "Easy", points: 10,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nInput: First line is comma separated integers. Second line is the target.\nOutput: Comma separated indices.",
    constraints: "2 <= nums.length <= 10^4", inputFormat: "2,7,11,15\n9", outputFormat: "0,1",
    editorial: "Use a hash map to store the difference and index.",
    stubs: { 
        ...baseStubs, 
        python: "import sys\n\ndef solve(input_data):\n    lines = input_data.strip().split('\\n')\n    if len(lines) < 2: return ''\n    nums = [int(x) for x in lines[0].split(',')]\n    target = int(lines[1])\n    \n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return f'{seen[target - num]},{i}'\n        seen[num] = i\n    return ''\n\nif __name__ == '__main__':\n    print(solve(sys.stdin.read().strip()))",
        javascript: "const fs = require('fs');\n\nfunction solve(inputData) {\n    const lines = inputData.trim().split('\\n');\n    if(lines.length < 2) return '';\n    const nums = lines[0].split(',').map(Number);\n    const target = Number(lines[1]);\n    \n    const seen = new Map();\n    for(let i=0; i<nums.length; i++) {\n        const diff = target - nums[i];\n        if(seen.has(diff)) return `${seen.get(diff)},${i}`;\n        seen.set(nums[i], i);\n    }\n    return '';\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconsole.log(solve(input));"
    },
    testCases: [
        { input: "2,7,11,15\n9", expected: "0,1", isSample: true },
        { input: "3,2,4\n6", expected: "1,2", isSample: true },
        { input: "3,3\n6", expected: "0,1", isSample: false }
    ]
  },
  {
    title: "Reverse String", slug: "reverse-string", category: "Algorithms/DSA", difficulty: "Easy", points: 10,
    description: "Write a function that reverses a string.",
    constraints: "1 <= s.length <= 10^5", inputFormat: "hello", outputFormat: "olleh",
    editorial: "Two pointers approach.",
    stubs: { 
        ...baseStubs,
        python: "import sys\n\ndef solve(s):\n    return s[::-1]\n\nif __name__ == '__main__':\n    print(solve(sys.stdin.read().strip()))",
        javascript: "const fs = require('fs');\n\nfunction solve(s) {\n    return s.split('').reverse().join('');\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconsole.log(solve(input));"
    },
    testCases: [
        { input: "hello", expected: "olleh", isSample: true },
        { input: "world", expected: "dlrow", isSample: true },
        { input: "racecar", expected: "racecar", isSample: false }
    ]
  }
];

const cyberProblems = [
  {
    title: "XSS Detection", slug: "xss-detection", category: "Cybersecurity", difficulty: "Medium", points: 30,
    description: "Write a function to detect if a given input string contains a basic Cross-Site Scripting (XSS) payload. Return 'true' if it contains `<script>` or `javascript:`, else 'false'.",
    constraints: "Length <= 1000", inputFormat: "String", outputFormat: "true or false",
    editorial: "Check for <script> tags and javascript: URIs.",
    stubs: { 
        ...baseStubs,
        python: "import sys\n\ndef solve(s):\n    s = s.lower()\n    if '<script>' in s or 'javascript:' in s:\n        return 'true'\n    return 'false'\n\nif __name__ == '__main__':\n    print(solve(sys.stdin.read().strip()))",
        javascript: "const fs = require('fs');\n\nfunction solve(s) {\n    const lower = s.toLowerCase();\n    if (lower.includes('<script>') || lower.includes('javascript:')) return 'true';\n    return 'false';\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconsole.log(solve(input));"
    },
    testCases: [
        { input: "Hello <script>alert(1)</script>", expected: "true", isSample: true },
        { input: "Hello world", expected: "false", isSample: true },
        { input: "<a href=\"javascript:alert(1)\">Click</a>", expected: "true", isSample: false }
    ]
  }
];

const generateVariations = (baseCategory, categoryName, startId, count, diff) => {
  const problems = [];
  const points = diff === 'Easy' ? 10 : diff === 'Medium' ? 30 : 100;
  for (let i = 0; i < count; i++) {
    problems.push({
      title: `${baseCategory} Problem ${startId + i}`,
      slug: `${categoryName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-prob-${startId + i}`,
      category: categoryName,
      difficulty: diff,
      points: points,
      description: `Auto-generated ${categoryName} problem #${startId + i}. Echo the input exactly to pass.`,
      constraints: "Standard constraints apply.",
      inputFormat: "Standard input",
      outputFormat: "Standard output",
      editorial: "Think carefully about the edge cases.",
      stubs: { ...baseStubs },
      testCases: [
          { input: "test1", expected: "test1", isSample: true },
          { input: "hidden_test", expected: "hidden_test", isSample: false }
      ]
    });
  }
  return problems;
};

const allProblems = [
  ...dsaProblems,
  ...generateVariations("Array", "Algorithms/DSA", 100, 38, "Medium"),
  ...cyberProblems,
  ...generateVariations("Security", "Cybersecurity", 200, 19, "Hard"),
  ...generateVariations("Cloud", "Cloud", 300, 20, "Medium"),
  ...generateVariations("DOM", "Web Dev", 400, 20, "Easy")
];

async function seed() {
  console.log(`Seeding ${allProblems.length} playground problems...`);
  try {
    for (const prob of allProblems) {
      const pData = {
          title: prob.title,
          slug: prob.slug,
          category: prob.category,
          difficulty: prob.difficulty,
          points: prob.points,
          description: prob.description,
          constraints: prob.constraints,
          inputFormat: prob.inputFormat,
          outputFormat: prob.outputFormat,
          editorial: prob.editorial,
          stubs: prob.stubs
      };

      const created = await prisma.codingProblem.upsert({
        where: { slug: prob.slug },
        update: pData,
        create: pData,
      });

      // Avoid duplicates
      await prisma.testCase.deleteMany({ where: { problemId: created.id } });
      
      for (const tc of prob.testCases) {
          await prisma.testCase.create({ data: { problemId: created.id, input: tc.input, expected: tc.expected, isSample: tc.isSample } });
      }
    }
    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
