import fs from 'fs';

const file = 'views/index.ejs';
let content = fs.readFileSync(file, 'utf8');

// 1. Stats (Replace the 3 stat cards with an EJS loop)
const statsRegex = /<!-- Stat Card 1: Projects -->[\s\S]*?<!-- OUR FOOTPRINTS SECTION \(PROJECTS\) -->/;
const statsReplacement = `<% stats.forEach((stat, index) => { %>
                <div class="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                    <div class="flex justify-center items-baseline mb-2">
                        <span class="font-heading counter-value text-5xl md:text-6xl font-black text-gray-900" data-target="<%= stat.value %>">0</span>
                        <span class="font-heading text-4xl font-bold text-rota-gold ml-1">+</span>
                    </div>
                    <p class="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2"><%= stat.key %></p>
                </div>
                <% }) %>
            </div>
        </div>
    </section>

    <!-- OUR FOOTPRINTS SECTION (PROJECTS) -->`;
content = content.replace(statsRegex, statsReplacement);

// 2. Projects (Replace the hardcoded cards with an EJS loop)
const projectsRegex = /<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">[\s\S]*?<\/div>[\s]*<div class="text-center mt-12 reveal-item delay-400 flex flex-col items-center">/;
const projectsReplacement = `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
<% projects.forEach(project => { %>
<div class="reveal-item delay-100 group relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-800">
    <div class="relative h-64 overflow-hidden">
        <img src="<%= project.imageUrl %>" alt="<%= project.title %>" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div class="absolute top-4 left-4">
            <span class="bg-rota-cranberry text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md"><%= project.category %></span>
        </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-300 translate-y-6 group-hover:translate-y-0">
        <h4 class="font-heading text-2xl font-bold mb-2"><%= project.title %></h4>
        <div class="opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto transition-all duration-300 delay-100">
            <p class="text-gray-300 text-sm mb-4 leading-relaxed"><%= project.shortDescription %></p>
        </div>
    </div>
</div>
<% }) %>
</div>
            
           <div class="text-center mt-12 reveal-item delay-400 flex flex-col items-center">`;
content = content.replace(projectsRegex, projectsReplacement);

// 3. Testimonial (Replace the Premium Testimonial Card content)
const testimonialRegex = /"The dedication of the Kirtipur Rotaractors transformed our children's home\. Their library project didn't just fill empty shelves; it opened up new worlds for hundreds of students\."[\s\S]*?Chairperson, COTS Nepal<\/p>[\s\S]*?<\/div>[\s\S]*?<\/div>/;
const testimonialReplacement = `<% if (testimonials && testimonials.length > 0) { const t = testimonials[0]; %>
"<%= t.quote %>"
</p>
<div class="flex items-center pt-6 border-t border-gray-100">
    <div class="w-12 h-12 rounded-full bg-rota-gold/20 flex items-center justify-center text-rota-gold font-bold text-lg mr-4 border border-rota-gold/30">
        <%= t.authorInitials || 'RT' %>
    </div>
    <div>
        <h4 class="font-heading font-bold text-lg text-gray-900 tracking-wide"><%= t.authorName %></h4>
        <p class="text-gray-500 text-sm font-medium uppercase tracking-wider mt-0.5"><%= t.authorTitle %></p>
    </div>
</div>
<% } else { %>
"The dedication of the Kirtipur Rotaractors transformed our children's home."
</p>
<div class="flex items-center pt-6 border-t border-gray-100">
    <div class="w-12 h-12 rounded-full bg-rota-gold/20 flex items-center justify-center text-rota-gold font-bold text-lg mr-4 border border-rota-gold/30">HP</div>
    <div><h4 class="font-heading font-bold text-lg text-gray-900 tracking-wide">Hari Prasad Sharma</h4><p class="text-gray-500 text-sm font-medium uppercase tracking-wider mt-0.5">Chairperson, COTS Nepal</p></div>
</div>
<% } %>
</div>
</div>`;
content = content.replace(testimonialRegex, testimonialReplacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated EJS template');
