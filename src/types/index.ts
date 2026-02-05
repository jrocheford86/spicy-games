export type Language = "en" | "es";

export interface Localized {
  en: string;
  es: string;
}

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
