import { experienceData } from "../data/experience";
import { SECTIONS } from "../data/sections";
import { getMode } from "../data/mode";

export function renderExperience() {
  const el = document.getElementById("experience")!;
  const isPlain = getMode() === "plain";
  const periodOf = (e: (typeof experienceData)[number]) => (isPlain && e.plainPeriod ? e.plainPeriod : e.period);
  const first = periodOf(experienceData[0]).split(" to ")[0].split(" - ")[0];
  const lastRaw = periodOf(experienceData[experienceData.length - 1]);
  const last = lastRaw.includes(" to ") ? lastRaw.split(" to ")[1] : lastRaw.split(" - ")[1];
  const spanLabel = isPlain ? `${first} to ${last}` : `${first} - ${last}`;

  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <header class="section-shell">
      <div class="sec-cmd"><span class="sec-prompt">&#10095;</span> ${SECTIONS.experience}</div>
      <div class="section-title-row">
        <h2 class="section-title">Work Experience</h2>
        <span class="section-count">${spanLabel}</span>
      </div>
    </header>

    <div class="timeline">
      ${experienceData.map(entryToEntry).join("\n")}
    </div>
  </div>`;
}

function entryToEntry(entry: (typeof experienceData)[number]) {
  const isPlain = getMode() === "plain";
  return `
      <div class="timeline-entry">
        <span class="timeline-dot"></span>
        <div class="card-mono p-5 sm:p-6 space-y-4">
          <div class="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white">${entry.role}</h3>
              <div class="text-xs text-slate-400 font-mono">${entry.company}</div>
            </div>
            <span class="tag-mono">${entry.location}</span>
          </div>

          <ul class="${isPlain ? "plain-decisions" : "space-y-2 text-xs sm:text-sm text-slate-300 font-mono"}">
            ${(entry.plainBullets ?? entry.bullets).map(entryBullet).join("\n")}
          </ul>
        </div>
      </div>`;
}

function entryBullet(text: string) {
  return `
          <li class="flex items-start gap-2">
            <span class="text-slate-500 font-bold">&gt;</span>
            <span>${text}</span>
          </li>`;
}
