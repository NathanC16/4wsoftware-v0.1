document.addEventListener('DOMContentLoaded', () => {
  const conteudo = document.getElementById('conteudo-admin');
  const hash = window.location.hash.slice(1);

  if (hash === 'usuarios') {
    conteudo.innerHTML = '<h2>Gerenciar Usuários</h2><p>Funcionalidade em desenvolvimento.</p>';
  } else if (hash === 'permissoes') {
    conteudo.innerHTML = '<h2>Gerenciar Permissões</h2><p>Funcionalidade em desenvolvimento.</p>';
  } else if (hash === 'logs') {
    conteudo.innerHTML = '<h2>Logs de Acesso</h2><p>Funcionalidade em desenvolvimento.</p>';
  }
});
