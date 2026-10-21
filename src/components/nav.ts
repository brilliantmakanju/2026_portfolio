export function renderNav() {
  const nav = document.getElementById("nav")!;
  nav.innerHTML = `
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between font-mono text-xs">
    <a href="#hero" class="flex items-center gap-2.5 group">
      <div class="w-6 h-6 rounded bg-white text-black font-bold flex items-center justify-center text-xs">b</div>
      <span class="text-slate-200 font-semibold tracking-tight group-hover:text-white">jolex.vercel.app</span>
    </a>

    <nav aria-label="Primary" class="hidden md:flex items-center gap-6 text-slate-400">
      <a href="#projects" class="nav-link">01. apps</a>
      <a href="#skills" class="nav-link">02. stack</a>
      <a href="#experience" class="nav-link">03. history</a>
      <a href="#certifications" class="nav-link">04. certs</a>
      <a href="#contact" class="nav-link">05. contact</a>
    </nav>

    <div class="flex items-center gap-3">
      <a href="mailto:brilliantmakanju10@gmail.com" class="hidden sm:inline-flex px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all text-xs">
        Contact
      </a>
      <button id="mobile-menu-btn" class="md:hidden p-1.5 rounded bg-white/5 border border-white/10 text-slate-300" aria-label="Open menu" aria-controls="mobile-menu" aria-expanded="false">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
  <nav id="mobile-menu" aria-label="Primary" class="hidden md:hidden px-4 pb-4 pt-2 border-t border-white/5 bg-[#0a0a0c] font-mono text-xs space-y-2">
    <a href="#projects" class="block py-1.5 text-slate-400 hover:text-white">01. apps</a>
    <a href="#skills" class="block py-1.5 text-slate-400 hover:text-white">02. stack</a>
    <a href="#experience" class="block py-1.5 text-slate-400 hover:text-white">03. history</a>
    <a href="#certifications" class="block py-1.5 text-slate-400 hover:text-white">04. certs</a>
    <a href="#contact" class="block py-1.5 text-slate-400 hover:text-white">05. contact</a>
  </div>`;
}

export function initNav() {
  // Mode switching lives in the floating overlay component (mode-toggle.ts).

  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  btn?.addEventListener("click", () => {
    menu?.classList.toggle("hidden");
    btn.setAttribute("aria-expanded", menu?.classList.contains("hidden") ? "false" : "true");
  });
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menu?.classList.add("hidden");
    btn?.setAttribute("aria-expanded", "false");
  }));
}

/** Highlight the nav link of the section currently in view. */
export function initScrollSpy() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-link"));
  const byId = new Map<string, HTMLAnchorElement>();
  links.forEach((l) => {
    const id = l.getAttribute("href")?.replace("#", "");
    if (id) byId.set(id, l);
  });

  const setActive = (id: string | null) => {
    links.forEach((l) => l.classList.remove("active"));
    if (id) byId.get(id)?.classList.add("active");
  };

  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      let best: { id: string; ratio: number } | null = null;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!best || entry.intersectionRatio > best.ratio) {
          best = { id: (entry.target as HTMLElement).id, ratio: entry.intersectionRatio };
        }
      }
      if (best) setActive(best.id);
    },
    { rootMargin: "-20% 0px -55% 0px" }
  );

  byId.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  });
}
