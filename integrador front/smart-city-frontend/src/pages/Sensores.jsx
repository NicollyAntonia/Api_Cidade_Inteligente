import React, { useEffect, useState, useCallback } from 'react';
import { getSensores } from '../api/sensores';
import { useAuth } from '../auth/AuthContext';
import '../styles/Sensores.css'; // O CSS principal está aqui
import { IoSearchCircle } from "react-icons/io5";

const Sensores = () => {
  const { token } = useAuth();
  const [sensores, setSensores] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarSensores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getSensores(token);
      setSensores(res.data);
    } catch (err) {
      console.error("Erro ao carregar sensores:", err);
      setError("Erro ao carregar sensores. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    carregarSensores();
  }, [carregarSensores]);

  const filtrarSensores = () => {
    if (!filtro) {
      return sensores;
    }

    const termoFiltro = filtro.toLowerCase();
    return sensores.filter(s => {
      const statusTexto = typeof s.status === 'boolean' ? (s.status ? 'ativo' : 'inativo') : String(s.status).toLowerCase();
      
      return (
        String(s.id).toLowerCase().includes(termoFiltro) ||
        s.tipo.toLowerCase().includes(termoFiltro) ||
        statusTexto.includes(termoFiltro)
      );
    });
  };

  return (
    <div className="pagina-sensores">
      <div className="conteudo">
        <div className="sensores-container">
          
          <section className="secao-controles-sensores">
            <h1>Sensores</h1>
            <div className="filtro-container">
              <input
                type="text"
                placeholder="Filtrar por ID ou tipo"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="filtro-input"
              />
              <IoSearchCircle className="icon-pesquisa" />
            </div>
          </section>

          <section className="tabela-sensores">
            {loading ? (
              <p className="mensagem-status">Carregando sensores...</p>
            ) : error ? (
              <p className="mensagem-erro">{error}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tipo</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrarSensores().length > 0 ? (
                    filtrarSensores().map(sensor => ( // Corrigido de "Senadores" para "Sensores"
                      <tr key={sensor.id}>
                        <td>{sensor.id}</td>
                        <td>{sensor.tipo}</td>
                        <td>
                          {typeof sensor.status === 'boolean' ? (sensor.status ? 'Ativo' : 'Inativo') : sensor.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="mensagem-sem-resultados">
                        Nenhum sensor encontrado com os critérios de filtro.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};

export default Sensores;