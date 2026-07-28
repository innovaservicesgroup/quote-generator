import { QuoteData } from "../shared/types";
import { renderLineItemFamilyTemplate } from "../shared/lineItemRenderer";

export function renderOneOffQuotes(data: QuoteData): string {
  return renderLineItemFamilyTemplate(data, {
    staticTermsFile: "one-off-quotes-terms.html",
    staticCommitmentFile: "one-off-quotes-commitment.html",
    pdfTitle: "Commercial Cleaning Quotation - One-Off",
  });
}
