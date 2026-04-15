import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../../services/eventService';

const CreateEvent: React.FC = () => {
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    eventType: 'conference' | 'workshop' | 'seminar' | 'meetup' | 'competition' | 'community' | 'volunteering' | 'other';
    date: string;
    time: string;
    location: string;
    capacity: number;
  }>({
    title: '',
    description: '',
    eventType: 'other',
    date: '',
    time: '',
    location: '',
    capacity: 50,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'capacity' ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.title.trim()) {
        setError('Event title is required');
        setLoading(false);
        return;
      }
      if (!formData.date) {
        setError('Event date is required');
        setLoading(false);
        return;
      }
      if (!formData.time) {
        setError('Event time is required');
        setLoading(false);
        return;
      }
      if (!formData.location.trim()) {
        setError('Event location is required');
        setLoading(false);
        return;
      }
      if (formData.capacity < 1) {
        setError('Capacity must be at least 1');
        setLoading(false);
        return;
      }

      await eventService.createEvent(formData);
      setSuccess('Event created successfully! It will be visible after admin approval.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        eventType: 'other',
        date: '',
        time: '',
        location: '',
        capacity: 50,
      });

      // Navigate to organizer's events page after 2 seconds
      setTimeout(() => {
        navigate('/my-events');
      }, 2000);
    } catch (err: any) {
      console.error('Event creation error:', err);
      console.error('Error response:', err.response?.data);
      
      // Handle different error formats
      let errorMsg = 'Failed to create event';
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        errorMsg = err.response.data.errors.map((e: any) => e.msg || e.message || e).join(', ');
      } else if (err.response?.data?.error) {
        errorMsg = err.response.data.error;
      } else if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '2.8rem', 
            fontWeight: '800', 
            color: '#1f2937', 
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
            }}>✨</span>
            Create New Event
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
            Fill in the details for your exciting event
          </p>
        </div>

        {/* Form Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {/* Decorative Elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            left: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(99, 102, 241, 0.1)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(236, 72, 153, 0.1)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}></div>

          {/* Gradient Header */}
          <div style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            padding: '40px 60px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-30px',
              right: '-30px',
              width: '150px',
              height: '150px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              filter: 'blur(40px)'
            }}></div>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: '700', 
              color: 'white',
              marginBottom: '8px',
              position: 'relative'
            }}>
              Event Details
            </h2>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              marginBottom: 0,
              fontSize: '1.05rem',
              position: 'relative'
            }}>
              All fields marked with * are required
            </p>
          </div>

          {/* Form Body */}
          <div style={{ padding: '50px 60px', position: 'relative' }}>
            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderLeft: '4px solid #ef4444',
                borderRadius: '12px',
                padding: '20px 24px',
                marginBottom: '30px',
                color: '#991b1b',
                fontSize: '1.05rem'
              }}>
                {error}
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
                color: '#065f46',
                fontSize: '1.05rem'
              }}>
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Row 1: Title and Event Type */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '2fr 1fr', 
                gap: '30px',
                marginBottom: '30px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontWeight: '600', 
                    fontSize: '1.05rem', 
                    marginBottom: '12px', 
                    color: '#1f2937'
                  }}>
                    📝 Event Title <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Give your event a catchy title"
                    maxLength={200}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      padding: '14px 18px',
                      fontSize: '1.05rem',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1';
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    fontWeight: '600', 
                    fontSize: '1.05rem', 
                    marginBottom: '12px', 
                    color: '#1f2937'
                  }}>
                    🎭 Event Type <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      padding: '14px 18px',
                      fontSize: '1.05rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      cursor: 'pointer',
                      background: 'white'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1';
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="other">Other</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="meetup">Meetup</option>
                    <option value="competition">Competition</option>
                    <option value="community">Community</option>
                    <option value="volunteering">Volunteering</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Description */}
              <div style={{ marginBottom: '30px' }}>
                <label style={{ 
                  display: 'block',
                  fontWeight: '600', 
                  fontSize: '1.05rem', 
                  marginBottom: '12px', 
                  color: '#1f2937'
                }}>
                  📄 Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell attendees what to expect..."
                  maxLength={1000}
                  rows={4}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    padding: '14px 18px',
                    fontSize: '1.05rem',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6366f1';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <small style={{ color: '#64748b', marginTop: '8px', display: 'block', fontSize: '0.95rem' }}>
                  Optional - Add event details to attract attendees
                </small>
              </div>

              {/* Row 3: Date, Time, and Capacity */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr', 
                gap: '30px',
                marginBottom: '30px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontWeight: '600', 
                    fontSize: '1.05rem', 
                    marginBottom: '12px', 
                    color: '#1f2937'
                  }}>
                    📅 Date <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={minDate}
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      padding: '14px 18px',
                      fontSize: '1.05rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1';
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    fontWeight: '600', 
                    fontSize: '1.05rem', 
                    marginBottom: '12px', 
                    color: '#1f2937'
                  }}>
                    🕐 Time <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      padding: '14px 18px',
                      fontSize: '1.05rem',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1';
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{ 
                    display: 'block',
                    fontWeight: '600', 
                    fontSize: '1.05rem', 
                    marginBottom: '12px', 
                    color: '#1f2937'
                  }}>
                    👥 Capacity <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    min="1"
                    max="10000"
                    placeholder="50"
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '2px solid #e2e8f0',
                      padding: '14px 18px',
                      fontSize: '1.05rem',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#6366f1';
                      e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Row 4: Location */}
              <div style={{ marginBottom: '40px' }}>
                <label style={{ 
                  display: 'block',
                  fontWeight: '600', 
                  fontSize: '1.05rem', 
                  marginBottom: '12px', 
                  color: '#1f2937'
                }}>
                  📍 Location <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Where will the event take place?"
                  maxLength={200}
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    padding: '14px 18px',
                    fontSize: '1.05rem',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#6366f1';
                    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '20px',
                marginBottom: '30px'
              }}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading ? '#94a3b8' : 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 32px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'white',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: loading ? 'none' : '0 4px 15px rgba(99, 102, 241, 0.3)',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
                    }
                  }}
                >
                  {loading ? '⏳ Creating...' : '🚀 Create Event'}
                </button>
                
                <button
                  type="button"
                  onClick={() => navigate('/my-events')}
                  style={{
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '16px 32px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  Cancel
                </button>
              </div>

              {/* Footer Note */}
              <div style={{ 
                textAlign: 'center', 
                padding: '20px', 
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
                borderRadius: '12px', 
                border: '2px solid #e2e8f0'
              }}>
                <p style={{ 
                  color: '#64748b', 
                  marginBottom: 0, 
                  fontSize: '1.05rem',
                  fontWeight: '500'
                }}>
                  ✓ Your event will require admin approval before appearing to users
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
