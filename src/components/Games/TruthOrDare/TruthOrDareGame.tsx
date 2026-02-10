import React, { useState, useMemo } from "react";
import { useLang } from "../../../context/LanguageContext";
import type {
  TruthDareMode,
  TruthDareEntry,
  TruthOrDareData,
} from "../../../types";
import dataRaw from "../../../data/truthOrDareData.json";
import styles from "./TruthOrDare.module.css";

const data = dataRaw as TruthOrDareData;

interface Props {
  onExit: () => void;
}

export const TruthOrDareGame: React.FC<Props> = ({ onExit }) => {
  const { lang } = useLang();
  const [selectedMode, setSelectedMode] = useState<
    TruthDareMode | "mix" | null
  >(null);
  const [currentCard, setCurrentCard] = useState<TruthDareEntry | null>(null);
  const [cardType, setCardType] = useState<"truth" | "dare" | null>(null);

  // Lógica para el modo MIX (Combina todo)
  const mixedData = useMemo(() => {
    const allTruths = data.modes.flatMap((m) => m.truths);
    const allDares = data.modes.flatMap((m) => m.dares);
    return { truths: allTruths, dares: allDares };
  }, []);

  const handleGetRandom = (type: "truth" | "dare") => {
    const source = selectedMode === "mix" ? mixedData : selectedMode;
    if (!source) return;

    const list = type === "truth" ? source.truths : source.dares;
    const random = list[Math.floor(Math.random() * list.length)];

    setCurrentCard(random);
    setCardType(type);
    if (navigator.vibrate) navigator.vibrate(40);
  };

  const resetGame = () => {
    setCurrentCard(null);
    setCardType(null);
  };

  return (
    <div className={styles.gameView}>
      <header className={styles.gameHeader}>
        <button onClick={onExit} className={styles.closeBtn}>
          ✕
        </button>
        <span>{lang === "es" ? "Verdad o Reto" : "Truth or Dare"}</span>
      </header>

      {/* PASO 1: SELECCIONAR MODO */}
      {!selectedMode && (
        <div className={styles.modeGrid}>
          <p className={styles.label}>
            {lang === "es" ? "Selecciona un modo:" : "Select a mode:"}
          </p>
          {data.modes.map((mode) => (
            <button
              key={mode.id}
              className={styles.modeBtn}
              onClick={() => setSelectedMode(mode)}
            >
              <span className={styles.modeIcon}>{mode.icon}</span>
              <span className={styles.modeName}>
                {mode.name[lang as "en" | "es"]}
              </span>
            </button>
          ))}
          <button
            className={`${styles.modeBtn} ${styles.mixBtn}`}
            onClick={() => setSelectedMode("mix")}
          >
            <span className={styles.modeIcon}>🌀</span>
            <span className={styles.modeName}>
              {lang === "es" ? "Combinado" : "Mix All"}
            </span>
          </button>
        </div>
      )}

      {/* PASO 2: ELEGIR VERDAD O RETO */}
      {selectedMode && !currentCard && (
        <div className={styles.choiceMenu}>
          <button
            className={styles.backBtnSmall}
            onClick={() => setSelectedMode(null)}
          >
            ←
          </button>
          <div className={styles.modeTitle}>
            {selectedMode === "mix"
              ? lang === "es"
                ? "Modo Combinado"
                : "Mixed Mode"
              : selectedMode.name[lang as "en" | "es"]}
          </div>
          <div className={styles.btnGrid}>
            <button
              className={styles.truthBtn}
              onClick={() => handleGetRandom("truth")}
            >
              {lang === "es" ? "VERDAD" : "TRUTH"}
            </button>
            <button
              className={styles.dareBtn}
              onClick={() => handleGetRandom("dare")}
            >
              {lang === "es" ? "RETO" : "DARE"}
            </button>
          </div>
        </div>
      )}

      {/* PASO 3: MOSTRAR CARTA */}
      {currentCard && (
        <div
          className={`${styles.card} ${cardType === "truth" ? styles.borderTruth : styles.borderDare}`}
        >
          <div className={styles.cardTag}>{cardType?.toUpperCase()}</div>
          <p className={styles.cardText}>
            {currentCard.text[lang as "en" | "es"]}
          </p>
          <button className={styles.nextBtn} onClick={resetGame}>
            {lang === "es" ? "OTRA VEZ" : "NEXT"}
          </button>
        </div>
      )}
    </div>
  );
};
