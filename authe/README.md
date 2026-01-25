# JWT Authentication System - Quick Start Guide

## 🚀 Running the Application

### Backend Server
```bash
cd c:\Users\mebra\OneDrive\Desktop\remain\authe
npm run dev
```
✅ Backend: http://localhost:3000

### Frontend Application  
```bash
cd c:\Users\mebra\OneDrive\Desktop\remain\authe\frontend
npm run dev
```
✅ Frontend: http://localhost:5175

---

## 📋 How to Use

### 1. Open Application
Navigate to: **http://localhost:5175**

### 2. Register New Account
- Click "Register" 
- Enter email: `admin@test.com`
- Enter password: `AdminPass123` (min 8 chars, uppercase, lowercase, number)
- Confirm password
- Click "Register"
- ✅ Auto-login and redirect to Dashboard

### 3. View Dashboard
- See your user profile (ID, email)
- Token authentication status
- Protected content

### 4. Logout
- Click "Logout" button
- Redirected to login page
- Token cleared from storage

### 5. Login Again
- Enter same credentials
- Click "Login"
- ✅ Access dashboard with stored token

---

## 🔐 API Endpoints

### Public
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Protected (JWT Required)
- `GET /api/user/profile` - Get user profile
- `GET /api/user/verify` - Verify token

---

## 🧪 Testing

### Test Protected Route Without Token
```bash
curl http://localhost:3000/api/user/profile
# Returns: 401 Unauthorized
```

### Test With Valid Token
```bash
# Get token from localStorage after login, then:
curl -H "Authorization: Bearer YOUR_TOKEN_HERE" http://localhost:3000/api/user/profile
# Returns: User profile data
```

---

## ⚙️ Configuration

### Backend (.env)
```env
PORT=3000
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
PGHOST=your-db-host
PGDATABASE=neondb
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

---

## ✅ System Status

- ✅ Backend API running
- ✅ Frontend app running  
- ✅ Database connected
- ✅ JWT authentication working
- ✅ Protected routes secured
- ✅ Token management active

---

## 📚 Features

**Security**
- Password hashing (bcrypt)
- JWT token authentication
- Rate limiting (5 req/15min)
- Input validation
- CORS protection

**Frontend**
- React + Vite
- Context API for auth state
- Axios interceptors
- Protected routes
- Token persistence
- Auto-logout on expiration

**Backend**
- Express.js
- PostgreSQL (Neon)
- JWT middleware
- RESTful API
- Error handling
