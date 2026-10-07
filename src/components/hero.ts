export function renderHero() {
  const el = document.getElementById("hero")!;
  el.innerHTML = `
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
    <div class="lg:col-span-7 space-y-6">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
        <span class="text-emerald-400">~/</span> full-stack-ai-and-systems-engineer
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
        Brilliant Makanju.
      </h1>

      <p class="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
        Full-Stack AI Engineer with nearly 2 yrs of professional experience, starting in frontend engineering and moving into AI engineering. Built AI-powered features using Python and LLM integrations. Experienced building multi-tenant SaaS platforms, REST APIs, real-time applications, LLM-powered systems, and GPU-accelerated video pipelines.
      </p>

      <p class="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
        Strong across Python, TypeScript, React, Next.js, Django, PostgreSQL, AWS, Docker, and Rust.
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
        <a href="#case-studies" class="btn-mono w-full sm:w-auto justify-center">
          <span>Explore Case Studies</span>
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7M3 12h18"/></svg>
        </a>
        <a href="#projects" class="btn-mono-ghost w-full sm:w-auto justify-center">Selected Projects</a>
        <a href="mailto:brilliantmakanju10@gmail.com" class="btn-mono-ghost w-full sm:w-auto justify-center">Contact Me</a>
      </div>
    </div>

    <!-- Live CLI Terminal Widget -->
    <div class="lg:col-span-5">
      <div class="card-mono p-4 sm:p-5 font-mono text-xs shadow-2xl overflow-x-auto">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-500 text-[11px]">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          </div>
          <span>brilliant@node-01:~</span>
        </div>

        <div class="space-y-2.5 text-slate-300">
          <div>
            <span class="text-emerald-400">$</span> <span class="text-white">brilliant --status</span>
          </div>
          <div class="text-slate-400 pl-3 space-y-1 text-[11px] sm:text-xs">
            <div><span class="text-slate-500">primary_stack:</span> ["Python", "TypeScript", "React", "Next.js", "Rust"]</div>
            <div><span class="text-slate-500">frontend_engine:</span> "Next.js 15, WebAssembly FFmpeg, Zustand"</div>
            <div><span class="text-slate-500">ai_architecture:</span> "7-Stage Causal Do-Calculus DAGs"</div>
            <div><span class="text-slate-500">gpu_pipeline:</span> "RTX 5090 / L4 NVENC H.264"</div>
            <div><span class="text-slate-500">redis_savings:</span> "98.4% op reduction (500k -> 84k/mo)"</div>
          </div>
          <div class="pt-2 flex items-center gap-1">
            <span class="text-emerald-400">$</span> <span class="w-2 h-4 bg-white animate-pulse inline-block"></span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
