import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import ToolsHome from "./components/Tools/ToolsHome";
import Calendar from "./components/Calendar/Calendar";
import { KamasutraGame } from "./components/Games/Kamasutra/KamasutraGame";
import { TruthOrDareGame } from "./components/Games/TruthOrDare/TruthOrDareGame"; // Nuevo
import BottomNav from "./components/Layout/BottomNav";
import { Modal } from "./components/UI/Modal";

// Actualizamos los tipos de vista
type View =
  | "home"
  | "tools"
  | "about"
  | "game-kamasutra"
  | "game-truth"
  | "tool-calendar";

function AppContent() {
  const [view, setView] = useState<View>("home");
  const [modal, setModal] = useState({ open: false, title: "", body: "" });

  const openAlert = (t: string, b: string) =>
    setModal({ open: true, title: t, body: b });

  return (
    <main className="app-container">
      {/* 1. PILAR JUEGOS */}
      {view === "home" && <Home onSelectGame={(id) => setView(id as View)} />}

      {view === "game-kamasutra" && (
        <div className="view">
          <KamasutraGame
            onExit={() => setView("home")}
            onShowAlert={openAlert}
          />
        </div>
      )}

      {view === "game-truth" && (
        <div className="view">
          <TruthOrDareGame onExit={() => setView("home")} />
        </div>
      )}

      {/* 2. PILAR HERRAMIENTAS */}
      {view === "tools" && (
        <ToolsHome onSelectTool={(id) => setView(`tool-${id}` as View)} />
      )}

      {view === "tool-calendar" && (
        <div className="view">
          <button onClick={() => setView("tools")} className="back-btn">
            ←
          </button>
          <Calendar />
        </div>
      )}

      {/* 3. PILAR ACERCA DE */}
      {view === "about" && <About />}

      {/* NAVEGACIÓN INFERIOR (Se oculta dentro de cualquier juego o herramienta específica) */}
      {!view.includes("game-") && !view.includes("tool-") && (
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
