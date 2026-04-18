import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AlbumCard from '../../components/AlbumCard'

/* ─── Dados mockados ─────────────────────────────── */
const FEATURED = {
  title: 'Chromakopia',
  artist: 'Tyler, The Creator',
  year: 2024,
  rating: 9.1,
  totalRatings: '12.4k',
  comment: 'Obra-prima moderna que vai definir a década',
  gradient: 'from-violet-900 via-purple-800 to-[#0d0d0f]',
}

const POPULAR = [
  { title: 'Chromakopia',       artist: 'Tyler, Creator',     rating: 9.1, status: 'ouvido' },
  { title: "Short n' Sweet",    artist: 'Sabrina Carpenter',  rating: 8.7 },
  { title: 'GNX',               artist: 'Kendrick Lamar',     rating: 8.2 },
  { title: 'Bright Future',     artist: 'Adrianne Lenker',    rating: 8.4 },
  { title: 'Manning Fireworks', artist: 'MJ Lenderman',       rating: 7.9 },
  { title: 'Imaginal Disk',     artist: 'Magdalena Bay',      rating: 8.9 },
]

const TOP_RATED = [
  { title: 'Imaginal Disk',     artist: 'Magdalena Bay',      rating: 8.9 },
  { title: 'Diamond Jubilee',   artist: 'Cindy Lee',          rating: 9.3 },
  { title: 'Desire, I Want…',   artist: 'Mk.gee',             rating: 8.6 },
  { title: 'Endlessness',       artist: 'Nala Sinephro',      rating: 8.8 },
  { title: 'Bright Future',     artist: 'Adrianne Lenker',    rating: 8.4 },
  { title: 'Manning Fireworks', artist: 'MJ Lenderman',       rating: 7.9 },
]

const FEED_ITEMS = [
  {
    id: 1,
    user: 'marina_sounds',
    action: 'avaliou com',
    score: '9.2',
    album: 'Chromakopia',
    review: '"Obra-prima que vai definir a década. Tyler nunca soou tão humano..."',
    likes: 24,
    comments: 8,
    time: 'há 2 horas',
    avatarGradient: 'from-violet-600 to-purple-500',
    albumGradient: 'from-violet-700 to-pink-600',
  },
  {
    id: 2,
    user: 'cassio.vinyl',
    action: 'marcou como',
    actionHighlight: '♡ favorito',
    album: "Short n' Sweet",
    time: 'há 5 horas',
    avatarGradient: 'from-cyan-600 to-blue-500',
    albumGradient: 'from-blue-700 to-cyan-500',
  },
  {
    id: 3,
    user: 'lena.melo',
    action: 'criou a lista',
    actionHighlight: '"Melhores de 2024"',
    extra: 'com 18 álbuns',
    time: 'há 8 horas',
    avatarGradient: 'from-amber-600 to-yellow-500',
  },
]

const HOT_GENRES = ['hip-hop', 'indie folk', 'rap', 'eletrônico', 'jazz', 'r&b', 'shoegaze', 'dream pop']

/* ─── Sub-componentes ────────────────────────────── */
function SectionHeader({ title, link = 'ver todos →' }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-gray-100 font-display font-semibold text-[15px] tracking-tight">
        {title}
      </h2>
      <button className="text-brand-400 hover:text-brand-300 text-xs transition-colors">
        {link}
      </button>
    </div>
  )
}

