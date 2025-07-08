// src/pages/Historico.jsx
import React, { useState } from 'react';

export default function Historico() {
  const [formErrors, setFormErrors] = useState({});

  const faturas = [
    {
      mes: 'Abril 2025',
      consumo: 250,
      creditos: 50,
      valor: 'R$ 200,00',
      status: 'Pago',
    },
    {
      mes: 'Março 2025',
      consumo: 230,
      creditos: 30,
      valor: 'R$ 180,00',
      status: 'Pendente',
    },
  ];

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-primary">Histórico de Faturas</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Mês</th>
            <th>Consumo (kWh)</th>
            <th>Créditos Utilizados</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Fatura</th>
          </tr>
        </thead>
        <tbody>
          {faturas.map((fatura, index) => (
            <tr key={index} className={fatura.status === 'Pendente' ? 'table-warning' : ''}>
              <td>{fatura.mes}</td>
              <td>{fatura.consumo}</td>
              <td>{fatura.creditos}</td>
              <td>{fatura.valor}</td>
              <td>
                <span className={`badge ${fatura.status === 'Pago' ? 'bg-success' : 'bg-warning text-dark'}`}>
                  {fatura.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-outline-primary" aria-label={`Baixar fatura de ${fatura.mes}`}>
                  <i className="fas fa-download me-1"></i> Baixar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
