// src/components/Layout.jsx
import React from 'react';
import Lateral from './Lateral';
import Rodape from './Rodape';
import Cabecalho from './Cabecalho';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Cabecalho />

      <div className="main-content-wrapper">
        <Lateral />
        <div className="page-content">
          {children}
        </div>
      </div>

      <Rodape />
    </div>
  );
};

export default Layout;