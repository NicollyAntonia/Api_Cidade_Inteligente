import React, { useEffect, useState, useCallback } from 'react';
import { getSensores, deleteSensor } from '../api/sensores'; // Certifique-se que deleteSensor existe
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Sensores.css';
import { IoSearchCircle } from "react-icons/io5";
import {  FaEdit, FaTrash } from 'react-icons/fa';

const Sensores = () => {
  const { token } = useAuth();
  const [sensores, setSensores] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este sensor?")) {
      try {
        await deleteSensor(id, token);
        carregarSensores(); // Atualiza a lista após excluir
      } catch (err) {
        console.error("Erro ao excluir sensor:", err);
        setError("Erro ao excluir sensor.");
      }
    }
  };

  const filtrarSensores = () => {
    if (!filtro) return sensores;
    const termo = filtro.toLowerCase();
    return sensores.filter(s => {
      const statusTexto = typeof s.status === 'boolean' ? (s.status ? 'ativo' : 'inativo') : String(s.status).toLowerCase();
      return (
        String(s.id).includes(termo) ||
        s.tipo.toLowerCase().includes(termo) ||
        statusTexto.includes(termo)
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
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrarSensores().length > 0 ? (
                    filtrarSensores().map(sensor => (
                      <tr key={sensor.id}>
                        <td>{sensor.id}</td>
                        <td>{sensor.tipo}</td>
                        <td>{typeof sensor.status === 'boolean' ? (sensor.status ? 'Ativo' : 'Inativo') : sensor.status}</td>
                        <td>
                          <button onClick={() => navigate(`/sensores/${sensor.id}/editar`)} className="btn-acao editar">
                            <FaEdit />
                          </button>
                          <button onClick={() => handleDelete(sensor.id)} className="btn-acao excluir">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="mensagem-sem-resultados">
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
