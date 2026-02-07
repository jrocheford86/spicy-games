import { useState, useEffect } from "react";
import { useLang } from "../../context/LanguageContext";
import styles from "./Calendar.module.css";

const Calendar = () => {
  const { lang } = useLang();
  const [activities, setActivities] = useState<Record<string, boolean>>({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem("spicy_activities");
    if (saved) setActivities(JSON.parse(saved));
  }, []);

  const toggleDate = (day: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );

    // BLOQUEO DE FECHAS FUTURAS
    if (selectedDate > today) {
      if (navigator.vibrate) navigator.vibrate(100);
      return;
    }

    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    const newActivities = { ...activities };

    if (newActivities[dateKey]) {
      delete newActivities[dateKey];
    } else {
      newActivities[dateKey] = true;
      if (navigator.vibrate) navigator.vibrate(40);
    }

    setActivities(newActivities);
    localStorage.setItem("spicy_activities", JSON.stringify(newActivities));
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const monthName = currentDate.toLocaleString(lang, { month: "long" });

  const isToday = (day: number) => {
    const now = new Date();
    return (
      now.getDate() === day &&
      now.getMonth() === currentDate.getMonth() &&
      now.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1)),
            )
          }
        >
          ‹
        </button>
        <h2 className={styles.monthTitle}>
          {monthName} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1)),
            )
          }
        >
          ›
        </button>
      </header>

      <div className={styles.grid}>
        {["D", "L", "M", "M", "J", "V", "S"].map((d) => (
          <div key={d} className={styles.dayName}>
            {d}
          </div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
          const isMarked = activities[dateKey];
          const isFuture =
            new Date(currentDate.getFullYear(), currentDate.getMonth(), day) >
            new Date();

          return (
            <div
              key={day}
              className={`
                ${styles.dayCell} 
                ${isMarked ? styles.marked : ""} 
                ${isToday(day) ? styles.today : ""}
                ${isFuture ? styles.future : ""}
              `}
              onClick={() => toggleDate(day)}
            >
              <span className={styles.dayNumber}>{day}</span>
              {isMarked && <span className={styles.heart}>❤️</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
