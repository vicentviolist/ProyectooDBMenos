import axios from 'axios';

let baseURL = 'http://localhost:4000';

const api = axios.create({
  baseURL: baseURL,
  timeout: 45000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export { api };
