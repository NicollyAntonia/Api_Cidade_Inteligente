import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { Bs123 } from "react-icons/bs";
import '../styles/Cadastro.css';
import { registrarUsuario } from '../api/usuarios'; 

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await registrarUsuario({ username, password }); 
      setSuccess('Cadastro realizado com sucesso! Redirecionando...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Erro no cadastro:', err);
      const mensagem = err.response?.data?.erro || 'Erro ao cadastrar usuário.';
      setError(mensagem);
    }
  };

  return (
    <main className="pagina-login">
      <section className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Cadastro</h1>

          <label htmlFor="username">Usuário</label>
          <div className="input-wrapper">
            <input
              id="username"
              type="text"
              placeholder="Ex: maria"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <IoPersonCircleOutline className="icon" />
          </div>

          
          
          <label htmlFor="password">Senha</label>
          <div className="input-wrapper">
            <input
              id="password"
              type="password"
              placeholder="Crie sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Bs123 className="icon" />
          </div>

          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <div className="input-wrapper">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <Bs123 className="icon" />
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <button type="submit">Cadastrar</button>

          <p className="login">
            Já tem uma conta? <Link to="/login">Faça login aqui</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Cadastro;
