import type { Project } from "../../data/projects";
import { getMode } from "../../data/mode";
import { projectPlain } from "../../data/projectPlain";

function tabButtons(p: Project) {
  return p.diagrams
    .map(
      (d, i) =>
        `<button class="diagram-tab${i === 0 ? " active" : ""}" data-tab="${d.key}" id="tab-${p.id}-${d.key}" role="tab" aria-selected="${i === 0}" aria-controls="panel-${p.id}-${d.key}" tabindex="${i === 0 ? 0 : -1}" type="button">${d.label}</button>`
    )
    .join("");
}

function tabPanels(p: Project) {
  return p.diagrams
    .map(
      (d, i) => `
      <div class="diagram-panel${i === 0 ? "" : " hidden"}" data-panel="${d.key}" id="panel-${p.id}-${d.key}" role="tabpanel" aria-labelledby="tab-${p.id}-${d.key}">
        ${
          d.svg
            ? `<div class="diagram-static" data-svg="${d.svg}"${d.zoom ? ` data-zoom-default="${d.zoom}"` : ""} aria-label="${p.title} database diagram"></div>`
            : `<div class="mermaid" data-diagram="${p.id}-${d.key}">\n${d.code}\n        </div>
        <p class="zoom-hint mermaid-hint">swipe the diagram sideways to see the full flow</p>`
        }
        <p class="diagram-caption">note: ${d.caption}</p>
      </div>`
    )
    .join("");
}

function linkRow(p: Project) {
  const links: string[] = [];
  if (p.liveUrl) links.push(`<a href="${p.liveUrl}" target="_blank" rel="noopener" class="chip chip-live">live site ↗</a>`);
  if (p.backendUrl) links.push(`<a href="${p.backendUrl}" target="_blank" rel="noopener" class="chip">backend code</a>`);
  if (p.frontendUrl) links.push(`<a href="${p.frontendUrl}" target="_blank" rel="noopener" class="chip">frontend code</a>`);
  if (p.repoUrl) links.push(`<a href="${p.repoUrl}" target="_blank" rel="noopener" class="chip">repo</a>`);
  if (p.processorUrl) links.push(`<a href="${p.processorUrl}" target="_blank" rel="noopener" class="chip">processor repo</a>`);
  return links.join("");
}

