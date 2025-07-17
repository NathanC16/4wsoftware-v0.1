// backend/routes/dashboard.js
import express from 'express';
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';
import { getDashboardData } from '../controllers/dashboardController.js';

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

router.get('/data', authenticateToken, authorizePermissions(['podeAcessarDashboard']), getDashboardData);

export default router;
