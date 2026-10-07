export function renderCaseStudies() {
  const el = document.getElementById("case-studies")!;
  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <div class="text-xs font-mono text-slate-400 mb-1">// Interactive Architecture Playground</div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Deep Technical Case Studies</h2>
      </div>
      <div class="text-xs font-mono text-slate-500">Click tabs to switch live interactive simulators</div>
    </div>

    <!-- TABS -->
    <div class="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-3 overflow-x-auto">
      <button class="cs-tab active text-xs whitespace-nowrap" data-cs="branchforge">01. BranchForge (Causal AI DAGs)</button>
      <button class="cs-tab text-xs whitespace-nowrap" data-cs="redis">02. Upstash Redis (98.4% Ops Reduction)</button>
      <button class="cs-tab text-xs whitespace-nowrap" data-cs="gpu">03. Playthrough (Full-Stack & GPU Infra)</button>
      <button class="cs-tab text-xs whitespace-nowrap" data-cs="saas">04. Multi-Tenant SaaS Engine</button>
    </div>

    <!-- PANELS -->
    <div id="cs-content">
      <!-- PANEL 1: BranchForge -->
      <div id="cs-branchforge" class="cs-panel">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-7 space-y-6">
            <div class="card-mono p-5 sm:p-6 space-y-4">
              <div class="flex flex-wrap gap-2">
                <span class="tag-mono">Django / Python 3.13</span>
                <span class="tag-mono">Llama-3.3-70B</span>
                <span class="tag-mono">Do-Calculus</span>
                <span class="tag-mono">SHA-256 DAGs</span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-white">Causal What-If Simulation Engine with Hallucination Safeguards</h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Standard LLM scenario generation suffers from narrative drift and feedback loop hallucinations.
                BranchForge pairs Judea Pearl's Causal Do-Calculus with a 7-stage Chain-of-Thought pipeline to evaluate interventions on Directed Acyclic Graphs.
              </p>

              <div class="space-y-3 pt-2 font-mono text-xs">
                <div class="p-3 rounded bg-white/[0.02] border border-white/10 space-y-1">
                  <div class="text-white font-semibold">1. Exponential Temporal Fact Decay</div>
                  <div class="text-slate-400">weight(t) = initial_weight * (0.5 ^ (days_elapsed / half_life))</div>
                  <div class="text-slate-500 text-[11px]">Prevents legacy news facts from skewing present-day counterfactual inferences.</div>
                </div>

                <div class="p-3 rounded bg-white/[0.02] border border-white/10 space-y-1">
                  <div class="text-white font-semibold">2. Topological Sort Cycle Breaking</div>
                  <div class="text-slate-400">detect_cycles(graph) -> sever_feedback_edges()</div>
                  <div class="text-slate-500 text-[11px]">Enforces strict acyclicity before downstream delta propagation.</div>
                </div>

                <div class="p-3 rounded bg-white/[0.02] border border-white/10 space-y-1">
                  <div class="text-white font-semibold">3. SHA-256 World-Line Branch Hashing</div>
                  <div class="text-slate-400">branch_hash = sha256(f"{parent_hash}-{intervention_id}-{created_at}")</div>
                  <div class="text-slate-500 text-[11px]">Git-like immutable versioning for scenario tree lineage.</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive 7-Stage DAG Simulator -->
          <div class="lg:col-span-5">
            <div class="card-mono-hi p-5 sm:p-6 flex flex-col justify-between h-full space-y-6">
              <div>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-xs font-mono text-slate-400">// LIVE PIPELINE TRACER</span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Click stage to step</span>
                </div>

                <div class="flex justify-between items-center mb-6">
                  ${[1,2,3,4,5,6,7].map(i => `<div class="stage-dot ${i===1?'active':''}" data-stage="${i}">${i}</div>`).join('<div class="h-px bg-white/10 flex-1 mx-1"></div>')}
                </div>

                <div id="stage-detail-box" class="p-4 rounded bg-[#050505] border border-white/10 space-y-3 font-mono text-xs">
                  <div>
                    <div class="text-slate-500 text-[11px]" id="stage-num">STAGE 1 OF 7</div>
                    <div class="text-white font-bold text-sm mt-0.5" id="stage-title">Load & Inherit Base Reality</div>
                  </div>
                  <p class="text-slate-400 text-[11px] leading-relaxed" id="stage-desc">
                    Validates grounded facts schema, recomputes temporal decay weights, and halts pipeline if fact confidence falls below 0.30 threshold.
                  </p>
                  <div class="pt-2 border-t border-white/5 text-[11px]">
                    <div class="text-slate-500">payload_trace:</div>
                    <div class="text-emerald-400" id="stage-val">Decay recomputed, Gating PASSED (0.87)</div>
                  </div>
                </div>
              </div>

              <div class="text-[11px] font-mono text-slate-500 border-t border-white/5 pt-3">
                Pipeline execution logged to append-only AuditEntry ledger.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PANEL 2: Redis Optimization -->
      <div id="cs-redis" class="cs-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-7 space-y-6">
            <div class="card-mono p-5 sm:p-6 space-y-4">
              <div class="flex flex-wrap gap-2">
                <span class="tag-mono">Upstash Redis</span>
                <span class="tag-mono">Rust / Axum</span>
                <span class="tag-mono">Tokio Channels</span>
                <span class="tag-mono">Distributed Lock Removal</span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-white">Upstash Redis Optimization: 500k+ to &lt;85k Monthly Operations</h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Initial thread polling logic exceeded Upstash free tier limits with a single active user due to unbatched status pings and redundant distributed lock polling.
              </p>

              <div class="space-y-3 text-xs">
                <div class="p-3.5 rounded bg-red-500/5 border border-red-500/20 space-y-1">
                  <div class="font-bold text-red-400 font-mono">Unoptimized Bottleneck</div>
                  <p class="text-slate-300">Every WebSocket connection polled Redis lock keys every 500ms, accumulating ~17,280 ops per user per day.</p>
                </div>
                <div class="p-3.5 rounded bg-emerald-500/5 border border-emerald-500/20 space-y-1">
                  <div class="font-bold text-emerald-400 font-mono">Tokio Async Refactor Solution</div>
                  <p class="text-slate-300">Replaced lock polling with in-memory Tokio broadcast channels and batched atomic syncs, cutting daily ops to &lt;2,800 across multi-user traffic.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Redis Calculator -->
          <div class="lg:col-span-5">
            <div class="card-mono-hi p-5 sm:p-6 flex flex-col justify-between h-full space-y-6">
              <div>
                <div class="text-xs font-mono text-slate-400 mb-4">// OPS REDUCTION COMPARISON</div>

                <div class="space-y-5">
                  <div>
                    <div class="flex justify-between text-xs font-mono mb-1.5">
                      <span class="text-slate-400">Unoptimized Lock Polling</span>
                      <span class="text-red-400 font-bold">518,400 ops/mo</span>
                    </div>
                    <div class="h-3 rounded bg-white/5 overflow-hidden">
                      <div class="h-full bg-red-500 rounded w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div class="flex justify-between text-xs font-mono mb-1.5">
                      <span class="text-slate-400">Tokio In-Memory Batching</span>
                      <span class="text-emerald-400 font-bold">84,000 ops/mo</span>
                    </div>
                    <div class="h-3 rounded bg-white/5 overflow-hidden">
                      <div class="h-full bg-emerald-500 rounded" style="width: 16%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="p-4 rounded bg-[#050505] border border-white/10 text-center font-mono">
                <div class="text-[11px] text-slate-500">OPERATIONAL MARGIN GAINED</div>
                <div class="text-xl sm:text-2xl font-extrabold text-white my-1">434,400 Ops Saved</div>
                <div class="text-[11px] text-emerald-400">83.8% headroom kept for scaling</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PANEL 3: Playthrough Full-Stack & GPU Infra -->
      <div id="cs-gpu" class="cs-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-7 space-y-6">
            <div class="card-mono p-5 sm:p-6 space-y-4">
              <div class="flex flex-wrap gap-2">
                <span class="tag-mono">Next.js 15 / React 19</span>
                <span class="tag-mono">@ffmpeg/ffmpeg WASM</span>
                <span class="tag-mono">Zustand & TanStack</span>
                <span class="tag-mono">NVIDIA RTX 5090 / L4</span>
                <span class="tag-mono">h264_nvenc</span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-white">Full-Stack Video Editing & Serverless GPU Infrastructure</h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                End-to-end video platform consisting of a Next.js 15 browser video editor with client-side WebAssembly FFmpeg previews and an ultra-fast serverless GPU rendering microservice running on RunPod (NVIDIA RTX 5090 / L4 32GB VRAM).
              </p>

              <div class="space-y-3 font-mono text-xs">
                <div class="p-3.5 rounded bg-white/[0.02] border border-white/10 space-y-1">
                  <div class="text-white font-semibold">1. Client-Side WASM Video Editing (PlaythroughEditor)</div>
                  <div class="text-slate-400">Next.js 15 · React 19 · Zustand · @ffmpeg/ffmpeg WASM</div>
                  <div class="text-slate-500 text-[11px]">Instant client-side clip trimming, waveform visualizers, and live preview rendering without server roundtrips.</div>
                </div>

                <div class="p-3.5 rounded bg-white/[0.02] border border-white/10 space-y-1">
                  <div class="text-white font-semibold">2. Serverless Hardware Acceleration (PlaythroughProcessor)</div>
                  <div class="text-slate-400">h264_nvenc · h264_cuvid · CUDA Lanczos · RunPod RTX 5090</div>
                  <div class="text-slate-500 text-[11px]">Serverless GPU rendering microservice processing parallel segment cuts, watermarking, and color grading.</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Preset Matrix -->
          <div class="lg:col-span-5">
            <div class="card-mono-hi p-5 sm:p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <div class="text-xs font-mono text-slate-400 mb-3">// GPU HARDWARE PRESET MATRIX</div>
                <div class="space-y-2.5 font-mono text-xs">
                  <div class="p-3 rounded bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <div class="text-white font-bold">Ultra Quality</div>
                      <div class="text-slate-500 text-[11px]">CQ 18 · Archival Master</div>
                    </div>
                    <span class="tag-mono">p7 preset</span>
                  </div>
                  <div class="p-3 rounded bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <div class="text-white font-bold">High Production</div>
                      <div class="text-slate-500 text-[11px]">CQ 20 · Default Export</div>
                    </div>
                    <span class="tag-mono">p4 preset</span>
                  </div>
                  <div class="p-3 rounded bg-[#050505] border border-white/10 flex justify-between items-center">
                    <div>
                      <div class="text-white font-bold">Fast Preview</div>
                      <div class="text-slate-500 text-[11px]">CQ 25 · Quick Render</div>
                    </div>
                    <span class="tag-mono">p2 preset</span>
                  </div>
                </div>
              </div>

              <div class="text-[11px] font-mono text-slate-500 border-t border-white/5 pt-3">
                Client WebAssembly handles local timeline edits; RunPod RTX 5090 handles heavy 4K exports.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PANEL 4: Multi-Tenant SaaS Engine -->
      <div id="cs-saas" class="cs-panel hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-7 space-y-6">
            <div class="card-mono p-5 sm:p-6 space-y-4">
              <div class="flex flex-wrap gap-2">
                <span class="tag-mono">django-tenants</span>
                <span class="tag-mono">PostgreSQL Schema Isolation</span>
                <span class="tag-mono">AES-256 OAuth Encryption</span>
                <span class="tag-mono">Downgrade Manager</span>
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-white">Multi-Tenant SaaS Engine and Automated Downgrade Manager</h3>
              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Architected Push to Draft backend with PostgreSQL schema-per-tenant isolation using <code class="text-white">django-tenants</code>, AES-256 token encryption for third-party social OAuth integrations, and automated subscription downgrade cascading.
              </p>

              <div class="p-4 rounded bg-[#050505] border border-white/10 space-y-2 font-mono text-xs">
                <div class="text-white font-bold">Automated Subscription Downgrade Manager</div>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                  When subscription payments lapse, the manager automatically pauses excess links and repository configs without deleting tenant data, keeping schema constraints intact.
                </p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="card-mono-hi p-5 sm:p-6 flex flex-col justify-between h-full space-y-4">
              <div>
                <div class="text-xs font-mono text-slate-400 mb-3">// AES-256 TOKEN SECURITY</div>
                <div class="p-4 rounded bg-[#050505] border border-white/10 font-mono text-xs space-y-1 text-slate-400 overflow-x-auto">
                  <div><span class="text-slate-500">encrypted_access_token:</span> "aes256:gAAAAAB..."</div>
                  <div><span class="text-slate-500">encrypted_refresh_token:</span> "aes256:gAAAAAB..."</div>
                  <div><span class="text-slate-500">external_id_hash:</span> "sha256:e3b0c442..."</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

const stageData = [
  { num: 1, title: "Load & Inherit Base Reality", desc: "Validates grounded facts schema, recomputes temporal decay weights, and halts pipeline if fact confidence falls below 0.30 threshold.", val: "Decay recomputed, Gating PASSED (0.87)" },
  { num: 2, title: "Map Affected Variables", desc: "Classifies variables into directly affected, indirectly affected, confounders, and colliders.", val: "14 nodes mapped, 3 confounders isolated" },
  { num: 3, title: "Propose Initial DAG", desc: "Constructs structural causal graph and executes topological sort to break feedback loops.", val: "Topological sort complete, 0 cycles remaining" },
  { num: 4, title: "Reflect & Augment", desc: "Stress-tests the graph for hidden assumptions, missing confounders, or boundary failures.", val: "2 hidden confounders added to edge set" },
  { num: 5, title: "Propagate & Simulate", desc: "Executes Judea Pearl's do-calculus: severs incoming edges to intervention node X and propagates deltas downstream.", val: "Downstream deltas calculated across 4 levels" },
  { num: 6, title: "Critique & Verify", desc: "Evaluates factual, logical, and structural integrity. Assigns authoritative final confidence score.", val: "Final Confidence: 0.91 (Authoritative)" },
  { num: 7, title: "Final Synthesis", desc: "Synthesizes structured graph into natural language narrative with inline citations and quantitative outcome ranges.", val: "JSON output ready with inline citations" },
];

export function initCaseStudies() {
  const tabs = document.querySelectorAll<HTMLButtonElement>(".cs-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const target = tab.dataset.cs;
      document.querySelectorAll(".cs-panel").forEach(p => p.classList.add("hidden"));
      document.getElementById(`cs-${target}`)?.classList.remove("hidden");
    });
  });

  const dots = document.querySelectorAll<HTMLDivElement>(".stage-dot");
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.stage!) - 1;
      const data = stageData[idx];
      dots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");

      document.getElementById("stage-num")!.textContent = `STAGE ${data.num} OF 7`;
      document.getElementById("stage-title")!.textContent = data.title;
      document.getElementById("stage-desc")!.textContent = data.desc;
      document.getElementById("stage-val")!.textContent = data.val;
    });
  });
}
