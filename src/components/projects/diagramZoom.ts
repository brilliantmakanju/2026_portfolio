/**
 * Interactive static database diagrams (mermaid.live SVG exports from docs/).
 *
 * The exports ship with a baked-in pan/zoom viewport transform and no viewBox,
 * so as plain <img> they cannot size or zoom. Here the SVG is inlined and used
 * as a real viewport: zoom and pan are applied to the viewBox (never a CSS
 * transform), so the browser re-rasterizes every glyph and stroke at the new
 * scale. That keeps the diagram sharp at any zoom level.
 */

type ZoomState = { scale: number; tx: number; ty: number };
type Box = { x: number; y: number; w: number; h: number };

type Stage = {
  shell: HTMLElement;
  lens: HTMLElement;
  label: HTMLElement;
  svg: SVGSVGElement;
  base: Box;
  defaultScale: number;
};

const MIN_SCALE = 0.25;
const MAX_SCALE = 8;
/** Open the database diagrams slightly zoomed in for readable labels. */
const DEFAULT_SCALE = 1.32;
const STAGE_MAX = 620;
const PAD = 10;

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

/** Strip the editor chrome that fights the page (fixed size, own bg, transform). */
function prepSvg(svg: SVGElement) {
  const vp = svg.querySelector(".svg-pan-zoom_viewport") as SVGGElement | null;
  if (vp) vp.removeAttribute("transform");
  svg.removeAttribute("style");
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.removeAttribute("class");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("focusable", "false");
}

/** Content bounds in user units. Requires a live DOM node. */
function measure(svg: SVGSVGElement): Box {
  const b = svg.getBBox();
  const w = Math.max(b.width + PAD * 2, 1);
  const h = Math.max(b.height + PAD * 2, 1);
  return { x: b.x - PAD, y: b.y - PAD, w, h };
}

/** Pixel size of the whole diagram at the current scale. */
function contentSize(s: Stage, st: ZoomState) {
  const k = (st.scale * s.shell.clientWidth) / s.base.w; // px per user unit
  return { k, w: s.base.w * k, h: s.base.h * k };
}

/** Give the stage a sensible height: the diagram's own height when it is
 *  short, capped when it is tall (then it becomes a pan/zoom viewport).
 *  In full-screen mode the stage fills the overlay instead. */
function fitStage(host: HTMLElement, s: Stage) {
  if (host.classList.contains("zoom-expanded")) {
    s.shell.style.height = "";
    return;
  }
  const sw = s.shell.clientWidth;
  if (!sw) return;
  const natural = (s.base.h / s.base.w) * sw;
  const cap = Math.min(STAGE_MAX, Math.round(window.innerHeight * 0.64));
  s.shell.style.height = `${Math.round(Math.min(natural, cap))}px`;
}

function applyZoom(s: Stage, st: ZoomState) {
  const sw = s.shell.clientWidth;
  const sh = s.shell.clientHeight;
  if (!sw || !sh) return;

  st.scale = clamp(st.scale, MIN_SCALE, MAX_SCALE);
  const { k, w: cw, h: ch } = contentSize(s, st);

  // Centre the diagram while it is smaller than the stage; once it overflows,
  // keep it within reach so it cannot be dragged completely out of view.
  const freeX = sw - cw;
  const freeY = sh - ch;
  st.tx = freeX >= 0 ? freeX / 2 : clamp(st.tx, freeX, 0);
  st.ty = freeY >= 0 ? freeY / 2 : clamp(st.ty, freeY, 0);

  // Window onto the diagram, in user units. Matching the viewBox aspect to the
  // stage means no letterboxing, and vector-crisp rendering at every scale.
  const vw = sw / k;
  const vh = sh / k;
  const vx = s.base.x - st.tx / k;
  const vy = s.base.y - st.ty / k;
  s.svg.setAttribute("viewBox", `${vx} ${vy} ${vw} ${vh}`);

  s.label.textContent = `${Math.round(st.scale * 100)}%`;
  const overflowing = cw > sw + 1 || ch > sh + 1;
  s.shell.classList.toggle("zoomed", overflowing);
  s.shell.style.touchAction = overflowing ? "none" : "auto";
}

function zoomAt(s: Stage, st: ZoomState, cx: number, cy: number, factor: number) {
  const next = clamp(st.scale * factor, MIN_SCALE, MAX_SCALE);
  if (next === st.scale) return;
  st.tx = cx - ((cx - st.tx) * next) / st.scale;
  st.ty = cy - ((cy - st.ty) * next) / st.scale;
  st.scale = next;
  applyZoom(s, st);
}

