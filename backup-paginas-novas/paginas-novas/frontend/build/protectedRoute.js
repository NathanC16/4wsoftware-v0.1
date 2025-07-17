// import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = true; // substitua por lógica real de auth
  return isAuthenticated ? children : <Navigate to="/" />;
}
// Este componente verifica se o usuário está autenticado antes de renderizar as rotas protegidas.
// Se não estiver autenticado, redireciona para a página inicial (ou outra página de login).