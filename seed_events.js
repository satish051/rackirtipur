import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  await prisma.event.createMany({
    data: [
      {
        title: 'Weekly General Meeting',
        date: tomorrow,
        location: 'Ishaneshwor Mahadev Mandir, Kirtipur',
        description: 'Join us for our weekly general meeting to discuss upcoming projects and fellowship activities.',
        type: 'Meeting',
      },
      {
        title: 'Blood Donation Camp Planning',
        date: nextWeek,
        location: 'Rotaract Club Office',
        description: 'Planning meeting for the upcoming massive blood donation drive.',
        type: 'Project',
        rsvpLink: 'https://forms.google.com/sample',
      }
    ]
  });
  console.log('Seeded Events!');
}
run().finally(() => prisma.$disconnect());
