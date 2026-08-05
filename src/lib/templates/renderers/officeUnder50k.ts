import { QuoteData } from "../shared/types";
import { renderAreaFamilyTemplate } from "../shared/areaRenderer";
import { OFFICE_UNDER_50K_EXCLUSIONS } from "../data/officeUnder50kAreas";

export function renderOfficeUnder50k(data: QuoteData): string {
  return renderAreaFamilyTemplate(data, {
    docTitle: "COMMERCIAL CLEANING QUOTATION",
    docSubtitle: "QUOTATION SCHEDULE",
    staticTermsFile: "office-under-50k-terms.html",
    staticCommitmentFile: "office-under-50k-commitment.html",
    exclusions: OFFICE_UNDER_50K_EXCLUSIONS,
    showServiceCoverage: true,
    pdfTitle: "Commercial Cleaning Quotation - Office",
  });
}
