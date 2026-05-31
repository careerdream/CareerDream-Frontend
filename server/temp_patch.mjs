import fs from 'fs';

let code = fs.readFileSync('generate_authentic_assessments.js', 'utf8');
code = code.replace("import fs from 'fs';", "import fs from 'fs';\nimport { PrismaClient } from '@prisma/client';\nconst prisma = new PrismaClient();\n");
code += `
;(async () => {
  for(const data of exportData) {
    const existing = await prisma.assessment.findFirst({where:{title:data.title}});
    if(existing) {
      await prisma.assessment.update({
        where:{id:existing.id},
        data: { ...data, id: undefined, questions: data.questions }
      });
      console.log("Updated " + data.title);
    } else {
      await prisma.assessment.create({
        data: { ...data, questions: data.questions }
      });
      console.log("Created " + data.title);
    }
  }
  await prisma.$disconnect();
})();
`;
fs.writeFileSync('seed_authentic_db.js', code);
console.log('Created seed_authentic_db.js');
