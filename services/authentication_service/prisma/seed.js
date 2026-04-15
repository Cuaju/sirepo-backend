import 'dotenv/config';
import { PrismaClient, UserType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hashPassword } from '../src/utils/hash.js';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await hashPassword('admin123');

  const existingUser = await prisma.user.findUnique({
    where: { username: 'admin' }
  });

  if (existingUser) {
    console.log('User already exists');
    return;
  }

  const user = await prisma.user.create({
    data: {
      active: true,
      name: 'Admin User',
      password: hashedPassword,
      username: 'admin',
      usertype: UserType.ADMIN
    }
  });

  console.log('Seeded user:', user.username);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });