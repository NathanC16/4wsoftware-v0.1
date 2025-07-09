// novo-site/frontend/assets/js/auth.js
console.log('[auth.js] Módulo auth.js carregado.');

// Função para realizar o login
export async function login(usuario, senha) {
  console.log('[auth.js] login chamado com usuário:', usuario);
  try {
    const response = await fetch('/api/auth/login', { // Endpoint correto do backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem('token', data.token);
      if (data.usuario) { // Armazena o nome de usuário se disponível
        localStorage.setItem('loggedInUser', data.usuario);
      }
      if (data.permissoes) { // Armazena permissões se disponíveis
        localStorage.setItem('userPermissions', JSON.stringify(data.permissoes));
      }
      return { success: true, destino: data.destino || '/pages/home.html' };
    } else {
      return { success: false, message: data.mensagem || 'Erro no login.' };
    }
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    return { success: false, message: 'Erro de conexão ou servidor.' };
  }
}

// Função para realizar o logout
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('loggedInUser');
  localStorage.removeItem('userPermissions');
  // Redireciona para a página de login, que está em /pages/login4w.html
  // Ajuste o caminho se a página de login estiver em outro local.
  window.location.href = '/pages/login4w.html';
}

// Função para verificar se o usuário está logado
export function isLoggedIn() {
  const token = localStorage.getItem('token');
  // Adicionar futuramente: verificar se o token não expirou
  const loggedIn = !!token;
  console.log('[auth.js] isLoggedIn verificado:', loggedIn);
  return loggedIn;
}

// Função para obter o token armazenado
export function getToken() {
  return localStorage.getItem('token');
}

// Função para obter o nome do usuário logado
export function getLoggedInUser() {
  return localStorage.getItem('loggedInUser');
}

// Função para obter as permissões do usuário logado
// ESTA FUNÇÃO DEVE SER USADA NO LUGAR DA SIMULAÇÃO EM home.html e outros lugares
export function getUserPermissions() {
  const permissions = localStorage.getItem('userPermissions');
  try {
    return permissions ? JSON.parse(permissions) : [];
  } catch (e) {
    console.error('Erro ao parsear permissões do localStorage:', e);
    return [];
  }
}
