// paginas-novas/backend/controllers/clienteController.js
import mongoose from 'mongoose';
import Cliente from '../models/Cliente.js';

// Obter um cliente por ID
export const obterClientePorId = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID de cliente inválido.' });
  }

  try {
    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error('❌ Erro ao obter cliente:', error);
    res.status(500).json({ erro: 'Erro ao obter cliente.' });
  }
};

// Atualizar um cliente por ID
export const atualizarCliente = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ erro: 'ID de cliente inválido.' });
  }

  try {
    const cliente = await Cliente.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!cliente) {
      return res.status(404).json({ erro: 'Cliente não encontrado.' });
    }
    res.status(200).json(cliente);
  } catch (error) {
    console.error('❌ Erro ao atualizar cliente:', error);
    res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
  }
};
