import { formatDuration, formatDate } from '../../utils/formatters';

export default function TrackItem({ track, index }) {
  return (
    <div className="card mb-4">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-1 text-gray-500 font-semibold">
          #{index + 1}
        </div>

        <div className="col-span-7 md:col-span-4">
          <h3 className="font-semibold text-white mb-1">{track.name}</h3>
          <p className="text-sm text-gray-400">{track.artists}</p>
        </div>

        <div className="col-span-4 md:col-span-3 hidden md:block">
          <p className="text-sm text-gray-400">{track.album}</p>
        </div>

        <div className="col-span-2 md:col-span-2 text-center">
          <p className="text-sm text-gray-400">{formatDate(track.releaseDate)}</p>
        </div>

        <div className="col-span-2 md:col-span-1 text-center">
          <p className="text-sm text-gray-400">{formatDuration(track.duration)}</p>
        </div>

        <div className="col-span-2 md:col-span-1 text-right">
          {track.external_url && (
            <a
              href={track.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-spotify-violet text-sm"
            >
              Spotify
            </a>
          )}
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        <strong>Gravadora:</strong> {track.label}
      </div>
    </div>
  );
}
