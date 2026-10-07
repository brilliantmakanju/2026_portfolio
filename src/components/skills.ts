const skillGroups = [
  {
    title: "AI & Causal Systems",
    skills: ["Causal Do-Calculus", "LLM Chain-of-Thought", "Topological Sort", "Anti-Hallucination Grounding", "RAG & Semantic Search", "JSON Schema Validation"]
  },
  {
    title: "Systems & Backend",
    skills: ["Rust (Axum, Tokio)", "Python (Django, FastAPI)", "PostgreSQL Schema Isolation", "Upstash Redis Caching", "WebSocket Real-Time Messaging", "JWT & OAuth Security"]
  },
  {
    title: "GPU & Infrastructure",
    skills: ["NVIDIA NVENC/NVDEC", "CUDA Lanczos Scaling", "FFmpeg Pipeline Architecture", "RunPod Serverless GPU", "Docker Containerization", "AWS & GCP Cloud"]
  },
  {
    title: "Frontend & Full-Stack",
    skills: ["TypeScript", "React & Next.js", "SvelteKit", "Tailwind CSS v4", "Paddle & Stripe Integration", "RESTful API Design"]
  }
];

export function renderSkills() {
  const el = document.getElementById("skills")!;
  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <div class="flex items-center justify-between mb-8">
      <div>
        <div class="text-xs font-mono text-slate-400 mb-1">// Domain Competencies</div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Technical Stack Matrix</h2>
      </div>
      <span class="text-xs font-mono text-slate-500">4 Core Domains</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${skillGroups.map(g => `
      <div class="card-mono p-6 space-y-4">
        <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider">// ${g.title}</h3>
        <div class="flex flex-wrap gap-2">
          ${g.skills.map(s => `<span class="tag-mono">${s}</span>`).join("")}
        </div>
      </div>`).join("")}
    </div>
  </div>`;
}
