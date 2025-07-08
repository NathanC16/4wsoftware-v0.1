// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Autentica um usuário e gera um token JWT para acesso.
 */
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  console.log('Tentativa de login para o usuário:', usuario);

  // Validação de campos obrigatórios
  if (!usuario || !senha) {
    console.log('Erro: Usuário ou senha não fornecidos.');
    return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios.' });
  }

  try {
    // Busca o usuário no banco de dados
    const user = await User.findOne({ usuario });
    if (!user) {
      console.log('Erro: Usuário não encontrado no banco de dados.');
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    console.log('Usuário encontrado:', user.usuario);
    // Compara a senha fornecida com a senha hash armazenada
    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) {
      console.log('Erro: Senha incorreta.');
      return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    console.log('Senha correta. Gerando token...');
    // Cria o payload para o token JWT
    const payload = {
      id: user._id,
      usuario: user.usuario,
      permissions: user.permissoes || []
    };

    // Gera o token JWT com o payload e o segredo
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });

    console.log('Token gerado com sucesso. Login bem-sucedido.');
    res.status(200).json({
      token,
      destino: '/pages/home.html', // Redirecionamento padrão após o login
      usuario: user.usuario
    });
  } catch (error) {
    console.error('Erro no processo de login:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor durante o login.' });
  }
});

export default router;
