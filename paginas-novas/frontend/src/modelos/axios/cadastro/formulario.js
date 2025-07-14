import React, { useState } from 'react';
import InputMask from 'react-input-mask';

export default function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: ''
    // Adicione outros campos conforme necessário
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    // Adicione lógica para envio (ex: API)
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">Cadastro de Usuário</h2>

      <div className="form-group mb-3">
        <label>Nome completo</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="form-group mb-3">
        <label>CPF</label>
        <InputMask
          mask="999.999.999-99"
          value={formData.cpf}
          onChange={handleChange}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              name="cpf"
              className="form-control"
              required
            />
          )}
        </InputMask>
      </div>

      <button type="submit" className="btn btn-primary mt-3">
        Cadastrar
      </button>
    </form>
  );
}
