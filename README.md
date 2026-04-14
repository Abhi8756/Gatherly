# 🎉 Gatherly - Event Management System

A complete, production-ready event management application built with React, Express, and MongoDB. Features role-based access control, event approval workflows, and comprehensive event registration management.

**⏱️ Quick Start:** See [QUICKSTART.md](./QUICKSTART.md) to get running in 5 minutes!

## ✨ Features

### Core Functionality
- 🔐 **User Authentication** - Secure signup/login with JWT tokens
- 📋 **Event Management** - Create, browse, and register for events
- ✅ **Admin Approval System** - Events require admin approval before going live
- 🔍 **Event Filtering** - Search by date and location
- 📊 **Registration Tracking** - Manage event registrations with duplicate prevention
- 🎨 **Responsive Design** - Clean, minimal UI that works on all devices
- 🔑 **Role-Based Access Control** - Different features for different user types

### User Roles & Capabilities

| Role | Permissions |
|------|-------------|
| **Guest** | 👁️ View approved events only |
| **Participant** | 📝 Register for events, manage registrations |
| **Organizer** | 🎯 Create events (pending approval), view own events |
| **Admin** | ✔️ Approve/reject pending events, view all users |

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - Database ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React 19** with **TypeScript**
- **React Router 7** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Context API** - Global state management (Authentication)
- **CSS3** - Responsive styling (no frameworks)

## 📁 Project Architecture

```
event-management/
│
├── backend/
│   ├── src/
│   │   ├── server.js                 # Express app entry point
│   │   │
│   │   ├── config/
│   │   │   ├── database.js           # MongoDB connection helper
│   │   │   └── config.js             # App constants (roles, statuses)
│   │   │
│   │   ├── models/                   # Mongoose schemas
│   │   │   ├── User.js               # User schema + password methods
│   │   │   ├── Event.js              # Event schema with refs
│   │   │   └── Registration.js       # Registration tracking
│   │   │
│   │   ├── controllers/              # Business logic
│   │   │   ├── authController.js     # Signup/Login handlers
│   │   │   ├── eventController.js    # Event CRUD + registration
│   │   │   └── userController.js     # User management
│   │   │
│   │   ├── routes/                   # API endpoints
│   │   │   ├── authRoutes.js         # /api/auth/
│   │   │   ├── eventRoutes.js        # /api/events/
│   │   │   └── userRoutes.js         # /api/users/
│   │   │
│   │   └── middleware/
│   │       ├── auth.js               # JWT verification + authorization
│   │       └── validation.js         # express-validator rules
│   │
│   ├── .env                          # Environment variables
│   ├── package.json                  # Dependencies
│   └── node_modules/
│
└── frontend/
    ├── src/
    │   ├── App.tsx                   # Main routing setup
    │   ├── App.css                   # Global styles
    │   │
    │   ├── contexts/
    │   │   └── AuthContext.tsx       # Auth state + token management
    │   │
    │   ├── services/
    │   │   └── api.ts                # Axios instance + API methods
    │   │
    │   ├── components/
    │   │   ├── Home.tsx              # Landing page
    │   │   │
    │   │   ├── auth/
    │   │   │   ├── Login.tsx          # Login form
    │   │   │   ├── Register.tsx       # Signup form
    │   │   │   └── ProtectedRoute.tsx # Route protection wrapper
    │   │   │
    │   │   ├── events/
    │   │   │   ├── EventList.tsx      # Browse & filter approved events
    │   │   │   ├── CreateEvent.tsx    # Create new event (Organizer)
    │   │   │   ├── MyEvents.tsx       # View own events (Organizer)
    │   │   │   └── EventHistory.tsx   # View registrations (Participant)
    │   │   │
    │   │   ├── admin/
    │   │   │   └── PendingEvents.tsx  # Approve/reject (Admin)
    │   │   │
    │   │   └── layout/
    │   │       ├── Header.tsx         # Navigation bar
    │   │       └── Footer.tsx         # Footer
    │   │
    │   ├── public/
    │   │   └── index.html
    │   ├── App.tsx                    # Main app component
    │   └── index.tsx                  # React entry point
    │
    ├── package.json
    └── tsconfig.json

## ⚡ Quick Start

Get the app running in minutes! See [QUICKSTART.md](./QUICKSTART.md) for a guided walkthrough.

## 📋 Setup Instructions

### Prerequisites
- **Node.js** v16+ ([download](https://nodejs.org/))
- **MongoDB** running on `localhost:27017` or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Two terminal windows

### Step 1: Backend Configuration

```bash
cd backend
npm install
```

Create `backend/.env`:
```ini
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gatherly
JWT_SECRET=your_secret_key_change_in_production
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:3000
```

### Step 2: Frontend Setup

```bash
cd frontend
npm install
```

### Step 3: Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Runs on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
✅ Runs on http://localhost:3000

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup        - Register new user
POST   /api/auth/login         - Login
GET    /api/auth/me            - Get current user
```

