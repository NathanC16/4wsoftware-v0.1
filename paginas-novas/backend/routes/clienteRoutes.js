// paginas-novas/backend/routes/clienteRoutes.js
import express from 'express';
import { obterClientePorId, atualizarCliente } from '../controllers/clienteController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/:id', authenticateToken, obterClientePorId);
router.put('/:id', authenticateToken, atualizarCliente);

export default router;
