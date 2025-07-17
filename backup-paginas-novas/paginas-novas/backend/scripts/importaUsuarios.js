import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config(); // sempre primeiro!

const usuarios = [
  {
    usuario: 'admin1',
    senha: 'admin123',
    permissoes: ['podeAcessarDashboard', 'podeAcessarDashboardAdministracao']
  },
  {
    usuario: 'financeiro',
    senha: 'fin123',
    permissoes: ['podeAcessarRelatorios']
  },
  {
    usuario: 'usuarioComum',
    senha: 'usuario123',
    permissoes: ['podeAcessarDashboard']
  }
];

export async function importarUsuarios() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('📡 MongoDB conectado com sucesso!');

    for (const u of usuarios) {
      const existe = await User.findOne({ usuario: u.usuario.toLowerCase() });
      if (existe) {
        console.log(`⚠️ Usuário "${u.usuario}" já existe. Pulando...`);
        continue;
      }

      const senhaCriptografada = await bcrypt.hash(u.senha, 10);

      const novoUsuario = new User({
        usuario: u.usuario.toLowerCase(),
        senha: senhaCriptografada,
        permissoes: u.permissoes
      });

      await novoUsuario.save();
      console.log(`✅ Usuário "${u.usuario}" criado com sucesso!`);
    }

    await mongoose.disconnect();
    console.log('✨ Importação finalizada e desconectado do banco!');
  } catch (err) {
    console.error('❌ Erro na importação:', err);
    process.exit(1);
  }
}

// Se quiser rodar direto via node, descomenta a linha abaixo
// importarUsuarios();
