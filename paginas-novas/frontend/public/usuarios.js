import express from 'express';
import { autenticar, autorizar } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
  '/dados',
  autenticar,
  autorizar(['podeAcessarUsuarios']),
  (req, res) => {
    res.json({ dados: 'Segredo de usuários 👀' });
  }
);

export default router;
