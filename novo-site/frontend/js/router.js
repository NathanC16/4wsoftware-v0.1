// router.js (frontend) - Renomeado para clareza, anteriormente podia ser confundido com routes.js do backend

// As rotas devem ser relativas à pasta 'pages' onde os arquivos HTML residem,
// ou absolutas a partir da raiz do servidor (ex: '/pages/login4w.html')
// Para simplificar, vamos usar caminhos relativos à pasta 'pages'
// assumindo que router.js é sempre chamado de um HTML dentro de 'pages'.
const routes = {
  '/': 'login4w.html', // Se / for servido pelo backend para /pages/index.html, este pode não ser usado.
                      // Se for um SPA puro no frontend, / poderia ser login4w.html ou home.html.
  '/home': {
    page: 'home.html',
    permissions: ['podeAcessarHome'] // As permissões devem corresponder às do token
  },
  '/cadastro': {
    page: 'cadastro.html',
    permissions: ['podeAcessarCadastro'] // Exemplo
  },
  '/usinas': {
    page: 'usinascadastro.html',
    permissions: ['podeAcessarUsinas'] // Exemplo
  },
  '/administracao': {
    // Corrigido: 'administração.html' para 'administracao.html' (sem cedilha)
    page: 'administracao.html',
    permissions: ['podeAcessarAdministracao'] // Exemplo
  },
  '/painel-admin': {
    // Este pode ser o mesmo que /administracao ou uma página diferente.
    // Assumindo que admin-panel.html é o painel de admin geral.
    page: 'admin-dashboard.html', // Corrigido para o nome de arquivo existente
    permissions: ['podeAcessarPainelAdmin'] // Exemplo
  },
  '/usuarios': {
    page: 'userdados.html', // ou usuarioscadastro.html dependendo do arquivo real
    permissions: ['podeAcessarUsuarios'] // Exemplo
  },
  '/individual': {
    page: 'visualizadoridividual.html', // Corrigido para o nome de arquivo existente
    permissions: ['podeAcessarIndividual'] // Exemplo
  },
  '/consumo': {
    page: 'consumo.html', // Corrigido para o nome de arquivo existente
    permissions: ['podeAcessarConsumo'] // Exemplo
  },
  // Adicionar outras rotas conforme necessário, ex:
  '/historicofaturas': {
    page: 'historicofaturas.html',
    permissions: [] // Exemplo: rota pública dentro da área logada ou com permissão específica
  },
   '/login4w': { // Adicionando rota explícita para login se necessário
    page: 'login4w.html',
    permissions: [] // Página de login geralmente não requer permissão
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
    // Corrigido caminho para 404.html, assumindo que está em /pages/404.html
    // Se router.js é chamado de uma página em /pages/, '404.html' é relativo.
    // Para ser mais robusto, usar caminho absoluto do servidor para /pages/404.html
    // ou garantir que 404.html esteja no mesmo nível se usar path relativo.
    // Usando '/pages/404.html' para ser explícito do servidor.
    return fetch('/pages/404.html')
      .then(res => {
        if (!res.ok) throw new Error('Página 404 não encontrada no servidor');
        return res.text();
      })
      .then(html => (document.getElementById('app').innerHTML = html))
      .catch(err => {
        console.error("Erro ao carregar página 404:", err);
        document.getElementById('app').innerHTML = '<h1>Erro 404 - Página não encontrada</h1><p>Ocorreu um problema ao tentar carregar a página de erro.</p>';
      });
  }

  // Se routeConfig é uma string, é um caminho direto para um HTML (sem permissões)
  if (typeof routeConfig === 'string') {
    return fetch(routeConfig) // Caminho já deve ser relativo a 'pages/' (ex: 'login4w.html')
      .then(res => res.text())
      .then(html => (document.getElementById('app').innerHTML = html));
  }

  // Se routeConfig é um objeto, tem 'page' e 'permissions'
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
