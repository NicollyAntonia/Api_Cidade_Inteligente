import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import { Bs123 } from "react-icons/bs";
import { MdEmail } from "react-icons/md"; // Importing an email icon
import '../styles/Login.css'; // Reusing the same CSS for consistent styling

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // In a real application, you would make an API call here to register the user.
    // For demonstration, we'll simulate a successful registration.
    try {
      // const response = await registerAPI(username, email, password); // Example API call
      // console.log('Resposta do cadastro:', response.data);

      // Simulate a successful registration
      console.log('Usuário registrado:', { username, email });
      setSuccess('Cadastro realizado com sucesso! Você pode fazer login agora.');
      
      // Optionally, redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); 

    } catch (err) {
      console.error('Erro na requisição de cadastro:', err);
      setError('Ocorreu um erro ao tentar cadastrar. Tente novamente.');
    }
  };

  return (
    <main className="pagina-login"> {/* Reusing the same main container styling */}
      <section className="login-container"> {/* Reusing the same section styling */}
        <form onSubmit={handleSubmit} className="login-form"> {/* Reusing the same form styling */}
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

          <label htmlFor="email">Email</label>
          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              placeholder="Ex: seuemail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <MdEmail className="icon" />
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
          {success && <p className="success">{success}</p>} {/* Add a success message */}

          <button type="submit">Cadastrar</button>

          <p className="login">
            Já tem uma conta? <Link to="/api/token">Faça login aqui</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Cadastro;