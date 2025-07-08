// frontend/js/login.js

// Adiciona um listener para quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
  // Obtém referências para o formulário de login e o elemento de mensagem
  const form = document.getElementById('login-form');
  const mensagemEl = document.getElementById('mensagem');

  // Adiciona um listener para o evento de submissão do formulário
  form.addEventListener('submit', async function(event) {
    event.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Obtém referências para os campos de usuário e senha
    const userInput = document.getElementById('usuario');
    const senhaInput = document.getElementById('senha');

    // Verifica se os campos de login foram encontrados no DOM
    if (!userInput || !senhaInput) {
      mensagemEl.textContent = 'Erro: Campos de login não encontrados na página.';
      return;
    }

    // Obtém os valores dos campos, removendo espaços em branco no início e no fim
    const usuarioValue = userInput.value.trim();
    const senha = senhaInput.value.trim();

    // Valida se os campos de usuário e senha foram preenchidos
    if (!usuarioValue || !senha) {
      mensagemEl.textContent = 'Por favor, preencha o usuário e a senha para continuar.';
      return;
    }

    try {
      // Envia uma requisição POST para a rota de login do backend
      const resposta = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({ usuario: usuarioValue, senha }) // Converte os dados para JSON
      });

      // Converte a resposta para JSON
      const dados = await resposta.json();

      // Verifica se a resposta foi bem-sucedida e se um token foi retornado
      if (resposta.ok && dados.token) {
        localStorage.setItem('token', dados.token); // Armazena o token JWT no localStorage
        localStorage.setItem('usuario', JSON.stringify(dados.usuario)); // Salva dados do usuário no localStorage
        form.reset(); // Limpa o formulário
        window.location.href = '/pages/home.html'; // Redireciona para a página inicial

      } else {
        // Exibe a mensagem de erro retornada pelo backend ou uma mensagem padrão
        mensagemEl.textContent = dados.mensagem || 'Erro no login. Verifique suas credenciais e tente novamente.';
      }
    } catch (err) {
      console.error('Erro ao conectar com o servidor:', err);
      mensagemEl.textContent = 'Não foi possível conectar-se ao servidor. Verifique sua conexão.';
    }
  });
});
