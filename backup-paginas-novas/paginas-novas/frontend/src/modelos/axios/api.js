import api from './path/to/api';

async function carregarDadosCliente(clienteId) {
  try {
    const resposta = await api.get(`/clientes/${clienteId}`);
    const dados = resposta.data; // Axios já parseia JSON automaticamente

    // Aqui você manipula os dados, tipo:
    return dados;

  } catch (error) {
    if (error.response) {
      // Erro vindo do backend, com status e mensagem
      console.error('Erro na resposta:', error.response.status, error.response.data);
      alert(`Erro ao carregar dados: ${error.response.data.mensagem || error.message}`);
    } else if (error.request) {
      // A requisição foi feita mas não teve resposta
      console.error('Sem resposta do servidor:', error.request);
      alert('Servidor não respondeu. Tente mais tarde.');
    } else {
      // Algo errado ao configurar a requisição
      console.error('Erro na requisição:', error.message);
      alert('Erro na requisição: ' + error.message);
    }
  }
}
async function atualizarDadosCliente(clienteId, dadosAtualizados) {
  try {
    const resposta = await api.put(`/clientes/${clienteId}`, dadosAtualizados);
    return resposta.data; // Axios já parseia JSON automaticamente

  } catch (error) {
    if (error.response) {
      console.error('Erro na resposta:', error.response.status, error.response.data);
      alert(`Erro ao atualizar dados: ${error.response.data.mensagem || error.message}`);
    } else if (error.request) {
      console.error('Sem resposta do servidor:', error.request);
      alert('Servidor não respondeu. Tente mais tarde.');
    } else {
      console.error('Erro na requisição:', error.message);
      alert('Erro na requisição: ' + error.message);
    }
  }
}
async function excluirCliente(clienteId) {
  try {
    const resposta = await api.delete(`/clientes/${clienteId}`);
    return resposta.data; // Axios já parseia JSON automaticamente

  } catch (error) {
    if (error.response) {
      console.error('Erro na resposta:', error.response.status, error.response.data);
      alert(`Erro ao excluir cliente: ${error.response.data.mensagem || error.message}`);
    } else if (error.request) {
      console.error('Sem resposta do servidor:', error.request);
      alert('Servidor não respondeu. Tente mais tarde.');
    } else {
      console.error('Erro na requisição:', error.message);
      alert('Erro na requisição: ' + error.message);
    }
  }
}