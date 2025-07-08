// controllers/auditoriaController.js
import Auditoria from '../models/Auditoria.js';

/**
 * Cria um novo registro de auditoria.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const criarAuditoria = async (req, res) => {
  try {
    const dados = req.body;

    // Verifica se os campos obrigatórios 'acao' e 'entidade' estão presentes
    if (!dados.acao || !dados.entidade) {
      return res.status(400).json({ mensagem: 'Ação e entidade são obrigatórias para o registro de auditoria.' });
    }

    // Adiciona informações do usuário logado, se disponível
    if (req.user) {
      dados.usuario = req.user.nome || req.user.email || req.user.usuario;
    }

    // Garante que o timestamp da auditoria seja definido
    dados.dataHora = new Date();

    // Cria e salva o novo registro de auditoria
    const novaAuditoria = new Auditoria(dados);
    await novaAuditoria.save();

    res.status(201).json(novaAuditoria);
  } catch (error) {
    console.error('Erro ao criar auditoria:', error);
    res.status(500).json({ mensagem: 'Erro interno ao criar auditoria.' });
  }
};

/**
 * Obtém todos os registros de auditoria, ordenados por data decrescente.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 */
export const obterAuditorias = async (req, res) => {
  try {
    const auditorias = await Auditoria.find().sort({ dataHora: -1 });
    res.status(200).json(auditorias);
  } catch (error) {
    console.error('Erro ao obter auditorias:', error);
    res.status(500).json({ mensagem: 'Erro interno ao obter auditorias.' });
  }
};
