import mongoose from 'mongoose';

const AuditoriaSchema = new mongoose.Schema({
  fatura: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fatura',
    required: true
  },
  checklist: {
    type: Map,
    of: Boolean,
    required: true,
    validate: {
      validator: function(value) {
        return [...value.keys()].every(key => typeof key === 'string' && key.length > 0);
      },
      message: 'As chaves do checklist devem ser strings não vazias.'
    }
  },
  observacoes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['aprovado', 'reprovado'],
    required: true
  },
  dataHora: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Auditoria = mongoose.model('Auditoria', AuditoriaSchema);

export default Auditoria;
export { AuditoriaSchema };
