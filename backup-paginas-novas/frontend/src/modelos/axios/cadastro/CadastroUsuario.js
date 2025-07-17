import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Em caso de sucesso
toast.success('Cadastro realizado com sucesso!');

// Em caso de erro
toast.error('Erro ao cadastrar. Verifique os dados.');


export default function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senha: '',
    telefone: '',
    endereco: '',
    cpf: '',
    cnpj: '',
    dataNascimento: '',
    tipoUsuario: '',
    contaDeLuz: null,
  });

  const [ucs, setUcs] = useState([
    {
      endereco: '',
      potenciaInstalada: '',
      producaoEstimadaMensal: '',
      dataUltimaMedicao: '',
      eficiencia: '',
      cashback: '',
      metaEconomia: '',
    },
  ]);

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUcChange = (index, e) => {
    const newUcs = [...ucs];
    newUcs[index][e.target.name] = e.target.value;
    setUcs(newUcs);
  };

  const addUc = () => {
    if (ucs.length < 20) {
      setUcs([...ucs, {
        endereco: '',
        potenciaInstalada: '',
        producaoEstimadaMensal: '',
        dataUltimaMedicao: '',
        eficiencia: '',
        cashback: '',
        metaEconomia: '',
      }]);
    }
  };

  const removeUc = (index) => {
    const newUcs = ucs.filter((_, i) => i !== index);
    setUcs(newUcs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      formDataToSend.append('unidadesConsumidoras', JSON.stringify(ucs));

      const resposta = await axios.post('http://localhost:5000/api/auth/cadastro', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMensagem(resposta.data.message || 'Cadastro realizado com sucesso!');
      setFormData({
        nomeCompleto: '',
        email: '',
        senha: '',
        telefone: '',
        endereco: '',
        cpf: '',
        cnpj: '',
        dataNascimento: '',
        tipoUsuario: '',
        contaDeLuz: null,
      });
      setUcs([{
        endereco: '',
        potenciaInstalada: '',
        producaoEstimadaMensal: '',
        dataUltimaMedicao: '',
        eficiencia: '',
        cashback: '',
        metaEconomia: '',
      }]);
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setMensagem('Erro ao cadastrar. Verifique os dados ou tente novamente.');
    }
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-primary">Cadastro de Novo Usuário</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm" encType="multipart/form-data">
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Nome Completo</label>
            <input name="nomeCompleto" className="form-control" value={formData.nomeCompleto} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label>Email</label>
            <input name="email" type="email" className="form-control" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label>Senha</label>
            <input name="senha" type="password" className="form-control" value={formData.senha} onChange={handleChange} required />
          </div>
          <div className="col-md-4">
            <label>Telefone</label>
            <input name="telefone" className="form-control" value={formData.telefone} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label>CPF</label>
            <input name="cpf" className="form-control" value={formData.cpf} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label>CNPJ</label>
            <input name="cnpj" className="form-control" value={formData.cnpj} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label>Data de Nascimento</label>
            <input name="dataNascimento" type="date" className="form-control" value={formData.dataNascimento} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label>Endereço</label>
            <input name="endereco" className="form-control" value={formData.endereco} onChange={handleChange} />
          </div>
          <div className="col-md-4">
            <label>Tipo de Usuário</label>
            <select name="tipoUsuario" className="form-select" value={formData.tipoUsuario} onChange={handleChange} required>
              <option value="">Selecione</option>
              <option value="cliente">Cliente</option>
              <option value="administrador">Administrador</option>
              <option value="analista">Analista</option>
            </select>
          </div>
          <div className="col-md-4">
            <label>Conta de Luz (PDF)</label>
            <input name="contaDeLuz" type="file" className="form-control" accept="application/pdf" onChange={handleChange} />
          </div>
        </div>

        <h4 className="mt-4">Unidades Consumidoras</h4>
        {ucs.map((uc, index) => (
          <div key={index} className="border p-3 mb-3">
            <h5>UC {index + 1}</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <label>Endereço</label>
                <input name="endereco" className="form-control" value={uc.endereco} onChange={(e) => handleUcChange(index, e)} required />
              </div>
              <div className="col-md-3">
                <label>Potência Instalada (kWp)</label>
                <input name="potenciaInstalada" type="number" className="form-control" value={uc.potenciaInstalada} onChange={(e) => handleUcChange(index, e)} />
              </div>
              <div className="col-md-3">
                <label>Produção Estimada Mensal (kWh)</label>
                <input name="producaoEstimadaMensal" type="number" className="form-control" value={uc.producaoEstimadaMensal} onChange={(e) => handleUcChange(index, e)} />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-3">
                <label>Data da Última Medição</label>
                <input name="dataUltimaMedicao" type="date" className="form-control" value={uc.dataUltimaMedicao} onChange={(e) => handleUcChange(index, e)} />
              </div>
              <div className="col-md-3">
                <label>Eficiência (%)</label>
                <input name="eficiencia" type="number" className="form-control" value={uc.eficiencia} onChange={(e) => handleUcChange(index, e)} />
              </div>
              <div className="col-md-3">
                <label>Cashback (R$)</label>
                <input name="cashback" type="number" className="form-control" value={uc.cashback} onChange={(e) => handleUcChange(index, e)} />
              </div>
              <div className="col-md-3">
                <label>Meta de Economia</label>
                <input name="metaEconomia" className="form-control" value={uc.metaEconomia} onChange={(e) => handleUcChange(index, e)} />
              </div>
            </div>
            {ucs.length > 1 && (
              <button type="button" className="btn btn-danger" onClick={() => removeUc(index)}>
                Remover UC
              </button>
            )}
          </div>
        ))}
        {ucs.length < 20 && (
          <button type="button" className="btn btn-secondary mb-3" onClick={addUc}>
            Adicionar UC
          </button>
        )}

        <button type="submit" className="btn btn-success">Cadastrar</button>
        {mensagem && <div className="mt-3 alert alert-info">{mensagem}</div>}
      </form>
    </div>
  );
}
