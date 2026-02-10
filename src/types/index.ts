// src/types/index.ts

export type Language = "en" | "es";

export interface Localized {
  en: string;
  es: string;
}

// --- TIPOS PARA KAMASUTRA ---
export interface Position {
  name: Localized;
  image: string;
  info: Localized;
  difficulty: Localized;
}

export interface TimeOption {
  label: Localized;
  seconds: number;
}

export interface GameData {
  positions: Position[];
  times: TimeOption[];
}

// --- TIPOS PARA VERDAD O RETO (TRUTH OR DARE) ---
export interface TruthDareEntry {
  text: Localized;
}

export interface TruthDareMode {
  id: string;
  name: Localized;
  icon: string;
  truths: TruthDareEntry[];
  dares: TruthDareEntry[];
}

export interface TruthOrDareData {
  modes: TruthDareMode[];
}
