import { spotifyRequest } from './lib/spotify.js';
import { fetchAlbumsBatch } from './lib/batchProcessor.js';
import { handleError, validateParams } from './lib/errorHandler.js';

/**
 * GET /api/artist-albums
 * Retorna álbuns do artista paginados
 * Query params: id (ID do artista), offset (padrão: 0), limit (padrão: 20)
 */
export default async (req, res) => {
  // Configura CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id, offset = '0', limit = '20' } = req.query;

    validateParams({ id }, ['id']);

    const offsetNum = parseInt(offset);
    const limitNum = parseInt(limit);

    // Busca álbuns do artista
    const data = await spotifyRequest(
      `/artists/${id}/albums?limit=${limitNum}&offset=${offsetNum}&include_groups=album,single`
    );

    if (!data.items || data.items.length === 0) {
      return res.status(200).json({
        albums: [],
        total: data.total || 0,
        offset: offsetNum,
        limit: limitNum,
        hasMore: false
      });
    }

    // Extrai IDs dos álbuns
    const albumIds = data.items.map(album => album.id);

    // Busca detalhes completos dos álbuns em batch
    const albumMap = await fetchAlbumsBatch(albumIds);

    // Formata resposta
    const albums = data.items.map(album => {
      const details = albumMap.get(album.id);

      return {
        id: album.id,
        name: album.name,
        releaseDate: details?.releaseDate || album.release_date,
        label: details?.label || 'N/A',
        totalTracks: details?.totalTracks || album.total_tracks,
        image: album.images[0]?.url || null,
        external_url: album.external_urls.spotify,
        artists: album.artists.map(a => a.name).join(', ')
      };
    });

    return res.status(200).json({
      albums,
      total: data.total,
      offset: offsetNum,
      limit: limitNum,
      hasMore: data.next !== null
    });

  } catch (error) {
    return handleError(error, res);
  }
};
