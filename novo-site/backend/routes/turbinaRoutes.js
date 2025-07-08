// routes/turbinaRoutes.js
import express from 'express';
import * as turbinaController from '../controllers/turbinaController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js'; // Importa o middleware de autenticação

const router = express.Router();

/**
 * POST /api/turbinas
 * Rota para criar uma nova turbina.
 * Requer autenticação.
 */
router.post('/', authenticateToken, turbinaController.criarTurbina);

/**
 * GET /api/turbinas
 * Rota para listar todas as turbinas.
 * Requer autenticação.
 */
router.get('/', authenticateToken, turbinaController.listarTurbinas);

/**
 * GET /api/turbinas/:id
 * Rota para obter uma turbina específica por ID.
 * Requer autenticação.
 */
router.get('/:id', authenticateToken, turbinaController.obterTurbina);

export default router;
