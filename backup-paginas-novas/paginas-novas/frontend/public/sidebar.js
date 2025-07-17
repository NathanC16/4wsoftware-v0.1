// sidebar.js – controla o menu lateral responsivo

document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('sidebar-open');
  const closeBtn = document.getElementById('sidebar-close');
  const sidebar = document.getElementById('sidebar');

  if (!openBtn || !closeBtn || !sidebar) return;

  openBtn.addEventListener('click', () => {
    sidebar.classList.add('sidebar-open');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-open');
  });

  // Fecha sidebar ao clicar fora (em telas pequenas)
  document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('sidebar-open') &&
        !sidebar.contains(e.target) &&
        e.target !== openBtn) {
      sidebar.classList.remove('sidebar-open');
    }
  });
});

