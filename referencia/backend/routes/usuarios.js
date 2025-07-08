// backend/routes/usuarios.js
import express from 'express';
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.get(
  '/',
  authenticateToken,
  authorizePermissions(['podeAcessarUsuarios']),
  async (req, res) => {
    try {
      const usuarios = await User.find({}, '-senha').lean(); // lean() pra melhor performance
      if (!usuarios || usuarios.length === 0) {
        return res.status(404).json({ mensagem: 'Nenhum usuário encontrado.' });
      }
      res.status(200).json(usuarios);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).json({ mensagem: 'Erro ao buscar usuários.' });
    }
  }
);

export default router;
