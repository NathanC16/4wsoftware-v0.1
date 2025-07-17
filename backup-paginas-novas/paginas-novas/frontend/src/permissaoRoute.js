// Arquivo: components/PermissaoRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PermissaoRoute({ children, permissaoNecessaria }) {
  const permissoes = JSON.parse(localStorage.getItem('permissoes')) || [];

  if (permissoes.includes('todos') || permissoes.includes(permissaoNecessaria)) {
    return children;
  }

  return <Navigate to="/" replace />;
}
