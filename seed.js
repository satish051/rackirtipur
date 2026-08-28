import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.stat.createMany({
    data: [
      { 
        key: 'Projects Completed', 
        value: '215',
        iconSvg: '<svg class="w-7 h-7 text-rota-cranberry" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>',
        iconBg: 'bg-rota-cranberry/10',
        iconColor: 'text-rota-cranberry',
        plusColor: 'text-rota-gold'
      },
      { 
        key: 'Active Members', 
        value: '25',
        iconSvg: '<svg class="w-7 h-7 text-rota-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
        iconBg: 'bg-rota-gold/10',
        iconColor: 'text-rota-gold',
        plusColor: 'text-rota-cranberry',
        modalId: 'members-modal',
        hoverHint: 'Click to view roster'
      },
      { 
        key: 'Volunteer Hours', 
        value: '25000',
        iconSvg: '<svg class="w-7 h-7 text-rota-cranberry" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        iconBg: 'bg-rota-cranberry/10',
        iconColor: 'text-rota-cranberry',
        plusColor: 'text-rota-gold'
      }
    ]
  });

  await prisma.project.createMany({
    data: [
      {
        title: 'Blood Donation Camp',
        category: 'Health',
        tagColorClass: 'bg-rota-cranberry text-white',
        imageUrl: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784908341/683008659_17871672663665115_6763279881399773789_n_blcsqr.jpg',
        shortDescription: 'One donation can save not just one, but three lives. Just 10 minutes of your time can give someone years to live.',
        modalId: 'blood-donation-modal'
      },
      {
        title: 'Open Mic Evening',
        category: 'Youth',
        tagColorClass: 'bg-blue-600 text-white',
        imageUrl: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784908021/725112549_1025005506717166_6403977550619771283_n_gp5xnq.jpg',
        shortDescription: "From the first mic check to the last cheer — here's a look back at the energy, the voices, and the moments that made our Open Mic Evening unforgettable.",
        modalId: 'open-mic-modal'
      },
      {
        title: 'Bagh Bhairab Cleanup',
        category: 'Environment',
        tagColorClass: 'bg-green-600 text-white',
        imageUrl: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784908546/615287567_895686256315759_4763787744417854375_n_bo3jbc.jpg',
        shortDescription: 'We united at Bagh Bhairav Temple, Kirtipur, protecting our history and proudly serving our community.',
        modalId: 'cleanup-modal'
      },
      {
        title: 'Community Support Drive',
        category: 'Public Service',
        tagColorClass: 'bg-purple-600 text-white',
        imageUrl: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784976288/528736313_767460019138384_9204066162276544847_n_zu0lqe.jpg',
        shortDescription: "Supporting menstrual health and women's empowerment through community fundraising and awareness initiatives.",
        modalId: 'support-drive-modal'
      },
      {
        title: 'Promoting literacy',
        category: 'Education',
        tagColorClass: 'bg-yellow-500 text-gray-900',
        imageUrl: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784975761/716592079_1012027151348335_7228926749422740290_ncp_xsdhzn.jpg',
        shortDescription: 'Promoting literacy and equal learning opportunities by providing books to children and fostering a culture of reading.',
        modalId: 'stationery-modal'
      },
      {
        title: 'Village Outreach',
        category: 'Rural Dev',
        tagColorClass: 'bg-teal-600 text-white',
        imageUrl: 'https://res.cloudinary.com/hdakk4bs/image/upload/v1784974334/539447116_783099207574465_7775856305912517010_n_lrpy3c.jpg',
        shortDescription: 'Supporting rural students with educational resources and career guidance to foster better learning opportunities.',
        modalId: 'outreach-modal'
      }
    ]
  });
  
  await prisma.testimonial.create({
    data: {
      quote: "The dedication of the Kirtipur Rotaractors transformed our children's home. Their library project didn't just fill empty shelves; it opened up new worlds for hundreds of students.",
      authorName: 'Hari Prasad Sharma',
      authorTitle: 'Chairperson, COTS Nepal',
      authorInitials: 'HP'
    }
  });

  await prisma.member.createMany({
    data: [
      { name: 'Rtr. Pranisha Thapa', role: 'President', isBoardMember: true },
      { name: 'Rtr. Suman Mainali', role: "Immediate Past President '25/26", isBoardMember: true },
      { name: 'Rtr. Jane Doe', role: 'General Member', isBoardMember: false },
      { name: 'Rtr. John Smith', role: 'General Member', isBoardMember: false }
    ]
  });

  console.log('Database seeded with full details!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
