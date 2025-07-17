// novo-site/frontend/js/administracao-sidebar-toggle.js
// Lógica para o botão de alternância da barra lateral.

document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggleButton = document.getElementById('sidebar-toggle-button');
  if (sidebarToggleButton) {
    sidebarToggleButton.addEventListener('click', function() {
      document.body.classList.toggle('sidebar-collapsed');
      console.log('[administracao-sidebar-toggle.js] Sidebar toggle button clicked. Body classes:', document.body.className);
    });
  } else {
    console.warn('[administracao-sidebar-toggle.js] Sidebar toggle button (sidebar-toggle-button) not found.');
  }
});
