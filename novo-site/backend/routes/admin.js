// routes/admin.js
import express from 'express';
import { verifyAdmin } from '../middlewares/authAdmin.js';

const router = express.Router();

/**
 * GET /admin/painel
 * Rota protegida para acesso ao painel administrativo.
 * Requer que o usuário seja um administrador (verificado pelo middleware `verifyAdmin`).
 */
router.get('/painel', verifyAdmin, (req, res) => {
  try {
    res.status(200).json({ mensagem: 'Bem-vindo ao painel administrativo!' });
  } catch (error) {
    console.error('Erro ao acessar o painel administrativo:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor ao acessar o painel administrativo.' });
  }
});

export default router;
