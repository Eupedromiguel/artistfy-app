# artistFy

Aplicação web para pesquisa de dados de artistas no Spotify, visualização de faixas e álbuns, geração de relatórios e exportação de dados, utilizando dados públicos da Spotify Web API.

**Visão Geral**

O artistFy permite que usuários:

- Pesquisem artistas no Spotify
- Visualizem informações públicas do artista
- Naveguem por faixas e álbuns de forma paginada
- Exportem relatórios em Excel e PDF
- Utilizem a aplicação sem login ou OAuth de usuário

A aplicação foi projetada com foco em:

- Arquitetura serverless
- Baixo custo operacional
- Performance
- Respeito aos limites da Spotify API
- Boa experiência do usuário

-------------------------------------------------------------------------------------------------------------------------------

## Stack

Backend: Node.js 22 + Express + JavaScript
Frontend: React + JavaScript + Tailwind CSS
Auth Spotify: Client Credentials
Gráficos: Recharts
Exportação: xlsx para Excel + PDF (Tudo no front)
Deploy: Vercel (frontend) + Vercel functions (backend)

``` txt
artistfy/
├── frontend/                    # Aplicação React
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── logo.png
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── common/         # Componentes reutilizáveis
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── SearchBar.jsx
│   │   │   ├── artist/         # Componentes específicos de artista
│   │   │   │   ├── ArtistCard.jsx
│   │   │   │   ├── ArtistHeader.jsx
│   │   │   │   └── ArtistStats.jsx
│   │   │   ├── tracks/         # Componentes de faixas
│   │   │   │   ├── TrackList.jsx
│   │   │   │   ├── TrackItem.jsx
│   │   │   │   └── TracksChart.jsx
│   │   │   ├── albums/         # Componentes de álbuns
│   │   │   │   ├── AlbumList.jsx
│   │   │   │   ├── AlbumItem.jsx
│   │   │   │   └── AlbumsChart.jsx
│   │   │   └── layout/         # Layout components
│   │   │       ├── Header.jsx
│   │   │       ├── Footer.jsx
│   │   │       └── Navigation.jsx
│   │   ├── pages/              # Páginas/Views
│   │   │   ├── HomePage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── ArtistPage.jsx
│   │   │   ├── TracksPage.jsx
│   │   │   ├── AlbumsPage.jsx
│   │   │   └── AppearsOnPage.jsx
│   │   ├── services/           # Camada de API
│   │   │   ├── api.js          # Configuração base do axios
│   │   │   ├── artistService.js
│   │   │   ├── tracksService.js
│   │   │   ├── albumsService.js
│   │   │   └── appearsOnService.js
│   │   ├── utils/              # Utilitários
│   │   │   ├── exportExcel.js  # Lógica de exportação Excel
│   │   │   ├── exportPDF.js    # Lógica de exportação PDF
│   │   │   ├── formatters.js   # Formatação de datas, números, etc
│   │   │   └── constants.js    # Constantes da aplicação
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useArtist.js
│   │   │   ├── useTracks.js
│   │   │   ├── useAlbums.js
│   │   │   └── usePagination.js
│   │   ├── context/            # Context API (se necessário)
│   │   │   └── AppContext.jsx
│   │   ├── styles/             # Estilos globais
│   │   │   ├── index.css       # Tailwind imports
│   │   │   └── globals.css
│   │   ├── App.jsx             # Componente raiz
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   ├── vite.config.js          # Configuração do Vite
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .gitignore
│
├── api/                        # Backend Vercel Functions
│   ├── lib/                    # Código compartilhado
│   │   ├── spotify.js          # Cliente Spotify (token management)
│   │   ├── tokenCache.js       # Cache de token
│   │   ├── batchProcessor.js   # Lógica de batch deduplicado
│   │   └── errorHandler.js     # Tratamento de erros
│   ├── search-artist.js        # GET /api/search-artist
│   ├── artist.js               # GET /api/artist
│   ├── artist-tracks.js        # GET /api/artist/tracks
│   ├── artist-albums.js        # GET /api/artist/albums
│   └── artist-appears-on.js    # GET /api/artist/appears-on
│
├── docs/                       # Documentação adicional
│   ├── API.md                  # Documentação das APIs
│   └── DEPLOYMENT.md           # Guia de deploy
│
├── .env.example                # Exemplo de variáveis de ambiente
├── .env                        # Variáveis de ambiente (git ignored)
├── .gitignore
├── README.md                   # Documento de design atual
├── package.json                # Root package.json (scripts principais)
└── vercel.json                 # Configuração do Vercel
```

