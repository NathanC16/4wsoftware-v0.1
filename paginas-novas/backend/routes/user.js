// paginas-novas/backend/routes/user.js
import express from 'express';
import multer from 'multer';
import User from '../models/User.js';
import path from 'path';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Configuração do Multer para armazenamento de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/assets/img/profile-pics/');
  },
  filename: function (req, file, cb) {
    cb(null, req.params.userId + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rota para upload de foto de perfil
router.post('/upload-profile-pic/:userId', authenticateToken, upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('Usuário não encontrado.');
    }

    user.profilePic = `/assets/img/profile-pics/${req.file.filename}`;
    await user.save();

    res.status(200).json({ 
      message: 'Foto de perfil atualizada com sucesso!', 
      filePath: user.profilePic 
    });
  } catch (error) {
    console.error('Erro ao fazer upload da foto de perfil:', error);
    res.status(500).send('Erro interno do servidor.');
  }
});

export default router;
