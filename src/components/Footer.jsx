import { Link } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Sobre',       to: '/sobre' },
  { label: 'Blog',        to: '/blog' },
  { label: 'API',         to: '/api' },
  { label: 'Privacidade', to: '/privacidade' },
  { label: 'Termos',      to: '/termos' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0c] mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo + copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-semibold text-white text-sm tracking-tight">
            BeatScore
          </span>
          <p className="text-gray-700 text-xs">
            © 2026 · Feito para quem ouve de verdade.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="text-gray-600 hover:text-gray-300 text-xs transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Redes sociais */}
        <div className="flex items-center gap-3">
          {['Instagram', 'Twitter / X', 'GitHub'].map((name) => (
            <a
              key={name}
              href="#"
              className="text-gray-700 hover:text-gray-300 text-xs transition-colors duration-150"
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
