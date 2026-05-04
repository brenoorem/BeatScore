/* ─────────────────────────────────────────────────────────
   src/data/user.js
   Dados mockados do usuário logado.
   Substituir por chamadas à API quando tiver backend.
───────────────────────────────────────────────────────── */

import { ALBUMS } from './albums'

export const CURRENT_USER = {
  name:     'Marina Sousa',
  handle:   'marina_sounds',
  bio:      'ouvido demais, dormido de menos. indie folk quando tá bem, hip-hop quando não tá.',
  location: 'São Paulo, BR',
  avatarGradient: 'from-violet-600 to-pink-500',
  joinedYear: 2023,
  stats: {
    ouvidos:   47,
    reviews:   18,
    favoritos:  8,
  },
}

/* Álbuns que o usuário marcou como ouvido */
export const OUVIDOS = ALBUMS.slice(0, 4)

/* Álbuns favoritos */
export const FAVORITOS = ALBUMS.slice(0, 4).reverse()

/* Reviews escritas pelo usuário */
export const REVIEWS = [
  {
    id: 1,
    album:  ALBUMS[0],
    score:  9.0,
    date:   '27 out 2024',
    text:   'Tyler nunca soou tão humano. Chromakopia é honesta antes de qualquer coisa.',
    likes:  24,
  },
  {
    id: 2,
    album:  ALBUMS[5],
    score:  9.5,
    date:   '23 out 2024',
    text:   'Magistral. Magdalena Bay construiu um universo sonoro completamente próprio.',
    likes:  61,
  },
  {
    id: 3,
    album:  ALBUMS[1],
    score:  8.0,
    date:   '24 ago 2024',
    text:   'Pop consistente e bem produzido. Espresso e Please Please Please são irresistíveis.',
    likes:  13,
  },
]
