import fs from 'fs';

const file = 'views/index.ejs';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div class="absolute inset-0 z-0 bg-\[url\('https:\/\/res\.cloudinary\.com[^']+'\)\] bg-cover bg-center bg-no-repeat bg-fixed">/;
const replacement = `<% const defaultBg = "https://res.cloudinary.com/hdakk4bs/image/upload/v1784906373/528741666_764035379480848_2838834863751290059_n_gut3kl.jpg"; %>
        <% const bgImage = (clubInfo && clubInfo.heroBackgroundImageUrl) ? clubInfo.heroBackgroundImageUrl : defaultBg; %>
        <div class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed" style="background-image: url('<%= bgImage %>');">`;

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Successfully injected dynamic hero background!');
} else {
    console.log('Regex did not match!');
}
