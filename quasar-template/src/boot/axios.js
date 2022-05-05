import axios from 'axios';

let baseURL = process.env.DEV ? 'http://localhost:3000' : process.env.API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 45000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export { api };
