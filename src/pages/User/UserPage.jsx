import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AlbumCard from '../../components/AlbumCard'
import { CURRENT_USER, OUVIDOS, FAVORITOS, REVIEWS } from '../../data/user'
/* ─── Stat simples ───────────────────────────────── */
function Stat({ label, value }) {
  return (
    <div className="text-center">
      <p className="text-white text-xl font-display font-semibold">{value}</p>
      <p className="text-gray-600 text-xs mt-0.5">{label}</p>
    </div>
  )
}

/* ─── Card de review ─────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <Link
      to={`/album/${review.album.id}`}
      className="card p-4 flex gap-4 hover:bg-white/[0.03] transition-colors group"
    >
      {/* Capa */}
      <div
        className={`w-14 h-14 rounded-lg bg-gradient-to-br ${review.album.gradient} shrink-0`}
      />

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-gray-200 text-sm font-medium group-hover:text-white transition-colors truncate">
              {review.album.title}
            </p>
            <p className="text-gray-600 text-xs mt-0.5">{review.album.artist}</p>
          </div>
          <span className="text-yellow-400 text-sm font-semibold shrink-0">
            ★ {review.score}
          </span>
        </div>
        <p className="text-gray-500 text-xs leading-relaxed mt-2 line-clamp-2 italic">
          "{review.text}"
        </p>
        <p className="text-gray-700 text-[11px] mt-2">{review.date} · ♡ {review.likes}</p>
      </div>
    </Link>
  )
}

/* ─── Tabs ───────────────────────────────────────── */
const TABS = [
  { id: 'ouvidos',   label: 'Ouvidos'   },
  { id: 'favoritos', label: 'Favoritos' },
  { id: 'reviews',   label: 'Reviews'   },
]

/* ─── Página ─────────────────────────────────────── */
export default function UserPage() {
  const [activeTab, setActiveTab] = useState('ouvidos')
  const user = CURRENT_USER

  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      <Navbar />

      {/* ── Perfil ── */}
      <section className="border-b border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">

          {/* Avatar */}
          <div
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${user.avatarGradient} shrink-0 ring-4 ring-[#0d0d0f]`}
          />

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-white text-2xl font-display font-semibold">
              {user.name}
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">@{user.handle} · {user.location}</p>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">{user.bio}</p>
          </div>

          {/* Ação */}
          <Link
            to="/usuario/editar"
            className="btn-secondary text-sm shrink-0"
          >
            Editar perfil
          </Link>
        </div>

        {/* Stats */}
        <div className="max-w-3xl mx-auto px-6 pb-6 flex justify-center sm:justify-start gap-10">
          <Stat label="ouvidos"   value={user.stats.ouvidos}   />
          <Stat label="reviews"   value={user.stats.reviews}   />
          <Stat label="favoritos" value={user.stats.favoritos} />
        </div>

        {/* Tabs */}
        <div className="max-w-3xl mx-auto px-6 flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
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
      </section>

      {/* ── Conteúdo da tab ── */}
      <main className="max-w-3xl mx-auto px-6 py-8">

        {/* Ouvidos */}
        {activeTab === 'ouvidos' && (
          <div className="animate-fade-in">
            <p className="text-gray-600 text-xs mb-5">
              {user.stats.ouvidos} álbuns ouvidos
            </p>
            <div className="album-grid">
              {OUVIDOS.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </div>
        )}

        {/* Favoritos */}
        {activeTab === 'favoritos' && (
          <div className="animate-fade-in">
            <p className="text-gray-600 text-xs mb-5">
              {user.stats.favoritos} álbuns favoritos
            </p>
            <div className="album-grid">
              {FAVORITOS.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-3 animate-fade-in">
            <p className="text-gray-600 text-xs mb-2">
              {user.stats.reviews} reviews escritas
            </p>
            {REVIEWS.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

      </main>

      <Footer />
    </div>
  )
}
