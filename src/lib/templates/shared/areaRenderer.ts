import { QuoteData } from "./types";
import {
  docHeader,
  docFooter,
  getBrandAssets,
  loadStaticPartial,
  wrapDocument,
  escapeHtml,
  signatureImageFor,
} from "./layout";

function esc(s: string) {
  return escapeHtml(s ?? "");
}

function money(value: string): string {
  const v = (value ?? "").trim();
  return v ? `$${escapeHtml(v)}` : `<span style="color:#999;">TBC</span>`;
}

export interface AreaTemplateConfig {
  docTitle: string; // e.g. "COMMERCIAL CLEANING QUOTATION"
  docSubtitle: string; // e.g. "QUOTATION SCHEDULE"
  staticTermsFile: string;
  staticCommitmentFile: string;
  exclusions?: string[];
  showServiceCoverage?: boolean;
  pdfTitle: string;
  /** Optional fixed HTML block (e.g. Medical Centre's "7 Step Approach")
   *  shown between the client details table and Service Coverage. Not
   *  editable via the wizard. */
  introHtml?: string;
}

export function renderAreaFamilyTemplate(
  data: QuoteData,
  config: AreaTemplateConfig
): string {
  const { client, reference, area, innovaRepresentative } = data;
  if (!area) throw new Error(`Missing area-family data for ${data.templateId}`);
  const assets = getBrandAssets();

  const includedAreas = area.areas.filter((a) => a.included);

  const areasHtml = includedAreas
    .map(
      (a) => `
    <table class="area-block">
      <tr><td colspan="2" class="area-name">${esc(a.name)}</td></tr>
      <tr><th class="freq">Frequency</th><th>Included</th></tr>
      <tr><td class="freq">${esc(a.frequency) || "&nbsp;"}</td><td><ul class="task-list">${a.tasks
        .map((t) => `<li>${esc(t)}</li>`)
        .join("")}</ul></td></tr>
    </table>`
    )
    .join("\n");

  const customSectionsHtml =
    area.customSections && area.customSections.length
      ? area.customSections
          .map(
            (section) => `
    <table class="area-block">
      <tr><td colspan="2" class="area-name">${esc(section.header) || "Custom Area"}</td></tr>
      <tr><th class="freq">Frequency</th><th>Task</th></tr>
      ${section.tasks
        .map(
          (t) =>
            `<tr><td class="freq">${esc(t.frequency) || "&nbsp;"}</td><td><ul class="task-list"><li>${esc(
              t.task
            )}</li></ul></td></tr>`
        )
        .join("")}
    </table>`
          )
          .join("\n")
      : "";

  const exclusionsHtml =
    config.exclusions && config.exclusions.length
      ? `
    <table class="area-block">
      <tr><td colspan="2" class="area-name">Exclusions</td></tr>
      ${config.exclusions
        .map((e) => `<tr><td class="freq">X</td><td>${esc(e)}</td></tr>`)
        .join("")}
    </table>`
      : "";

  const serviceCoverageHtml = config.showServiceCoverage
    ? `
    <h3 class="section-title">Services</h3>
    <table class="data-table">
      <tr><th colspan="2">Service Coverage</th></tr>
      ${(area.serviceCoverageNotes.length
        ? area.serviceCoverageNotes
        : ["", "", "", ""]
      )
        .slice(0, 4)
        .map(
          (note) =>
            `<tr><td style="width:8%; text-align:center;">✔</td><td>${esc(
              note
            )}</td></tr>`
        )
        .join("")}
    </table>`
    : "";

  const additionalServicesHtml = `
    <h3 class="section-title">Additional Services</h3>
    <p class="note">Refer clause 7 of Terms — these prices are NOT included in the Total Monthly Cost.</p>
    <table class="data-table">
      <tr><th>Services</th><th>Frequency</th><th>Charge / service</th></tr>
      ${(area.additionalServices.length
        ? area.additionalServices
        : [{ service: "", frequency: "", charge: "" }]
      )
        .map(
          (r) =>
            `<tr><td>${esc(r.service)}</td><td>${esc(r.frequency)}</td><td>${esc(
              r.charge
            )}</td></tr>`
        )
        .join("")}
    </table>
    <p class="note">All prices are exclusive of GST</p>`;

  const consumablesHtml = area.consumables.length
    ? `
    <h3 class="section-title">Popular Consumables</h3>
    <p class="note">Invoiced monthly to clients in addition to service cost</p>
    <table class="data-table">
      <tr><th>Products</th><th>Quantity</th><th>Qty per Carton</th></tr>
      ${area.consumables
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
    <h1 class="doc-title">${esc(config.docTitle)}</h1>
    <h2 class="doc-subtitle">${esc(config.docSubtitle)}</h2>

    <table class="kv-table">
      <tr><td class="k">Quotation:</td><td>${esc(client.quotationNumber)}</td></tr>
      <tr><td class="k">Date:</td><td>${esc(client.date)}</td></tr>
      <tr><td class="k">Client Name:</td><td>${esc(client.clientName)}</td></tr>
      <tr><td class="k">Commercial Premises Address:</td><td>${esc(client.premisesAddress)}</td></tr>
      <tr><td class="k">Contact Name:</td><td>${esc(client.contactName)}</td></tr>
      <tr><td class="k">Phone Number:</td><td>${esc(client.phoneNumber)}</td></tr>
      <tr><td class="k">Email Address:</td><td>${esc(client.emailAddress)}</td></tr>
    </table>

    ${config.introHtml || ""}

    ${serviceCoverageHtml}

    <h3 class="section-title">Schedule of Duties</h3>
    ${areasHtml}
    ${customSectionsHtml}
    ${exclusionsHtml}

    <h3 class="section-title">Pricing Table</h3>
    <table class="pricing-table">
      <tr><td class="label">Cost of Service / Month ("Contract Price")</td>
          <td>${money(area.pricing.costPerMonth)}<br/><em>The total minimum price payable by the Client if the Services are delivered for the full Term is ${money(
            area.pricing.contractPrice
          )}.</em></td></tr>
      <tr><td class="label">Frequency of Work</td><td>${esc(area.pricing.frequencyOfWork)}</td></tr>
    </table>
    <p class="note">All prices are exclusive of GST. This quote is valid for 30 days, in accordance with clause 4 of the below service agreement.</p>
    <p class="note">Note: (a) Unless requested or advised during the quotation process, no public holidays have been included in this pricing. (b) Fortnightly cleaning is charged pro-rata: 26 cleans per year are evenly invoiced over 12 months.</p>

    <h3 class="section-title">Modern Slavery Act</h3>
    <p>Innova Services is a great advocate for fair pay across the Cleaning Industry. Our stance on this, means that we have high retention of staff allowing our service quality to remain intact for a long period of time. We abide by and comply with all Fair Work Australia and Commonwealth Modern Slavery legislation.</p>

    ${additionalServicesHtml}
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
          INNOVA_SIGNATURE_IMG: `<img src="${signatureImageFor(
            innovaRepresentative,
            assets
          )}" alt="Signature" style="height:34px;" />`,
        }
      )}
    </div>
    ${docFooter(assets)}
  </div>

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
