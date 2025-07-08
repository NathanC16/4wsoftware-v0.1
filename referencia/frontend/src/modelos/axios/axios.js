import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ajuste se o backend estiver em outro host/porta
});

export default api;
