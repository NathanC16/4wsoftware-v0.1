import React, { useState } from 'react';

export default function Topbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle me-3">
        <i className="fa fa-bars"></i>
      </button>

      <span className="navbar-brand mb-0 h1 text-primary">Painel Administrativo</span>

      <ul className="navbar-nav ms-auto position-relative">
        <li className="nav-item dropdown no-arrow">
          <button onClick={toggleMenu} className="nav-link btn btn-link dropdown-toggle">
            <span className="me-2 d-none d-lg-inline text-gray-600 small">Olá, Vendedora</span>
            <img
              className="img-profile rounded-circle"
              src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
              alt="usuária"
            />
          </button>

          {menuAberto && (
            <div
              className="dropdown-menu dropdown-menu-end shadow animated--grow-in show"
              style={{ position: 'absolute', right: 0, top: '100%' }}
              onMouseLeave={fecharMenu}
            >
              <button className="dropdown-item">
                <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                Perfil
              </button>
              <button className="dropdown-item">
                <i className="fas fa-cogs fa-sm fa-fw me-2 text-gray-400"></i>
                Configurações
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item">
                <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                Sair
              </button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
// This component represents the top navigation bar of the application.