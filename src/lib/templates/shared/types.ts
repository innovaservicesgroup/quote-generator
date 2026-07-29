// Core data model shared by every template in the system.

export type ValueBracket = "under_50k" | "over_50k";

// "area" family = fixed, pre-written duty lists grouped by physical area
// (Office, Body Corporate templates). "lineitem" family = free-form
// specification + price rows (One-Off, High Pressure Job templates).
// "roomrate" family = per-room-type pricing matrix (Housekeeping).
export type TemplateFamily = "area" | "lineitem" | "roomrate";

export interface TemplateMeta {
  id: string; // stable slug, e.g. "office-over-50k"
  bracket: ValueBracket;
  industry: string; // display name, e.g. "Office"
  family: TemplateFamily;
  title: string; // doc title, e.g. "COMMERCIAL CLEANING QUOTATION"
  subtitle: string; // e.g. "QUOTATION SCHEDULE" / "SPECIFICATION SCHEDULE"
  /** If true, the wizard lets the user toggle each duty area on/off.
   *  If false, all areas defined in the renderer are always included. */
  areasToggleable?: boolean;
  available: boolean; // false = "coming soon" stub, not yet fully built
}

export interface ClientDetails {
  quotationNumber: string;
  date: string; // ISO yyyy-mm-dd, formatted for display at render time
  clientName: string;
  premisesAddress: string;
  contactName: string;
  phoneNumber: string;
  emailAddress: string;
  specification?: string; // only used by lineitem family (e.g. "One-Off")
}

// ---- Family A: area-based duty schedule ----

export interface DutyArea {
  id: string;
  name: string;
  frequency: string; // filled in per quote, e.g. "Weekly"
  included: boolean; // toggled on/off in the wizard when areasToggleable
  tasks: string[]; // fixed, pre-written task descriptions (not user-edited)
}

export interface AdditionalServiceRow {
  service: string;
  frequency: string;
  charge: string;
}

/** A single task line within a Custom Scope of Work section — either
 *  picked from the common tasks dropdown or typed manually. */
export interface CustomScopeTask {
  id: string;
  task: string;
  frequency: string;
}

/** A custom area not covered by the fixed duty areas — e.g. "Building 3
 *  — Bathroom" — with its own header and one or more tasks. */
export interface CustomScopeSection {
  id: string;
  header: string;
  tasks: CustomScopeTask[];
}

export interface ConsumableRow {
  product: string;
  quantity: string;
  qtyPerCarton: string;
}

export interface AreaPricing {
  costPerMonth: string;
  contractPrice: string;
  frequencyOfWork: string;
}

export interface AreaFamilyData {
  areas: DutyArea[];
  additionalServices: AdditionalServiceRow[];
  consumables: ConsumableRow[];
  pricing: AreaPricing;
  /** Free-text lines for the "Service Coverage" checklist at the top of
   *  area-family templates (e.g. site/floor names covered by this quote). */
  serviceCoverageNotes: string[];
  /** Custom Scope of Work — manually added areas with their own header
   *  and task list, for anything not covered by the fixed duty areas. */
  customSections: CustomScopeSection[];
}

// ---- Family B: free-form line items ----

export interface LineItem {
  id: string;
  description: string;
  price: string;
}

export interface LineItemPricing {
  subtotal: string;
  gst: string;
  total: string;
}

export interface LineItemFamilyData {
  lineItems: LineItem[];
  pricing: LineItemPricing;
  consumables?: ConsumableRow[];
}

// ---- Family C: per-room-type pricing matrix (Housekeeping) ----

export interface RoomRateRow {
  id: string;
  roomType: string;
  dailyRate: string;
  midstayRate: string;
  departureRate: string;
}

export interface RoomRateFamilyData {
  rooms: RoomRateRow[];
  minimumShiftEngagement: string;
  frequencyOfWork: string;
}

// ---- Signature / reference schedule (shared, used by every template) ----

export interface ReferenceScheduleData {
  term: string; // e.g. "One Off", "12 Months"
  noticeToReschedule: string; // e.g. "1 Week / 48 hours"
}

export interface QuoteData {
  templateId: string;
  client: ClientDetails;
  reference: ReferenceScheduleData;
  area?: AreaFamilyData;
  lineitem?: LineItemFamilyData;
  roomrate?: RoomRateFamilyData;
}
