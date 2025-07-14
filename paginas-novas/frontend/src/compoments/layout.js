import { renderNavbar } from './navbar.js';
import { renderFooter } from './footer.js';

export function renderLayout() {
  document.body.innerHTML = `
    <div id="navbar-container"></div>
    <main id="main-content" class="container py-4">
      <!-- Seções serão carregadas aqui -->
    </main>
    <div id="footer-container"></div>
  `;

  renderNavbar('navbar-container');
  renderFooter('footer-container');
}
