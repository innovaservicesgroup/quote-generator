import { TemplateMeta } from "./shared/types";

// This is the single source of truth for "Under $50k / Over $50k" ->
// industry folder -> template. Add a new template by adding an entry
// here AND a matching renderer in ./renderers/<id>.ts, then wiring it
// into the switch in ./renderers/index.ts.
export const TEMPLATES: TemplateMeta[] = [
  {
    id: "office-over-50k",
    bracket: "over_50k",
    industry: "Office",
    family: "area",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "body-corporate-small-over-50k",
    bracket: "over_50k",
    industry: "Body Corporate (Small)",
    family: "area",
    title: "BODY CORPORATE COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "body-corporate-medium-large-over-50k",
    bracket: "over_50k",
    industry: "Body Corporate (Medium to Large)",
    family: "area",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "body-corporate-medium-large-under-50k",
    bracket: "under_50k",
    industry: "Body Corporate (Medium to Large)",
    family: "area",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "one-off-quotes",
    bracket: "under_50k",
    industry: "One-Off",
    family: "lineitem",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "SPECIFICATION SCHEDULE",
    available: true,
  },
  {
    id: "high-pressure-job",
    bracket: "under_50k",
    industry: "High Pressure Job",
    family: "lineitem",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "SPECIFICATION SCHEDULE",
    available: true,
  },
  {
    id: "medical-centre-over-50k",
    bracket: "over_50k",
    industry: "Medical Centre",
    family: "area",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "standard-child-care-over-50k",
    bracket: "over_50k",
    industry: "Child Care",
    family: "area",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "office-under-50k",
    bracket: "under_50k",
    industry: "Office",
    family: "area",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "body-corporate-small-under-50k",
    bracket: "under_50k",
    industry: "Body Corporate (Small)",
    family: "area",
    title: "BODY CORPORATE CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "medical-centre-under-50k",
    bracket: "under_50k",
    industry: "Medical Centre",
    family: "area",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "standard-child-care-under-50k",
    bracket: "under_50k",
    industry: "Child Care",
    family: "area",
    title: "COMMERCIAL CLEANING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    areasToggleable: true,
    available: true,
  },
  {
    id: "fit-out-clean",
    bracket: "under_50k",
    industry: "Fit Out Clean",
    family: "lineitem",
    title: "CLEANING SPECIFICATION",
    subtitle: "QUOTATION SCHEDULE",
    available: true,
  },
  {
    id: "housekeeping-over-50k",
    bracket: "over_50k",
    industry: "Housekeeping (Sky Apartments)",
    family: "roomrate",
    title: "HOUSEKEEPING QUOTATION",
    subtitle: "QUOTATION SCHEDULE",
    available: true,
  },
];

export function getTemplate(id: string): TemplateMeta | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesFor(bracket: string, industry?: string) {
  return TEMPLATES.filter(
    (t) => t.bracket === bracket && (!industry || t.industry === industry)
  );
}

export function getIndustriesFor(bracket: string) {
  const set = new Set(
    TEMPLATES.filter((t) => t.bracket === bracket).map((t) => t.industry)
  );
  return Array.from(set);
}
