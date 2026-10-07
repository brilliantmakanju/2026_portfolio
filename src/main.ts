import "./style.css";
import { renderNav, initNav } from "./components/nav";
import { renderHero } from "./components/hero";
import { renderMetrics } from "./components/metrics";
import { renderSkills } from "./components/skills";
import { renderCaseStudies, initCaseStudies } from "./components/caseStudies";
import { renderProjects } from "./components/projects";
import { renderExperience } from "./components/experience";
import { renderCertifications } from "./components/certifications";
import { renderContact, initContact } from "./components/contact";

document.addEventListener("DOMContentLoaded", () => {
  renderNav();
  initNav();
  renderHero();
  renderMetrics();
  renderCaseStudies();
  initCaseStudies();
  renderProjects();
  renderSkills();
  renderExperience();
  renderCertifications();
  renderContact();
  initContact();
});
