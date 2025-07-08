// utils/permissoes.js

// Objeto que mapeia roles (papéis de usuário) a um array de permissões específicas.
// Cada chave representa uma role, e o valor é um array de strings, onde cada string é uma permissão.
const permissoes = {
  admin: ["dashboard", "usuarios", "configuracoes", "relatorios", "financeiro"], // Permissões para administradores
  fin: ["financeiro", "relatorios"], // Permissões para o setor financeiro
  vend: ["vendas", "clientes"], // Permissões para vendedores
  suporte: ["suporte", "faq", "clientes"], // Permissões para o suporte
  rh: ["funcionarios", "beneficios"], // Permissões para o RH
  auditor: ["relatorios", "auditoria"], // Permissões para auditores
  back: ["backoffice", "relatorios", "controle"], // Permissões para o backoffice
  estag: ["leitura", "faq"] // Permissões para estagiários (apenas leitura e FAQ)
};

// Exporta o objeto de permissões para ser utilizado em outras partes da aplicação
export default permissoes;
