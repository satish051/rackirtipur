import 'dotenv/config';
import * as url from 'url';
import express from 'express';
import session from 'express-session';
import AdminJS, { ComponentLoader } from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/prisma';
import { PrismaClient, Prisma } from '@prisma/client';
import { notifyMembersOfNewEvent } from './notifier.js';
import nodemailer from 'nodemailer';

AdminJS.registerAdapter({
  Resource,
  Database,
});

const prisma = new PrismaClient();

const getModelByName = (name) => Prisma.dmmf.datamodel.models.find(m => m.name === name);

const start = async () => {
  const app = express();
  
  app.set('view engine', 'ejs');
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));

  

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const componentLoader = new ComponentLoader();
const Components = {
    Dashboard: componentLoader.add('Dashboard', `${__dirname}components/Dashboard`)
};

  const admin = new AdminJS({
    
    componentLoader,
    dashboard: {
      component: Components.Dashboard,
      handler: async () => {
        const membersCount = await prisma.member.count();
        const projectsCount = await prisma.project.count();
        const eventsCount = await prisma.event.count();
        const messagesCount = await prisma.contactMessage.count({ where: { isRead: false } });
        const recentMessages = await prisma.contactMessage.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        });
        
        return { membersCount, projectsCount, eventsCount, messagesCount, recentMessages };
      }
    },

    resources: [
      {
        resource: { model: getModelByName('Project'), client: prisma },
        options: { navigation: { name: 'Content' } }
      },
      {
        resource: { model: getModelByName('Stat'), client: prisma },
        options: { navigation: { name: 'Content' } }
      },
      {
        resource: { model: getModelByName('Testimonial'), client: prisma },
        options: { navigation: { name: 'Content' } }
      },
      {
        resource: { model: getModelByName('Member'), client: prisma },
        options: { navigation: { name: 'Content' } }
      },
      {
        resource: { model: getModelByName('Event'), client: prisma },
        options: { 
          navigation: { name: 'Content' },
          actions: {
            new: {
              after: async (response, request, context) => {
                // If the event was successfully created via POST
                if (request.method === 'post' && response.record && !response.record.errors) {
                   const newEvent = response.record.params;
                   // Trigger the notification system in the background
                   notifyMembersOfNewEvent(newEvent).catch(console.error);
                }
                return response;
              }
            }
          }
        }
      },
      {
        resource: { model: getModelByName('NoticePopup'), client: prisma },
        options: { navigation: { name: 'Content' } }
      },
      {
        resource: { model: getModelByName('ClubInfo'), client: prisma },
        options: { navigation: { name: 'Settings' } }
      },
      {
        resource: { model: getModelByName('GalleryCard'), client: prisma },
        options: { navigation: { name: 'Content' } }
      },
      {
        resource: { model: getModelByName('ContactMessage'), client: prisma },
        options: {
          navigation: { name: 'Communications' },
          properties: {
            message: { type: 'textarea', isVisible: { list: false, show: true, edit: false, filter: true } },
            name: { isVisible: { edit: false, list: true, show: true, filter: true } },
            email: { isVisible: { edit: false, list: true, show: true, filter: true } },
            createdAt: { isVisible: { edit: false, list: true, show: true, filter: true } }
          }
        }
      },
      {
        resource: { model: getModelByName('BulkEmail'), client: prisma },
        options: {
          navigation: { name: 'Communications' },
          properties: {
            body: { type: 'textarea' },
            sentTo: { isVisible: { edit: false, filter: true, list: true, show: true } },
            sentAt: { isVisible: { edit: false, filter: true, list: true, show: true } },
          },
          actions: {
            new: {
              after: async (response, request, context) => {
                if (request.method === 'post' && response.record && !Object.keys(response.record.errors || {}).length) {
                  try {
                    const emailConfig = await prisma.emailConfig.findFirst();
                    if (!emailConfig || !emailConfig.emailAddress || !emailConfig.appPassword) {
                      response.notice = { message: 'Saved, but NOT sent because EmailConfig is missing/incomplete.', type: 'error' };
                      return response;
                    }

                    const members = await prisma.member.findMany({ 
                      where: { 
                        email: { not: null, not: "" }, 
                        receiveNotifications: true 
                      } 
                    });

                    const transporter = nodemailer.createTransport({
                      host: emailConfig.smtpHost || 'smtp.gmail.com',
                      port: emailConfig.smtpPort || 465,
                      secure: true,
                      auth: { user: emailConfig.emailAddress, pass: emailConfig.appPassword }
                    });
                    
                    let count = 0;
                    for (const member of members) {
                      if (!member.email) continue;
                      try {
                        await transporter.sendMail({
                          from: `"Rotaract Club" <${emailConfig.emailAddress}>`,
                          to: member.email,
                          subject: response.record.params.subject,
                          text: `Dear ${member.name},\n\n${response.record.params.body}\n\n--\nRotaract Club Admin System`
                        });
                        count++;
                      } catch (err) {
                        console.error('Failed to send to', member.email, err.message);
                      }
                    }
                    
                    // Update the sentTo count in DB safely
                    const recordId = response.record.id || response.record.params.id;
                    if (recordId && !isNaN(parseInt(recordId))) {
                      try {
                        await prisma.bulkEmail.update({
                          where: { id: parseInt(recordId) },
                          data: { sentTo: count }
                        });
                      } catch (dbErr) {
                        console.error("Could not update BulkEmail record in DB (might not exist yet):", dbErr.message);
                      }
                    } else {
                      console.error("BulkEmail ID not found in response record!");
                    }
                    
                    response.record.params.sentTo = count;
                    response.notice = { message: `Bulk email sent successfully to ${count} members!`, type: 'success' };
                  } catch (globalErr) {
                    console.error('Bulk Email Error:', globalErr);
                    response.notice = { message: 'Error sending emails: ' + globalErr.message, type: 'error' };
                  }
                }
                return response;
              }
            }
          }
        }
      },
      {
        resource: { model: getModelByName('EmailConfig'), client: prisma },
        options: {
          navigation: { name: 'Settings' },
          actions: {
            sendTestEmail: {
              actionType: 'record',
              icon: 'Mail',
              handler: async (request, response, context) => {
                const { record } = context;
                const emailConfig = record.params;
                
                try {
                  const transporter = nodemailer.createTransport({
                    host: emailConfig.smtpHost || 'smtp.gmail.com',
                    port: emailConfig.smtpPort || 465,
                    secure: true,
                    auth: {
                      user: emailConfig.emailAddress,
                      pass: emailConfig.appPassword,
                    },
                  });

                  await transporter.sendMail({
                    from: `"Rotaract Admin System" <${emailConfig.emailAddress}>`,
                    to: emailConfig.emailAddress,
                    subject: 'Test Email from Rotaract Kirtipur Admin Panel',
                    text: 'Congratulations! Your email connection is set up successfully.',
                  });

                  return {
                    record: record.toJSON(context.currentAdmin),
                    notice: { message: 'Test email sent successfully! Please check your inbox.', type: 'success' },
                  };
                } catch (error) {
                  return {
                    record: record.toJSON(context.currentAdmin),
                    notice: { message: 'Failed to send test email: ' + error.message, type: 'error' },
                  };
                }
              },
              component: false, // Prevents AdminJS from looking for a React component
            }
          }
        }
      },
      {
        resource: { model: getModelByName('FamilyClub'), client: prisma },
        options: { navigation: { name: 'Rotary Family' } }
      },
    ],
    branding: {
      companyName: 'Rotaract Kirtipur',
      logo: '/logo.png',
      favicon: '/logo.png',
      softwareBrothers: false,
      theme: {
        colors: {
          primary100: '#d91b5c',
          primary80: '#e54d80',
          primary60: '#ee779e',
          primary40: '#f5a3bd',
          primary20: '#fbd1dd',
          accent: '#f7a81b',
        }
      }
    },
    locale: {
      translations: {
        en: {
          labels: {
            Project: 'Project',
            Content: 'Content',
            Stat: 'Stat',
            Testimonial: 'Testimonial',
            Member: 'Member',
            Event: 'Event',
            NoticePopup: 'Notice Popup',
            ClubInfo: 'Club Info',
            Settings: 'Settings',
            GalleryCard: 'Gallery Card',
            BulkEmail: 'Bulk Email',
            Communications: 'Communications',
            EmailConfig: 'Email Config',
            FamilyClub: 'Family Club',
            'Rotary Family': 'Rotary Family',
            ContactMessage: 'Inbox (Contact Form)'
          }
        }
      }
    },
    assets: {
      styles: ['/admin-custom.css']
    },
    rootPath: '/admin',
  });

  const DEFAULT_ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'password123',
  };

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
      if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        return DEFAULT_ADMIN;
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: process.env.COOKIE_PASSWORD || 'rotaract-kirtipur-super-secret-cookie-password-change-this',
  }, null, {
    resave: false,
    saveUninitialized: true,
    secret: process.env.COOKIE_PASSWORD || 'rotaract-kirtipur-super-secret-cookie-password-change-this',
  });

  app.use(admin.options.rootPath, adminRouter);
  
  if (process.env.NODE_ENV !== 'production') {
    admin.watch();
  }

  // Main route
  
  app.post('/api/contact', async (req, res) => {
      try {
      const { name, email, message } = req.body;
      
      // Save message to database so admin has a permanent inbox
      await prisma.contactMessage.create({
        data: { name, email, message }
      });

      const config = await prisma.emailConfig.findFirst();
      
      if (!config || !config.emailAddress || !config.appPassword) {
        console.warn('Email system is not configured yet. Message saved to DB only.');
        return res.status(200).json({ success: true, message: 'Message saved successfully (Email not configured).' });
      }

      const transporter = nodemailer.createTransport({
        host: config.smtpHost || 'smtp.gmail.com',
        port: config.smtpPort || 465,
        secure: true,
        auth: {
          user: config.emailAddress,
          pass: config.appPassword,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${config.emailAddress}>`,
        replyTo: email,
        to: config.emailAddress,
        subject: `New Contact Message from ${name}`,
        text: `You received a new message via the Rotaract Kirtipur website:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      });

      res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Contact Form Error:', error);
      res.status(500).json({ error: 'Failed to send message.' });
    }
  });

  app.get('/', async (req, res) => {
    try {
      const projects = await prisma.project.findMany();
      const stats = await prisma.stat.findMany();
      const testimonials = await prisma.testimonial.findMany();
      const members = await prisma.member.findMany();
      const notices = await prisma.noticePopup.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
      });
      const clubInfos = await prisma.clubInfo.findMany();
      
      const events = await prisma.event.findMany({
        where: { date: { gte: new Date() } },
        orderBy: { date: 'asc' },
        take: 4
      });
      
      const galleryCards = await prisma.galleryCard.findMany({
        orderBy: { order: 'asc' }
      });
      
      const familyClubs = await prisma.familyClub.findMany();
      
      const defaultStats = [
        { key: 'Projects Completed', value: '215' },
        { key: 'Active Members', value: '25' },
        { key: 'Volunteer Hours', value: '25000' }
      ];
      
      const displayStats = stats.length > 0 ? stats : defaultStats;
      const clubInfo = clubInfos.length > 0 ? clubInfos[0] : null;
      
      res.render('index', { 
        projects, 
        stats: displayStats, 
        testimonials, 
        members,
        notices,
        clubInfo,
        events,
        galleryCards,
        familyClubs
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`AdminJS started on http://localhost:${port}${admin.options.rootPath}`);
    console.log(`Frontend started on http://localhost:${port}/`);
  });
};

start();
