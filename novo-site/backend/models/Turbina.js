// models/Turbina.js
import mongoose from 'mongoose';

// Define o esquema para o modelo de Turbina
const TurbinaSchema = new mongoose.Schema({
  // Nome da turbina (obrigatório e sem espaços no início/fim)
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  // Potência da turbina (obrigatório)
  potencia: {
    type: Number,
    required: true,
  },
  // Data de criação do registro da turbina
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Cria o modelo Turbina a partir do esquema
const Turbina = mongoose.model('Turbina', TurbinaSchema);

export default Turbina;
