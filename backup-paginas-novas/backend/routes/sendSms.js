import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
// Aqui você usaria o SDK do seu provedor SMS, tipo Twilio, Nexmo etc.
import smsProvider from '../services/smsProvider.js'; 

const router = express.Router();

router.post('/', authenticateToken, async (req, res) => {
  const { telefone, mensagem } = req.body;

  if (!telefone || !mensagem) {
    return res.status(400).json({ erro: 'Telefone e mensagem são obrigatórios.' });
  }

  try {
    // Exemplo: chamar o serviço real que envia SMS
    await smsProvider.sendSms({ telefone, mensagem });

    res.status(200).json({ mensagem: 'SMS enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar SMS:', error);
    res.status(500).json({ erro: 'Falha ao enviar SMS. Tente novamente.' });
  }
});

export default router;
