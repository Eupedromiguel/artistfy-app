export default function HowToUsePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Como usar o artistFy
      </h1>

      <div className="space-y-8">
        {/* Seção 1 */}
        <section className="bg-spotify-gray rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-spotify-green mb-4">
            1. Pesquisar Artistas
          </h2>
          <p className="text-gray-300 mb-3">
            Na página inicial, digite o nome do artista que você deseja encontrar na barra de pesquisa.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li>Digite pelo menos 2 caracteres para iniciar a busca</li>
            <li>Os resultados aparecerão automaticamente conforme você digita</li>
            <li>Clique no card do artista desejado para ver mais detalhes</li>
          </ul>
        </section>

        {/* Seção 2 */}
        <section className="bg-spotify-gray rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-spotify-green mb-4">
            2. Visualizar Perfil do Artista
          </h2>
          <p className="text-gray-300 mb-3">
            Na página do artista, você encontrará informações detalhadas:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li><strong>Foto e nome</strong> do artista</li>
            <li><strong>Seguidores</strong> no Spotify</li>
            <li><strong>Gêneros musicais</strong> associados</li>
            <li><strong>Popularidade</strong> do artista (gráfico de 0 a 100)</li>
          </ul>
        </section>

        {/* Seção 3 */}
        <section className="bg-spotify-gray rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-spotify-green mb-4">
            3. Explorar Conteúdo
          </h2>
          <p className="text-gray-300 mb-3">
            Navegue pelas diferentes seções do artista:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li><strong>Faixas Populares:</strong> As músicas mais ouvidas do artista</li>
            <li><strong>Álbuns:</strong> Discografia completa incluindo singles e álbuns</li>
            <li><strong>Aparece em:</strong> Álbuns e compilações onde o artista participa</li>
          </ul>

          <div className="bg-spotify-green bg-opacity-10 border border-spotify-green rounded-lg p-4 mt-4">
            <p className="text-spotify-green text-sm font-semibold mb-2">
              Por que algumas músicas populares não aparecem em albúns ou faixas?
            </p>
            <p className="text-gray-300 text-sm">
              Isso acontece porque a API do Spotify diferencia entre:
            </p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 ml-4 mt-2">
              <li><strong>Faixas Populares:</strong> Músicas mais ouvidas (incluindo participações)</li>
              <li><strong>Álbuns:</strong> Apenas trabalhos onde o artista é o principal</li>
              <li><strong>Aparece em:</strong> Participações em trabalhos de outros artistas</li>
            </ul>
            <p className="text-gray-400 text-xs mt-2 italic">
              Portanto, se uma música popular não está nos álbuns ou faixas, verifique a seção "Aparece em" - ela pode ser uma participação em um álbum de outro artista.
            </p>
          </div>
        </section>

        {/* Seção 4 */}
        <section className="bg-spotify-gray rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-spotify-green mb-4">
            4. Exportar Relatórios
          </h2>
          <p className="text-gray-300 mb-3">
            Você pode exportar os dados visualizados em diferentes formatos:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li><strong>Excel (.xlsx):</strong> Para análise de dados em planilhas</li>
            <li><strong>PDF:</strong> Para documentação e compartilhamento</li>
          </ul>
          <p className="text-gray-400 mt-3 text-sm italic">
            Os botões de exportação estão disponíveis nas páginas de Faixas, Álbuns e Aparece em.
          </p>
          <p className="text-spotify-violet mt-3 text-sm font-semibold">
            Importante: Os relatórios exibem apenas os dados que foram carregados na página. Caso queira um relatório completo certifique-se de carregar todas as músicas com o botão "Carregar Mais" antes de exportar.
          </p>
        </section>

        {/* Seção 5 */}
        <section className="bg-spotify-gray rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-spotify-green mb-4">
            5. Navegação
          </h2>
          <p className="text-gray-300 mb-3">
            Dicas para navegar pela aplicação:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
            <li>Use o botão <strong>"Voltar para pesquisa"</strong> para retornar aos resultados</li>
            <li>Clique no logo <strong>"artistFy"</strong> no cabeçalho para voltar à página inicial</li>
            <li>Passe o mouse sobre os cards para visualizar o efeito de destaque</li>
          </ul>
        </section>

        {/* Nota */}
        <div className="bg-spotify-violet bg-opacity-10 border border-spotify-violet rounded-lg p-6 text-center">
          <p className="text-gray-300">
            <strong>Nota:</strong> Todos os dados são obtidos diretamente da API pública do Spotify.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Os gráficos e estatísticas são baseados em dados especulativos e podem não refletir 100% da realidade.
          </p>
        </div>
      </div>
    </div>
  );
}
