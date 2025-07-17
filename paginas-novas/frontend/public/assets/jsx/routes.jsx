import { Routes, Route } from 'react-router-dom';
import VisualGeral from './pages/VisualGeral';
import ValidacaoFaturas from './pages/VerificacaoFaturas';
import Ajuda from './pages/Suporte';
import PerfilVendedor from './pages/perfil.invidual.vendedor';
import Dashboard from './pages/Painel de Administração';
import Indicadores from './pages/Indicadores';
import Cashback from './pages/IndicadoresCashback';
import Historico from './pages/Faturas';
import Cadastro from './pages/CadastroUsuario';
import Consumo from './pages/Consumo';
import Comissionados from './pages/Comissionados';
import Auditoria from './pages/AuditoriaFaturas';
import FinanceiroRh from './pages/FinanceiroRh';
import GeradorProposta from './pages/geradordeproposta';
import Administracao from './pages/Administracao';
import Usinas from './pages/Usinas';
import Usuarios from './pages/Usuarios';
import Login from './pages/Login';
import NaoAutorizado from './pages/NaoAutorizado';
import PrivateRoute from './components/PrivateRoute';
import PermissaoRoute from './components/PermissaoRoute';

export default function Rotas() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/nao-autorizado" element={<NaoAutorizado />} />

      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/visual-geral" element={<PrivateRoute><VisualGeral /></PrivateRoute>} />
      <Route path="/verificacao-faturas" element={<PermissaoRoute permissaoNecessaria="verificacao-faturas"><ValidacaoFaturas /></PermissaoRoute>} />
      <Route path="/suporte" element={<PermissaoRoute permissaoNecessaria="suporte"><Ajuda /></PermissaoRoute>} />
      <Route path="/perfil-vendedor" element={<PermissaoRoute permissaoNecessaria="perfil-vendedor"><PerfilVendedor /></PermissaoRoute>} />
      <Route path="/indicadores" element={<PermissaoRoute permissaoNecessaria="indicadores"><Indicadores /></PermissaoRoute>} />
      <Route path="/cashback" element={<PermissaoRoute permissaoNecessaria="indicadores"><Cashback /></PermissaoRoute>} />
      <Route path="/historico" element={<PermissaoRoute permissaoNecessaria="historico"><Historico /></PermissaoRoute>} />
      <Route path="/cadastro" element={<PermissaoRoute permissaoNecessaria="cadastrar_cliente"><Cadastro /></PermissaoRoute>} />
      <Route path="/consumo" element={<PrivateRoute><Consumo /></PrivateRoute>} />
      <Route path="/comissionados" element={<PrivateRoute><Comissionados /></PrivateRoute>} />
      <Route path="/auditoria" element={<PermissaoRoute permissaoNecessaria="auditoria"><Auditoria /></PermissaoRoute>} />
      <Route path="/financeiro-rh" element={<PermissaoRoute permissaoNecessaria="financeiro-rh"><FinanceiroRh /></PermissaoRoute>} />
      <Route path="/gerador-proposta" element={<PermissaoRoute permissaoNecessaria="gerador-proposta"><GeradorProposta /></PermissaoRoute>} />
      <Route path="/administracao" element={<PrivateRoute><Administracao /></PrivateRoute>} />
      <Route path="/usinas" element={<PrivateRoute><Usinas /></PrivateRoute>} />
      <Route path="/usuarios" element={<PrivateRoute><Usuarios /></PrivateRoute>} />
    </Routes>
  );
}
