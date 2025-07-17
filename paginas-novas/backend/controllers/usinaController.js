// controllers/usinaController.js

import mongoose from 'mongoose';
import Usina from '../models/Usina.js';

// Criar uma nova usina
export const criarUsina = async (req, res) => {
  try {
    const { nome, cidade, estado, tipo } = req.body;

    if (!nome || !cidade || !estado || !tipo) {
      return res.status(400).json({ erro: 'Nome, cidade, estado e tipo da usina são obrigatórios.' });
    }

    const novaUsina = new Usina({
      nome,
      cidade,
      estado,
      tipoEnergia: tipo // Mapeia 'tipo' do frontend para 'tipoEnergia' no modelo
    });

    await novaUsina.save();
    res.status(201).json(novaUsina);
  } catch (error) {
    console.error('❌ Erro ao criar usina:', error);
    res.status(500).json({ erro: 'Erro ao criar usina.' });
  }
};

// Listar todas as usinas
export const listarUsinas = async (req, res) => {
  try {
    const usinas = await Usina.find();
    res.status(200).json(usinas);
  } catch (error) {
    console.error('❌ Erro ao listar usinas:', error);
    res.status(500).json({ erro: 'Erro ao listar usinas.' });
  }
};

// Obter uma usina por ID
export const obterUsina = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID de usina inválido.' });
  }

  try {
    const usina = await Usina.findById(id);
    if (!usina) {
      return res.status(404).json({ erro: 'Usina não encontrada.' });
    }
    res.status(200).json(usina);
  } catch (error) {
    console.error('❌ Erro ao obter usina:', error);
    res.status(500).json({ erro: 'Erro ao obter usina.' });
  }
};
