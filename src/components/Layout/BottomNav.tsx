import { useLang } from "../../context/LanguageContext";
import styles from "./BottomNav.module.css";

interface BottomNavProps {
  currentView: string;
  setView: (view: "home" | "about" | "game") => void;
  onOpenLang: () => void;
}

const BottomNav = ({ currentView, setView, onOpenLang }: BottomNavProps) => {
  const { lang } = useLang();

  const labels = {
    en: { games: "Games", lang: "Lang", about: "About" },
    es: { games: "Juegos", lang: "Idioma", about: "Acerca" },
  }[lang];

  return (
    <nav className={styles.nav}>
      <button
        onClick={() => setView("home")}
        className={`${styles.item} ${currentView === "home" ? styles.active : ""}`}
      >
        <span className={styles.icon}>🎮</span>
        <span className={styles.label}>{labels.games}</span>
      </button>

      <button onClick={onOpenLang} className={styles.item}>
        <span className={styles.icon}>🌐</span>
        <span className={styles.label}>{labels.lang}</span>
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
