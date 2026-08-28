import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.noticePopup.createMany({
    data: [
      {
        imageUrl: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1785147208/WhatsApp_Image_2026-07-27_at_11.26.09_AM_fmvjp6.jpg',
        order: 1,
        isActive: true
      },
      {
        imageUrl: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1785147615/Gemini_Generated_Image_rqrehirqrehirqre_wy9rg1.png',
        order: 2,
        isActive: true
      }
    ]
  });
  console.log('Seeded Notice Popups!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
