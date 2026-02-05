import { useLang } from "../../context/LanguageContext";
import styles from "./Home.module.css";

interface HomeProps {
  onSelectGame: (id: string) => void;
}

const Home = ({ onSelectGame }: HomeProps) => {
  const { lang } = useLang();

  const t = {
    en: { title: "Spicy<span>Games</span>", kamasutra: "Kamasutra Roulette" },
    es: { title: "Juegos<span>Picantes</span>", kamasutra: "Ruleta Kamasutra" },
  }[lang];

  return (
    <div className="view">
      <header className={styles.header}>
        <h1 dangerouslySetInnerHTML={{ __html: t.title }} />
      </header>
      <div className={styles.grid}>
        <div className={styles.card} onClick={() => onSelectGame("kamasutra")}>
          <span className={styles.cardIcon}>🔥</span>
          <h3>{t.kamasutra}</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
