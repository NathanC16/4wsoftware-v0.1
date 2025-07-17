// paginas-novas/backend/controllers/dashboardController.js

import User from '../models/User.js';
import Usina from '../models/Usina.js';
import Cooperativa from '../models/Cooperativa.js';

export const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalUsinas = await Usina.countDocuments();
    const totalCooperativas = await Cooperativa.countDocuments();

    // Dados simulados para gráficos de receita e indicadores
    const receitaMensal = [
      { month: 'Mai', value: 51000 },
      { month: 'Jun', value: 72300 }
    ];
    const indicadores = [
      { month: 'Mai', value: 45 },
      { month: 'Jun', value: 62 }
    ];

    res.status(200).json({
      visaoGeral: {
        contratos: totalUsers, // Placeholder: Contratos = Total de Usuários
        cooperativas: totalCooperativas,
        usinas: totalUsinas,
        vendedores: totalUsers // Placeholder: Vendedores = Total de Usuários
      },
      resumoMensal: receitaMensal,
      indicadores: indicadores
    });
  } catch (error) {
    console.error('❌ Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ erro: 'Erro ao buscar dados do dashboard.' });
  }
};
