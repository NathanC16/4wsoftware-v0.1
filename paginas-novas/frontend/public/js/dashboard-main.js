// paginas-novas/frontend/public/js/dashboard-main.js
// Lógica principal para a página de dashboard.

import { logout, getLoggedInUser } from '../assets/js/auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const loggedInUser = getLoggedInUser();
  if (loggedInUser && loggedInUser.usuario) {
    document.getElementById('user-greeting').textContent = `Olá, ${loggedInUser.usuario}`;
  }

  const perfilToggle = document.getElementById('perfilToggle');
  const perfilMenu = document.getElementById('perfilMenu');
  if (perfilToggle && perfilMenu) {
    perfilToggle.addEventListener('click', () => {
      perfilMenu.style.display = perfilMenu.style.display === 'block' ? 'none' : 'block';
    });
  }

  const profileButton = document.getElementById('profile-button');
  if (profileButton) {
    profileButton.addEventListener('click', () => {
      console.log('Botão Perfil clicado! Redirecionando para visualizadoridividual.html');
      window.location.href = 'visualizadoridividual.html';
    });
  }

  const settingsButton = document.getElementById('settings-button');
  if (settingsButton) {
    settingsButton.addEventListener('click', () => {
      console.log('Botão Configurações clicado! Redirecionando para userdados.html');
      window.location.href = 'userdados.html';
    });
  }

  const logoutButtonDropdown = document.getElementById('logout-button-dropdown');
  if (logoutButtonDropdown) {
    logoutButtonDropdown.addEventListener('click', () => {
      console.log('Botão Sair do dropdown clicado! Chamando logout().');
      logout();
    });
  }

  
});
