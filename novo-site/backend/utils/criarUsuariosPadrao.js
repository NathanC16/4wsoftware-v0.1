// utils/criarUsuariosPadrao.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Array de objetos contendo os dados dos usuários padrão a serem criados
const usuariosPadrao = [
  { usuario: 'admin', senha: 'admin123', permissoes: ['admin', 'financeiro', 'vendedor', 'rh', 'podeAcessarUsuarios'] },
  { usuario: 'financeiro', senha: 'fin@2025', permissoes: ['financeiro'] },
  { usuario: 'vendedor', senha: 'vend@4w', permissoes: ['vendas'] },
  { usuario: 'suporte', senha: 'suporte@4w', permissoes: ['suporte'] },
  { usuario: 'rh', senha: 'rh@2025', permissoes: ['rh'] },
  { usuario: 'auditor', senha: 'auditor@4w', permissoes: ['auditoria'] },
  { usuario: 'backoffice', senha: 'back@4w', permissoes: ['backoffice'] },
  { usuario: 'estagiario', senha: 'estag@4w', permissoes: ['leitura'] }
];

/**
 * Função assíncrona para criar usuários padrão no banco de dados, se eles ainda não existirem.
 * Percorre a lista de `usuariosPadrao` e tenta criar cada um.
 * Se um usuário já existir, um aviso é exibido e a criação é pulada.
 */
export async function criarUsuariosPadrao() {
  try {
    for (const { usuario, senha, permissoes } of usuariosPadrao) {
      // Verifica se o usuário já existe no banco de dados
      const existente = await User.findOne({ usuario });
      if (existente) {
        console.log(`⚠️ Usuário "${usuario}" já existe, pulando criação.`);
        continue; // Pula para o próximo usuário se já existir
      }
      console.log(`⏳ Tentando criar usuário: ${usuario}`);
      // Cria uma nova instância do modelo User e salva no banco de dados
      const novo = new User({ usuario, senha, permissoes });
      await novo.save();
      console.log(`✅ Usuário "${usuario}" criado com sucesso.`);
    }

    console.log('🎉 Usuários padrão criados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar usuários padrão:', error);
  }
}
