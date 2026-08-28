import fs from 'fs';

const file = 'views/index.ejs';
let content = fs.readFileSync(file, 'utf8');

const regex = /<!-- Upgraded Grid -->\s*<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">[\s\S]*?<!-- Modal Trigger Button -->/;

const replacement = `<!-- Upgraded Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
                <% members.filter(m => m.isExecutiveOfficer).forEach((member, index) => { 
                    const delay = (index + 1) * 100;
                %>
                <!-- Board Member -->
                <div class="reveal-item delay-<%= delay %> bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col h-full hover:-translate-y-2">
                    <div class="relative w-full aspect-[4/5] overflow-hidden rounded-xl mb-4 shrink-0">
                        <img src="<%= member.image || 'https://via.placeholder.com/400x500?text=No+Image' %>" alt="<%= member.name %>" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-rota-cranberry/80 to-transparent opacity-0 group-hover:opacity-100 backdrop-blur-[2px] transition-all duration-500 flex flex-col items-center justify-end pb-8">
                            <span class="font-heading text-rota-gold font-bold text-sm tracking-[0.2em] uppercase mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Role</span>
                            <span class="font-heading text-white font-bold text-xl tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 text-center px-2"><%= member.role %></span>
                        </div>
                    </div>
                    
                    <!-- Permanently Visible Info -->
                    <div class="text-center flex-1 flex flex-col">
                        <h4 class="font-heading font-extrabold text-gray-900 text-lg mb-3"><%= member.name %></h4>
                        
                        <div class="pt-3 border-t border-gray-100 flex-1 flex flex-col">
                            <p class="text-sm text-gray-600 italic mb-4 flex-1">"<%= member.vision || 'Serving the community with passion.' %>"</p>
                            <div class="flex justify-center gap-4 mt-auto pb-2">
                                <% if (member.email) { %>
                                <a href="mailto:<%= member.email %>" title="Email" class="text-gray-400 hover:text-rota-cranberry transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></a>
                                <% } %>
                                <% if (member.phone) { %>
                                <a href="tel:<%= member.phone %>" title="Call" class="text-gray-400 hover:text-rota-blue transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></a>
                                <% } %>
                            </div>
                        </div>
                    </div>
                </div>
                <% }) %>
            </div>

            <!-- Modal Trigger Button -->`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content, 'utf8');
console.log('Successfully injected Executive Officers EJS!');
