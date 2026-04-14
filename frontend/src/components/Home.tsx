import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        color: 'white',
        padding: '5rem 0',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container fluid style={{ maxWidth: '1400px', paddingLeft: '2rem', paddingRight: '2rem' }}>
          <Row className="align-items-center" style={{ gap: '3rem' }}>
            <Col lg={6} style={{ paddingBottom: '2rem' }}>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 900,
                marginBottom: '1.5rem',
                lineHeight: 1.2,
                color: 'white'
              }}>
                Welcome to EventHub
              </h1>
              <p style={{
                fontSize: '1.25rem',
                marginBottom: '2rem',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.95)'
              }}>
                The ultimate platform for organizing and participating in amazing events.<br />
                Connect with like-minded people and make memories that last! 🎉
              </p>
              {!isAuthenticated ? (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/register" style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: 'white',
                    color: '#6366f1',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }} onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
                  }} onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                  }}>
                    🚀 Get Started
                  </Link>
                  <Link to="/login" style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    border: '2px solid white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }} onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }} onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    Sign In
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/events" style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1.1rem',
                    backgroundColor: 'white',
                    color: '#6366f1',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s ease',
                    display: 'inline-block'
                  }}>
                    📅 Browse Events
                  </Link>
                  {user?.role === 'Organizer' && (
                    <Link to="/create-event" style={{
                      padding: '0.75rem 2rem',
                      fontSize: '1.1rem',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontWeight: 700,
                      border: '2px solid white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'inline-block'
                    }}>
                      ✨ Create Event
                    </Link>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container fluid style={{ maxWidth: '1400px', padding: '5rem 2rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            marginBottom: '1rem',
            color: '#1e293b'
          }}>Why Choose EventHub?</h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
            marginBottom: 0
          }}>
            Everything you need to create, organize, and attend amazing events
          </p>
        </div>

        <Row style={{ gap: '2rem', justifyContent: 'center' }}>
          <Col md={6} lg={3} style={{ minHeight: '100%' }}>
            <Card style={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 10px 35px rgba(99, 102, 241, 0.15)',
              height: '100%',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseOver={(e: any) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(99, 102, 241, 0.25)';
            }} onMouseOut={(e: any) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 35px rgba(99, 102, 241, 0.15)';
            }}>
              <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <i className="bi bi-people-fill" style={{ fontSize: '2.5rem', color: '#6366f1' }}></i>
                </div>
                <h5 style={{ color: '#1e293b', fontWeight: 700, marginBottom: '0.75rem' }}>Role-Based Access</h5>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: 0 }}>
                  Tailored experiences for Organizers, Participants, and Admins with the right permissions.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} style={{ minHeight: '100%' }}>
            <Card style={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 10px 35px rgba(34, 197, 94, 0.15)',
              height: '100%',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseOver={(e: any) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(34, 197, 94, 0.25)';
            }} onMouseOut={(e: any) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 35px rgba(34, 197, 94, 0.15)';
            }}>
              <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #dcfce7 0%, #bfef45 100%)',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <i className="bi bi-check-circle-fill" style={{ fontSize: '2.5rem', color: '#22c55e' }}></i>
                </div>
                <h5 style={{ color: '#1e293b', fontWeight: 700, marginBottom: '0.75rem' }}>Admin Approval</h5>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: 0 }}>
                  Quality control with admin verification ensuring all events meet standards.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} style={{ minHeight: '100%' }}>
            <Card style={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 10px 35px rgba(251, 146, 60, 0.15)',
              height: '100%',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseOver={(e: any) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(251, 146, 60, 0.25)';
            }} onMouseOut={(e: any) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 35px rgba(251, 146, 60, 0.15)';
            }}>
              <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fecaca 100%)',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <i className="bi bi-lightning-fill" style={{ fontSize: '2.5rem', color: '#fb923c' }}></i>
                </div>
                <h5 style={{ color: '#1e293b', fontWeight: 700, marginBottom: '0.75rem' }}>Smart Scheduling</h5>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: 0 }}>
                  Automatic conflict detection prevents double-booking and scheduling nightmares.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} style={{ minHeight: '100%' }}>
            <Card style={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 10px 35px rgba(6, 182, 212, 0.15)',
              height: '100%',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }} onMouseOver={(e: any) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(6, 182, 212, 0.25)';
            }} onMouseOut={(e: any) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 35px rgba(6, 182, 212, 0.15)';
            }}>
              <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)',
                  width: '5rem',
                  height: '5rem',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <i className="bi bi-bar-chart-fill" style={{ fontSize: '2.5rem', color: '#06b6d4' }}></i>
                </div>
                <h5 style={{ color: '#1e293b', fontWeight: 700, marginBottom: '0.75rem' }}>Event History</h5>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: 0 }}>
                  Track all your past and upcoming events with complete participation details.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* How It Works Section */}
      {!isAuthenticated && (
        <div style={{ backgroundColor: '#f1f5f9', padding: '5rem 2rem' }}>
          <Container fluid style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                marginBottom: '1rem',
                color: '#1e293b'
              }}>How It Works</h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#64748b'
              }}>Get started in just 3 simple steps</p>
            </div>

            <Row style={{ justifyContent: 'center', gap: '2rem' }}>
              <Col md={6} lg={3} style={{ minHeight: '100%' }}>
                <Card style={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 35px rgba(99, 102, 241, 0.15)',
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseOver={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(99, 102, 241, 0.25)';
                }} onMouseOut={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 35px rgba(99, 102, 241, 0.15)';
                }}>
                  <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      color: 'white',
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      fontSize: '1.75rem',
                      fontWeight: 700
                    }}>
                      1
                    </div>
                    <h5 style={{ color: '#1e293b', fontWeight: 700, marginBottom: '0.75rem' }}>Register</h5>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: 0 }}>
                      Create your account and choose your role: Organizer or Participant
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3} style={{ minHeight: '100%' }}>
                <Card style={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 35px rgba(99, 102, 241, 0.15)',
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseOver={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(99, 102, 241, 0.25)';
                }} onMouseOut={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 35px rgba(99, 102, 241, 0.15)';
                }}>
                  <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      color: 'white',
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      fontSize: '1.75rem',
                      fontWeight: 700
                    }}>
                      2
                    </div>
                    <h5 style={{ color: '#1e293b', fontWeight: 700, marginBottom: '0.75rem' }}>Explore</h5>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: 0 }}>
                      Browse approved events, create new ones, or register for existing events
                    </p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3} style={{ minHeight: '100%' }}>
                <Card style={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 35px rgba(99, 102, 241, 0.15)',
                  height: '100%',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }} onMouseOver={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(99, 102, 241, 0.25)';
                }} onMouseOut={(e: any) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 35px rgba(99, 102, 241, 0.15)';
                }}>
                  <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      color: 'white',
                      width: '4rem',
                      height: '4rem',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      fontSize: '1.75rem',
                      fontWeight: 700
                    }}>
                      3
                    </div>
                    <h5 style={{ color: '#1e293b', fontWeight: 700, marginBottom: '0.75rem' }}>Participate</h5>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: 0 }}>
                      Attend events and track your participation history in your dashboard
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {/* Quick Stats or User Dashboard */}
      {isAuthenticated && (
        <div style={{ backgroundColor: '#f1f5f9', padding: '5rem 2rem' }}>
          <Container fluid style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ color: '#1e293b', fontWeight: 700, fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                👋 Welcome back, <span style={{ color: '#6366f1' }}>{user?.name}</span>!
              </h2>
              <p style={{ fontSize: '1.1rem', marginTop: '0.5rem', color: '#64748b' }}>
                Here's what you can do next:
              </p>
            </div>

            <Row style={{ gap: '2rem', justifyContent: 'center' }}>
              <Col md={6} lg={3}>
                <Card style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)', border: 'none', boxShadow: '0 10px 35px rgba(99, 102, 241, 0.15)' }}>
                  <Card.Body style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅</div>
                    <h6 style={{ color: '#1e293b', fontWeight: 700 }}>Browse Events</h6>
                    <Link to="/events" style={{
                      padding: '0.5rem 1.5rem',
                      marginTop: '1rem',
                      display: 'inline-block',
                      backgroundColor: 'white',
                      color: '#6366f1',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      border: '2px solid #6366f1',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }} onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#6366f1';
                      e.currentTarget.style.color = 'white';
                    }} onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#6366f1';
                    }}>
                      View All
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              {user?.role === 'Organizer' && (
                <Col md={6} lg={3}>
                  <Card style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #dcfce7 0%, #bfef45 100%)', border: 'none', boxShadow: '0 10px 35px rgba(34, 197, 94, 0.15)' }}>
                    <Card.Body style={{ textAlign: 'center', padding: '2rem' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✨</div>
                      <h6 style={{ color: '#1e293b', fontWeight: 700 }}>Create Event</h6>
                      <Link to="/create-event" style={{
                        padding: '0.5rem 1.5rem',
                        marginTop: '1rem',
                        display: 'inline-block',
                        backgroundColor: 'white',
                        color: '#22c55e',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        border: '2px solid #22c55e',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }} onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#22c55e';
                        e.currentTarget.style.color = 'white';
                      }} onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#22c55e';
                      }}>
                        Create New
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              )}

              <Col md={6} lg={3}>
                <Card style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%)', border: 'none', boxShadow: '0 10px 35px rgba(6, 182, 212, 0.15)' }}>
                  <Card.Body style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                    <h6 style={{ color: '#1e293b', fontWeight: 700 }}>My Events</h6>
                    <Link to="/my-events" style={{
                      padding: '0.5rem 1.5rem',
                      marginTop: '1rem',
                      display: 'inline-block',
                      backgroundColor: 'white',
                      color: '#06b6d4',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      border: '2px solid #06b6d4',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }} onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#06b6d4';
                      e.currentTarget.style.color = 'white';
                    }} onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#06b6d4';
                    }}>
                      View Mine
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3}>
                <Card style={{ borderRadius: '16px', background: 'linear-gradient(135deg, #fef3c7 0%, #fecaca 100%)', border: 'none', boxShadow: '0 10px 35px rgba(251, 146, 60, 0.15)' }}>
                  <Card.Body style={{ textAlign: 'center', padding: '2rem' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⏱️</div>
                    <h6 style={{ color: '#1e293b', fontWeight: 700 }}>Event History</h6>
                    <Link to="/my-registrations" style={{
                      padding: '0.5rem 1.5rem',
                      marginTop: '1rem',
                      display: 'inline-block',
                      backgroundColor: 'white',
                      color: '#fb923c',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      border: '2px solid #fb923c',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }} onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#fb923c';
                      e.currentTarget.style.color = 'white';
                    }} onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = '#fb923c';
                    }}>
                      View History
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Home;