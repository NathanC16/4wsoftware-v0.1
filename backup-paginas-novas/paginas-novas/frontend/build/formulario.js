// formularioUsuario.js - JS puro com controle de tipo de usuário

function renderFormularioUsuario(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const formData = {
    tipoUsuario: 'usuario',
    nome: '',
    cpf: ''
  };

  const form = document.createElement('form');
  form.className = 'container mt-4';
  form.autocomplete = 'off';

  const titulo = document.createElement('h2');
  titulo.className = 'mb-4';
  titulo.textContent = 'Cadastro de Usuário';

  const grupoTipo = document.createElement('div');
  grupoTipo.className = 'form-group mb-3';
  const labelTipo = document.createElement('label');
  labelTipo.htmlFor = 'tipoUsuario';
  labelTipo.textContent = 'Tipo de Usuário';
  const selectTipo = document.createElement('select');
  selectTipo.id = 'tipoUsuario';
  selectTipo.name = 'tipoUsuario';
  selectTipo.className = 'form-control';
  ['usuario', 'admin', 'tecnico'].forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo;
    option.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    selectTipo.appendChild(option);
  });
  selectTipo.addEventListener('change', e => formData.tipoUsuario = e.target.value);

  grupoTipo.appendChild(labelTipo);
  grupoTipo.appendChild(selectTipo);

  const grupoNome = document.createElement('div');
  grupoNome.className = 'form-group mb-3';
  const labelNome = document.createElement('label');
  labelNome.htmlFor = 'nome';
  labelNome.textContent = 'Nome completo';
  const inputNome = document.createElement('input');
  inputNome.type = 'text';
  inputNome.id = 'nome';
  inputNome.name = 'nome';
  inputNome.className = 'form-control';
  inputNome.placeholder = 'Digite seu nome completo';
  inputNome.required = true;
  inputNome.addEventListener('input', e => formData.nome = e.target.value);

  grupoNome.appendChild(labelNome);
  grupoNome.appendChild(inputNome);

  const grupoCpf = document.createElement('div');
  grupoCpf.className = 'form-group mb-3';
  const labelCpf = document.createElement('label');
  labelCpf.htmlFor = 'cpf';
  labelCpf.textContent = 'CPF';
  const inputCpf = document.createElement('input');
  inputCpf.type = 'text';
  inputCpf.id = 'cpf';
  inputCpf.name = 'cpf';
  inputCpf.className = 'form-control';
  inputCpf.placeholder = '000.000.000-00';
  inputCpf.required = true;
  inputCpf.maxLength = 14;
  inputCpf.addEventListener('input', e => {
    let v = e.target.value.replace(/\D/g, '');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
    formData.cpf = v;
  });

  grupoCpf.appendChild(labelCpf);
  grupoCpf.appendChild(inputCpf);

  const botao = document.createElement('button');
  botao.type = 'submit';
  botao.className = 'btn btn-primary mt-3';
  botao.textContent = 'Cadastrar';

  const mensagem = document.createElement('div');
  mensagem.className = 'alert alert-success mt-3 d-none';
  mensagem.textContent = 'Usuário cadastrado com sucesso!';

  form.appendChild(titulo);
  form.appendChild(grupoTipo);
  form.appendChild(grupoNome);
  form.appendChild(grupoCpf);
  form.appendChild(botao);
  form.appendChild(mensagem);

  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    mensagem.classList.remove('d-none');
    setTimeout(() => mensagem.classList.add('d-none'), 3000);
  });

  container.appendChild(form);
}

// Para usar: renderFormularioUsuario('id_do_container');
