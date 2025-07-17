import express from 'express';
const router = express.Router();
import * as usinaController from '../controllers/usinaController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

/**
 * POST /api/usinas
 * Cria uma nova usina (requer autenticação)
 */
router.post('/', authenticateToken, usinaController.criarUsina);

/**
 * GET /api/usinas
 * Lista todas as usinas cadastradas (requer autenticação)
 */
router.get('/', authenticateToken, usinaController.listarUsinas);

/**
 * GET /api/usinas/:id
 * Retorna os dados de uma usina específica (requer autenticação)
 */
router.get('/:id', authenticateToken, usinaController.obterUsina);

export default router;
