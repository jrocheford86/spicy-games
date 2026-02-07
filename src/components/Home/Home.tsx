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
    },
    es: {
      title: "Juegos<span>Picantes</span>",
      subtitle: "Selecciona tu aventura",
      kamasutra: "Ruleta Kamasutra",
    },
  }[lang as "en" | "es"];

  return (
    <div className="view">
      <header className={styles.header}>
        <h1 dangerouslySetInnerHTML={{ __html: t.title }} />
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card} onClick={() => onSelectGame("kamasutra")}>
          <span className={styles.cardIcon}>🔥</span>
          <div className={styles.cardText}>
            <h3>{t.kamasutra}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
