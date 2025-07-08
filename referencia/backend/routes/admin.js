import express from 'express';
import { verifyAdmin } from '../middlewares/authAdmin.js';


const router = express.Router();

// Rota protegida pra admin acessar painel
router.get('/painel', verifyAdmin, (req, res) => {
  try {
    res.status(200).json({ mensagem: 'Bem-vindo ao painel administrativo!' });
  } catch (error) {
    console.error('Erro no painel admin:', error);
    res.status(500).json({ mensagem: 'Erro interno no servidor.' });
  }
});

export default router;
