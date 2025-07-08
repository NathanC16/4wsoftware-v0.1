// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  return (
    <div id="wrapper" className="d-flex">
      {/* Sidebar à esquerda */}
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column w-100">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">Bem-vindo ao Painel</h1>
            {/* Conteúdo das rotas renderizado aqui */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
