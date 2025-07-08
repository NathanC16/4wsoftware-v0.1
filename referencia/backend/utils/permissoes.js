const permissoes = {
  admin: ["dashboard", "usuarios", "configuracoes", "relatorios", "financeiro"],
  fin: ["financeiro", "relatorios"],
  vend: ["vendas", "clientes"],
  suporte: ["suporte", "faq", "clientes"],
  rh: ["funcionarios", "beneficios"],
  auditor: ["relatorios", "auditoria"],
  back: ["backoffice", "relatorios", "controle"],
  estag: ["leitura", "faq"]
};

export default permissoes;
