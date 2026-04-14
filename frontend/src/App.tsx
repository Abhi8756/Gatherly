import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EventList from './components/events/EventList';
import CreateEvent from './components/events/CreateEvent';
import MyEvents from './components/events/MyEvents';
import EventHistory from './components/events/EventHistory';
import PendingEvents from './components/admin/PendingEvents';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/events" element={<EventList />} />
              
              {/* Organizer Routes */}
              <Route
                path="/create-event"
                element={
                  <ProtectedRoute requiredRole="Organizer">
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/my-events"
                element={
                  <ProtectedRoute requiredRole="Organizer">
                    <MyEvents />
                  </ProtectedRoute>
                }
              />
              
              {/* Event History - Available to Organizer and Participant */}
              <Route
                path="/my-registrations"
                element={
                  <ProtectedRoute>
                    <EventHistory />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin/pending-events"
                element={
                  <ProtectedRoute requiredRole="Admin">
                    <PendingEvents />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
