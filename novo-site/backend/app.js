import { fileURLToPath } from 'url';
import express from 'express';
import https from 'https';
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura o dotenv para carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Porta para o servidor unificado
const MONGO_URI = process.env.MONGO_URI;

// Evita warnings do Mongoose 7+
mongoose.set('strictQuery', false);

// Middlewares de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", "https://localhost:8080", "https://127.0.0.1:8080"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://localhost:8080", "https://127.0.0.1:8080", "https://cdn.jsdelivr.net", "https://cdn.datatables.net", "https://cdnjs.cloudflare.com", "https://code.jquery.com", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://localhost:8080", "https://127.0.0.1:8080", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://cdn.datatables.net", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https://localhost:8080", "https://127.0.0.1:8080"],
      connectSrc: ["'self'", "https://localhost:8080", "https://127.0.0.1:8080", "https://servicodados.ibge.gov.br"],
      fontSrc: ["'self'", "https://cdn.jsdelivr.net", "data:", "https://fonts.gstatic.com"],
    },
  },
}));

// Limite de taxa para prevenir ataques de força bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP a cada 15 minutos
  standardHeaders: true, // Retorna informações de limite de taxa nos cabeçalhos Standard
  legacyHeaders: false, // Desabilita os cabeçalhos X-RateLimit-*
  message: 'Muitas requisições vindas deste IP, tente novamente após 15 minutos.', // Mensagem de erro
});
app.use(limiter);

// CORS controlado para permitir requisições de origens específicas
app.use(cors({
  origin: ['https://localhost:8080', 'https://127.0.0.1:8080'], // Origens permitidas (agora apenas o próprio servidor)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}));

// Logger HTTP para registrar requisições no console
app.use(morgan('dev'));

// Parsers para requisições JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Importação das rotas da API
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import dashboardRoutes from './routes/dashboard.js';
import usuariosRoutes from './routes/usuarios.js';
import cooperativaRoutes from './routes/cooperativaRoutes.js';
import turbinaRoutes from './routes/turbinaRoutes.js';
import usinaRoutes from './routes/usinaRoutes.js';
import rotaSimples from './routes/testeSimples.js';

// Importação de utilitários e modelos
import { criarUsuariosPadrao } from './utils/criarUsuariosPadrao.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

// Definição das rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cooperativas', cooperativaRoutes);
app.use('/api/turbinas', turbinaRoutes);
app.use('/api/usinas', usinaRoutes);
app.use('/api/teste', rotaSimples);

// Rota para a página inicial do frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'pages', 'index.html'));
});

// Middleware de tratamento de erros inesperados
app.use((err, req, res, next) => {
  console.error('Erro inesperado:', err);
  res.status(500).json({ mensagem: 'Erro interno no servidor.' });
});

// Função para iniciar o servidor e conectar ao MongoDB
async function startServer() {
  try {
    // Conecta ao MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📦 MongoDB conectado com sucesso!');
    console.log(`Conectado ao banco de dados: ${mongoose.connection.name}`);

    // Cria usuários padrão se não existirem
    await criarUsuariosPadrao();

    // --- INÍCIO DO TRECHO TEMPORÁRIO PARA ATUALIZAR PERMISSÕES DO ADMIN ---
    try {
      const adminUser = await User.findOne({ usuario: 'admin' });
      if (adminUser && !adminUser.permissoes.includes('podeAcessarUsuarios')) {
        adminUser.permissoes.push('podeAcessarUsuarios');
        await adminUser.save();
        console.log('✅ Permissão "podeAcessarUsuarios" adicionada ao usuário admin.');
      }
    } catch (updateError) {
      console.error('❌ Erro ao tentar atualizar permissões do admin:', updateError);
    }
    // --- FIM DO TRECHO TEMPORÁRIO ---

    // Carrega os certificados SSL para HTTPS
    const privateKey = fs.readFileSync('./certs/key.pem', 'utf8');
    const certificate = fs.readFileSync('./certs/cert.pem', 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    // Cria o servidor HTTPS
    const httpsServer = https.createServer(credentials, app);

    // Inicia o servidor HTTPS
    httpsServer.listen(PORT, () => {
      console.log(`
🚀 Servidor unificado (Backend & Frontend) rodando em: https://localhost:${PORT}
🌐 Acesse: https://localhost:${PORT}/pages/login4w.html ou https://localhost:${PORT}/index.html

--- Credenciais de Acesso Padrão ---
Usuário Admin: admin | Senha: admin123
Usuário Financeiro: financeiro | Senha: fin@2025
Usuário Vendedor: vendedor | Senha: vend@4w
Usuário Suporte: suporte | Senha: suporte@4w
Usuário RH: rh | Senha: rh@2025
Usuário Auditor: auditor | Senha: auditor@4w
Usuário Backoffice: backoffice | Senha: back@4w
Usuário Estagiário: estagiario | Senha: estag@4w
-----------------------------------
`);
    });
  } catch (err) {
    console.error('❌ Falha ao iniciar servidor ou conectar MongoDB:', err);
    process.exit(1); // Sai do processo com erro
  }
}

// Chama a função para iniciar o servidor
startServer();
