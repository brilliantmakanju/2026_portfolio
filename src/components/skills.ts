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
      <div class="card-mono p-6 space-y-4">
        <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider">// AI & Causal Systems</h3>
        <div class="flex flex-wrap gap-2">
          <span class="tag-mono">Causal Do-Calculus</span>
          <span class="tag-mono">LLM Chain-of-Thought</span>
          <span class="tag-mono">Topological Sort</span>
          <span class="tag-mono">Anti-Hallucination Grounding</span>
          <span class="tag-mono">RAG & Semantic Search</span>
          <span class="tag-mono">JSON Schema Validation</span>
        </div>
      </div>

      <div class="card-mono p-6 space-y-4">
        <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider">// Systems & Backend</h3>
        <div class="flex flex-wrap gap-2">
          <span class="tag-mono">Rust (Axum, Tokio)</span>
          <span class="tag-mono">Python (Django, FastAPI)</span>
          <span class="tag-mono">PostgreSQL Schema Isolation</span>
          <span class="tag-mono">Upstash Redis Caching</span>
          <span class="tag-mono">WebSocket Real-Time Messaging</span>
          <span class="tag-mono">JWT & OAuth Security</span>
        </div>
      </div>

      <div class="card-mono p-6 space-y-4">
        <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider">// GPU & Infrastructure</h3>
        <div class="flex flex-wrap gap-2">
          <span class="tag-mono">NVIDIA NVENC/NVDEC</span>
          <span class="tag-mono">CUDA Lanczos Scaling</span>
          <span class="tag-mono">FFmpeg Pipeline Architecture</span>
          <span class="tag-mono">RunPod Serverless GPU</span>
          <span class="tag-mono">Docker Containerization</span>
          <span class="tag-mono">GCP Cloud & Vercel</span>
        </div>
      </div>

      <div class="card-mono p-6 space-y-4">
        <h3 class="text-sm font-bold text-white font-mono uppercase tracking-wider">// Frontend & Full-Stack</h3>
        <div class="flex flex-wrap gap-2">
          <span class="tag-mono">TypeScript</span>
          <span class="tag-mono">React & Next.js</span>
          <span class="tag-mono">SvelteKit</span>
          <span class="tag-mono">Tailwind CSS v4</span>
          <span class="tag-mono">Paddle & Stripe Integration</span>
          <span class="tag-mono">RESTful API Design</span>
        </div>
      </div>
    </div>
  </div>`;
}
