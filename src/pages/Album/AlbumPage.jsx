import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { getAlbumById, formatCount, ALBUMS } from '../../data/albums'

/* ─── Gradientes reutilizados ────────────────────── */
const PLACEHOLDER_GRADIENTS = [
  'from-violet-700 to-pink-600',
  'from-blue-700 to-cyan-500',
  'from-emerald-700 to-teal-400',
  'from-amber-700 to-yellow-500',
  'from-rose-700 to-pink-500',
  'from-indigo-800 to-blue-500',
  'from-purple-900 to-fuchsia-600',
  'from-green-800 to-emerald-500',
]
function getGradient(title = '') {
  return PLACEHOLDER_GRADIENTS[title.charCodeAt(0) % PLACEHOLDER_GRADIENTS.length]
}

/* ─── StarRating interativo ──────────────────────── */
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(null)
  const display = hovered ?? value

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          type='button'
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
          className={`
            w-7 h-7 rounded flex items-center justify-center text-sm transition-all duration-100
            ${star <= display
              ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/30'
              : 'text-gray-700 bg-white/4 border border-white/8 hover:border-white/20'
            }
          `}
        >
          ★
        </button>
      ))}
      {value > 0 && (
        <span className="text-yellow-400 text-sm font-medium ml-2">{value}.0</span>
      )}
    </div>
  )
}

/* ─── Barra de distribuição de notas ────────────── */
function RatingBar({ score, count, maxCount }) {
  const pct = maxCount > 0 ? Math.round((count / maxCount) * 100) : 0
  return (
    <div className="flex items-center gap-2 group cursor-default">
      <span className="text-gray-600 text-[11px] w-4 text-right">{score}</span>
      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-600 rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-gray-700 text-[10px] w-8">{formatCount(count)}</span>
    </div>
  )
}

/* ─── Card de comentário ─────────────────────────── */
function CommentCard({ comment }) {
  const [liked, setLiked] = useState(false)
  const [localLikes, setLocalLikes] = useState(comment.likes)

  function toggleLike() {
    setLiked((v) => {
      setLocalLikes((n) => (v ? n - 1 : n + 1))
      return !v
    })
  }

  return (
    <div className="card p-5 animate-fade-in">
      {/* Cabeçalho */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${comment.avatarGradient} shrink-0`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white text-sm font-medium">{comment.user}</span>
            <span className="text-gray-700 text-xs">·</span>
            <span className="text-gray-600 text-xs">{comment.date}</span>
            {comment.helpful && (
              <span className="ml-auto text-[10px] bg-brand-600/15 border border-brand-600/30 text-brand-400 px-2 py-0.5 rounded-full">
                ✦ Mais útil
              </span>
            )}
          </div>
          {/* Estrelas da nota */}
          <div className="flex items-center gap-0.5 mt-1">
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`text-[10px] ${i < Math.round(comment.score) ? 'text-yellow-400' : 'text-gray-800'}`}
              >
                ★
              </span>
            ))}
            <span className="text-yellow-400 text-xs ml-1.5 font-medium">{comment.score}</span>
          </div>
        </div>
      </div>

      {/* Texto */}
      <p className="text-gray-400 text-sm leading-relaxed">{comment.text}</p>

      {/* Rodapé */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            liked ? 'text-pink-400' : 'text-gray-600 hover:text-gray-400'
          }`}
        >
          {liked ? '♥' : '♡'} {localLikes}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-400 transition-colors">
          💬 {comment.replies} respostas
        </button>
        <button className="ml-auto text-xs text-gray-700 hover:text-gray-500 transition-colors">
          Responder
        </button>
      </div>
    </div>
  )
}

