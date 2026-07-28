import { QuoteData } from "../shared/types";
import { renderLineItemFamilyTemplate } from "../shared/lineItemRenderer";

export function renderHighPressureJob(data: QuoteData): string {
  return renderLineItemFamilyTemplate(data, {
    staticTermsFile: "high-pressure-job-terms.html",
    staticCommitmentFile: "high-pressure-job-commitment.html",
    pdfTitle: "Commercial Cleaning Quotation - High Pressure Job",
  });
}
