import React, { useState, useRef, useEffect } from "react";
import { useLang } from "../../../context/LanguageContext";
import type { Position, TimeOption } from "../../../types";
import data from "../../../data/kamasutraData.json";
import styles from "./Kamasutra.module.css";

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
  const wakeLock = useRef<any>(null);

  // Limpiar recursos al salir
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (wakeLock.current) wakeLock.current.release();
    };
  }, []);

  const handleSpin = () => {
    setIsSpinning(true);
    // Seleccionar aleatorios
    const p = data.positions[Math.floor(Math.random() * data.positions.length)];
    const t = data.times[Math.floor(Math.random() * data.times.length)];

    // Simular el giro (el CSS se encarga de la animación via clase .blur)
    setTimeout(() => {
      setSelection({ p: p as Position, t: t as TimeOption });
      setIsSpinning(false);
      setView("result");
    }, 1800);
  };

  const startTimer = async () => {
    if (!selection) return;
    if (navigator.vibrate) navigator.vibrate(50);

    // Intentar Wake Lock (Mantener pantalla encendida)
    if ("wakeLock" in navigator) {
      try {
        wakeLock.current = await (navigator as any).wakeLock.request("screen");
      } catch {}
    }

    setView("timer");
    const end = Date.now() + selection.t.seconds * 1000;

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
        <span>{lang === "es" ? "Ruleta Kamasutra" : "Kamasutra Roulette"}</span>
      </header>

      {view === "spin" && (
        <div className={styles.rouletteWrapper}>
          <div className={styles.viewport}>
            <div className={`${styles.strip} ${isSpinning ? styles.blur : ""}`}>
              {[...data.positions, ...data.positions].map((pos, i) => (
                <div key={i} className={styles.stripItem}>
                  <img src={`${import.meta.env.BASE_URL}${pos.image}`} alt="" />
                  <span>{pos.name[lang]}</span>
                </div>
              ))}
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
            {lang === "es" ? "Tiempo" : "Time"}:{" "}
            <strong>{selection.t.label[lang]}</strong>
          </p>
          <button className={styles.mainBtn} onClick={startTimer}>
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
