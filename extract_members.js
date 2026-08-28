import fs from 'fs';
import { PrismaClient } from '@prisma/client';
 // I need cheerio, let's install it or just use regex

// I will use regex since cheerio isn't installed.
const html = fs.readFileSync('index - Copy - Copy.html', 'utf8');

const boardRegex = /<!-- Board of Directors -->([\s\S]*?)<!-- General Members -->/;
const boardMatch = html.match(boardRegex);
const boardHtml = boardMatch ? boardMatch[1] : '';

const generalRegex = /<!-- General Members -->([\s\S]*?)<!-- 1\. Blood/i;
let generalMatch = html.match(/<!-- General Members -->([\s\S]*?)<div id="blood-donation-modal"/i);
if (!generalMatch) {
  // Try another bound
  generalMatch = html.match(/<!-- General Members -->([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<!--/i) || html.match(/<!-- General Members -->([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<div/i);
}
const generalHtml = generalMatch ? generalMatch[1] : '';

const memberRegex = /<p class="[^"]*text-sm[^"]*">([^<]+)<\/p>\s*<p class="[^"]*text-(?:xs|\[10px\])[^"]*">([^<]+)<\/p>/g;

const members = [];

let m;
while ((m = memberRegex.exec(boardHtml)) !== null) {
  members.push({
    name: m[1].trim(),
    role: m[2].trim(),
    isBoardMember: true
  });
}

while ((m = memberRegex.exec(generalHtml)) !== null) {
  members.push({
    name: m[1].trim(),
    role: m[2].trim(),
    isBoardMember: false
  });
}

const prisma = new PrismaClient();

async function seed() {
  await prisma.member.deleteMany({}); // clear existing
  await prisma.member.createMany({ data: members });
  console.log('Seeded ' + members.length + ' members!');
}

seed().catch(console.error).finally(() => prisma.$disconnect());
