export function renderContact() {
  const el = document.getElementById("contact")!;
  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <div class="card-mono-hi p-8 sm:p-12 space-y-8">
      <div class="space-y-3">
        <div class="text-xs font-mono text-slate-400">// $ deploy yourself</div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Get in touch.
        </h2>
        <p class="text-sm text-slate-300 leading-relaxed max-w-xl">
          Looking for someone to lead AI pipeline development, architect high-throughput backend microservices, or ship production systems end-to-end? Let's talk.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 font-mono text-xs">
        <a href="mailto:brilliantmakanju10@gmail.com" class="btn-mono">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          brilliantmakanju10@gmail.com
        </a>
        <button id="copy-email-btn" class="btn-mono-ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          Copy Email
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
        <div class="p-3.5 rounded bg-[#050505] border border-white/10 flex items-center justify-between">
          <span class="text-slate-400">GitHub</span>
          <a href="https://github.com/brilliantmakanju" target="_blank" rel="noopener" class="text-white hover:underline">github.com/brilliantmakanju →</a>
        </div>
        <div class="p-3.5 rounded bg-[#050505] border border-white/10 flex items-center justify-between">
          <span class="text-slate-400">LinkedIn</span>
          <a href="https://linkedin.com/in/brilliantmakanju" target="_blank" rel="noopener" class="text-white hover:underline">in/brilliantmakanju →</a>
        </div>
        <div class="p-3.5 rounded bg-[#050505] border border-white/10 flex items-center justify-between">
          <span class="text-slate-400">Location</span>
          <span class="text-white">Remote (Worldwide)</span>
        </div>
      </div>
    </div>
  </div>`;

  const footerEl = document.getElementById("footer")!;
  footerEl.innerHTML = `
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
    <div>(c) ${new Date().getFullYear()} Brilliant Makanju. All engineering work strictly verified.</div>
    <div class="flex items-center gap-4">
      <span>Built with Vite, TS and Tailwind</span>
      <span>*</span>
      <a href="#hero" class="text-slate-400 hover:text-white transition-colors">Top ^</a>
    </div>
  </div>`;
}

export function initContact() {
  document.getElementById("copy-email-btn")?.addEventListener("click", () => {
    navigator.clipboard.writeText("brilliantmakanju10@gmail.com");
    const btn = document.getElementById("copy-email-btn")!;
    const orig = btn.innerHTML;
    btn.innerHTML = `Copied!`;
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  });
}
