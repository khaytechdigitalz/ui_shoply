export interface ColorPreset {
  id: string;
  name: string;
  swatch: string;
  primary: {
    main: string;
    mainDark: string;
    light: string;
    lighter: string;
  };
  secondary: {
    main: string;
    lighter: string;
  };
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: "teal",
    name: "Teal (Default)",
    swatch: "#04535c",
    primary: { main: "#04535c", mainDark: "#02414f", light: "#57cec7", lighter: "#c7f6ec" },
    secondary: { main: "#3366ff", lighter: "#84a9ff" },
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    swatch: "#1d4ed8",
    primary: { main: "#1d4ed8", mainDark: "#1e3a8a", light: "#60a5fa", lighter: "#dbeafe" },
    secondary: { main: "#0ea5e9", lighter: "#bae6fd" },
  },
  {
    id: "emerald",
    name: "Emerald",
    swatch: "#059669",
    primary: { main: "#059669", mainDark: "#065f46", light: "#6ee7b7", lighter: "#d1fae5" },
    secondary: { main: "#14b8a6", lighter: "#99f6e4" },
  },
  {
    id: "purple",
    name: "Royal Purple",
    swatch: "#7c3aed",
    primary: { main: "#7c3aed", mainDark: "#5b21b6", light: "#c4b5fd", lighter: "#ede9fe" },
    secondary: { main: "#d946ef", lighter: "#f5d0fe" },
  },
  {
    id: "rose",
    name: "Rose",
    swatch: "#e11d48",
    primary: { main: "#e11d48", mainDark: "#9f1239", light: "#fda4af", lighter: "#ffe4e6" },
    secondary: { main: "#f43f5e", lighter: "#fecdd3" },
  },
  {
    id: "amber",
    name: "Amber",
    swatch: "#d97706",
    primary: { main: "#d97706", mainDark: "#92400e", light: "#fcd34d", lighter: "#fef3c7" },
    secondary: { main: "#f59e0b", lighter: "#fde68a" },
  },
  {
    id: "indigo",
    name: "Indigo",
    swatch: "#4f46e5",
    primary: { main: "#4f46e5", mainDark: "#3730a3", light: "#a5b4fc", lighter: "#e0e7ff" },
    secondary: { main: "#6366f1", lighter: "#c7d2fe" },
  },
  {
    id: "slate",
    name: "Corporate Slate",
    swatch: "#334155",
    primary: { main: "#334155", mainDark: "#1e293b", light: "#94a3b8", lighter: "#e2e8f0" },
    secondary: { main: "#0f172a", lighter: "#cbd5e1" },
  },
  {
    id: "crimson",
    name: "Crimson",
    swatch: "#b91c1c",
    primary: { main: "#b91c1c", mainDark: "#7f1d1d", light: "#fca5a5", lighter: "#fee2e2" },
    secondary: { main: "#dc2626", lighter: "#fecaca" },
  },
  {
    id: "cyan",
    name: "Cyan",
    swatch: "#0891b2",
    primary: { main: "#0891b2", mainDark: "#164e63", light: "#67e8f9", lighter: "#cffafe" },
    secondary: { main: "#06b6d4", lighter: "#a5f3fc" },
  },
];
