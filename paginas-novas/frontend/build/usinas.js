// usinas.js - versão JS puro sem React e Bootstrap Modal

function renderUsinas(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const listaUsinas = [
    { nome: 'Usina Solar Norte', localizacao: 'Bahia', capacidade: '5 MWp', status: 'Ativa', detalhes: 'Usina com alta produção em dias ensolarados.' },
    { nome: 'Usina Vale do Sol', localizacao: 'Minas Gerais', capacidade: '3.5 MWp', status: 'Manutenção', detalhes: 'Em manutenção programada para troca de inversores.' },
    { nome: 'Usina Energia Viva', localizacao: 'São Paulo', capacidade: '8 MWp', status: 'Ativa', detalhes: 'Opera com máxima eficiência no período seco.' },
  ];

  const titulo = document.createElement('h2');
  titulo.className = 'text-primary mb-4';
  titulo.innerText = 'Gestão de Usinas 🌞';
  container.appendChild(titulo);

  const tabela = document.createElement('table');
  tabela.className = 'table table-hover table-striped';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Nome</th>
      <th>Localização</th>
      <th>Capacidade</th>
      <th>Status</th>
      <th>Ações</th>
    </tr>
  `;

  const tbody = document.createElement('tbody');

  listaUsinas.forEach((usina, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${usina.nome}</td>
      <td>${usina.localizacao}</td>
      <td>${usina.capacidade}</td>
      <td><span class="badge ${usina.status === 'Ativa' ? 'bg-success' : 'bg-warning text-dark'}">${usina.status}</span></td>
    `;

    const tdAcoes = document.createElement('td');
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline-info btn-sm';
    btn.innerText = 'Ver Detalhes';
    btn.addEventListener('click', () => exibirModal(usina));
    tdAcoes.appendChild(btn);
    tr.appendChild(tdAcoes);
    tbody.appendChild(tr);
  });

  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  container.appendChild(tabela);

  // Modal manual
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = 'modalUsina';
  modal.tabIndex = -1;
  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Detalhes da Usina</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body" id="modalBody"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
        </div>
      </div>
    </div>
  `;
  container.appendChild(modal);

  function exibirModal(usina) {
    const body = modal.querySelector('#modalBody');
    body.innerHTML = `
      <p><strong>Nome:</strong> ${usina.nome}</p>
      <p><strong>Localização:</strong> ${usina.localizacao}</p>
      <p><strong>Capacidade:</strong> ${usina.capacidade}</p>
      <p><strong>Status:</strong> ${usina.status}</p>
      <p><strong>Detalhes:</strong> ${usina.detalhes}</p>
    `;
   
   
  }
}

// Para usar: renderUsinas('id_do_container');
