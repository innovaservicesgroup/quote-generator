import { QuoteData } from "../shared/types";
import { renderAreaFamilyTemplate } from "../shared/areaRenderer";
import { MEDICAL_CENTRE_APPROACH } from "../data/medicalCentreAreas";

export function renderMedicalCentreOver50k(data: QuoteData): string {
  const introHtml = `
    <h3 class="section-title">Innova's Medical Approach</h3>
    <table class="data-table">
      ${MEDICAL_CENTRE_APPROACH.map(
        (item) =>
          `<tr><td class="checkmark-cell">✔</td><td>${item}</td></tr>`
      ).join("")}
    </table>`;

  return renderAreaFamilyTemplate(data, {
    docTitle: "COMMERCIAL CLEANING QUOTATION",
    docSubtitle: "QUOTATION SCHEDULE",
    staticTermsFile: "medical-centre-over-50k-terms.html",
    staticCommitmentFile: "medical-centre-over-50k-commitment.html",
    showServiceCoverage: true,
    introHtml,
    pdfTitle: "Commercial Cleaning Quotation - Medical Centre",
  });
}
