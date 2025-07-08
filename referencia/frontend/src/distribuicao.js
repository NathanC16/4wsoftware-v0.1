// src/pages/Distribuicao.jsx
import React, { useState } from 'react';

export default function Distribuicao() {
  const [distribuicoes, setDistribuicoes] = useState([
    { id: 1, produtor: 'Produtor A', consumidor: 'Cliente X', quantidade: 300 },
    { id: 2, produtor: 'Produtor B', consumidor: 'Cliente Y', quantidade: 250 },
    { id: 3, produtor: 'Produtor C', consumidor: 'Cliente Z', quantidade: 200 },
  ]);

  const totalDisponivel = 1200;
  const totalDistribuido = distribuicoes.reduce((acc, cur) => acc + cur.quantidade, 0);
  const totalPendente = totalDisponivel - totalDistribuido;

  return (
    <div className="container-fluid">
      <h1 className="mb-4 text-success">Distribuição de Créditos ⚡</h1>

      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Créditos Disponíveis</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{totalDisponivel} kWh</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Créditos Distribuídos</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{totalDistribuido} kWh</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Créditos Pendentes</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{totalPendente} kWh</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Histórico de Distribuições</h6>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produtor</th>
                <th>Consumidor</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {distribuicoes.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.produtor}</td>
                  <td>{item.consumidor}</td>
                  <td>{item.quantidade} kWh</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
