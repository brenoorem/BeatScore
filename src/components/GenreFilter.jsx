const GENRES = [
  'Todos',
  'Hip-Hop',
  'Indie Folk',
  'Pop',
  'Rock',
  'Jazz',
  'Eletrônico',
  'R&B',
  'Neo-Soul',
  'Art Rap',
  'Synth-Pop',
  'Shoegaze',
]

export default function GenreFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {GENRES.map((genre) => {
        const active = selected === genre
        return (
          <button
            key={genre}
            type="button"
            onClick={() => onChange(genre)}
            className={`
              text-xs px-3 py-1.5 rounded-full border transition-all duration-150
              ${active
                ? 'bg-brand-600 border-brand-600 text-white'
                : 'bg-white/4 border-white/8 text-gray-500 hover:border-white/20 hover:text-gray-300'
              }
            `}
          >
            {genre}
          </button>
        )
      })}
    </div>
  )
}