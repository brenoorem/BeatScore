export default function AlbumCard({ album }) {
  return (
    <div style={styles.card}>
      <img src={album.image} style={styles.img} />
      <p>{album.title}</p>
    </div>
  );
}

const styles = {
  card: { width: "150px" },
  img: { width: "100%", borderRadius: "8px" }
};