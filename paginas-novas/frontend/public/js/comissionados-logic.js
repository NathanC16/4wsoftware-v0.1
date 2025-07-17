// paginas-novas/frontend/public/js/comissionados-logic.js
// Lógica para a página de comissionados.

// SheetJS para exportar Excel
// jsPDF para exportar PDF

function abrirDependentes(id) {
  window.location.href = `/indicados.html?id=${id}`;
}

function editarIndicador(button) {
  const linha = button.closest('tr');
  const colunasEditaveis = [1, 2, 3, 4, 5, 6, 7, 8];

  if (button.innerText === 'Editar') {
    colunasEditaveis.forEach(i => {
      const td = linha.children[i];
      const texto = td.innerText;
      td.innerHTML = `<input type="text" value="${texto}" style="width: 100%; padding: 4px;" />`;
    });
    button.innerText = 'Salvar';
    button.style.backgroundColor = '#4caf50';
    button.style.color = '#fff';
  } else {
    colunasEditaveis.forEach(i => {
      const td = linha.children[i];
      const novoValor = td.querySelector('input').value;
      td.innerText = novoValor;
    });
    button.innerText = 'Editar';
    button.style.backgroundColor = '#fbc02d';
    button.style.color = '#000';
  }
}

function salvarModificacoes() {
  alert('Modificações salvas com sucesso!');
}

function toggleObservacoes() {
  const obsArea = document.getElementById('area-obs');
  obsArea.style.display = obsArea.style.display === 'none' ? 'block' : 'none';
}

function exportarExcel() {
  const table = document.getElementById("tabela-indicadores");
  const wb = XLSX.utils.table_to_book(table, { sheet: "Indicadores" });
  XLSX.writeFile(wb, "indicadores.xlsx");
}

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Indicadores", 14, 15);
  doc.autoTable({
    html: "#tabela-indicadores",
    startY: 20,
    theme: 'grid',
    styles: { fontSize: 10 },
    headStyles: { fillColor: [46, 125, 50] }
  });

  doc.save("indicadores.pdf");
}

// Adicionar event listeners aos elementos com onclick
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.link-dependentes').forEach(element => {
    element.addEventListener('click', (event) => {
      abrirDependentes(event.target.dataset.id);
    });
  });

  document.querySelectorAll('.editar').forEach(element => {
    element.addEventListener('click', (event) => {
      editarIndicador(event.target);
    });
  });

  document.querySelector('.btn-container .btn:nth-child(1)').addEventListener('click', toggleObservacoes);
  document.querySelector('.btn-container .btn:nth-child(2)').addEventListener('click', salvarModificacoes);
  document.querySelector('.btn-container .btn:nth-child(3)').addEventListener('click', exportarExcel);
  document.querySelector('.btn-container .btn:nth-child(4)').addEventListener('click', exportarPDF);
});
