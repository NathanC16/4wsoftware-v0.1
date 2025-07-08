// backend/routes/ajuda.js
import express from 'express';
import axios from 'axios';
import Ajuda from '../models/Ajuda.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/ajuda
 * Envia mensagem para o suporte (requer autenticação)
 */
router.post('/', authMiddleware, async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ mensagem: 'Email inválido.' });
  }

  try {
    const novaAjuda = new Ajuda({ nome, email, mensagem });
    await novaAjuda.save();

    // Enviar para Slack (se configurado)
    if (process.env.SLACK_WEBHOOK) {
      try {
        await axios.post(
          process.env.SLACK_WEBHOOK,
          {
            text: `📩 *Nova mensagem de suporte enviada pelo sistema:*\n👤 *${nome}*\n📧 ${email}\n📝 ${mensagem}`
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } catch (error) {
        console.warn('Erro ao enviar mensagem ao Slack:', error.message);
      }
    }

    res.status(201).json({ mensagem: 'Mensagem registrada e enviada ao suporte!' });
  } catch (error) {
    console.error('Erro na rota POST /ajuda:', error);
    res.status(500).json({ mensagem: 'Erro interno ao registrar mensagem.' });
  }
});

/**
 * GET /api/ajuda
 * Lista todas as mensagens enviadas ao suporte
 */
router.get('/', async (req, res) => {
  try {
    const mensagens = await Ajuda.find().sort({ data: -1 });
    res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro na rota GET /ajuda:', error);
    res.status(500).json({ mensagem: 'Erro ao listar mensagens.' });
  }
});

export default router;
