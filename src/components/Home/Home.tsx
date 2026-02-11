import { useLang } from "../../context/LanguageContext";
import styles from "./Home.module.css";

interface HomeProps {
  onSelectGame: (id: string) => void;
}

const Home = ({ onSelectGame }: HomeProps) => {
  const { lang } = useLang();

  // Solo traducimos el subtítulo, el nombre se queda fijo
  const t = {
    en: {
      subtitle: "Select your adventure",
      kamasutra: "Kamasutra Roulette",
      truthOrDare: "Truth or Dare",
    },
    es: {
      subtitle: "Selecciona tu aventura",
      kamasutra: "Ruleta Kamasutra",
      truthOrDare: "Verdad o Reto",
    },
  }[lang as "en" | "es"];

  return (
    <div className="view">
      <header className={styles.header}>
        <div className={styles.brandContainer}>
          <img
            src={`${import.meta.env.BASE_URL}icons/icon-500.png`}
            alt="Spicy Games Logo"
            className={styles.pulsatingLogo} // Cambiamos el nombre de la clase
          />
          <h1 className={styles.brandName}>
            Spicy<span>Games</span>
          </h1>
        </div>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.grid}>
        <div
          className={styles.card}
          onClick={() => onSelectGame("game-kamasutra")}
        >
          <span className={styles.cardIcon}>🔥</span>
          <div className={styles.cardText}>
            <h3>{t.kamasutra}</h3>
          </div>
        </div>

        <div className={styles.card} onClick={() => onSelectGame("game-truth")}>
          <span className={styles.cardIcon}>🃏</span>
          <div className={styles.cardText}>
            <h3>{t.truthOrDare}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
