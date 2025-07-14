// Pagamentos.js - versão JavaScript puro

function renderPagamentos(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <div class="container mt-5">
      <div class="faixa-verde">Perfis de Pagamento</div>
      <div class="card p-4">
        <form id="pagamentoForm" autocomplete="off">
          <!-- Campos renderizados aqui -->
        </form>
      </div>
    </div>
  `;

  const formElement = document.getElementById("pagamentoForm");

  const state = {
    tipoPagamento: '',
    statusBoleto: '',
    comprovantes: [],
    form: {
      perfil: '', descricao: '', motivo: '', valor: '',
      banco: '', agencia: '', conta: '', titular: '',
      cpf_cnpj: '', data_pagamento: ''
    }
  };

  // Aqui você adicionará todos os campos com JS nativo: inputs, selects, etc.
  // Incluindo listeners para atualizar o estado em cada interação.

  formElement.addEventListener('submit', async function (e) {
    e.preventDefault();
    const data = new FormData();
    Object.entries(state.form).forEach(([key, value]) => data.append(key, value));
    data.append('tipo_pagamento', state.tipoPagamento);
    if (state.tipoPagamento === 'boleto') {
      data.append('status_pagamento', state.statusBoleto);
    }
    for (let file of state.comprovantes) {
      data.append('comprovante', file);
    }

    const res = await fetch('/api/pagamentos', { method: 'POST', body: data });
    if (res.ok) alert('Pagamento salvo!');
    else alert('Erro ao salvar!');
  });
}

// Para usar: chame renderPagamentos('id_do_container');
