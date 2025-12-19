import { formatDuration, formatDate } from './formatters';

/**
 * Exporta faixas para PDF (implementação simples usando window.print)
 * @param {Array} tracks - Array de faixas
 * @param {string} artistName - Nome do artista
 */
export function exportTracksToPDF(tracks, artistName) {
  // Cria janela temporária para impressão
  const printWindow = window.open('', '_blank');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Faixas - ${artistName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            color: #A327F5;
            border-bottom: 2px solid #A327F5;
            padding-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background-color: #1DB954;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <h1>Faixas - ${artistName}</h1>
        <p><strong>Total de faixas:</strong> ${tracks.length}</p>
        <p><strong>Data de geração:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Música</th>
              <th>Artista(s)</th>
              <th>Álbum</th>
              <th>Lançamento</th>
              <th>Duração</th>
              <th>Gravadora</th>
            </tr>
          </thead>
          <tbody>
            ${tracks.map((track, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${track.name}</td>
                <td>${track.artists}</td>
                <td>${track.album}</td>
                <td>${formatDate(track.releaseDate)}</td>
                <td>${formatDuration(track.duration)}</td>
                <td>${track.label}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p>Relatório gerado via artistFy - Dados do Spotify</p>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();

  // Aguarda carregar e abre diálogo de impressão
  printWindow.onload = () => {
    printWindow.print();
  };
}

/**
 * Exporta álbuns para PDF
 * @param {Array} albums - Array de álbuns
 * @param {string} artistName - Nome do artista
 */
export function exportAlbumsToPDF(albums, artistName) {
  const printWindow = window.open('', '_blank');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Álbuns - ${artistName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            color: #A327F5;
            border-bottom: 2px solid #A327F5;
            padding-bottom: 10px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background-color: #1DB954;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            color: #666;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <h1>Álbuns - ${artistName}</h1>
        <p><strong>Total de álbuns:</strong> ${albums.length}</p>
        <p><strong>Data de geração:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Álbum</th>
              <th>Artista(s)</th>
              <th>Lançamento</th>
              <th>Gravadora</th>
              <th>Nº Faixas</th>
            </tr>
          </thead>
          <tbody>
            ${albums.map((album, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${album.name}</td>
                <td>${album.artists}</td>
                <td>${formatDate(album.releaseDate)}</td>
                <td>${album.label}</td>
                <td>${album.totalTracks}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="footer">
          <p>Relatório gerado via artistFy - Dados do Spotify</p>
        </div>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();

  printWindow.onload = () => {
    printWindow.print();
  };
}
