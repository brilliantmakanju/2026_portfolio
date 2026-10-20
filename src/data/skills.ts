export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Frameworks",
    skills: ["Python", "TypeScript", "JavaScript", "Rust", "Django", "DRF", "FastAPI", "Axum", "React", "Next.js", "SvelteKit", "Tailwind CSS"],
  },
  {
    title: "Infrastructure & Data",
    skills: ["REST APIs", "WebSockets", "PostgreSQL", "Redis", "SQLite", "JWT", "OAuth2", "Zustand", "TanStack Query", "Docker", "Nginx", "CI/CD"],
  },
  {
    title: "AI & Platforms",
    skills: ["OpenAI API", "Claude API", "Gemini API", "DeepSeek", "AWS Bedrock", "GCP Vertex AI", "RAG", "LLM orchestration", "multi-agent systems", "RunPod", "AWS (Lambda, S3, IAM)", "GCP"],
  },
  {
    title: "Dev & Tooling",
    skills: ["FFmpeg (NVENC)", "ETL", "API design", "Git", "GitHub", "Linux", "Jest", "Selenium", "Vercel", "Railway"],
  },
];
