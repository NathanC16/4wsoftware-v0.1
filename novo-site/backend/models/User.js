// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define o esquema para o modelo de Usuário (para autenticação)
const userSchema = new mongoose.Schema({
  // Nome de usuário (obrigatório, único, indexado, sem espaços e em minúsculas)
  usuario: {
    type: String,
    required: true,
    unique: true,
    index: true, // Melhora a performance em buscas
    trim: true,
    lowercase: true,
  },
  // Senha do usuário (obrigatória e com comprimento mínimo de 6 caracteres)
  senha: {
    type: String,
    required: true,
    minlength: 6,
  },
  // Array de permissões do usuário (ex: 'admin', 'financeiro')
  permissoes: {
    type: [String],
    default: [],
  },
}, {
  // Adiciona automaticamente os campos createdAt e updatedAt
  timestamps: true,
});

// Middleware para fazer hash da senha antes de salvar no banco de dados
userSchema.pre('save', async function (next) {
  // Se a senha não foi modificada, pula para o próximo middleware
  if (!this.isModified('senha')) return next();

  try {
    // Gera um salt para o hash da senha
    const salt = await bcrypt.genSalt(10);
    // Faz o hash da senha e a armazena
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar a senha digitada com a senha armazenada no banco
userSchema.methods.compararSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

// Cria o modelo User a partir do esquema
const User = mongoose.model('User', userSchema);
export default User;
