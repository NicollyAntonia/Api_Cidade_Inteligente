import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import '../styles/Historico.css';
import { IoSearchCircle } from "react-icons/io5";

const Historico = () => {
  const { token } = useAuth();
  const [historico, setHistorico] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const res = await axios.get('http://localhost:8000/historico/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistorico(res.data);
      } catch (error) {
        console.error('Erro ao buscar histórico:', error);
      }
    };

    fetchHistorico();
  }, [token]);

  const historicoFiltrado = historico.filter(item =>
    item.sensor.toString().includes(filtro) ||
    item.tipo?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <main className="pagina-historico">
      <section className="historico-container">
        <header className="historico-header">
          <h1>Histórico de Sensores</h1>
          <input
            type="text"
            placeholder="Filtrar por ID do sensor ou tipo"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="filtro-input"
          />
          <IoSearchCircle className="icon-pesquisa-historico" />
        </header>

        <table className="historico-tabela">
          <thead>
            <tr>
              <th>Sensor</th>
              <th>Tipo</th>
              <th>Ação</th>
              <th>Data</th>
              <th>Dados Anteriores</th>
            </tr>
          </thead>
          <tbody>
            {historicoFiltrado.map((item) => (
              <tr key={item.id}>
                <td>{item.sensor}</td>
                <td>{item.tipo || 'N/A'}</td>
                <td>{item.acao}</td>
                <td>{new Date(item.data).toLocaleString()}</td>
                <td>
                  <pre className="historico-json">
                    {item.dados_anteriores
                      ? JSON.stringify(item.dados_anteriores, null, 2)
                      : 'N/A'}
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
