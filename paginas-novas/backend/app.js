import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https'; // Adicionado para HTTPS
import fs from 'fs';     // Adicionado para ler arquivos

// Rotas
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import dashboardRoutes from './routes/dashboard.js';
import usuariosRoutes from './routes/usuarios.js';
import cooperativaRoutes from './routes/cooperativaRoutes.js';
import turbinaRoutes from './routes/turbinaRoutes.js';
import usinaRoutes from './routes/usinaRoutes.js';
import rotaSimples from './routes/testeSimples.js';
import userRoutes from './routes/user.js';
import clienteRoutes from './routes/clienteRoutes.js';

// Utils
import { criarUsuariosPadrao } from './utils/criarUsuariosPadrao.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

// Config dotenv
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const HTTP_PORT = process.env.PORT || 5000; // Porta HTTP
const HTTPS_PORT = 8443; // Porta HTTPS
const MONGO_URI = process.env.MONGO_URI;

// Evita warnings do Mongoose 7+
mongoose.set('strictQuery', false);

// Middlewares de segurança
// app.use(helmet()); // cabeçalhos HTTP seguros
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 1000, // Aumentado para 1000 requisições durante o desenvolvimento
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Muitas requisições vindas deste IP, tente mais tarde.',
});
app.use(limiter);

// CORS controlado
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Logger HTTP
app.use(morgan('dev'));

// Parsers JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cooperativas', cooperativaRoutes);
app.use('/api/turbinas', turbinaRoutes);
app.use('/api/usinas', usinaRoutes);
app.use('/api/teste', rotaSimples);
app.use('/api/user', userRoutes);
app.use('/api/clientes', clienteRoutes);

// Servir o index.html na rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// Criar admin padrão se não existir
async function createDefaultAdminUser() {
  try {
    // Remover o usuário admin existente, se houver
    await User.deleteOne({ usuario: 'admin' });
    console.log('🗑️ Usuário admin existente removido (para depuração).');

    const newAdmin = new User({
        usuario: 'admin',
        senha: 'admin@4w',
        permissoes: ['admin', 'financeiro', 'vendas', 'rh', 'administrador', 'suporte', 'auditor', 'backoffice', 'estagiario', 'podeAcessarDashboard'],
      });
    await newAdmin.save();
    console.log('✅ Usuário admin padrão criado com sucesso (forçado para depuração).');
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin padrão (depuração):', error);
  }
}

// Middleware catch-all para erros inesperados
app.use((err, req, res, next) => {
  console.error('Erro inesperado:', err);
  res.status(500).json({ mensagem: 'Erro interno no servidor.' });
});

// Inicializa servidor e conecta MongoDB
async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 MongoDB conectado com sucesso!');

    await createDefaultAdminUser();
    await criarUsuariosPadrao();

    // Configuração HTTPS
    const privateKey = fs.readFileSync(path.join(__dirname, 'certs', 'key.pem'), 'utf8');
    const certificate = fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'), 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    // Servidor HTTPS
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(HTTPS_PORT, () => {
      console.log(`🚀 Backend HTTPS rodando na porta ${HTTPS_PORT}`);
      console.log(`🌐 Frontend: acesse https://localhost:${HTTPS_PORT} no navegador.`);
    });

    // Servidor HTTP para redirecionamento
    app.listen(HTTP_PORT, () => {
      console.log(`🚀 Backend HTTP rodando na porta ${HTTP_PORT} (redirecionando para HTTPS)`);
    });

    // Redirecionamento de HTTP para HTTPS
    app.use((req, res, next) => {
      if (req.protocol === 'http') {
        res.redirect(301, `https://${req.headers.host.replace(`:${HTTP_PORT}`, `:${HTTPS_PORT}`)}${req.url}`);
      } else {
        next();
      }
    });

  } catch (err) {
    console.error('❌ Falha ao iniciar servidor ou conectar MongoDB:', err);
    process.exit(1);
  }
}

startServer();