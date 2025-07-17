import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/cadastro',
  upload.any(),

  // Validação com express-validator
  [
    body('nomeCompleto').notEmpty().withMessage('Nome completo é obrigatório'),
    body('email').isEmail().withMessage('Email inválido').normalizeEmail(),
    body('senha')
      .isLength({ min: 6 })
      .withMessage('Senha deve ter no mínimo 6 caracteres'),
    body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
    body('endereco').notEmpty().withMessage('Endereço é obrigatório'),
    body('tipoUsuario').notEmpty().withMessage('Tipo de usuário é obrigatório'),
    body('dataNascimento').notEmpty().withMessage('Data de nascimento é obrigatória'),
    body('cpf')
      .matches(/^\d{11}$/)
      .withMessage('CPF deve ter 11 dígitos numéricos'),
    body('cnpj')
      .matches(/^\d{14}$/)
      .withMessage('CNPJ deve ter 14 dígitos numéricos'),
  ],

  async (req, res) => {
    try {
      // Checa erros de validação
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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

      // Verifica se email já existe
      const usuarioExistente = await Usuario.findOne({ email: email.toLowerCase() });
      if (usuarioExistente) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      // Verifica arquivo contaDeLuz
      const contaDeLuz = req.files.find(file => file.fieldname === 'contaDeLuz');
      if (!contaDeLuz) {
        return res.status(400).json({ error: 'Upload da conta de luz é obrigatório.' });
      }

      const senhaCriptografada = await bcrypt.hash(senha, 10);

      const arquivos = req.files.map(file => ({
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      }));

      const novoUsuario = new Usuario({
        nome: nomeCompleto,
        email: email.toLowerCase(),
        senha: senhaCriptografada,
        telefone,
        endereco,
        tipoUsuario,
        dataNascimento,
        cpf,
        cnpj,
        arquivos
      });

      const usuarioSalvo = await novoUsuario.save();

      return res.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        usuario: {
          id: usuarioSalvo._id,
          nome: usuarioSalvo.nome,
          email: usuarioSalvo.email
        }
      });
    } catch (error) {
      console.error('❌ Erro ao cadastrar usuário:', error);
      return res.status(500).json({ error: 'Erro ao cadastrar usuário. Tente novamente.' });
    }
  }
);

export default router;
