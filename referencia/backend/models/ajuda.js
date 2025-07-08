// models/Ajuda.js
import mongoose from 'mongoose';

const AjudaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  mensagem: { type: String, required: true },
  data: { type: Date, default: Date.now }
});

const Ajuda = mongoose.model('Ajuda', AjudaSchema);
export default Ajuda;
