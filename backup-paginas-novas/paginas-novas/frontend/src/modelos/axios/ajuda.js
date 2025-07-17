import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Ajuda() {
  const [mensagens, setMensagens] = useState([]);
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' });
  const [mensagemEnviada, setMensagemEnviada] = useState('');
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    buscarMensagens();
  }, []);

  const buscarMensagens = async () => {
    setCarregando(true);
    try {
      const res = await axios.get('/api/ajuda');
      const mensagensOrdenadas = res.data.sort((a, b) => new Date(b.data) - new Date(a.data));
      setMensagens(mensagensOrdenadas);
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err);
    } finally {
      setCarregando(false);
    }
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.mensagem) {
      setMensagemEnviada('Por favor, preencha todos os campos.');
      return;
    }
    try {
      await axios.post('/api/ajuda', formData);
      setMensagemEnviada('Mensagem enviada com sucesso!');
      setFormData({ nome: '', email: '', mensagem: '' });
      buscarMensagens();
    } catch (err) {
      setMensagemEnviada('Erro ao enviar a mensagem.');
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-success mb-4">Suporte e Ajuda</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input type="text" name="nome" placeholder="Seu nome" className="form-control" value={formData.nome} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="email" name="email" placeholder="Seu e-mail" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <textarea name="mensagem" placeholder="Digite sua mensagem" className="form-control" value={formData.mensagem} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="btn btn-success">Enviar</button>
        {mensagemEnviada && <div className="mt-2 alert alert-info">{mensagemEnviada}</div>}
      </form>

      <h4 className="text-secondary mb-3">Histórico de Mensagens</h4>
      {carregando ? (
        <p>Carregando mensagens...</p>
      ) : mensagens.length > 0 ? (
        <ul className="list-group">
          {mensagens.map((msg, idx) => (
            <li key={idx} className="list-group-item">
              <strong>{msg.nome}</strong> ({msg.email})<br />
              <small>{new Date(msg.data).toLocaleString()}</small>
              <p>{msg.mensagem}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma mensagem enviada ainda.</p>
      )}
    </div>
  );
}
// Note: This code assumes you have a backend API set up to handle the requests at /api/ajuda.
// Make sure to adjust the API endpoints and data structure according to your backend implementation.
// The component uses Bootstrap classes for styling, so ensure you have Bootstrap included in your project.