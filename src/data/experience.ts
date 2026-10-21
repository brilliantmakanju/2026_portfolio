export type ExperienceEntry = {
  role: string;
  /** Optional: independent entries have no company or location. */
  company?: string;
  location?: string;
  period: string;
  bullets: string[];
  /** Plain-English variant (mode toggle). */
  plainPeriod?: string;
  plainBullets?: string[];
};

export const experienceData: ExperienceEntry[] = [
  {
    role: "Independent projects",
    period: "Oct 2025 - Present",
    plainPeriod: "Oct 2025 to Present",
    bullets: [
      "Self-directed work building and shipping ThreadChat, BranchForge and other products (see Selected Work).",
    ],
    plainBullets: [
      "Self-directed work building and shipping ThreadChat, BranchForge and other products. See Selected Work.",
    ],
  },
  {
    role: "Frontend Developer",
    company: "Confidential VC-funded Startup (NDA)",
    location: "Remote (US)",
    period: "Dec 2023 - Oct 2025",
    plainPeriod: "Dec 2023 to Oct 2025",
    bullets: [
      "Built responsive interfaces in React and Next.js, maintaining a 90+ Core Web Vitals average across pages.",
      "Standardized the codebase with 15+ reusable components and integrated 5+ third-party REST APIs, including authentication flows.",
      "Became the team's primary AI engineer. Shipped RAG on AWS Bedrock through a Python/FastAPI service layer on Lambda.",
      "Contributed to technical decisions on frontend architecture and component structure.",
    ],
    plainBullets: [
      "Built the app's screens in React and Next.js, and kept them loading fast: a 90+ average on Google's Core Web Vitals across pages.",
      "Cleaned up how the code was organized, ending up with 15 or more building blocks that got reused instead of rewritten, and connected the app to 5 or more outside services, including the login system.",
      "Became the team's main AI engineer, building retrieval-augmented generation (RAG) on AWS Bedrock through a Python/FastAPI service on Lambda.",
      "Helped decide how the frontend was built and how the building blocks were organized.",
    ],
  },
];
