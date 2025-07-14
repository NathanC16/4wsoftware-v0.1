// backend/routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /auth/login
 * Autentica usuário e gera token JWT
 */
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const user = await User.findOne({ usuario });

    // Segurança: não revelar se o problema foi no usuário ou na senha
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    const payload = {
      id: user._id,
      usuario: user.usuario,
      permissions: user.permissoes || []
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(200).json({
      token,
      destino: '/home.html',
      usuario: user.usuario
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
});

export default router;
