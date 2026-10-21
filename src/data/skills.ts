export type Skill = string | { name: string; note?: string };

export type SkillGroup = {
  title: string;
  note?: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "Python", note: "Push to Draft · BranchForge · PlaythroughEditor · PlaythroughProcessor · HiringRadar" },
      { name: "TypeScript", note: "ThreadChat · Push to Draft · BranchForge · PlaythroughEditor" },
      { name: "JavaScript", note: "ThreadChat · Push to Draft · BranchForge · PlaythroughEditor" },
      { name: "Rust", note: "ThreadChat" },
      { name: "Django", note: "Push to Draft · BranchForge · PlaythroughEditor" },
      { name: "DRF", note: "Push to Draft · BranchForge · PlaythroughEditor" },
      { name: "Axum", note: "ThreadChat" },
      { name: "React", note: "Push to Draft · BranchForge · PlaythroughEditor" },
      { name: "Next.js", note: "Push to Draft · PlaythroughEditor" },
      { name: "SvelteKit", note: "ThreadChat" },
      { name: "Tailwind CSS", note: "ThreadChat · Push to Draft · BranchForge · PlaythroughEditor" },
    ],
  },
  {
    title: "Infrastructure & Data",
    skills: [
      { name: "REST APIs", note: "All projects" },
      { name: "WebSockets", note: "ThreadChat" },
      { name: "PostgreSQL", note: "ThreadChat · Push to Draft · BranchForge · PlaythroughEditor" },
      { name: "Redis", note: "ThreadChat · PlaythroughEditor" },
      { name: "SQLite", note: "HiringRadar" },
      { name: "JWT", note: "ThreadChat · Push to Draft · PlaythroughEditor" },
      { name: "OAuth2", note: "ThreadChat · Push to Draft" },
      { name: "Zustand", note: "Push to Draft · PlaythroughEditor" },
      { name: "TanStack Query", note: "ThreadChat · Push to Draft · BranchForge" },
      { name: "Docker", note: "ThreadChat · PlaythroughEditor · PlaythroughProcessor" },
      { name: "Nginx", note: "ThreadChat · Push to Draft" },
      { name: "CI/CD", note: "PlaythroughEditor" },
    ],
  },
  {
    title: "AI & Platforms",
    note: "Professional experience, under NDA.",
    skills: [
      { name: "OpenAI API", note: "PlaythroughEditor" },
      { name: "Gemini API", note: "HiringRadar" },
      { name: "AWS Bedrock", note: "Professional experience" },
      { name: "GCP Vertex AI", note: "Professional experience" },
      { name: "RAG", note: "Professional experience" },
      { name: "LLM orchestration", note: "BranchForge" },
      { name: "RunPod", note: "PlaythroughEditor · PlaythroughProcessor" },
    ],
  },
  {
    title: "Dev & Tooling",
    skills: [
      { name: "FFmpeg (NVENC)", note: "PlaythroughProcessor" },
      { name: "API design", note: "All projects" },
      { name: "Git", note: "All projects" },
      { name: "GitHub", note: "All projects" },
      { name: "Linux", note: "Vulti · PlaythroughProcessor" },
      { name: "Jest", note: "Professional experience" },
      { name: "Vercel", note: "Portfolio" },
      { name: "Railway", note: "Push to Draft" },
      { name: "Cloudflare", note: "ThreadChat · PlaythroughEditor" },
      { name: "Render", note: "ThreadChat" },
    ],
  },
];
