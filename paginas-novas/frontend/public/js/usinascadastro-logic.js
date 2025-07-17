// paginas-novas/frontend/public/js/usinascadastro-logic.js
// Lógica para a página de cadastro de usinas.

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cadastro-usina-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const cooperativa = document.getElementById('cooperativa').value;

    try {
      const resposta = await fetch('/api/usinas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, tipo, cooperativa })
      });

      if (resposta.ok) {
        alert('Usina cadastrada com sucesso!');
        document.getElementById('cadastro-usina-form').reset();
      } else {
        alert('Erro ao cadastrar usina.');
      }
    } catch (error) {
      alert('Erro de conexão com o servidor.');
    }
  });
});
