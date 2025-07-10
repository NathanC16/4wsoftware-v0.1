// novo-site/frontend/js/administracao-logic.js
console.log('[administracao-logic.js] SCRIPT CARREGADO E EXECUTADO - TESTE DE CARREGAMENTO.');

/*
// Função para alternar seções (Visão Geral, etc.)
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
// Torna toggleSection global para os onclicks no HTML, se eles ainda existirem e não forem substituídos por event listeners.
window.toggleSection = toggleSection;

// Lógica principal da página de administração após o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
  console.log('[administracao-logic.js] Evento DOMContentLoaded disparado.');

  // Configuração do Toggle da Sidebar
  console.log('[administracao-logic.js] Tentando encontrar o botão de toggle da sidebar...');
  const sidebarToggleButton = document.getElementById('sidebar-toggle-button');

  if (sidebarToggleButton) {
    console.log('[administracao-logic.js] Botão #sidebar-toggle-button ENCONTRADO:', sidebarToggleButton);

    console.log('[administracao-logic.js] Tentando encontrar #sidebar-nav...');
    const sidebarNavEl = document.getElementById('sidebar-nav');

    if (sidebarNavEl) {
      console.log('[administracao-logic.js] Elemento #sidebar-nav ENCONTRADO:', sidebarNavEl);

      console.log('[administracao-logic.js] Tentando encontrar o elemento <main>...');
      const mainContentEl = document.querySelector('main');

      if (mainContentEl) {
        console.log('[administracao-logic.js] Elemento <main> ENCONTRADO:', mainContentEl);
        console.log('[administracao-logic.js] Configurando event listener para o botão de toggle da sidebar...');
        sidebarToggleButton.addEventListener('click', () => {
          console.log('[administracao-logic.js] Botão de toggle da sidebar FOI CLICADO.');
          document.body.classList.toggle('sidebar-collapsed');
          console.log(`[administracao-logic.js] Classe 'sidebar-collapsed' no body agora é: ${document.body.classList.contains('sidebar-collapsed')}`);
        });
        console.log('[administracao-logic.js] Event listener para o toggle da sidebar CONFIGURADO.');
      } else {
        console.error('[administracao-logic.js] FALHA CRÍTICA: Elemento <main> não encontrado. Toggle da sidebar não funcionará corretamente.');
      }
    } else {
      console.error('[administracao-logic.js] FALHA CRÍTICA: Elemento #sidebar-nav não encontrado. Toggle da sidebar não funcionará.');
    }
  } else {
    console.error('[administracao-logic.js] FALHA CRÍTICA: Botão #sidebar-toggle-button não encontrado. Toggle da sidebar não funcionará.');
  }

  // Inicialização dos Charts
  console.log('[administracao-logic.js] Tentando inicializar Charts...');
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
      console.warn('[administracao-logic.js] Canvas #chartVisaoGeral não encontrado.');
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
      console.warn('[administracao-logic.js] Canvas #chartResumoMensal não encontrado.');
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
      console.warn('[administracao-logic.js] Canvas #chartIndicadores não encontrado.');
    }
  } catch (e) {
    console.error('[administracao-logic.js] Erro durante a inicialização dos Charts:', e);
  }
  console.log('[administracao-logic.js] Fim do listener DOMContentLoaded.');
});
*/
