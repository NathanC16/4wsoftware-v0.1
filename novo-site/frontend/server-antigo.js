// frontend/server.js
import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'url';

// Obtém o caminho do arquivo atual e o diretório base
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Define a porta do servidor do frontend, usando a variável de ambiente PORT ou 8080 como padrão
const PORT = process.env.PORT || 8080; 

// Configura um proxy para redirecionar requisições para a API do backend
app.use('/api', createProxyMiddleware({
  target: 'https://localhost:5000', // URL do seu backend (onde o backend está rodando)
  changeOrigin: true, // Altera o cabeçalho 'Origin' da requisição para o destino
  secure: false, // Desabilita a verificação de certificado SSL/TLS (útil para desenvolvimento com certificados autoassinados)
}));

// Serve arquivos estáticos do diretório raiz do frontend
// Isso permite que o navegador acesse arquivos como HTML, CSS, JavaScript, imagens, etc.
app.use(express.static(__dirname));

// Inicia o servidor do frontend
app.listen(PORT, () => {
  console.log(`🚀 Frontend rodando em: http://localhost:${PORT}`);
  console.log(`🌐 Acesse: http://localhost:${PORT}/login4w.html`);
});
