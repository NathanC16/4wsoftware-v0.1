import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        senha,
      });
      const { token, usuario } = resposta.data;
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      navigate('/');
    } catch (err) {
      setErro('Login inválido. Verifique os dados.');
    }
  };
 
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form onSubmit={handleLogin} className="card p-4 shadow" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="text-primary text-center mb-4">Acesso ao Sistema</h3>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success w-100">Entrar</button>
        {erro && <div className="mt-3 text-danger text-center">{erro}</div>}
      </form>
    </div>
  );
}
