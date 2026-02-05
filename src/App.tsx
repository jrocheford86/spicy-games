import { useState } from "react";
import { LanguageProvider, useLang } from "./context/LanguageContext";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import { KamasutraGame } from "./components/Games/Kamasutra/KamasutraGame";
import BottomNav from "./components/Layout/BottomNav";
import { Modal } from "./components/UI/Modal";
import type { Language } from "./types";

// Estilos locales rápidos para el selector de idiomas
const langBtnStyle = (isActive: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  width: "100%",
  padding: "18px",
  background: isActive ? "rgba(255, 46, 99, 0.1)" : "#2c2c2e",
  border: `1px solid ${isActive ? "#ff2e63" : "#3a3a3c"}`,
  borderRadius: "16px",
  color: isActive ? "#ff2e63" : "white",
  fontSize: "1.1rem",
  fontWeight: "600",
  textAlign: "left" as const,
});

function AppContent() {
  const [view, setView] = useState<"home" | "about" | "game">("home");
  const { lang, setLang } = useLang();

  // Estado para el modal
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    body: "",
    isLangPicker: false,
  });

  const openLangPicker = () => {
    setModal({
      isOpen: true,
      title: lang === "es" ? "Seleccionar Idioma" : "Select Language",
      body: "",
      isLangPicker: true,
    });
  };

  const openAlert = (title: string, body: string) => {
    setModal({
      isOpen: true,
      title: title,
      body: body,
      isLangPicker: false,
    });
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setModal({ ...modal, isOpen: false });
  };

  return (
    <main className="app-container">
      {/* Vistas */}
      {view === "home" && <Home onSelectGame={() => setView("game")} />}
      {view === "about" && <About />}
      {view === "game" && (
        <KamasutraGame onExit={() => setView("home")} onShowAlert={openAlert} />
      )}

      {/* Navegación inferior (solo visible en Home y About) */}
      {view !== "game" && (
        <BottomNav
          currentView={view}
          setView={setView}
          onOpenLang={openLangPicker}
        />
      )}

      {/* Modal Único para Alertas e Idiomas */}
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        body={modal.body}
        onClose={() => setModal({ ...modal, isOpen: false })}
      >
        {modal.isLangPicker && (
          <div style={{ display: "grid", gap: "10px", width: "100%" }}>
            <button
              onClick={() => handleLangChange("en")}
              style={langBtnStyle(lang === "en")}
            >
              <span>🇺🇸</span> English
            </button>
            <button
              onClick={() => handleLangChange("es")}
              style={langBtnStyle(lang === "es")}
            >
              <span>🇪🇸</span> Español
            </button>
          </div>
        )}
      </Modal>
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
