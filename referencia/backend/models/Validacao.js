import mongoose from 'mongoose';

const ValidacaoSchema = new mongoose.Schema({
  fatura: {
    type: String,
    required: true
  },
  checklist: {
    type: Map,
    of: Boolean,
    required: true,
    validate: {
      validator: function(value) {
        return value && value.size > 0;
      },
      message: 'Checklist não pode ser vazio.'
    }
  },
  observacoes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    required: true,
    enum: ['aprovado', 'reprovado', 'pendente']
  },
  data: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Evita recriar o model se já existir (útil em ambiente dev)
const Validacao = mongoose.models.Validacao || mongoose.model('Validacao', ValidacaoSchema);

export default Validacao;
