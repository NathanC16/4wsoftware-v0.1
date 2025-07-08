const API_URL = 'https://engenhariaouro.com.br'; // Ajusta o base URL conforme teu ambiente

export const login = async (idUsuario, senha) => {
  const resposta = await fetch(`${API_URL}/login4w`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idUsuario, senha }),
  });

  if (!resposta.ok) {
    throw new Error('Erro ao fazer login');
  }
  return resposta.json();
};

export const getUsuarios = async (token) => {
  const resposta = await fetch(`${API_URL}/usuarios`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resposta.ok) throw new Error('Erro ao buscar usuários');
  return resposta.json();
};

export const getCooperativas = async (token) => {
  const resposta = await fetch(`${API_URL}/api/cooperativas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resposta.ok) throw new Error('Erro ao buscar cooperativas');
  return resposta.json();
};

export const getUsinas = async (token) => {
  const resposta = await fetch(`${API_URL}/api/usinas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resposta.ok) throw new Error('Erro ao buscar usinas');
  return resposta.json();
};
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
