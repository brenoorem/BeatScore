export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>BeatScore © 2026</p>
      <div>
        <span>Instagram</span> | <span>Twitter</span> | <span>GitHub</span>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    padding: "20px",
    background: "#111",
    textAlign: "center",
    marginTop: "30px"
  }
};