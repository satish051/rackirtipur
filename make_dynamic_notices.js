import fs from 'fs';

const file = 'views/index.ejs';
let content = fs.readFileSync(file, 'utf8');

const regex = /const welcomeImages = \[[\s\S]*?\];/;
const replacement = `const welcomeImages = <%- JSON.stringify(notices.map(n => n.imageUrl)) %>;`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated EJS for notices!');
