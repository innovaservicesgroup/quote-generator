import { QuoteData } from "../shared/types";
import { renderLineItemFamilyTemplate } from "../shared/lineItemRenderer";
import { FIT_OUT_CLEAN_CHECKLIST, FIT_OUT_CLEAN_COVERAGE_AREAS } from "../data/fitOutClean";

export function renderFitOutClean(data: QuoteData): string {
  return renderLineItemFamilyTemplate(data, {
    staticTermsFile: "fit-out-clean-terms.html",
    staticCommitmentFile: "fit-out-clean-commitment.html",
    pdfTitle: "Cleaning Specification - Fit Out Clean",
    fixedChecklist: FIT_OUT_CLEAN_CHECKLIST,
    coverageAreasText: FIT_OUT_CLEAN_COVERAGE_AREAS,
  });
}
