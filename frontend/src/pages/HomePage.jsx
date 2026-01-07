import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar';
import { MESSAGES } from '../utils/constants';
import searchIcon from '../components/icons/icons8-pesquisar-100.png';
import audioIcon from '../components/icons/icons8-audiolivro-100.png';
import downloadIcon from '../components/icons/icons8-bloco-de-anotações-100.png';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/pesquisa?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
      {/* Background: imagem com blur */}
      <div
        className="absolute bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/img-bg.PNG)',
          filter: 'blur(7px)',
          opacity: 1,
          zIndex: -2,
          top: '-10%',
          bottom: '-20%',
          left: 0,
          right: 0,
          backgroundSize: 'cover',
        }}
      />

      {/* Overlay: gradiente suave */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 30%, transparent 100%)',
          zIndex: -1,
        }}
      />

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-6xl text-spotify-violet mb-4" style={{ textShadow: '0 10px 12px rgba(0, 0, 0, 0.8)' }}>
          artistFy
        </h1>
        <p className="text-xl text-gray-400 mb-2">
          Explore artistas do Spotify
        </p>
        <p className="text-sm text-gray-500">
          {MESSAGES.PUBLIC_DATA_NOTE}
        </p>
      </div>

      {/* Container com largura controlada */}
      <div className="relative z-10 w-full max-w-2xl">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl relative z-10">
        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <img
              src={searchIcon}
              alt="Pesquisar"
              className="w-12 h-12 transition-transform duration-300 hover:scale-110 hover:rotate-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">Pesquise Artistas</h3>
          <p className="text-sm text-gray-400">
            Encontre seus artistas favoritos no Spotify
          </p>
        </div>

        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <img
              src={audioIcon}
              alt="Visualize Dados"
              className="w-12 h-12 transition-transform duration-300 hover:scale-110 hover:-rotate-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">Visualize Dados</h3>
          <p className="text-sm text-gray-400">
            Explore faixas, álbuns e estatísticas
          </p>
        </div>

        <div className="text-center">
          <div className="mb-2 flex justify-center">
            <img
              src={downloadIcon}
              alt="Exporte Relatórios"
              className="w-12 h-12 transition-transform duration-300 hover:scale-110 hover:rotate-6"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2">Exporte Relatórios</h3>
          <p className="text-sm text-gray-400">
            Baixe dados em Excel ou PDF
          </p>
        </div>
      </div>
    </div>
  );
}
