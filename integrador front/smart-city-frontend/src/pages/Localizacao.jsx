import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Importa o CSS essencial do Leaflet
import '../styles/Localizacao.css'; // Seu arquivo CSS customizado

// === INÍCIO: Correção dos ícones do Leaflet no React ===
// Isso é necessário porque o Webpack (ou outro bundler) pode mudar os caminhos das imagens padrão do Leaflet.
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Cria um ícone padrão customizado com os caminhos corretos das imagens
let DefaultIcon = L.icon({
  iconUrl: iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41], // Ponto do ícone que corresponde à localização do marcador
  popupAnchor: [1, -34], // Ponto de onde o popup deve abrir em relação ao iconAnchor
});

// Sobrescreve o ícone padrão do Leaflet com o seu ícone customizado
L.Marker.prototype.options.icon = DefaultIcon;
// === FIM: Correção dos ícones do Leaflet no React ===


const Localizacao = () => {
  // Estado para armazenar a lista de sensores
  const [sensores, setSensores] = useState([]);
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState(null);

  // Hook useEffect para buscar os dados dos sensores quando o componente é montado
  useEffect(() => {
    // Tenta obter o token de autenticação do localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Usuário não autenticado. Faça login para ver a localização dos sensores.');
      return; // Interrompe a execução se não houver token
    }

    // Faz uma requisição GET para a API de sensores
    axios.get('http://localhost:8000/sensores/', {
      headers: { Authorization: `Bearer ${token}` } // Envia o token no cabeçalho de autorização
    })
    .then(response => {
      // Se a requisição for bem-sucedida, atualiza o estado 'sensores'
      setSensores(response.data);
      // Opcional: Para depuração, você pode logar os dados recebidos
      console.log('Dados dos sensores recebidos:', response.data);
    })
    .catch(err => {
      // Em caso de erro na requisição
      console.error('Erro ao buscar sensores:', err);
      if (err.response?.status === 401) {
        // Se o erro for 401 (Não Autorizado), o token pode estar inválido/expirado
        setError('Não autorizado. Token inválido ou expirado. Faça login novamente.');
      } else {
        // Para outros erros, exibe uma mensagem genérica
        setError('Erro ao carregar sensores. Verifique sua conexão ou o servidor.');
      }
    });
  }, []); // O array vazio [] como dependência garante que este efeito roda apenas uma vez, na montagem do componente.

  // Define a posição central do mapa.
  // Se houver sensores, usa a latitude e longitude do primeiro sensor.
  // Caso contrário, usa uma posição padrão (Belo Horizonte).
  const centroMapa = sensores.length > 0
    ? [sensores[0].latitude, sensores[0].longitude]
    : [-19.916681, -43.934493]; // Exemplo: Coordenadas de Belo Horizonte

  // Opcional: Para depuração, loga o centro atual e os sensores
  console.log('Centro do mapa definido como:', centroMapa);
  console.log('Sensores no estado para renderização:', sensores);

  return (
    <main className="pagina-localizacao">
      <section className="content">
        <h1>Localização dos Sensores</h1>

        {/* Exibe mensagem de erro, se houver */}
        {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

        {/* Exibe mensagem de carregamento se não houver erro e nenhum sensor ainda */}
        {!error && sensores.length === 0 && <p>Carregando sensores...</p>}

        {/* Renderiza o MapContainer somente se não houver erro.
            A condição `sensores.length > 0` não é mais estritamente necessária aqui se você quer que o mapa
            apareça imediatamente no centro padrão e se mova.
            A `key` abaixo garantirá a atualização do centro. */}
        {!error && (
          <MapContainer
            // A 'key' é crucial aqui! Ela força o MapContainer a ser remontado (re-inicializado)
            // sempre que o 'centroMapa' muda de valor (ou seja, quando os sensores são carregados
            // e o centro passa de Belo Horizonte para o primeiro sensor).
            key={sensores.length > 0 ? `${sensores[0].latitude}-${sensores[0].longitude}` : 'default-location'}
            center={centroMapa} // O centro inicial ou atual do mapa
            zoom={13} // Nível de zoom inicial
            scrollWheelZoom={true} // Permite zoom com a roda do mouse
            className="map-container" // Aplica as classes CSS definidas em Localizacao.css
          >
            {/* Camada de tiles (mapa base) do OpenStreetMap */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Renderiza um marcador para cada sensor na lista */}
            {sensores.map(sensor => (
              <Marker key={sensor.id} position={[sensor.latitude, sensor.longitude]}>
                {/* Popup que aparece ao clicar no marcador */}
                <Popup>
                  <strong>{sensor.nome || 'Sensor'}</strong><br />
                  Latitude: {sensor.latitude}<br />
                  Longitude: {sensor.longitude}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </section>
    </main>
  );
};

export default Localizacao;