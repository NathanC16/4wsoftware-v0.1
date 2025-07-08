import Cooperativa from '../models/Cooperativa.js';

/**
 * Cria uma nova cooperativa no banco de dados.
 * Realiza validações de campos obrigatórios, formato de CNPJ e email, e verifica duplicidade de CNPJ.
 * @param {Object} req - Objeto de requisição do Express, contendo os dados da cooperativa no corpo (body).
 * @param {Object} res - Objeto de resposta do Express.
 */
export const criarCooperativa = async (req, res) => {
  const { nome, cnpj, endereco, telefone, email } = req.body;

  // Validação de campos obrigatórios
  if (!nome || !cnpj || !endereco) {
    return res.status(400).json({ erro: 'Nome, CNPJ e endereço são obrigatórios.' });
  }

  // Validação de formato do CNPJ
  if (!/^\d{14}$/.test(cnpj)) {
    return res.status(400).json({ erro: 'CNPJ inválido. Deve conter exatamente 14 dígitos numéricos.' });
  }

  // Validação de formato do email, se fornecido
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }

  try {
    // Verifica se já existe uma cooperativa com o CNPJ informado
    const cooperativaExistente = await Cooperativa.findOne({ cnpj });
    if (cooperativaExistente) {
      return res.status(409).json({ erro: 'Cooperativa com esse CNPJ já cadastrada.' });
    }

    // Cria uma nova instância da cooperativa e salva no banco de dados
    const novaCooperativa = new Cooperativa({ nome, cnpj, endereco, telefone, email });
    await novaCooperativa.save();

    return res.status(201).json({ mensagem: 'Cooperativa criada com sucesso!', cooperativa: novaCooperativa });
  } catch (error) {
    console.error('Erro ao criar cooperativa:', error);
    return res.status(500).json({ erro: 'Erro interno no servidor ao criar cooperativa.' });
  }
};

/**
 * Lista todas as cooperativas cadastradas no banco de dados.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const listarCooperativas = async (req, res) => {
  try {
    const cooperativas = await Cooperativa.find();
    return res.status(200).json(cooperativas);
  } catch (error) {
    console.error('Erro ao listar cooperativas:', error);
    return res.status(500).json({ erro: 'Erro interno no servidor ao listar cooperativas.' });
  }
};
