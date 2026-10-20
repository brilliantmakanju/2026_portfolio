// Hero copy + terminal status. Single source for the rendered strings.
// `plain` powers the Plain-English hero (mode toggle); rules:
//  - max 3 key points
//  - hard ideas get three passes (simple / picture / detail)
//  - one thing to remember

export const heroData = {
  name: "Brilliant (Number-One) Makanju.",
  pill: "full-stack-engineer-applied-ai",
  /** Cycled by the typewriter in the hero (see initHeroTyper). */
  roles: ["Full-Stack Developer", "Applied AI & LLM Integration"],
  intro: "I build multi-tenant SaaS backends and LLM pipelines for teams shipping applied AI products.",
  note: "Based in Nigeria (WAT, UTC+1), remote worldwide. Open to full-time remote roles with US/EU overlap. Self-taught, roughly two years of professional experience.",
  terminal: {
    prompt: "brilliant@arch:~",
    command: "brilliant --status",
    /** Display-ready values (quotes/brackets included). */
    status: [
      { key: "location", value: `"Nigeria · WAT (UTC+1)"` },
      { key: "availability", value: `"full-time remote · US/EU overlap"` },
      { key: "stack", value: `["Python", "TypeScript", "Rust", "Django", "Axum", "FastAPI"]` },
      { key: "ai", value: `"RAG · LLM pipelines · multi-tenant SaaS"` },
      { key: "gpu", value: `"RTX 5090 / L4 NVENC · RunPod serverless"` },
    ],
  },
  plain: {
    /** Friendlier titles cycled by the typewriter in Plain-English mode. */
    plainRoles: ["full-stack engineer", "AI builder"],
    sub: "I build the parts of a web app people don't see.",
    body:
      "I build the database, the APIs, the login system, the billing, and the AI features that sit on top. Some of what I've built is live and some isn't, and each project below says which.",
    smallLine: "Based in Nigeria (WAT, UTC+1), working remotely. Open to full-time roles with US/EU overlap. Self-taught, about two years of professional experience.",
    nameNote: "“Number-One” is my real middle name: it's on the birth certificate, not a ranking.",
  },
};
