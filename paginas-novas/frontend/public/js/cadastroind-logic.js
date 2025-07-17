// paginas-novas/frontend/public/js/cadastroind-logic.js
// Lógica para a página de cadastro de indicadores.

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('form-indicador').addEventListener('submit', function (e) {
    e.preventDefault();

    const camposObrigatorios = this.querySelectorAll('[required]');
    let valido = true;

    camposObrigatorios.forEach(campo => {
      if (!campo.value.trim()) {
        valido = false;
        campo.style.border = '2px solid red';
      } else {
        campo.style.border = '';
      }
    });

    if (!valido) {
      alert('⚠️ Preencha todos os campos obrigatórios antes de cadastrar.');
      return;
    }

    alert('✅ Indicador cadastrado com sucesso!');
    window.location.href = 'comissionados.html';
  });
});
