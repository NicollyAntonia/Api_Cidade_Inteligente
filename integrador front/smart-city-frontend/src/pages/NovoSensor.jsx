import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSensor } from '../api/sensores';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import '../styles/NovoSensor.css';
import { WiCelsius } from "react-icons/wi";
import { IoThermometerOutline, IoBusiness, IoPinSharp } from "react-icons/io5";
import { Bs123, BsPlusSlashMinus } from "react-icons/bs";

const NovoSensor = () => {
  const [tipo, setTipo] = useState('');
  const [ambiente, setAmbiente] = useState('');
  const [unidadeMedida, setUnidadeMedida] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const [situacao, setSituacao] = useState('ativo');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [ambientes, setAmbientes] = useState([]);

  const { token } = useAuth();
  const navigate = useNavigate();

  // Buscar os ambientes disponíveis ao carregar a página
  useEffect(() => {
    const fetchAmbientes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/ambientes/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAmbientes(response.data);
      } catch (error) {
        console.error('Erro ao carregar ambientes:', error);
      }
    };
    fetchAmbientes();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novoSensor = {
      tipo,
      ambiente: parseInt(ambiente),
      mac_address: macAddress,
      unidade_medida: unidadeMedida,
      status: situacao === 'ativo',
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    try {
      await createSensor(novoSensor, token);
      alert('Sensor cadastrado com sucesso!');
      navigate('/sensores');
    } catch (error) {
      console.error('Erro ao cadastrar sensor:', error.response?.data || error.message);
      alert('Erro ao cadastrar sensor. Verifique os dados e tente novamente.');
    }
  };

  return (
    <main className="pagina-novo-sensor">
      <article className="content-area">
        <header className="page-header">
          <h1 className="page-title">Cadastro de sensor</h1>
        </header>

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <fieldset className="campo-formulario">
              <label htmlFor="tipo" className="label-campo">Tipo sensor</label>
              <div className="input-wrapper">
                <select
                  id="tipo"
                  className="input-campo"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="temperatura">Temperatura</option>
                  <option value="umidade">Umidade</option>
                  <option value="luminosidade">Luminosidade</option>
                  <option value="contador">Contador</option>
                </select>
                <IoThermometerOutline className="input-icon" />
              </div>
            </fieldset>

            <fieldset className="campo-formulario">
              <label htmlFor="ambiente" className="label-campo">Ambiente</label>
              <div className="input-wrapper">
                <select
                  id="ambiente"
                  className="input-campo"
                  value={ambiente}
                  onChange={(e) => setAmbiente(e.target.value)}
                  required
                >
                  <option value="">Selecione</option>
                  {ambientes.map((amb) => (
                    <option key={amb.id} value={amb.id}>{amb.nome}</option>
                  ))}
                </select>
                <IoBusiness className="input-icon" />
              </div>
            </fieldset>

            <fieldset className="campo-formulario">
              <label htmlFor="unidade" className="label-campo">Unidade de Medida</label>
              <div className="input-wrapper">
                <input
                  id="unidade"
                  type="text"
                  className="input-campo"
                  value={unidadeMedida}
                  onChange={(e) => setUnidadeMedida(e.target.value)}
                  placeholder="@exemplo: ºC ou %"
                />
                <WiCelsius className="input-icon" />
              </div>
            </fieldset>

            <fieldset className="campo-formulario">
              <label htmlFor="mac" className="label-campo">Mac address</label>
              <div className="input-wrapper">
                <input
                  id="mac"
                  type="text"
                  className="input-campo"
                  value={macAddress}
                  onChange={(e) => setMacAddress(e.target.value)}
                  placeholder="@exemplo: 7C1A385F9DE2"
                />
                <Bs123 className="input-icon" />
              </div>
            </fieldset>

            <fieldset className="campo-formulario">
              <label htmlFor="situacao" className="label-campo">Situação</label>
              <div className="input-wrapper">
                <select
                  id="situacao"
                  className="input-campo"
                  value={situacao}
                  onChange={(e) => setSituacao(e.target.value)}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
                <BsPlusSlashMinus className="input-icon" />
              </div>
            </fieldset>

            <fieldset className="campo-formulario">
              <label htmlFor="longitude" className="label-campo">Longitude</label>
              <div className="input-wrapper">
                <input
                  id="longitude"
                  type="number"
                  step="any"
                  className="input-campo"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="@exemplo: -46.633308"
                />
                <IoPinSharp className="input-icon" />
              </div>
            </fieldset>

            <fieldset className="campo-formulario">
              <label htmlFor="latitude" className="label-campo">Latitude</label>
              <div className="input-wrapper">
                <input
                  id="latitude"
                  type="number"
                  step="any"
                  className="input-campo"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="@exemplo: -23.550520"
                />
                <IoPinSharp className="input-icon" />
              </div>
            </fieldset>

            <footer className="rodape-formulario">
              <button type="submit" className="botao-salvar">
                Criar sensor
              </button>
            </footer>
          </form>
        </div>
      </article>
    </main>
  );
};

export default NovoSensor;
