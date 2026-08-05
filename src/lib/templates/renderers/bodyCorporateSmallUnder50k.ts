import { QuoteData } from "../shared/types";
import { renderAreaFamilyTemplate } from "../shared/areaRenderer";

export function renderBodyCorporateSmallUnder50k(data: QuoteData): string {
  return renderAreaFamilyTemplate(data, {
    docTitle: "BODY CORPORATE CLEANING QUOTATION",
    docSubtitle: "QUOTATION SCHEDULE",
    staticTermsFile: "body-corporate-small-under-50k-terms.html",
    staticCommitmentFile: "body-corporate-small-under-50k-commitment.html",
    showServiceCoverage: true,
    pdfTitle: "Commercial Cleaning Quotation - Body Corporate (Small)",
  });
}
