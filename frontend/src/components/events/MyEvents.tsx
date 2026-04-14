import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService, { Event } from '../../services/eventService';

const MyEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrganizerEvents();
  }, []);

  const fetchOrganizerEvents = async () => {
    try {
      setLoading(true);
      const organizerEvents = await eventService.getOrganizerEvents();
      setEvents(organizerEvents);
    } catch (err: any) {
      setError('Failed to load your events');
      console.error('Error fetching organizer events:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatEventType = (type: string | undefined) => {
    if (!type) return 'Other';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: '#f59e0b',
      approved: '#10b981',
      rejected: '#ef4444',
      cancelled: '#64748b'
    };
    return colors[status.toLowerCase()] || '#64748b';
  };

  const getEventTypeColor = (type: string | undefined) => {
    if (!type) return '#64748b';
    const colors: { [key: string]: string } = {
      conference: '#6366f1',
      workshop: '#10b981',
      seminar: '#3b82f6',
      meetup: '#f59e0b',
      competition: '#ef4444',
      other: '#64748b'
    };
    return colors[type.toLowerCase()] || '#64748b';
  };

  const getEventsByStatus = (status: string) => {
    return events.filter(event => event.status === status);
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
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Loading your events...</p>
        </div>
      </div>
    );
  }

  const pendingEvents = getEventsByStatus('Pending');
  const approvedEvents = getEventsByStatus('Approved');
  const rejectedEvents = getEventsByStatus('Rejected');

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
      minHeight: '100vh', 
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '50px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2.8rem', 
              fontWeight: '800', 
              color: '#1f2937', 
              marginBottom: '8px',
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
              }}>👨‍💼</span>
              My Events
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginLeft: '75px' }}>
              Manage and track all your created events
            </p>
          </div>
          <button 
            onClick={() => navigate('/create-event')}
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              fontSize: '1.05rem',
              fontWeight: '600',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
            }}
          >
            ✨ Create New Event
          </button>
        </div>

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderLeft: '4px solid #ef4444',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '40px',
            color: '#991b1b',
            fontSize: '1.05rem'
          }}>
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '30px',
          marginBottom: '50px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center',
            border: '2px solid #fef3c7',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: 'rgba(245, 158, 11, 0.1)',
              borderRadius: '50%',
              filter: 'blur(30px)'
            }}></div>
            <h3 style={{ 
              color: '#f59e0b', 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '12px',
              position: 'relative'
            }}>
              {pendingEvents.length}
            </h3>
            <p style={{ 
              color: '#64748b', 
              fontSize: '1.1rem', 
              fontWeight: '600',
              marginBottom: 0,
              position: 'relative'
            }}>
              ⏳ Pending
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center',
            border: '2px solid #d1fae5',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '50%',
              filter: 'blur(30px)'
            }}></div>
            <h3 style={{ 
              color: '#10b981', 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '12px',
              position: 'relative'
            }}>
              {approvedEvents.length}
            </h3>
            <p style={{ 
              color: '#64748b', 
              fontSize: '1.1rem', 
              fontWeight: '600',
              marginBottom: 0,
              position: 'relative'
            }}>
              ✅ Approved
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center',
            border: '2px solid #fee2e2',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '50%',
              filter: 'blur(30px)'
            }}></div>
            <h3 style={{ 
              color: '#ef4444', 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '12px',
              position: 'relative'
            }}>
              {rejectedEvents.length}
            </h3>
            <p style={{ 
              color: '#64748b', 
              fontSize: '1.1rem', 
              fontWeight: '600',
              marginBottom: 0,
              position: 'relative'
            }}>
              ❌ Rejected
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            textAlign: 'center',
            border: '2px solid #e0e7ff',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '50%',
              filter: 'blur(30px)'
            }}></div>
            <h3 style={{ 
              color: '#6366f1', 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '12px',
              position: 'relative'
            }}>
              {events.length}
            </h3>
            <p style={{ 
              color: '#64748b', 
              fontSize: '1.1rem', 
              fontWeight: '600',
              marginBottom: 0,
              position: 'relative'
            }}>
              📊 Total Events
            </p>
          </div>
        </div>

        {/* Events Display */}
        {events.length === 0 ? (
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
            <div style={{ fontSize: '5rem', marginBottom: '24px', position: 'relative' }}>📋</div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '16px',
              position: 'relative'
            }}>
              No Events Created Yet
            </h3>
            <p style={{ 
              color: '#64748b', 
              marginBottom: '32px', 
              fontSize: '1.15rem',
              position: 'relative'
            }}>
              Create your first event to get started and reach your audience!
            </p>
            <button 
              onClick={() => navigate('/create-event')}
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 40px',
                fontSize: '1.05rem',
                fontWeight: '600',
                color: 'white',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              Create First Event
            </button>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', 
            gap: '40px'
          }}>
            {events.map((event) => (
              <div 
                key={event._id}
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
                {/* Card Header with Gradient */}
                <div style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  padding: '28px 32px',
                  position: 'relative',
                  overflow: 'hidden'
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
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      background: getEventTypeColor(event.eventType),
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      position: 'relative'
                    }}>
                      {formatEventType(event.eventType)}
                    </span>
                    <span style={{
                      background: getStatusColor(event.status),
                      color: 'white',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                      position: 'relative'
                    }}>
                      {event.status}
                    </span>
                  </div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: 'white',
                    marginBottom: 0,
                    position: 'relative'
                  }}>
                    {event.title}
                  </h3>
                </div>

                {/* Card Body */}
                <div style={{ padding: '32px' }}>
                  {event.description && (
                    <p style={{ 
                      color: '#64748b', 
                      fontSize: '1.05rem', 
                      lineHeight: '1.6',
                      marginBottom: '24px'
                    }}>
                      {event.description.length > 120
                        ? `${event.description.substring(0, 120)}...`
                        : event.description}
                    </p>
                  )}

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      marginBottom: '12px',
                      color: '#64748b',
                      fontSize: '1rem'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>📅</span>
                      <span>{formatDate(event.date)} at {event.time}</span>
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      color: '#64748b',
                      fontSize: '1rem'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Capacity Progress */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      color: '#475569'
                    }}>
                      <span>Registrations</span>
                      <span>{event.totalRegistrations || event.registrationCount || 0} / {event.capacity}</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '10px',
                      background: '#e2e8f0',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${Math.min(((event.totalRegistrations || event.registrationCount || 0) / event.capacity) * 100, 100)}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)',
                        borderRadius: '10px',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>

                  <div style={{
                    paddingTop: '20px',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      color: '#94a3b8',
                      fontWeight: '500'
                    }}>
                      Created: {formatDate(event.createdAt)}
                    </span>
                    {event.status === 'Approved' && (
                      <button style={{
                        background: 'transparent',
                        border: '2px solid #6366f1',
                        color: '#6366f1',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#6366f1';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#6366f1';
                      }}>
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
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

export default MyEvents;
