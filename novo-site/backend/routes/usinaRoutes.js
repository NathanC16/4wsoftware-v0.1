// routes/usinaRoutes.js
import express from 'express';
import * as usinaController from '../controllers/usinaController.js';
// Importar authorizePermissions junto com authenticateToken
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * POST /api/usinas
 * Rota para criar uma nova usina.
 * Requer autenticação e permissão específica.
 */
// Adicionado authorizePermissions middleware
router.post('/', authenticateToken, authorizePermissions(['podeCriarUsina', 'admin']), usinaController.criarUsina);

/**
 * GET /api/usinas
 * Rota para listar todas as usinas cadastradas.
 * Requer autenticação.
 */
router.get('/', authenticateToken, usinaController.listarUsinas);

/**
 * GET /api/usinas/:id
 * Rota para retornar os dados de uma usina específica por ID.
 * Requer autenticação.
 */
router.get('/:id', authenticateToken, usinaController.obterUsina);

export default router;
