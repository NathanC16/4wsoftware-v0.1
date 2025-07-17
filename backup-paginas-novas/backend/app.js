import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Rotas
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import dashboardRoutes from './routes/dashboard.js';
import usuariosRoutes from './routes/usuarios.js';
import cooperativaRoutes from './routes/cooperativaRoutes.js';
import turbinaRoutes from './routes/turbinaRoutes.js';
import usinaRoutes from './routes/usinaRoutes.js';
import rotaSimples from './routes/testeSimples.js';

// Utils
import { criarUsuariosPadrao } from './utils/criarUsuariosPadrao.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

// Config dotenv
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Evita warnings do Mongoose 7+
mongoose.set('strictQuery', false);

// Middlewares de segurança
app.use(helmet()); // cabeçalhos HTTP seguros
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
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

// Servir arquivos estáticos (ex: frontend)
app.use(express.static(path.join(__dirname, '..')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);  // Dei uma padronizada aqui, se quiser volta pra /admin só
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cooperativas', cooperativaRoutes);
app.use('/api/turbinas', turbinaRoutes);
app.use('/api/usinas', usinaRoutes);
app.use('/api/teste', rotaSimples);

// Health check simples
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Backend 4W Energia rodando smooth 🚀' });
});

// Criar admin padrão se não existir
async function createDefaultAdminUser() {
  try {
    const adminUser = await User.findOne({ usuario: 'admin' });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin@4w', 12);
      const newAdmin = new User({
        usuario: 'admin',
        senha: hashedPassword,
        permissoes: ['admin', 'financeiro', 'vendas', 'rh'],
      });
      await newAdmin.save();
      console.log('✅ Usuário admin padrão criado com sucesso.');
    } else {
      console.log('⚠️ Usuário admin padrão já existe.');
    }
  } catch (error) {
    console.error('❌ Erro ao criar usuário admin padrão:', error);
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

    app.listen(PORT, () => {
      console.log(`🚀 Backend rodando em: http://localhost:${PORT}`);
      console.log(`🌐 Frontend: abra login4w.html no navegador ou use live-server.`);
    });
  } catch (err) {
    console.error('❌ Falha ao iniciar servidor ou conectar MongoDB:', err);
    process.exit(1);
  }
}

startServer();
