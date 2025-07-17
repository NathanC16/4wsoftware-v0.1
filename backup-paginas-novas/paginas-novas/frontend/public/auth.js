import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../../backend/models/User.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;

  try {
    const user = await User.findOne({ usuario });
    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ mensagem: 'Senha incorreta' });
    }

    const payload = {
      usuario: user.usuario,
      permissions: user.permissoes || []
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token, destino: '/home.html' });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
});

export default router;
