// paginas-novas/frontend/public/js/usinascadastro-main.js
// Lógica principal para a página de cadastro de usinas.

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cadastro-usina-form');
  if (form) {
    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      const nome = document.getElementById('nome').value;
      const cidade = document.getElementById('cidade').value;
      const estado = document.getElementById('estado').value;
      const tipo = document.getElementById('tipo').value;

      if (!nome || !cidade || !estado || !tipo) {
        alert('Por favor, preencha todos os campos obrigatórios: Nome, Cidade, Estado e Tipo de Usina.');
        return;
      }

      try {
        const resposta = await fetch('/api/usinas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Adiciona o token JWT
          },
          body: JSON.stringify({ nome, cidade, estado, tipo })
        });

        if (resposta.ok) {
          alert('Usina cadastrada com sucesso!');
          form.reset();
        } else {
          alert('Erro ao cadastrar usina.');
        }
      } catch (error) {
        alert('Erro de conexão com o servidor.');
      }
    });
  }

  const btnVoltar = document.getElementById('btnVoltar');
  if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });
  }
});
