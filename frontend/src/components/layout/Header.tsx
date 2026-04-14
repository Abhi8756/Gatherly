import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="navbar-custom" sticky="top" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.05)', paddingLeft: '2rem', paddingRight: '2rem' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Navbar.Brand as={Link} to="/" className="brand-logo">
          <i className="bi bi-calendar-event me-2" style={{ fontSize: '1.5rem', color: '#6366f1' }}></i>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>EventHub</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav" style={{ width: '100%' }}>
          <Nav style={{ marginLeft: 'auto', display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Nav.Link as={Link} to="/events" className="nav-link-custom" style={{ color: '#64748b', fontWeight: 600 }}>
              📅 Browse Events
            </Nav.Link>
            
            {isAuthenticated && user?.role === 'Organizer' && (
              <Nav.Link as={Link} to="/create-event" className="nav-link-custom" style={{ color: '#64748b', fontWeight: 600 }}>
                ✨ Create Event
              </Nav.Link>
            )}
            
            {isAuthenticated && user?.role === 'Admin' && (
              <Nav.Link as={Link} to="/admin/pending-events" className="nav-link-custom" style={{ color: '#64748b', fontWeight: 600 }}>
                ⚙️ Pending Events
              </Nav.Link>
            )}
            
            {isAuthenticated && user?.role === 'Organizer' && (
              <Nav.Link as={Link} to="/my-events" className="nav-link-custom" style={{ color: '#64748b', fontWeight: 600 }}>
                🎯 My Events
              </Nav.Link>
            )}
            
            {isAuthenticated && (
              <Nav.Link as={Link} to="/my-registrations" className="nav-link-custom" style={{ color: '#64748b', fontWeight: 600 }}>
                ⏱️ Event History
              </Nav.Link>
            )}
            
            {isAuthenticated ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', color: '#6366f1' }}></i>
                  <span style={{ color: '#1e293b', fontWeight: 600 }}>{user?.name}</span>
                  <span style={{ background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', textTransform: 'capitalize', fontSize: '0.75rem', fontWeight: 600 }}>
                    {user?.role}
                  </span>
                </div>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={handleLogout}
                  className="btn-logout"
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="nav-link-custom" style={{ color: '#64748b', fontWeight: 600 }}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-link-custom" style={{ color: '#64748b', fontWeight: 600 }}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;