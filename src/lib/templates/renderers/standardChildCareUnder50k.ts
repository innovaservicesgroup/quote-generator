import { QuoteData } from "../shared/types";
import { renderAreaFamilyTemplate } from "../shared/areaRenderer";
import { CHILD_CARE_UNDER_50K_EXCLUSIONS } from "../data/childCareUnder50kAreas";

export function renderStandardChildCareUnder50k(data: QuoteData): string {
  return renderAreaFamilyTemplate(data, {
    docTitle: "COMMERCIAL CLEANING QUOTATION",
    docSubtitle: "QUOTATION SCHEDULE",
    staticTermsFile: "standard-child-care-under-50k-terms.html",
    staticCommitmentFile: "standard-child-care-under-50k-commitment.html",
    exclusions: CHILD_CARE_UNDER_50K_EXCLUSIONS,
    showServiceCoverage: true,
    pdfTitle: "Commercial Cleaning Quotation - Child Care",
  });
}
