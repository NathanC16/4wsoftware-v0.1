export function renderNavbar(containerId) {
  const container = document.getElementById(containerId);

  const nav = document.createElement('nav');
  nav.className = 'navbar navbar-dark bg-success px-3';
  
  nav.innerHTML = `
    <a class="navbar-brand" href="#">4W Energia</a>
    <ul class="navbar-nav d-flex flex-row gap-3">
      <li class="nav-item"><a class="nav-link text-white" href="#visaoGeral">Visão Geral</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="#indicadores">Indicadores</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="#faturamento">Faturamento</a></li>
      <li class="nav-item"><a class="nav-link text-white" href="#contratos">Contratos</a></li>
    </ul>
  `;

  container.appendChild(nav);
}
