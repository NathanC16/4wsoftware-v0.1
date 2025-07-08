import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Interceptor para log de erros (opcional)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Erro na API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
