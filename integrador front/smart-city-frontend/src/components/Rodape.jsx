import React from 'react';
import '../styles/Rodape.css';
import SmartCityLogo from '../assets/logo.png'; 
import { IoLogoGithub, IoLogoTiktok, IoLogoLinkedin } from 'react-icons/io5';

const Rodape = () => {
  return (
    <footer className="rodape-smart-city">
      <div className="rodape-conteudo">
        <div className="rodape-logo">
          <img src={SmartCityLogo} alt="Smart City Logo" />
        </div>

        <div className="rodape-secao">
          <h3>Fale conosco</h3>
          <ul>
            <li>Ajuda</li>
          </ul>
        </div>

        <div className="rodape-secao">
          <h3>Acesse já</h3>
          <div className="redes-sociais">
            {/* Usando os componentes de ícone do React Icons */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <IoLogoGithub />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <IoLogoTiktok />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <IoLogoLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;