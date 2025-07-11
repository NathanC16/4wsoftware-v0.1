// novo-site/frontend/js/administracao-logic.js
// Lógica para a página de administração, incluindo toggle de seções e inicialização de gráficos.

console.log('[administracao-logic.js] Script carregado.');

function toggleSection(id) {
  console.log(`[administracao-logic.js - toggleSection] Chamada com id: ${id}`);
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSection = document.getElementById(id);
  if (activeSection) {
    activeSection.classList.add('active');
    console.log(`[administracao-logic.js - toggleSection] Seção '${id}' ativada.`);
  } else {
    console.error(`[administracao-logic.js - toggleSection] Seção com id '${id}' não encontrada para ativar.`);
  }
}

// Para garantir que toggleSection esteja disponível globalmente se chamada por atributos onclick no HTML
// Os scripts dos gráficos agora estão dentro do DOMContentLoaded, então toggleSection pode ser chamada
// diretamente pelos `onclick` do HTML, desde que este script seja carregado antes dos scripts modulares
// ou de forma que `window.toggleSection` seja definido a tempo.
// Colocar no escopo global explicitamente é mais seguro para `onclick`.
window.toggleSection = toggleSection;

document.addEventListener('DOMContentLoaded', function() {
  console.log('[administracao-logic.js] DOM completamente carregado. Inicializando gráficos...');
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
  console.log('[administracao-logic.js] Inicialização de gráficos finalizada.');
});
