// novo-site/frontend/js/administracao-main-module.js
// Módulo principal para a página de administração (autenticação, layout).

console.log('[administracao-main-module.js] Módulo principal (auth, layout) iniciando...');

import { isLoggedIn } from '../assets/js/auth.js';
import { renderFooter } from '../js/footer.js';

if (!isLoggedIn()) {
  console.log('[administracao-main-module.js] Usuário não logado, redirecionando para login.');
  window.location.href = 'login4w.html';
} else {
  console.log('[administracao-main-module.js] Usuário logado. Renderizando componentes de layout.');
  try {
    renderFooter('footer-container');
  } catch (e) {
    console.error('[administracao-main-module.js] Erro ao renderizar componentes de layout:', e);
  }
}
console.log('[administracao-main-module.js] Módulo principal finalizado.');
