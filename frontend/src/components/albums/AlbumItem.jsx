import { formatDate } from '../../utils/formatters';

export default function AlbumItem({ album, index }) {
  return (
    <div className="card">
      <div className="flex gap-4">
        {album.image && (
          <img
            src={album.image}
            alt={album.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-gray-500 font-semibold mr-2">#{index + 1}</span>
              <h3 className="inline font-semibold text-white text-lg">{album.name}</h3>
            </div>

            {album.external_url && (
              <a
                href={album.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-spotify-violet text-sm"
              >
                Spotify
              </a>
            )}
          </div>

          <p className="text-sm text-gray-400 mb-3">{album.artists}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Lançamento:</span>
              <p className="text-gray-300">{formatDate(album.releaseDate)}</p>
            </div>

            <div>
              <span className="text-gray-500">Gravadora:</span>
              <p className="text-gray-300">{album.label}</p>
            </div>

            <div>
              <span className="text-gray-500">Faixas:</span>
              <p className="text-gray-300">{album.totalTracks}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
