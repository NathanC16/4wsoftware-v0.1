// Importa a função logout e getLoggedInUser do módulo auth.js
// O caminho para auth.js é '../assets/js/auth.js' relativo a 'js/' onde topbar.js está
import { logout, getLoggedInUser } from '../assets/js/auth.js';

export function renderTopbar(containerId) {
  console.log('[topbar.js] renderTopbar chamada para container:', containerId);
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[topbar.js] Container do Topbar '${containerId}' não encontrado.`);
    return;
  }

  const userName = getLoggedInUser() || 'Usuário'; // Pega nome do usuário ou usa 'Usuário' como fallback
  console.log(`[topbar.js] Nome do usuário para topbar: ${userName}`);

  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow';

  nav.innerHTML = `
    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle me-3">
      <i class="fa fa-bars"></i> <!-- Certifique-se que Font Awesome está carregado se usar classes fa-* -->
    </button>
    <span class="navbar-brand mb-0 h1 text-success">Painel Administrativo</span>
    <ul class="navbar-nav ms-auto position-relative">
      <li class="nav-item dropdown no-arrow">
        <button id="perfilToggle" class="nav-link btn btn-link dropdown-toggle">
          <span class="me-2 d-none d-lg-inline text-gray-600 small">Olá, ${userName}</span>
          <img class="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="usuária" />
        </button>
        <div id="perfilMenu" class="dropdown-menu dropdown-menu-end shadow animated--grow-in" style="display: none; position: absolute; right: 0; top: 100%;">
          <button class="dropdown-item" id="topbar-perfil-link"><i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>Perfil</button>
          <button class="dropdown-item" id="topbar-config-link"><i class="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>Configurações</button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" id="topbar-logout-link"><i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>Sair</button>
        </div>
      </li>
    </ul>
  `;

  container.innerHTML = ''; // Limpa o container
  container.appendChild(nav);
  console.log('[topbar.js] Topbar renderizado e adicionado ao container.');

  // Event listener para o toggle do menu de perfil
  const perfilToggle = nav.querySelector('#perfilToggle');
  const perfilMenu = nav.querySelector('#perfilMenu');

  if (perfilToggle && perfilMenu) {
    perfilToggle.addEventListener('click', (event) => {
      event.stopPropagation(); // Impede que o evento de clique no documento feche o menu imediatamente
      perfilMenu.style.display = perfilMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Fechar o dropdown se clicar fora dele
    document.addEventListener('click', (event) => {
      if (!perfilToggle.contains(event.target) && !perfilMenu.contains(event.target)) {
        perfilMenu.style.display = 'none';
      }
    });
  }

  // Event listener para o botão Sair
  const logoutButton = nav.querySelector('#topbar-logout-link');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('[topbar.js] Botão de logout do topbar clicado.');
      logout(); // Chama a função de logout importada
    });
  } else {
    console.warn('[topbar.js] Botão de logout (#topbar-logout-link) não encontrado no DOM do topbar.');
  }

  // TODO: Adicionar event listeners para Perfil e Configurações se necessário
  // Ex: nav.querySelector('#topbar-perfil-link').addEventListener('click', () => { /* navega para perfil */ });
}
