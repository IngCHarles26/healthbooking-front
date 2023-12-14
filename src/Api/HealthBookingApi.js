import axios from 'axios'


const url = 'https://healthbooking-backend.onrender.com';
const local = 'http://localhost:3001'

export const healthApi = axios.create({
  baseURL:local,
});

