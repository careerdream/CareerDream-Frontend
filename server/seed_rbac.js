import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const DEFAULT_ROLES = [
  {
    roleName: 'super_admin',
    description: 'Full platform access. Can manage admins and system settings.',
    isDefault: true,
    permissions: {
      users:       { read: true, create: true, update: true, delete: true, ban: true, suspend: true },
      recruiters:  { read: true, create: true, update: true, delete: true, verify: true },
      jobs:        { read: true, create: true, update: true, delete: true, feature: true },
      courses:     { read: true, create: true, update: true, delete: true, publish: true },
      assessments: { read: true, create: true, update: true, delete: true, publish: true },
      blog:        { read: true, create: true, update: true, delete: true, publish: true, moderate: true },
      analytics:   { read: true },
      settings:    { read: true, update: true, execute: true },
      reports:     { read: true, create: true, export: true },
      admins:      { read: true, create: true, update: true, delete: true }
    }
  },
  {
    roleName: 'content_admin',
    description: 'Manage Courses, Assessments, Blog. No user or settings access.',
    isDefault: true,
    permissions: {
      courses:     { read: true, create: true, update: true, delete: true, publish: true },
      assessments: { read: true, create: true, update: true, delete: true, publish: true },
      blog:        { read: true, create: true, update: true, delete: true, publish: true, moderate: true },
      analytics:   { read: true }
    }
  },
  {
    roleName: 'job_admin',
    description: 'Manage Job Postings and Applications only.',
    isDefault: true,
    permissions: {
      jobs:      { read: true, create: true, update: true, delete: true, feature: true },
      analytics: { read: true }
    }
  },
  {
    roleName: 'user_support',
    description: 'Manage User Accounts. Cannot delete data or modify settings.',
    isDefault: true,
    permissions: {
      users:     { read: true, update: true, ban: true, suspend: true },
      analytics: { read: true }
    }
  },
  {
    roleName: 'recruiter_manager',
    description: 'Manage Recruiters, Verify, and view Job Postings.',
    isDefault: true,
    permissions: {
      recruiters: { read: true, update: true, verify: true },
      jobs:       { read: true }
    }
  },
  {
    roleName: 'analytics_admin',
    description: 'View-only access to Analytics and Reports.',
    isDefault: true,
    permissions: {
      analytics: { read: true },
      reports:   { read: true, export: true }
    }
  }
];

async function main() {
  console.log('Seeding RBAC roles...');
  for (const role of DEFAULT_ROLES) {
    await prisma.adminRole.upsert({
      where: { roleName: role.roleName },
      update: { description: role.description, permissions: role.permissions },
      create: role
    });
  }
  console.log('Roles seeded.');

  const adminEmail = 'admin@careerdream.in';
  console.log(`Promoting \${adminEmail} to Super Admin...`);
  
  const user = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!user) {
    console.error(`User with email \${adminEmail} not found. Please register this user first.`);
    process.exit(1);
  }

  const superAdminRole = await prisma.adminRole.findUnique({ where: { roleName: 'super_admin' } });
  
  await prisma.user.update({
    where: { id: user.id },
    data: { role: 'admin' }
  });

  await prisma.adminProfile.upsert({
    where: { userId: user.id },
    update: { roleId: superAdminRole.id, isActive: true },
    create: { userId: user.id, roleId: superAdminRole.id, isActive: true }
  });

  console.log(`Successfully promoted \${adminEmail} to Super Admin.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
