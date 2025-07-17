[index.html]
  Função: Página inicial, provavelmente um ponto de entrada ou landing page.
  Conexões:
    - Pode redirecionar para 'login4w.html' ou 'home.html' dependendo do estado de autenticação.
    - Pode conter links para outras páginas públicas ou de informação.

[login4w.html]
  Função: Interface de autenticação de usuário.
  Conexões:
    - Envia credenciais para o backend (via 'api.js' ou similar).
    - Redireciona para 'home.html' (ou 'administracao.html' se for admin) após login bem-sucedido.
    - Pode ter link para 'cadastro.html' (cadastro de novos usuários).

[home.html]
  Função: Dashboard principal ou página de boas-vindas para usuários logados.
  Conexões:
    - Links de navegação para outras seções do sistema (ex: 'administracao.html', 'visualizadoridividual.html', 'userdados.html', 'usinascadastro.html').
    - Carrega componentes como 'footer.js' e 'topbar.js'.

[administracao.html]
  Função: Painel administrativo com visão geral e gestão de diversas áreas.
  Conexões:
    - Navegação interna entre seções (Visão Geral, Resumo Mensal, Indicadores, Faturamento, Auditoria Faturas, Contratos, Ranking Vendedoras) via 'administracao-section-toggle.js'.
    - Carrega 'administracao-logic.js' para gráficos e lógica específica.
    - Carrega 'administracao-main-module.js' para autenticação e layout (topbar, footer).
    - Carrega 'administracao-sidebar-toggle.js' para funcionalidade da barra lateral.
    - Links de navegação para 'home.html', 'visualizadoridividual.html', 'userdados.html', 'usinascadastro.html'.

[visualizadoridividual.html]
  Função: Visualização e gestão do perfil individual do usuário.
  Conexões:
    - Acessado via navegação principal (ex: de 'home.html' ou 'administracao.html').
    - Pode interagir com o backend para buscar/atualizar dados do perfil.

[userdados.html]
  Função: Gestão de dados de usuários (listagem, edição, etc.).
  Conexões:
    - Acessado via navegação principal.
    - Interage com o backend para operações CRUD em dados de usuários.
    - Pode ter links para 'cadastro.html' ou 'cadastroind.html'.

[usinascadastro.html]
  Função: Formulário para cadastro de usinas.
  Conexões:
    - Acessado via navegação principal.
    - Envia dados para o backend para registro de novas usinas.

[cadastro.html]
  Função: Formulário genérico de cadastro (pode ser para usuários ou outras entidades).
  Conexões:
    - Pode ser acessado de 'login4w.html' ou 'userdados.html'.
    - Envia dados para o backend.

[cadastroind.html]
  Função: Formulário para cadastro de indivíduos/indicados.
  Conexões:
    - Similar a 'cadastro.html', mas focado em "indicados".
    - Envia dados para o backend.

[comissionados.html]
  Função: Exibição e gestão de dados relacionados a comissionados.
  Conexões:
    - Acessado via navegação principal.
    - Interage com o backend para dados de comissionamento.

[historico-completo.html]
  Função: Visualização de um histórico detalhado/completo de operações.
  Conexões:
    - Acessado via navegação principal.
    - Busca dados históricos do backend.

[historico-inadimplentes.html]
  Função: Visualização de histórico de inadimplentes.
  Conexões:
    - Acessado via navegação principal.
    - Busca dados específicos de inadimplência do backend.

[historicocomissionados.html]
  Função: Visualização do histórico de comissionamentos.
  Conexões:
    - Acessado via navegação principal.
    - Busca dados históricos de comissionamento do backend.

[historicofaturas.html]
  Função: Visualização do histórico de faturas.
  Conexões:
    - Acessado via navegação principal.
    - Busca dados históricos de faturas do backend.

[indicados.html]
  Função: Listagem e gestão de indivíduos indicados.
  Conexões:
    - Acessado via navegação principal.
    - Interage com o backend para dados de indicados.

[admin-panel.html]
  Função: Possível painel administrativo alternativo ou mais antigo.
  Conexões:
    - Pode ser um predecessor ou uma versão diferente de 'administracao.html'.
    - Suas conexões dependeriam do seu conteúdo específico.

[403.html]
  Função: Página de erro para acesso proibido (Forbidden).
  Conexões:
    - Exibida automaticamente pelo servidor em caso de erro 403.

[404.html]
  Função: Página de erro para recurso não encontrado (Not Found).
  Conexões:
    - Exibida automaticamente pelo servidor em caso de erro 404.

[portfolio-details.html]
  Função: Detalhes de um item de portfólio (provavelmente resquício de template).
  Conexões:
    - Provavelmente não está diretamente integrado ao fluxo principal do sistema de gestão.

**Componentes JavaScript Comuns (em `js/` e `assets/js/`):**

*   **`auth.js`**: Lógica de autenticação (login, logout, verificação de sessão).
*   **`topbar.js`**: Renderiza a barra superior da interface.
*   **`footer.js`**: Renderiza o rodapé da interface.
*   **`administracao-logic.js`**: Lógica específica para a página de administração, incluindo inicialização de gráficos.
*   **`administracao-main-module.js`**: Módulo principal para a página de administração, orquestrando autenticação e renderização de layout.
*   **`administracao-sidebar-toggle.js`**: Lógica para o botão de alternância da barra lateral.
*   **`administracao-section-toggle.js`**: Lógica para alternar a visibilidade das seções na página de administração.
*   **`chart.min.js`**: Biblioteca Chart.js para renderização de gráficos.
*   **`api.js`**: Provável módulo para chamadas à API do backend.
*   **`router.js`**: Pode ser um roteador de frontend para navegação SPA (Single Page Application) ou para gerenciar rotas de backend.
*   Outros arquivos `.js` como `CadastroUsuario.js`, `casdastrousinas.js`, `distribuicao.js`, `Formulario.js`, `home.js`, `Layout.js`, `login.js`, `main.js`, `Painel do Vendedor.js`, `pamagentos.js`, `perfil.js`, `permicoes.js`, `ProtectedRoute.js`, `routes.js`, `server.js`, `sidebar.js`, `Suporte.js`, `ToastContainer.js`, `Usinas.js`, `usuarios.js` indicam lógicas específicas para as páginas ou módulos correspondentes.

Este fluxograma textual oferece uma visão geral da estrutura e interconexões do seu projeto.