function FeedItem({ item }) {
  const [liked, setLiked] = useState(false)

  return (
    <div className="flex gap-3 py-4 border-b border-white/5 last:border-0 animate-fade-in">
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatarGradient} shrink-0 mt-0.5`}
      />

      {/* Corpo */}
      <div className="flex-1 min-w-0">
        <p className="text-gray-300 text-sm leading-relaxed">
          <span className="text-white font-medium">{item.user}</span>{' '}
          {item.action}{' '}
          {item.score && (
            <span className="text-yellow-400 font-semibold">{item.score}</span>
          )}
          {item.actionHighlight && (
            <span className="text-brand-400 font-medium">{item.actionHighlight}</span>
          )}
          {item.album && (
            <> em <span className="text-white font-medium">{item.album}</span></>
          )}
          {item.extra && <> {item.extra}</>}
        </p>

        {/* Trecho da review */}
        {item.review && (
          <blockquote className="mt-2 px-3 py-2 bg-white/3 border-l-2 border-brand-600 rounded-r-lg text-gray-400 text-xs italic leading-relaxed">
            {item.review}
          </blockquote>
        )}

        {/* Ações */}
        <div className="flex items-center gap-4 mt-2">
          {item.likes !== undefined && (
            <button
              onClick={() => setLiked((v) => !v)}
              className={`text-xs transition-colors ${liked ? 'text-pink-400' : 'text-gray-600 hover:text-gray-400'}`}
            >
              {liked ? '♥' : '♡'} {item.likes + (liked ? 1 : 0)} curtidas
            </button>
          )}
          {item.comments !== undefined && (
            <button className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
              💬 {item.comments} comentários
            </button>
          )}
          <span className="text-gray-700 text-xs ml-auto">{item.time}</span>
        </div>
      </div>

      {/* Miniatura do álbum */}
      {item.albumGradient && (
        <div
          className={`w-10 h-10 rounded-md bg-gradient-to-br ${item.albumGradient} shrink-0`}
        />
      )}
    </div>
  )
}

function GenrePill({ genre, hot }) {
  return (
    <span
      className={`
        inline-block text-[11px] px-2.5 py-1 rounded-full border cursor-pointer transition-colors duration-150
        ${hot
          ? 'bg-brand-600/15 border-brand-600/40 text-brand-400 hover:bg-brand-600/25'
          : 'bg-white/4 border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300'
        }
      `}
    >
      {genre}
    </span>
  )
}

/* ─── Página principal ───────────────────────────── */
export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      <Navbar />

      {/* Hero */}
      <section className={`relative bg-gradient-to-r ${FEATURED.gradient} overflow-hidden`}>
        {/* Grade decorativa sutil */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 60px)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-14 flex items-end gap-8">
          {/* Capa do álbum */}
          <div className="hidden sm:block w-36 h-36 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 shadow-2xl shadow-purple-900/60 shrink-0" />

          {/* Info */}
          <div className="flex-1 animate-slide-up">
            <span className="inline-block text-[10px] tracking-widest text-brand-400 font-medium uppercase mb-3">
              Destaque da semana
            </span>
            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl tracking-tight leading-none">
              {FEATURED.title}
            </h1>
            <p className="text-purple-300 text-lg mt-1">{FEATURED.artist}</p>
            <p className="text-gray-500 text-sm mt-1 italic">"{FEATURED.comment}"</p>

            <div className="flex items-center gap-4 mt-5 flex-wrap">
              <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-lg">
                <span className="text-yellow-400 text-lg font-bold">{FEATURED.rating}</span>
                <span className="text-gray-500 text-xs">/ 10 · {FEATURED.totalRatings} avaliações</span>
              </div>
              <button className="btn-primary">
                + Marcar como ouvido
              </button>
              <button className="btn-secondary">
                ♡ Favoritar
              </button>
              <button className="btn-secondary">
                ✎ Escrever review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">

        {/* Coluna esquerda */}
        <div className="flex-1 min-w-0">

          {/* Populares */}
          <section className="mb-10">
            <SectionHeader title="Populares esta semana" />
            <div className="album-grid">
              {POPULAR.map((album) => (
                <AlbumCard key={album.title} album={album} />
              ))}
            </div>
          </section>

          {/* Mais avaliados */}
          <section className="mb-10">
            <SectionHeader title="Mais avaliados de 2024" />
            <div className="album-grid">
              {TOP_RATED.map((album) => (
                <AlbumCard key={album.title} album={album} />
              ))}
            </div>
          </section>

          {/* Feed de atividade */}
          <section>
            <SectionHeader title="Atividade dos seus seguidos" link="" />
            <div className="card p-0 divide-y divide-white/5">
              <div className="px-4">
                {FEED_ITEMS.map((item) => (
                  <FeedItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5">

          {/* Sua atividade */}
          <div className="card p-5">
            <h3 className="text-gray-500 text-[10px] uppercase tracking-wider mb-4">Sua atividade</h3>
            <div className="mb-4">
              <span className="text-white text-3xl font-display font-semibold">47</span>
              <span className="text-gray-600 text-xs ml-2">álbuns este mês</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { month: 'Jan', pct: 55 },
                { month: 'Fev', pct: 80 },
                { month: 'Mar', pct: 65 },
                { month: 'Abr', pct: 100 },
              ].map(({ month, pct }) => (
                <div key={month} className="flex items-center gap-2">
                  <span className="text-gray-600 text-[10px] w-5">{month}</span>
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-600 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gêneros em alta */}
          <div className="card p-5">
            <h3 className="text-gray-500 text-[10px] uppercase tracking-wider mb-3">Gêneros em alta</h3>
            <div className="flex flex-wrap gap-1.5">
              {HOT_GENRES.map((g, i) => (
                <GenrePill key={g} genre={g} hot={i < 3} />
              ))}
            </div>
          </div>

          {/* Sugeridos */}
          <div className="card p-5">
            <h3 className="text-gray-500 text-[10px] uppercase tracking-wider mb-4">Sugeridos para você</h3>
            <div className="flex flex-col gap-3">
              {[
                { title: 'Imaginal Disk', artist: 'Magdalena Bay', rating: 8.9, gradient: 'from-indigo-800 to-blue-500' },
                { title: 'Desire, I Want…', artist: 'Mk.gee', rating: 8.6, gradient: 'from-purple-900 to-fuchsia-600' },
                { title: 'Diamond Jubilee', artist: 'Cindy Lee', rating: 9.3, gradient: 'from-amber-800 to-yellow-600' },
              ].map((a) => (
                <div key={a.title} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${a.gradient} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-200 text-xs font-medium truncate group-hover:text-white transition-colors">
                      {a.title}
                    </p>
                    <p className="text-gray-600 text-[11px] truncate">{a.artist}</p>
                  </div>
                  <span className="text-yellow-400 text-xs shrink-0">★ {a.rating}</span>
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
