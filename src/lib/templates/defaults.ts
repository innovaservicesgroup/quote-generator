import { QuoteData } from "./shared/types";
import { getTemplate } from "./registry";
import { OFFICE_OVER_50K_AREAS } from "./data/officeOver50kAreas";
import {
  BODY_CORP_SMALL_AREAS,
  BODY_CORP_MED_LARGE_OVER_50K_AREAS,
  BODY_CORP_MED_LARGE_UNDER_50K_AREAS,
} from "./data/bodyCorporateAreas";
import { MEDICAL_CENTRE_AREAS, MEDICAL_CENTRE_DEFAULT_COVERAGE } from "./data/medicalCentreAreas";
import { CHILD_CARE_AREAS, CHILD_CARE_DEFAULT_COVERAGE } from "./data/childCareAreas";
import { OFFICE_UNDER_50K_AREAS } from "./data/officeUnder50kAreas";
import {
  CHILD_CARE_UNDER_50K_AREAS,
  CHILD_CARE_UNDER_50K_DEFAULT_COVERAGE,
} from "./data/childCareUnder50kAreas";
import { HOUSEKEEPING_ROOM_TYPES } from "./data/housekeepingAreas";

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function areaSetFor(templateId: string) {
  switch (templateId) {
    case "office-over-50k":
      return OFFICE_OVER_50K_AREAS;
    case "body-corporate-small-over-50k":
      return BODY_CORP_SMALL_AREAS;
    case "body-corporate-medium-large-over-50k":
      return BODY_CORP_MED_LARGE_OVER_50K_AREAS;
    case "body-corporate-medium-large-under-50k":
      return BODY_CORP_MED_LARGE_UNDER_50K_AREAS;
    case "medical-centre-over-50k":
      return MEDICAL_CENTRE_AREAS;
    case "standard-child-care-over-50k":
      return CHILD_CARE_AREAS;
    case "office-under-50k":
      return OFFICE_UNDER_50K_AREAS;
    case "body-corporate-small-under-50k":
      return BODY_CORP_SMALL_AREAS;
    case "medical-centre-under-50k":
      return MEDICAL_CENTRE_AREAS;
    case "standard-child-care-under-50k":
      return CHILD_CARE_UNDER_50K_AREAS;
    default:
      return OFFICE_OVER_50K_AREAS;
  }
}

function defaultCoverageFor(templateId: string): string[] {
  switch (templateId) {
    case "medical-centre-over-50k":
    case "medical-centre-under-50k":
      return MEDICAL_CENTRE_DEFAULT_COVERAGE;
    case "standard-child-care-over-50k":
      return CHILD_CARE_DEFAULT_COVERAGE;
    case "standard-child-care-under-50k":
      return CHILD_CARE_UNDER_50K_DEFAULT_COVERAGE;
    default:
      return [];
  }
}

export function buildDefaultQuoteData(templateId: string): QuoteData {
  const meta = getTemplate(templateId);

  const base: QuoteData = {
    templateId,
    client: {
      quotationNumber: "",
      date: todayIso(),
      clientName: "",
      premisesAddress: "",
      contactName: "",
      phoneNumber: "",
      emailAddress: "",
      specification: templateId === "high-pressure-job" ? "High pressure clean" : "",
    },
    reference: {
      term: meta?.family === "lineitem" ? "One Off" : "12 Months from Commencement Date",
      noticeToReschedule: "1 Week / 48 hours",
    },
    innovaRepresentative: "Pascal Dufroux",
  };

  if (meta?.family === "area") {
    const areaDefs = areaSetFor(templateId);
    base.area = {
      areas: areaDefs.map((a) => ({
        ...a,
        frequency: "",
        included: true,
      })),
      additionalServices: [],
      consumables: [],
      pricing: { costPerMonth: "", contractPrice: "", frequencyOfWork: "" },
      serviceCoverageNotes: defaultCoverageFor(templateId),
      customSections: [],
    };
  }

  if (meta?.family === "lineitem") {
    base.lineitem = {
      lineItems: [
        {
          id: crypto.randomUUID(),
          description:
            templateId === "high-pressure-job"
              ? "High pressure clean — mild solution applied and rinsed with high/low pressure. Safety barricades used in areas being cleaned."
              : templateId === "fit-out-clean"
              ? "Fit-out clean — full scope as per specification above"
              : "",
          price: "",
        },
      ],
      pricing: { subtotal: "", gst: "", total: "" },
      consumables: templateId === "fit-out-clean" ? [] : undefined,
    };
  }

  if (meta?.family === "roomrate") {
    base.roomrate = {
      rooms: HOUSEKEEPING_ROOM_TYPES.map((roomType) => ({
        id: roomType.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        roomType,
        dailyRate: "",
        midstayRate: "",
        departureRate: "",
      })),
      minimumShiftEngagement:
        "Any combination as listed above but must be a minimum aggregate of 3 hours shift.",
      frequencyOfWork: "On demand (per shift basis)",
    };
  }

  return base;
}
