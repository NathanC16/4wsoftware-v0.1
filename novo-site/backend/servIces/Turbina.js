// services/Turbina.js
// ATENÇÃO: Este arquivo parece ser uma duplicação do modelo Turbina.js.
// O modelo correto e principal para Turbina está localizado em: ../models/Turbina.js
// Este arquivo pode ser removido se não houver uma intenção específica para ele aqui.

import mongoose from 'mongoose';

const turbinaSchema = new mongoose.Schema({
  modelo: { type: String, required: true, trim: true },
  potencia: { type: Number, required: true, min: 0 },
  dataInstalacao: { type: Date },
  usina: { type: mongoose.Schema.Types.ObjectId, ref: 'Usina', required: true }
}, {
  timestamps: true,
});

const Turbina = mongoose.model('Turbina', turbinaSchema);

export default Turbina;
