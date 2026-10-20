import { heroData } from "../data/hero";
import { getMode } from "../data/mode";

/** Small mono kicker shown above the name in Plain-English mode. */
function ctaRow() {
  return `
      <div class="flex flex-col gap-3 pt-2 font-mono text-xs sm:flex-row sm:flex-wrap sm:items-center">
        <div class="grid grid-cols-2 gap-3 sm:contents">
          <a href="#projects" class="btn-mono justify-center">
            <span>Apps</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7-7 7M3 12h18"/></svg>
          </a>
          <a href="#experience" class="btn-mono-ghost justify-center">Experience</a>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:contents">
          <a href="mailto:${contactEmail()}" class="btn-mono-ghost justify-center">Contact</a>
          <a href="/resume.pdf" target="_blank" rel="noopener" class="btn-mono-ghost justify-center">Resume ↗</a>
        </div>
      </div>`;
}

/** Technical hero: name + typewriter + status terminal. *//** Typewriter line, shared by both hero modes. */
function typerRow() {
  const rolesText = [
    ...(heroData.roles ?? []),
    ...(heroData.plain.plainRoles ?? []),
  ]
    .filter((v, i, a) => a.indexOf(v) === i)
    .join(", ");
  return `
      <div class="flex items-center gap-2.5 font-mono text-base sm:text-lg" aria-hidden="true">
        <span class="text-emerald-400">&gt;</span>
        <span id="hero-typer" class="text-white whitespace-nowrap"></span>
        <span class="w-2 h-4 sm:h-5 bg-white inline-block animate-pulse"></span>
      </div>
      <span class="sr-only">${rolesText}</span>`;
}

function renderTechHero() {
  const { pill, intro, note, terminal } = heroData;

  return `
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
    <div class="lg:col-span-7 space-y-6">
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
        <span class="text-emerald-400">~/</span> ${pill}
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.1]">
        ${heroData.name}
      </h1>

      <p class="name-note">${heroData.plain.nameNote}</p>

      ${typerRow()}

      <p class="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
        ${intro}
      </p>

      <p class="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
        ${note}
      </p>

      ${ctaRow()}
    </div>

    <!-- Live CLI Terminal Widget -->
    <div class="lg:col-span-5">
      <div class="card-mono p-4 sm:p-5 font-mono text-xs shadow-2xl overflow-x-auto">
        <div class="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-500 text-[11px]">
          <div class="flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
          </div>
          <span>${terminal.prompt}</span>
        </div>

        <div class="space-y-2.5 text-slate-300">
          <div>
            <span class="text-emerald-400">$</span> <span class="text-white">${terminal.command}</span>
          </div>
          <div class="text-slate-400 pl-3 space-y-1 text-[11px] sm:text-xs">
            ${terminal.status.map((line) => `<div><span class="text-slate-500">${line.key}:</span> ${line.value}</div>`).join("\n            ")}
          </div>
          <div class="pt-2 flex items-center gap-1">
            <span class="text-emerald-400">$</span> <span class="w-2 h-4 bg-white inline-block animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

/**
 * Plain-English hero: the story for anyone.
 * Follows the three rules: max 3 points, memorable one-liner, verified perks.
 */
function renderPlainHero() {
  const { plain } = heroData;

  return `
  <div class="plain-hero space-y-6 max-w-3xl">
    <h1 class="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-white leading-[1.15]">
      ${heroData.name}
    </h1>

    <p class="name-note">${plain.nameNote}</p>

    ${typerRow()}

    <p class="text-lg sm:text-xl text-slate-200 leading-relaxed">
      ${plain.sub}
    </p>

    <blockquote class="plain-hero-body">
      ${plain.body}
    </blockquote>

    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed font-mono">
      ${plain.smallLine}
    </p>

    ${ctaRow()}
  </div>`;
}

export function renderHero() {
  const el = document.getElementById("hero")!;
  el.innerHTML = getMode() === "plain" ? renderPlainHero() : renderTechHero();
}

function contactEmail() {
  // Imported lazily to keep contact data in one place without a circular dep.
  return "brilliantmakanju10@gmail.com";
}

let typerEpoch = 0;

export function initHeroTyper() {
  const el = document.getElementById("hero-typer");
  if (!el) return;

  typerEpoch++;
  const epoch = typerEpoch;

  // Plain mode cycles friendlier titles; technical cycles the engineering ones.
  const roles =
    getMode() === "plain"
      ? heroData.plain.plainRoles ?? heroData.roles
      : heroData.roles;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    el.textContent = roles[0];
    return;
  }

  const alive = () => epoch === typerEpoch;

  let role = 0;
  let chars = 0;
  let deleting = false;

  const tick = () => {
    if (!alive()) return;
    const word = roles[role];
    if (!deleting) {
      chars++;
      el.textContent = word.slice(0, chars);
      if (chars === word.length) {
        deleting = true;
        setTimeout(tick, 2000); // hold the full role before erasing
        return;
      }
      setTimeout(tick, 55 + Math.random() * 45);
      return;
    }
    chars--;
    el.textContent = word.slice(0, chars);
    if (chars === 0) {
      deleting = false;
      role = (role + 1) % roles.length;
      setTimeout(tick, 450);
      return;
    }
    setTimeout(tick, 28);
  };

  tick();
}
