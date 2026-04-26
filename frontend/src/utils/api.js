import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/password', data)
};

export const doctors = {
  getAll: (params) => api.get('/doctors', { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getSlots: (id, date) => api.get(`/doctors/${id}/slots`, { params: { date } }),
  addReview: (id, data) => api.post(`/doctors/${id}/reviews`, data)
};

export const hospitals = {
  getAll: (params) => api.get('/hospitals', { params }),
  getById: (id) => api.get(`/hospitals/${id}`)
};

export const appointments = {
  book: (data) => api.post('/appointments', data),
  getAll: () => api.get('/appointments'),
  cancel: (id) => api.put(`/appointments/${id}/cancel`)
};

export const ai = {
  checkSymptoms: (data) => api.post('/ai/symptom-checker', data),
  chat: (data) => api.post('/ai/chat', data)
};

export const health = {
  addRecord: (data) => api.post('/health-records', data),
  getAll: (params) => api.get('/health-records', { params }),
  delete: (id) => api.delete(`/health-records/${id}`)
};

export const payment = {
  createOrder: (data) => api.post('/payment/create-order', data),
  verify: (data) => api.post('/payment/verify', data)
};

export default api;