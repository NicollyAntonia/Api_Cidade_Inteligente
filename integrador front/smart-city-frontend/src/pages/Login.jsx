import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../api/auth';
import { useAuth } from '../auth/AuthContext';
import { IoPersonCircleOutline } from "react-icons/io5";
import { Bs123 } from "react-icons/bs";
import '../styles/Login.css';

const Login = () => {
  const [nome, setNome] = useState(''); // primeiro nome do usuário
  const [matricula, setMatricula] = useState(''); // número de matrícula
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // substituindo os parâmetros email/senha por nome/matricula
      const response = await loginAPI(nome, matricula);
      login(response.data.access);
      navigate('/dashboard');
    } catch (err) {
      setError('Nome ou matrícula inválidos.');
    }
  };

  return (
    <main className="pagina-login">
      <section className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login</h1>

          <label htmlFor="nome">Primeiro Nome</label>
          <div className="input-wrapper">
            <input
              id="nome"
              type="text"
              placeholder="Ex: Maria"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <IoPersonCircleOutline className="icon"/>
            
          </div>

          <label htmlFor="matricula">Matrícula</label>
          <div className="input-wrapper">
            <input
              id="matricula"
              type="text"
              placeholder="Ex: 123456"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
            <Bs123 className="icon"/>
           
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Acessar conta</button>
        </form>
      </section>
    </main>
  );
};

export default Login;
