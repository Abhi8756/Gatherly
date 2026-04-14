import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth service
export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  signup: (name: string, email: string, password: string, role: string) =>
    api.post('/auth/signup', { name, email, password, role }),

  getCurrentUser: () =>
    api.get('/auth/me'),
};

// Event service
export const eventService = {
  getApprovedEvents: (date?: string, location?: string) => {
    const params: any = {};
    if (date) params.date = date;
    if (location) params.location = location;
    return api.get('/events/approved', { params });
  },

  createEvent: (title: string, description: string, date: string, time: string, location: string, capacity: number) =>
    api.post('/events/create', { title, description, date, time, location, capacity }),

  getUserEvents: () =>
    api.get('/events/my-events'),

  getPendingEvents: () =>
    api.get('/events/pending'),

  approveEvent: (eventId: string) =>
    api.put(`/events/approve/${eventId}`),

  rejectEvent: (eventId: string) =>
    api.put(`/events/reject/${eventId}`),

  registerForEvent: (eventId: string) =>
    api.post(`/events/register/${eventId}`),

  cancelRegistration: (eventId: string) =>
    api.delete(`/events/cancel/${eventId}`),

  getUserRegistrations: () =>
    api.get('/events/user-registrations'),
};

// User service
export const userService = {
  getAllUsers: () =>
    api.get('/users/all'),

  getUserById: (userId: string) =>
    api.get(`/users/${userId}`),

  updateProfile: (name: string, email: string) =>
    api.put('/users/profile/update', { name, email }),
};