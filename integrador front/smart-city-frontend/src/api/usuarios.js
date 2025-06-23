// src/api/usuarios.js
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // ajuste se necessário

export const registrarUsuario = async (dados) => {
  const response = await axios.post(`${API_URL}/cadastro/`, dados);
  return response.data;
};
