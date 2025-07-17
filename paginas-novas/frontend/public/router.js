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
    page: 'pages/dashboard.html',
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
    page: 'pages/visualizadoridividual.html',
    permissions: ['podeAcessarIndividual']
  },
  '/consumo': {
    page: 'pages/historicofaturas.html',
    permissions: ['podeAcessarConsumo']
  }
};

// ✅ Verifica se o usuário está logado
// ✅ Verifica se o usuário está autenticado
function isAuthenticated() {
  const token = localStorage.getItem('token');
  return token && !isTokenExpired(token);
}

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
    return fetch('./404.html')
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
window.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;
  // Se o caminho atual for um arquivo HTML direto (ex: /usinascadastro.html)
  // e não for a página de login, não tenta carregar conteúdo dinamicamente.
  if (currentPath.endsWith('.html') && currentPath !== '/' && !currentPath.includes('login4w.html')) {
    console.log(`Router: Pulando carregamento dinâmico para acesso direto a HTML: ${currentPath}`);
  } else {
    loadPage(currentPath);
  }
});
window.onpopstate = () => loadPage(window.location.pathname);

// ✅ Use nos links: <a href="#" onclick="navigateTo('/home')">Ir para Home</a>
