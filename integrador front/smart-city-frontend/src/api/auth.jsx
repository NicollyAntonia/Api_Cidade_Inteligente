import axios from 'axios';

export const loginAPI = (username, password) =>
  axios.post('http://localhost:8000/api/token/', { username, password });