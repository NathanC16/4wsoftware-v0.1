export function renderNavbar() {
  const token = localStorage.getItem('token');
  if (!token) return; // Se não tiver token, não renderiza navbar

  let permissoes = [];
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    permissoes = payload.permissions || [];
  } catch (e) {
    console.warn('Token inválido ou corrompido, limpando storage');
    localStorage.removeItem('token');
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

  document.body.prepend(nav);

  // Evento logout limpo
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.href = 'login4w.html';
    });
  }
}
