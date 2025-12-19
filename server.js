import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importa as funções serverless
import searchArtist from './frontend/api/search-artist.js';
import artist from './frontend/api/artist.js';
import artistTracks from './frontend/api/artist-tracks.js';
import artistAlbums from './frontend/api/artist-albums.js';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Aumenta o limite de headers
app.use((req, _res, next) => {
  req.setMaxListeners(20);
  next();
});

// Adapta as funções serverless para Express
const adaptVercelFunction = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Rotas da API
app.get('/api/search-artist', adaptVercelFunction(searchArtist));
app.get('/api/artist', adaptVercelFunction(artist));
app.get('/api/artist-tracks', adaptVercelFunction(artistTracks));
app.get('/api/artist-albums', adaptVercelFunction(artistAlbums));

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`API Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
