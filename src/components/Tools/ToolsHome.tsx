import { useLang } from "../../context/LanguageContext";
import styles from "../Home/Home.module.css"; // Reutilizamos los estilos de Home

interface ToolsHomeProps {
  onSelectTool: (id: string) => void;
}

const ToolsHome = ({ onSelectTool }: ToolsHomeProps) => {
  const { lang } = useLang();

  const t = {
    en: {
      subtitle: "Enhance your connection",
      calendar: "Passion Calendar",
    },
    es: {
      subtitle: "Mejora vuestra conexión",
      calendar: "Calendario de Pasión",
    },
  }[lang as "en" | "es"];

  return (
    <div className="view">
      <header className={styles.header}>
        {/* Mismo contenedor de marca que en Home */}
        <div className={styles.brandContainer}>
          <img
            src={`${import.meta.env.BASE_URL}icons/icon-500.png`}
            alt="Spicy Games Logo"
            className={styles.pulsatingLogo}
          />
          <h1 className={styles.brandName}>
            Spicy<span>Games</span>
          </h1>
        </div>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.card} onClick={() => onSelectTool("calendar")}>
          <span className={styles.cardIcon}>📅</span>
          <div className={styles.cardText}>
            <h3>{t.calendar}</h3>
          </div>
        </div>

        {/* Aquí aparecerán las futuras herramientas con el mismo estilo */}
      </div>
    </div>
  );
};

export default ToolsHome;
