// routes/cooperativaRoutes.js
import express from 'express';
import { criarCooperativa, listarCooperativas } from '../controllers/cooperativaController.js';
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * POST /api/cooperativas
 * Rota para criar uma nova cooperativa.
 * Requer autenticação e a permissão 'podeCriarCooperativa'.
 */
router.post(
  '/',
  authenticateToken, // Middleware de autenticação
  authorizePermissions(['podeCriarCooperativa']), // Middleware de autorização
  criarCooperativa // Função controladora para criar a cooperativa
);

/**
 * GET /api/cooperativas
 * Rota para listar todas as cooperativas.
 * Requer autenticação e a permissão 'podeVisualizarCooperativa'.
 */
router.get(
  '/',
  authenticateToken, // Middleware de autenticação
  authorizePermissions(['podeVisualizarCooperativa']), // Middleware de autorização
  listarCooperativas // Função controladora para listar as cooperativas
);

export default router;
