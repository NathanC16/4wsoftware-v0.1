export function renderNavbar(containerId) { // Adicionado containerId como parâmetro
  console.log('[navbar.js] renderNavbar chamada para container:', containerId);
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[navbar.js] Container da Navbar '${containerId}' não encontrado.`);
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    console.log('[navbar.js] Sem token, não renderizando navbar.');
    // Opção: limpar o container ou não renderizar nada se não houver token
    // container.innerHTML = ''; // Limpa o container se não houver token
    return;
  }

  console.log('[navbar.js] Token encontrado, processando permissões.');
  let permissoes = [];
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    permissoes = payload.permissions || [];
    console.log('[navbar.js] Permissões do token:', permissoes);
  } catch (e) {
    console.warn('[navbar.js] Token inválido ou corrompido, limpando storage');
    localStorage.removeItem('token');
    // Se navbar.js for usado em páginas fora de /pages/, este redirect pode precisar de ajuste.
    // Assumindo que é chamado de uma página em /pages/
    window.location.href = 'login4w.html';
    return;
  }

  // Cria nav com classes pra estilizar via CSS externo (recomendo)
  const nav = document.createElement('nav');
  nav.classList.add('main-navbar');
  nav.innerHTML = `
    <ul class="nav-list">
      ${permissoes.includes('podeAcessarHome') ? '<li><a href="#/home">🏠 Home</a></li>' : ''}
      ${permissoes.includes('podeAcessarAdministracao') ? '<li><a href="#/administracao">📊 Administração</a></li>' : ''}
      ${permissoes.includes('podeAcessarPainelAdmin') ? '<li><a href="#/painel-admin">🛠 Painel Admin</a></li>' : ''}
      <li><a href="#" id="logout-link">🚪 Sair</a></li>
    </ul>
  `;

  // document.body.prepend(nav); // Alterado para inserir no container especificado
  container.innerHTML = ''; // Limpa o container antes de adicionar a nova navbar
  container.appendChild(nav);
  console.log('[navbar.js] Navbar renderizada e adicionada ao container.');

  // Evento logout limpo
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[navbar.js] Link de logout clicado.');
      localStorage.removeItem('token');
      localStorage.removeItem('loggedInUser'); // Limpar também estes
      localStorage.removeItem('userPermissions');
      window.location.href = 'login4w.html'; // Ajustar se login4w.html não estiver em /pages/
    });
  } else {
    console.warn('[navbar.js] Link de logout (#logout-link) não encontrado no DOM da navbar.');
  }
}
