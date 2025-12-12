import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only redirect if there's an existing token (token expired)
            // Don't redirect on login endpoint failures
            const token = sessionStorage.getItem('token');
            if (token && error.config?.url !== '/api/auth/login') {
                // Token expired or invalid
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
