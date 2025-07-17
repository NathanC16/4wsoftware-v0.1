// cadastroUsuarioAvancado.js - JS puro sem React

function renderFormularioCadastroUsuarioAvancado(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const formData = {
    nome: '', cpf: '', rg: '', orgaoEmissor: '', dataNascimento: '', genero: '', estadoCivil: '',
    endereco: '', quadra: '', lote: '', cep: '', referencia: '', telefone: '', email: '', emailExtra: '',
    renda: '', unidadeConsumidora: '', razaoSocial: '', cnpj: '', outroTitular: false, nomeTitular: '', cpfTitular: '', assinaturaTitular: ''
  };

  const form = document.createElement('form');
  form.className = 'container mt-4';
  form.autocomplete = 'off';

  const titulo = document.createElement('h2');
  titulo.className = 'mb-4';
  titulo.textContent = 'Cadastro de Usuário';

  const tipoPessoaFisica = document.createElement('input');
  tipoPessoaFisica.type = 'radio';
  tipoPessoaFisica.name = 'tipoPessoa';
  tipoPessoaFisica.value = 'fisica';
  tipoPessoaFisica.checked = true;

  const tipoPessoaJuridica = document.createElement('input');
  tipoPessoaJuridica.type = 'radio';
  tipoPessoaJuridica.name = 'tipoPessoa';
  tipoPessoaJuridica.value = 'juridica';

  const wrapperTipo = document.createElement('div');
  wrapperTipo.className = 'mb-3';
  wrapperTipo.innerHTML = `
    <label class="me-3"><input type="radio" name="tipoPessoa" value="fisica" checked> Pessoa Física</label>
    <label><input type="radio" name="tipoPessoa" value="juridica"> Pessoa Jurídica</label>
  `;
  form.appendChild(wrapperTipo);

  const fields = [
    { label: 'Nome completo', name: 'nome' },
    { label: 'CPF', name: 'cpf', mask: true },
    { label: 'Telefone', name: 'telefone', mask: true },
    { label: 'Email', name: 'email' },
    { label: 'Endereço', name: 'endereco' },
    { label: 'CEP', name: 'cep', mask: true }
  ];

  fields.forEach(f => {
    const div = document.createElement('div');
    div.className = 'form-group mb-3';

    const label = document.createElement('label');
    label.textContent = f.label;
    const input = document.createElement('input');
    input.className = 'form-control';
    input.name = f.name;
    input.required = true;
    input.placeholder = f.label;

    if (f.mask) {
      input.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '');
        if (f.name === 'cpf') val = val.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        if (f.name === 'telefone') val = val.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
        if (f.name === 'cep') val = val.replace(/(\d{5})(\d)/, '$1-$2');
        e.target.value = val;
        formData[f.name] = val;
      });
    } else {
      input.addEventListener('input', e => formData[f.name] = e.target.value);
    }

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  });

  const canvasDiv = document.createElement('div');
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 150;
  canvas.style.border = '1px solid #ccc';
  canvasDiv.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let drawing = false;

  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mouseup', () => drawing = false);
  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  });

  const btnSalvarAssinatura = document.createElement('button');
  btnSalvarAssinatura.type = 'button';
  btnSalvarAssinatura.textContent = 'Salvar Assinatura';
  btnSalvarAssinatura.className = 'btn btn-sm btn-success me-2';
  btnSalvarAssinatura.onclick = () => {
    formData.assinaturaTitular = canvas.toDataURL('image/png');
    alert('Assinatura salva!');
  };

  const btnLimparAssinatura = document.createElement('button');
  btnLimparAssinatura.type = 'button';
  btnLimparAssinatura.textContent = 'Limpar';
  btnLimparAssinatura.className = 'btn btn-sm btn-secondary';
  btnLimparAssinatura.onclick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    formData.assinaturaTitular = '';
  };

  canvasDiv.appendChild(btnSalvarAssinatura);
  canvasDiv.appendChild(btnLimparAssinatura);
  form.appendChild(canvasDiv);

  const btnSubmit = document.createElement('button');
  btnSubmit.type = 'submit';
  btnSubmit.className = 'btn btn-primary mt-3';
  btnSubmit.textContent = 'Cadastrar';

  const mensagem = document.createElement('div');
  mensagem.className = 'alert alert-success mt-3 d-none';
  mensagem.textContent = 'Usuário cadastrado com sucesso!';

  form.appendChild(btnSubmit);
  form.appendChild(mensagem);

  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    mensagem.classList.remove('d-none');
    setTimeout(() => mensagem.classList.add('d-none'), 3000);
  });

  container.appendChild(titulo);
  container.appendChild(form);
}

// Para usar: renderFormularioCadastroUsuarioAvancado('id_do_container');
