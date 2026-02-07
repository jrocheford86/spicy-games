import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { Language } from "../types";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Leemos de localStorage al iniciar. Si no hay nada, por defecto 'en'
  const [lang, setLangState] = useState<Language>(
    (localStorage.getItem("spicy_lang") as Language) || "en",
  );

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("spicy_lang", l); // Guardamos la elección
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLang must be used within LanguageProvider");
  return context;
};
