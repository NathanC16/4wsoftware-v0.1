import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const usuariosPadrao = [
  { usuario: 'administrador', senha: 'admin@4w', permissoes: ['admin', 'financeiro', 'vendedor', 'rh'] },
  { usuario: 'financeiro', senha: 'fin@2025', permissoes: ['financeiro'] },
  { usuario: 'vendedor', senha: 'vend@4w', permissoes: ['vendas'] },
  { usuario: 'suporte', senha: 'suporte@4w', permissoes: ['suporte'] },
  { usuario: 'rh', senha: 'rh@2025', permissoes: ['rh'] },
  { usuario: 'auditor', senha: 'auditor@4w', permissoes: ['auditoria'] },
  { usuario: 'backoffice', senha: 'back@4w', permissoes: ['backoffice'] },
  { usuario: 'estagiario', senha: 'estag@4w', permissoes: ['leitura'] }
];

// 👇 ESSE É O EXPORT QUE FALTAVA
export async function criarUsuariosPadrao() {
  try {
    for (const { usuario, senha, permissoes } of usuariosPadrao) {
      const existente = await User.findOne({ usuario });
      if (existente) {
        console.log(`⚠️ Usuário "${usuario}" já existe`);
        continue;
      }
      const hash = await bcrypt.hash(senha, 12);
      const novo = new User({ usuario, senha: hash, permissoes });
      await novo.save();
      console.log(`✅ Usuário "${usuario}" criado`);
    }

    console.log('🎉 Usuários padrão criados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar usuários padrão:', error);
  }
}
