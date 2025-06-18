// src/pages/Historico.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import Lateral from '../components/Lateral';
import '../styles/Historico.css'; 

const Historico = () => {
  const { token } = useAuth();
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/historico/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistorico(res.data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      }
    };

    fetchHistorico();
  }, [token]);

  return (
    <main className="pagina-historico">
      <Lateral />
      <section className="historico-container">
        <header className="historico-header">
          <h1>Histórico de Sensores</h1>
        </header>
        <table className="historico-tabela">
          <thead>
            <tr>
              <th>Sensor</th>
              <th>Ação</th>
              <th>Data</th>
              <th>Dados Anteriores</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((item) => (
              <tr key={item.id}>
                <td>{item.sensor}</td>
                <td>{item.acao}</td>
                <td>{new Date(item.data).toLocaleString()}</td>
                <td>
                  <pre className="historico-json">
                    {item.dados_anteriores ? JSON.stringify(item.dados_anteriores, null, 2) : 'N/A'}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default Historico;
