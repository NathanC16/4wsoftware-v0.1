import express from 'express';
import { criarCooperativa, listarCooperativas } from '../controllers/cooperativaController.js';
import { authenticateToken, authorizePermissions } from '../middlewares/authMiddleware.js';
 

const router = express.Router();

router.post(
  '/',
  authenticateToken,
  authorizePermissions(['podeCriarCooperativa']),
  criarCooperativa
);

router.get(
  '/',
  authenticateToken,
  authorizePermissions(['podeVisualizarCooperativa']),
  listarCooperativas
);

export default router;
