// services/sendEmail.js
import api from './api'; // Presume-se que './api' exporta uma instância configurada do axios ou similar

/**
 * Envia um email através de uma requisição HTTP para o backend.
 * @param {Object} emailData - Objeto contendo os dados do email a ser enviado (ex: to, subject, text, html).
 * @returns {Promise<Object>} Uma promessa que resolve com os dados da resposta da API.
 * @throws {Error} Lança um erro se a requisição falhar.
 */
export const sendEmail = async (emailData) => {
  try {
    // Faz uma requisição POST para o endpoint '/send-email' do backend
    const response = await api.post('/send-email', emailData);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    // Re-lança o erro para que a função chamadora possa tratá-lo
    throw error;  
  }
};
