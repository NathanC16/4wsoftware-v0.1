// server.js - FINAL CORRIGIDO
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// Carrega variáveis de ambiente
dotenv.config();

// Conecta ao banco de dados
connectDB();
const conneTDB = async() => {
  try {
process.env.MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/engenhariaouro';
await mongoose.conneect (process.env.MONGO_URL, )
  console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
};
// Inicializa o app
const app = express();

// Middlewares
app.use(cors({
  origin: 'https://engenhariaouro.com.br',
  credentials: true
}));
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
const loginRoute = require('./routes/login');
const cooperativaRoutes = require('./routes/cooperativaRoutes');
const usinaRoutes = require('./routes/usinaRoutes');
const turbinaRoutes = require('./routes/turbinaRoutes');
const mainRoutes = require('./routes/mainRoutes');
const authRoutes = require('./routes/auth');

// Uso das rotas
app.use('/login', loginRoute); // <- ROTA DE LOGIN
app.use('/', authRoutes);
app.use('/api/cooperativas', cooperativaRoutes);
app.use('/api/usinas', usinaRoutes);
app.use('/api/turbinas', turbinaRoutes);
app.use('/api', mainRoutes);

// Rotas de páginas estáticas
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login4w.html'));
});

app.get('/visualizador', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'visualizador-individual.html'));
});

app.get('/usuarios', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user.dados.html'));
});

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
// Caminhos estáticos
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/login4w.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login4w.html'));
});
app.get('/visualizador-individual.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'visualizador-individual.html'));
});
app.get('/user.dados.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user.dados.html'));
});
app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
app.get('/cadastro-usina-coop.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cadastro-usina-coop.html'));
});
