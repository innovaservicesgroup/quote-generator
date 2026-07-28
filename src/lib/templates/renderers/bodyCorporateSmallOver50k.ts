import { QuoteData } from "../shared/types";
import { renderAreaFamilyTemplate } from "../shared/areaRenderer";

export function renderBodyCorporateSmallOver50k(data: QuoteData): string {
  return renderAreaFamilyTemplate(data, {
    docTitle: "BODY CORPORATE COMMERCIAL CLEANING QUOTATION",
    docSubtitle: "QUOTATION SCHEDULE",
    staticTermsFile: "body-corporate-small-over-50k-terms.html",
    staticCommitmentFile: "body-corporate-small-over-50k-commitment.html",
    showServiceCoverage: true,
    pdfTitle: "Commercial Cleaning Quotation - Body Corporate (Small)",
  });
}
