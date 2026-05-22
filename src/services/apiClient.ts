import axios from 'axios';
import { toast } from 'react-toastify';
import { store } from '../app/store';
import { logout } from '../features/auth/slices/authSlice';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://take-home-test-api.nutech-integrasi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;

      store.dispatch(logout());

      if (currentPath !== '/login') {
        window.location.href = '/login';

        toast.error('Sesi Anda telah berakhir. Silakan login kembali.');
      }
    }
    return Promise.reject(error);
  }
);

