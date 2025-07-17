// paginas-novas/frontend/public/js/visualizadoridividual-logic.js
// Lógica para a página de visualização individual do cliente.

document.addEventListener('DOMContentLoaded', () => {
  function getClienteId() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      alert('ID de cliente não fornecido na URL.');
      window.location.href = 'home.html';
      return null;
    }
    return id;
  }

  async function carregarDados() {
    const clienteId = getClienteId();
    if (!clienteId) return;

    try {
      const resposta = await fetch(`/api/clientes/${clienteId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const contentType = resposta.headers.get('content-type');

      if (!contentType || !contentType.includes('application/json')) {
        const texto = await resposta.text();
        console.error('Resposta inesperada:', texto);
        alert('Erro no servidor: ' + texto);
        return;
      }

      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.mensagem || 'Erro ao buscar cliente.');

      const campos = ['id', 'nome', 'uc', 'contrato', 'usina', 'modalidade', 'parceiro', 'contratoParceiro', 'desconto', 'email'];
      campos.forEach(campo => {
        document.getElementById(`${campo}View`).innerText = campo === 'desconto' ? dados[campo] + '%' : dados[campo];
        document.getElementById(`${campo}Edit`).value = dados[campo];
      });

    } catch (erro) {
      alert('Erro ao carregar dados: ' + erro.message);
    }
  }

  async function salvarAlteracoes() {
    const clienteId = getClienteId();
    if (!clienteId) return;

    const campos = ['id', 'nome', 'uc', 'contrato', 'usina', 'modalidade', 'parceiro', 'contratoParceiro', 'desconto', 'email'];
    const dadosAtualizados = {};

    campos.forEach(campo => {
      let valor = document.getElementById(`${campo}Edit`).value;
      if (typeof valor === 'string') valor = valor.trim();
      if (campo === 'desconto') valor = parseFloat(valor) || 0;
      dadosAtualizados[campo] = valor;
    });

    if (dadosAtualizados.desconto < 0 || dadosAtualizados.desconto > 100) {
      alert('Desconto deve ser entre 0 e 100.');
      return;
    }

    try {
      const resposta = await fetch(`/api/clientes/${clienteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dadosAtualizados)
      });

      const dados = await resposta.json();
      if (!resposta.ok) throw new Error(dados.mensagem || 'Erro ao atualizar cliente.');

      alert('Cliente atualizado com sucesso!');
      cancelarEdicao();
      carregarDados();
    } catch (erro) {
      alert('Erro ao salvar: ' + erro.message);
    }
  }

  function mostrarEdicao() {
    document.getElementById('editSection').style.display = 'block';
    document.getElementById('viewSection').style.display = 'none';
  }

  function cancelarEdicao() {
    document.getElementById('editSection').style.display = 'none';
    document.getElementById('viewSection').style.display = 'block';
  }

  // Adicionar event listeners para os botões
  document.querySelector('#viewSection button').addEventListener('click', mostrarEdicao);
  document.querySelector('#editSection button:nth-of-type(1)').addEventListener('click', salvarAlteracoes);
  document.querySelector('#editSection button:nth-of-type(2)').addEventListener('click', cancelarEdicao);
  document.querySelector('.voltar button').addEventListener('click', () => {
    window.location.href = 'home.html';
  });

  carregarDados();
});
