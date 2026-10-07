const certs = [
  {
    title: "AI Fluency: Framework & Foundations",
    date: "Aug 2026",
    issuer: "Anthropic",
    desc: "Core AI frameworks, model evaluation, and foundational LLM alignment principles."
  },
  {
    title: "Model Context Protocol: Introduction & Advanced Topics",
    date: "Aug 2026",
    issuer: "Anthropic",
    desc: "Advanced MCP architecture, client-server protocol specifications, tool integration, and context management."
  },
  {
    title: "Claude 101",
    date: "Aug 2026",
    issuer: "Anthropic",
    desc: "Prompt engineering optimization, context window utilization, and structured output generation."
  },
  {
    title: "Claude Code 101",
    date: "Aug 2026",
    issuer: "Anthropic",
    desc: "Autonomous coding agent workflows, tool calling, and automated software engineering patterns."
  }
];

export function renderCertifications() {
  const el = document.getElementById("certifications")!;
  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <div class="flex items-center justify-between mb-8">
      <div>
        <div class="text-xs font-mono text-slate-400 mb-1">// Industry Credentials</div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Anthropic Certifications</h2>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      ${certs.map(c => `
      <div class="card-mono p-5 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all">
        <div class="space-y-3">
          <div class="flex justify-between items-center">
          <div class="text-[11px] font-mono text-emerald-400">Anthropic</div>
            <span class="text-[10px] font-mono text-slate-500">${c.date}</span>
          </div>

          <div class="space-y-1">
            <h3 class="text-sm font-bold text-white leading-snug font-mono">${c.title}</h3>
          </div>

          <p class="text-xs text-slate-400 leading-relaxed font-sans">${c.desc}</p>
        </div>

        <div class="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Issued by Anthropic</span>
        </div>
      </div>`).join("")}
    </div>
  </div>`;
}
