import { spotifyRequest } from './lib/spotify.js';
import { enrichTracksWithLabels } from './lib/batchProcessor.js';
import { handleError, validateParams } from './lib/errorHandler.js';

/**
 * GET /api/artist-tracks
 * Retorna faixas do artista com gravadora (batch otimizado)
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
    const { id, market = 'BR', offset = '0', limit = '20' } = req.query;

    validateParams({ id }, ['id']);

    const offsetNum = parseInt(offset);
    const limitNum = parseInt(limit);

    // Para a primeira página, usa top tracks
    if (offsetNum === 0) {
      const topTracks = await spotifyRequest(
        `/artists/${id}/top-tracks?market=${market}`
      );

      // Enriquece com gravadoras em batch
      const enrichedTracks = await enrichTracksWithLabels(topTracks.tracks);

      return res.status(200).json({
        tracks: enrichedTracks.slice(0, limitNum),
        total: enrichedTracks.length,
        offset: offsetNum,
        limit: limitNum,
        hasMore: enrichedTracks.length > limitNum
      });
    }

    // Para páginas seguintes, busca álbuns do artista e extrai tracks
    const albums = await spotifyRequest(
      `/artists/${id}/albums?limit=${limitNum}&offset=${offsetNum}&include_groups=album,single`
    );

    if (!albums.items || albums.items.length === 0) {
      return res.status(200).json({
        tracks: [],
        total: albums.total || 0,
        offset: offsetNum,
        limit: limitNum,
        hasMore: false
      });
    }

    // Busca tracks de cada álbum
    const tracksPromises = albums.items.map(album =>
      spotifyRequest(`/albums/${album.id}/tracks?limit=1`)
    );

    const tracksResponses = await Promise.all(tracksPromises);

    // Flatten e formata tracks
    const tracks = tracksResponses
      .flatMap(response => response.items)
      .filter(track => track)
      .map(track => ({
        ...track,
        album: albums.items.find(album =>
          album.id === track.uri?.split(':')[2]?.split('/')[0]
        )
      }));

    // Enriquece com gravadoras
    const enrichedTracks = await enrichTracksWithLabels(tracks);

    return res.status(200).json({
      tracks: enrichedTracks,
      total: albums.total,
      offset: offsetNum,
      limit: limitNum,
      hasMore: albums.next !== null
    });

  } catch (error) {
    return handleError(error, res);
  }
};
