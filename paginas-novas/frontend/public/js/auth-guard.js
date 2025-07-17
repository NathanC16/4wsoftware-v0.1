// paginas-novas/frontend/public/js/auth-guard.js
// Script para proteger páginas que exigem autenticação.

import { isLoggedIn, hasPermission } from '../assets/js/auth.js';

// Função para exibir a página de acesso negado e redirecionar
async function showAccessDeniedAndRedirect() {
  try {
    const response = await fetch('./access-denied.html');
    const html = await response.text();
    document.body.innerHTML = html;
    setTimeout(() => {
      window.location.href = 'login4w.html';
    }, 2000); // Redireciona após 2 segundos
  } catch (error) {
    console.error('Erro ao carregar página de acesso negado:', error);
    window.location.href = 'login4w.html'; // Redireciona de qualquer forma em caso de erro
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!isLoggedIn()) {
    showAccessDeniedAndRedirect();
    return;
  }

  // Lógica de permissão específica para cada página pode ser adicionada aqui
  // Exemplo: if (!hasPermission('admin_access')) { showAccessDeniedAndRedirect(); return; }
});
