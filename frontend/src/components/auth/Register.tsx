import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Cache buster: 2026-01-14-NO-BOOTSTRAP-GRID-V3

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Participant' as 'Participant' | 'Organizer',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password, formData.role);
      navigate('/events');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '500px',
        height: '500px',
        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none'
      }}></div>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingTop: '4rem', 
        paddingBottom: '4rem', 
        position: 'relative', 
        zIndex: 1,
        width: '100%',
        padding: '4rem 2rem'
      }}>
        <div style={{ width: '100%', maxWidth: '1100px' }}>
          <Card className="border-0" style={{ 
            borderRadius: '24px', 
            overflow: 'hidden', 
            boxShadow: '0 25px 70px rgba(99, 102, 241, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              padding: '2.5rem 2rem',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                right: '-30px',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ 
                fontSize: '3rem', 
                marginBottom: '0.75rem',
                position: 'relative',
                zIndex: 1
              }}>🚀</div>
              <h2 style={{ 
                fontWeight: 900, 
                marginBottom: '0.5rem', 
                fontSize: '2rem',
                position: 'relative',
                zIndex: 1,
                letterSpacing: '-0.5px'
              }}>Join EventHub</h2>
              <p style={{ 
                marginBottom: 0, 
                opacity: 0.95, 
                fontSize: '1rem',
                position: 'relative',
                zIndex: 1,
                fontWeight: 500
              }}>Create your account in seconds</p>
            </div>

            <Card.Body className="p-4 p-md-5">
              {error && (
                <Alert 
                  variant="danger" 
                  className="mb-4" 
                  style={{ 
                    borderRadius: '12px', 
                    borderLeft: '4px solid #ef4444',
                    background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                    border: '1px solid #fca5a5',
                    color: '#991b1b',
                    fontWeight: 600
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                    <span>{error}</span>
                  </div>
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <Form.Label style={{ 
                      fontWeight: 700, 
                      color: '#1e293b', 
                      marginBottom: '0.75rem', 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>👤</span>
                      <span>Full Name</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        padding: '0.875rem 1.25rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        background: '#f8fafc'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#6366f1';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                        e.currentTarget.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                    />
                  </div>
                  <div>
                    <Form.Label style={{ 
                      fontWeight: 700, 
                      color: '#1e293b', 
                      marginBottom: '0.75rem', 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>📧</span>
                      <span>Email Address</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        padding: '0.875rem 1.25rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        background: '#f8fafc'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#6366f1';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                        e.currentTarget.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                    />
                  </div>
                  <div>
                    <Form.Label style={{ 
                      fontWeight: 700, 
                      color: '#1e293b', 
                      marginBottom: '0.75rem', 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>🎯</span>
                      <span>Choose Your Role</span>
                    </Form.Label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <div
                        onClick={() => setFormData({ ...formData, role: 'Participant' })}
                        style={{
                          padding: '0.875rem 0.5rem',
                          borderRadius: '12px',
                          border: formData.role === 'Participant' ? '3px solid #6366f1' : '2px solid #e2e8f0',
                          background: formData.role === 'Participant' ? 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)' : '#f8fafc',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📌</div>
                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>Participant</div>
                      </div>
                      <div
                        onClick={() => setFormData({ ...formData, role: 'Organizer' })}
                        style={{
                          padding: '0.875rem 0.5rem',
                          borderRadius: '12px',
                          border: formData.role === 'Organizer' ? '3px solid #6366f1' : '2px solid #e2e8f0',
                          background: formData.role === 'Organizer' ? 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)' : '#f8fafc',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎪</div>
                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.85rem' }}>Organizer</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <Form.Label style={{ 
                      fontWeight: 700, 
                      color: '#1e293b', 
                      marginBottom: '0.75rem', 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>🔐</span>
                      <span>Password</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Min 6 characters"
                      minLength={6}
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        padding: '0.875rem 1.25rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        background: '#f8fafc'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#6366f1';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                        e.currentTarget.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                    />
                  </div>
                  <div>
                    <Form.Label style={{ 
                      fontWeight: 700, 
                      color: '#1e293b', 
                      marginBottom: '0.75rem', 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ fontSize: '1.25rem' }}>✓</span>
                      <span>Confirm Password</span>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Re-enter password"
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e2e8f0',
                        padding: '0.875rem 1.25rem',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        background: '#f8fafc'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#6366f1';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                        e.currentTarget.style.background = 'white';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e2e8f0';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-100"
                  disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '1rem',
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    boxShadow: '0 6px 20px rgba(99, 102, 241, 0.35)',
                    transition: 'all 0.3s ease',
                    marginTop: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.35)';
                  }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <span>⏳</span>
                      <span>Creating Account...</span>
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <span>🚀</span>
                      <span>Create Account</span>
                    </span>
                  )}
                </Button>
              </Form>

              <div style={{ 
                margin: '2rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }}></div>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>OR</span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }}></div>
              </div>

              <div style={{ 
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '2px dashed #cbd5e1'
              }}>
                <p style={{ marginBottom: '0.75rem', color: '#64748b', fontSize: '0.95rem', fontWeight: 600 }}>
                  Already have an account?
                </p>
                <Link to="/login" style={{
                  color: '#6366f1',
                  textDecoration: 'none',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  transition: 'color 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ec4899'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6366f1'}
                >
                  <span>👋</span>
                  <span>Sign in here</span>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
