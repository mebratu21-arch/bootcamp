# ☕ Café Elegante - Cafe Management System

A modern, full-stack cafe management application built with React and Node.js.

## 🏗️ Project Structure

```
cafe-management/
├── server/          # Backend API (Express + Prisma)
│   ├── routes/      # API route handlers
│   ├── prisma/      # Database schema
│   └── app.js       # Express application
│
├── frontend/        # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── stores/      # State management
│   │   ├── layouts/     # Layout components
│   │   └── main.jsx     # Entry point
│   └── vite.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Running the Backend
```bash
cd server
npm install
npm run dev
```
Server runs on: http://localhost:5000

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## ✨ Features

- 📋 **Menu Display** - Browse items with search and category filters
- 🛒 **Shopping Cart** - Add items, adjust quantities, checkout
- 📦 **Order Management** - Track and manage customer orders
- 🎨 **Modern UI** - Beautiful dark theme with animations

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- CSS3 (Custom Design System)

**Backend:**
- Node.js
- Express
- Prisma ORM
- PostgreSQL

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/menu` | Get all menu items |
| POST | `/api/menu` | Create menu item |
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create new order |

## 📝 License

MIT License