/** Colorize folder trees: tree glyphs dim, comments muted. */
function renderTree(folder: string) {
  return folder
    .split("\n")
    .map((line) => {
      let out = line
        .replace(/├──|└──|│/g, (m) => `<span class="t-glyph">${m}</span>`)
        .replace(/#(.*)$/, (m) => `<span class="t-comment">${m}</span>`);
      return out;
    })
    .join("\n");
}

export function renderCard(p: Project, showRelated: boolean) {
  const statusClass = p.statusKind === "live" ? "status-live" : p.statusKind === "open" ? "status-open" : "status-off";
  const plain = getMode() === "plain" ? projectPlain[p.id] : null;
  const related =
    showRelated && p.related
      ? `<div class="related">Related: <a href="${p.related.href}">${p.related.label}</a></div>`
      : "";

  return `
  <article id="${p.id}" class="project-card card-mono">
    <header class="project-head">
      <div class="project-index">${p.index}</div>
      <div class="project-head-main">
        <div class="project-file-row">
          <span class="project-file">work/<strong>${p.id}</strong>/</span>
          <span class="status-pill ${statusClass}">${p.status}</span>
          ${p.timeframe ? `<span class="project-timeframe">${p.timeframe}</span>` : ""}
          <div class="project-links">${linkRow(p)}</div>
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-lead">${plain ? plain.oneLine : p.positioning}</p>
        ${related}
      </div>
    </header>

    ${demoBlock(p)}
    ${plain ? plainBody(plain, p.id) : techBody(p)}
  </article>`;
}

/** Optional short demo, collapsed so it stays out of the way until wanted. */
function demoBlock(p: Project) {
  if (!p.demo) return "";
  return `
    <details class="project-demo">
      <summary>
        <span class="demo-label">${p.demo.label ?? "Watch demo"}</span>
        ${p.demo.length ? `<span class="demo-length">${p.demo.length}</span>` : ""}
        <span class="demo-chevron" aria-hidden="true">▸</span>
      </summary>
      <div class="project-demo-body">
        <video controls preload="metadata" playsinline src="${p.demo.src}" aria-label="${p.title} demo"></video>
        <p>${p.demo.caption}</p>
      </div>
    </details>`;
}

/** Plain-English card body: a short summary, with the full detail behind Read more. */
function plainBody(plain: (typeof projectPlain)[string], projectId: string) {
  const moreId = `plain-more-${projectId}`;
  return `
    <div class="plain-body">
      <section class="block">
        <h4 class="block-title">By the numbers</h4>
        <div class="plain-nums">
          ${plain.numbers.map((n) => `<span>${n}</span>`).join(`<span class="plain-num-sep">·</span>`)}
        </div>
      </section>

      <section class="block problem-block">
        <h4 class="block-title">The problem</h4>
        <p>${plain.problem}</p>
      </section>

      <button class="plain-more-toggle" type="button" aria-expanded="false" aria-controls="${moreId}">
        <span class="plain-more-label">Read more</span>
        <span class="plain-more-icon" aria-hidden="true">+</span>
      </button>

      <div class="plain-more" id="${moreId}" hidden>
        <section class="block">
          <h4 class="block-title">What I built</h4>
          <ul class="bullet-list">
            ${plain.built.map((b) => `<li>${b}</li>`).join("")}
          </ul>
        </section>

        <section class="block">
          <h4 class="block-title">Design decisions</h4>
          <ul class="plain-decisions">
            ${plain.decisions.map((d) => `<li><strong>${d.title}</strong> ${d.body}</li>`).join("\n            ")}
          </ul>
        </section>

        <footer class="project-foot">
          <span class="block-title">Takeaway</span>
          <p>${plain.takeaway}</p>
        </footer>
      </div>
    </div>`;
}

/** Technical card body: meta, dossier, diagrams, tree, takeaway. */
function techBody(p: Project) {
  return `
    <dl class="project-meta">
      <div>
        <dt>Stack</dt>
        <dd>${p.stack.map((s) => `<span class="chip chip-sm">${s}</span>`).join("")}</dd>
      </div>
      ${
        p.scope
          ? `<div>
        <dt>Scope</dt>
        <dd class="scope-list">${p.scope.map((s) => `<span>${s}</span>`).join("")}</dd>
      </div>`
          : ""
      }
    </dl>

    <div class="project-body">
      <section class="block problem-block">
        <h4 class="block-title">The problem</h4>
        <p>${p.problem}</p>
      </section>

      <section class="block">
        <h4 class="block-title">What I built</h4>
        <ul class="bullet-list">
          ${p.built.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </section>

      <section class="block">
        <h4 class="block-title">Design decisions</h4>
        <div class="decision-grid">
          ${p.decisions.map((d, i) => `<div class="decision"><span class="decision-num">0${i + 1}</span><p>${d}</p></div>`).join("")}
        </div>
      </section>

      ${
        p.usage
          ? `<section class="block">
        <h4 class="block-title">How to use it</h4>
        <ul class="usage-list">
          ${p.usage.map((u) => `<li><code>${u.cmd}</code><span>${u.note}</span></li>`).join("\n          ")}
        </ul>
      </section>`
          : ""
      }

      ${
        p.diagrams.length
          ? `<section class="block">
        <h4 class="block-title">System diagrams</h4>
        <div class="diagram-shell">
          <div class="diagram-tabs" role="tablist">${tabButtons(p)}</div>
          <div class="diagram-body">${tabPanels(p)}</div>
        </div>
      </section>`
          : ""
      }

      <section class="block">
        <h4 class="block-title">Folder structure</h4>
        <div class="tree-shell">
          <button class="tree-toggle" type="button" aria-expanded="false">
            <span class="tree-toggle-icon">▸</span>
            <span>${p.folder.split("\n")[0]}</span>
          </button>
          <div class="tree-panel hidden">
            <pre class="tree">${renderTree(p.folder.split("\n").slice(1).join("\n"))}</pre>
          </div>
        </div>
      </section>

      <footer class="project-foot">
        <span class="block-title">Takeaway</span>
        <p>${p.proves}</p>
      </footer>
    </div>`;
}

