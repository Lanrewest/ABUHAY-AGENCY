import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    withCredentials: true,
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const register = (data) => API.post('/api/auth/register', data);
export const login = (data) => API.post('/api/auth/login', data);

export const getProperties = () => API.get('/api/properties');
export const getProperty = (id) => API.get(`/api/properties/${id}`);
export const createLead = (data) => API.post('/api/leads', data);
export const createProperty = (data) => API.post('/api/properties', data);

export default API;