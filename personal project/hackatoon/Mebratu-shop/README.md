# Mebratu Shop - E-Commerce Platform

A full-stack e-commerce application with multilingual support, built with TypeScript, React, Node.js, and PostgreSQL.

## 🚀 Features

- **Multilingual Support**: English, Spanish, and French
- **Admin Panel**: Complete product, order, and user management
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Payment Integration**: Stripe payment processing
- **Image Management**: Cloudinary integration
- **Modern UI**: React with TypeScript and Tailwind CSS
- **RESTful API**: Express.js backend with TypeScript
- **Database**: PostgreSQL (Neon serverless)

## 📋 Prerequisites

- Node.js v20.x or higher
- npm 10.x or higher
- PostgreSQL database (Neon account recommended)
- Stripe account
- Cloudinary account

## 🛠️ Installation

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your credentials:
```env
PORT=5000
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
DEFAULT_LANGUAGE=en
STRIPE_API_KEY=your_stripe_key
CLOUDINARY_URL=your_cloudinary_url
```

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## 📁 Project Structure

```
Mebratu-shop/
├── server/                 # Backend application
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── types/         # TypeScript types
│   │   ├── utils/         # Utility functions
│   │   └── app.ts         # Express application
│   ├── migrations/        # Database migrations
│   ├── seeds/            # Database seeds
│   └── package.json
└── client/               # Frontend application (coming soon)
```

## 🔗 API Endpoints

- `GET /health` - Health check
- `GET /api` - API information
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/admin/products` - Create product (admin only)
- `PUT /api/admin/products/:id` - Update product (admin only)
- `DELETE /api/admin/products/:id` - Delete product (admin only)

## 🌐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `NODE_ENV` | Environment (development/production) |
| `DEFAULT_LANGUAGE` | Default language code (en/es/fr) |
| `STRIPE_API_KEY` | Stripe API key |
| `CLOUDINARY_URL` | Cloudinary connection URL |

## 👨‍💻 Development

### Running the Backend

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

### Testing

```bash
npm test
```

## 📦 Tech Stack

### Backend
- **Runtime**: Node.js v20.x
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Knex.js
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate Limiting

### Frontend (Coming Soon)
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS + Bootstrap
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Forms**: React Hook Form + Yup
- **Routing**: React Router DOM

## 🔒 Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting
- JWT authentication
- Password hashing with bcrypt
- Input validation
- SQL injection prevention

## 📝 License

ISC

## 👤 Author

Mebratu

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if you like this project!
