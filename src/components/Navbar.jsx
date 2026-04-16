import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <span style={styles.logo}>🎵</span>
        <Link to="/" style={styles.title}>BeatScore</Link>
      </div>

      <div style={styles.right}>
        <input placeholder="Buscar álbum..." style={styles.search} />
        <button style={styles.btn}>Login</button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#111",
    borderBottom: "1px solid #222",
    fontSize: "26px"
  },
  left: { display: "flex", gap: "10px", alignItems: "center" },
  title: { fontWeight: "bold", fontSize: "18px" },
  right: { display: "flex", gap: "10px" },
  search: {
    padding: "5px",
    background: "#1a1a1f",
    border: "1px solid #333",
    color: "white"
  },
  btn: {
    background: "#6a0dad",
    border: "none",
    color: "white",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "8px"
  }
};