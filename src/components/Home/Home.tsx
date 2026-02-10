import { useLang } from "../../context/LanguageContext";
import styles from "./Home.module.css";

interface HomeProps {
  onSelectGame: (id: string) => void;
}

const Home = ({ onSelectGame }: HomeProps) => {
  const { lang } = useLang();

  const t = {
    en: {
      title: "Spicy<span>Games</span>",
      subtitle: "Select your adventure",
      kamasutra: "Kamasutra Roulette",
      truthOrDare: "Truth or Dare",
    },
    es: {
      title: "Juegos<span>Picantes</span>",
      subtitle: "Selecciona tu aventura",
      kamasutra: "Ruleta Kamasutra",
      truthOrDare: "Verdad o Reto",
    },
  }[lang as "en" | "es"];

  return (
    <div className="view">
      <header className={styles.header}>
        <h1 dangerouslySetInnerHTML={{ __html: t.title }} />
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.grid}>
        {/* JUEGO 1: KAMASUTRA */}
        <div
          className={styles.card}
          onClick={() => onSelectGame("game-kamasutra")}
        >
          <span className={styles.cardIcon}>🔥</span>
          <div className={styles.cardText}>
            <h3>{t.kamasutra}</h3>
          </div>
        </div>

        {/* JUEGO 2: VERDAD O RETO */}
        <div className={styles.card} onClick={() => onSelectGame("game-truth")}>
          <span className={styles.cardIcon}>🃏</span>
          <div className={styles.cardText}>
            <h3>{t.truthOrDare}</h3>
          </div>
        </div>

        {/* PROXIMAMENTE: Aquí puedes añadir más tarjetas en el futuro */}
      </div>
    </div>
  );
};

export default Home;
