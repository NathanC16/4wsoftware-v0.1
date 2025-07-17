// import React from 'react';
import mockClients from '../data/mockClients';

export default function SellerDashboard() {
  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <header className="mb-6">
          <h2 className="text-3xl font-semibold text-blue-800">Painel da Vendedora</h2>
          <p className="text-gray-600">Resumo das economias geradas por clientes</p>
        </header>

        <div className="overflow-x-auto" role="region" aria-label="Tabela de economia dos clientes">
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-3 border font-medium text-left">Nome</th>
                <th className="p-3 border font-medium text-left">Usina</th>
                <th className="p-3 border font-medium text-left">Localização</th>
                <th className="p-3 border font-medium text-left">Economia (R$)</th>
              </tr>
            </thead>
            <tbody>
              {mockClients.map((client, index) => {
                const economia = (client.gastoAnterior - client.gastoAtual).toFixed(2);
                return (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="p-3 border">{client.nome}</td>
                    <td className="p-3 border">{client.usina}</td>
                    <td className="p-3 border">{client.localizacao}</td>
                    <td className="p-3 border text-green-600 font-semibold">R$ {economia}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
