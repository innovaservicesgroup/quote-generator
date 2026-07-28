import { QuoteData } from "../shared/types";
import { renderAreaFamilyTemplate } from "../shared/areaRenderer";
import { OFFICE_OVER_50K_EXCLUSIONS } from "../data/officeOver50kAreas";

export function renderOfficeOver50k(data: QuoteData): string {
  return renderAreaFamilyTemplate(data, {
    docTitle: "COMMERCIAL CLEANING QUOTATION",
    docSubtitle: "QUOTATION SCHEDULE",
    staticTermsFile: "office-over-50k-terms.html",
    staticCommitmentFile: "office-over-50k-commitment.html",
    exclusions: OFFICE_OVER_50K_EXCLUSIONS,
    showServiceCoverage: true,
    pdfTitle: "Commercial Cleaning Quotation - Office",
  });
}
