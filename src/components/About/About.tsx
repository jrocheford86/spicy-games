import { useLang } from "../../context/LanguageContext";
import styles from "./About.module.css";

const About = () => {
  const { lang } = useLang();

  const translations = {
    en: {
      story_title: "The Heart behind the App",
      story_body:
        "Spicy Games was born as a special gift for my wife, created with the intention of keeping the spark alive through play. This app is dedicated to all couples who are tired of the routine and want to bring back the fun and excitement to their intimate moments. Because we believe that intimacy should be a space for laughter, discovery, and connection.",
      created_by: "Created by",
      connect: "Connect with me",
      name: "J. Rocheford",
    },
    es: {
      story_title: "El corazón detrás de la App",
      story_body:
        "Spicy Games nació como un regalo especial para mi esposa, creado con la intención de mantener viva la chispa a través del juego. Esta aplicación está dedicada a todas las parejas que están cansadas de la rutina y desean devolverle la diversión y la emoción a sus momentos íntimos. Porque creemos que la intimidad debe ser un espacio para reír, descubrir y conectar.",
      created_by: "Creado por",
      connect: "Conecta conmigo",
      name: "J. Rocheford",
    },
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <div className="view">
      <div className={styles.aboutContainer}>
        <div className={styles.heartIcon}>❤️</div>

        <section className={styles.storySection}>
          <h2>{t.story_title}</h2>
          <p>{t.story_body}</p>
        </section>

        <hr className={styles.divider} />

        <section className={styles.authorSection}>
          <span className={styles.label}>{t.created_by}</span>
          <h3 className={styles.name}>{t.name}</h3>

          <div className={styles.socialLinks}>
            <p>{t.connect}</p>
            <div className={styles.iconGrid}>
              {/* GitHub */}
              <a
                href="https://github.com/jrocheford86"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/jrochefordlouis"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </section>

        <div className={styles.version}>v1.0.0</div>
      </div>
    </div>
  );
};

export default About;
