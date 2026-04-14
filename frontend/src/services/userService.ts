import api from './api';

export interface EventHistory {
  _id: string;
  title: string;
  description?: string;
  eventType: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  status: string;
  eventStatus: 'upcoming' | 'completed' | 'cancelled';
  organizer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  registrationDate: string;
  totalRegistrations: number;
}

export interface UserEventHistory {
  upcomingEvents: EventHistory[];
  pastEvents: EventHistory[];
  totalEvents: number;
}

export interface UserStats {
  totalEvents: number;
  upcomingEvents: number;
  eventsByType: Array<{
    _id: string;
    count: number;
  }>;
}

class UserService {
  // Get user's event history
  async getEventHistory(): Promise<UserEventHistory> {
    const response = await api.get('/users/history');
    return response.data;
  }

  // Get user statistics
  async getUserStats(): Promise<UserStats> {
    const response = await api.get('/users/stats');
    return response.data;
  }
}

const userService = new UserService();
export default userService;