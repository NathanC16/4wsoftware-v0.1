// paginas-novas/backend/models/Cliente.js
import mongoose from 'mongoose';

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  uc: { type: String },
  contrato: { type: String },
  usina: { type: String },
  modalidade: { type: String },
  parceiro: { type: String },
  contratoParceiro: { type: String },
  desconto: { type: Number },
  email: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;
