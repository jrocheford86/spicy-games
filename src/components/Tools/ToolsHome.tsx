import { useLang } from "../../context/LanguageContext";
import styles from "../Home/Home.module.css";

interface Props {
  onSelectTool: (id: string) => void;
}

const ToolsHome = ({ onSelectTool }: Props) => {
  const { lang } = useLang();

  const t = {
    en: {
      title: "Your<span>Tools</span>",
      subtitle: "Tracking & More",
      calendar: "Passion Tracker",
    },
    es: {
      title: "Tus<span>Herramientas</span>",
      subtitle: "Registro y más",
      calendar: "Registro de Pasión",
    },
  }[lang as "en" | "es"];

  return (
    <div className="view">
      <header className={styles.header}>
        <h1 dangerouslySetInnerHTML={{ __html: t.title }} />
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card} onClick={() => onSelectTool("calendar")}>
          <span className={styles.cardIcon}>📅</span>
          <div className={styles.cardText}>
            <h3>{t.calendar}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsHome;
