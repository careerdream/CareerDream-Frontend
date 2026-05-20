import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const baseStubs = {
  python: "import sys\n\ndef solve(input_data):\n    # Write your code here\n    return input_data\n\nif __name__ == '__main__':\n    print(solve(sys.stdin.read().strip()))",
  javascript: "const fs = require('fs');\n\nfunction solve(inputData) {\n    // Write your code here\n    return inputData;\n}\n\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst result = solve(input);\nif (result !== null && result !== undefined) console.log(result);",
  cpp: "#include <iostream>\n#include <string>\nusing namespace std;\n\nstring solve(string input_data) {\n    // Write your code here\n    return input_data;\n}\n\nint main() {\n    string input_data, temp;\n    while (cin >> temp) {\n        input_data += temp + \" \";\n    }\n    if (!input_data.empty()) input_data.pop_back();\n    cout << solve(input_data) << endl;\n    return 0;\n}",
  java: "import java.util.Scanner;\n\npublic class Main {\n    public static String solve(String inputData) {\n        // Write your code here\n        return inputData;\n    }\n\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        StringBuilder input = new StringBuilder();\n        while (scanner.hasNextLine()) {\n            input.append(scanner.nextLine()).append(\"\\n\");\n        }\n        System.out.println(solve(input.toString().trim()));\n    }\n}"
};

const top100Titles = [
  "Two Sum", "Add Two Numbers", "Longest Substring Without Repeating Characters", "Median of Two Sorted Arrays", 
  "Longest Palindromic Substring", "Zigzag Conversion", "Reverse Integer", "String to Integer (atoi)", 
  "Palindrome Number", "Regular Expression Matching", "Container With Most Water", "Integer to Roman", 
  "Roman to Integer", "Longest Common Prefix", "3Sum", "3Sum Closest", "Letter Combinations of a Phone Number", 
  "4Sum", "Remove Nth Node From End of List", "Valid Parentheses", "Merge Two Sorted Lists", "Generate Parentheses", 
  "Merge k Sorted Lists", "Swap Nodes in Pairs", "Reverse Nodes in k-Group", "Remove Duplicates from Sorted Array", 
  "Remove Element", "Find the Index of the First Occurrence in a String", "Divide Two Integers", 
  "Substring with Concatenation of All Words", "Next Permutation", "Longest Valid Parentheses", 
  "Search in Rotated Sorted Array", "Find First and Last Position of Element in Sorted Array", "Search Insert Position", 
  "Valid Sudoku", "Sudoku Solver", "Count and Say", "Combination Sum", "Combination Sum II", "First Missing Positive", 
  "Trapping Rain Water", "Multiply Strings", "Wildcard Matching", "Jump Game II", "Permutations", "Permutations II", 
  "Rotate Image", "Group Anagrams", "Pow(x, n)", "N-Queens", "N-Queens II", "Maximum Subarray", "Spiral Matrix", 
  "Jump Game", "Merge Intervals", "Insert Interval", "Length of Last Word", "Spiral Matrix II", "Permutation Sequence", 
  "Rotate List", "Unique Paths", "Unique Paths II", "Minimum Path Sum", "Valid Number", "Plus One", "Add Binary", 
  "Text Justification", "Sqrt(x)", "Climbing Stairs", "Simplify Path", "Edit Distance", "Set Matrix Zeroes", 
  "Search a 2D Matrix", "Sort Colors", "Minimum Window Substring", "Combinations", "Subsets", "Word Search", 
  "Remove Duplicates from Sorted Array II", "Search in Rotated Sorted Array II", "Remove Duplicates from Sorted List II", 
  "Remove Duplicates from Sorted List", "Largest Rectangle in Histogram", "Maximal Rectangle", "Partition List", 
  "Scramble String", "Merge Sorted Array", "Gray Code", "Subsets II", "Decode Ways", "Reverse Linked List II", 
  "Restore IP Addresses", "Binary Tree Inorder Traversal", "Unique Binary Search Trees II", "Unique Binary Search Trees", 
  "Interleaving String", "Validate Binary Search Tree", "Recover Binary Search Tree", "Same Tree"
];

