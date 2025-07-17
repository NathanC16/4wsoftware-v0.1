const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const Usuario = require('../models/Usuario');

const upload = multer({ storage: multer.memoryStorage() });

// Cadastro via formulário
router.post('/cadastro', upload.any(), async (req, res) => {
  try {
    const {
      nomeCompleto,
      email,
      senha,
      telefone,
      endereco,
      tipoUsuario,
      dataNascimento,
      cpf,
      cnpj
    } = req.body;

    // Verifica se todos os campos obrigatórios estão preenchidos
    if (
      !nomeCompleto ||
      !email ||
      !senha ||
      !telefone ||
      !endereco ||
      !tipoUsuario ||
      !dataNascimento ||
      (!cpf && !cnpj)
    ) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios, incluindo CPF ou CNPJ.' });
    }

    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(senha, salt);

    const arquivos = req.files.map(file => ({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    }));

    const contaDeLuz = req.files.find(file => file.fieldname === 'contaDeLuz');
    if (!contaDeLuz) {
      return res.status(400).json({ error: 'O upload da conta de luz é obrigatório.' });
    }

    const novoUsuario = new Usuario({
      nome: nomeCompleto,
      email,
      senha: senhaCriptografada,
      telefone,
      endereco,
      tipoUsuario,
      dataNascimento,
      cpf: cpf || null,
      cnpj: cnpj || null,
      arquivos
    });

    const usuarioSalvo = await novoUsuario.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: usuarioSalvo });

  } catch (error) {
    console.error('❌ Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário. Tente novamente.' });
  }
});

module.exports = router;