**Detalhes importantes** 

Frontend (/frontend):

- Organização por feature (tracks, albums, artist)
- Separação clara entre componentes, páginas e serviços
- Hooks customizados para lógica reutilizável
- Utils para exportação (Excel/PDF) isolados

API (/api):

- Vercel detecta automaticamente arquivos nesta pasta como serverless functions
- /lib contém lógica compartilhada (token cache, batch processor)
- Cada endpoint é um arquivo separado

Configuração:

- .env.example documenta variáveis necessárias
- vercel.json configura rotas e rewrites
- Root package.json para scripts de build/deploy

Vantagens desta estrutura:

- Clara separação frontend/backend
- Fácil de escalar (adicionar novos endpoints ou componentes)
- Código reutilizável bem organizado
- Pronta para deploy no Vercel
- Fácil navegação e manutenção

-------------------------------------------------------------------------------------------------------------------------------

## Fluxo do App

Usuário -> Frontend -> Backend (serverless) -> Spotify API
_________________________________________________________

### Página inicial "/" -> Logo / CTA / Barra de Pesquisa 

Mensagem clara no UI

“Pesquisas baseadas em dados públicos do Spotify”

Barra de pesquisa -> Buscar 
_________________________________________________________

### Página de resultados "/pesquisa"

Página de resultados mostra 20 resultados no máximo

Prévia -> nome + foto + gênero + seguidores

Seleciona artista -> exibe "artistfy.app/artista"
_________________________________________________________

### Página de artista "/artista"

- Nome do artista
- Foto
- Seguidores

[BOTÃO] Ver Faixas
[BOTÃO] Ver Álbuns
[BOTÃO] Aparece em

_________________________________________________________

#### Página de Faixas "/artista/faixas"

Gráficos (Recharts) baseado no que está sendo exibido (Atualiza conforme carrega mais)
Exibe nota : Gráfico baseado nos dados exibidos na tela

Carrega 20 faixas do artista por ordem de top tracks com os seguintes detalhes :

**Música**

- Interpretador por : artists array
- Álbum :
- Lançamento :
- Duração :
- Gravadora :

Ao rolar até a última faixa exibe os botões 

[Carregar Mais] -> Carrega mais 20

[Exportar em Excel] -> Do que já está carregado

[Exportar PDF] -> Do que já está carregado

##### Botão [Exportar em Excel] abre modal com a mensagem :

"Deseja exportar em documento as faixas a seguir exibidas ? {$X} Faixas carregadas"

##### Botão [Exportar PDF] abre modal com a mensagem :

"Deseja exportar em PDF as faixas a seguir exibidas ? {$X} Faixas carregadas"
_________________________________________________________

#### Página de Albuns "/artista/albuns"

Gráficos (Recharts) baseado no que está sendo exibido (Atualiza conforme carrega mais)
Exibe nota : Gráfico baseado nos dados exibidos na tela

Carrega 20 albuns do artista por ordem de top tracks com os seguintes detalhes :

- Lançamento :
- Gravadora :
- Número de faixas :

Ao rolar até o último albúm exibe os botões 

[Carregar Mais] -> Carrega mais 20

[Exportar em Excel] -> Do que já está carregado

[Exportar PDF] -> Do que já está carregado

##### Botão [Exportar em Excel] abre modal com a mensagem :

"Deseja exportar em documento os albuns a seguir exibidos ? {$X} Albuns carregados"

##### Botão [Exportar PDF] abre modal com a mensagem :

"Deseja exportar em PDF os albuns a seguir exibidos ? {$X} Albuns carregados"
_________________________________________________________

#### Página Aparece em "/artista/aparece-em"

Gráficos (Recharts) baseado no que está sendo exibido (Atualiza conforme carrega mais)
Exibe nota : Gráfico baseado nos dados exibidos na tela

Carrega álbuns onde o artista aparece (features, colaborações) com paginação de 20 por vez:

- Nome do álbum
- Artista(s)
- Lançamento
- Gravadora
- Número de faixas

Ao rolar até o último álbum exibe os botões:

[Carregar Mais] -> Carrega mais 20

