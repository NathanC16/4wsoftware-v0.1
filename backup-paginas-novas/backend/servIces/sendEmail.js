import api from './api';

export const sendEmail = async (emailData) => {
  try {
    const response = await api.post('/send-email', emailData);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    throw error;  // repassa o erro pra quem chamou lidar
  }
};
