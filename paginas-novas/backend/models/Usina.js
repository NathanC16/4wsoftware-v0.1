import mongoose from 'mongoose';

const usinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cidade: { type: String, required: true },
  estado: { type: String, required: true },
  localizacao: { type: String },
  capacidadeGeracao: { type: Number },
  tipoEnergia: { type: String, enum: ['Solar', 'Hídrica', 'Biogás'], required: true },
  statusOperacional: { type: String, enum: ['ativa', 'inativa', 'em_manutencao'], default: 'ativa' },
  cooperativaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cooperativa' } // Referência à Cooperativa
}, {
  timestamps: true
});

const Usina = mongoose.model('Usina', usinaSchema);

export default Usina;