import axios from 'axios';

const api = axios.create({
  baseURL: "https://task-manager-api-hy1t.onrender.com"
});

export default api;
