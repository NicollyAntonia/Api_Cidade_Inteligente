import React from 'react';
import '../styles/Cabecalho.css'; 
import logoSmartCity from '../assets/logo.png'; 

const Cabecalho = () => {
  return (
    <header className="cabecalho-principal">
      <div className="conteudo-cabecalho">
        <img 
          src={logoSmartCity} 
          alt="Logo Smart City" 
          className="logo-cabecalho" 
        />
      </div>
    </header>
  );
};

export default Cabecalho;