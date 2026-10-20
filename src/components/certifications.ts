import { certificationsData } from "../data/certifications";
import { SECTIONS } from "../data/sections";

export function renderCertifications() {
  const el = document.getElementById("certifications")!;

  el.innerHTML = `
  <div class="border-t border-white/10 pt-16">
    <header class="section-shell">
      <div class="sec-cmd"><span class="sec-prompt">&#10095;</span> ${SECTIONS.certifications}</div>
      <div class="section-title-row">
        <h2 class="section-title">Certifications</h2>
        <span class="section-count">${certificationsData.length} issued</span>
      </div>
    </header>

    <div class="cert-registry card-mono">
      <div class="cert-row cert-head-row">
        <span>date</span>
        <span>issuer</span>
        <span>credential</span>
      </div>
      ${certificationsData.map(certToRow).join("\n")}
    </div>
  </div>`;
}

function certToRow(cert: (typeof certificationsData)[number]) {
  return `
      <div class="cert-row">
        <span class="cr-date">${cert.date}</span>
        <span class="cr-issuer">${cert.issuer}</span>
        <span class="cr-main">
          <span class="cr-title">${cert.title}</span>
          <span class="cr-desc">${cert.desc}</span>
        </span>
      </div>`;
}
