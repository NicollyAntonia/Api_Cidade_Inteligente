import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:8000/' });

export const getAmbientes = (token) =>
  api.get('ambientes/', { headers: { Authorization: `Bearer ${token}` } });

export const getAmbiente = (id, token) =>
  api.get(`ambientes/${id}/`, { headers: { Authorization: `Bearer ${token}` } });

export const createAmbiente = (data, token) =>
  api.post('ambientes/', data, { headers: { Authorization: `Bearer ${token}` } });

export const updateAmbiente = (id, data, token) =>
  api.put(`ambientes/${id}/`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteAmbiente = (id, token) =>
  api.delete(`ambientes/${id}/`, { headers: { Authorization: `Bearer ${token}` } });
