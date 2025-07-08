async function fetchProtectedData(url) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Você precisa fazer login!');
    window.location.href = '/login4w.html';
    return;
  }

  const response = await fetch(url, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }
  });

  if (response.status === 401 || response.status === 403) {
    alert('Acesso negado ou token expirado. Faça login novamente.');
    localStorage.removeItem('token');
    window.location.href = '/login4w.html';
    return;
  }

  if (!response.ok) {
    throw new Error('Erro ao acessar os dados: ' + response.statusText);
  }

  return await response.json();
}
export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = options.headers || {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    if (response.status === 401) {
      // Token inválido ou expirado, desloga o usuário
      logout();
    }
    throw new Error(`Erro na requisição: ${response.statusText}`);
  }

  return response.json();
}
export async function fetchProtectedPage(page) {
  try {
    const data = await fetchProtectedData(`/api/${page}`);
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados protegidos:', error);
    throw error;
  }
}