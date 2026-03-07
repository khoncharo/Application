import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const tokens = localStorage.getItem('tokens');
  if (tokens) {
    const { accessToken } = JSON.parse(tokens);
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const tokens = localStorage.getItem('tokens');
        if (!tokens) throw new Error('No tokens');
        const { refreshToken } = JSON.parse(tokens);
        const res = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });
        localStorage.setItem('tokens', JSON.stringify(res.data));
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return apiClient(original);
      } catch {
        localStorage.removeItem('tokens');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
