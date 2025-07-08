// controllers/usinaController.js

import mongoose from 'mongoose';
import Usina from '../models/Usina.js';

/**
 * Cria uma nova usina no banco de dados.
 * @param {Object} req - Objeto de requisição do Express, contendo nome, cidade e tipo da usina no corpo (body).
 * @param {Object} res - Objeto de resposta do Express.
 */
export const criarUsina = async (req, res) => {
  try {
    const { nome, cidade, tipo } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !cidade || !tipo) {
      return res.status(400).json({ erro: 'Nome, cidade e tipo da usina são obrigatórios para criar uma usina.' });
    }

    // Cria uma nova instância da usina e salva no banco de dados
    const novaUsina = new Usina(req.body);
    await novaUsina.save();
    res.status(201).json(novaUsina);
  } catch (error) {
    console.error('❌ Erro ao criar usina:', error);
    res.status(500).json({ erro: 'Erro interno no servidor ao criar usina.' });
  }
};

/**
 * Lista todas as usinas cadastradas no banco de dados.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const listarUsinas = async (req, res) => {
  try {
    const usinas = await Usina.find();
    res.status(200).json(usinas);
  } catch (error) {
    console.error('❌ Erro ao listar usinas:', error);
    res.status(500).json({ erro: 'Erro interno no servidor ao listar usinas.' });
  }
};

/**
 * Obtém os detalhes de uma usina específica por ID.
 * @param {Object} req - Objeto de requisição do Express, contendo o ID da usina nos parâmetros (params).
 * @param {Object} res - Objeto de resposta do Express.
 */
export const obterUsina = async (req, res) => {
  const { id } = req.params;

  // Valida se o ID fornecido é um ObjectId válido do MongoDB
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
    res.status(500).json({ erro: 'Erro interno no servidor ao obter usina.' });
  }
};
