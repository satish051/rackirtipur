import fs from 'fs';

const file = 'views/index.ejs';
let content = fs.readFileSync(file, 'utf8');

// Replace Address Name
content = content.replace(
  />Ishaneshwor Mahadev Mandir, Kirtipur</,
  `><%= clubInfo ? clubInfo.addressName : 'Ishaneshwor Mahadev Mandir, Kirtipur' %><`
);

// Replace Address Line
content = content.replace(
  />M7RG\+8X4, Sahid Basu Smitri Marg, Kathmandu 44600</,
  `><%= clubInfo ? clubInfo.addressLine : 'M7RG+8X4, Sahid Basu Smitri Marg, Kathmandu 44600' %><`
);

// Replace Meeting Time
content = content.replace(
  />Every Sat, 8:00 AM</,
  `><%= clubInfo ? clubInfo.meetingTime : 'Every Sat, 8:00 AM' %><`
);

// Replace Email Links
content = content.replace(
  /mailto:rotaractkipu@gmail\.com/g,
  `mailto:<%= clubInfo ? clubInfo.email : 'rotaractkipu@gmail.com' %>`
);
content = content.replace(
  />rotaractkipu@gmail\.com</g,
  `><%= clubInfo ? clubInfo.email : 'rotaractkipu@gmail.com' %><`
);

// Replace Social Links
content = content.replace(
  /https:\/\/www\.facebook\.com\/rotaractkirtipur/,
  `<%= clubInfo && clubInfo.facebookUrl ? clubInfo.facebookUrl : 'https://www.facebook.com/rotaractkirtipur' %>`
);
content = content.replace(
  /https:\/\/www\.instagram\.com\/rotaract_kirtipur\//,
  `<%= clubInfo && clubInfo.instagramUrl ? clubInfo.instagramUrl : 'https://www.instagram.com/rotaract_kirtipur/' %>`
);
content = content.replace(
  /https:\/\/www\.tiktok\.com\/@rac\.kirtipur/,
  `<%= clubInfo && clubInfo.tiktokUrl ? clubInfo.tiktokUrl : 'https://www.tiktok.com/@rac.kirtipur' %>`
);
content = content.replace(
  /https:\/\/www\.linkedin\.com\/company\/rotaract-club-of-kirtipur\//,
  `<%= clubInfo && clubInfo.linkedinUrl ? clubInfo.linkedinUrl : 'https://www.linkedin.com/company/rotaract-club-of-kirtipur/' %>`
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully injected clubInfo into EJS!');
