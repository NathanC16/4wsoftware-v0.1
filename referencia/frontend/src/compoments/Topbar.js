export function renderTopbar(containerId) {
  const container = document.getElementById(containerId);

  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow';

  nav.innerHTML = `
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle me-3">
      <i class="fa fa-bars"></i>
    </button>
    <span class="navbar-brand mb-0 h1 text-success">Painel Administrativo</span>
    <ul class="navbar-nav ms-auto position-relative">
      <li class="nav-item dropdown no-arrow">
        <button id="perfilToggle" class="nav-link btn btn-link dropdown-toggle">
          <span class="me-2 d-none d-lg-inline text-gray-600 small">Olá, Vendedora</span>
          <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="usuária" />
        </button>
        <div id="perfilMenu" class="dropdown-menu dropdown-menu-end shadow animated--grow-in" style="display: none; position: absolute; right: 0; top: 100%;">
          <button class="dropdown-item"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>Perfil</button>
          <button class="dropdown-item"><i class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>Configurações</button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>Sair</button>
        </div>
      </li>
    </ul>
  `;

  container.appendChild(nav);

  nav.querySelector('#perfilToggle').addEventListener('click', () => {
    const menu = nav.querySelector('#perfilMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
}
