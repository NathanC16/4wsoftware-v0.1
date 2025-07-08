// services/cadastroUsuario.js
import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import { body, validationResult } from 'express-validator';
import Usuario from '../models/Usuario.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/cadastro
 * Rota para cadastrar um novo usuário (cliente).
 * Inclui validação de dados e upload de arquivo (conta de luz).
 */
router.post(
  '/cadastro',
  upload.any(), // Middleware para lidar com upload de arquivos

  // Validação dos campos da requisição usando express-validator
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
      // Verifica se há erros de validação
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

      // Verifica se o email já está cadastrado
      const usuarioExistente = await Usuario.findOne({ email: email.toLowerCase() });
      if (usuarioExistente) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      // Verifica se o arquivo 'contaDeLuz' foi enviado
      const contaDeLuz = req.files.find(file => file.fieldname === 'contaDeLuz');
      if (!contaDeLuz) {
        return res.status(400).json({ error: 'Upload da conta de luz é obrigatório.' });
      }

      // Criptografa a senha antes de salvar no banco de dados
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // Mapeia os arquivos enviados para um formato adequado
      const arquivos = req.files.map(file => ({
        filename: file.originalname,
        mimetype: file.mimetype,
        size: file.size
      }));

      // Cria uma nova instância do modelo Usuario com os dados da requisição
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

      // Salva o novo usuário no banco de dados
      const usuarioSalvo = await novoUsuario.save();

      // Retorna uma resposta de sucesso com os dados do usuário cadastrado
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
      return res.status(500).json({ error: 'Erro interno ao cadastrar usuário. Tente novamente.' });
    }
  }
);

export default router;
