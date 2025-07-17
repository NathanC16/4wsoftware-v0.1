const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const permissoes = require('./PermissaoRoute');

router.post('/', async (req, res) => {
  const { idUsuario, senha } = req.body;

  if (!idUsuario || !senha) {
    return res.status(400).json({ mensagem: 'usuário e senha são obrigatórios.' });
  }

  try {
    console.log('🔍 Dados recebidos:', req.body);

    const usuario = await Usuario.findOne({ id: idUsuario });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha inválida.' });
    }

    const token = jwt.sign(
      { id: usuario._id, idUsuario: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    const perfil = permissoes.find(u => u.id === idUsuario);
    if (!perfil) {
      return res.status(403).json({ mensagem: 'Usuário sem perfil definido.' });
    }

    const destino = perfil.permissoes.includes('dashboard') ? '/dashboard.html' : '/home.html';

    res.json({ token, destino });

  } catch (error) {
    console.error('❌ Erro no login:', error);
    res.status(500).json({ mensagem: 'Erro no servidor.' });
  }
});

module.exports = router;
