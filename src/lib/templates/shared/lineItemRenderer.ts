import { QuoteData } from "./types";
import {
  docHeader,
  docFooter,
  getBrandAssets,
  loadStaticPartial,
  wrapDocument,
  escapeHtml,
  signatureImageFor,
  contractDividerPage,
} from "./layout";

function esc(s: string) {
  return escapeHtml(s ?? "");
}

function money(value: string): string {
  const v = (value ?? "").trim();
  return v ? `$${escapeHtml(v)}` : `<span style="color:#999;">TBC</span>`;
}

export interface LineItemTemplateConfig {
  staticTermsFile: string;
  staticCommitmentFile: string;
  pdfTitle: string;
  /** Fixed, always-included task checklist shown above the pricing
   *  table (used by Fit Out Clean, which has no per-task pricing). */
  fixedChecklist?: string[];
  /** Fixed paragraph describing the areas covered (Fit Out Clean). */
  coverageAreasText?: string;
}

export function renderLineItemFamilyTemplate(
  data: QuoteData,
  config: LineItemTemplateConfig
): string {
  const { client, reference, lineitem, innovaRepresentative } = data;
  if (!lineitem)
    throw new Error(`Missing lineitem-family data for ${data.templateId}`);
  const assets = getBrandAssets();

  const rows = lineitem.lineItems.length
    ? lineitem.lineItems
    : [{ id: "0", description: "", price: "" }];

  const lineItemsHtml = rows
    .map(
      (r) =>
        `<tr><td>${esc(r.description)}</td><td>${
          r.price ? "$" + esc(r.price) : ""
        }</td></tr>`
    )
    .join("");

  const fixedChecklistHtml = config.fixedChecklist
    ? `
    <h3 class="section-title">Service Coverage</h3>
    <table class="data-table">
      ${config.fixedChecklist
        .map((task) => `<tr><td></td><td>${esc(task)}</td></tr>`)
        .join("")}
    </table>`
    : "";

  const coverageAreasHtml = config.coverageAreasText
    ? `<p class="note"><strong>Areas covered:</strong> ${esc(config.coverageAreasText)}</p>`
    : "";

  const consumablesHtml = lineitem.consumables && lineitem.consumables.length
    ? `
    <h3 class="section-title">Popular Consumables</h3>
    <p class="note">Invoiced monthly to clients in addition to service cost</p>
    <table class="data-table">
      <tr><th>Products</th><th>Quantity</th><th>Qty per Carton</th></tr>
      ${lineitem.consumables
        .map(
          (r) =>
            `<tr><td>${esc(r.product)}</td><td>${esc(r.quantity)}</td><td>${esc(
              r.qtyPerCarton
            )}</td></tr>`
        )
        .join("")}
    </table>
    <p class="note">All prices are exclusive of GST</p>`
    : "";

  const body = `
  <div class="page">
    ${docHeader(assets)}
    <h1 class="doc-title">COMMERCIAL CLEANING QUOTATION</h1>
    <h2 class="doc-subtitle">SPECIFICATION SCHEDULE</h2>

    <table class="kv-table">
      <tr><td class="k">Quote Number:</td><td>${esc(client.quotationNumber)}</td></tr>
      <tr><td class="k">Date:</td><td>${esc(client.date)}</td></tr>
      <tr><td class="k">Company:</td><td>${esc(client.clientName)}</td></tr>
      <tr><td class="k">Work Location:</td><td>${esc(client.premisesAddress)}</td></tr>
      <tr><td class="k">Contact Name:</td><td>${esc(client.contactName)}</td></tr>
      <tr><td class="k">Phone Number:</td><td>${esc(client.phoneNumber)}</td></tr>
      <tr><td class="k">Email:</td><td>${esc(client.emailAddress)}</td></tr>
      <tr><td class="k">Specification:</td><td>${esc(client.specification || "")}</td></tr>
    </table>

    ${fixedChecklistHtml}
    ${coverageAreasHtml}

    <table class="data-table">
      <tr><th>Specification</th><th class="col-narrow">Price / Service</th></tr>
      ${lineItemsHtml}
    </table>

    <table class="pricing-table" style="margin-top:10px;">
      <tr><td class="label">Subtotal</td><td>${money(lineitem.pricing.subtotal)}</td></tr>
      <tr><td class="label">GST</td><td>${money(lineitem.pricing.gst)}</td></tr>
      <tr><td class="label">Total</td><td><strong>${money(lineitem.pricing.total)}</strong></td></tr>
    </table>

    <p class="note"><strong>Please note:</strong> Please confirm your acceptance by signing the acceptance page of this quotation and sending a work order. This quote is valid for 30 days, from the date of quotation.</p>
    <p class="note">Note: Unless requested or advised during the quotation process, no public holidays have been included in this pricing.</p>
    ${consumablesHtml}
    ${docFooter(assets)}
  </div>

  <div class="page page-break">
    ${docHeader(assets)}
    <div class="commitment-doc">
      ${loadStaticPartial(
        config.staticCommitmentFile,
        { INNOVA_REP_NAME: innovaRepresentative },
        {
          BADGE_ICON: `<img src="${assets.badgeIcon}" alt="" style="height:26px; vertical-align:middle; margin-right:6px;" />`,
          INNOVA_SIGNATURE_IMG: `<img src="${signatureImageFor(
            innovaRepresentative,
            assets
          )}" alt="Signature" style="height:34px;" />`,
        }
      )}
    </div>
    ${docFooter(assets)}
  </div>

  ${contractDividerPage(assets)}

  <div class="page page-break">
    ${docHeader(assets)}
    <div class="legal-doc">
      ${loadStaticPartial(config.staticTermsFile, {
        TERM: reference.term,
        NOTICE_TO_RESCHEDULE: reference.noticeToReschedule,
      })}
    </div>
    ${docFooter(assets)}
  </div>
  `;

  return wrapDocument(config.pdfTitle, body);
}
