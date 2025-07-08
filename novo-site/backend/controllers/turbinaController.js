// controllers/turbinaController.js

import mongoose from 'mongoose';
import Turbina from '../models/Turbina.js';

/**
 * Cria uma nova turbina no banco de dados.
 * @param {Object} req - Objeto de requisição do Express, contendo nome e potência da turbina no corpo (body).
 * @param {Object} res - Objeto de resposta do Express.
 */
export const criarTurbina = async (req, res) => {
  try {
    const { nome, potencia } = req.body;

    // Validação de campos obrigatórios
    if (!nome || !potencia) {
      return res.status(400).json({ erro: 'Nome e potência são obrigatórios para criar uma turbina.' });
    }

    // Cria uma nova instância da turbina e salva no banco de dados
    const novaTurbina = new Turbina(req.body);
    await novaTurbina.save();
    res.status(201).json(novaTurbina);
  } catch (error) {
    console.error('❌ Erro ao criar turbina:', error);
    res.status(500).json({ erro: 'Erro interno no servidor ao criar turbina.' });
  }
};

/**
 * Lista todas as turbinas cadastradas no banco de dados.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const listarTurbinas = async (req, res) => {
  try {
    const turbinas = await Turbina.find();
    res.status(200).json(turbinas);
  } catch (error) {
    console.error('❌ Erro ao listar turbinas:', error);
    res.status(500).json({ erro: 'Erro interno no servidor ao listar turbinas.' });
  }
};

/**
 * Obtém os detalhes de uma turbina específica por ID.
 * @param {Object} req - Objeto de requisição do Express, contendo o ID da turbina nos parâmetros (params).
 * @param {Object} res - Objeto de resposta do Express.
 */
export const obterTurbina = async (req, res) => {
  const { id } = req.params;

  // Valida se o ID fornecido é um ObjectId válido do MongoDB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID de turbina inválido.' });
  }

  try {
    const turbina = await Turbina.findById(id);
    if (!turbina) {
      return res.status(404).json({ erro: 'Turbina não encontrada.' });
    }
    res.status(200).json(turbina);
  } catch (error) {
    console.error('❌ Erro ao obter turbina:', error);
    res.status(500).json({ erro: 'Erro interno no servidor ao obter turbina.' });
  }
};
