// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Sensores from './pages/Sensores';
import NovoSensor from './pages/NovoSensor';
import Localizacao from './pages/Localizacao';
import Historico from './pages/Historico';
import Ambientes from './pages/Ambientes';

const express = require('express');
const cors = require('cors');
const app = express();

// Configuração do CORS
const corsOptions = {
  origin: 'http://localhost:3000', // URL do seu front-end
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/api/dados', (req, res) => {
  res.json({ message: 'Dados recebidos com sucesso!' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});



/*import PrivateRoute from './auth/PrivateRoute';*/
import { AuthProvider, useAuth } from './auth/AuthContext';

const RootRedirect = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          {/* Rota raiz: redireciona conforme token */}
          <Route path="/" element={<RootRedirect />} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/localizacao"
            element={
                <Localizacao />
            }
          />

          <Route
            path="/sensores"
            element={
              /*<PrivateRoute>*/
                <Sensores />
               /*</PrivateRoute>*/
            }
          />

          <Route
            path="/novosensor"
            element={
               /*<PrivateRoute>*/
                <NovoSensor />
               /*</PrivateRoute>*/
            }
          />
          <Route
            path="/historico"
            element={
               /*<PrivateRoute>*/
                <Historico/>
               /*</PrivateRoute>*/
            }
          />
          <Route
            path="/ambientes"
            element={
               /*<PrivateRoute>*/
                <Ambientes/>
               /*</PrivateRoute>*/
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
