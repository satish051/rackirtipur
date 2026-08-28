# Rotaract Club of Kirtipur

The official website and content management system for the **Rotaract Club of Kirtipur**. This platform allows the club to showcase its projects, events, and community impact, while providing an easy-to-use Admin Dashboard to manage all content dynamically.

## 🌟 Features

- **Public Website:** A responsive, beautifully designed frontend built with EJS and Tailwind CSS. Showcases the club's board members, rotary family, upcoming events, and past projects.
- **Admin Dashboard:** Powered by [AdminJS](https://adminjs.co/), allowing executive members to add, edit, and delete content seamlessly without writing any code.
- **Event & Member Management:** Keep track of club members, their roles (Executive vs Board of Directors), and upcoming activities.
- **Bulk Email System:** Integrated mailing system to send notifications and updates to registered members directly from the admin panel.
- **Contact Inbox:** A built-in messaging system that captures queries from the public website directly into the admin dashboard.

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Neon)
- **ORM:** Prisma
- **Admin Panel:** AdminJS
- **Frontend:** EJS, Tailwind CSS
- **Mailing:** Nodemailer

## 🚀 Local Development Setup

To run this project locally on your machine, follow these steps:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A PostgreSQL database (You can get a free cloud database at [Neon.tech](https://neon.tech/))

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/satish051/rackirtipur.git
cd rackirtipur
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following configuration:
```env
# Database Connection (Replace with your PostgreSQL URL)
DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"

# AdminJS Login Credentials
ADMIN_EMAIL="your_email@example.com"
ADMIN_PASSWORD="your_secure_password"
COOKIE_PASSWORD="a_long_random_secret_string"
```

### 4. Database Initialization
Push the database schema and populate it with the starter seed data:
```bash
npx prisma generate
npx prisma db push
node seed.js
```

### 5. Start the Server
```bash
npm start
```
The public website will be available at `http://localhost:3000`, and you can log into the admin dashboard at `http://localhost:3000/admin`.

## ☁️ Deployment

This application is designed to be deployed on modern cloud platforms. 
- **Hosting:** It is currently optimized for a web service like [Render.com](https://render.com/).
- **Database:** A cloud PostgreSQL database like [Neon](https://neon.tech/) is recommended.
- **Persistent Uptime:** If using a free hosting tier that spins down on inactivity, a keep-alive service like [UptimeRobot](https://uptimerobot.com/) is recommended to ping the site every 5 minutes.

---
*Built with ❤️ for the Rotaract Club of Kirtipur.*
