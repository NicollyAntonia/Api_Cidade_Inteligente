import React from 'react';
import '../styles/Localizacao.css';
import Lateral from '../components/Lateral'; 

const Localizacao = () => {
  return (
    <main className="pagina-localizacao">
      <Lateral />
      <section className="content">
        <h1>Localização</h1>
        <div className="map-container">
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.855724982013!2d-73.84558228415365!3d40.72087547933068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25f51b05d8f1d%3A0xa5e4c2fcbb7421b9!2sForest%20Hills%2C%20Queens%2C%20NY%2011375%2C%20EUA!5e0!3m2!1spt-BR!2sbr!4v1717671680037!5m2!1spt-BR!2sbr"

          ></iframe>
        </div>
      </section>
    </main>
  );
};

export default Localizacao;
