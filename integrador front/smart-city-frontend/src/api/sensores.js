import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',
});

export const getSensores = (token) =>
  api.get('sensores/', { headers: { Authorization: `Bearer ${token}` } });

export const getSensor = (id, token) =>
  api.get(`sensores/${id}/`, { headers: { Authorization: `Bearer ${token}` } });

export const createSensor = (data, token) =>
  api.post('sensores/', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateSensor = (id, data, token) =>
  api.put(`sensores/${id}/`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteSensor = (id, token) =>
  api.delete(`sensores/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
