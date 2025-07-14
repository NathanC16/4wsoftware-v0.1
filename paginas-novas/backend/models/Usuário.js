import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  senha: { type: String, required: true, minlength: 6 },
  telefone: { type: String }, // Pode validar mais tarde
  endereco: { type: String },
  tipoUsuario: { type: String }, // cliente, colaborador, etc
  dataNascimento: { type: Date },
  cpf: { type: String }, // Validação custom depois
  arquivos: [{
    filename: String,
    mimetype: String,
    size: Number
  }],
  dataCadastro: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Usuario = mongoose.model('Usuario', usuarioSchema);
export default Usuario;
