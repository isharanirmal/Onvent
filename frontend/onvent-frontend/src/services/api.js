import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:8085', // Your Spring Boot backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;