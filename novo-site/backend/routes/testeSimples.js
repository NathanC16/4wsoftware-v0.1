// routes/testeSimples.js
import express from 'express';
import simpleAuthMiddleware from '../middlewares/simpleAuthMiddleware.js';

const router = express.Router();

/**
 * GET /api/teste/rota-protegida
 * Rota de teste protegida por um middleware de autenticação simples.
 * Demonstra o uso de um middleware básico para proteger um endpoint.
 */
router.get('/rota-protegida', simpleAuthMiddleware, (req, res) => {
  res.json({ mensagem: 'Acesso autorizado com token simples!' });
});

export default router;
