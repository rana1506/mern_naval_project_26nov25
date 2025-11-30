import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000
});

// request interceptor to attach token
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('user');
  if (raw) {
    try {
      const user = JSON.parse(raw);
      if (user.token) config.headers.Authorization = `Bearer ${user.token}`;
    } catch {}
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
