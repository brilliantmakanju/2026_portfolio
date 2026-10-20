// View mode: "plain" (Plain English) vs "technical" (current engineering view).
// Persisted in localStorage; defaults to plain so first-time visitors get the story.

export type ViewMode = "plain" | "technical";

const KEY = "brilliant.mode";
const PARAM = "view";
const listeners = new Set<(mode: ViewMode) => void>();

/** Shared links: `?view=technical` or `?view=plain`. */
function modeFromUrl(): ViewMode | null {
  if (typeof window === "undefined") return null;
  const value = new URLSearchParams(window.location.search).get(PARAM);
  return value === "technical" || value === "plain" ? value : null;
}

function syncUrl(mode: ViewMode) {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, mode);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  } catch {
    /* URL updates are a convenience; never block the mode switch. */
  }
}

export function getMode(): ViewMode {
  // A shared link wins over the last local choice so the sender controls the view.
  const fromUrl = modeFromUrl();
  if (fromUrl) return fromUrl;
  try {
    return localStorage.getItem(KEY) === "technical" ? "technical" : "plain";
  } catch {
    return "plain";
  }
}

export function setMode(mode: ViewMode) {
  try {
    localStorage.setItem(KEY, mode);
  } catch {
    /* private mode etc: persistence is just skipped */
  }
  syncUrl(mode);
  listeners.forEach((cb) => cb(mode));
}

export function onModeChange(cb: (mode: ViewMode) => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
