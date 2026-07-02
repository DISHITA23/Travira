import axios from 'axios';
import { getToken } from './auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getTrips = async () => {
    const response = await api.get('/trips');
    return response.data;
};

export const createTrip = async (tripData) => {
    const response = await api.post('/trips', tripData);
    return response.data;
};

export const getExpenses = async (tripId) => {
    const response = await api.get(`/trips/${tripId}/expenses`);
    return response.data;
};

export const uploadReceipt = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/expenses/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export default api;