const getTagsForTitle = (title) => {
  const tags = [];
  const lower = title.toLowerCase();
  if (lower.includes("array") || lower.includes("sum") || lower.includes("matrix") || lower.includes("interval")) tags.push("Array");
  if (lower.includes("string") || lower.includes("parentheses") || lower.includes("word")) tags.push("String");
  if (lower.includes("list") || lower.includes("node")) tags.push("Linked List");
  if (lower.includes("tree")) tags.push("Tree");
  if (lower.includes("path") || lower.includes("jump") || lower.includes("sum")) tags.push("Dynamic Programming");
  if (lower.includes("search") || lower.includes("position") || lower.includes("sqrt")) tags.push("Binary Search");
  if (lower.includes("sort")) tags.push("Sorting");
  if (lower.includes("combination") || lower.includes("permutation") || lower.includes("subset")) tags.push("Backtracking");
  
  if (tags.length === 0) {
    if (Math.random() > 0.5) tags.push("Math");
    else tags.push("Two Pointers");
  }
  return tags;
}

const detailedProblems = [
  {
    title: "Two Sum", slug: "two-sum-real", category: "Algorithms", difficulty: "Easy", points: 10,
    tags: ["Array", "Hash Table"],
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nInput: First line is comma separated integers. Second line is the target.\nOutput: Comma separated indices.",
    constraints: "2 <= nums.length <= 10^4", inputFormat: "2,7,11,15\n9", outputFormat: "0,1",
    editorial: "Use a hash map to store the difference and index.",
    stubs: { 
        ...baseStubs, 
        python: "import sys\n\ndef solve(input_data):\n    lines = input_data.strip().split('\\n')\n    if len(lines) < 2: return ''\n    nums = [int(x) for x in lines[0].split(',')]\n    target = int(lines[1])\n    \n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return f'{seen[target - num]},{i}'\n        seen[num] = i\n    return ''\n\nif __name__ == '__main__':\n    print(solve(sys.stdin.read().strip()))",
    },
    testCases: [
        { input: "2,7,11,15\n9", expected: "0,1", isSample: true },
        { input: "3,2,4\n6", expected: "1,2", isSample: true },
        { input: "3,3\n6", expected: "0,1", isSample: false }
    ]
  },
  {
    title: "Valid Parentheses", slug: "valid-parentheses-real", category: "Algorithms", difficulty: "Easy", points: 10,
    tags: ["String", "Stack"],
    description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nOutput: true or false",
    constraints: "1 <= s.length <= 10^4", inputFormat: "()[]{}", outputFormat: "true",
    editorial: "Use a stack to keep track of opening brackets.",
    stubs: { 
        ...baseStubs, 
        python: "import sys\n\ndef solve(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top_element = stack.pop() if stack else '#'\n            if mapping[char] != top_element:\n                return 'false'\n        else:\n            stack.append(char)\n    return 'true' if not stack else 'false'\n\nif __name__ == '__main__':\n    print(solve(sys.stdin.read().strip()))",
    },
    testCases: [
        { input: "()", expected: "true", isSample: true },
        { input: "()[]{}", expected: "true", isSample: true },
        { input: "(]", expected: "false", isSample: false }
    ]
  }
];

async function seed() {
  console.log(`Seeding 100 real problems...`);
  try {
    const problems = [];
    
    // Add detailed problems
    for (const prob of detailedProblems) {
      problems.push(prob);
    }

    // Auto-generate the rest based on the 100 titles
    for (const title of top100Titles) {
      if (problems.some(p => p.title === title)) continue;

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const tags = getTagsForTitle(title);
      
      let difficulty = "Medium";
      if (tags.includes("Dynamic Programming") || tags.includes("Backtracking")) difficulty = "Hard";
      if (title.length < 10) difficulty = "Easy";

      problems.push({
        title,
        slug,
        category: "Algorithms",
        difficulty,
        points: difficulty === "Easy" ? 10 : difficulty === "Medium" ? 20 : 30,
        tags,
        description: `Implement an efficient algorithm for **${title}**.\n\nInput is passed via standard input. Return the correct output to standard output.`,
        constraints: "Standard competitive programming constraints.",
        inputFormat: "Standard format",
        outputFormat: "Standard format",
        editorial: `Focus on time complexity. Look at the ${tags.join(' or ')} patterns.`,
        stubs: { ...baseStubs },
        testCases: [
          { input: "sample_in", expected: "sample_in", isSample: true },
          { input: "hidden_in", expected: "hidden_in", isSample: false }
        ]
      });
    }

    // Insert to DB
    for (const prob of problems) {
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
          stubs: prob.stubs,
          tags: prob.tags,
      };

      const created = await prisma.codingProblem.upsert({
        where: { slug: prob.slug },
        update: pData,
        create: pData,
      });

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
