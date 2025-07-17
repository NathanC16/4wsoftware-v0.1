// cadastroCoopUsina.js - versão JS puro sem React

function renderCadastroCoopUsina(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  let tab = 'cooperativa';
  let formCoop = { nome: '', cnpj: '', email: '', telefone: '', endereco: '' };
  let formUsina = { nome: '', cnpj: '', potencia: '', responsavel: '', cooperativa: '', tipo: '', endereco: '' };

  function createInput(placeholder, name, value, onChange, type = 'text') {
    const input = document.createElement('input');
    input.type = type;
    input.className = 'form-control';
    input.placeholder = placeholder;
    input.name = name;
    input.value = value;
    input.required = true;
    input.addEventListener('input', onChange);
    return input;
  }

  function renderForm() {
    form.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'row g-3';

    if (tab === 'cooperativa') {
      row.appendChild(createInput('Nome da Cooperativa', 'nome', formCoop.nome, e => formCoop.nome = e.target.value));
      row.appendChild(createInput('CNPJ', 'cnpj', formCoop.cnpj, e => formCoop.cnpj = e.target.value));
      row.appendChild(createInput('E-mail', 'email', formCoop.email, e => formCoop.email = e.target.value, 'email'));
      row.appendChild(createInput('Telefone', 'telefone', formCoop.telefone, e => formCoop.telefone = e.target.value));
      row.appendChild(createInput('Endereço', 'endereco', formCoop.endereco, e => formCoop.endereco = e.target.value));
    } else {
      row.appendChild(createInput('Nome da Usina', 'nome', formUsina.nome, e => formUsina.nome = e.target.value));
      row.appendChild(createInput('CNPJ da Usina', 'cnpj', formUsina.cnpj, e => formUsina.cnpj = e.target.value));
      row.appendChild(createInput('Potência Instalada (kWp)', 'potencia', formUsina.potencia, e => formUsina.potencia = e.target.value));
      row.appendChild(createInput('Responsável Técnico', 'responsavel', formUsina.responsavel, e => formUsina.responsavel = e.target.value));
      row.appendChild(createInput('Cooperativa vinculada', 'cooperativa', formUsina.cooperativa, e => formUsina.cooperativa = e.target.value));

      const select = document.createElement('select');
      select.className = 'form-select';
      select.name = 'tipo';
      select.required = true;
      select.value = formUsina.tipo;
      select.innerHTML = `
        <option value="">Tipo de Usina</option>
        <option value="UFV">☀️ UFV - Fotovoltaica</option>
        <option value="CGH">💧 CGH - Hidrelétrica</option>
        <option value="Termo">🔥 Termoelétrica</option>
      `;
      select.addEventListener('change', e => formUsina.tipo = e.target.value);
      row.appendChild(select);

      row.appendChild(createInput('Endereço da Usina', 'endereco', formUsina.endereco, e => formUsina.endereco = e.target.value));
    }

    form.appendChild(row);
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'text-center mt-4';
    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.className = 'btn btn-custom';
    btn.textContent = 'Cadastrar';
    btnWrapper.appendChild(btn);
    form.appendChild(btnWrapper);
  }

  const main = document.createElement('main');
  main.style.marginTop = '90px';
  main.innerHTML = `
    <div class="container">
      <div class="faixa-verde text-center text-white fw-bold" style="background: #28a745; border-radius: 12px; padding: 1.2rem 0">
        4W Energia | Gestão de Ativos Renováveis
      </div>
    </div>
  `;

  const section = document.createElement('section');
  section.className = 'container';
  section.innerHTML = `
    <h2 class="text-success text-center fw-bold my-4">Cadastro de Cooperativas e Usinas</h2>
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <button id="tabCoop" class="nav-link active">Cooperativa</button>
      </li>
      <li class="nav-item">
        <button id="tabUsina" class="nav-link">Usina</button>
      </li>
    </ul>
  `;

  const form = document.createElement('form');
  form.className = 'card p-4 mt-4';

  form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
      const payload = tab === 'cooperativa' ? formCoop : formUsina;
      await fetch('/api/usinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      alert('Cadastro realizado com sucesso!');
      if (tab === 'cooperativa') formCoop = { nome: '', cnpj: '', email: '', telefone: '', endereco: '' };
      else formUsina = { nome: '', cnpj: '', potencia: '', responsavel: '', cooperativa: '', tipo: '', endereco: '' };
      renderForm();
    } catch (err) {
      alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  });

  section.appendChild(form);
  main.appendChild(section);
  container.appendChild(main);

  document.getElementById('tabCoop').addEventListener('click', () => {
    tab = 'cooperativa';
    document.getElementById('tabCoop').classList.add('active');
    document.getElementById('tabUsina').classList.remove('active');
    renderForm();
  });

  document.getElementById('tabUsina').addEventListener('click', () => {
    tab = 'usina';
    document.getElementById('tabUsina').classList.add('active');
    document.getElementById('tabCoop').classList.remove('active');
    renderForm();
  });

  renderForm();
}

// Para usar: renderCadastroCoopUsina('id_do_container');
