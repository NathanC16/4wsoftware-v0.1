// controllers/turbinaController.js

import mongoose from 'mongoose';
import Turbina from '../models/Turbina.js';

// Criar uma nova turbina
export const criarTurbina = async (req, res) => {
  try {
    const { nome, potencia } = req.body;

    if (!nome || !potencia) {
      return res.status(400).json({ erro: 'Nome e potência são obrigatórios.' });
    }

    const novaTurbina = new Turbina(req.body);
    await novaTurbina.save();
    res.status(201).json(novaTurbina);
  } catch (error) {
    console.error('❌ Erro ao criar turbina:', error);
    res.status(500).json({ erro: 'Erro ao criar turbina.' });
  }
};

// Listar todas as turbinas
export const listarTurbinas = async (req, res) => {
  try {
    const turbinas = await Turbina.find();
    res.status(200).json(turbinas);
  } catch (error) {
    console.error('❌ Erro ao listar turbinas:', error);
    res.status(500).json({ erro: 'Erro ao listar turbinas.' });
  }
};

// Obter uma turbina por ID
export const obterTurbina = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  try {
    const turbina = await Turbina.findById(id);
    if (!turbina) {
      return res.status(404).json({ erro: 'Turbina não encontrada.' });
    }
    res.status(200).json(turbina);
  } catch (error) {
    console.error('❌ Erro ao obter turbina:', error);
    res.status(500).json({ erro: 'Erro ao obter turbina.' });
  }
};
