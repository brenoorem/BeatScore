import { useState } from 'react'
import { Link } from 'react-router-dom'

/* Gradientes para quando não há imagem real */
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
  const idx = title.charCodeAt(0) % PLACEHOLDER_GRADIENTS.length
  return PLACEHOLDER_GRADIENTS[idx]
}

export default function AlbumCard({ album }) {
  const [hovered, setHovered] = useState(false)
  const gradient = album.gradient || getGradient(album.title)

  /* Slug: usa album.id se vier do banco, senão gera pelo título */
  const slug = album.id ?? album.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  return (
    <article
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Capa — clique vai para /album/:slug */}
      <Link to={`/album/${slug}`} className="block">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 shadow-lg">
          {album.image ? (
            <img
              src={album.image}
              alt={album.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${gradient} transition-transform duration-300 group-hover:scale-105`}
            />
          )}

          {/* Overlay no hover */}
          <div
            className={`
              absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2
              transition-opacity duration-200
              ${hovered ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <span className="text-white text-xs font-medium bg-brand-600 px-3 py-1 rounded-full">
              Ver álbum
            </span>
          </div>

          {/* Rating badge */}
          {album.rating && (
            <div className="absolute bottom-1.5 left-1.5 bg-black/70 backdrop-blur-sm text-yellow-400 text-[11px] font-medium px-1.5 py-0.5 rounded">
              ★ {album.rating}
            </div>
          )}

          {/* Status badge */}
          {album.status === 'ouvido' && (
            <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-brand-600/80 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </Link>

      {/* Texto */}
      <div>
        <Link to={`/album/${slug}`}>
          <p className="text-gray-200 text-[13px] font-medium leading-tight truncate hover:text-white transition-colors">
            {album.title}
          </p>
        </Link>
        {album.artist && (
          <p className="text-gray-600 text-[11px] mt-0.5 truncate">
            {album.artist}
          </p>
        )}
      </div>
    </article>
  )
}
