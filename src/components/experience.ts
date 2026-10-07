export function renderExperience() {
  const el = document.getElementById("experience")!;
  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <div class="flex items-center justify-between mb-8">
      <div>
        <div class="text-xs font-mono text-slate-400 mb-1">// Career History</div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Work Experience</h2>
      </div>
      <span class="text-xs font-mono text-slate-500">2023 - 2025</span>
    </div>

    <div class="space-y-6">
      <div class="card-mono p-5 sm:p-6 space-y-4">
        <div class="flex flex-wrap justify-between items-start gap-2">
          <div>
            <h3 class="text-base sm:text-lg font-bold text-white">Frontend Developer</h3>
            <div class="text-xs text-slate-400 font-mono">Stealth Startup</div>
          </div>
          <span class="tag-mono">Dec 2023 - Oct 2025</span>
        </div>

        <ul class="space-y-2 text-xs sm:text-sm text-slate-300 font-mono">
          <li class="flex items-start gap-2">
            <span class="text-slate-500 font-bold">></span>
            <span>Built UI.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-slate-500 font-bold">></span>
            <span>Contributed to AI feature development.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-slate-500 font-bold">></span>
            <span>Collaborated on API integration.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>`;
}
