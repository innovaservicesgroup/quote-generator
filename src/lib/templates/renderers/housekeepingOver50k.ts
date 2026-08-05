import { QuoteData } from "../shared/types";
import {
  docHeader,
  docFooter,
  getBrandAssets,
  loadStaticPartial,
  wrapDocument,
  escapeHtml,
  signatureImageFor,
} from "../shared/layout";
import {
  HOUSEKEEPING_DEPARTURES_SECTIONS,
  HOUSEKEEPING_MIDSTAY_SECTIONS,
  HOUSEKEEPING_ADDITIONAL_SERVICES,
  HOUSEKEEPING_CONSUMABLES,
  HousekeepingSection,
} from "../data/housekeepingAreas";

function esc(s: string) {
  return escapeHtml(s ?? "");
}

function money(value: string): string {
  const v = (value ?? "").trim();
  return v ? `$${escapeHtml(v)}` : `<span style="color:#999;">TBC</span>`;
}

function renderSections(title: string, sections: HousekeepingSection[]): string {
  return `
    <h3 class="section-title">${esc(title)}</h3>
    ${sections
      .map(
        (s) => `
      <table class="area-block">
        <tr><td colspan="2" class="area-name">${esc(s.name)}</td></tr>
        ${s.tasks.map((t) => `<tr><td colspan="2">${esc(t)}</td></tr>`).join("")}
      </table>`
      )
      .join("")}`;
}

export function renderHousekeepingOver50k(data: QuoteData): string {
  const { client, reference, roomrate, innovaRepresentative } = data;
  if (!roomrate) throw new Error("Missing roomrate-family data for housekeeping-over-50k");
  const assets = getBrandAssets();

  const roomRowsHtml = roomrate.rooms
    .map(
      (r) => `
      <tr>
        <td>${esc(r.roomType)}</td>
        <td>${money(r.dailyRate)}</td>
        <td>${money(r.midstayRate)}</td>
        <td>${money(r.departureRate)}</td>
      </tr>`
    )
    .join("");

  const body = `
  <div class="page">
    ${docHeader(assets)}
    <h1 class="doc-title">HOUSEKEEPING QUOTATION</h1>
    <h2 class="doc-subtitle">QUOTATION SCHEDULE</h2>

    <table class="kv-table">
      <tr><td class="k">Quotation:</td><td>${esc(client.quotationNumber)}</td></tr>
      <tr><td class="k">Date:</td><td>${esc(client.date)}</td></tr>
      <tr><td class="k">Client Name:</td><td>${esc(client.clientName)}</td></tr>
      <tr><td class="k">Commercial Premises Address:</td><td>${esc(client.premisesAddress)}</td></tr>
      <tr><td class="k">Contact Name:</td><td>${esc(client.contactName)}</td></tr>
      <tr><td class="k">Phone Number:</td><td>${esc(client.phoneNumber)}</td></tr>
      <tr><td class="k">Email Address:</td><td>${esc(client.emailAddress)}</td></tr>
    </table>

    <h3 class="section-title">Housekeeping Services</h3>
    <p class="note"><strong>Scope of Works -- Housekeeping</strong></p>
    <p class="note"><strong>Mid-Stay:</strong> full clean during a long stay (7 of days, as instructed by Sky Apartments Management)</p>
    <p class="note"><strong>Departure:</strong> service will be performed upon guest checking out of room</p>

    ${renderSections("Departures", HOUSEKEEPING_DEPARTURES_SECTIONS)}
    ${renderSections("Mid Stay Service", HOUSEKEEPING_MIDSTAY_SECTIONS)}

    <h3 class="section-title">Pricing Table</h3>
    <table class="data-table">
      <tr><th>Room type</th><th>Daily</th><th>Midstay</th><th>Departure</th></tr>
      ${roomRowsHtml}
    </table>
    <p class="note"><strong>Minimum shift engagement:</strong> ${esc(
      roomrate.minimumShiftEngagement
    )}</p>
    <p class="note"><strong>Frequency of Work:</strong> ${esc(roomrate.frequencyOfWork)}</p>
    <p class="note">All prices are exclusive of GST.</p>
    <p class="note">Note: (a) Unless requested or advised during the quotation process, no public holidays have been included in this pricing. (b) Fortnightly cleaning is charged pro-rata: 26 cleans per year are evenly invoiced over 12 months.</p>

    <h3 class="section-title">Modern Slavery Act</h3>
    <p>Innova Services is a great advocate for fair pay across the Cleaning Industry. Our stance on this, means that we have high retention of staff allowing our service quality to remain intact for a long period of time. We abide by and comply with all Fair Work Australia and Commonwealth Modern Slavery legislation.</p>

    <h3 class="section-title">Additional Services</h3>
    <p class="note">Refer clause 7 of Terms — these prices are NOT included in the Room Cost.</p>
    <table class="data-table">
      <tr><th>Services</th><th>Frequency</th><th>Charge / service</th></tr>
      ${HOUSEKEEPING_ADDITIONAL_SERVICES.map(
        (r) => `<tr><td>${esc(r.service)}</td><td>${esc(r.frequency)}</td><td>${esc(r.charge)}</td></tr>`
      ).join("")}
    </table>
    <p class="note">All prices are exclusive of GST</p>

    <h3 class="section-title">Popular Consumables</h3>
    <p class="note">Invoiced monthly to clients in addition to service cost</p>
    <table class="data-table">
      <tr><th>Products</th><th>Quantity</th><th>Qty per Carton</th></tr>
      ${HOUSEKEEPING_CONSUMABLES.map(
        (r) => `<tr><td>${esc(r.product)}</td><td>${esc(r.quantity)}</td><td>${esc(r.qtyPerCarton)}</td></tr>`
      ).join("")}
    </table>
    <p class="note">All prices are exclusive of GST</p>
    ${docFooter(assets)}
  </div>

  <div class="page page-break">
    ${docHeader(assets)}
    <div class="commitment-doc">
      ${loadStaticPartial(
        "housekeeping-over-50k-commitment.html",
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
      ${loadStaticPartial("housekeeping-over-50k-terms.html", {
        TERM: reference.term,
        NOTICE_TO_RESCHEDULE: reference.noticeToReschedule,
      })}
    </div>
    ${docFooter(assets)}
  </div>
  `;

  return wrapDocument("Housekeeping Quotation - Sky Apartments", body);
}
