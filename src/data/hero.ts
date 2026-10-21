// Hero copy + terminal status. Single source for the rendered strings.
// `plain` powers the Plain-English hero (mode toggle); rules:
//  - max 3 key points
//  - hard ideas get three passes (simple / picture / detail)
//  - one thing to remember

export const heroData = {
  name: "Brilliant (Number-One) Makanju.",
  pill: "full-stack-engineer-applied-ai",
  role: "Full-stack engineer working on applied AI and LLM integration.",
  intro: "I build multi-tenant SaaS backends and LLM pipelines, mostly in Python and Rust.",
  note: "Based in Nigeria (WAT, UTC+1). Open to full-time or contract roles: full-stack, backend, applied AI. Remote, US/EU overlap. Self-taught, roughly two years of professional experience.",
  terminal: {
    prompt: "brilliant@arch:~",
    command: "brilliant --status",
    /** Display-ready values (quotes/brackets included). */
    status: [
      { key: "location", value: `"Nigeria · WAT (UTC+1)"` },
      { key: "availability", value: `"full-time or contract · remote · US/EU overlap"` },
      { key: "stack", value: `["Python", "TypeScript", "Rust", "Django", "Axum"]` },
      { key: "ai", value: `"RAG · LLM pipelines · multi-tenant SaaS"` },
      { key: "gpu", value: `"RTX 5090 / L4 NVENC · RunPod serverless"` },
    ],
  },
  plain: {
    role: "I'm a full-stack engineer focused on applied AI and LLM integration.",
    body:
      "I build the database, the APIs, the login system, the billing, and the AI features on top. Some of what I've built is live and some isn't, and each project below says which.",
    smallLine: "Based in Nigeria (WAT, UTC+1). Open to full-time or contract roles: full-stack, backend, applied AI. Remote, US/EU overlap. Self-taught, about two years of professional experience.",
    nameNote: "Number-One is my middle name. Not a rank, but hey, cool parents.",
  },
};
