// backend/routes/login.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

/**
 * POST /login
 * Autentica usuário e retorna token JWT
 */
router.post('/', async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
  }

  try {
    const user = await User.findOne({ usuario: usuario.toLowerCase().trim() });

    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaValida = await user.compararSenha(senha);

    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: user._id,
        usuario: user.usuario,
        permissions: user.permissoes,
      },
      process.env.JWT_SECRET,
      { expiresIn: '4h' } // ajuste conforme necessário
    );

    // Redirecionamento por permissão (opcional)
    let destino = '/dashboard.html'; // padrão
    if (user.permissoes.includes('financeiro')) destino = '/financeiro.html';
    else if (user.permissoes.includes('admin')) destino = '/admin-panel.html';
    else if (user.permissoes.includes('leitura')) destino = '/visualizador-individual.html';

    res.status(200).json({
      mensagem: 'Login bem-sucedido!',
      token,
      usuario: user.usuario,
      permissoes: user.permissoes,
      destino
    });

  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ mensagem: 'Erro no servidor ao tentar fazer login.' });
  }
});

export default router;
