import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Ambientes.css'; // Certifique-se de que o CSS está linkado corretamente
import { useAuth } from '../auth/AuthContext';


const Ambientes = () => {
  const [ambientes, setAmbientes] = useState([]);
  const [filtro, setFiltro] = useState(''); // Adicionado estado para o filtro
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    axios.get('http://localhost:8000/ambientes/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => setAmbientes(response.data))
    .catch(error => console.error('Erro ao carregar ambientes:', error));
  }, [token]);

  // Lógica de filtro para os ambientes
  const ambientesFiltrados = ambientes.filter(ambiente =>
    ambiente.sig?.toLowerCase().includes(filtro.toLowerCase()) ||
    ambiente.descricao?.toLowerCase().includes(filtro.toLowerCase()) ||
    ambiente.ni?.toLowerCase().includes(filtro.toLowerCase()) ||
    ambiente.responsavel?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <main className="pagina-ambientes">
      {/* O section abaixo agora atua como o "card" principal */}
      <section className="conteudo-ambientes">
        <header className="cabecalho-ambientes">
          <h1>Ambientes</h1>
          {/* Campo de filtro adicionado */}
          <input
            type="text"
            placeholder="Filtrar por SIG, descrição, NI ou responsável"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="filtro-input-ambientes" // Classe específica para o filtro de ambientes
          />
        </header>

        {/* A tabela agora substitui a lista de cartões */}
        <div className="tabela-ambientes">
          <table>
            <thead>
              <tr>
                <th>SIG</th>
                <th>Descrição</th>
                <th>NI</th>
                <th>Responsável</th>
              </tr>
            </thead>
            <tbody>
              {ambientesFiltrados.length === 0 ? (
                <tr>
                  {/* colSpan para que a mensagem ocupe todas as colunas da tabela */}
                  <td colSpan="4" className="vazio" style={{textAlign: 'center', fontStyle: 'italic'}}>
                    Nenhum ambiente encontrado.
                  </td>
                </tr>
              ) : (
                // Aplica .slice(0, 10) para limitar a lista aos primeiros 10 itens
                ambientesFiltrados.slice(0, 10).map((ambiente) => (
                  <tr key={ambiente.id}>
                    <td>{ambiente.sig || `Ambiente ${ambiente.id}`}</td>
                    <td>{ambiente.descricao}</td>
                    <td>{ambiente.ni || 'N/A'}</td> {/* Exibe 'N/A' se NI for null/undefined */}
                    <td>{ambiente.responsavel || 'N/A'}</td> {/* Exibe 'N/A' se Responsável for null/undefined */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default Ambientes;