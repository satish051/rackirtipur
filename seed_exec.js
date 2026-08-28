import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  await prisma.member.update({ where: { id: 5 }, data: { isExecutiveOfficer: true, vision: "My vision is to bridge heritage and modern youth empowerment, ensuring Kirtipur's legacy thrives.", email: 'pranishathapa106@gmail.com', phone: '+9779845212675', image: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784909570/WhatsApp_Image_2026-04-17_at_8.59.55_PM_d0rv3v.jpg' } }); 
  await prisma.member.update({ where: { id: 7 }, data: { isExecutiveOfficer: true, vision: "Fostering a culture of leadership and integrity, where every member feels valued and heard.", email: 'karkisatish372@gmail.com', phone: '+9779860361271', image: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784909570/WhatsApp_Image_2026-04-08_at_11.59.45_AM_xnccjw.jpg' } }); 
  await prisma.member.update({ where: { id: 8 }, data: { isExecutiveOfficer: true, vision: "Streamlining communication and operations to ensure our club's initiatives run flawlessly.", email: 'tisamanandhar@gmail.com', phone: '+9779803023023', image: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784909569/WhatsApp_Image_2026-06-13_at_9.58.07_AM_h2o76c.jpg' } }); 
  await prisma.member.update({ where: { id: 9 }, data: { isExecutiveOfficer: true, vision: "Ensuring financial transparency and maximizing the reach of every donation we receive.", email: 'krishalasunamofficial@gmail.com', phone: '+9779741831138', image: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784909571/WhatsApp_Image_2026-04-03_at_11.08.31_AM_s2gqqc.jpg' } });
  console.log('Done!');
}
run().finally(() => prisma.$disconnect());