function wireStage(host: HTMLElement, s: Stage) {
  const st: ZoomState = { scale: s.defaultScale, tx: 0, ty: 0 };
  const { shell, lens } = s;

  fitStage(host, s);
  applyZoom(s, st);

  const center = () => ({ cx: shell.clientWidth / 2, cy: shell.clientHeight / 2 });
  const reset = () => {
    st.scale = s.defaultScale;
    st.tx = 0;
    st.ty = 0;
    applyZoom(s, st);
  };

  const expandBtn = host.querySelector<HTMLButtonElement>('[data-zoom="expand"]');
  const setExpanded = (on: boolean) => {
    host.classList.toggle("zoom-expanded", on);
    document.body.classList.toggle("diagram-expanded", on);
    expandBtn?.setAttribute("aria-pressed", String(on));
    if (expandBtn) expandBtn.textContent = on ? "close" : "expand";
    requestAnimationFrame(() => {
      fitStage(host, s);
      applyZoom(s, st);
    });
  };

  const onEscape = (e: KeyboardEvent) => {
    if (!host.isConnected) {
      document.removeEventListener("keydown", onEscape);
      return;
    }
    if (e.key === "Escape" && host.classList.contains("zoom-expanded")) {
      setExpanded(false);
      shell.focus();
    }
  };
  document.addEventListener("keydown", onEscape);

  host.querySelectorAll<HTMLButtonElement>(".zoom-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const kind = btn.dataset.zoom;
      if (kind === "in") {
        const c = center();
        zoomAt(s, st, c.cx, c.cy, 1.35);
      } else if (kind === "out") {
        const c = center();
        zoomAt(s, st, c.cx, c.cy, 1 / 1.35);
      } else if (kind === "reset") {
        reset();
      } else if (kind === "expand") {
        setExpanded(!host.classList.contains("zoom-expanded"));
      }
    });
  });

  const overflowing = () => {
    const { w, h } = contentSize(s, st);
    return w > shell.clientWidth + 1 || h > shell.clientHeight + 1;
  };

  // Ctrl/Cmd + wheel zooms at the cursor; otherwise the wheel pans the
  // diagram while it overflows the stage, and scrolls the page when it fits.
  shell.addEventListener(
    "wheel",
    (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const r = shell.getBoundingClientRect();
        zoomAt(s, st, e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.12 : 1 / 1.12);
        return;
      }
      if (overflowing()) {
        e.preventDefault();
        st.tx -= e.deltaX;
        st.ty -= e.deltaY;
        applyZoom(s, st);
      }
    },
    { passive: false },
  );

  // Pointer pan (mouse + touch) and two-finger pinch zoom (touch).
  const points = new Map<number, { x: number; y: number }>();
  let drag: { x: number; y: number; tx: number; ty: number } | null = null;
  let pinch: { dist: number; scale: number } | null = null;

  shell.addEventListener("pointerdown", (e) => {
    if (e.button > 0) return;
    points.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (points.size === 1) {
      drag = { x: e.clientX, y: e.clientY, tx: st.tx, ty: st.ty };
      shell.setPointerCapture(e.pointerId);
    } else if (points.size === 2) {
      drag = null;
      const [a, b] = [...points.values()];
      pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y), scale: st.scale };
      e.preventDefault();
    }
  });

  shell.addEventListener("pointermove", (e) => {
    if (!points.has(e.pointerId)) return;
    points.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (points.size === 1 && drag) {
      st.tx = drag.tx + (e.clientX - drag.x);
      st.ty = drag.ty + (e.clientY - drag.y);
      applyZoom(s, st);
      return;
    }

    if (points.size === 2 && pinch) {
      const [a, b] = [...points.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      const r = shell.getBoundingClientRect();
      const prev = st.scale;
      const next = clamp((pinch.scale * d) / Math.max(pinch.dist, 1), MIN_SCALE, MAX_SCALE);
      if (next === prev) return;
      const mx = (a.x + b.x) / 2 - r.left;
      const my = (a.y + b.y) / 2 - r.top;
      st.tx = mx - ((mx - st.tx) * next) / prev;
      st.ty = my - ((my - st.ty) * next) / prev;
      st.scale = next;
      applyZoom(s, st);
    }
  });

  const endPointer = (e: PointerEvent) => {
    points.delete(e.pointerId);
    if (points.size < 2) pinch = null;
    if (points.size === 0) {
      drag = null;
    } else if (points.size === 1) {
      // re-anchor the drag on the pointer that is still down
      const [p] = [...points.values()];
      drag = { x: p.x, y: p.y, tx: st.tx, ty: st.ty };
    }
  };
  shell.addEventListener("pointerup", endPointer);
  shell.addEventListener("pointercancel", endPointer);

  shell.addEventListener("dblclick", () => {
    if (st.scale > s.defaultScale * 1.05) {
      reset();
    } else {
      const c = center();
      zoomAt(s, st, c.cx, c.cy, 1.6);
    }
  });

  // Keyboard: +/− zoom, 0 resets, arrows pan.
  shell.addEventListener("keydown", (e) => {
    const step = 60;
    const c = center();
    if (e.key === "+" || e.key === "=") {
      zoomAt(s, st, c.cx, c.cy, 1.3);
    } else if (e.key === "-") {
      zoomAt(s, st, c.cx, c.cy, 1 / 1.3);
    } else if (e.key === "0") {
      reset();
    } else if (e.key === "ArrowLeft") {
      st.tx += step;
      applyZoom(s, st);
    } else if (e.key === "ArrowRight") {
      st.tx -= step;
      applyZoom(s, st);
    } else if (e.key === "ArrowUp") {
      st.ty += step;
      applyZoom(s, st);
    } else if (e.key === "ArrowDown") {
      st.ty -= step;
      applyZoom(s, st);
    } else {
      return;
    }
    e.preventDefault();
  });

  // Keep the viewport correct through responsive reflows.
  let lastW = shell.clientWidth;
  const onResize = () => {
    if (shell.clientWidth === lastW) return;
    lastW = shell.clientWidth;
    fitStage(host, s);
    applyZoom(s, st);
  };
  window.addEventListener("resize", onResize);
  if ("ResizeObserver" in window) {
    new ResizeObserver(onResize).observe(shell);
  }

  // Exposed for tests / debugging.
  (host as HTMLElement & { __zoom?: unknown }).__zoom = st;
  void lens;
}

