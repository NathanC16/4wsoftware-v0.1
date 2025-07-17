import Cooperativa from '../models/Cooperativa.js';

// Cria uma nova cooperativa com validações e tratamento de erros
export const criarCooperativa = async (req, res) => {
  const { nome, cnpj, endereco, telefone, email } = req.body;

  if (!nome || !cnpj || !endereco) {
    return res.status(400).json({ erro: 'Nome, CNPJ e endereço são obrigatórios.' });
  }

  if (!/^\d{14}$/.test(cnpj)) {
    return res.status(400).json({ erro: 'CNPJ inválido. Deve conter exatamente 14 dígitos numéricos.' });
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }

  try {
    const cooperativaExistente = await Cooperativa.findOne({ cnpj });
    if (cooperativaExistente) {
      return res.status(409).json({ erro: 'Cooperativa com esse CNPJ já cadastrada.' });
    }

    const novaCooperativa = new Cooperativa({ nome, cnpj, endereco, telefone, email });
    await novaCooperativa.save();

    return res.status(201).json({ mensagem: 'Cooperativa criada com sucesso!', cooperativa: novaCooperativa });
  } catch (error) {
    console.error('Erro ao criar cooperativa:', error);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};

// Lista todas as cooperativas cadastradas
export const listarCooperativas = async (req, res) => {
  try {
    const cooperativas = await Cooperativa.find();
    return res.status(200).json(cooperativas);
  } catch (error) {
    console.error('Erro ao listar cooperativas:', error);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
};
