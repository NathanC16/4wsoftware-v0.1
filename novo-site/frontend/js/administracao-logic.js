// novo-site/frontend/js/administracao-logic.js
console.log('[administracao-logic.js] Script iniciado.');

function toggleSection(id) {
  console.log(`[administracao-logic.js] toggleSection chamada com id: ${id}`);
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => {
    sec.classList.remove('active');
  });
  const activeSection = document.getElementById(id);
  if (activeSection) {
    activeSection.classList.add('active');
  } else {
    console.error(`[administracao-logic.js] Seção com id '${id}' não encontrada para ativar.`);
  }
}

// Torna toggleSection global para os onclicks no HTML
window.toggleSection = toggleSection;

document.addEventListener('DOMContentLoaded', () => {
  console.log('[administracao-logic.js] DOM totalmente carregado.');

  // Lógica do Toggle da Sidebar
  const sidebarToggleButton = document.getElementById('sidebar-toggle-button');
  console.log('[administracao-logic.js] sidebarToggleButton:', sidebarToggleButton); // Log do elemento

  const sidebarNav = document.getElementById('sidebar-nav');
  console.log('[administracao-logic.js] sidebarNav:', sidebarNav); // Log do elemento

  const mainContent = document.querySelector('main'); // Seleciona o elemento main
  console.log('[administracao-logic.js] mainContent:', mainContent); // Log do elemento

  if (sidebarToggleButton && sidebarNav && mainContent) {
    console.log('[administracao-logic.js] TODOS os elementos da sidebar e main foram encontrados. Adicionando event listener.');
    sidebarToggleButton.addEventListener('click', () => {
      console.log('[administracao-logic.js] Botão de toggle da sidebar FOI CLICADO.');
      document.body.classList.toggle('sidebar-collapsed');
    });
  } else {
    console.warn('[administracao-logic.js] FALHA: Um ou mais elementos para o toggle da sidebar não foram encontrados.');
    if (!sidebarToggleButton) console.warn('[administracao-logic.js] sidebar-toggle-button NÃO encontrado.');
    if (!sidebarNav) console.warn('[administracao-logic.js] sidebar-nav NÃO encontrado.');
    if (!mainContent) console.warn('[administracao-logic.js] main NÃO encontrado.');
  }

  // Inicialização dos Charts
  console.log('[administracao-logic.js] Inicializando Charts.');
  try {
    const chartVisaoGeralEl = document.getElementById('chartVisaoGeral');
    if (chartVisaoGeralEl) {
      new Chart(chartVisaoGeralEl, {
        type: 'doughnut',
        data: {
          labels: ['Contratos', 'Cooperativas', 'Usinas', 'Vendedores'],
          datasets: [{ data: [258, 3, 21, 6], backgroundColor: ['#66bb6a','#81c784','#a5d6a7','#c8e6c9'] }]
        }
      });
      console.log('[administracao-logic.js] Chart Visão Geral inicializado.');
    } else {
      console.warn('[administracao-logic.js] Elemento canvas chartVisaoGeral não encontrado.');
    }

    const chartResumoMensalEl = document.getElementById('chartResumoMensal');
    if (chartResumoMensalEl) {
      new Chart(chartResumoMensalEl, {
        type: 'bar',
        data: {
          labels: ['Mai', 'Jun'],
          datasets: [{ label: 'Receita Mensal (R$)', data: [51000, 72300], backgroundColor: '#388e3c' }]
        }
      });
      console.log('[administracao-logic.js] Chart Resumo Mensal inicializado.');
    } else {
      console.warn('[administracao-logic.js] Elemento canvas chartResumoMensal não encontrado.');
    }

    const chartIndicadoresEl = document.getElementById('chartIndicadores');
    if (chartIndicadoresEl) {
      new Chart(chartIndicadoresEl, {
        type: 'line',
        data: {
          labels: ['Mai', 'Jun'],
          datasets: [{ label: 'Indicadores', data: [45, 62], borderColor: '#43a047', fill: false }]
        }
      });
      console.log('[administracao-logic.js] Chart Indicadores inicializado.');
    } else {
      console.warn('[administracao-logic.js] Elemento canvas chartIndicadores não encontrado.');
    }
  } catch (e) {
    console.error('[administracao-logic.js] Erro ao inicializar Charts:', e);
  }
});
