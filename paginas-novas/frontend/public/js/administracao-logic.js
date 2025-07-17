// paginas-novas/frontend/public/js/administracao-logic.js
// Lógica para a página de administração, incluindo inicialização de gráficos.

console.log('[administracao-logic.js] Script carregado.');

document.addEventListener('DOMContentLoaded', async function() {
  console.log('[administracao-logic.js] DOM completamente carregado. Inicializando gráficos...');

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token de autenticação não encontrado.');
      return;
    }

    const response = await fetch('/api/dashboard/data', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados do dashboard: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Dados do dashboard recebidos:', data);

    // Gráfico Visão Geral
    const chartVisaoGeralEl = document.getElementById('chartVisaoGeral');
    if (chartVisaoGeralEl) {
      new Chart(chartVisaoGeralEl, {
        type: 'doughnut',
        data: {
          labels: ['Contratos', 'Cooperativas', 'Usinas', 'Vendedores'],
          datasets: [{
            data: [data.visaoGeral.contratos, data.visaoGeral.cooperativas, data.visaoGeral.usinas, data.visaoGeral.vendedores],
            backgroundColor: ['#66bb6a', '#81c784', '#a5d6a7', '#c8e6c9']
          }]
        }
      });
      console.log('[administracao-logic.js] Gráfico Visão Geral inicializado.');
    } else {
      console.warn('[administracao-logic.js] Elemento canvas chartVisaoGeral não encontrado.');
    }

    // Gráfico Resumo Mensal
    const chartResumoMensalEl = document.getElementById('chartResumoMensal');
    if (chartResumoMensalEl) {
      new Chart(chartResumoMensalEl, {
        type: 'bar',
        data: {
          labels: data.resumoMensal.map(item => item.month),
          datasets: [{
            label: 'Receita Mensal (R$)',
            data: data.resumoMensal.map(item => item.value),
            backgroundColor: '#388e3c'
          }]
        }
      });
      console.log('[administracao-logic.js] Gráfico Resumo Mensal inicializado.');
    } else {
      console.warn('[administracao-logic.js] Elemento canvas chartResumoMensal não encontrado.');
    }

    // Gráfico Indicadores
    const chartIndicadoresEl = document.getElementById('chartIndicadores');
    if (chartIndicadoresEl) {
      new Chart(chartIndicadoresEl, {
        type: 'line',
        data: {
          labels: data.indicadores.map(item => item.month),
          datasets: [{
            label: 'Indicadores',
            data: data.indicadores.map(item => item.value),
            borderColor: '#43a047',
            fill: false
          }]
        }
      });
      console.log('[administracao-logic.js] Gráfico Indicadores inicializado.');
    } else {
      console.warn('[administracao-logic.js] Elemento canvas chartIndicadores não encontrado.');
    }
  } catch (e) {
    console.error('[administracao-logic.js] Erro ao inicializar gráficos:', e);
  }
  console.log('[administracao-logic.js] Inicialização de gráficos finalizada.');
});
