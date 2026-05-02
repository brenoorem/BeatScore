import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AlbumCard from '../../components/AlbumCard'
import GenreFilter from '../../components/GenreFilter'
import { ALBUMS, formatCount } from '../../data/albums'

/* ─── Opções de ordenação ────────────────────────── */
const SORT_OPTIONS = [
  { value: 'rating',       label: 'Melhor avaliados' },
  { value: 'totalRatings', label: 'Mais avaliados'   },
  { value: 'year_desc',    label: 'Mais recentes'    },
  { value: 'year_asc',     label: 'Mais antigos'     },
  { value: 'title',        label: 'A–Z'              },
]

/* ─── Chart lateral (top 5) ─────────────────────── */
function ChartItem({ album, position }) {
  const medals = { 1: '🥇', 2: '🥈', 3: '🥉' }
  return (
    <Link
      to={`/album/${album.id}`}
      className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0 hover:bg-white/3 -mx-5 px-5 transition-colors group"
    >
      <span className="text-sm w-5 text-center shrink-0">
        {medals[position] ?? (
          <span className="text-gray-600 font-medium">{position}</span>
        )}
      </span>
      <div
        className={`w-9 h-9 rounded-lg bg-gradient-to-br ${album.gradient} shrink-0`}
      />
      <div className="flex-1 min-w-0">
        <p className="text-gray-200 text-xs font-medium truncate group-hover:text-white transition-colors">
          {album.title}
        </p>
        <p className="text-gray-600 text-[11px] truncate">{album.artist}</p>
      </div>
      <span className="text-yellow-400 text-xs shrink-0 font-medium">
        {album.rating}
      </span>
    </Link>
  )
}

