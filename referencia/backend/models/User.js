import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
    index: true, // melhora performance em buscas
    trim: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
    minlength: 6,
  },
  permissoes: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

// Hash da senha antes de salvar no banco
userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar senha digitada com a do banco
userSchema.methods.compararSenha = async function (senhaDigitada) {
  return bcrypt.compare(senhaDigitada, this.senha);
};

const User = mongoose.model('User', userSchema);
export default User;
