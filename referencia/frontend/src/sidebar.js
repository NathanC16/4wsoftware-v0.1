// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome, FaUserPlus, FaUsers, FaBolt, FaBuilding,
  FaFileInvoice, FaQuestionCircle
} from 'react-icons/fa'; 

export default function Sidebar() {
  return (
    <div className="bg-gradient-primary sidebar sidebar-dark accordion" id="ecossistemaSidebar">
      <div className="sidebar-brand d-flex align-items-center justify-content-center py-4">
        <div className="sidebar-brand-icon rotate-n-15">
          ⚡
        </div>
        <div className="sidebar-brand-text mx-3">Ecossistema</div>
      </div>

      <hr className="sidebar-divider my-0" />

      <ul className="nav flex-column px-2">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white">
            <FaHome className="me-2" /> Dashboard
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading text-white px-3">Gestão</div>

        <li className="nav-item">
          <Link to="/cadastro" className="nav-link text-white">
            <FaUserPlus className="me-2" /> Novo Cadastro
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/usuarios" className="nav-link text-white">
            <FaUsers className="me-2" /> Usuários
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading text-white px-3">Operações</div>

        <li className="nav-item">
          <Link to="/consumo" className="nav-link text-white">
            <FaBolt className="me-2" /> Consumo
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/usinas" className="nav-link text-white">
            <FaBuilding className="me-2" /> Usinas
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/faturas" className="nav-link text-white">
            <FaFileInvoice className="me-2" /> Faturas
          </Link>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading text-white px-3">Suporte</div>

        <li className="nav-item">
          <Link to="/ajuda" className="nav-link text-white">
            <FaQuestionCircle className="me-2" /> Ajuda
          </Link>
        </li>
      </ul>
    </div>
  );
}
