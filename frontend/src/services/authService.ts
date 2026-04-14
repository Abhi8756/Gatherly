import api from './api';

export interface User {
  _id: string;
  username?: string;
  email: string;
  role: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: 'organizer' | 'participant';
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data.user;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.put('/auth/profile', data);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isOrganizer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'organizer' || user?.role === 'admin';
  }
}

const authService = new AuthService();
export default authService;