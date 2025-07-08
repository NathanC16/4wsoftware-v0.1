// models/Usuário.js
import mongoose from 'mongoose';

// Define o esquema para o modelo de Usuário (para dados de perfil)
const usuarioSchema = new mongoose.Schema({
  // Nome completo do usuário (obrigatório)
  nomeCompleto: { type: String, required: true },
  // Endereço de email do usuário (obrigatório, único e com validação de formato)
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  // Senha do usuário (obrigatória e com comprimento mínimo de 6 caracteres)
  senha: { type: String, required: true, minlength: 6 },
  // Número de telefone do usuário (opcional, pode ser validado posteriormente)
  telefone: { type: String },
  // Endereço completo do usuário (opcional)
  endereco: { type: String },
  // Tipo de usuário (ex: cliente, colaborador, etc.)
  tipoUsuario: { type: String },
  // Data de nascimento do usuário
  dataNascimento: { type: Date },
  // CPF do usuário (opcional, pode ter validação personalizada depois)
  cpf: { type: String },
  // Array de arquivos associados ao usuário (ex: conta de luz)
  arquivos: [{
    filename: String,
    mimetype: String,
    size: Number
  }],
  // Data de cadastro do usuário (preenchida automaticamente)
  dataCadastro: { type: Date, default: Date.now }
}, {
  // Adiciona automaticamente os campos createdAt e updatedAt
  timestamps: true
});

// Cria o modelo Usuario a partir do esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
