// import React from 'react';

export default function Topbar() {
  const nomeUsuario = localStorage.getItem('nomeUsuario') || 'Usuário';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nomeUsuario');
    window.location.href = '/login.html';
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle me-3">
        <i className="fa fa-bars"></i>
      </button>

      <form className="d-none d-sm-inline-block form-inline me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input type="text" className="form-control bg-light border-0 small" placeholder="Pesquisar..." />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <span className="navbar-brand mb-0 h1 text-primary ms-3">Painel Administrativo</span>

      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <span className="nav-link text-gray-600 small">Olá, {nomeUsuario} 🌻</span>
        </li>
        <li className="nav-item dropdown no-arrow">
          <button
            className="nav-link dropdown-toggle btn btn-link"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              className="img-profile rounded-circle"
              src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
              alt="usuário"
            />
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
            <li>
              <button className="dropdown-item btn btn-link">
                <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                Perfil
              </button>
            </li>
            <li>
              <button className="dropdown-item btn btn-link">
                <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                Configurações
              </button>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item btn btn-link" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                Sair
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
// Topbar.jsx - Componente de barra superior com informações do usuário e logout
// Este componente exibe o nome do usuário logado, uma barra de pesquisa e opções de perfil.
// Ele também inclui um botão de logout que limpa o armazenamento local e redireciona para a página de login.
// O nome do usuário é obtido do armazenamento local, e o logout remove o token de autenticação.
// A barra de pesquisa permite que os usuários busquem informações no painel administrativo.
// O componente utiliza classes do Bootstrap para estilização e responsividade.