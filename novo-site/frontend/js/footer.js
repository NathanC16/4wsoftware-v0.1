export function renderFooter(containerId) {
  console.log('[footer.js] renderFooter chamada para container:', containerId);
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[footer.js] Container do Footer '${containerId}' não encontrado.`);
    return;
  }

  const footer = document.createElement('footer');
  footer.className = 'text-center py-4 mt-5 bg-light text-muted';
  footer.innerHTML = `
    <small>&copy; 2025 4W Energia. Todos os direitos reservados.</small>
  `;

  container.innerHTML = ''; // Limpa o container
  container.appendChild(footer);
  console.log('[footer.js] Footer renderizado e adicionado ao container.');
}
