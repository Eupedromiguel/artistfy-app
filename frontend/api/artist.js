import { spotifyRequest } from './lib/spotify.js';
import { handleError, validateParams } from './lib/errorHandler.js';

/**
 * GET /api/artist
 * Retorna dados básicos de um artista
 * Query params: id (ID do artista no Spotify)
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
    const { id } = req.query;

    validateParams({ id }, ['id']);

    // Busca dados do artista
    const artist = await spotifyRequest(`/artists/${id}`);

    // Formata resposta
    return res.status(200).json({
      id: artist.id,
      name: artist.name,
      image: artist.images[0]?.url || null,
      genres: artist.genres,
      followers: artist.followers.total,
      popularity: artist.popularity,
      external_url: artist.external_urls.spotify
    });

  } catch (error) {
    return handleError(error, res);
  }
};
