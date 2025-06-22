import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { loginAPI } from '../api/auth';
import { useAuth } from '../auth/AuthContext';
import { IoPersonCircleOutline } from "react-icons/io5";
import { Bs123 } from "react-icons/bs";
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI(username, password);
      console.log('Resposta do login:', response.data);

      if (response.data && response.data.access) {
        login(response.data.access);
        console.log('Token salvo, navegando para /sensores');
        navigate('/sensores');
      } else {
        console.log('Token não recebido, erro no login');
        setError('Usuário ou senha inválidos.');
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <main className="pagina-login">
      <section className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Login</h1>

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
              placeholder="Ex: 123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Bs123 className="icon" />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Acessar conta</button>

          {/* New registration link */}
          <p className="cadastre-se">
            Não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;