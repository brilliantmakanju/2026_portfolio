import { certificationsData, type Certification } from "../data/certifications";
import { SECTIONS } from "../data/sections";

type CertificationGroup = {
  date: string;
  issuer: string;
  titles: string[];
};

function groupCertifications(certs: Certification[]): CertificationGroup[] {
  const groups = new Map<string, CertificationGroup>();

  for (const cert of certs) {
    const key = `${cert.issuer}|${cert.date}`;
    const existing = groups.get(key);
    if (existing) {
      existing.titles.push(cert.title);
    } else {
      groups.set(key, { date: cert.date, issuer: cert.issuer, titles: [cert.title] });
    }
  }

  return Array.from(groups.values());
}

export function renderCertifications() {
  const el = document.getElementById("certifications")!;
  const groups = groupCertifications(certificationsData);

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
        <span>credentials</span>
      </div>
      ${groups.map(certToRow).join("\n")}
    </div>
  </div>`;
}

function certToRow(group: CertificationGroup) {
  return `
      <div class="cert-row">
        <span class="cr-date">${group.date}</span>
        <span class="cr-issuer">${group.issuer}</span>
        <span class="cr-main">
          <span class="cr-title">${group.titles.join(" · ")}</span>
        </span>
      </div>`;
}
