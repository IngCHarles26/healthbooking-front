import axios from 'axios'

export const healthApi = axios.create({
  baseURL: 'https://healtbooking-backend.onrender.com',
});

