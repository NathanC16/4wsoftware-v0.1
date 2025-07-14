# Ecossistema Energia 4W

Sistema web para gestão de usuários, usinas e controle de acesso baseado em permissões, desenvolvido com **Node.js (Express)** no backend e **HTML/CSS/JavaScript** no frontend.

---

## Tecnologias utilizadas

- Backend:
  - Node.js (ES Modules)
  - Express
  - MongoDB (via Mongoose)
  - JWT para autenticação
  - bcryptjs para hash de senhas
  - dotenv para variáveis de ambiente

- Frontend:
  - HTML5, CSS3, JavaScript ES6+
  - Fetch API para comunicação com backend
  - Bootstrap 5 para estilos básicos e responsividade
  - Rotas SPA via JavaScript (sem frameworks)

---

## Estrutura do Projeto

/backend
|-- app.js # Servidor Express principal
|-- models/
|-- User.js # Modelo Mongoose de Usuário
|-- routes/
|-- auth.js # Rota de autenticação (login)
|-- users.js # Rotas CRUD para usuários
|-- ... # Outras rotas do backend
|-- scripts/
|-- importaUsuarios.js # Script para importar usuários iniciais no BD
|-- .env # Variáveis de ambiente (MONGO_URI, JWT_SECRET, etc)

/frontend
|-- pages/
|-- login4w.html # Página de login
|-- home.html # Página inicial pós-login
|-- individual.html # Edição individual de usuário
|-- administração.html # Tela administrativa
|-- admin-panel.html # Painel do administrador
|-- ... # Outras páginas estáticas
|-- js/
|-- auth.js # Funções para controle de autenticação no frontend
|-- routes.js # Controle de navegação e permissões SPA
|-- individual.js # Script para edição de usuários individuais
|-- fetchProtectedData.js # Função helper para requisições protegidas com token
|-- images/ # Imagens usadas no frontend
|-- styles/ # CSS 