[Exportar em Excel] -> Do que já está carregado (nome do arquivo: "{artista}_aparece_em_{timestamp}.xlsx")

[Exportar PDF] -> Do que já está carregado (título: "{artista} - Aparece em")

##### Botão [Exportar em Excel] abre modal com a mensagem :

"Deseja exportar em documento as aparições exibidas ? {$X} Aparições carregadas"

##### Botão [Exportar PDF] abre modal com a mensagem :

"Deseja exportar em PDF as aparições exibidas ? {$X} Aparições carregadas"

-------------------------------------------------------------------------------------------------------------------------------

## Spotify API nesse fluxo

Endpoints especializados para evitar timeout e otimizar performance:

GET /api/search-artist
- Busca artistas pelo nome
- Retorna lista de resultados (max 20)

GET /api/artist
- Dados básicos do artista (nome, foto, seguidores, gêneros)
- 1 chamada à Spotify API
- Resposta rápida (~300ms)

GET /api/artist/tracks
- Faixas paginadas (20 por vez) com gravadora
- Usa top tracks endpoint
- Otimização: batch deduplicado para gravadoras (1 chamada para até 20 álbuns)
- Otimização: aproveita tracks.items da resposta de álbuns (reduz 90% das requisições)
- Resposta: ~600ms

GET /api/artist/albums
- Álbuns paginados (20 por vez)
- Usa paginação nativa da Spotify API
- Resposta: ~500ms

GET /api/artist/appears-on
- Álbuns onde o artista aparece (features, colaborações)
- Paginação completa com loop (busca todos os álbuns antes de paginar)
- Usa include_groups=appears_on
- Resposta: ~600ms

_________________________________________________________

**Decisões Técnicas:**

- O client_secret fica no backend
- O frontend nunca fala direto com o Spotify
- Endpoints separados evitam timeout (limite de 10s no Vercel free tier)
- Progressive loading: dados aparecem gradualmente (melhor UX)

-------------------------------------------------------------------------------------------------------------------------------

## Backend Vercel (Functions)

Gratuito
Permanente
Ideal para esse tipo de API
Não dorme (serverless)
Escala automático

Cada endpoint vira uma função:

/api/search-artist       -> Busca artistas
/api/artist              -> Dados básicos
/api/artist/tracks       -> Faixas paginadas + gravadora
/api/artist/albums       -> Álbuns paginados
/api/artist/appears-on   -> Aparições do artista (features/colaborações)

Backend só entrega JSON estruturado

-------------------------------------------------------------------------------------------------------------------------------

## Limites reais 

Vercel Free

Tempo de execução limitado

Número mensal de execuções

Perfeito para projetos pessoais, portfólio, demos

Spotify API

Rate limit global

Busca + relatórios públicos = tranquilo

Um app desse tipo vai demorar muito para bater limites.

-------------------------------------------------------------------------------------------------------------------------------

## Otimizações Implementadas

### 1. Token Management (Client Credentials)

**Problema:** Token expira em 1 hora

**Solução:** Cache in-memory com renovação proativa

- Token armazenado em memória durante sua validade
- Renovação automática 5 minutos antes de expirar
- Zero custo (sem banco de dados ou Redis)
- Funciona perfeitamente em serverless (cada instância mantém cache próprio)

**Implementação:**
```javascript
let cachedToken = null;
let tokenExpiresAt = null;

async function getValidToken() {
  const bufferTime = 5 * 60 * 1000; // 5min antes
  if (cachedToken && tokenExpiresAt && (tokenExpiresAt - Date.now() > bufferTime)) {
    return cachedToken;
  }
  // Busca novo token...
}
```

### 2. Gravadora (Label) - Batch Deduplicado

**Problema:** Gravadora não está disponível diretamente nas faixas
- 20 faixas de álbuns diferentes = potencial de 20 chamadas à API

**Solução:** Batch requests com deduplicação

- Extrai IDs únicos de álbuns (remove duplicatas)
- Spotify permite até 20 álbuns por chamada: `/albums?ids=id1,id2,id3...`
- Busca em paralelo se necessário (múltiplos batches)
- Cria mapa álbum -> gravadora
- Enriquece tracks com os dados

**Resultado:**
- 20 faixas de 15 álbuns diferentes -> 1 chamada (vs 15)
- 50 faixas de 35 álbuns diferentes -> 2 chamadas (batch de 20 + batch de 15)
- Deduplica automaticamente (5 faixas do mesmo álbum = 1 busca)

