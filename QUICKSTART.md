# 🚀 Gatherly - Quick Start Guide

## Prerequisites
- MongoDB running on localhost:27017 (or MongoDB Atlas)
- Node.js installed
- Two terminal windows

## Installation (2 minutes)

### Backend Setup
```bash
cd backend
npm install
```

### Frontend Setup
```bash
cd frontend
npm install
```

## Configure Environment

Create `backend/.env`:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gatherly
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:3000
```

## Start the Application

### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
✅ Backend runs on: http://localhost:5000  
✅ Should see: "✅ Connected to MongoDB" and "🚀 Server running..."

### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
```
✅ Frontend runs on: http://localhost:3000

## Quick Test (5 minutes)

### Step 1: Create Your First Account
1. Go to http://localhost:3000
2. Click **Register**
3. Fill in form:
   - Name: John Developer
   - Email: john@example.com
   - Password: password123
   - Role: **Organizer**
4. Click **Register**

### Step 2: Create an Event
1. You're logged in as Organizer
2. Click **Create Event** in header
3. Fill in:
   - Title: "Web Dev Meetup"
   - Description: "Discuss React and Node.js"
   - Date: Pick a future date
   - Time: 10:00 AM
   - Location: "Coffee Shop"
   - Capacity: 30
4. Click **Create Event**
5. ⏳ Status: **Pending** (waiting for admin approval)

### Step 3: Create Admin Account & Approve Event
1. **Logout** (click profile dropdown)
2. Click **Register** again
3. Create new account:
   - Name: Jane Admin
   - Email: admin@example.com
   - Password: admin123
   - Role: **Admin**
4. Click **Register**
5. Click **Pending Events** in header
6. Click **Approve** on your event
7. ✅ Event now **Approved**

### Step 4: Register as Participant
1. **Logout**
2. Create new account:
   - Name: Bob Participant
   - Email: bob@example.com
   - Password: bob123
   - Role: **Participant**
3. Click **Events**
4. See approved "Web Dev Meetup"
5. Click **Register**
6. Click **My Registrations**
7. See your event with status: **Registered**

## API Endpoints

```
Authentication:
POST   /api/auth/signup       - Register new user
POST   /api/auth/login        - Login
GET    /api/auth/me           - Get current user

Events:
GET    /api/events/approved   - List approved events
POST   /api/events/create     - Create event (Organizer)
GET    /api/events/my-events  - My created events (Organizer)
GET    /api/events/pending    - Pending approval (Admin)
PUT    /api/events/approve/:id - Approve event (Admin)
PUT    /api/events/reject/:id  - Reject event (Admin)
POST   /api/events/register/:id - Register for event
DELETE /api/events/cancel/:id  - Cancel registration

Users:
GET    /api/users/all          - All users (Admin)
GET    /api/users/:userId      - Get user details
PUT    /api/users/profile/update - Update profile
```

## Troubleshooting

**MongoDB Connection Error?**
```
Check your MongoDB is running or update MONGODB_URI in .env
Windows: mongod (if installed locally)
```

**Port 5000 Already in Use?**
```bash
# Windows: Find and kill process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Frontend Won't Connect to Backend?**
- Make sure backend is running on http://localhost:5000
- Check no CORS errors in browser console
- Verify backend .env has FRONTEND_URL=http://localhost:3000

**CORS Error in Console?**
- Backend CORS must be enabled (it is by default)
- Check backend is accessible at http://localhost:5000/api/health

## User Roles & Features

| Role | Features |
|------|----------|
| **Guest** | View approved events only |
| **Participant** | View & register for events, manage registrations |
| **Organizer** | Create events (pending approval), view own events |
| **Admin** | Approve/reject pending events, view all users |

## Project Structure

```
event-management/
├── backend/
│   ├── src/
│   │   ├── server.js                 (Express server)
│   │   ├── models/
│   │   │   ├── User.js               (User schema + auth)
│   │   │   ├── Event.js              (Event schema)
│   │   │   └── Registration.js       (Registration tracking)
│   │   ├── controllers/
│   │   │   ├── authController.js     (Signup/Login)
│   │   │   ├── eventController.js    (Event CRUD)
│   │   │   └── userController.js     (User management)
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── eventRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js               (JWT verification)
│   │   │   └── validation.js         (Input validation)
│   │   └── config/
│   │       ├── database.js
│   │       └── config.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx                   (Main routing)
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx       (Auth state)
│   │   ├── components/
│   │   │   ├── Home.tsx              (Landing page)
│   │   │   ├── auth/                 (Login/Register)
│   │   │   ├── events/               (Event pages)
│   │   │   ├── admin/                (Admin pages)
│   │   │   └── layout/               (Header/Footer)
│   │   ├── services/
│   │   │   └── api.ts                (API client)
│   │   └── App.css, **/[page].css   (Styling)
│   └── package.json
│
└── QUICKSTART.md (this file)
2. Go to "Browse Events"
3. Register for approved events
4. View "My Events" and "Event History"

## API Health Check
- Backend: http://localhost:5000/api/health
- Test registration: POST http://localhost:5000/api/auth/register

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Default connection: `mongodb://localhost:27017/event_management`
- Check backend console for connection status

### Port Conflicts
- Backend default: 5000
- Frontend default: 3000
- Change ports in .env files if needed

### Missing Dependencies
```bash
# Backend
cd backend && npm install

# Frontend  
cd frontend && npm install bootstrap-icons
```