import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { JSDOM } from "jsdom";

const root = fileURLToPath(new URL("..", import.meta.url));
const indexPath = new URL("../dist/index.html", import.meta.url);
const html = await readFile(indexPath, "utf8");

const dom = new JSDOM(html, {
  url: "https://jolex.vercel.app/",
  pretendToBeVisual: true,
});
const { window } = dom;

globalThis.window = window;
globalThis.document = window.document;
globalThis.localStorage = window.localStorage;
globalThis.location = window.location;
globalThis.history = window.history;

const vite = await createServer({
  root,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { getMode } = await vite.ssrLoadModule("/src/data/mode.ts");
  const { renderNav } = await vite.ssrLoadModule("/src/components/nav.ts");
  const { renderHero } = await vite.ssrLoadModule("/src/components/hero.ts");
  const { renderProjects } = await vite.ssrLoadModule("/src/components/projects/index.ts");
  const { renderSkills } = await vite.ssrLoadModule("/src/components/skills.ts");
  const { renderExperience } = await vite.ssrLoadModule("/src/components/experience.ts");
  const { renderCertifications } = await vite.ssrLoadModule("/src/components/certifications.ts");
  const { renderContact } = await vite.ssrLoadModule("/src/components/contact.ts");
  const { renderModeOverlay } = await vite.ssrLoadModule("/src/components/mode-toggle.ts");

  renderNav();
  renderHero();
  renderProjects();
  renderSkills();
  renderExperience();
  renderCertifications();
  renderContact();
  renderModeOverlay();

  const mode = getMode();
  document.body.dataset.prerendered = "true";
  document.body.dataset.prerenderedMode = mode;

  await writeFile(indexPath, dom.serialize(), "utf8");
  console.log(`Prerendered dist/index.html in ${mode} mode`);
} finally {
  await vite.close();
  window.close();
}
