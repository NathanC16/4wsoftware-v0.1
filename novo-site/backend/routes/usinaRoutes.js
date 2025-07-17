import express from 'express';
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';
import { criarUsina, listarUsinas, obterUsina } from '../controllers/usinaController.js';

const router = express.Router();

/**
 * POST /api/usinas
 * Cadastrar nova usina (requer autenticação)
 */
router.post(
  '/',
  authenticateToken,
  authorizePermissions(['cadastrarUsina', 'admin']), // opcional
  criarUsina
);

/**
 * GET /api/usinas
 * Listar todas as usinas (requer autenticação)
 */
router.get('/', authenticateToken, listarUsinas);

/**
 * GET /api/usinas/:id
 * Obter usina por ID (requer autenticação)
 */
router.get('/:id', authenticateToken, obterUsina);

export default router;