import { renderLayout } from './layout.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderIndicadores } from './pages/indicadores.js';
import { renderFaturamento } from './pages/faturamento.js';

export function initRoutes() {
  window.addEventListener('hashchange', handleRoute);
  renderLayout();
  handleRoute(); // Rota inicial
}

function handleRoute() {
  const hash = window.location.hash.replace('#', '');
  const content = document.getElementById('main-content');

  switch (hash) {
    case 'indicadores':
      renderIndicadores(content);
      break;
    case 'faturamento':
      renderFaturamento(content);
      break;
    default:
      renderDashboard(content);
  }
}
