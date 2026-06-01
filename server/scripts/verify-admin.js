import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function verifyAdmin() {
  try {
    const adminUsers = await prisma.user.findMany({ 
      where: { role: "admin" },
      select: { id: true, email: true, role: true }
    });
    console.log("Admin users in database:");
    console.log(JSON.stringify(adminUsers, null, 2));
  } catch (e) {
    console.error("Error:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

verifyAdmin();
