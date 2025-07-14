// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login4w from './pages/Login4w';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import PermissaoRoute from './routes/PermissaoRoute';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login4w />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/dashboard"
          element={
            <PermissaoRoute isAuthenticated={isAuthenticated}>
              <Layout>
                <Dashboard />
              </Layout>
            </PermissaoRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
const login4wRoute = require('./routes/login4w');
app.use('/login4w', login4wRoute);
const cadastroRoute = require('./routes/cadastro');
app.use('/cadastro', cadastroRoute);