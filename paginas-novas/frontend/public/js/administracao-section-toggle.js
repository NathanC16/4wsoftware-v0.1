// novo-site/frontend/js/administracao-section-toggle.js
// Lógica para alternar a visibilidade das seções na página de administração.

document.addEventListener('DOMContentLoaded', function() {
  const sidebarNav = document.getElementById('sidebar-nav');
  if (sidebarNav) {
    sidebarNav.addEventListener('click', function(event) {
      const targetLi = event.target.closest('li');
      if (targetLi && targetLi.dataset.section) {
        const sectionId = targetLi.dataset.section;
        const sections = document.querySelectorAll('main section');
        sections.forEach(sec => {
          sec.classList.remove('active');
        });
        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
          activeSection.classList.add('active');
          console.log(`[administracao-section-toggle.js] Seção '${sectionId}' ativada.`);
        } else {
          console.error(`[administracao-section-toggle.js] Seção com id '${sectionId}' não encontrada para ativar.`);
        }
      }
    });
  } else {
    console.warn('[administracao-section-toggle.js] Elemento #sidebar-nav não encontrado.');
  }
});
