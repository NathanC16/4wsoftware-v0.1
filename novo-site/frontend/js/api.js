const API_URL = 'https://localhost:8080'; // Ajusta o base URL conforme teu ambiente

export const login = async (idUsuario, senha) => {
  const resposta = await fetch(`${API_URL}/api/login`, { // corrigido para /api/login
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: idUsuario, senha }), // corrigido para "usuario"
  });

  if (!resposta.ok) {
    throw new Error('Erro ao fazer login');
  }
  return resposta.json();
};

export const getUsuarios = async (token) => {
  const resposta = await fetch(`${API_URL}/api/usuarios`, { // corrigido para /api/usuarios
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