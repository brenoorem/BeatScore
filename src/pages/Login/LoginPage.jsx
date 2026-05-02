import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [tab, setTab]         = useState('login') // 'login' | 'register'
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: integrar com backend / auth
    console.log({ tab, email, password, username })
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f] flex flex-col items-center justify-center px-4 py-16">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-600 to-purple-400 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
            <circle cx="7.5" cy="7.5" r="3" stroke="white" strokeWidth="1.5" />
            <circle cx="7.5" cy="7.5" r="1.2" fill="white" />
            <path d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-white font-display font-semibold text-xl tracking-tight">
          BeatScore
        </span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-sm card p-8 animate-slide-up">

        {/* Tabs */}
        <div className="flex bg-white/5 rounded-lg p-1 mb-8">
          {['login', 'register'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`
                flex-1 py-1.5 text-sm rounded-md transition-all duration-200
                ${tab === t
                  ? 'bg-brand-600 text-white font-medium shadow'
                  : 'text-gray-500 hover:text-gray-300'
                }
              `}
            >
              {t === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === 'register' && (
            <div>
              <label className="block text-gray-500 text-xs mb-1.5">Nome de usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@seu_usuario"
                className="w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-brand-600 rounded-lg px-3 py-2.5 text-gray-200 text-sm placeholder-gray-700 outline-none transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-500 text-xs mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-brand-600 rounded-lg px-3 py-2.5 text-gray-200 text-sm placeholder-gray-700 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-500 text-xs mb-1.5">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-brand-600 rounded-lg px-3 py-2.5 text-gray-200 text-sm placeholder-gray-700 outline-none transition-colors"
            />
          </div>

          {tab === 'login' && (
            <div className="text-right -mt-1">
              <button type="button" className="text-brand-400 hover:text-brand-300 text-xs transition-colors">
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-primary py-2.5 mt-2 text-sm font-medium"
          >
            {tab === 'login' ? 'Entrar no BeatScore' : 'Criar minha conta'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-gray-700 text-xs">ou continue com</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        {/* OAuth (visual apenas) */}
        <div className="flex gap-3">
          {/* {['Google', 'Spotify', 'Apple'].map((provider) => ( */}
          {['Google'].map((provider) => (
            <button
              key={provider}
              className="flex-1 btn-secondary py-2 text-xs"
            >
              {provider}
            </button>
          ))}
        </div>

        <p className="text-gray-700 text-xs text-center mt-6 leading-relaxed">
          Ao continuar, você concorda com os{' '}
          <Link to="/termos" className="text-gray-500 hover:text-gray-300 underline underline-offset-2">
            Termos de Uso
          </Link>{' '}
          e a{' '}
          <Link to="/privacidade" className="text-gray-500 hover:text-gray-300 underline underline-offset-2">
            Política de Privacidade
          </Link>.
        </p>
      </div>

      <p className="text-gray-700 text-xs mt-6">
        <Link to="/" className="hover:text-gray-400 transition-colors">
          ← Voltar para o início
        </Link>
      </p>
    </div>
  )
}
