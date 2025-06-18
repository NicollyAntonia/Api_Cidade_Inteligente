// src/pages/Ambientes.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Ambientes.css';
import Lateral from '../components/Lateral';

const Ambientes = () => {
  const [ambientes, setAmbientes] = useState([]);

  useEffect(() => {
    // URL da API 
    axios.get('http://localhost:8000/api/ambientes/')
      .then(response => setAmbientes(response.data))
      .catch(error => console.error('Erro ao carregar ambientes:', error));
  }, []);

  return (
    <main className="pagina-ambientes">
      <Lateral />
      <header className="cabecalho-ambientes">
        <h1>Ambientes</h1>
        <p>Lista dos ambientes cadastrados</p>
      </header>

      <section className="lista-ambientes">
        {ambientes.length === 0 ? (
          <p className="vazio">Nenhum ambiente encontrado.</p>
        ) : (
          ambientes.map((ambiente) => (
            <article key={ambiente.id} className="cartao-ambiente">
              <h2>{ambiente.sig || `Ambiente ${ambiente.id}`}</h2>
              <p><strong>Descrição:</strong> {ambiente.descricao}</p>
              {ambiente.ni && <p><strong>NI:</strong> {ambiente.ni}</p>}
              {ambiente.responsavel && <p><strong>Responsável:</strong> {ambiente.responsavel}</p>}
            </article>
          ))
        )}
      </section>
    </main>
  );
};

export default Ambientes;
