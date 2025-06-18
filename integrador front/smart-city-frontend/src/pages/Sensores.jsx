import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getSensores, deleteSensor } from '../api/sensores';
import { useAuth } from '../auth/AuthContext';
import Lateral from '../components/Lateral';
import '../styles/Sensores.css';

const Sensores = () => {
  const { token } = useAuth();
  const [sensores, setSensores] = useState([]);
  const [filtro, setFiltro] = useState('');

  const carregarSensores = useCallback(async () => {
    const res = await getSensores(token);
    setSensores(res.data);
  }, [token]);

  useEffect(() => {
    carregarSensores();
  }, [carregarSensores]);

  // 🔍 Filtra por ID ou Tipo
  const filtrarSensores = () => {
    return sensores.filter(s =>
      s.tipo.toLowerCase().includes(filtro.toLowerCase()) ||
      s.id.toString().includes(filtro)
    );
  };

  const excluir = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar?")) {
      await deleteSensor(id, token);
      carregarSensores();
    }
  };

  return (
    <main className="pagina-sensores">
      <Lateral />
      <section className="conteudo">
        <header className="cabecalho">
          <h1>Sensores</h1>
          <input
            type="text"
            placeholder="Filtrar por ID ou tipo"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="filtro-input"
          />
        </header>
        <section className="tabela-sensores">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtrarSensores().map(sensor => (
                <tr key={sensor.id}>
                  <td>{sensor.id}</td>
                  <td>{sensor.tipo}</td>
                  <td>{sensor.valor}</td>
                  <td>{sensor.status}</td>
                  <td className="acoes">
                    <Link to={`/sensores/${sensor.id}/edit`} className="editar">Editar</Link>
                    <button onClick={() => excluir(sensor.id)} className="excluir">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
};

export default Sensores;
