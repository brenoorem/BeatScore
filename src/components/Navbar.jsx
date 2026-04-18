import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const NAV_LINKS = [
  { label: 'Feed',     to: '/' },
  { label: 'Explorar', to: '/explorar' },
  { label: 'Listas',   to: '/listas' },
  { label: 'Reviews',  to: '/reviews' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#0d0d0f]/90 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-600 to-purple-400 flex items-center justify-center">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="3" stroke="white" strokeWidth="1.5" />
              <circle cx="7.5" cy="7.5" r="1.2" fill="white" />
              <path d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span
            className="text-white font-display font-semibold text-[17px] tracking-tight"
          >
            BeatScore
          </span>
        </Link>

        {/* Links centrais */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, to }) => {
            const active = pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`
                    px-3 py-1.5 rounded-md text-sm transition-colors duration-150
                    ${active
                      ? 'text-white bg-white/8'
                      : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Busca + ações */}
        <div className="flex items-center gap-3">
          <div
            className={`
              hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm transition-all duration-200
              ${searchFocused
                ? 'border-brand-600/60 bg-[#111114] w-52'
                : 'border-white/8 bg-white/4 w-40 hover:border-white/15'
              }
            `}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0">
              <circle cx="5.5" cy="5.5" r="4" stroke="#6b7280" strokeWidth="1.3" />
              <path d="M9 9l2.5 2.5" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              placeholder="Buscar álbuns..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent outline-none text-gray-300 placeholder-gray-600 text-sm w-full"
            />
          </div>

          <Link
            to="/login"
            className="btn-primary text-sm px-4 py-1.5"
          >
            Entrar
          </Link>
        </div>
      </nav>
    </header>
  )
}
