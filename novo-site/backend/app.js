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
      scriptSrc: [
        "'self'",
        "'unsafe-eval'", // Necessário para Chart.js se não for refatorado para evitar eval.
        "https://localhost:8080",
        "https://127.0.0.1:8080",
        "https://cdn.jsdelivr.net", // Para Bootstrap e Chart.js
        "https://cdn.datatables.net", // Se estiver usando DataTables de CDN
        "https://cdnjs.cloudflare.com", // Outro CDN comum
        "https://code.jquery.com", // Se estiver usando jQuery de CDN
        "'sha256-/JQ63pWYde98RInTtdPS/CuLs8FJ3+tJHEA3/FKUc+U='", // Hash para script inline em index.html (se houver)
        // Hashes para scripts inline em home.html (mantidos)
        "'sha256-Ikq0WQqbkcIVDAlUqYb/LPNieogAAf9WCReiPkZrt00='", // script cards em home.html
        "'sha256-2hxGndJiWVIMkmvBSka4n+eGJeaDd0EZvxtzJvgRcjA='", // script data-permission em home.html
        "'sha256-tFKfbN3ifeBSIviqxe2+HHbBhUOWRlOLPHL44QZdzHI='", // script DOMContentLoaded user-info em home.html
        "'sha256-q/qn3w3Qs/CNAZZ5fzowHaEhlWteyigYml/z2rYJJXc='", // script controles nav em home.html
        // "'sha256-BMDcFQYigfMZ1XBbjdo6vgOxomS/mJTSQUzT0mkhAs4='",  // Removido - Duplicata/Antigo para script da linha 79 home.html

        // Hashes para scripts inline em administracao.html
        // O hash antigo/incorreto para o toggle da sidebar foi removido.
        // "'sha256-FIIxVPEdESv9M2M92PzG649S1Jt6n2y7d8Hk+9EUDjY='",
        // Adicionados os hashes corretos para os scripts inline em administracao.html, conforme sugerido pelos logs:
        "'sha256-mIQoxVBWO+0+oQcXAzj3HWb/l3/BbLRYs3mcpmLqlj8='", // Para o script de módulo em administracao.html
        "'sha256-p3oZ2jVCGOGFztlnSMO9wDOEOAtU6Dt3bmpYUw6SIgk='", // Para o script DOMContentLoaded do sidebar-toggle em administracao.html
        "'sha256-NsWuaw4Kdsk1NWeSU8OuhW6lGUxr2VBgMOMoQFOiykw='", // Para o script de módulo em userdados.html

        // Hashes para scripts inline em home.html (mantidos)
        "'sha256-mmrIG8b8rg2RPIi9t8jV4lmPxmaLz8tH4OADQnidrMQ='",   // script de cards em home.html (linha 95)
        "'sha256-9ZJDv7tjnvA85pGJvzn+1k1jDpaGnVpoWvaJrAvFgF8='"    // script que define navigateTo, logout, getUserPermissions em home.html (linha 79)
      ],
      scriptSrcAttr: [
        "'self'",
        "'unsafe-inline'" // Permite todos os manipuladores de evento inline (ex: onclick).
                         // Hashes específicos para atributos foram removidos para evitar conflitos com 'unsafe-inline'.
      ],
      styleSrc: ["'self'", "'unsafe-inline'", "https://localhost:8080", "https://127.0.0.1:8080", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "https://fonts.gstatic.com", "https://cdn.datatables.net", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https://localhost:8080", "https://127.0.0.1:8080", "https://source.unsplash.com"], // permite imagens da mesma origem, data URIs e de unsplash
      connectSrc: ["'self'", "https://localhost:8080", "https://127.0.0.1:8080", "https://servicodados.ibge.gov.br"], // permite conexões para si mesmo e IBGE
      fontSrc: ["'self'", "https://cdn.jsdelivr.net", "data:", "https://fonts.gstatic.com"], // permite fontes da mesma origem, cdnjs e fonts.gstatic.com
    },
  },
}));

// Limite de taxa para prevenir ataques de força bruta (Rate Limiting)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Janela de 15 minutos
  max: 100, // Limita cada IP a 100 requisições por janela de 15 minutos
  standardHeaders: true, // Envia informações de limite de taxa nos cabeçalhos padrão `RateLimit-*`
  legacyHeaders: false, // Desabilita os cabeçalhos antigos `X-RateLimit-*`
  message: 'Muitas requisições originadas deste IP, por favor, tente novamente após 15 minutos.', // Mensagem de erro customizada
});
app.use(limiter);

// Configuração do CORS (Cross-Origin Resource Sharing)
app.use(cors({
  origin: ['https://localhost:8080', 'https://127.0.0.1:8080'], // Permite requisições apenas do próprio servidor/domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos nas requisições
}));

// Logger HTTP (Morgan) para registrar requisições no console em formato 'dev'
app.use(morgan('dev'));

// Middlewares para parsear (analisar) o corpo das requisições
app.use(express.json()); // Para parsear requisições com corpo em JSON
app.use(express.urlencoded({ extended: true })); // Para parsear requisições com corpo em URL-encoded

// Middleware para servir arquivos estáticos da pasta 'frontend'
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Importação das rotas da API
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import dashboardRoutes from './routes/dashboard.js';
import usuariosRoutes from './routes/usuarios.js';
import cooperativaRoutes from './routes/cooperativaRoutes.js';
import turbinaRoutes from './routes/turbinaRoutes.js';
import usinaRoutes from './routes/usinaRoutes.js';
// import rotaSimples from './routes/testeSimples.js'; // Rota de teste simples, removida pois o arquivo foi deletado

// Importação de utilitários e modelos do banco de dados
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
// app.use('/api/teste', rotaSimples); // Removido pois o arquivo foi deletado

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
