import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSensor } from '../api/sensores';
import { useAuth } from '../auth/AuthContext';
import Lateral from '../components/Lateral';
import '../styles/NovoSensor.css';
import axios from 'axios';

const NovoSensor = () => {
  const [tipo, setTipo] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [status, setStatus] = useState(true);
  const [ambiente, setAmbiente] = useState('');
  const [ambientes, setAmbientes] = useState([]);

  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ambientes/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAmbientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar ambientes:', error);
      }
    };
    fetchAmbientes();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novoSensor = {
      tipo,
      mac_address: macAddress,
      unidade_medida: unidadeMedida,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      status,
      ambiente: ambiente || null,
    };

    try {
      await createSensor(novoSensor, token);
      navigate('/sensores');
    } catch (error) {
      console.error('Erro ao cadastrar sensor:', error);
    }
  };

  return (
    <main className="pagina-novo-sensor">
      <Lateral />
      <article className="formulario-container">
        <header className="cabecalho-formulario">
          <h1 className="titulo-formulario">Cadastrar Novo Sensor</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <fieldset className="campo-formulario">
            <label htmlFor="tipo" className="label-campo">Tipo:</label>
            <input
              id="tipo"
              type="text"
              className="input-campo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
            />
          </fieldset>

          <fieldset className="campo-formulario">
            <label htmlFor="mac" className="label-campo">MAC Address:</label>
            <input
              id="mac"
              type="text"
              className="input-campo"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
            />
          </fieldset>

          <fieldset className="campo-formulario">
            <label htmlFor="unidade" className="label-campo">Unidade de Medida:</label>
            <input
              id="unidade"
              type="text"
              className="input-campo"
              value={unidadeMedida}
              onChange={(e) => setUnidadeMedida(e.target.value)}
            />
          </fieldset>

          <fieldset className="campo-formulario">
            <label htmlFor="latitude" className="label-campo">Latitude:</label>
            <input
              id="latitude"
              type="number"
              step="any"
              className="input-campo"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </fieldset>

          <fieldset className="campo-formulario">
            <label htmlFor="longitude" className="label-campo">Longitude:</label>
            <input
              id="longitude"
              type="number"
              step="any"
              className="input-campo"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </fieldset>

          <fieldset className="campo-formulario">
            <label htmlFor="status" className="label-campo">Status:</label>
            <input
              id="status"
              type="checkbox"
              className="input-checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            /> Ativo
          </fieldset>

          <fieldset className="campo-formulario">
            <label htmlFor="ambiente" className="label-campo">Ambiente:</label>
            <select
              id="ambiente"
              className="input-campo"
              value={ambiente}
              onChange={(e) => setAmbiente(e.target.value)}
            >
              <option value="">Selecione um ambiente</option>
              {ambientes.map((amb) => (
                <option key={amb.id} value={amb.id}>
                  {amb.nome}
                </option>
              ))}
            </select>
          </fieldset>

          <footer className="rodape-formulario">
            <button type="submit" className="botao-salvar">
              Salvar
            </button>
          </footer>
        </form>
      </article>
    </main>
  );
};

export default NovoSensor;
