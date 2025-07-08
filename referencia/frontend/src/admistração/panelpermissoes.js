// panelpermissoes.js - versão JavaScript puro sem React

const usuarios = {
  administrador: { senha: 'admin@4w', permissoes: ['todos'] },
  financeiro: { senha: 'fin@2025', permissoes: ['dashboard-financeiro', 'pagamentos', 'historico', 'visualizar_cliente', 'editar_cliente'] },
  vendedor: { senha: 'vend@4w', permissoes: ['perfil-vendedor', 'gerador-proposta', 'indicadores'] },
  suporte: { senha: 'suporte@4w', permissoes: ['suporte', 'verificacao-faturas'] },
  rh: { senha: 'rh@2025', permissoes: ['financeiro-rh'] },
  auditor: { senha: 'auditor@4w', permissoes: ['auditoria', 'visualizar_cliente', 'editar_cliente', 'gerar_relatorio_auditoria'] },
  backoffice: { senha: 'back@4w', permissoes: ['cadastrar_cliente', 'vincular_usina', 'editar_cliente'] },
  estagiario: { senha: 'estag@4w', permissoes: ['cadastrar_cliente_existente', 'associar_usina'] }
};

function renderLogin(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const form = document.createElement('div');
  form.className = 'login-container';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Login 4W Energia';
  form.appendChild(titulo);

  const selectPerfil = document.createElement('select');
  selectPerfil.className = 'form-select';
  Object.keys(usuarios).forEach(perfil => {
    const option = document.createElement('option');
    option.value = perfil;
    option.textContent = perfil;
    selectPerfil.appendChild(option);
  });
  form.appendChild(selectPerfil);

  const inputSenha = document.createElement('input');
  inputSenha.type = 'password';
  inputSenha.placeholder = 'Senha';
  inputSenha.className = 'form-control';
  form.appendChild(inputSenha);

  const erroMsg = document.createElement('p');
  erroMsg.className = 'text-danger';
  erroMsg.style.display = 'none';
  form.appendChild(erroMsg);

  const botao = document.createElement('button');
  botao.textContent = 'Entrar';
  botao.className = 'btn btn-primary mt-3';

  botao.onclick = () => {
    const perfil = selectPerfil.value;
    const senha = inputSenha.value;
    erroMsg.style.display = 'none';

    if (!perfil || !senha) {
      erroMsg.textContent = 'Preencha todos os campos';
      erroMsg.style.display = 'block';
      return;
    }

    const usuario = usuarios[perfil];
    if (usuario && usuario.senha === senha) {
      localStorage.setItem('perfil', perfil);
      localStorage.setItem('permissoes', JSON.stringify(usuario.permissoes));
      window.location.href = '/';
    } else {
      erroMsg.textContent = 'Perfil ou senha inválidos';
      erroMsg.style.display = 'block';
    }
  };

  form.appendChild(botao);
  container.appendChild(form);
}
// panelpermissoes.js - versão JS puro com redirecionamento para login4w.html

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const senhaInput = document.getElementById('senha');
  const perfilSelect = document.getElementById('perfil');

  const senhasPorPerfil = {
    administrador: 'admin123',
    vendedor: 'vend123',
    suporte: 'sup123'
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const perfil = perfilSelect.value;
    const senha = senhaInput.value;

    if (senhasPorPerfil[perfil] && senhasPorPerfil[perfil] === senha) {
      alert('Login realizado com sucesso!');
      window.location.href = 'login4w.html';
    } else {
      alert('Senha incorreta para o perfil selecionado.');
    }
  });
});

// Para usar: renderLogin('id_do_container');
