import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { COLOR_PRESETS, type ColorPreset } from "@/theme/colorPresets";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
  setMode: (mode: ThemeMode) => void;
  colorPreset: ColorPreset;
  setColorPresetId: (id: string) => void;
  presets: ColorPreset[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const MODE_KEY = "storly-theme-mode";
const COLOR_KEY = "storly-theme-color";

function applyColorPreset(preset: ColorPreset) {
  const root = document.documentElement.style;
  root.setProperty("--color-primary-main", preset.primary.main);
  root.setProperty("--color-primary-main-dark", preset.primary.mainDark);
  root.setProperty("--color-primary-light", preset.primary.light);
  root.setProperty("--color-primary-lighter", preset.primary.lighter);
  root.setProperty("--color-secondary-main", preset.secondary.main);
  root.setProperty("--color-secondary-lighter", preset.secondary.lighter);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    return (localStorage.getItem(MODE_KEY) as ThemeMode) || "light";
  });

  const [colorPreset, setColorPreset] = useState<ColorPreset>(() => {
    if (typeof window === "undefined") return COLOR_PRESETS[0];
    const savedId = localStorage.getItem(COLOR_KEY);
    return COLOR_PRESETS.find((p) => p.id === savedId) ?? COLOR_PRESETS[0];
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    applyColorPreset(colorPreset);
    localStorage.setItem(COLOR_KEY, colorPreset.id);
  }, [colorPreset]);

  const setMode = useCallback((next: ThemeMode) => setModeState(next), []);
  const toggleMode = useCallback(() => setModeState((m) => (m === "light" ? "dark" : "light")), []);
  const setColorPresetId = useCallback((id: string) => {
    const preset = COLOR_PRESETS.find((p) => p.id === id);
    if (preset) setColorPreset(preset);
  }, []);

  const value: ThemeContextValue = {
    mode,
    toggleMode,
    setMode,
    colorPreset,
    setColorPresetId,
    presets: COLOR_PRESETS,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
