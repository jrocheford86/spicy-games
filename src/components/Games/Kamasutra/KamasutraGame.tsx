import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../context/LanguageContext";

// Fíjate en el "type" añadido aquí:
import type { Position, TimeOption, GameData } from "../../../types";

import dataRaw from "../../../data/kamasutraData.json";
import styles from "./Kamasutra.module.css";

const data = dataRaw as GameData;

interface Props {
  onExit: () => void;
  onShowAlert: (title: string, body: string) => void;
}

export const KamasutraGame: React.FC<Props> = ({ onExit, onShowAlert }) => {
  const { lang } = useLang();
  const [view, setView] = useState<"spin" | "result" | "timer">("spin");
  const [isSpinning, setIsSpinning] = useState(false);
  const [selection, setSelection] = useState<{
    p: Position;
    t: TimeOption;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const timerRef = useRef<number | undefined>(undefined);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const winnerIdx = Math.floor(Math.random() * data.positions.length);
    const winTime = data.times[Math.floor(Math.random() * data.times.length)];
    const itemHeight = 250;
    const totalItems = data.positions.length;

    // Animación manual del strip para asegurar que funcione
    if (stripRef.current) {
      stripRef.current.style.transition = "none";
      stripRef.current.style.transform = "translateY(0)";
    }

    setTimeout(() => {
      if (stripRef.current) {
        const finalLanding = (totalItems + winnerIdx) * itemHeight;
        stripRef.current.style.transition =
          "transform 1.5s cubic-bezier(0.15, 0.85, 0.35, 1.05)";
        stripRef.current.style.transform = `translateY(-${finalLanding}px)`;
      }
    }, 50);

    setTimeout(() => {
      setSelection({ p: data.positions[winnerIdx], t: winTime });
      setIsSpinning(false);
      setView("result");
    }, 2000);
  };

  const startTimer = (t: TimeOption) => {
    if (navigator.vibrate) navigator.vibrate(50);
    setView("timer");
    setTimeLeft(t.seconds);
    const end = Date.now() + t.seconds * 1000;

    timerRef.current = window.setInterval(() => {
      const remaining = Math.ceil((end - Date.now()) / 1000);
      if (remaining <= 0) {
        clearInterval(timerRef.current);
        if (navigator.vibrate) navigator.vibrate([400, 200, 400]);
        onShowAlert(lang === "es" ? "¡Tiempo!" : "Time's up!", "🔥");
        setView("spin");
      } else {
        setTimeLeft(remaining);
      }
    }, 500);
  };

  return (
    <div className={styles.gameView}>
      <header className={styles.gameHeader}>
        <button onClick={onExit} className={styles.closeBtn}>
          ✕
        </button>
        <span>{lang === "es" ? "Ruleta" : "Roulette"}</span>
      </header>

      {view === "spin" && (
        <div className={styles.rouletteWrapper}>
          <div className={styles.viewport}>
            <div
              ref={stripRef}
              className={`${styles.strip} ${isSpinning ? styles.blur : ""}`}
            >
              {[...data.positions, ...data.positions, ...data.positions].map(
                (pos, i) => (
                  <div key={i} className={styles.stripItem}>
                    <img
                      src={`${import.meta.env.BASE_URL}${pos.image}`}
                      alt=""
                    />
                    <span>{pos.name[lang]}</span>
                  </div>
                ),
              )}
            </div>
            <div className={styles.marker}></div>
          </div>
          <button
            className={styles.mainBtn}
            onClick={handleSpin}
            disabled={isSpinning}
          >
            {lang === "es" ? "GIRAR" : "SPIN"}
          </button>
        </div>
      )}

      {view === "result" && selection && (
        <div className={styles.resultCard}>
          <div className={styles.imgBox}>
            <img
              src={`${import.meta.env.BASE_URL}${selection.p.image}`}
              alt=""
            />
            <button
              className={styles.infoBtn}
              onClick={() =>
                onShowAlert(selection.p.name[lang], selection.p.info[lang])
              }
            >
              i
            </button>
          </div>
          <h2>{selection.p.name[lang]}</h2>
          <div className={styles.tag}>{selection.p.difficulty[lang]}</div>
          <p>
            {lang === "es" ? "Objetivo" : "Target"}:{" "}
            <strong>{selection.t.label[lang]}</strong>
          </p>
          <button
            className={styles.mainBtn}
            onClick={() => startTimer(selection.t)}
          >
            START
          </button>
          <button className={styles.secBtn} onClick={() => setView("spin")}>
            RETRY
          </button>
        </div>
      )}

      {view === "timer" && (
        <div className={styles.timerBox}>
          <div className={styles.clock}>
            {Math.floor(timeLeft / 60)
              .toString()
              .padStart(2, "0")}
            :{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
          <button className={styles.secBtn} onClick={() => setView("spin")}>
            CANCEL
          </button>
        </div>
      )}
    </div>
  );
};
