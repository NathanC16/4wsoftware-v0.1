// routes.js (frontend)

const routes = {
  '/': 'pages/login4w.html',
  '/home': {
    page: 'pages/home.html',
    permissions: ['podeAcessarHome']
  },
  '/cadastro': {
    page: 'pages/cadastro.html',
    permissions: ['podeAcessarCadastro']
  },
  '/usinas': {
    page: 'pages/usinascadastro.html',
    permissions: ['podeAcessarUsinas']
  },
  '/administracao': {
    page: 'pages/administração.html',
    permissions: ['podeAcessarAdministracao']
  },
  '/painel-admin': {
    page: 'pages/admin-panel.html',
    permissions: ['podeAcessarPainelAdmin']
  },
  '/usuarios': {
    page: 'pages/userdados.html',
    permissions: ['podeAcessarUsuarios']
  },
  '/individual': {
    page: 'pages/individual.html',
    permissions: ['podeAcessarIndividual']
  },
  '/consumo': {
    page: 'pages/historicofaturas.html',
    permissions: ['podeAcessarConsumo']
  }
};
 function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true;
  }
}
// ✅ Verifica se o usuário está logado
// ✅ Verifica se o usuário está autenticado
function isAuthenticated() {
  const token = localStorage.getItem('token');
  return token && !isTokenExpired(token);
}

// O bloco abaixo estava causando "Illegal return statement" e era redundante/mal colocado.
// A lógica de verificação de token e redirecionamento principal está em loadPage.
// const token = localStorage.getItem('token');
// if (!token || isTokenExpired(token)) {
//   localStorage.removeItem('token');
//   if (path !== '/') { // 'path' não está definido neste escopo global
//     return navigateTo('/');
//   }
// }

// ✅ Verifica se o token expirou
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  } catch {
    return true;
  }
}

// ✅ Busca as permissões do token
function getUserPermissions() {
  const token = localStorage.getItem('token');
  if (!token) return [];
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.permissions || [];
  } catch {
    return [];
  }
}

// ✅ Carrega a página com verificação de permissão e login
function loadPage(path) {
  const routeConfig = routes[path];

  // Se o token for inválido ou expirado, manda para login
  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('token');
    if (path !== '/') {
      return navigateTo('/');
    }
  }

  if (!routeConfig) {
    return fetch('pages/404.html')
      .then(res => res.text())
      .then(html => (document.getElementById('app').innerHTML = html));
  }

  if (typeof routeConfig === 'string') {
    return fetch(routeConfig)
      .then(res => res.text())
      .then(html => (document.getElementById('app').innerHTML = html));
  }

  const permissions = getUserPermissions();
  const hasPermission = routeConfig.permissions.some(p => permissions.includes(p));

  if (!hasPermission) {
    document.getElementById('app').innerHTML = '<h1>403 - Acesso negado</h1>';
    return;
  }

  fetch(routeConfig.page)
    .then(res => res.text())
    .then(html => (document.getElementById('app').innerHTML = html));
}

// ✅ Faz navegação de forma dinâmica
function navigateTo(path) {
  history.pushState({}, '', path);
  loadPage(path);
}

// ✅ Inicializa roteamento
window.addEventListener('DOMContentLoaded', () => loadPage(window.location.pathname));
window.onpopstate = () => loadPage(window.location.pathname);

// ✅ Use nos links: <a href="#" onclick="navigateTo('/home')">Ir para Home</a>
