// routes/ajuda.js
import express from 'express';
import axios from 'axios';
import Ajuda from '../models/Ajuda.js';
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Importa o middleware de autenticação

const router = express.Router();

// Expressão regular para validação de email
const emailRegex = /^[^
@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/ajuda
 * Envia uma mensagem para o suporte. Requer autenticação.
 * Os dados da mensagem (nome, email, mensagem) são salvos no banco de dados.
 * Opcionalmente, envia uma notificação para o Slack se o webhook estiver configurado.
 */
router.post('/', authenticateToken, async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Validação de campos obrigatórios
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios para enviar uma mensagem de ajuda.' });
  }

  // Validação de formato de email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ mensagem: 'Email inválido.' });
  }

  try {
    // Cria e salva a nova mensagem de ajuda no banco de dados
    const novaAjuda = new Ajuda({ nome, email, mensagem });
    await novaAjuda.save();

    // Enviar notificação para o Slack (se a variável de ambiente SLACK_WEBHOOK estiver configurada)
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

    res.status(201).json({ mensagem: 'Mensagem registrada e enviada ao suporte com sucesso!' });
  } catch (error) {
    console.error('Erro na rota POST /api/ajuda:', error);
    res.status(500).json({ mensagem: 'Erro interno ao registrar mensagem de ajuda.' });
  }
});

/**
 * GET /api/ajuda
 * Lista todas as mensagens de ajuda enviadas ao suporte.
 * Requer autenticação.
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Busca todas as mensagens de ajuda e as ordena por data decrescente
    const mensagens = await Ajuda.find().sort({ data: -1 });
    res.status(200).json(mensagens);
  } catch (error) {
    console.error('Erro na rota GET /api/ajuda:', error);
    res.status(500).json({ mensagem: 'Erro interno ao listar mensagens de ajuda.' });
  }
});

export default router;
