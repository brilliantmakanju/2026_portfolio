import { skillGroups, type Skill, type SkillGroup } from "../data/skills";
import { SECTIONS } from "../data/sections";

export function renderSkills() {
  const el = document.getElementById("skills")!;
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0);

  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <header class="section-shell">
      <div class="sec-cmd"><span class="sec-prompt">&#10095;</span> ${SECTIONS.skills}</div>
      <div class="section-title-row">
        <h2 class="section-title">Skills</h2>
        <span class="section-count">${total} tools</span>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${skillGroups.map(groupToCard).join("\n")}
    </div>
  </div>`;
}

function groupToCard(group: SkillGroup) {
  return `
      <div class="card-mono p-6 space-y-4">
        <div class="skill-h">
          <span>// ${escapeAmps(group.title)}</span>
          <span class="skill-count">${group.skills.length}</span>
        </div>
        ${group.note ? `<p class="skill-group-note">${group.note}</p>` : ""}
        <div class="skill-list">
          ${group.skills.map(skillRow).join("\n          ")}
        </div>
      </div>`;
}

function skillRow(skill: Skill) {
  const name = typeof skill === "string" ? skill : skill.name;
  const note = typeof skill === "string" ? "Project tag pending" : skill.note ?? "Project tag pending";
  return `
          <div class="skill-row">
            <span class="skill-name">${name}</span>
            <span class="skill-projects">${note}</span>
          </div>`;
}

function escapeAmps(text: string) {
  return text.replace(/&(?!amp;)/g, "&amp;");
}
