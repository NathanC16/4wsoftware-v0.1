import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import dotenv from 'dotenv';
import Sentry from '@sentry/node';
import logger from './logger.js';
import usuariosRoutes from './routes/usuarios.js';
import sendSmsRoutes from './routes/sendSms.js';
dotenv.config();

const app = express();

// Sentry: monitoramento de erros
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    integrations: [new Sentry.Integrations.Http({ tracing: true })],
    tracesSampleRate: 1.0,
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

// Segurança HTTP Headers com Helmet
app.use(helmet());

// Rate limiting para evitar flood e brute force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // max 100 requisições por IP por janela
  message: 'Muitas requisições vindas deste IP, tente novamente mais tarde.',
});
app.use(limiter);
app.use('/api/usuarios', usuariosRoutes);
// Configuração do CORS com whitelist
const allowedOrigins = ['https://teusite.com', 'https://admin.teusite.com'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // permite ferramentas tipo Postman
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'CORS não autorizado pelo servidor.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Evitar expor X-Powered-By
app.disable('x-powered-by');

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/api/send-sms', sendSmsRoutes);
// Rotas da API
import clienteRoutes from './routes/clienteRoutes.js';
app.use('/api/clientes', clienteRoutes);

import loginRoute from './routes/login.js';
app.use('/login', loginRoute);

// Rotas para páginas estáticas (se necessário)
app.get('/login4w.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'login4w.html'));
});
app.get('/visualizador-individual.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'visualizador-individual.html'));
});
app.get('/user.dados.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'user.dados.html'));
});
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'admistração.html'));
});
app.get('/cadastro-usina-coop.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'cadastro-usina-coop.html'));
});

// Rota raiz serve a página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'login4w.html'));
});

// Tratamento de erros do Sentry
if (process.env.SENTRY_DSN) {
  app.use(Sentry.Handlers.errorHandler());
}

// Middleware padrão de tratamento de erros
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Algo deu errado!');
});

// Start servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
