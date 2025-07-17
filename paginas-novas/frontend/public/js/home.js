const usuario = {
  nome: 'João Silva',
  tipo: 'admin'
};

    const cards = [
      { titulo: 'Dashboard', descricao: 'Acesse sua visão geral', rota: 'dashboard.html' },
  { titulo: 'Faturas', descricao: 'Visualize suas faturas', rota: 'historicofaturas.html' },
  { titulo: 'Consumo', descricao: 'Veja seus dados de consumo', rota: 'historico-inadimplentes.html' },
  { titulo: 'Histórico Completo', descricao: 'Visualize suas comissões detalhadas', rota: 'historicocomissionados.html' },
  { titulo: 'Cadastro', descricao: 'Cadastrar novos comissionados', rota: 'cadastro.html' },
  { titulo: 'Cadastro de Usinas', descricao: 'Gerencie suas usinas', rota: 'usinascadastro.html' },
  { titulo: 'Ajuda', descricao: 'Precisa de suporte?', rota: 'ajuda.html' }
];

const container = document.getElementById('cardContainer');
cards.forEach(card => {
  const div = document.createElement('div');
  div.className = 'col-md-4 mb-4';
  div.innerHTML = `
    <div class="card h-100">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title">${card.titulo}</h5>
          <p class="card-text">${card.descricao}</p>
        </div>
        <a href="${card.rota}" class="btn btn-success mt-3">Acessar</a>
      </div>
    </div>
  `;
  container.appendChild(div);
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login4w.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const usuario = payload.usuario;
    const permissoes = payload.permissions || [];

    document.getElementById('user-info').innerHTML = `
      <p>Bem-vindo, <strong>${usuario}</strong></p>
      <p>Permissões: ${permissoes.join(', ')}</p>
      <button onclick="logout()" class="btn btn-danger btn-sm">Sair</button>
    `;
  } catch (err) {
    console.error('Erro ao decodificar token:', err);
  }
});
