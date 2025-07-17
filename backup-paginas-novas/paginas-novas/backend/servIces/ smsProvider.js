// backend/services/smsProvider.js

export const sendSms = async ({ telefone, mensagem }) => {
  // Aqui você integraria com Twilio, Nexmo, ou outro serviço real
  console.log(`Enviando SMS para ${telefone}: ${mensagem}`);

  // Simula espera de envio
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export default { sendSms };
