import fs from 'fs';

const file = 'views/index.ejs';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Events to Desktop Navbar
content = content.replace(
  /<a href="#projects" class="nav-link text-white font-medium hover:text-rota-cranberry transition-colors duration-300 text-sm uppercase tracking-wider drop-shadow-md">Projects<\/a>/g,
  `<a href="#events" class="nav-link text-white font-medium hover:text-rota-cranberry transition-colors duration-300 text-sm uppercase tracking-wider drop-shadow-md">Events</a>
                      <a href="#projects" class="nav-link text-white font-medium hover:text-rota-cranberry transition-colors duration-300 text-sm uppercase tracking-wider drop-shadow-md">Projects</a>`
);

// 2. Add Events to Mobile Navbar
content = content.replace(
  /<li><a href="#projects" class="mobile-link block py-4 text-gray-800 font-bold hover:text-rota-cranberry hover:bg-gray-50\/50 transition-colors">Projects<\/a><\/li>/g,
  `<li><a href="#events" class="mobile-link block py-4 text-gray-800 font-bold hover:text-rota-cranberry hover:bg-gray-50/50 transition-colors">Events</a></li>
                  <li><a href="#projects" class="mobile-link block py-4 text-gray-800 font-bold hover:text-rota-cranberry hover:bg-gray-50/50 transition-colors">Projects</a></li>`
);

// 3. Make sizes more responsive for 14-inch laptops (scaling down py-24, py-28, and huge text)
content = content.replace(/py-24/g, 'py-16 md:py-20');
content = content.replace(/py-28/g, 'py-20 md:py-24');

// Scale down Hero Text
content = content.replace(
  /text-4xl sm:text-5xl lg:text-6xl/g, 
  'text-4xl sm:text-5xl lg:text-5xl xl:text-6xl'
);

// Scale down Section Headers (e.g. "Meet the Executive Officers", "Our Footprints")
content = content.replace(/text-3xl md:text-5xl/g, 'text-3xl md:text-4xl lg:text-5xl');

// Scale down Stat numbers from 5xl/6xl to 4xl/5xl
content = content.replace(
  /text-5xl md:text-6xl font-black/g, 
  'text-4xl md:text-5xl lg:text-6xl font-black'
);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated navbar and responsiveness!');