/* ─── Formulário de review ───────────────────────── */
function ReviewForm({ albumTitle }) {
  const [score, setScore]     = useState(0)
  const [text, setText]       = useState('')
  const [status, setStatus]   = useState('ouvido')
  const [submitted, setSubmitted] = useState(false)

  const STATUS_OPTS = [
    { value: 'ouvido',      label: '✓ Ouvido'},
    { value: 'ouvindo',     label: '▶ Ouvindo'},
  ]

  function handleSubmit(e) {
    e.preventDefault()
    if (score === 0) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card p-6 text-center animate-fade-in">
        <div className="text-3xl mb-2">🎵</div>
        <p className="text-white font-medium">Review publicada!</p>
        <p className="text-gray-500 text-sm mt-1">Obrigado por contribuir com a comunidade.</p>
        <button
          onClick={() => { setSubmitted(false); setScore(0); setText('') }}
          className="btn-secondary mt-4 text-xs"
        >
          Escrever outra
        </button>
      </div>
    )
  }

  return (
    <div className="card p-5">
      <h3 className="text-gray-300 text-sm font-medium mb-4">Sua avaliação</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        {/* Nota */}
        <div>
          <label className="text-gray-600 text-xs mb-2 block">Nota (obrigatório)</label>
          <StarRating value={score} onChange={setScore} />
        </div>

        {/* Status */}
        <div>
          <label className="text-gray-600 text-xs mb-2 block">Status</label>
          <div className="flex gap-2 flex-wrap">
            {STATUS_OPTS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setStatus(opt.value)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                  status === opt.value
                    ? 'bg-brand-600/20 border-brand-600 text-brand-400'
                    : 'bg-white/4 border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Texto */}
        <div>
          <label className="text-gray-600 text-xs mb-2 block">
            Review <span className="text-gray-700">(opcional)</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`O que você achou de "${albumTitle}"?`}
            rows={4}
            className="w-full bg-gray-800 border border-gray-700 hover:border-gray-500 focus:border-brand-600 rounded-lg px-3 py-2.5 text-gray-100 text-sm placeholder-gray-400 outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={score === 0}
          className={`w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
            score > 0
              ? 'btn-primary'
              : 'bg-white/5 text-gray-700 cursor-not-allowed'
          }`}
        >
          {score === 0 ? 'Selecione uma nota para continuar' : 'Publicar review'}
        </button>
      </form>
    </div>
  )
}

