import { QuoteData } from "../shared/types";
import { renderAreaFamilyTemplate } from "../shared/areaRenderer";

export function renderBodyCorporateMediumLargeUnder50k(data: QuoteData): string {
  return renderAreaFamilyTemplate(data, {
    docTitle: "COMMERCIAL CLEANING QUOTATION",
    docSubtitle: "QUOTATION SCHEDULE",
    staticTermsFile: "body-corporate-medium-large-under-50k-terms.html",
    staticCommitmentFile: "body-corporate-medium-large-under-50k-commitment.html",
    showServiceCoverage: true,
    pdfTitle: "Commercial Cleaning Quotation - Body Corporate (Medium to Large)",
  });
}
