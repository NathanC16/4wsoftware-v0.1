import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Distribuicao() {
  const [distribuicoes, setDistribuicoes] = useState([]);
  const [novaDistribuicao, setNovaDistribuicao] = useState({ produtor: '', consumidor: '', quantidade: '' });
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/distribuicoes')
      .then(res => setDistribuicoes(res.data))
      .catch(err => console.error('Erro ao buscar distribuições:', err));
  }, []);

  const handleChange = (e) => {
    setNovaDistribuicao({ ...novaDistribuicao, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/distribuicoes', novaDistribuicao);
      setDistribuicoes([...distribuicoes, res.data]);
      setNovaDistribuicao({ produtor: '', consumidor: '', quantidade: '' });
    } catch (error) {
      console.error('Erro ao adicionar distribuição:', error);
    }
  };

  const distribuicoesFiltradas = filtro
    ? distribuicoes.filter(d => d.produtor.includes(filtro) || d.consumidor.includes(filtro))
    : distribuicoes;

  return (
    <div className="container-fluid">
      <h1 className="mb-4 text-success">Distribuição de Créditos ⚡</h1>

      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Créditos Disponíveis</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">1.200 kWh</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">Créditos Distribuídos</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">800 kWh</div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Créditos Pendentes</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">400 kWh</div>
            </div>
          </div>
        </div>
      </div>

      <form className="card p-3 shadow mb-4" onSubmit={handleSubmit}>
        <h5 className="text-primary">Registrar Nova Distribuição</h5>
        <div className="row g-3">
          <div className="col-md-4">
            <input name="produtor" className="form-control" placeholder="Produtor" value={novaDistribuicao.produtor} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <input name="consumidor" className="form-control" placeholder="Consumidor" value={novaDistribuicao.consumidor} onChange={handleChange} required />
          </div>
          <div className="col-md-3">
            <input name="quantidade" className="form-control" placeholder="Quantidade (kWh)" value={novaDistribuicao.quantidade} onChange={handleChange} required />
          </div>
          <div className="col-md-1">
            <button className="btn btn-success w-100" type="submit">➕</button>
          </div>
        </div>
      </form>

      <div className="card shadow">
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Histórico de Distribuições</h6>
          <input className="form-control w-25" placeholder="Filtrar por nome..." value={filtro} onChange={(e) => setFiltro(e.target.value)} />
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
              {distribuicoesFiltradas.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.produtor}</td>
                  <td>{item.consumidor}</td>
                  <td>{item.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// This code defines a React component for managing the distribution of credits in a energy system.
// It includes functionality to view existing distributions, add new ones, and filter the list by producer or consumer names.