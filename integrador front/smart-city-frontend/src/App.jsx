// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Sensores from './pages/Sensores';
import NovoSensor from './pages/NovoSensor';
import Localizacao from './pages/Localizacao';
import Historico from './pages/Historico';
import Ambientes from './pages/Ambientes';
// Não precisamos importar Lateral e Rodape diretamente aqui, pois serão importados em Layout
// import Lateral from './components/Lateral';
// import Rodape from './components/Rodape';
import Layout from './components/Layout'; // Importe o novo componente Layout
import { AuthProvider, useAuth } from './auth/AuthContext';
import Cadastro from './pages/Cadastro';

// Este componente redireciona para o dashboard se autenticado, ou para o login.
const RootRedirect = () => {
  const { token } = useAuth();
  // Se você tiver uma página de dashboard, use-a aqui. Caso contrário, redirecione para 'sensores' ou 'ambientes'
  return token ? <Navigate to="/sensores" replace /> : <Navigate to="/api/token" replace />;
};

// Componente para rotas que precisam do layout padrão
const PrivateLayoutRoute = ({ children }) => {
  const { token } = useAuth();
  // Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/api/token" replace />;
  }
  // Se houver token, renderiza a página dentro do layout
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/api/token" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<RootRedirect />} />
          {/* Rotas que usarão o layout padrão (cabeçalho, lateral, rodapé) */}
          <Route path="/localizacao" element={<PrivateLayoutRoute><Localizacao /></PrivateLayoutRoute>} />
          <Route path="/sensores" element={<PrivateLayoutRoute><Sensores /></PrivateLayoutRoute>} />
          <Route path="/novosensor" element={<PrivateLayoutRoute><NovoSensor /></PrivateLayoutRoute>} />
          <Route path="/historico" element={<PrivateLayoutRoute><Historico /></PrivateLayoutRoute>} />
          <Route path="/ambientes" element={<PrivateLayoutRoute><Ambientes /></PrivateLayoutRoute>} />
          {/* Adicione outras rotas que precisam do layout aqui */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;