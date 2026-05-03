import express, { json } from 'express';
const app = express();
const PORT = 3000;

app.use(json());

const albums = [
  {
    id: 1,
    title: 'Abbey Road',
    artist: 'The Beatles',
    year: 1969,
    genre: 'Rock',
    tracks: [
      { number: 1, title: 'Come Together', duration: '4:19' },
      { number: 2, title: 'Something',     duration: '3:03' },
      { number: 3, title: 'Here Comes the Sun', duration: '3:05' },
    ],
  },
  {
    id: 2,
    title: 'Thriller',
    artist: 'Michael Jackson',
    year: 1982,
    genre: 'Pop / R&B',
    tracks: [
      { number: 1, title: 'Wanna Be Startin\' Somethin\'', duration: '6:02' },
      { number: 2, title: 'Billie Jean',                  duration: '4:54' },
      { number: 3, title: 'Thriller',                     duration: '5:57' },
    ],
  },
];

// GET /albums — retorna todos os álbuns
app.get('/albums', (req, res) => {
  res.json(albums);
});

// GET /albums/:id — retorna um álbum específico
app.get('/albums/:id', (req, res) => {
  const album = albums.find(a => a.id === Number(req.params.id));
  if (!album) {
    return res.status(404).json({ error: 'Álbum não encontrado' });
  }
  res.json(album);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});