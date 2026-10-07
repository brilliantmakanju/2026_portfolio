export function renderMetrics() {
  const el = document.getElementById("metrics")!;
  el.innerHTML = `
  <div class="border-t border-white/10 pt-12">
    <div class="flex items-center justify-between mb-8">
      <h2 class="text-xs font-mono text-slate-400 uppercase tracking-wider">// Measured Technical Outcomes</h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card-mono p-5 space-y-2">
        <div class="text-3xl font-extrabold text-white font-mono">98.4%</div>
        <div class="text-xs font-semibold text-slate-300">Redis Operation Reduction</div>
        <p class="text-xs text-slate-400 leading-relaxed">
          Cut Upstash Redis ops from 500,000+ to under 85,000 per month using in-memory Tokio caching and atomic batching.
        </p>
      </div>

      <div class="card-mono p-5 space-y-2">
        <div class="text-3xl font-extrabold text-white font-mono">RTX 5090</div>
        <div class="text-xs font-semibold text-slate-300">GPU Hardware Pipeline</div>
        <p class="text-xs text-slate-400 leading-relaxed">
          Tuned NVENC H.264 encoding with CUDA Lanczos scaling and 128 decode surfaces on RunPod serverless instances.
        </p>
      </div>

      <div class="card-mono p-5 space-y-2">
        <div class="text-3xl font-extrabold text-white font-mono">7-Stage</div>
        <div class="text-xs font-semibold text-slate-300">Causal AI Pipeline</div>
        <p class="text-xs text-slate-400 leading-relaxed">
          Chain-of-Thought pipeline executing Judea Pearl do-calculus, topological sort loop breaking, and temporal decay weighting.
        </p>
      </div>

      <div class="card-mono p-5 space-y-2">
        <div class="text-3xl font-extrabold text-white font-mono">4 Systems</div>
        <p class="text-xs text-slate-400 leading-relaxed">
          ThreadChat (live), BranchForge, PlaythroughProcessor, and Push to Draft.
        </p>
      </div>
    </div>
  </div>`;
}