### 3. Aproveitamento de tracks.items (Redução de Requisições)

**Problema:** Buscávamos tracks separadamente mesmo que já viessem nos álbuns
- GET /albums?ids=... retorna TODOS os campos do álbum, incluindo `tracks.items[]`
- Fazíamos requisições extras para buscar tracks que já estavam disponíveis

**Solução Implementada:** Usar tracks.items que já vem na resposta

**Antes:**
```javascript
// 1. Buscar 20 álbuns
GET /artists/{id}/albums?limit=20
// 2. Buscar 1 track de CADA álbum (20 requisições extras!)
GET /albums/{album1}/tracks?limit=1
GET /albums/{album2}/tracks?limit=1
... (mais 18 vezes)

Total: 21 requisições
```

**Agora:**
```javascript
// 1. Buscar 20 álbuns
GET /artists/{id}/albums?limit=20
// 2. Buscar detalhes completos dos 20 álbuns em batch
GET /albums?ids=album1,album2,...,album20
// ↳ Esta resposta JÁ INCLUI tracks.items[] de cada álbum!

Total: 2 requisições
```

**Economia de Requisições:**

| Álbuns | Antes | Agora | Economia |
|--------|-------|-------|----------|
| 20 | 21 requisições | 2 requisições | 90% |
| 40 | 41 requisições | 3 requisições | 93% |
| 100 | 101 requisições | 6 requisições | 94% |

**Implementação:**

```javascript
// batchProcessor.js - Salva tracks que já vêm na resposta
albumMap.set(album.id, {
  label: album.label,
  releaseDate: album.release_date,
  totalTracks: album.total_tracks,
  name: album.name,
  images: album.images,
  tracks: album.tracks?.items || []  // 👈 Novo!
});

// artist-tracks.js - Usa as tracks já carregadas
const albumMap = await fetchAlbumsBatch(albumIds);
const tracks = albums.items.map(album => {
  const albumDetails = albumMap.get(album.id);
  const firstTrack = albumDetails?.tracks?.[0]; // Usa tracks.items!
  // ...
});
```

**Benefícios:**
- Redução de 90-94% nas requisições à API do Spotify
- Menor chance de atingir rate limits
- Código mais eficiente e profissional
- Melhor aproveitamento dos dados já disponíveis

### 4. Arquitetura de Endpoints (Evita Timeout)

**Problema original:** Endpoint único `/artist-report` orquestrando tudo
- Timeout em Vercel Functions (limite de 10s no free tier)
- Múltiplas chamadas em sequência
- Latência alta (3-8s)
- UX ruim (tela de loading longa)

**Solução:** Endpoints especializados + Progressive Loading

| Endpoint | Tempo | Chamadas | Quando usar |
|----------|-------|----------|-------------|
| `/api/artist` | ~300ms | 1 | Carrega primeiro (dados básicos) |
| `/api/artist/tracks` | ~600ms | 2 | Sob demanda (otimizado com tracks.items) |
| `/api/artist/albums` | ~500ms | 1 | Sob demanda (álbuns paginados) |

**Benefícios:**
- Tempo total percebido: ~1s (vs 3-8s)
- Sem risco de timeout
- Dados aparecem gradualmente
- Melhor experiência do usuário

### Aplicação prática

Backend:

- Entrega dados paginados
- Normaliza e enriquece (gravadoras em batch)
- Cache de token automático

Frontend:

- Progressive loading (carrega aos poucos)
- Controla paginação
- Gera Excel e PDF

Spotify:

- Máximo 2-3 chamadas por página
- Batch otimizado (20 álbuns/chamada)
- Não sofre abuso

Vercel:

- Execuções rápidas (~1s)
- Nunca estoura timeout
- Custo zero (free tier)

Tudo conversa bem.

-------------------------------------------------------------------------------------------------------------------------------

# Documentação Disponível

QUICK_START.md - Guia de início rápido

CHECKLIST.md - Checklist de verificação

PROJECT_SUMMARY.md - Resumo completo

docs/API.md - Documentação da API

docs/DEPLOYMENT.md - Guia de deploy

-------------------------------------------------------------------------------------------------------------------------------

Desenvolvido por Pedro Ataides como projeto de portfólio/estudo.

© 2025 - Todos os direitos reservados.

