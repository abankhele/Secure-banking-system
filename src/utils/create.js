import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Origin': 'http://localhost:3000'
  }
});