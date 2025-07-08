// routes/usuarios.js
import express from 'express';
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';
import Usuario from '../models/Usuario.js';

const router = express.Router();

/**
 * GET /api/usuarios
 * Rota para listar todos os usuários (clientes).
 * Requer autenticação e a permissão 'podeAcessarUsuarios'.
 */
router.get(
  '/',
  authenticateToken, // Middleware de autenticação
  authorizePermissions(['podeAcessarUsuarios']), // Middleware de autorização
  async (req, res) => {
    console.log('Requisição GET para /api/usuarios recebida.');
    try {
      // Busca todos os usuários (clientes), excluindo o campo de senha e convertendo para objeto JavaScript puro
      const usuarios = await Usuario.find({}, '-senha').lean();
      if (!usuarios || usuarios.length === 0) {
        console.log('Nenhum usuário (cliente) encontrado no banco de dados.');
        return res.status(404).json({ mensagem: 'Nenhum usuário (cliente) encontrado.' });
      }
      console.log(`Retornando ${usuarios.length} usuários (clientes).`);
      res.status(200).json(usuarios);
    } catch (err) {
      console.error('Erro ao buscar usuários (clientes):', err);
      res.status(500).json({ mensagem: 'Erro interno no servidor ao buscar usuários (clientes).' });
    }
  }
);

/**
 * POST /api/usuarios
 * Rota para criar um novo usuário.
 * Requer autenticação e a permissão 'editar_cliente'.
 */
router.post(
  '/',
  authenticateToken, // Middleware de autenticação
  authorizePermissions(['editar_cliente']), // Middleware de autorização
  async (req, res) => {
    try {
      const { usuario, senha, permissoes } = req.body;
      // Cria uma nova instância de usuário e salva no banco de dados
      const novoUsuario = new User({ usuario, senha, permissoes });
      await novoUsuario.save();
      res.status(201).json({ mensagem: 'Usuário criado com sucesso!', usuario: novoUsuario });
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      res.status(500).json({ mensagem: 'Erro interno no servidor ao criar usuário.' });
    }
  }
);

/**
 * PUT /api/usuarios/:id
 * Rota para atualizar um usuário existente por ID.
 * Requer autenticação e a permissão 'editar_cliente'.
 */
router.put(
  '/:id',
  authenticateToken, // Middleware de autenticação
  authorizePermissions(['editar_cliente']), // Middleware de autorização
  async (req, res) => {
    try {
      const { id } = req.params;
      const { usuario, senha, permissoes } = req.body;
      const usuarioAtualizado = await User.findById(id);

      if (!usuarioAtualizado) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      }

      // Atualiza os campos do usuário se fornecidos
      if (usuario) usuarioAtualizado.usuario = usuario;
      if (permissoes) usuarioAtualizado.permissoes = permissoes;
      if (senha) {
        // Se a senha for fornecida, ela será hashada automaticamente pelo middleware pre-save do modelo User
        usuarioAtualizado.senha = senha;
      }

      await usuarioAtualizado.save();
      res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!', usuario: usuarioAtualizado });
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).json({ mensagem: 'Erro interno no servidor ao atualizar usuário.' });
    }
  }
);

/**
 * DELETE /api/usuarios/:id
 * Rota para deletar um usuário por ID.
 * Requer autenticação e a permissão 'editar_cliente'.
 */
router.delete(
  '/:id',
  authenticateToken, // Middleware de autenticação
  authorizePermissions(['editar_cliente']), // Middleware de autorização
  async (req, res) => {
    try {
      const { id } = req.params;
      const usuarioDeletado = await User.findByIdAndDelete(id);

      if (!usuarioDeletado) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      }

      res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      res.status(500).json({ mensagem: 'Erro interno no servidor ao deletar usuário.' });
    }
  }
);

export default router;

