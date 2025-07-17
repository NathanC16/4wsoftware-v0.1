// src/components/PermissaoRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PermissaoRoute({ children, permissaoNecessaria }) {
  const usuario = JSON.parse(localStorage.getItem('usuario')); // ou venha de contexto
  const permissoes = usuario?.permissoes || [];

  const temPermissao = permissoes.includes(permissaoNecessaria);

  return temPermissao ? children : <Navigate to="/login" replace />;
  
}
