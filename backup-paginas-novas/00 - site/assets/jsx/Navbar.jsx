import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-3">
      <ul className="flex gap-4 text-sm font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-success underline' : 'text-primary hover:underline'}
          >
            Início
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cadastro-usuario"
            className={({ isActive }) =>
              isActive ? 'text-success underline' : 'text-primary hover:underline'}
          >
            Cadastro de Usuário
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/pagamentos"
            className={({ isActive }) =>
              isActive ? 'text-success underline' : 'text-primary hover:underline'}
          >
            Pagamentos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cooperativas-usinas"
            className={({ isActive }) =>
              isActive ? 'text-success underline' : 'text-primary hover:underline'}
          >
            Cooperativas e Usinas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard-financeiro"
            className={({ isActive }) =>
              isActive ? 'text-success underline' : 'text-primary hover:underline'}
          >
            Dashboard Financeiro
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
