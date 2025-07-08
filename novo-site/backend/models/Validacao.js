// models/Validacao.js
import mongoose from 'mongoose';

// Define o esquema para o modelo de Validação
const ValidacaoSchema = new mongoose.Schema({
  // ID da fatura a ser validada (obrigatório)
  fatura: {
    type: String,
    required: true
  },
  // Checklist de validação, onde as chaves são os itens e os valores são booleanos (true/false)
  checklist: {
    type: Map,
    of: Boolean,
    required: true,
    validate: {
      validator: function(value) {
        // Valida que o checklist não está vazio
        return value && value.size > 0;
      },
      message: 'Checklist não pode ser vazio.'
    }
  },
  // Observações adicionais sobre a validação
  observacoes: {
    type: String,
    default: ''
  },
  // Status da validação (aprovado, reprovado ou pendente)
  status: {
    type: String,
    required: true,
    enum: ['aprovado', 'reprovado', 'pendente']
  },
  // Data da validação
  data: {
    type: Date,
    default: Date.now
  }
}, {
  // Adiciona automaticamente os campos createdAt e updatedAt
  timestamps: true
});

// Evita recriar o modelo se já existir (útil em ambiente de desenvolvimento)
const Validacao = mongoose.models.Validacao || mongoose.model('Validacao', ValidacaoSchema);

export default Validacao;
