import React, { useState, useEffect } from 'react';
import eventService, { Event } from '../../services/eventService';

const PendingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const fetchPendingEvents = async () => {
    try {
      setLoading(true);
      const pendingEvents = await eventService.getPendingEvents();
      setEvents(pendingEvents);
    } catch (err: any) {
      setError('Failed to load pending events');
      console.error('Error fetching pending events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEventAction = async (eventId: string, status: 'approved' | 'rejected') => {
    try {
      setProcessing(eventId);
      setError('');
      setSuccess('');
      
      await eventService.updateEventStatus(eventId, status);
      setSuccess(`Event ${status} successfully`);
      
      // Remove the event from the list
      setEvents(events.filter(event => event._id !== eventId));
      
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to ${status} event`);
    } finally {
      setProcessing('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatEventType = (type: string | undefined) => {
    if (!type) return 'Other';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
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
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: '500' }}>Loading pending events...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '50px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '12px'
          }}>
            <h1 style={{ 
              fontSize: '2.8rem', 
              fontWeight: '800', 
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              marginBottom: 0
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                borderRadius: '16px',
                fontSize: '2rem'
              }}>⚖️</span>
              Pending Event Approvals
            </h1>
            <div style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              color: 'white',
              padding: '14px 28px',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(251, 191, 36, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{ fontSize: '1.3rem' }}>⏳</span>
              {events.length} {events.length === 1 ? 'event' : 'events'} waiting
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: '1.1rem', marginLeft: '75px' }}>
            Review and approve/reject organizer submissions
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderLeft: '4px solid #ef4444',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#991b1b', fontSize: '1.05rem' }}>{error}</span>
            <button 
              onClick={() => setError('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#991b1b',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0 8px'
              }}
            >×</button>
          </div>
        )}
        {success && (
          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderLeft: '4px solid #10b981',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ color: '#065f46', fontSize: '1.05rem' }}>{success}</span>
            <button 
              onClick={() => setSuccess('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#065f46',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0 8px'
              }}
            >×</button>
          </div>
        )}

        {/* Content */}
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
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '50%',
              filter: 'blur(60px)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '50%',
              filter: 'blur(60px)'
            }}></div>
            <div style={{ fontSize: '5rem', marginBottom: '24px', position: 'relative' }}>✅</div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#1f2937', 
              marginBottom: '16px',
              position: 'relative'
            }}>
              All Events Reviewed!
            </h3>
            <p style={{ 
              color: '#64748b', 
              marginBottom: 0, 
              fontSize: '1.15rem',
              position: 'relative'
            }}>
              No pending events at the moment. All organizer submissions have been reviewed.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {events.map((event) => (
              <div 
                key={event._id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #f1f5f9'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                {/* Gradient Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  padding: '32px 40px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '50%',
                    filter: 'blur(40px)'
                  }}></div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    gap: '20px',
                    position: 'relative'
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        fontSize: '1.8rem', 
                        fontWeight: '700', 
                        color: 'white',
                        marginBottom: '16px',
                        lineHeight: '1.3'
                      }}>
                        {event.title}
                      </h3>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.25)',
                          backdropFilter: 'blur(10px)',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          🏷️ {formatEventType(event.eventType)}
                        </span>
                        <span style={{
                          background: 'rgba(255, 255, 255, 0.25)',
                          backdropFilter: 'blur(10px)',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          ⏳ Pending Review
                        </span>
                      </div>
                    </div>
                    <div style={{ 
                      textAlign: 'right',
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ 
                        fontSize: '0.85rem', 
                        color: 'rgba(255, 255, 255, 0.9)',
                        marginBottom: '4px',
                        fontWeight: '500'
                      }}>
                        Submitted
                      </div>
                      <div style={{ 
                        fontSize: '1rem', 
                        color: 'white',
                        fontWeight: '700'
                      }}>
                        {formatDate(event.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '40px' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr', 
                    gap: '40px'
                  }}>
                    {/* Left Column - Event Details */}
                    <div>
                      {/* Description */}
                      {event.description && (
                        <div style={{ marginBottom: '30px' }}>
                          <h4 style={{ 
                            fontSize: '1.1rem', 
                            fontWeight: '700', 
                            color: '#1f2937',
                            marginBottom: '12px'
                          }}>
                            📝 Event Description
                          </h4>
                          <p style={{ 
                            color: '#475569', 
                            lineHeight: '1.7',
                            fontSize: '1.05rem',
                            marginBottom: 0
                          }}>
                            {event.description}
                          </p>
                        </div>
                      )}

                      {/* Organizer Info */}
                      <div style={{ 
                        marginBottom: '30px', 
                        padding: '24px', 
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                        borderRadius: '16px', 
                        border: '2px solid #e2e8f0'
                      }}>
                        <h4 style={{ 
                          fontSize: '1.1rem', 
                          fontWeight: '700', 
                          color: '#1f2937',
                          marginBottom: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          👤 Organizer Details
                        </h4>
                        <div style={{ 
                          color: '#475569', 
                          fontSize: '1.05rem',
                          lineHeight: '1.8'
                        }}>
                          <div style={{ fontWeight: '600', color: '#1f2937' }}>
                            {event.organizer.firstName} {event.organizer.lastName}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                            <span>📧</span>
                            <span style={{ color: '#64748b' }}>{event.organizer.email}</span>
                          </div>
                        </div>
                      </div>

                      {/* Event Details Grid */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '16px'
                      }}>
                        <div style={{ 
                          padding: '20px', 
                          background: '#eff6ff', 
                          borderRadius: '12px', 
                          border: '2px solid #bfdbfe'
                        }}>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: '#1e40af', 
                            fontWeight: '700',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            📅 Date
                          </div>
                          <div style={{ 
                            color: '#1f2937', 
                            fontWeight: '600',
                            fontSize: '1.05rem'
                          }}>
                            {formatDate(event.date)}
                          </div>
                        </div>

                        <div style={{ 
                          padding: '20px', 
                          background: '#eff6ff', 
                          borderRadius: '12px', 
                          border: '2px solid #bfdbfe'
                        }}>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: '#1e40af', 
                            fontWeight: '700',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            🕐 Time
                          </div>
                          <div style={{ 
                            color: '#1f2937', 
                            fontWeight: '600',
                            fontSize: '1.05rem'
                          }}>
                            {event.time}
                          </div>
                        </div>

                        <div style={{ 
                          padding: '20px', 
                          background: '#fef3c7', 
                          borderRadius: '12px', 
                          border: '2px solid #fcd34d'
                        }}>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: '#92400e', 
                            fontWeight: '700',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            📍 Location
                          </div>
                          <div style={{ 
                            color: '#1f2937', 
                            fontWeight: '600',
                            fontSize: '1.05rem'
                          }}>
                            {event.location || 'Not specified'}
                          </div>
                        </div>

                        <div style={{ 
                          padding: '20px', 
                          background: '#dbeafe', 
                          borderRadius: '12px', 
                          border: '2px solid #93c5fd'
                        }}>
                          <div style={{ 
                            fontSize: '0.9rem', 
                            color: '#1e40af', 
                            fontWeight: '700',
                            marginBottom: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            👥 Capacity
                          </div>
                          <div style={{ 
                            color: '#1f2937', 
                            fontWeight: '600',
                            fontSize: '1.05rem'
                          }}>
                            {event.capacity} attendees
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Action Buttons */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'center',
                      gap: '20px'
                    }}>
                      <button
                        onClick={() => handleEventAction(event._id, 'approved')}
                        disabled={processing === event._id}
                        style={{
                          background: processing === event._id ? '#94a3b8' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          border: 'none',
                          borderRadius: '14px',
                          padding: '18px 28px',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: 'white',
                          cursor: processing === event._id ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: processing === event._id ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.3)',
                          outline: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px'
                        }}
                        onMouseEnter={(e) => {
                          if (processing !== event._id) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (processing !== event._id) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)';
                          }
                        }}
                      >
                        {processing === event._id ? (
                          <>
                            <div style={{ 
                              width: '20px', 
                              height: '20px', 
                              border: '3px solid rgba(255,255,255,0.3)', 
                              borderTop: '3px solid white', 
                              borderRadius: '50%', 
                              animation: 'spin 1s linear infinite'
                            }}></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <span style={{ fontSize: '1.3rem' }}>✅</span>
                            Approve Event
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleEventAction(event._id, 'rejected')}
                        disabled={processing === event._id}
                        style={{
                          background: processing === event._id ? '#94a3b8' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          border: 'none',
                          borderRadius: '14px',
                          padding: '18px 28px',
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: 'white',
                          cursor: processing === event._id ? 'not-allowed' : 'pointer',
                          transition: 'all 0.3s ease',
                          boxShadow: processing === event._id ? 'none' : '0 4px 15px rgba(239, 68, 68, 0.3)',
                          outline: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px'
                        }}
                        onMouseEnter={(e) => {
                          if (processing !== event._id) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (processing !== event._id) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                          }
                        }}
                      >
                        <span style={{ fontSize: '1.3rem' }}>❌</span>
                        Reject Event
                      </button>

                      <div style={{ 
                        textAlign: 'center', 
                        padding: '16px',
                        background: '#fef3c7',
                        borderRadius: '12px',
                        marginTop: '10px'
                      }}>
                        <small style={{ 
                          color: '#92400e', 
                          fontStyle: 'italic',
                          fontSize: '0.95rem',
                          fontWeight: '600'
                        }}>
                          ⚠️ Make your decision carefully
                        </small>
                      </div>
                    </div>
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

export default PendingEvents;
