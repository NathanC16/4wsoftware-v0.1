export function renderDashboard(container) {
  container.innerHTML = `
    <h2 class="text-success">Visão Geral</h2>
    <p>Bem-vinda, Gabi! Aqui está um resumo do sistema.</p>
    <canvas id="graficoDashboard" height="200"></canvas>
  `;

  new Chart(document.getElementById('graficoDashboard'), {
    type: 'doughnut',
    data: {
      labels: ['Contratos', 'Cooperativas', 'Usinas', 'Vendedores'],
      datasets: [{
        data: [251, 3, 21, 6],
        backgroundColor: ['#43a047', '#66bb6a', '#81c784', '#a5d6a7']
      }]
    }
  });
}
