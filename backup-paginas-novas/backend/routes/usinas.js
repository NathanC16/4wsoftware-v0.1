// backend/routes/usinaRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizePermissions } = require('../middlewares/authMiddleware');
const usinaController = require('../controllers/usinaController'); // Assumindo que já existe

/**
 * POST /api/usinas
 * Cadastrar nova usina (requer autenticação)
 */
router.post(
  '/',
  authenticateToken,
  authorizePermissions(['cadastrarUsina', 'admin']), // opcional
  usinaController.criarUsina
);

/**
 * GET /api/usinas
 * Listar todas as usinas (requer autenticação)
 */
router.get('/', authenticateToken, usinaController.listarUsinas);

/**
 * GET /api/usinas/:id
 * Obter usina por ID (requer autenticação)
 */
router.get('/:id', authenticateToken, usinaController.obterUsina);

module.exports = router;
