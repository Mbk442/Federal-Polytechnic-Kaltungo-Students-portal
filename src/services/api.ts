// src/services/api.ts
// API client for backend communication

import axios, { AxiosInstance, AxiosError } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
      timeout: 10000,
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle errors
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  login = (email: string, password: string) =>
    this.client.post('/auth/login', { email, password });

  register = (data: any) => this.client.post('/auth/register', data);

  // Student endpoints
  getProfile = () => this.client.get('/student/profile');

  updateProfile = (data: any) => this.client.put('/student/profile', data);

  // Course endpoints
  getCourses = () => this.client.get('/courses');

  enrollCourse = (courseId: string) => this.client.post('/courses/enroll', { courseId });

  // Grades endpoints
  getGrades = () => this.client.get('/grades');

  // Fees endpoints
  getFeesStatus = () => this.client.get('/fees/status');

  payFees = (data: any) => this.client.post('/fees/pay', data);
}

export const apiClient = new ApiClient();
