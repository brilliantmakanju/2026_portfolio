// Terminal-style section header commands, used by every section shell.
export const SECTIONS = {
  projects: "cat ~/work/registry.md",
  skills: "cat ~/skills.yaml",
  experience: "tail -n 1 ~/work.log",
  certifications: "ls ~/credentials/",
  contact: "npm run contact",
} as const;