export function initDiagramZoom() {
  // A mode switch remounts the cards; never leave the page scroll-locked.
  document.body.classList.remove("diagram-expanded");
  document.querySelectorAll<HTMLElement>(".diagram-static[data-svg]").forEach((host) => {
    if (host.dataset.zoomInit) return;
    host.dataset.zoomInit = "1";
    const path = host.dataset.svg!;
    const requestedZoom = Number(host.dataset.zoomDefault);
    const defaultScale = clamp(
      Number.isFinite(requestedZoom) && requestedZoom > 0 ? requestedZoom : DEFAULT_SCALE,
      MIN_SCALE,
      MAX_SCALE
    );
    host.innerHTML = `
      <div class="zoom-shell" tabindex="0" role="application" aria-label="Interactive database diagram: drag to pan, ctrl plus scroll or pinch to zoom, arrow keys also pan">
        <div class="zoom-lens"></div>
      </div>
      <div class="zoom-controls">
        <button type="button" class="zoom-btn" data-zoom="out" aria-label="Zoom out">&#8722;</button>
        <span class="zoom-level" aria-live="polite">${Math.round(defaultScale * 100)}%</span>
        <button type="button" class="zoom-btn" data-zoom="in" aria-label="Zoom in">+</button>
        <button type="button" class="zoom-btn" data-zoom="reset" aria-label="Reset zoom">reset</button>
        <button type="button" class="zoom-btn" data-zoom="expand" aria-label="Expand diagram" aria-pressed="false">expand</button>
      </div>
      <p class="zoom-hint">drag to pan &middot; pinch or +/&minus; to zoom &middot; expand</p>`;

    const shell = host.querySelector<HTMLElement>(".zoom-shell")!;
    const lens = shell.querySelector<HTMLElement>(".zoom-lens")!;
    const label = host.querySelector<HTMLElement>(".zoom-level")!;

    const load = () => {
      fetch(path)
        .then((r) => {
          if (!r.ok) throw new Error(String(r.status));
          return r.text();
        })
        .then((text) => {
          // The export's inline <style> and every marker/edge id are namespaced
          // to the graph id (e.g. `#graph-11`). Rename it per instance so several
          // diagrams can be inlined without collisions, and so the edge strokes
          // and arrow markers keep resolving.
          const rootId = text.match(/<svg[^>]*\sid="([^"]+)"/)?.[1];
          const markup = rootId
            ? text.split(rootId).join(`dgm-${Math.random().toString(36).slice(2, 9)}`)
            : text;

          const holder = document.createElement("div");
          holder.innerHTML = markup;
          const svg = holder.querySelector("svg") as SVGSVGElement | null;
          if (!svg) throw new Error("no svg element");

          prepSvg(svg);
          lens.appendChild(svg);

          requestAnimationFrame(() => {
            const base = measure(svg);
            // Give the svg a provisional box so it has geometry before wiring.
            svg.style.width = "100%";
            svg.style.height = "100%";
            svg.style.display = "block";
            svg.setAttribute("viewBox", `${base.x} ${base.y} ${base.w} ${base.h}`);
            wireStage(host, { shell, lens, label, svg, base, defaultScale });
          });
        })
        .catch(() => {
          lens.innerHTML = `<p class="diagram-load-fail">Diagram could not be loaded.</p>`;
        });
    };

    // These exports are big (250-500 KB each), so only fetch one when the
    // reader gets near its card. A fallback timer covers browsers without
    // IntersectionObserver and keeps the diagrams ready shortly after load.
    let requested = false;
    const request = () => {
      if (requested) return;
      requested = true;
      load();
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            request();
          }
        },
        { rootMargin: "900px 0px" },
      );
      io.observe(host);
    }
    window.setTimeout(request, 3500);
  });
}
