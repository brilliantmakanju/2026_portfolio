export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  /** Plain-English variant (mode toggle). */
  plainPeriod?: string;
  plainBullets?: string[];
};

export const experienceData: ExperienceEntry[] = [
  {
    role: "Frontend Developer",
    company: "Confidential VC-funded Startup (NDA)",
    location: "Remote (US)",
    period: "Dec 2023 - Oct 2025",
    plainPeriod: "Dec 2023 to Oct 2025",
    bullets: [
      "Built responsive interfaces in React and Next.js, maintaining a 90+ Core Web Vitals average across pages.",
      "Standardized the codebase with 15+ reusable components and integrated 5+ third-party REST APIs, including authentication flows.",
      "Contributed to early AI feature development.",
      "Contributed to technical decisions on frontend architecture and component structure.",
    ],
    plainBullets: [
      "Built the app's screens in React and Next.js, and kept them loading fast: a 90+ average on Google's Core Web Vitals across pages.",
      "Cleaned up how the code was organized, ending up with 15 or more building blocks that got reused instead of rewritten, and connected the app to 5 or more outside services, including the login system.",
      "Worked on the company's early AI features.",
      "Helped decide how the frontend was built and how the building blocks were organized.",
    ],
  },
];
