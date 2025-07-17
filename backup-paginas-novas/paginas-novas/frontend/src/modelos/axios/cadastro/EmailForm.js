import React, { useState } from 'react';
import { sendEmail } from '../../services/sendEmail';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmailForm() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(emailData);
      toast.success('E-mail enviado com sucesso!');
    } catch (error) {
      toast.error('Erro ao enviar e-mail.');
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="mb-4 text-primary">Enviar E-mail</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Destinatário</label>
          <input
            type="email"
            name="to"
            className="form-control"
            placeholder="Destinatário"
            value={emailData.to}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Assunto</label>
          <input
            type="text"
            name="subject"
            className="form-control"
            placeholder="Assunto"
            value={emailData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensagem</label>
          <textarea
            name="message"
            className="form-control"
            placeholder="Mensagem"
            rows="5"
            value={emailData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Enviar E-mail</button>
      </form>
    </div>
  );
}
