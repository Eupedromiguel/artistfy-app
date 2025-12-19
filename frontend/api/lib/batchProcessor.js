import { spotifyRequest } from './spotify.js';

/**
 * Busca informações de múltiplos álbuns em batch (até 20 por vez)
 * @param {string[]} albumIds - Array de IDs de álbuns
 * @returns {Promise<Map<string, object>>} Mapa de albumId -> album data
 */
async function fetchAlbumsBatch(albumIds) {
  if (!albumIds || albumIds.length === 0) {
    return new Map();
  }

  // Remove duplicatas
  const uniqueIds = [...new Set(albumIds)];
  const albumMap = new Map();

  // Spotify permite até 20 álbuns por chamada
  const batchSize = 20;
  const batches = [];

  for (let i = 0; i < uniqueIds.length; i += batchSize) {
    batches.push(uniqueIds.slice(i, i + batchSize));
  }

  // Processa batches em paralelo
  const responses = await Promise.all(
    batches.map(batch => {
      const ids = batch.join(',');
      return spotifyRequest(`/albums?ids=${ids}`);
    })
  );

  // Constrói o mapa
  responses.forEach(response => {
    if (response.albums) {
      response.albums.forEach(album => {
        if (album) {
          albumMap.set(album.id, {
            label: album.label,
            releaseDate: album.release_date,
            totalTracks: album.total_tracks,
            name: album.name,
            images: album.images
          });
        }
      });
    }
  });

  return albumMap;
}

/**
 * Enriquece tracks com informações de gravadora usando batch
 * @param {object[]} tracks - Array de tracks
 * @returns {Promise<object[]>} Tracks enriquecidas com label
 */
async function enrichTracksWithLabels(tracks) {
  // Extrai IDs únicos de álbuns
  const albumIds = tracks
    .filter(track => track.album && track.album.id)
    .map(track => track.album.id);

  // Busca informações dos álbuns em batch
  const albumMap = await fetchAlbumsBatch(albumIds);

  // Enriquece as tracks
  return tracks.map(track => {
    const albumInfo = albumMap.get(track.album?.id);

    return {
      id: track.id,
      name: track.name,
      artists: track.artists?.map(a => a.name).join(', ') || '',
      album: track.album?.name || '',
      releaseDate: albumInfo?.releaseDate || track.album?.release_date || '',
      duration: track.duration_ms,
      label: albumInfo?.label || 'N/A',
      preview_url: track.preview_url,
      external_url: track.external_urls?.spotify || ''
    };
  });
}

export {
  fetchAlbumsBatch,
  enrichTracksWithLabels
};
