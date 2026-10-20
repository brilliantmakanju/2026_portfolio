import type { Project } from "../../data/projects";
import { threadchat, pushtodraft, branchforge, playthrougheditor, playthroughprocessor, hiringradar, vulti } from "../../data/projects";
import { renderCard } from "./ProjectCard";
import { SECTIONS } from "../../data/sections";

export function renderProjects() {
  const el = document.getElementById("projects")!;
  const projects = [
    threadchat,
    pushtodraft,
    branchforge,
    playthrougheditor,
    playthroughprocessor,
    hiringradar,
    vulti,
  ];

  // Cross-links: only show the "Related" hint when the target card is present.
  const present = new Set(projects.map((p) => p.id));

  el.innerHTML = `
  <div>
    <header class="section-shell">
      <div class="sec-cmd"><span class="sec-prompt">&#10095;</span> ${SECTIONS.projects}</div>
      <div class="section-title-row">
        <h2 class="section-title">Selected Work</h2>
        <span class="section-count">${projects.filter((x) => x.statusKind === "live").length} live / ${projects.length} systems</span>
      </div>
    </header>

    <div class="project-grid">
      ${projects.map((p) => renderCard(p, present.has(p.related?.href.replace("#", "") ?? ""))).join("")}
    </div>
  </div>`;
}

export function initProjectDiagrams(run: (root: HTMLElement) => void) {
  document.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
    // Idempotent: safe to call again after Mermaid loads lazily.
    if (card.dataset.diagramBound) return;
    card.dataset.diagramBound = "1";
    const tabs = Array.from(card.querySelectorAll<HTMLButtonElement>(".diagram-tab"));
    const panels = Array.from(card.querySelectorAll<HTMLElement>(".diagram-panel"));
    if (!tabs.length) return;

    // renderNow=false at bind time: initial panels render through the
    // staggered queue in main.ts (startMermaid / mountProjects), so switching
    // to technical mode never bursts six renders at once.
    const activate = (key: string, renderNow = true) => {
      tabs.forEach((t) => {
        const on = t.dataset.tab === key;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p) => p.classList.toggle("hidden", p.dataset.panel !== key));
      const active = panels.find((p) => p.dataset.panel === key);
      if (active && renderNow) run(active);
    };

    tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab.dataset.tab!)));

    // Arrow-key navigation across diagram tabs (tablist pattern).
    card.querySelector(".diagram-tabs")?.addEventListener("keydown", (e) => {
      const ev = e as KeyboardEvent;
      if (ev.key !== "ArrowRight" && ev.key !== "ArrowLeft") return;
      const i = tabs.indexOf(document.activeElement as HTMLButtonElement);
      if (i < 0) return;
      const next = tabs[(i + (ev.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
      next.focus();
      activate(next.dataset.tab!);
      ev.preventDefault();
    });

    // Activate the first tab visually; rendering is staggered elsewhere.
    const first = tabs[0]?.dataset.tab;
    if (first) activate(first, false);
  });
}

/** Expand or collapse the full plain-English detail for each project. */
export function initPlainReadMore() {
  const root = document.getElementById("projects");
  if (!root || root.dataset.plainMoreBound) return;
  root.dataset.plainMoreBound = "1";

  root.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const btn = target?.closest<HTMLButtonElement>(".plain-more-toggle");
    if (!btn || !root.contains(btn)) return;

    const panel = document.getElementById(btn.getAttribute("aria-controls") ?? "");
    if (!panel) return;

    const open = panel.hidden;
    panel.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    const label = btn.querySelector<HTMLElement>(".plain-more-label");
    if (label) label.textContent = open ? "Show less" : "Read more";
    const icon = btn.querySelector<HTMLElement>(".plain-more-icon");
    if (icon) icon.textContent = open ? "\u2212" : "+";
  });
}

/** Collapsible folder panels per project card. */
export function initFolderToggles() {
  document.querySelectorAll<HTMLButtonElement>(".tree-toggle").forEach((btn) => {
    // Idempotent: safe to call again after Mermaid loads lazily.
    if (btn.dataset.treeBound) return;
    btn.dataset.treeBound = "1";
    btn.addEventListener("click", () => {
      const panel = btn.parentElement!.querySelector<HTMLElement>(".tree-panel")!;
      const open = !panel.classList.contains("hidden");
      panel.classList.toggle("hidden", open);
      btn.classList.toggle("open", !open);
      btn.setAttribute("aria-expanded", String(!open));
      btn.querySelector(".tree-toggle-icon")!.textContent = open ? "▸" : "▾";
    });
  });
}
