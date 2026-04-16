import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AlbumCard from "../../components/AlbumCard";

const albums = [
  {
    title: "Album 1",
    image: "https://placehold.co/1200x400"
  },
  {
    title: "Album 2",
    image: "https://placehold.co/1200x400"
  },
  {
    title: "Album 3",
    image: "https://placehold.co/1200x400"
  }
];

const comments = [
  "Obra-prima moderna",
  "Simplesmente incrível",
  "Melhor álbum do ano",
  "Produção absurda"
];

export default function HomePage() {
  const randomComment =
    comments[Math.floor(Math.random() * comments.length)];

  return (
    <>
      <Navbar />

      {/* 🔥 Destaque */}
      <section style={styles.hero}>
        <img
          src="https://via.placeholder.com/1200x500"
          style={styles.heroImg}
        />

        <div style={styles.overlay}>
          <h1>Nome do Álbum</h1>
          <p>{randomComment}</p>
          <p>⭐ 9.2</p>
        </div>
      </section>

      {/* 📀 Seção 1 */}
      <section style={styles.section}>
        <h2>Populares</h2>
        <div style={styles.row}>
          {albums.map((a, i) => (
            <AlbumCard key={i} album={a} />
          ))}
        </div>
      </section>

      {/* 📀 Seção 2 */}
      <section style={styles.section}>
        <h2>Mais Avaliados</h2>
        <div style={styles.row}>
          {albums.map((a, i) => (
            <AlbumCard key={i} album={a} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

const styles = {
  hero: { position: "relative" },
  heroImg: { width: "100%", height: "400px", objectFit: "cover" },
  overlay: {
    position: "absolute",
    top: "30%",
    left: "50px",
    color: "white"
  },
  section: { padding: "20px 40px" },
  row: { display: "flex", gap: "15px" }
};