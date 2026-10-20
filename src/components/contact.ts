import { contactData } from "../data/contact";
import { SECTIONS } from "../data/sections";

export function renderContact() {
  const el = document.getElementById("contact")!;
  const { email, resumePath, location, channels } = contactData;

  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <div class="card-mono-hi p-8 sm:p-12 space-y-8">
      <div class="space-y-3">
        <div class="sec-cmd"><span class="sec-prompt">&#10095;</span> ${SECTIONS.contact}</div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Contact
        </h2>
      </div>

      <div class="flex flex-wrap items-center gap-4 font-mono text-xs">
        <a href="mailto:${email}" class="btn-mono">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          ${email}
        </a>
        <a href="${resumePath}" target="_blank" rel="noopener" class="btn-mono-ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
          Resume PDF
        </a>
        <button id="copy-email-btn" class="btn-mono-ghost">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          Copy Email
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 font-mono text-xs">
        ${channels
          .map(
            (channel) => `
        <div class="p-3.5 rounded bg-[#050505] border border-white/10 flex items-center justify-between">
          <span class="text-slate-400">${channel.label}</span>
          <a href="${channel.url}" target="_blank" rel="noopener" class="text-white hover:underline">${channel.display} &rarr;</a>
        </div>`
          )
          .join("\n")}
        <div class="p-3.5 rounded bg-[#050505] border border-white/10 flex items-center justify-between">
          <span class="text-slate-400">Location</span>
          <span class="text-white">${location}</span>
        </div>
      </div>
    </div>
  </div>`;

  const footerEl = document.getElementById("footer")!;
  footerEl.innerHTML = `
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
    <div>(c) ${new Date().getFullYear()} Brilliant Makanju.</div>
    <div class="flex items-center gap-4">
      <span>Built with Vite, TS and Tailwind</span>
      <span>*</span>
      <a href="#hero" class="text-slate-400 hover:text-white transition-colors">Top ^</a>
    </div>
  </div>`;
}

export function initContact() {
  document.getElementById("copy-email-btn")?.addEventListener("click", () => {
    navigator.clipboard.writeText(contactData.email);
    const btn = document.getElementById("copy-email-btn")!;
    const orig = btn.innerHTML;
    btn.innerHTML = `Copied!`;
    setTimeout(() => { btn.innerHTML = orig; }, 2000);
  });
}
