# Personalized To-Do Dashboard

A modern, feature-rich task management application with user authentication and advanced task organization capabilities.

## Developer Information

**Developed by:** Mebratu Mengstu  
**Year:** 2026  
**Project Type:** Full-Stack Web Application  

## Features

- ✅ User Authentication (Register/Login)
- 📋 Task Management (Create, Update, Delete, Toggle)
- 📌 Lists/Categories
- 🏷️ Tags with Colors
- ⭐ Priority Levels (Low, Medium, High)
- 📅 Due Dates
- 📝 Task Descriptions & Subtasks
- 🎨 Modern 3-Column Dashboard Interface
- 🔍 Search Functionality
- 💾 PostgreSQL Database (Neon)

## Tech Stack

### Backend
- Node.js
- Express.js
- Knex.js (SQL Query Builder)
- PostgreSQL (Neon Serverless)
- bcryptjs (Password Hashing)
- express-session

### Frontend
- EJS Templates
- CSS3 (Custom Grid Layout)
- Vanilla JavaScript
- Google Fonts (Outfit)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your database credentials:
   ```
   PGHOST=your-neon-host
   PGDATABASE=your-database
   PGUSER=your-user
   PGPASSWORD=your-password
   PORT=3000
   SESSION_SECRET=your-secret-key
   ```

4. Run database migrations:
   ```bash
   npx knex migrate:latest
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Open `http://localhost:3000` in your browser

## Database Schema

- **users** - User accounts
- **lists** - Task categories/projects
- **tags** - Task labels
- **tasks** - Main task data with priority, due dates, descriptions
- **subtasks** - Sub-items for tasks
- **task_tags** - Many-to-many relationship between tasks and tags

## Project Structure

```
week-9/
├── migrations/          # Database migrations
├── public/             
│   └── style.css       # Dashboard styling
├── views/              
│   ├── index.ejs       # Main dashboard
│   ├── login.ejs       # Login page
│   └── register.ejs    # Registration page
├── db.js               # Database configuration
├── server.js           # Express server & routes
├── knexfile.js         # Knex configuration
└── package.json        # Dependencies
```

## License

© 2026 Mebratu Mengstu. All Rights Reserved.
