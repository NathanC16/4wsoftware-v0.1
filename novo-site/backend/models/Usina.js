// models/Usina.js
import mongoose from 'mongoose';

// Define o esquema para o modelo de Usina
const UsinaSchema = new mongoose.Schema({
  // Nome da usina (obrigatório e sem espaços no início/fim)
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  // Cidade onde a usina está localizada (obrigatório e sem espaços no início/fim)
  cidade: {
    type: String,
    required: true,
    trim: true,
  },
  // Tipo de energia gerada pela usina (obrigatório, com valores permitidos)
  tipo: {
    type: String,
    required: true,
    enum: ['Solar', 'Hídrica', 'Biogás'], // Tipos de usina permitidos
  },
  // Data de criação do registro da usina
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Cria o modelo Usina a partir do esquema
const Usina = mongoose.model('Usina', UsinaSchema);

export default Usina;
