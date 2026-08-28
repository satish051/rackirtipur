import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Configure the email transporter using Gmail
// Note: Requires process.env.GMAIL_USER and process.env.GMAIL_PASS (App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'yourclub@gmail.com',
    pass: process.env.GMAIL_PASS || 'your-app-password'
  }
});

export async function notifyMembersOfNewEvent(eventParams) {
  try {
    console.log(`[Notifier] New event created: ${eventParams.title}. Preparing to notify members...`);

    // Fetch members who want to receive notifications and have an email
    const membersToNotify = await prisma.member.findMany({
      where: {
        receiveNotifications: true,
        email: { not: null }
      }
    });

    if (membersToNotify.length === 0) {
      console.log('[Notifier] No members found with valid emails who opted into notifications.');
      return;
    }

    const emailList = membersToNotify.map(m => m.email).join(', ');
    console.log(`[Notifier] Sending event email to: ${emailList}`);

    const eventDate = new Date(eventParams.date).toLocaleString();

    const mailOptions = {
      from: `"Rotaract Club of Kirtipur" <${process.env.GMAIL_USER || 'yourclub@gmail.com'}>`,
      to: emailList, 
      subject: `Upcoming Event: ${eventParams.title}`,
      html: `
        <h2>You are invited to an upcoming Rotaract Event!</h2>
        <p><strong>Event:</strong> ${eventParams.title}</p>
        <p><strong>Date/Time:</strong> ${eventDate}</p>
        <p><strong>Type:</strong> ${eventParams.type}</p>
        ${eventParams.location ? `<p><strong>Location:</strong> ${eventParams.location}</p>` : ''}
        ${eventParams.description ? `<p><strong>Description:</strong> ${eventParams.description}</p>` : ''}
        ${eventParams.rsvpLink ? `<p><strong>RSVP:</strong> <a href="${eventParams.rsvpLink}">${eventParams.rsvpLink}</a></p>` : ''}
        <br>
        <p>See you there!</p>
        <p><em>Rotaract Club of Kirtipur</em></p>
      `
    };

    // Only actually send if credentials are provided, else just log it for development
    if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
      const info = await transporter.sendMail(mailOptions);
      console.log(`[Notifier] Email successfully sent! Message ID: ${info.messageId}`);
    } else {
      console.log('[Notifier] SKIPPED sending email: GMAIL_USER and GMAIL_PASS environment variables are not set.');
      console.log('[Notifier] Email Content would have been:');
      console.log(mailOptions.html);
    }

  } catch (error) {
    console.error('[Notifier] Error sending notifications:', error);
  }
}
