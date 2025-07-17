import mongoose from 'mongoose';

const turbinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  modelo: { type: String },
  capacidade: { type: Number },
  status: { type: String, enum: ['operacional', 'manutencao', 'desativada'], default: 'operacional' },
  usinaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usina' } // Referência à Usina
}, {
  timestamps: true
});

const Turbina = mongoose.model('Turbina', turbinaSchema);

export default Turbina;