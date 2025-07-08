// routes/login.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
const router = express.Router();

/**
 * POST /api/login
 * Autentica um usuário e retorna um token JWT.
 * Esta rota é usada para o processo de login principal da aplicação.
 */
router.post('/', async (req, res) => {
  const { usuario, senha } = req.body;

  // Validação de campos obrigatórios
  if (!usuario || !senha) {
    return res.status(400).json({ mensagem: 'Usuário e senha são obrigatórios para o login.' });
  }

  try {
    // Busca o usuário no banco de dados, convertendo o nome de usuário para minúsculas e removendo espaços
    const user = await User.findOne({ usuario: usuario.toLowerCase().trim() });

    // Verifica se o usuário foi encontrado
    if (!user) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    }

    // Compara a senha fornecida com a senha hash armazenada no banco de dados
    const senhaValida = await user.compararSenha(senha);

    // Verifica se a senha é válida
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    // Gera o token JWT com as informações do usuário e permissões
    const token = jwt.sign(
      {
        id: user._id,
        usuario: user.usuario,
        permissions: user.permissoes,
      },
      process.env.JWT_SECRET,
      { expiresIn: '4h' } // Define o tempo de expiração do token (ex: 4 horas)
    );

    // Define o destino de redirecionamento com base nas permissões do usuário
    let destino = '/dashboard.html'; // Destino padrão
    if (user.permissoes.includes('financeiro')) destino = '/financeiro.html';
    else if (user.permissoes.includes('admin')) destino = '/admin-panel.html';
    else if (user.permissoes.includes('leitura')) destino = '/visualizador-individual.html';

    // Retorna o token, informações do usuário e o destino de redirecionamento
    res.status(200).json({
      mensagem: 'Login bem-sucedido!',
      token,
      usuario: user.usuario,
      permissoes: user.permissoes,
      destino
    });

  } catch (err) {
    console.error('Erro no processo de login:', err);
    res.status(500).json({ mensagem: 'Erro no servidor ao tentar fazer login.' });
  }
});

export default router;
