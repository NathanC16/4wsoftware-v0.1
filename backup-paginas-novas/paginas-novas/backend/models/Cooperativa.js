import mongoose from 'mongoose';

const cooperativaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cnpj: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\d{14}$/, 'CNPJ deve ter 14 dígitos numéricos']
  },
  endereco: { type: String, required: true },
  telefone: { type: String },
  email: { 
    type: String, 
    validate: {
      validator: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} não é um email válido!`
    }
  }
});

export default mongoose.model('Cooperativa', cooperativaSchema);
export { cooperativaSchema };