import React, { useState, useEffect, useCallback } from 'react';
import eventService, { Event, EventFilters } from '../../services/eventService';
import { useAuth } from '../../contexts/AuthContext';
import './EventList.css';

// Cache buster: 2026-01-14-NO-BOOTSTRAP-V4

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<EventFilters>({
    page: 1,
    limit: 12
  });
  const [pagination, setPagination] = useState<any>({});
  const [registering, setRegistering] = useState<string>('');

  const { isAuthenticated } = useAuth();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching events with filters:', filters); // Debug log
      const response = await eventService.getApprovedEvents(filters);
      console.log('Received events:', response.events.length); // Debug log
      setEvents(response.events);
      setPagination(response.pagination);
    } catch (err: any) {
      setError('Failed to load events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEvents();
  }, [filters, fetchEvents]);

  const handleRegister = async (eventId: string) => {
    if (!isAuthenticated) {
      alert('Please login to register for events');
      return;
    }

    try {
      setRegistering(eventId);
      await eventService.registerForEvent(eventId);
      await fetchEvents();
      alert('Successfully registered for event!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to register for event');
    } finally {
      setRegistering('');
    }
  };

  const handleUnregister = async (eventId: string) => {
    try {
      setRegistering(eventId);
      await eventService.unregisterFromEvent(eventId);
      await fetchEvents();
      alert('Successfully unregistered from event');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to unregister');
    } finally {
      setRegistering('');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatEventType = (type: string | undefined) => {
    if (!type) return 'Other';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  if (loading && events.length === 0) {
    return (
      <div className="event-list-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner"></div>
          <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-list-container">
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '3rem' }}>
        <div style={{ 
          display: 'inline-block',
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          padding: '1rem 2rem',
          borderRadius: '50px',
          marginBottom: '2rem',
          boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3)'
        }}>
          <span style={{ fontSize: '3rem' }}>📅</span>
        </div>
        <h2 style={{ 
          fontSize: '4rem', 
          fontWeight: 900, 
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-2px',
          lineHeight: 1.1
        }}>
          Discover Events
        </h2>
        <p style={{ fontSize: '1.3rem', color: '#64748b', marginBottom: 0, fontWeight: 500, maxWidth: '700px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.6 }}>
          Explore amazing opportunities and register for events that inspire you
        </p>
      </div>

      {/* Filter Section */}
      <div style={{ 
        background: 'white', 
        padding: '2.5rem', 
        borderRadius: '24px', 
        marginBottom: '4rem', 
        maxWidth: '1100px', 
        marginLeft: 'auto', 
        marginRight: 'auto',
        boxShadow: '0 10px 40px rgba(99, 102, 241, 0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <label style={{ 
              display: 'block', 
              fontSize: '1rem', 
              fontWeight: 700, 
              color: '#1e293b', 
              marginBottom: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              🎯 Filter by Type
            </label>
            <select
              value={filters.eventType || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFilters({ ...filters, eventType: value || undefined, page: 1 });
              }}
              style={{ 
                width: '100%',
                borderRadius: '14px', 
                border: '2px solid #e2e8f0',
                padding: '1rem 1.5rem',
                fontWeight: 600,
                color: '#1e293b',
                transition: 'all 0.3s ease',
                fontSize: '1.05rem',
                background: '#f8fafc',
                cursor: 'pointer',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '3rem'
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
            >
              <option value="">All Event Types</option>
              <option value="conference">🎤 Conference</option>
              <option value="workshop">🛠️ Workshop</option>
              <option value="seminar">📚 Seminar</option>
              <option value="meetup">☕ Meetup</option>
              <option value="competition">🏆 Competition</option>
              <option value="community">🤝 Community</option>
              <option value="volunteering">❤️ Volunteering</option>
              <option value="other">✨ Other</option>
            </select>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)', 
            padding: '1.75rem 2.5rem', 
            borderRadius: '16px',
            textAlign: 'center',
            minWidth: '200px',
            border: '2px solid rgba(99, 102, 241, 0.2)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎉</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#6366f1', marginBottom: '0.5rem' }}>
              {events.length}
            </div>
            <div style={{ fontSize: '0.95rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Event{events.length !== 1 ? 's' : ''} Found
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div style={{ 
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          color: '#991b1b',
          padding: '1.25rem 1.5rem',
          borderRadius: '14px',
          marginBottom: '2rem',
          fontWeight: 600,
          borderLeft: '4px solid #ef4444',
          maxWidth: '1100px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {error}
        </div>
      )}

      {events.length === 0 ? (
        <div className="no-events">
          <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>📭</div>
          <h3 style={{ color: '#1e293b', fontWeight: 800, fontSize: '2rem', marginBottom: '1rem' }}>No events found</h3>
          <p style={{ color: '#94a3b8', fontSize: '1.15rem' }}>Check back later for upcoming events! 🚀</p>
        </div>
      ) : (
        <>
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                {/* Card Header with Gradient */}
                <div style={{ 
                  background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                  margin: '-32px -32px 2.5rem -32px',
                  padding: '2.5rem 2rem',
                  borderRadius: '24px 24px 0 0',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ 
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '180px',
                    height: '180px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    transform: 'translate(40%, -40%)'
                  }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', position: 'relative', zIndex: 1, gap: '1rem' }}>
                    <span style={{ 
                      borderRadius: '10px', 
                      padding: '0.65rem 1.25rem',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      background: 'rgba(255, 255, 255, 0.25)',
                      color: 'white',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      textTransform: 'capitalize',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {formatEventType(event.eventType)}
                    </span>
                    <div style={{ 
                      background: 'rgba(255, 255, 255, 0.25)',
                      padding: '0.65rem 1.25rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <span style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
                        📅 {formatDate(event.date)}
                      </span>
                    </div>
                  </div>
                  <div style={{ marginTop: '1.25rem', position: 'relative', zIndex: 1 }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.95)', fontWeight: 700, fontSize: '1.05rem', display: 'block' }}>
                      ⏰ {event.time}
                    </span>
                  </div>
                </div>
                
                {/* Card Content */}
                <h5 style={{ color: '#0f172a', fontWeight: 900, marginBottom: '1.5rem', fontSize: '1.5rem', lineHeight: 1.3, minHeight: '65px' }}>
                  {event.title}
                </h5>
                
                {event.description && (
                  <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.7, minHeight: '85px' }}>
                    {event.description.length > 120 
                      ? `${event.description.substring(0, 120)}...` 
                      : event.description}
                  </p>
                )}
                
                {/* Location and Organizer */}
                <div style={{ 
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                  padding: '1.75rem', 
                  borderRadius: '16px',
                  marginBottom: '2rem',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <span style={{ color: '#64748b', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.35rem' }}>📍</span>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{event.location || 'Location TBA'}</span>
                    </span>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.35rem' }}>🎯</span>
                      <span style={{ fontWeight: 600, color: '#1e293b' }}>{event.organizer?.name || 'Unknown'}</span>
                    </span>
                  </div>
                </div>
                
                {/* Capacity */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ 
                    background: '#f1f5f9', 
                    padding: '1.5rem', 
                    borderRadius: '14px',
                    border: '2px solid #e2e8f0'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                      <span style={{ color: '#1e293b', fontSize: '1.05rem', fontWeight: 700 }}>
                        👥 Capacity
                      </span>
                      <span style={{ 
                        padding: '0.45rem 1rem',
                        borderRadius: '20px',
                        background: ((event.registrationCount || event.totalRegistrations || 0) < event.capacity) 
                          ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                          : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.9rem'
                      }}>
                        {((event.registrationCount || event.totalRegistrations || 0) < event.capacity) ? '✓ Available' : 'Full'}
                      </span>
                    </div>
                    <div style={{ height: '16px', borderRadius: '8px', backgroundColor: 'white', overflow: 'hidden', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
                      <div style={{ 
                        width: `${((event.registrationCount || event.totalRegistrations || 0) / event.capacity) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)',
                        borderRadius: '8px',
                        transition: 'width 0.5s ease',
                        boxShadow: '0 2px 6px rgba(99, 102, 241, 0.4)'
                      }}></div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{ color: '#6366f1', fontSize: '1.4rem', fontWeight: 900 }}>
                        {event.registrationCount || event.totalRegistrations || 0}
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '1.1rem', fontWeight: 600, margin: '0 0.5rem' }}>/</span>
                      <span style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 700 }}>
                        {event.capacity}
                      </span>
                      <span style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 600, marginLeft: '0.75rem' }}>
                        registered
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <div style={{ marginTop: 'auto' }}>
                  {isAuthenticated ? (
                    event.isRegistered ? (
                      <button
                        onClick={() => handleUnregister(event._id)}
                        disabled={registering === event._id}
                        style={{ 
                          borderRadius: '12px', 
                          fontWeight: 700, 
                          width: '100%',
                          border: '2px solid #ef4444',
                          background: 'transparent',
                          color: '#ef4444',
                          transition: 'all 0.3s ease',
                          fontSize: '1.05rem',
                          padding: '1rem',
                          cursor: registering === event._id ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          if (registering !== event._id) {
                            e.currentTarget.style.background = '#ef4444';
                            e.currentTarget.style.color = 'white';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = '#ef4444';
                        }}
                      >
                        {registering === event._id ? '⏳ Processing...' : '❌ Unregister'}
                      </button>
                    ) : ((event.registrationCount || event.totalRegistrations || 0) < event.capacity) ? (
                      <button
                        onClick={() => handleRegister(event._id)}
                        disabled={registering === event._id}
                        style={{ 
                          borderRadius: '12px', 
                          fontWeight: 700, 
                          width: '100%',
                          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                          border: 'none',
                          color: 'white',
                          transition: 'all 0.3s ease',
                          fontSize: '1.05rem',
                          padding: '1rem',
                          boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                          cursor: registering === event._id ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          if (registering !== event._id) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(99, 102, 241, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                        }}
                      >
                        {registering === event._id ? '⏳ Registering...' : '✅ Register for Event'}
                      </button>
                    ) : (
                      <button 
                        disabled 
                        style={{ 
                          borderRadius: '12px', 
                          width: '100%', 
                          fontWeight: 700,
                          opacity: 0.6,
                          fontSize: '1.05rem',
                          padding: '1rem',
                          background: '#94a3b8',
                          color: 'white',
                          border: 'none',
                          cursor: 'not-allowed'
                        }}
                      >
                        🔴 Event Full
                      </button>
                    )
                  ) : (
                    <div style={{ 
                      background: 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)',
                      padding: '1.5rem',
                      borderRadius: '14px',
                      textAlign: 'center',
                      border: '2px dashed #6366f1'
                    }}>
                      <span style={{ color: '#1e293b', fontSize: '1.05rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                        Want to join this event?
                      </span>
                      <a href="/login" style={{ 
                        color: '#6366f1', 
                        textDecoration: 'none', 
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        🔐 Login to Register
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages && pagination.totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setFilters({ ...filters, page: Math.max(1, (filters.page || 1) - 1) })}
                disabled={!pagination.hasPrev}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  background: 'white',
                  color: '#6366f1',
                  fontWeight: 700,
                  cursor: pagination.hasPrev ? 'pointer' : 'not-allowed',
                  opacity: pagination.hasPrev ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
              >
                ← Previous
              </button>
              
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setFilters({ ...filters, page: i + 1 })}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    border: pagination.currentPage === i + 1 ? '2px solid #6366f1' : '2px solid #e2e8f0',
                    background: pagination.currentPage === i + 1 ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'white',
                    color: pagination.currentPage === i + 1 ? 'white' : '#6366f1',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minWidth: '50px',
                    fontSize: '1rem'
                  }}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setFilters({ ...filters, page: (filters.page || 1) + 1 })}
                disabled={!pagination.hasNext}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  background: 'white',
                  color: '#6366f1',
                  fontWeight: 700,
                  cursor: pagination.hasNext ? 'pointer' : 'not-allowed',
                  opacity: pagination.hasNext ? 1 : 0.5,
                  transition: 'all 0.3s ease',
                  fontSize: '1rem'
                }}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EventList;
