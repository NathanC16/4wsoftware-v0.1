// models/Cooperativa.js
import mongoose from 'mongoose';

// Define o esquema para o modelo de Cooperativa
const cooperativaSchema = new mongoose.Schema({
  // Nome da cooperativa (obrigatório)
  nome: { type: String, required: true },
  // CNPJ da cooperativa (obrigatório, único e com validação de formato)
  cnpj: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\d{14}$/, 'CNPJ deve ter 14 dígitos numéricos']
  },
  // Endereço da cooperativa (obrigatório)
  endereco: { type: String, required: true },
  // Telefone da cooperativa (opcional)
  telefone: { type: String },
  // Email da cooperativa (opcional, com validação de formato)
  email: { 
    type: String, 
    validate: {
      validator: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: props => `${props.value} não é um email válido!`
    }
  }
});

// Exporta o modelo Cooperativa
export default mongoose.model('Cooperativa', cooperativaSchema);
// Exporta o esquema da cooperativa (útil para reuso em outros esquemas)
export { cooperativaSchema };