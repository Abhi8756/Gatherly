import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import eventService, { Registration } from '../../services/eventService';

const EventHistory: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await eventService.getUserRegistrations();
      setRegistrations(data);
    } catch (err: any) {
      setError('Failed to load event history');
      console.error('Error fetching history:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventStatus = (eventDate: string) => {
    const eventTime = new Date(eventDate);
    const now = new Date();
    return eventTime > now ? 'upcoming' : 'completed';
  };

  if (loading) {
    return (
      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '60px 20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            border: '4px solid #e0e7ff', 
            borderTop: '4px solid #6366f1', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Loading your event history...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
      minHeight: '100vh', 
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px' }}>
          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: '800', 
            color: '#1f2937', 
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              borderRadius: '16px',
              fontSize: '2rem'
            }}>📋</span>
            My Event History
          </h1>
          <p style={{ 
            color: '#64748b', 
            fontSize: '1.1rem',
            marginLeft: '75px'
          }}>
            Track all your event registrations and participation
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderLeft: '4px solid #ef4444',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <span style={{ color: '#991b1b', fontSize: '1.05rem' }}>{error}</span>
            <button 
              onClick={fetchData}
              style={{
                background: '#ef4444',
                border: 'none',
                color: 'white',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {registrations.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '80px 40px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50px',
              left: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '50%',
              filter: 'blur(60px)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(236, 72, 153, 0.1)',
              borderRadius: '50%',
              filter: 'blur(60px)'
            }}></div>
            <div style={{ fontSize: '5rem', marginBottom: '24px', position: 'relative' }}>📅</div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '16px',
              position: 'relative'
            }}>
              No Event Registrations Yet
            </h3>
            <p style={{ 
              color: '#64748b', 
              marginBottom: '32px', 
              fontSize: '1.15rem',
              position: 'relative'
            }}>
              You haven't registered for any events yet. Explore and join some events!
            </p>
            <Link 
              to="/events"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 40px',
                fontSize: '1.05rem',
                fontWeight: '600',
                color: 'white',
                textDecoration: 'none',
                position: 'relative'
              }}
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
            gap: '40px'
          }}>
            {registrations.map((reg) => {
              const status = getEventStatus(reg.event.date);
              return (
                <div 
                  key={reg._id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '1px solid #f1f5f9'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                  }}
                >
                  {/* Card Header with Status-based Gradient */}
                  <div style={{
                    background: status === 'upcoming' 
                      ? 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'
                      : 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
                    padding: '28px 32px',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '140px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-30px',
                      right: '-30px',
                      width: '120px',
                      height: '120px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      filter: 'blur(40px)'
                    }}></div>
                    <div>
                      <span style={{
                        background: status === 'upcoming' ? '#fbbf24' : '#d1d5db',
                        color: '#1f2937',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        position: 'relative',
                        letterSpacing: '0.5px'
                      }}>
                        {status === 'upcoming' ? '🔔 Upcoming' : '✓ Completed'}
                      </span>
                    </div>
                    <h3 style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '700', 
                      color: 'white',
                      marginBottom: 0,
                      marginTop: '12px',
                      position: 'relative',
                      lineHeight: '1.3'
                    }}>
                      {reg.event.title}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '32px' }}>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        marginBottom: '14px',
                        color: '#64748b',
                        fontSize: '1.05rem'
                      }}>
                        <span style={{ fontSize: '1.3rem' }}>📍</span>
                        <span style={{ fontWeight: '500' }}>{reg.event.location}</span>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        marginBottom: '14px',
                        color: '#64748b',
                        fontSize: '1.05rem'
                      }}>
                        <span style={{ fontSize: '1.3rem' }}>📅</span>
                        <span style={{ fontWeight: '500' }}>{formatDate(reg.event.date)} at {reg.event.time}</span>
                      </div>
                    </div>

                    <div style={{
                      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                      padding: '20px',
                      borderRadius: '12px',
                      borderLeft: '4px solid #6366f1'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#475569',
                        fontSize: '0.95rem',
                        fontWeight: '600'
                      }}>
                        <span style={{ fontSize: '1.2rem' }}>🎫</span>
                        <span>Registered on: {formatDate(reg.registeredAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default EventHistory;
