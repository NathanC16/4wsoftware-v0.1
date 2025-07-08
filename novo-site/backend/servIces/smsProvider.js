// services/smsProvider.js

/**
 * Simula o envio de um SMS para um número de telefone.
 * Em um ambiente de produção, esta função seria substituída por uma integração real com um provedor de SMS (ex: Twilio, Nexmo).
 * @param {Object} options - Opções para o envio do SMS.
 * @param {string} options.telefone - O número de telefone do destinatário.
 * @param {string} options.mensagem - O texto da mensagem a ser enviada.
 * @returns {Promise<void>} Uma promessa que resolve após a simulação do envio.
 */
export const sendSms = async ({ telefone, mensagem }) => {
  // Em um cenário real, aqui você faria a chamada à API do provedor de SMS.
  console.log(`[SMS_PROVIDER] Simulando envio de SMS para ${telefone}: "${mensagem}"`);

  // Simula um atraso no envio para representar uma operação assíncrona real
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

// Exporta o objeto com a função sendSms
export default { sendSms };
