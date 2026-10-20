// View mode: "plain" (Plain English) vs "technical" (current engineering view).
// Persisted in localStorage; defaults to plain so first-time visitors get the story.

export type ViewMode = "plain" | "technical";

const KEY = "brilliant.mode";
const listeners = new Set<(mode: ViewMode) => void>();

export function getMode(): ViewMode {
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
  listeners.forEach((cb) => cb(mode));
}

export function onModeChange(cb: (mode: ViewMode) => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
