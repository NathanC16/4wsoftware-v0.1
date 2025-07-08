// backend/routes/dashboard.js
import express from 'express';
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rota protegida, exige permissão 'podeAcessarDashboard'
router.get('/dashboard', authenticateToken, authorizePermissions(['podeAcessarDashboard']), async (req, res) => {
  try {
    res.status(200).json({ mensagem: 'Acesso liberado ao dashboard.' });
  } catch (error) {
    console.error('Erro no dashboard:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

export default router;
