const express = require('express');
const router = express.Router();
const turbinaController = require('../controllers/turbinaController');
const { authenticateToken } = require('../middlewares/authMiddleware'); // middlewar de token

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

module.exports = router;
