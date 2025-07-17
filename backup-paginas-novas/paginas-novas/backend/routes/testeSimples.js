// backend/routes/testeSimples.js
import express from 'express';
import autenticacaoSimples from '../middlewares/autenticacaoSimples.js';


const router = express.Router();

router.get('/rota-protegida', autenticacaoSimples, (req, res) => {
  res.json({ mensagem: 'Acesso autorizado com token simples!' });
});

export default router;
