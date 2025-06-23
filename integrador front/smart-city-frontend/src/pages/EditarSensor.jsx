import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSensor, updateSensor } from '../api/sensores';
import { useAuth } from '../auth/AuthContext';
import Layout from '../components/Layout';
import '../styles/EditarSensor.css';

const EditarSensor = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [tipo, setTipo] = useState('');
  const [status, setStatus] = useState(true);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarSensor = async () => {
      try {
        const res = await getSensor(id, token);
        setTipo(res.data.tipo);
        setStatus(res.data.status);
      } catch (err) {
        setErro('Erro ao carregar dados do sensor.');
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    carregarSensor();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSensor(id, { tipo, status }, token);
      navigate('/sensores');
    } catch (err) {
      console.error(err);
      setErro('Erro ao atualizar sensor.');
    }
  };

  return (
    <Layout>
      <div className="pagina-editar-sensor">
        <div className="form-container">
          <h2>Editar Sensor</h2>
          {carregando ? (
            <p className="mensagem-status">Carregando dados do sensor...</p>
          ) : (
            <form onSubmit={handleSubmit} className="form-editar-sensor">
              {erro && <p className="mensagem-erro">{erro}</p>}

              <label>
                Tipo:
                <input
                  type="text"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                />
              </label>

              <label>
                Status:
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value === 'true')}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </label>

              <button type="submit">Salvar</button>
              <button type="button" onClick={() => navigate('/sensores')} className="btn-voltar">
                Cancelar
              </button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EditarSensor;
