// controllers/auditoriaController.js
import Auditoria from '../models/Auditoria.js';

// Criar nova auditoria
export const criarAuditoria = async (req, res) => {
  try {
    const dados = req.body;

    if (!dados.acao || !dados.entidade) {
      return res.status(400).json({ mensagem: 'Ação e entidade são obrigatórias.' });
    }

    if (req.user) {
      dados.usuario = req.user.nome || req.user.email || req.user.usuario;
    }

    dados.dataHora = new Date(); // Garante o timestamp, caso não tenha no schema

    const novaAuditoria = new Auditoria(dados);
    await novaAuditoria.save();

    res.status(201).json(novaAuditoria);
  } catch (error) {
    console.error('Erro ao criar auditoria:', error);
    res.status(500).json({ mensagem: 'Erro ao criar auditoria' });
  }
};

// Obter todas as auditorias
export const obterAuditorias = async (req, res) => {
  try {
    const auditorias = await Auditoria.find().sort({ dataHora: -1 });
    res.status(200).json(auditorias);
  } catch (error) {
    console.error('Erro ao obter auditorias:', error);
    res.status(500).json({ mensagem: 'Erro ao obter auditorias' });
  }
};
