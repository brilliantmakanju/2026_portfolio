import { experienceData, type ExperienceEntry } from "../data/experience";
import { SECTIONS } from "../data/sections";
import { getMode } from "../data/mode";

const MONTHS: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function periodFor(entry: ExperienceEntry, isPlain: boolean) {
  return isPlain && entry.plainPeriod ? entry.plainPeriod : entry.period;
}

function splitRange(period: string) {
  return period.split(/\s+(?:to|-)\s+/);
}

function monthValue(label: string) {
  if (label.trim() === "Present") return Number.MAX_SAFE_INTEGER;
  const [month, year] = label.trim().split(/\s+/);
  return Number(year) * 12 + (MONTHS[month] ?? 0);
}

export function renderExperience() {
  const el = document.getElementById("experience")!;
  const isPlain = getMode() === "plain";
  const ranges = experienceData.map((entry) => splitRange(periodFor(entry, isPlain)));
  const starts = ranges.map((range) => range[0]);
  const ends = ranges.map((range) => range[1] ?? range[0]);
  const first = starts.reduce((a, b) => (monthValue(a) <= monthValue(b) ? a : b));
  const last = ends.reduce((a, b) => (monthValue(a) >= monthValue(b) ? a : b));
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
      ${experienceData.map((entry) => entryToEntry(entry, isPlain)).join("\n")}
    </div>
  </div>`;
}

function entryToEntry(entry: ExperienceEntry, isPlain: boolean) {
  const period = periodFor(entry, isPlain);
  return `
      <div class="timeline-entry">
        <span class="timeline-dot"></span>
        <div class="card-mono p-5 sm:p-6 space-y-4">
          <div class="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 class="text-base sm:text-lg font-bold text-white">${entry.role}</h3>
              ${entry.company ? `<div class="text-xs text-slate-400 font-mono">${entry.company}</div>` : ""}
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="tag-mono">${period}</span>
              ${entry.location ? `<span class="tag-mono">${entry.location}</span>` : ""}
            </div>
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
