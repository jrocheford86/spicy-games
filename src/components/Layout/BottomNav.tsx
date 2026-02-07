import { useLang } from "../../context/LanguageContext";
import styles from "./BottomNav.module.css";

interface BottomNavProps {
  currentView: string;
  setView: (view: "home" | "tools" | "about") => void;
}

const BottomNav = ({ currentView, setView }: BottomNavProps) => {
  const { lang } = useLang();

  const labels = {
    en: { games: "Games", tools: "Tools", about: "About" },
    es: { games: "Juegos", tools: "Herramientas", about: "Acerca" },
  }[lang as "en" | "es"];

  return (
    <nav className={styles.nav}>
      <button
        onClick={() => setView("home")}
        className={`${styles.item} ${currentView === "home" ? styles.active : ""}`}
      >
        <span className={styles.icon}>🎮</span>
        <span className={styles.label}>{labels.games}</span>
      </button>

      <button
        onClick={() => setView("tools")}
        className={`${styles.item} ${currentView === "tools" ? styles.active : ""}`}
      >
        <span className={styles.icon}>🛠️</span>
        <span className={styles.label}>{labels.tools}</span>
      </button>

      <button
        onClick={() => setView("about")}
        className={`${styles.item} ${currentView === "about" ? styles.active : ""}`}
      >
        <span className={styles.icon}>👤</span>
        <span className={styles.label}>{labels.about}</span>
      </button>
    </nav>
  );
};

export default BottomNav;
