import { getMode, onModeChange, setMode, type ViewMode } from "../data/mode";

/**
 * Floating mode switch, pinned to the right edge of the viewport.
 * Always visible so anyone can flip between Plain English and Technical
 * without hunting through the nav.
 */
export function renderModeOverlay() {
  const existing = document.getElementById("mode-float");
  if (existing) existing.remove();

  const root = document.createElement("div");
  root.id = "mode-float";
  root.className = "mode-float";
  root.setAttribute("role", "group");
  root.setAttribute("aria-label", "Reading mode");
  root.innerHTML = `
    <span class="mf-label">view</span>
    <button class="mode-btn" data-mode="plain" type="button">Plain English</button>
    <button class="mode-btn" data-mode="technical" type="button">Technical</button>`;
  document.body.appendChild(root);

  sync();
}

function sync() {
  const mode = getMode();
  document
    .querySelectorAll<HTMLButtonElement>("#mode-float .mode-btn")
    .forEach((b) => {
      b.classList.toggle("active", b.dataset.mode === mode);
      b.setAttribute("aria-pressed", String(b.dataset.mode === mode));
    });
}

export function initModeOverlay() {
  document.querySelectorAll<HTMLButtonElement>("#mode-float .mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => setMode(btn.dataset.mode as ViewMode));
  });

  onModeChange(() => sync());
}
