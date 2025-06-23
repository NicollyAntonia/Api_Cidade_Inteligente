import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Ambientes.css';
import { useAuth } from '../auth/AuthContext';
import { IoSearchCircle } from "react-icons/io5";
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';
import {
  getAmbientes,
  deleteAmbiente
} from '../api/ambientes';
import { useNavigate } from 'react-router-dom';

const Ambientes = () => {
  const { token } = useAuth();
  const [ambientes, setAmbientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const carregar = useCallback(async () => {
    try {
      const res = await getAmbientes(token);
      setAmbientes(res.data);
      setError(null);
    } catch {
      setError('Erro ao carregar ambientes.');
    }
  }, [token]);

  useEffect(() => {
    if (token) carregar();
  }, [token, carregar]);

  // Limita para os 10 mais recentes antes do filtro
  const ambientesRecentes = ambientes.slice(0, 10);

  const ambienteFiltrado = ambientesRecentes.filter(a =>
    [a.sig, a.descricao, a.ni, a.responsavel]
      .map(x => x?.toLowerCase())
      .some(t => t?.includes(filtro.toLowerCase()))
  );

  const handleDelete = async (id) => {
    if (window.confirm('Confirma exclusão desse ambiente?')) {
      try {
        await deleteAmbiente(id, token);
        carregar();
      } catch {
        setError('Erro ao excluir.');
      }
    }
  };

  return (
    <div className="pagina-ambientes">
      <section className="conteudo-ambientes">
        <header className="cabecalho-ambientes">
          <h1>Ambientes</h1>
          <div className="acoes-cabecalho" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div className="filtro-wrapper" style={{ position: 'relative', flex: 1 }}>
              <input
                placeholder="Filtrar..."
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
                className="filtro-input-ambientes"
              />
              <IoSearchCircle className="icon-pesquisa-ambientes" />
            </div>
            <button className="btn-novo" onClick={() => navigate('/ambientes/novo')} >
              <FaPlusCircle /> Novo
            </button>
          </div>
        </header>

        {error && <p className="mensagem-erro">{error}</p>}

        <div className="tabela-ambientes">
          <table>
            <thead>
              <tr>
                <th>SIG</th><th>Descrição</th><th>NI</th><th>Responsável</th><th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ambienteFiltrado.length === 0 ? (
                <tr>
                  <td colSpan="5" className="vazio">Nenhum ambiente encontrado.</td>
                </tr>
              ) : ambienteFiltrado.map(a => (
                <tr key={a.id}>
                  <td>{a.sig}</td>
                  <td>{a.descricao}</td>
                  <td>{a.ni}</td>
                  <td>{a.responsavel}</td>
                  <td className="td-acoes">
                    <button
                      onClick={() => navigate(`/ambientes/${a.id}/editar`)}
                      title="editar"
                      className="btn-acao editar"  
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      title="excluir"
                      className="btn-acao excluir"  
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Ambientes;
