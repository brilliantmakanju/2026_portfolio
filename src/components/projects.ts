const projectsData = [
  {
    title: "ThreadChat",
    subtitle: "YouTube Conversation Tracker",
    period: "Jun 2026 - Jul 2026",
    liveUrl: "https://threadchat.jolexhive.com",
    githubBackendUrl: "",
    githubFrontendUrl: "",
    isClosedSource: false,
    badge: "Live SaaS",
    statusNote: "",
    tags: ["Rust", "Axum", "Tokio", "SvelteKit", "TypeScript", "WebSockets", "PostgreSQL", "Supabase", "Redis"],
    description: "Built a SaaS for following specific YouTube comment threads, with reply notifications and up to 30 days of edit and deletion history.",
    highlights: [
      "Integrated user authentication and Paddle payments for a paid Pro tier.",
      "Built the Rust/Axum backend with a polling microservice on Tokio that fetches comment threads from the YouTube Data API.",
      "Implemented real-time WebSocket messaging with reactions.",
      "Learned Rust and SvelteKit from scratch; shipped an MVP in under 2 months."
    ]
  },
  {
    title: "Push to Draft",
    subtitle: "Multi-Tenant SaaS Engine",
    period: "Jan 2025 - Jan 2026",
    liveUrl: "",
    githubBackendUrl: "https://github.com/brilliantmakanju/pushtodraftbackend",
    githubFrontendUrl: "https://github.com/brilliantmakanju/commit-to-post-ui",
    isClosedSource: false,
    badge: "SaaS Engine",
    statusNote: "Decommissioned",
    tags: ["Python", "Django", "Django REST Framework", "PostgreSQL", "GitHub App Webhooks", "OAuth", "AES-256", "Next.js"],
    description: "Built a multi-tenant Django SaaS starter kit, later used to build BranchForge, with schema-per-tenant PostgreSQL isolation.",
    highlights: [
      "Frontend & App Integration: Built Next.js web application (commit-to-post-ui) with GitHub OAuth, repository selection UI, and post preview editors.",
      "GitHub App Webhooks: Configured webhook event listeners capturing git commit pushes, branch merges, and release events in real time.",
      "Automated AI Engine: Built an AI pipeline converting captured commit messages into platform-tailored social media posts.",
      "Security & Billing: Secured third-party social integrations with AES-256 encrypted tokens, automatic token refresh, organization roles, and an automated plan-downgrade engine."
    ]
  },
  {
    title: "BranchForge",
    subtitle: "Causal Simulation Engine",
    period: "Dec 2025 - Jan 2026",
    liveUrl: "",
    githubBackendUrl: "",
    githubFrontendUrl: "",
    isClosedSource: true,
    badge: "Causal AI Engine",
    statusNote: "",
    tags: ["Python", "Django", "Django REST Framework", "PostgreSQL", "LLMs", "Do-Calculus", "SHA-256"],
    description: "Causal AI simulation framework using Judea Pearl's Causal Do-Calculus on Directed Acyclic Graphs (DAGs) to evaluate counterfactual scenario trees.",
    highlights: [
      "Built a 7-stage LLM pipeline that constructs directed acyclic graphs from curated facts.",
      "Broke feedback loops with topological sort and propagated hypothetical interventions along typed causal edges.",
      "Designed to limit hallucination with exponential time-decay fact weighting, a confidence gate that halts low-confidence runs, and schema validation of input facts and parsed JSON.",
      "Implemented SHA-256 branch hashing for Git-style scenario versioning, with per-stage traces and an append-only audit log."
    ]
  },
  {
    title: "Playthrough",
    subtitle: "Full-Stack Editor & GPU Video Microservice",
    period: "Dec 2025 - Jan 2026",
    liveUrl: "",
    githubBackendUrl: "https://github.com/brilliantmakanju/video_processor_gpu_infra",
    githubFrontendUrl: "",
    isClosedSource: false,
    badge: "Full-Stack Platform",
    statusNote: "",
    tags: ["Next.js 15", "React 19", "Zustand", "@ffmpeg/ffmpeg WASM", "Python", "CUDA", "NVENC/NVDEC", "RunPod", "NVIDIA RTX 5090 / L4"],
    description: "Full-stack video platform featuring a Next.js 15 browser video editor with client-side WebAssembly FFmpeg previews and a serverless GPU rendering microservice.",
    highlights: [
      "Frontend Editor: Next.js 15, React 19, Zustand state store, and @ffmpeg/ffmpeg WASM for client-side clip trimming and waveform previews.",
      "GPU Microservice: Video microservice taking video & JSON edit-map timelines, executing parallel segment cutting, GPU concatenation, watermarking, and color grading.",
      "Hardware Acceleration: Tuned for RTX 5090 and L4 GPUs on RunPod with h264_nvenc encoding, h264_cuvid decoding, CUDA Lanczos scaling, and a worker cap preventing VRAM allocation failures."
    ]
  }
];

export function renderProjects() {
  const el = document.getElementById("projects")!;
  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <div class="flex items-center justify-between mb-8">
      <div>
        <div class="text-xs font-mono text-slate-400 mb-1">// Production Architectures</div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Selected Work</h2>
      </div>
      <span class="text-xs font-mono text-slate-500">4 Core Systems</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${projectsData.map(p => `
      <div class="card-mono p-5 sm:p-6 flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <div class="flex justify-between items-start gap-2 flex-wrap">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="tag-mono">${p.badge}</span>
                ${p.statusNote ? `<span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[10px]">${p.statusNote}</span>` : ''}
              </div>
              <h3 class="text-lg font-bold text-white mt-1">${p.title}</h3>
              <div class="text-xs text-slate-400 font-mono">${p.subtitle}</div>
            </div>

            <div class="flex items-center gap-2 flex-wrap">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-emerald-400 hover:text-white font-mono text-xs flex items-center gap-1" title="Live Site">
                <span>live site</span>
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              </a>` : ''}

              ${p.githubBackendUrl ? `<a href="${p.githubBackendUrl}" target="_blank" rel="noopener" class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1" title="Backend Repository">
                <span>${p.githubFrontendUrl ? 'backend code' : 'code repository'}</span>
              </a>` : ''}

              ${p.githubFrontendUrl ? `<a href="${p.githubFrontendUrl}" target="_blank" rel="noopener" class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1" title="Frontend Repository">
                <span>frontend code</span>
              </a>` : ''}

              ${p.isClosedSource ? `<span class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-500 font-mono text-xs">closed source</span>` : ''}
            </div>
          </div>

          <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">${p.description}</p>

          <ul class="space-y-1.5 text-xs text-slate-400 font-mono">
            ${p.highlights.map(h => `<li class="flex items-start gap-2">
              <span class="text-slate-500 font-bold">></span>
              <span>${h}</span>
            </li>`).join("")}
          </ul>
        </div>

        <div class="flex flex-wrap gap-1.5 pt-3 border-t border-white/5 font-mono text-[10px] text-slate-400">
          ${p.tags.map(t => `<span class="px-2 py-0.5 rounded bg-white/5 border border-white/5">${t}</span>`).join("")}
        </div>
      </div>`).join("")}
    </div>
  </div>`;
}
