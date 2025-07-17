// paginas-novas/frontend/public/assets/js/auth.js
// Lógica de autenticação e autorização para o frontend.

export function isLoggedIn() {
  return localStorage.getItem('token') !== null;
}

export function getLoggedInUser() {
  const userString = localStorage.getItem('usuario');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (e) {
      console.error("Erro ao parsear usuário do localStorage:", e);
      return null;
    }
  }
  return null;
}

export function hasPermission(permission) {
  const user = getLoggedInUser();
  if (!user || !user.permissoes) {
    return false;
  }
  // Admin tem todas as permissões
  if (user.usuario === 'admin') {
    return true;
  }
  return user.permissoes.includes(permission);
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'login4w.html';
}