/* ─── Linha de álbum em modo lista ──────────────── */
function AlbumRow({ album, position }) {
  return (
    <Link
      to={`/album/${album.id}`}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/4 transition-colors group"
    >
      <span className="text-gray-700 text-sm w-5 text-center shrink-0 tabular-nums">
        {position}
      </span>
      <div
        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${album.gradient} shrink-0 shadow-md`}
      />
      <div className="flex-1 min-w-0">
        <p className="text-gray-200 text-sm font-medium truncate group-hover:text-white transition-colors">
          {album.title}
        </p>
        <p className="text-gray-500 text-xs mt-0.5 truncate">{album.artist}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {album.genres.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] text-brand-400 bg-brand-600/10 border border-brand-600/15 px-1.5 py-0.5 rounded"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-yellow-400 text-sm font-semibold">★ {album.rating}</div>
        <div className="text-gray-700 text-[10px] mt-0.5">{formatCount(album.totalRatings)} aval.</div>
      </div>
    </Link>
  )
}

/* ─── Página ─────────────────────────────────────── */
export default function ExplorePage() {
  const [search,    setSearch]    = useState('')
  const [genre,     setGenre]     = useState('Todos')
  const [sort,      setSort]      = useState('rating')
  const [viewMode,  setViewMode]  = useState('grid') // 'grid' | 'list'

  /* Filtragem + ordenação */
  const filtered = useMemo(() => {
    let list = [...ALBUMS]

    /* Busca por título ou artista */
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.artist.toLowerCase().includes(q)
      )
    }

    /* Filtro de gênero */
    if (genre !== 'Todos') {
      list = list.filter((a) => a.genres.includes(genre))
    }

    /* Ordenação */
    list.sort((a, b) => {
      if (sort === 'rating')       return b.rating - a.rating
      if (sort === 'totalRatings') return b.totalRatings - a.totalRatings
      if (sort === 'year_desc')    return b.year - a.year
      if (sort === 'year_asc')     return a.year - b.year
      if (sort === 'title')        return a.title.localeCompare(b.title)
      return 0
    })

    return list
  }, [search, genre, sort])

  /* Top 5 para o chart lateral (sempre por rating) */
  const top5 = useMemo(
    () => [...ALBUMS].sort((a, b) => b.rating - a.rating).slice(0, 5),
    []
  )

  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      <Navbar />

      {/* ── Cabeçalho da página ── */}
      <div className="border-b border-white/5 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="font-display font-bold text-white text-3xl tracking-tight">
            Explorar
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {ALBUMS.length} álbuns no catálogo · descubra algo novo
          </p>

          {/* Barra de busca */}
          <div className="relative mt-5 max-w-lg">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
              width="15" height="15" viewBox="0 0 13 13" fill="none"
            >
              <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3" />
              <path d="M9 9l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por álbum ou artista..."
              className="w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-brand-600 rounded-xl pl-10 pr-4 py-2.5 text-gray-200 text-sm placeholder-gray-600 outline-none transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors text-lg leading-none"
              >
                ×
              </button>
            )}
          </div>

          {/* Filtros de gênero */}
          <div className="mt-4">
            <GenreFilter selected={genre} onChange={setGenre} />
          </div>
        </div>
      </div>

      {/* ── Conteúdo principal ── */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* ── Coluna de álbuns ── */}
        <div className="flex-1 min-w-0">

          {/* Toolbar: contagem + ordenação + modo de visualização */}
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <p className="text-gray-500 text-sm">
              {filtered.length === ALBUMS.length
                ? `${ALBUMS.length} álbuns`
                : `${filtered.length} de ${ALBUMS.length} álbuns`
              }
              {genre !== 'Todos' && (
                <span className="ml-2 text-brand-400">· {genre}</span>
              )}
            </p>

            <div className="flex items-center gap-2">
              {/* Ordenação */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white/5 border border-white/8 text-gray-400 text-xs rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:border-white/15 transition-colors"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#1c1c21]">
                    {o.label}
                  </option>
                ))}
              </select>

              {/* Modo grid / lista */}
              <div className="flex border border-white/8 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`px-2.5 py-1.5 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-brand-600 text-white'
                      : 'text-gray-600 hover:text-gray-300'
                  }`}
                  title="Grade"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="8" y="1" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="1" y="8" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="8" y="8" width="5" height="5" rx="1" fill="currentColor" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`px-2.5 py-1.5 transition-colors border-l border-white/8 ${
                    viewMode === 'list'
                      ? 'bg-brand-600 text-white'
                      : 'text-gray-600 hover:text-gray-300'
                  }`}
                  title="Lista"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="2" width="12" height="1.5" rx="0.75" fill="currentColor" />
                    <rect x="1" y="6.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
                    <rect x="1" y="10.5" width="12" height="1.5" rx="0.75" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Resultado vazio */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-gray-400 font-medium">Nenhum álbum encontrado</p>
              <p className="text-gray-600 text-sm mt-1">
                Tente outro termo ou remova os filtros
              </p>
              <button
                type="button"
                onClick={() => { setSearch(''); setGenre('Todos') }}
                className="btn-secondary mt-4 text-xs"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {/* Grid */}
          {viewMode === 'grid' && filtered.length > 0 && (
            <div className="album-grid animate-fade-in">
              {filtered.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          )}

          {/* Lista */}
          {viewMode === 'list' && filtered.length > 0 && (
            <div className="card p-2 animate-fade-in">
              {filtered.map((album, i) => (
                <AlbumRow key={album.id} album={album} position={i + 1} />
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <aside className="w-full lg:w-56 shrink-0 flex flex-col gap-5">

          {/* Top 5 */}
          <div className="card p-5">
            <h3 className="text-gray-500 text-[10px] uppercase tracking-wider mb-1">
              Top 5 do catálogo
            </h3>
            {top5.map((album, i) => (
              <ChartItem key={album.id} album={album} position={i + 1} />
            ))}
          </div>

          {/* Estatísticas rápidas */}
          <div className="card p-5">
            <h3 className="text-gray-500 text-[10px] uppercase tracking-wider mb-4">
              Catálogo
            </h3>
            <div className="flex flex-col gap-3">
              {[
                {
                  label: 'Álbuns',
                  value: ALBUMS.length,
                },
                {
                  label: 'Avaliações totais',
                  value: formatCount(
                    ALBUMS.reduce((s, a) => s + a.totalRatings, 0)
                  ),
                },
                {
                  label: 'Nota média',
                  value: (
                    ALBUMS.reduce((s, a) => s + a.rating, 0) / ALBUMS.length
                  ).toFixed(1),
                },
                {
                  label: 'Gêneros',
                  value: new Set(ALBUMS.flatMap((a) => a.genres)).size,
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-gray-600 text-xs">{label}</span>
                  <span className="text-gray-200 text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </main>

      <Footer />
    </div>
  )
}