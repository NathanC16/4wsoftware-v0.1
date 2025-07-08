const express = require('express');
const router = express.Router();
const usinaController = require('../controllers/usinaController');
const { authenticateToken } = require('../middlewares/authMiddleware');

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

module.exports = router;