### Events
```
GET    /api/events/approved    - Browse approved events
POST   /api/events/create      - Create event (Organizer)
GET    /api/events/my-events   - View own events (Organizer)
GET    /api/events/pending     - Pending events (Admin only)
PUT    /api/events/approve/:id - Approve event (Admin)
PUT    /api/events/reject/:id  - Reject event (Admin)
POST   /api/events/register/:id - Register for event
DELETE /api/events/cancel/:id  - Cancel registration
GET    /api/events/user-registrations - Get user registrations
```

### Users
```
GET    /api/users/all          - All users (Admin)
GET    /api/users/:userId      - Get user details
PUT    /api/users/profile/update - Update profile
```

### Health Check
```
GET    /api/health             - Server health check
```

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,           // Full name
  email: String,          // Unique, email format
  password: String,       // Hashed with bcryptjs
  role: String,          // 'Guest' | 'Participant' | 'Organizer' | 'Admin'
  createdAt: Date,
  updatedAt: Date
}
```

### Event Collection
```javascript
{
  _id: ObjectId,
  title: String,         // Event title
  description: String,   // Event details
  date: Date,           // Event date
  time: String,         // Time (HH:MM format)
  location: String,     // Event location
  capacity: Number,     // Max participants
  organizer: ObjectId,  // Reference to User
  status: String,       // 'Pending' | 'Approved' | 'Rejected'
  registrationCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Registration Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId,       // Reference to User
  event: ObjectId,      // Reference to Event
  status: String,       // 'Registered' | 'Cancelled'
  registeredAt: Date,
  // Unique compound index: {user: 1, event: 1}
}
```

## 🔐 Authentication Flow

1. **User Registration**
   ```
   POST /api/auth/signup
   Body: { name, email, password, role }
   Response: { token, user }
   ```
   - Password hashed with bcryptjs
   - JWT token generated (24hr expiry)
   - Stored in localStorage on frontend

2. **User Login**
   ```
   POST /api/auth/login
   Body: { email, password }
   Response: { token, user }
   ```
   - Password compared with bcrypt
   - New JWT token generated

3. **Protected Requests**
   - All protected routes require `Authorization: Bearer <token>`
   - Token verified and decoded on backend
   - User role checked for authorization

## 🗂️ Implementation Details

### Backend Models
- **User**: name, email (unique), hashed password, role, timestamps
- **Event**: title, description, date, time, location, capacity, organizer ref, status, registrationCount
- **Registration**: user ref, event ref, status, registeredAt with unique compound index

### Authentication & Security
- JWT tokens with 24-hour expiration
- bcryptjs password hashing (10 salt rounds)
- Role-based authorization middleware
- Input validation on signup, login, event creation

### Event Workflow
1. Organizer creates event → status: Pending
2. Admin reviews → Approves (Approved) or Rejects (Rejected)
3. Participants can register only to Approved events
4. Registration capacity checked and enforced
5. Duplicate registrations prevented with unique index

## 🧪 Testing Workflows

### Workflow 1: Basic Authentication
1. Register as new user (role: Participant)
2. Login with credentials
3. Logout and verify localStorage cleared
4. Login again to verify persistence

### Workflow 2: Organizer Event Creation
1. Register as Organizer
2. Click "Create Event"
3. Submit event form
4. Event appears in "My Events" (status: Pending)

### Workflow 3: Admin Approval
1. Register as Admin (in separate incognito window)
2. Go to "Pending Events"
3. Approve the event
4. Switch back to Organizer - see status changed
5. Non-organizer seeing "Events" sees it as Approved

### Workflow 4: Participant Registration
1. Register as Participant
2. Browse "Events" (only shows Approved)
3. Click Register on event
4. See event in "My Registrations"
5. Try registering again - should show "already registered" error
6. Click Cancel to unregister

### Workflow 5: Edge Cases
- Register with invalid email - should fail
- Create event with past date - should fail
- Register twice for same event - should fail
- Non-admin accessing /admin/pending-events - should redirect

## 🛡️ Security Features

- **JWT Authentication** with 24-hour expiration
- **bcryptjs Password Hashing** with 10 salt rounds
- **Role-Based Access Control** (frontend routing + backend authorization)
- **Input Validation** (email format, password strength, date validation)
- **CORS Configuration** (frontend URL whitelisted)
- **Unique Index** on (user, event) to prevent duplicate registrations

## 🚀 Deployment

### Environment Variables
```ini
NODE_ENV=production
PORT=5000
MONGODB_URI=<production_mongodb_uri>
JWT_SECRET=<strong_random_key>
FRONTEND_URL=<production_frontend_url>
```

### Build Frontend
```bash
cd frontend
npm run build
```

### Run Production
```bash
cd backend
NODE_ENV=production npm start
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure mongod is running or update MONGODB_URI in .env |
| Port 5000 already in use | Kill process or change PORT in .env |
| CORS errors in console | Verify FRONTEND_URL in backend .env |
| Token invalid/expired | Clear localStorage, login again |
| Components not rendering | Check browser console for errors |
| Cannot connect to backend | Ensure backend running on port 5000 |

