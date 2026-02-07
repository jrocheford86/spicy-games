import { useState } from "react";
import { LanguageProvider, useLang } from "./context/LanguageContext";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import ToolsHome from "./components/Tools/ToolsHome";
import Calendar from "./components/Calendar/Calendar";
import { KamasutraGame } from "./components/Games/Kamasutra/KamasutraGame";
import BottomNav from "./components/Layout/BottomNav";
import { Modal } from "./components/UI/Modal";
import type { Language } from "./types";

type View = "home" | "tools" | "about" | "game" | "tool-calendar";

function AppContent() {
  const [view, setView] = useState<View>("home");
  const [modal, setModal] = useState({ open: false, title: "", body: "" });
  const { lang } = useLang();

  return (
    <main className="app-container">
      {/* 1. JUEGOS */}
      {view === "home" && <Home onSelectGame={() => setView("game")} />}
      {view === "game" && (
        <div className="view">
          <KamasutraGame
            onExit={() => setView("home")}
            onShowAlert={(t, b) => setModal({ open: true, title: t, body: b })}
          />
        </div>
      )}

      {/* 2. HERRAMIENTAS */}
      {view === "tools" && (
        <ToolsHome onSelectTool={() => setView("tool-calendar")} />
      )}
      {view === "tool-calendar" && (
        <div className="view">
          <button onClick={() => setView("tools")} className="back-btn">
            ←
          </button>
          <Calendar />
        </div>
      )}

      {/* 3. ACERCA DE */}
      {view === "about" && <About />}

      {/* NAVEGACIÓN INFERIOR (Oculta en juegos y herramientas abiertas) */}
      {!["game", "tool-calendar"].includes(view) && (
        <BottomNav currentView={view} setView={setView} />
      )}

      <Modal
        isOpen={modal.open}
        title={modal.title}
        body={modal.body}
        onClose={() => setModal({ ...modal, open: false })}
      />
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