/* ─── Página principal ───────────────────────────── */
export default function AlbumPage() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const album     = getAlbumById(id)

  const [activeTab,    setActiveTab]    = useState('reviews') // 'reviews' | 'faixas'
  const [userFavorites, setUserFavorites] = useState(
    () => new Set(album?.tracks.filter((t) => t.favorite).map((t) => t.number))
  )

  /* Álbum não encontrado */
  if (!album) {
    return (
      <div className="min-h-screen bg-[#0d0d0f] flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-6">
          <p className="text-6xl">🎵</p>
          <h1 className="text-white text-2xl font-display font-semibold">Álbum não encontrado</h1>
          <p className="text-gray-500 text-sm">Este álbum ainda não está no catálogo do BeatScore.</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-2">
            ← Voltar para o início
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  const maxCount  = Math.max(...album.ratingDistribution.map((d) => d.count))
  const gradient  = album.gradient || getGradient(album.title)

  function toggleFavTrack(num) {
    setUserFavorites((prev) => {
      const next = new Set(prev)
      next.has(num) ? next.delete(num) : next.add(num)
      return next
    })
  }

  /* Álbuns similares (mesmos gêneros, exceto o atual) */
  const similar = ALBUMS
    .filter((a) => a.id !== album.id && a.genres.some((g) => album.genres.includes(g)))
    .slice(0, 4)

  const TABS = [
    { id: 'reviews', label: `Reviews (${album.comments.length})` },
    { id: 'faixas',  label: `Faixas (${album.tracks.length})` },
  ]

  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      <Navbar />

      {/* ── HERO com capa ── */}
      <section className="relative overflow-hidden">
        {/* Fundo desfocado com gradiente do álbum */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 pt-10 pb-8 flex flex-col sm:flex-row gap-8 items-end">
          {/* Capa */}
          <div
            className={`
              w-44 h-44 sm:w-52 sm:h-52 rounded-2xl bg-gradient-to-br ${gradient}
              shadow-2xl shadow-black/60 shrink-0 mx-auto sm:mx-0
            `}
          />

          {/* Metadados */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
              {album.genres.map((g) => (
                <span
                  key={g}
                  className="text-[10px] tracking-wider text-brand-400 uppercase bg-brand-600/10 border border-brand-600/20 px-2.5 py-1 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>

            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl tracking-tight leading-none">
              {album.title}
            </h1>
            <p className="text-brand-400 text-xl mt-2 hover:text-brand-300 cursor-pointer transition-colors">
              {album.artist}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {album.year} · {album.label} · {album.tracks.length} faixas · {album.duration}
            </p>

            {/* Rating + ações */}
            <div className="flex flex-wrap items-center gap-3 mt-5 justify-center sm:justify-start">
              <div className="flex items-center gap-2 bg-black/40 border border-white/8 rounded-xl px-4 py-2">
                <span className="text-yellow-400 text-3xl font-display font-bold leading-none">
                  {album.rating}
                </span>
                <div>
                  <p className="text-white/80 text-xs font-medium">/ 10</p>
                  <p className="text-gray-600 text-[10px]">{formatCount(album.totalRatings)} avaliações</p>
                </div>
              </div>

              <button className="btn-primary">+ Marcar como ouvido</button>
              <button className="btn-secondary">♡ Favoritar</button>
              <button className="btn-secondary">+ Lista</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTEÚDO PRINCIPAL ── */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">

        {/* ── Coluna esquerda ── */}
        <div className="flex-1 min-w-0">

          {/* Tabs */}
          <div className="flex border-b border-white/8 mb-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-4 py-2.5 text-sm border-b-2 transition-all duration-150
                  ${activeTab === tab.id
                    ? 'text-white border-brand-600'
                    : 'text-gray-600 border-transparent hover:text-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── ABA: Faixas ── */}
          {activeTab === 'faixas' && (
            <div className="card overflow-hidden animate-fade-in">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-gray-700 text-[10px] uppercase tracking-wider text-left px-4 py-3 w-8">#</th>
                    <th className="text-gray-700 text-[10px] uppercase tracking-wider text-left px-2 py-3">Título</th>
                    <th className="text-gray-700 text-[10px] uppercase tracking-wider text-right px-4 py-3">♡</th>
                    <th className="text-gray-700 text-[10px] uppercase tracking-wider text-right px-4 py-3">Dur.</th>
                  </tr>
                </thead>
                <tbody>
                  {album.tracks.map((track) => {
                    const isFav = userFavorites.has(track.number)
                    return (
                      <tr
                        key={track.number}
                        className="border-b border-white/4 last:border-0 hover:bg-white/3 transition-colors group"
                      >
                        <td className="px-4 py-3 text-gray-700 text-sm w-8">{track.number}</td>
                        <td className="px-2 py-3">
                          <span className={`text-sm ${isFav ? 'text-white font-medium' : 'text-gray-300'}`}>
                            {track.title}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => toggleFavTrack(track.number)}
                            className={`text-sm transition-colors ${isFav ? 'text-pink-400' : 'text-gray-800 hover:text-gray-600'}`}
                          >
                            {isFav ? '♥' : '♡'}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-gray-700 text-xs text-right tabular-nums">
                          {track.duration}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ── ABA: Reviews ── */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-4 animate-fade-in">
              {/* Formulário de review */}
              <ReviewForm albumTitle={album.title} />

              {/* Divisor */}
              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-white/5" />
                <span className="text-gray-700 text-xs">
                  {album.comments.length} reviews da comunidade
                </span>
                <div className="flex-1 h-px bg-white/5" />
              </div>

              {/* Lista de comentários */}
              {album.comments.map((c) => (
                <CommentCard key={c.id} comment={c} />
              ))}
            </div>
          )}
        </div>

        {/* ── Sidebar direita ── */}
        <aside className="w-full lg:w-60 shrink-0 flex flex-col gap-5">

          {/* Distribuição de notas */}
          <div className="card p-5">
            <h3 className="text-gray-500 text-[10px] uppercase tracking-wider mb-4">Distribuição de notas</h3>
            <div className="flex flex-col gap-2">
              {[...album.ratingDistribution].reverse().map((d) => (
                <RatingBar key={d.score} score={d.score} count={d.count} maxCount={maxCount} />
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className="text-gray-600 text-xs">Média</span>
              <span className="text-yellow-400 text-sm font-semibold">★ {album.rating}</span>
            </div>
          </div>

          {/* Detalhes */}
          <div className="card p-5">
            <h3 className="text-gray-500 text-[10px] uppercase tracking-wider mb-4">Detalhes</h3>
            <dl className="flex flex-col gap-3">
              {[
                { label: 'Artista',     value: album.artist },
                { label: 'Ano',         value: album.year   },
                { label: 'Gravadora',   value: album.label  },
                { label: 'Duração',     value: album.duration },
                { label: 'Faixas',      value: album.tracks.length },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-start gap-2">
                  <dt className="text-gray-700 text-xs shrink-0">{label}</dt>
                  <dd className="text-gray-300 text-xs text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Similares */}
          {/* {similar.length > 0 && (
            <div className="card p-5">
              <h3 className="text-gray-500 text-[10px] uppercase tracking-wider mb-4">Você também pode gostar</h3>
              <div className="flex flex-col gap-3">
                {similar.map((a) => (
                  <Link
                    key={a.id}
                    to={`/album/${a.id}`}
                    className="flex items-center gap-3 group"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${a.gradient || getGradient(a.title)} shrink-0`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-200 text-xs font-medium truncate group-hover:text-white transition-colors">
                        {a.title}
                      </p>
                      <p className="text-gray-600 text-[11px] truncate">{a.artist}</p>
                    </div>
                    <span className="text-yellow-400 text-xs shrink-0">★ {a.rating}</span>
                  </Link>
                ))}
              </div>
            </div>
          )} */}
        </aside>
      </main>

      <Footer />
    </div>
  )
}
