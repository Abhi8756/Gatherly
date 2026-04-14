import api from './api';

export interface Event {
  _id: string;
  title: string;
  description?: string;
  eventType?: 'conference' | 'workshop' | 'seminar' | 'meetup' | 'competition' | 'community' | 'volunteering' | 'other';
  date: string;
  time: string;
  venue: string;
  location?: string;
  capacity: number;
  organizer: {
    _id: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  status: 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
  registrationCount?: number;
  totalRegistrations?: number;
  isRegistered?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  eventType?: 'conference' | 'workshop' | 'seminar' | 'meetup' | 'competition' | 'community' | 'volunteering' | 'other';
  date: string;
  time: string;
  location: string;
  capacity: number;
}

export interface EventFilters {
  page?: number;
  limit?: number;
  eventType?: string;
  date?: string;
}

export interface EventsResponse {
  events: Event[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalEvents: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface Registration {
  _id: string;
  user: string;
  event: Event;
  status: 'Registered' | 'Cancelled';
  registeredAt: string;
}

// Mock events data for demonstration
const MOCK_EVENTS: Event[] = [
  {
    _id: '1',
    title: 'React Advanced Patterns Workshop',
    description: 'Deep dive into advanced React patterns including custom hooks, compound components, and render props. Perfect for intermediate React developers.',
    eventType: 'workshop',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '10:00 AM',
    venue: 'Tech Hub Downtown, Conference Room A',
    capacity: 50,
    organizer: {
      _id: 'org1',
      name: 'Sarah Chen',
      email: 'sarah@techevents.com'
    },
    status: 'Approved',
    registrationCount: 32,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '2',
    title: 'Web Development Summit 2026',
    description: 'Annual conference bringing together the brightest minds in web development. Network with industry leaders and learn about cutting-edge technologies.',
    eventType: 'conference',
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '09:00 AM',
    venue: 'Convention Center, Main Hall',
    capacity: 500,
    organizer: {
      _id: 'org2',
      name: 'Mike Johnson',
      email: 'mike@webdevents.com'
    },
    status: 'Approved',
    registrationCount: 287,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '3',
    title: 'AI & Machine Learning Seminar',
    description: 'Explore the latest trends in artificial intelligence and machine learning. Featuring talks from leading AI researchers and engineers.',
    eventType: 'seminar',
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '02:00 PM',
    venue: 'Innovation Hub, Auditorium 2',
    capacity: 150,
    organizer: {
      _id: 'org3',
      name: 'Dr. Priya Sharma',
      email: 'priya@aidevents.com'
    },
    status: 'Approved',
    registrationCount: 98,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '4',
    title: 'Startup Meetup - Founder Stories',
    description: 'Connect with fellow entrepreneurs and hear inspiring stories from successful founders. Network over coffee and snacks.',
    eventType: 'meetup',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '06:00 PM',
    venue: 'Coffee & Code Cafe, Downtown',
    capacity: 80,
    organizer: {
      _id: 'org4',
      name: 'Alex Rodriguez',
      email: 'alex@startupevents.com'
    },
    status: 'Approved',
    registrationCount: 54,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '5',
    title: 'Coding Challenge & Competition',
    description: 'Compete with other developers in real-time coding challenges. Win prizes and showcase your skills!',
    eventType: 'competition',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '11:00 AM',
    venue: 'Tech Campus, Lab Building',
    capacity: 100,
    organizer: {
      _id: 'org5',
      name: 'Jason Lee',
      email: 'jason@codingcompetitions.com'
    },
    status: 'Approved',
    registrationCount: 67,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '6',
    title: 'Community Coding Bootcamp',
    description: 'Free coding bootcamp for beginners. Learn JavaScript, HTML, and CSS from scratch. All experience levels welcome!',
    eventType: 'community',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '04:00 PM',
    venue: 'Community Center, Room 101',
    capacity: 40,
    organizer: {
      _id: 'org6',
      name: 'Emma Wilson',
      email: 'emma@communitycode.com'
    },
    status: 'Approved',
    registrationCount: 28,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '7',
    title: 'Open Source Contribution Drive',
    description: 'Join us for a day of contributing to open source projects. Great for beginners and experienced developers alike.',
    eventType: 'volunteering',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '10:00 AM',
    venue: 'GitHub Hub Office',
    capacity: 60,
    organizer: {
      _id: 'org7',
      name: 'David Brown',
      email: 'david@opensource.com'
    },
    status: 'Approved',
    registrationCount: 41,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    _id: '8',
    title: 'Cloud Architecture Deep Dive',
    description: 'Learn advanced cloud architecture patterns using AWS, Azure, and Google Cloud. Practical examples included.',
    eventType: 'workshop',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '01:00 PM',
    venue: 'Cloud Center, Training Room',
    capacity: 45,
    organizer: {
      _id: 'org8',
      name: 'Lisa Zhang',
      email: 'lisa@cloudacademy.com'
    },
    status: 'Approved',
    registrationCount: 38,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
  }
];

class EventService {
  // Get all approved events (public) - ONLY from database, no mock events
  async getApprovedEvents(filters: EventFilters = {}): Promise<EventsResponse> {
    try {
      // Build query params from filters
      const params = new URLSearchParams();
      if (filters.eventType) params.append('eventType', filters.eventType);
      if (filters.date) params.append('date', filters.date);

      const response = await api.get(`/events/approved?${params.toString()}`);
      
      // Backend returns array directly
      const responseData = Array.isArray(response.data) ? response.data : response.data.events || [];
      
      // Return ONLY real events from database - NO FALLBACK TO MOCK EVENTS
      return {
        events: responseData,
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalEvents: responseData.length,
          hasNext: false,
          hasPrev: false
        }
      };
    } catch (error) {
      console.error('Error in getApprovedEvents:', error);
      // Return empty array on error - NO MOCK EVENTS
      return {
        events: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalEvents: 0,
          hasNext: false,
          hasPrev: false
        }
      };
    }
  }

  // Create new event (organizers only)
  async createEvent(data: CreateEventData): Promise<Event> {
    const response = await api.post('/events/create', data);
    return response.data.event;
  }

  // Get organizer's events
  async getOrganizerEvents(status?: string): Promise<Event[]> {
    const response = await api.get('/events/my-events');
    return response.data || [];
  }

  // Get pending events (admin only)
  async getPendingEvents(): Promise<Event[]> {
    const response = await api.get('/events/pending');
    return response.data || [];
  }

  // Update event status (admin only)
  async updateEventStatus(eventId: string, status: 'approved' | 'rejected'): Promise<Event> {
    if (status === 'approved') {
      const response = await api.put(`/events/approve/${eventId}`, {});
      return response.data.event;
    } else {
      const response = await api.put(`/events/reject/${eventId}`, {});
      return response.data.event;
    }
  }

  // Register for event
  async registerForEvent(eventId: string): Promise<void> {
    await api.post(`/events/register/${eventId}`);
  }

  // Unregister from event
  async unregisterFromEvent(eventId: string): Promise<void> {
    await api.delete(`/events/cancel/${eventId}`);
  }

  // Get event details
  async getEventDetails(eventId: string): Promise<Event> {
    const response = await api.get(`/events/${eventId}`);
    return response.data.event || response.data;
  }

  // Get user registrations
  async getUserRegistrations(): Promise<Registration[]> {
    const response = await api.get('/events/user-registrations');
    return response.data || [];
  }
}

const eventService = new EventService();
export default eventService;