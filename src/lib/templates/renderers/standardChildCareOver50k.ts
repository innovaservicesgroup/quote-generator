import { QuoteData } from "../shared/types";
import { renderAreaFamilyTemplate } from "../shared/areaRenderer";
import { CHILD_CARE_EXCLUSIONS } from "../data/childCareAreas";

export function renderStandardChildCareOver50k(data: QuoteData): string {
  return renderAreaFamilyTemplate(data, {
    docTitle: "COMMERCIAL CLEANING QUOTATION",
    docSubtitle: "QUOTATION SCHEDULE",
    staticTermsFile: "standard-child-care-over-50k-terms.html",
    staticCommitmentFile: "standard-child-care-over-50k-commitment.html",
    exclusions: CHILD_CARE_EXCLUSIONS,
    showServiceCoverage: true,
    pdfTitle: "Commercial Cleaning Quotation - Child Care",
  });
}
