export function renderFooter(containerId) {
  const container = document.getElementById(containerId);

  const footer = document.createElement('footer');
  footer.className = 'text-center py-4 mt-5 bg-light text-muted';
  footer.innerHTML = `
    <small>&copy; 2025 4W Energia. Todos os direitos reservados.</small>
  `;

  container.appendChild(footer);
}
