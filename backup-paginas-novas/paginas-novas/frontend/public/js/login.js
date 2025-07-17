document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const mensagemEl = document.getElementById('mensagem');

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const userInput = document.getElementById('usuario');
    const senhaInput = document.getElementById('senha');

    if (!userInput || !senhaInput) {
      mensagemEl.textContent = 'Campos de login não encontrados.';
      return;
    }

    const usuarioValue = userInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!usuarioValue || !senha) {
      mensagemEl.textContent = 'Por favor, preencha o usuário e a senha.';
      return;
    }

    try {
      const resposta = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario: usuarioValue, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok && dados.token) {
        localStorage.setItem('token', dados.token);
        localStorage.setItem('usuario', JSON.stringify(dados.usuario)); // Salvar dados do usuário
        form.reset();
        window.location.href = 'home.html'; // Redirecionamento corrigido para home.html na mesma pasta

      } else {
        mensagemEl.textContent = dados.mensagem || 'Erro no login. Verifique suas credenciais.';
      }
    } catch (err) {
      console.error('Erro ao conectar com o servidor:', err);
      mensagemEl.textContent = 'Não foi possível conectar-se ao servidor.';
    }
  });
});