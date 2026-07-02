import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const tripAPI = {
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  create: (tripData) => api.post('/trips', tripData),
  update: (id, tripData) => api.put(`/trips/${id}`, tripData),
  delete: (id) => api.delete(`/trips/${id}`),
  addMember: (tripId, userId) => api.post(`/trips/${tripId}/members`, { userId })
};

export const expenseAPI = {
  getByTrip: (tripId) => api.get(`/expenses/trip/${tripId}`),
  create: (expenseData) => api.post('/expenses', expenseData),
  update: (id, expenseData) => api.put(`/expenses/${id}`, expenseData),
  delete: (id) => api.delete(`/expenses/${id}`),
  uploadReceipt: (file) => {
    const formData = new FormData();
    formData.append('receipt', file);
    return api.post('/expenses/scan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

export const aiAPI = {
  chatbot: (message) => api.post('/ai/chat', { message }),
  generateSummary: (tripId) => api.get(`/ai/summary/${tripId}`),
  analyzeExpenses: (tripId) => api.get(`/ai/analyze/${tripId}`)
};

export default api;