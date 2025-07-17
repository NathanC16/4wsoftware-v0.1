// paginas-novas/frontend/public/js/userdados-logic.js
// Lógica para a página de dados de usuários.

$(document).ready(function () {
  // Dados simulados para exemplo
  const nomes = ["João Silva", "Maria Oliveira", "Carlos Souza", "Ana Paula", "Felipe Costa"];
  const emails = ["joao.silva", "maria.oliveira", "carlos.souza", "ana.paula", "felipe.costa"];
  const telefones = ["91234-5678", "98765-4321", "99887-6655", "91111-2222", "98888-7777"];
  const status = ["Contato Inicial", "Proposta Enviada", "Negociação", "Fechado", "Cancelado"];
  const modalidades = ["Autoconsumo", "Compartilhada"];
  const usinas = ["Usina Norte", "Usina Centro", "Usina Sul"];

  // Função para gerar dados com link no nome para a página individual com o id simulado (índice)
  function gerarDadosClientes(qtd) {
    const dados = [];
    for (let i = 0; i < qtd; i++) {
      const nome = nomes[i % nomes.length];
      const email = `${emails[i % emails.length]}${i}@example.com`;
      const telefone = `(62) ${telefones[i % telefones.length]}`;
      const dataCadastro = new Date(2025, 5, 1 + (i % 30)).toISOString().split('T')[0];
      const uc = `UC${100000 + i}`;
      const cpfcnpj = i % 2 === 0 ? `000.000.000-0${i % 9}` : `00.000.000/0000-0${i % 9}`;
      const nascimento = `199${i % 10}-0${(i % 12) + 1}-15`;
      const usina = usinas[i % usinas.length];
      const modalidade = modalidades[i % modalidades.length];
      const stat = status[i % status.length];
      // O nome vira um link que aponta para visualizadoridividual.html?id=i
      dados.push([
        `<a href="visualizadoridividual.html?id=${i}" class="nome-link">${nome}</a>`,
        email,
        telefone,
        dataCadastro,
        uc,
        cpfcnpj,
        nascimento,
        usina,
        modalidade,
        stat
      ]);
    }
    return dados;
  }

  // Inicializa DataTable
  const table = $('#leadsTable').DataTable({
    data: gerarDadosClientes(251),
    columns: [
      { title: "Nome" },
      { title: "E-mail" },
      { title: "Telefone" },
      { title: "Data de Cadastro" },
      { title: "UC" },
      { title: "CPF/CNPJ" },
      { title: "Data de Nascimento" },
      { title: "Usina" },
      { title: "Modalidade" },
      { title: "Status" }
    ],
    createdRow: function(row) {
      $('td', row).addClass('editable');
    },
    pageLength: 55,
    dom: 'Bfrtip',
    buttons: [
      {
        extend: 'excelHtml5',
        text: 'Exportar para Excel',
        title: 'Dados_Clientes_4W'
      },
      {
        extend: 'pdfHtml5',
        text: 'Exportar para PDF',
        title: 'Dados_Clientes_4W',
        orientation: 'landscape', // Manter paisagem para mais espaço
        pageSize: 'A4',
        customize: function (doc) {
          // Reduz o tamanho da fonte padrão para todo o documento
          doc.defaultStyle.fontSize = 7; 

          // Reduz as margens da página para maximizar o espaço
          doc.pageMargins = [20, 20, 20, 20]; // [left, top, right, bottom]

          // Ajusta o tamanho da fonte do cabeçalho da tabela (opcional)
          if (doc.styles.tableHeader) {
            doc.styles.tableHeader.fontSize = 7;
          }

          // Define larguras percentuais explícitas para cada coluna
          if (doc.content && doc.content[1] && doc.content[1].table) {
            doc.content[1].table.widths = [
              '8%',  // Nome
              '14%', // E-mail
              '9%',  // Telefone
              '9%',  // Data de Cadastro
              '7%',  // UC
              '11%', // CPF/CNPJ
              '9%',  // Data de Nascimento
              '7%',  // Usina
              '7%',  // Modalidade
              '8%'   // Status
            ];
            doc.content[1].alignment = 'center'; // Centraliza a tabela na página
          }
        }
      }
    ],
    language: {
      url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
    }
  });

  // Permite editar as células clicando nelas
  $('#leadsTable tbody').on('click', 'td.editable', function () {
    const cell = table.cell(this);
    const original = cell.data();
    // Não deixa editar o link do nome
    if ($(this).hasClass('nome-link') || $(this).find('a').length) return;

    const input = $('<input type="text" class="form-control" />').val(original);
    $(this).html(input);
    input.focus();
    $('#editButton').show();
    input.blur(function () {
      cell.data(input.val()).draw();
    });
  });

  // Botão para mostrar/ocultar tabela
  $('#toggleTable').on('click', function () {
    $('#leadsTable').toggle();
    $(this).text($('#leadsTable').is(':visible') ? 'Ocultar Tabela' : 'Mostrar Tabela');
  });

  // Botão salvar (apenas alert pra demo)
  $('#editButton').on('click', function () {
    alert('Alterações salvas com sucesso!');
    $(this).hide();
  });

  // Botão voltar para home
  document.getElementById('btnVoltarHome').addEventListener('click', () => {
    window.location.href = 'dashboard.html';
  });
});
