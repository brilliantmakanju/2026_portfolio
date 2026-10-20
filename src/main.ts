import "./style.css";
import { renderNav, initNav, initScrollSpy } from "./components/nav";
import { renderHero, initHeroTyper } from "./components/hero";
import { renderProjects, initProjectDiagrams, initFolderToggles } from "./components/projects";
import { initDiagramZoom } from "./components/projects/diagramZoom";
import { onModeChange, getMode } from "./data/mode";
import { renderModeOverlay, initModeOverlay } from "./components/mode-toggle";
import { renderSkills } from "./components/skills";
import { renderExperience } from "./components/experience";
import { renderCertifications } from "./components/certifications";
import { renderContact, initContact } from "./components/contact";

declare const mermaid: any;

let mermaidReady = false;

function configureMermaid() {
  mermaid.initialize({
    startOnLoad: false,
    theme: "dark",
    securityLevel: "loose",
    themeVariables: {
      background: "#08080a",
      primaryColor: "#18181b",
      primaryTextColor: "#e4e4e7",
      primaryBorderColor: "#334155",
      lineColor: "#64748b",
      secondaryColor: "#121215",
      tertiaryColor: "#0a0a0c",
      fontSize: "13px",
    },
    flowchart: { curve: "monotoneX", padding: 12 },
    sequence: { useMaxWidth: true },
    er: { useMaxWidth: true, diagramPadding: 12, entityPadding: 22, minEntityWidth: 120, minEntityHeight: 48 },
  });
  mermaidReady = true;
}

/**
 * Render only the Mermaid blocks inside `root` that have not rendered yet.
 * Panels are rendered lazily when their tab becomes visible, which avoids
 * zero-size SVGs from `display:none` containers. Renders are serialized
 * because Mermaid is not safe to run concurrently.
 */
let renderQueue: Promise<void> = Promise.resolve();

function runMermaidIn(root: ParentNode, delay = 0) {
  if (!mermaidReady) return;
  const host = root as HTMLElement;
  renderQueue = renderQueue.then(async () => {
    if (delay) await new Promise((r) => setTimeout(r, delay));
    if (host.classList?.contains("hidden")) return;
    const nodes = host.querySelectorAll<HTMLElement>(".mermaid:not([data-processed])");
    if (!nodes.length) return;
    try {
      await mermaid.run({ nodes });
      // Screen-reader labels: describe each diagram via its card + caption.
      nodes.forEach((n) => {
        const svg = n.querySelector("svg");
        if (!svg || n.closest(".diagram-panel")?.querySelector(".error-icon")) return;
        const card = n.closest("article")?.querySelector(".project-title")?.textContent?.trim() ?? "";
        const cap = n
          .closest(".diagram-panel")
          ?.querySelector(".diagram-caption")
          ?.textContent?.replace(/^.*?:\s*/, "")
          .split("note:")[0]
          .trim();
        svg.setAttribute("role", "img");
        svg.setAttribute("focusable", "false");
        svg.setAttribute("aria-label", `${card} system diagram: ${cap ?? ""}`.slice(0, 160));
      });
      document.body.setAttribute("data-mermaid-done", "yes");
    } catch (e: any) {
      document.body.setAttribute("data-mermaid-err", String((e && e.message) || e));
    }
  });
}

function startMermaid() {
  try {
    configureMermaid();
  } catch (e: any) {
    document.body.setAttribute("data-mermaid-inst-err", String((e && e.message) || e));
    return;
  }
  document.body.setAttribute(
    "data-mermaid-nodes",
    String(document.querySelectorAll(".mermaid").length)
  );
  // Tab/folder handlers were bound on mount; now that Mermaid is ready, render
  // the already-visible panels one at a time (staggered, never freezes the UI).
  // Hidden ones render on their first tab click.
  renderVisiblePanels();
}

/** Render the panels that are currently visible, staggered so each render
 *  chunk yields to the browser between diagrams (no mode-switch freeze). */
function renderVisiblePanels() {
  document
    .querySelectorAll<HTMLElement>(".project-card .diagram-panel:not(.hidden) .mermaid:not([data-processed])")
    .forEach((node, i) => runMermaidIn(node.closest(".diagram-panel")!, i * 140));
}

let lazyMermaidLoaded = false;

/** Plain visitors do not need Mermaid (a ~1 MB gzipped library). Instead of
 *  downloading it in the background, start the download on intent: hovering,
 *  focusing or touching the Technical switch. */
function armMermaidPreload() {
  const btn = document.querySelector<HTMLElement>(
    '#mode-float .mode-btn[data-mode="technical"]',
  );
  if (!btn) return;
  const trigger = () => loadMermaid();
  btn.addEventListener("pointerenter", trigger, { once: true, passive: true });
  btn.addEventListener("focus", trigger, { once: true });
  btn.addEventListener("touchstart", trigger, { once: true, passive: true });
}

/** Decide on load: technical visitors load Mermaid immediately; plain
 *  visitors load it the moment they show intent to switch. */
function initMermaid() {
  if (typeof mermaid !== "undefined") {
    // Loaded eagerly (e.g. cached markup): use it.
    startMermaid();
    return;
  }
  document.body.setAttribute("data-mermaid-deferred", "1");
  if (getMode() === "technical") {
    loadMermaid();
    return;
  }
  armMermaidPreload();
}

function loadMermaid() {
  if (lazyMermaidLoaded) return;
  lazyMermaidLoaded = true;
  document.body.setAttribute("data-mermaid-fallback", "injected");
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.min.js";
  s.onerror = () => document.body.setAttribute("data-mermaid-load-err", "failed");
  s.onload = () => startMermaid();
  document.head.appendChild(s);
}

/** Hero is mode-aware; re-rendering restarts the typer safely (epoch guard). */
function mountHero() {
  renderHero();
  initHeroTyper();
}

function mountProjects() {
  renderProjects();
  initProjectDiagrams((panel) => runMermaidIn(panel));
  initFolderToggles();
  initDiagramZoom();
  renderVisiblePanels();
}

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  initNav();
  renderModeOverlay();
  initModeOverlay();
  mountHero();
  mountProjects();
  renderSkills();
  renderExperience();
  renderCertifications();
  renderContact();
  initContact();
  initScrollSpy();
  initMermaid();

  onModeChange(() => {
    mountHero();
    mountProjects();
    renderExperience();
    if (getMode() === "technical") loadMermaid();
  });
});
