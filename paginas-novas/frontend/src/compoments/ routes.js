// router.js

// Rotas protegidas por permissões
const routes = {
  '/dashboard': {
    page: 'dashboard.html',
    permissions: ['podeAcessarDashboard']
  },
  '/dashboard-admin': {
    page: 'admin-dashboard.html', // atualizado para o novo nome
    permissions: ['podeAcessarDashboardAdministracao']
  },
  '/dashboard-financeiro': {
    page: 'financeiro.html',
    permissions: ['podeAcessarRelatorios']
  },
};
// Redireciona para login se não estiver logado
function ensureAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'login4w.html';
    return false;
  }
  return true;
}

// Carrega a rota correta
function loadRoute() {
  if (!ensureAuth()) return;

  const path = location.hash.slice(1) || '/dashboard';
  const route = routes[path];

  if (!route) {
    document.body.innerHTML = '<h1>404 - Página não encontrada</h1>';
    return;
  }

  const userPerms = getUserPermissions();
  const hasPermission = route.permissions.some(p => userPerms.includes(p));

  if (!hasPermission) {
    document.body.innerHTML = '<h1>403 - Acesso negado</h1>';
    return;
  }

  fetch(route.page)
    .then(res => res.text())
    .then(html => document.body.innerHTML = html)
    .catch(() => {
      document.body.innerHTML = '<h1>Erro ao carregar a página</h1>';
    });
}

// Eventos para carregar a rota na navegação
window.addEventListener('hashchange', loadRoute);
window.addEventListener('load', loadRoute);
// routes/user.js (exemplo)
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-senha'); // sem senha
    res.json(users);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários.' });
  }
});

export default router;
