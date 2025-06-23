// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Sensores from './pages/Sensores';
import NovoSensor from './pages/NovoSensor';
import Localizacao from './pages/Localizacao';
import Historico from './pages/Historico';
import Ambientes from './pages/Ambientes';
import Layout from './components/Layout'; 
import { AuthProvider, useAuth } from './auth/AuthContext';
import Cadastro from './pages/Cadastro';

const RootRedirect = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/login" replace /> : <Navigate to="/login" replace />;
};


const PrivateLayoutRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<RootRedirect />} />
          <Route path="/localizacao" element={<PrivateLayoutRoute><Localizacao /></PrivateLayoutRoute>} />
          <Route path="/sensores" element={<PrivateLayoutRoute><Sensores /></PrivateLayoutRoute>} />
          <Route path="/novosensor" element={<PrivateLayoutRoute><NovoSensor /></PrivateLayoutRoute>} />
          <Route path="/historico" element={<PrivateLayoutRoute><Historico /></PrivateLayoutRoute>} />
          <Route path="/ambientes" element={<PrivateLayoutRoute><Ambientes /></PrivateLayoutRoute>} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;