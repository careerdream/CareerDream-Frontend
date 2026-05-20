import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const domains = ['Database', 'Shell', 'Concurrency', 'JavaScript', 'Pandas'];

const domainTags = {
  'Database': ['SQL', 'Select', 'Join', 'Group By', 'Aggregate', 'Window Function'],
  'Shell': ['Bash', 'Grep', 'Awk', 'Sed', 'Pipes'],
  'Concurrency': ['Multithreading', 'Locks', 'Semaphores', 'Async/Await', 'Promises'],
  'JavaScript': ['Closures', 'Promises', 'DOM', 'Event Loop', 'Prototypal Inheritance'],
  'Pandas': ['Dataframe', 'Series', 'Merge', 'GroupBy', 'Missing Data']
};

const baseStubs = {
  python: "import sys\ndef solve(): pass",
  javascript: "function solve() { return true; }",
  cpp: "int main() { return 0; }",
  java: "public class Main { public static void main(String[] args) {} }"
};

async function seedOthers() {
  console.log("Seeding 500 problems for other domains...");
  const problems = [];

  for (const domain of domains) {
    for (let i = 1; i <= 100; i++) {
      const tags = domainTags[domain];
      const randomTag = tags[Math.floor(Math.random() * tags.length)];
      const title = `${domain} Challenge ${i}: ${randomTag} Operations`;
      const slug = `${domain.toLowerCase()}-challenge-${i}`.replace(/\//g, '');
      
      const difficulty = i <= 30 ? "Easy" : i <= 70 ? "Medium" : "Hard";
      const points = difficulty === "Easy" ? 10 : difficulty === "Medium" ? 20 : 30;
      
      problems.push({
        title,
        slug,
        category: domain,
        difficulty,
        points,
        tags: [randomTag],
        description: `Solve this ${domain} challenge focused on ${randomTag}.`,
        constraints: "Standard constraints apply.",
        inputFormat: "Standard input",
        outputFormat: "Standard output",
        editorial: `Use best practices for ${randomTag}.`,
        stubs: baseStubs,
      });
    }
  }

  for (const prob of problems) {
    const created = await prisma.codingProblem.upsert({
      where: { slug: prob.slug },
      update: prob,
      create: prob,
    });
    
    await prisma.testCase.deleteMany({ where: { problemId: created.id } });
    await prisma.testCase.create({ data: { problemId: created.id, input: "sample", expected: "sample", isSample: true } });
  }
  
  console.log("Finished seeding other domains.");
}

seedOthers().catch(e => console.error(e)).finally(() => prisma.$disconnect());
