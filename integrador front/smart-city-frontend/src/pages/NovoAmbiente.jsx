import React, { useState } from 'react';
import Layout from '../components/Layout';  // Importa o Layout
import '../styles/NovoAmbiente.css';  
import { useAuth } from '../auth/AuthContext';
import { createAmbiente } from '../api/ambientes';
import { useNavigate } from 'react-router-dom';

const NovoAmbiente = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [dados, setDados] = useState({ sig: '', descricao: '', ni: '', responsavel: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setDados({ ...dados, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createAmbiente(dados, token);
      navigate('/ambientes');
    } catch {
      setError('Erro ao criar ambiente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <main className="pagina-editar-ambiente">
        <section className="content-area-editar">
          <header className="page-header-editar">
            <h2 className="page-title-editar">Novo Ambiente</h2>
            {error && <p className="mensagem-erro">{error}</p>}
          </header>

          <form onSubmit={handleSubmit} className="formulario-ambiente">
            <label className="campo-formulario-editar" htmlFor="sig">
              SIG:
              <input
                id="sig"
                className="input-campo-editar"
                type="text"
                name="sig"
                value={dados.sig}
                onChange={handleChange}
                required
                placeholder="Digite o SIG"
              />
            </label>

            <label className="campo-formulario-editar" htmlFor="descricao">
              Descrição:
              <textarea
                id="descricao"
                className="input-campo-editar"
                name="descricao"
                value={dados.descricao}
                onChange={handleChange}
                required
                placeholder="Digite a descrição"
                rows={3}
              />
            </label>

            <label className="campo-formulario-editar" htmlFor="ni">
              NI:
              <input
                id="ni"
                className="input-campo-editar"
                type="text"
                name="ni"
                value={dados.ni}
                onChange={handleChange}
                placeholder="Digite o NI"
              />
            </label>

            <label className="campo-formulario-editar" htmlFor="responsavel">
              Responsável:
              <input
                id="responsavel"
                className="input-campo-editar"
                type="text"
                name="responsavel"
                value={dados.responsavel}
                onChange={handleChange}
                placeholder="Digite o responsável"
              />
            </label>

            <div className="rodape-formulario-editar">
              <button
                type="submit"
                className="botao-salvar-editar"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  );
};

export default NovoAmbiente;
