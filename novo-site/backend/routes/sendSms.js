// routes/sendSms.js
import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import smsProvider from '../servIces/smsProvider.js'; // Importa o serviço de envio de SMS

const router = express.Router();

/**
 * POST /api/send-sms
 * Rota para enviar SMS. Requer autenticação.
 * @param {string} telefone - O número de telefone para o qual o SMS será enviado.
 * @param {string} mensagem - O conteúdo da mensagem SMS.
 */
router.post('/', authenticateToken, async (req, res) => {
  const { telefone, mensagem } = req.body;

  // Validação de campos obrigatórios
  if (!telefone || !mensagem) {
    return res.status(400).json({ erro: 'Telefone e mensagem são obrigatórios para enviar SMS.' });
  }

  try {
    // Chama o serviço de envio de SMS
    await smsProvider.sendSms({ telefone, mensagem });

    res.status(200).json({ mensagem: 'SMS enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar SMS:', error);
    res.status(500).json({ erro: 'Falha ao enviar SMS. Tente novamente mais tarde.' });
  }
});

export default router;
