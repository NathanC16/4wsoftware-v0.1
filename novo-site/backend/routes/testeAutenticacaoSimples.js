import express from 'express';
const router = express.Router();

import autenticacaoSimples from '../middlewares/autenticacaoSimples.js'; // caminho relativo geralmente precisa subir pastas

router.get('/rota-protegida', simpleAuthMiddleware, (req, res) => {
  res.status(200).json({ mensagem: 'Acesso autorizado com token simples!' });
});

export default router;
