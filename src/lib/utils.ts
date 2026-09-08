export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

export function formatCurrency(value: number) {
  return `$${value.toFixed(2)}`;
}

/**
 * Base URL for the media/storage host. Set VITE_API_BASE_URL in your .env
 * when pointing this template at a real backend/CDN. Left empty, images are
 * served from this app's own /public folder.
 */
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Resolves media storage URLs, supporting full external URLs and relative storage paths.
 */
export function getImageSrc(path?: string | null, fallback: string = "/images/placeholder.png"): string {
  if (!path) return fallback;
  return path.startsWith("http")
    ? path
    : `${API_BASE_URL || ""}/${path}`;
}

export function formatDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
