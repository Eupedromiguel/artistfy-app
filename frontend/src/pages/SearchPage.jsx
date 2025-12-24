import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchArtists } from '../services/artistService';
import SearchBar from '../components/common/SearchBar';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatFollowers } from '../utils/formatters';
import { MESSAGES } from '../utils/constants';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q');

  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    async function fetchArtists() {
      setLoading(true);
      setError(null);

      try {
        const data = await searchArtists(query);
        setArtists(data.artists);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchArtists();
  }, [query]);

  const handleSearch = (newQuery) => {
    navigate(`/pesquisa?q=${encodeURIComponent(newQuery)}`);
  };

  const handleSelectArtist = (artistId) => {
    navigate(`/artista/${artistId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && <LoadingSpinner />}

      {error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && artists.length === 0 && query && (
        <div className="text-center text-gray-400">
          <p>{MESSAGES.NO_RESULTS}</p>
        </div>
      )}

      {!loading && artists.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Resultados para "{query}"
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <button
                key={artist.id}
                onClick={() => handleSelectArtist(artist.id)}
                className="artist-card text-left"
              >
                {artist.image && (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <h3 className="text-lg font-bold mb-2 truncate">
                  {artist.name}
                </h3>

                <p className="text-sm text-gray-400 mb-2">
                  {formatFollowers(artist.followers)} seguidores
                </p>

                {artist.genres && artist.genres.length > 0 && (
                  <p className="text-xs text-gray-500 truncate">
                    {artist.genres.slice(0, 2).join(', ')}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
