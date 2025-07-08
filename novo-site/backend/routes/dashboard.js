// routes/dashboard.js
import express from 'express';
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * GET /api/dashboard/dashboard
 * Rota protegida para acessar o dashboard.
 * Requer autenticação e a permissão 'podeAcessarDashboard'.
 */
router.get('/dashboard', authenticateToken, authorizePermissions(['podeAcessarDashboard']), async (req, res) => {
  try {
    res.status(200).json({ mensagem: 'Acesso liberado ao dashboard.' });
  } catch (error) {
    console.error('Erro ao acessar o dashboard:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor ao acessar o dashboard.' });
  }
});

export default router;
