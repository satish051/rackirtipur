import fs from 'fs';

const file = 'views/index.ejs';
let content = fs.readFileSync(file, 'utf8');

const eventHtml = `
    <!-- UPCOMING EVENTS SECTION (TIMELINE/CARDS) -->
    <section id="events" class="py-24 bg-white relative z-10 border-t border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center mb-16 reveal-item">
                <div class="inline-flex items-center justify-center space-x-2 mb-3">
                    <span class="w-8 h-[2px] bg-rota-cranberry"></span>
                    <h2 class="font-heading text-rota-cranberry font-bold tracking-[0.2em] uppercase text-sm">
                        What's Next
                    </h2>
                    <span class="w-8 h-[2px] bg-rota-cranberry"></span>
                </div>
                <h3 class="font-heading text-3xl md:text-5xl font-extrabold text-gray-900">
                    Upcoming Events
                </h3>
            </div>

            <% if (events && events.length > 0) { %>
                <div class="max-w-4xl mx-auto">
                    <div class="space-y-6">
                        <% events.forEach((event, index) => { 
                            const dateObj = new Date(event.date);
                            const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();
                            const day = dateObj.getDate();
                            const time = dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                            const delay = (index + 1) * 100;
                        %>
                        <div class="reveal-item delay-<%= delay %> bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row items-center gap-6 group hover:-translate-y-1">
                            
                            <!-- Date Badge -->
                            <div class="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center group-hover:bg-rota-cranberry transition-colors duration-300">
                                <span class="text-rota-cranberry font-bold text-sm tracking-widest uppercase group-hover:text-white/80 transition-colors"><%= month %></span>
                                <span class="font-heading text-3xl font-black text-gray-900 group-hover:text-white transition-colors"><%= day %></span>
                            </div>

                            <!-- Event Details -->
                            <div class="flex-1 text-center md:text-left">
                                <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                    <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider"><%= event.type %></span>
                                    <span class="text-gray-400 text-sm font-medium flex items-center">
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <%= time %>
                                    </span>
                                </div>
                                <h4 class="font-heading text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-rota-cranberry transition-colors"><%= event.title %></h4>
                                <% if (event.location) { %>
                                <p class="text-gray-500 text-sm mb-3 flex items-center justify-center md:justify-start">
                                    <svg class="w-4 h-4 mr-1.5 text-rota-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    <%= event.location %>
                                </p>
                                <% } %>
                                <% if (event.description) { %>
                                <p class="text-gray-600 text-sm line-clamp-2"><%= event.description %></p>
                                <% } %>
                            </div>

                            <!-- Action -->
                            <div class="flex-shrink-0 mt-4 md:mt-0 w-full md:w-auto text-center">
                                <% if (event.rsvpLink) { %>
                                <a href="<%= event.rsvpLink %>" target="_blank" class="inline-block w-full md:w-auto px-6 py-3 bg-rota-cranberry hover:bg-gray-900 text-white font-bold rounded-xl transition-colors duration-300 shadow-lg shadow-rota-cranberry/30 hover:shadow-gray-900/30">
                                    RSVP Now
                                </a>
                                <% } else if (event.imageUrl) { %>
                                <a href="<%= event.imageUrl %>" target="_blank" class="inline-block w-full md:w-auto px-6 py-3 bg-white border-2 border-gray-200 hover:border-rota-cranberry hover:text-rota-cranberry text-gray-700 font-bold rounded-xl transition-all duration-300">
                                    View Flyer
                                </a>
                                <% } %>
                            </div>
                        </div>
                        <% }) %>
                    </div>
                </div>
            <% } else { %>
                <div class="max-w-3xl mx-auto text-center py-12 bg-gray-50 rounded-3xl border border-gray-100 border-dashed">
                    <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <h4 class="font-heading text-xl font-bold text-gray-900 mb-2">No Upcoming Events</h4>
                    <p class="text-gray-500">Check back later for new meetings and projects!</p>
                </div>
            <% } %>

        </div>
    </section>

    <!-- OUR FOOTPRINTS SECTION (PROJECTS) -->`;

content = content.replace(/<!-- OUR FOOTPRINTS SECTION \(PROJECTS\) -->/g, eventHtml);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully injected Events section!');
