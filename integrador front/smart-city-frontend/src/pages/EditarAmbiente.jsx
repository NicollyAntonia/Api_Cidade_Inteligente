import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import '../styles/EditarAmbiente.css';
import { useAuth } from '../auth/AuthContext';
import { getAmbiente, updateAmbiente } from '../api/ambientes';
import { useNavigate, useParams } from 'react-router-dom';

const EditarAmbiente = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [dados, setDados] = useState({ sig: '', descricao: '', ni: '', responsavel: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAmbiente(id, token)
      .then(res => setDados(res.data))
      .catch(() => setError('Erro ao carregar.'))
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleChange = e =>
    setDados({ ...dados, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateAmbiente(id, dados, token);
      navigate('/ambientes');
    } catch {
      setError('Erro ao atualizar.');
    }
  };

  if (loading) return <Layout><p>Carregando...</p></Layout>;

  return (
    <Layout>
      <div className="pagina-editar-ambiente">
        <div className="content-area-editar">
          <header className="page-header-editar">
            <h2 className="page-title-editar">Editar Ambiente</h2>
          </header>

          {error && <p className="mensagem-erro">{error}</p>}

          <form onSubmit={handleSubmit} className="form-card-editar">
            {['sig', 'descricao', 'ni', 'responsavel'].map(field => (
              <div key={field} className="campo-formulario-editar">
                <label className="label-campo-editar" htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                <div className="input-wrapper-editar">
                  <input
                    id={field}
                    name={field}
                    value={dados[field]}
                    onChange={handleChange}
                    required
                    className="input-campo-editar"
                    placeholder={`Digite o ${field}`}
                  />
                </div>
              </div>
            ))}

            <div className="rodape-formulario-editar">
              <button type="submit" className="botao-salvar-editar">Atualizar</button>

            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditarAmbiente;
