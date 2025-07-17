import express from 'express';
const router = express.Router();
import * as turbinaController from '../controllers/turbinaController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js'; // middlewar de token

/**
 * POST /api/turbinas
 * Criar uma nova turbina (requer autenticação)
 */
router.post('/', authenticateToken, turbinaController.criarTurbina);

/**
 * GET /api/turbinas
 * Listar todas as turbinas (requer autenticação)
 */
router.get('/', authenticateToken, turbinaController.listarTurbinas);

/**
 * GET /api/turbinas/:id
 * Obter turbina por ID (requer autenticação)
 */
router.get('/:id', authenticateToken, turbinaController.obterTurbina);

export default router;
