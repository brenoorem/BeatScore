import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { CURRENT_USER } from '../../data/user'

/* ─── Gradientes disponíveis para o avatar ──────── */
const AVATAR_GRADIENTS = [
  { id: 'violet-pink',    class: 'from-violet-600 to-pink-500'    },
  { id: 'blue-cyan',      class: 'from-blue-600 to-cyan-400'      },
  { id: 'emerald-teal',   class: 'from-emerald-600 to-teal-400'   },
  { id: 'amber-yellow',   class: 'from-amber-600 to-yellow-400'   },
  { id: 'rose-pink',      class: 'from-rose-600 to-pink-400'      },
  { id: 'indigo-blue',    class: 'from-indigo-600 to-blue-400'    },
  { id: 'purple-fuchsia', class: 'from-purple-600 to-fuchsia-400' },
  { id: 'green-emerald',  class: 'from-green-600 to-emerald-400'  },
]

/* ─── Campo de formulário reutilizável ───────────── */
function Field({ label, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-gray-400 text-sm font-medium">{label}</label>
        {hint && <span className="text-gray-700 text-xs">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

const INPUT_CLASS =
  'w-full bg-white/5 border border-white/8 hover:border-white/15 focus:border-brand-600 rounded-lg px-3 py-2.5 text-gray-200 text-sm placeholder-gray-600 outline-none transition-colors'

/* ─── Página ─────────────────────────────────────── */
export default function EditProfilePage() {
  const navigate = useNavigate()
  const user     = CURRENT_USER

  /* Estado do formulário — inicia com os dados atuais */
  const [name,           setName]           = useState(user.name)
  const [handle,         setHandle]         = useState(user.handle)
  const [bio,            setBio]            = useState(user.bio)
  const [location,       setLocation]       = useState(user.location)
  const [avatarGradient, setAvatarGradient] = useState(user.avatarGradient)
  const [saved,          setSaved]          = useState(false)

  const handleValid  = handle.trim().length >= 3
  const nameValid    = name.trim().length >= 2
  const canSave      = handleValid && nameValid

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSave) return
    /* TODO: chamar API para salvar */
    setSaved(true)
    setTimeout(() => navigate(`/usuario/${handle.trim()}`), 1200)
  }

  return (
    <div className="min-h-screen bg-[#0d0d0f]">
      <Navbar />

      <main className="max-w-xl mx-auto px-6 py-10">

        {/* Cabeçalho */}
        <div className="flex items-center gap-3 mb-8">
          <Link
            to={`/usuario/${user.handle}`}
            className="text-gray-600 hover:text-gray-300 transition-colors text-sm"
          >
            ← Voltar
          </Link>
          <span className="text-gray-800">/</span>
          <h1 className="text-white text-lg font-display font-semibold">
            Editar perfil
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* ── Avatar ── */}
          <div className="card p-5">
            <p className="text-gray-400 text-sm font-medium mb-4">Avatar</p>

            {/* Preview */}
            <div className="flex items-center gap-5 mb-5">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarGradient} ring-2 ring-brand-600/40 shrink-0`}
              />
              <div>
                <p className="text-gray-300 text-sm">{name || 'Seu nome'}</p>
                <p className="text-gray-600 text-xs">@{handle || 'seu_usuario'}</p>
              </div>
            </div>

            {/* Seletor de gradiente */}
            <p className="text-gray-600 text-xs mb-3">Escolha uma cor</p>
            <div className="flex flex-wrap gap-2">
              {AVATAR_GRADIENTS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setAvatarGradient(g.class)}
                  className={`
                    w-8 h-8 rounded-full bg-gradient-to-br ${g.class} transition-all duration-150
                    ${avatarGradient === g.class
                      ? 'ring-2 ring-offset-2 ring-offset-[#111114] ring-brand-500 scale-110'
                      : 'hover:scale-105 opacity-70 hover:opacity-100'
                    }
                  `}
                />
              ))}
            </div>
          </div>

          {/* ── Informações básicas ── */}
          <div className="card p-5 flex flex-col gap-5">
            <p className="text-gray-400 text-sm font-medium">Informações</p>

            <Field label="Nome" hint={`${name.length}/50`}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 50))}
                placeholder="Seu nome"
                className={INPUT_CLASS}
              />
              {name.trim().length > 0 && name.trim().length < 2 && (
                <p className="text-rose-400 text-xs">Mínimo 2 caracteres</p>
              )}
            </Field>

            <Field label="Nome de usuário" hint={`${handle.length}/30`}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm">@</span>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) =>
                    setHandle(
                      e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9_.]/g, '')
                        .slice(0, 30)
                    )
                  }
                  placeholder="seu_usuario"
                  className={`${INPUT_CLASS} pl-7`}
                />
              </div>
              {handle.length > 0 && !handleValid && (
                <p className="text-rose-400 text-xs">Mínimo 3 caracteres</p>
              )}
            </Field>

            <Field label="Bio" hint={`${bio.length}/160`}>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value.slice(0, 160))}
                placeholder="Fale um pouco sobre você e seu gosto musical..."
                rows={3}
                className={`${INPUT_CLASS} resize-none`}
              />
            </Field>

            <Field label="Localização" hint="opcional">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value.slice(0, 60))}
                placeholder="ex: São Paulo, BR"
                className={INPUT_CLASS}
              />
            </Field>
          </div>

          {/* ── Ações ── */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!canSave || saved}
              className={`
                flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${saved
                  ? 'bg-emerald-600/20 border border-emerald-600/40 text-emerald-400 cursor-default'
                  : canSave
                    ? 'btn-primary'
                    : 'bg-white/5 text-gray-700 cursor-not-allowed'
                }
              `}
            >
              {saved ? '✓ Salvo!' : 'Salvar alterações'}
            </button>

            <Link
              to={`/usuario/${user.handle}`}
              className="btn-secondary py-2.5 px-5 text-sm text-center"
            >
              Cancelar
            </Link>
          </div>

        </form>
      </main>

      <Footer />
    </div>
  )
}
