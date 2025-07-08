// frontend/js/fetchProtectedData.js

/**
 * Função para buscar dados de uma rota protegida do backend.
 * Inclui o token JWT no cabeçalho da requisição.
 * @param {string} url - A URL da rota protegida a ser acessada.
 * @returns {Promise<Object>} - Uma promessa que resolve com os dados da resposta ou rejeita com um erro.
 */
export async function fetchProtectedData(url) {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('Token JWT não encontrado no localStorage.');
    // Redirecionar para a página de login se não houver token
    window.location.href = '/pages/login4w.html';
    throw new Error('Não autorizado: Token não encontrado.');
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Inclui o token no cabeçalho Authorization
      }
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Token inválido ou expirado, ou permissão negada
        console.error('Erro de autenticação/autorização:', response.statusText);
        localStorage.removeItem('token'); // Remove token inválido
        window.location.href = '/pages/login4w.html'; // Redireciona para login
        throw new Error('Não autorizado: Token inválido ou expirado.');
      }
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados protegidos:', error);
    throw error;
  }
}

// Exemplo de uso (pode ser chamado de outras partes do frontend)
// fetchProtectedData('/api/dashboard')
//   .then(data => console.log('Dados do dashboard:', data))
//   .catch(error => console.error('Falha ao carregar dashboard:', error));