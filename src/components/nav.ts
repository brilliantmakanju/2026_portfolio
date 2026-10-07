export function renderNav() {
  const nav = document.getElementById("nav")!;
  nav.innerHTML = `
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between font-mono text-xs">
    <a href="#hero" class="flex items-center gap-2.5 group">
      <div class="w-6 h-6 rounded bg-white text-black font-bold flex items-center justify-center text-xs">b</div>
      <span class="text-slate-200 font-semibold tracking-tight group-hover:text-white">brilliant.systems</span>
    </a>

    <div class="hidden md:flex items-center gap-6 text-slate-400">
      <a href="#metrics" class="nav-link">01. impact</a>
      <a href="#case-studies" class="nav-link">02. playground</a>
      <a href="#projects" class="nav-link">03. projects</a>
      <a href="#skills" class="nav-link">04. stack</a>
      <a href="#experience" class="nav-link">05. history</a>
      <a href="#certifications" class="nav-link">06. certs</a>
      <a href="#contact" class="nav-link">07. contact</a>
    </div>

    <div class="flex items-center gap-3">
      <a href="mailto:brilliantmakanju10@gmail.com" class="hidden sm:inline-flex px-3 py-1 rounded bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-all text-xs">
        Get in touch
      </a>
      <button id="mobile-menu-btn" class="md:hidden p-1.5 rounded bg-white/5 border border-white/10 text-slate-300">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
  <div id="mobile-menu" class="hidden md:hidden px-4 pb-4 pt-2 border-t border-white/5 bg-[#0a0a0c] font-mono text-xs space-y-2">
    <a href="#metrics" class="block py-1.5 text-slate-400 hover:text-white">01. impact</a>
    <a href="#case-studies" class="block py-1.5 text-slate-400 hover:text-white">02. playground</a>
    <a href="#projects" class="block py-1.5 text-slate-400 hover:text-white">03. projects</a>
    <a href="#skills" class="block py-1.5 text-slate-400 hover:text-white">04. stack</a>
    <a href="#experience" class="block py-1.5 text-slate-400 hover:text-white">05. history</a>
    <a href="#certifications" class="block py-1.5 text-slate-400 hover:text-white">06. certs</a>
    <a href="#contact" class="block py-1.5 text-slate-400 hover:text-white">07. contact</a>
  </div>`;
}

export function initNav() {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  btn?.addEventListener("click", () => menu?.classList.toggle("hidden"));
  menu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu?.classList.add("hidden")));
}