## 📝 Code Quality

- **TypeScript** for type safety
- **Modular Architecture** with clear separation of concerns
- **Express Middleware** for authentication and validation
- **MongoDB Indexes** for performance optimization
- **Error Handling** with try-catch and validation middleware
- **RESTful API** design principles

## 📞 Support

For help:
1. Check [QUICKSTART.md](./QUICKSTART.md)
2. Review error messages in console
3. Verify .env configuration

---

**Built with ❤️ using React, Express, and MongoDB**
- **CORS Configuration** for cross-origin security

## 🎯 Academic Project Considerations

### UML Diagram Compatibility
The codebase structure is designed to easily generate:
- **Class Diagrams**: Clear service and component classes
- **Sequence Diagrams**: Well-defined API call flows
- **Use Case Diagrams**: Role-based functionality mapping

### Code Quality Features
- **TypeScript** for type safety
- **Modular Architecture** for maintainability
- **Consistent Naming Conventions**
- **Comprehensive Error Handling**
- **RESTful API Design**

## 🚦 Default Credentials

- **Admin User**: username: `admin`, password: `admin123`

## 🔄 Future Enhancements

The application is designed to be extensible for future features:
- Email notifications
- Event categories and tags
- File uploads for event images
- Advanced search and filtering
- Calendar integration
- Reporting and analytics

## 📝 License

This project is created for academic purposes and is available under the MIT License.

---

**Note**: This application is designed for educational purposes and demonstrates clean architecture, object-oriented design principles, and modern web development practices suitable for academic evaluation.