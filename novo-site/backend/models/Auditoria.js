// models/Auditoria.js
import mongoose from 'mongoose';

// Define o esquema para o modelo de Auditoria
const AuditoriaSchema = new mongoose.Schema({
  // Referência à fatura que está sendo auditada
  fatura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fatura',
    required: true
  },
  // Checklist de auditoria, onde as chaves são os itens e os valores são booleanos (true/false)
  checklist: {
    type: Map,
    of: Boolean,
    required: true,
    validate: {
      validator: function(value) {
        // Valida que todas as chaves do mapa são strings não vazias
        return [...value.keys()].every(key => typeof key === 'string' && key.length > 0);
      },
      message: 'As chaves do checklist devem ser strings não vazias.'
    }
  },
  // Observações adicionais sobre a auditoria
  observacoes: {
    type: String,
    default: ''
  },
  // Status da auditoria (aprovado ou reprovado)
  status: {
    type: String,
    enum: ['aprovado', 'reprovado'],
    required: true
  },
  // Data e hora da auditoria
  dataHora: {
    type: Date,
    default: Date.now
  }
}, {
  // Adiciona automaticamente os campos createdAt e updatedAt
  timestamps: true
});

// Cria o modelo Auditoria a partir do esquema
const Auditoria = mongoose.model('Auditoria', AuditoriaSchema);

export default Auditoria;
export { AuditoriaSchema };
