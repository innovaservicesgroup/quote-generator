import { QuoteData } from "../shared/types";
import { renderOfficeOver50k } from "./officeOver50k";
import { renderBodyCorporateSmallOver50k } from "./bodyCorporateSmallOver50k";
import { renderBodyCorporateMediumLargeOver50k } from "./bodyCorporateMediumLargeOver50k";
import { renderBodyCorporateMediumLargeUnder50k } from "./bodyCorporateMediumLargeUnder50k";
import { renderOneOffQuotes } from "./oneOffQuotes";
import { renderHighPressureJob } from "./highPressureJob";
import { renderMedicalCentreOver50k } from "./medicalCentreOver50k";
import { renderStandardChildCareOver50k } from "./standardChildCareOver50k";
import { renderOfficeUnder50k } from "./officeUnder50k";
import { renderBodyCorporateSmallUnder50k } from "./bodyCorporateSmallUnder50k";
import { renderMedicalCentreUnder50k } from "./medicalCentreUnder50k";
import { renderStandardChildCareUnder50k } from "./standardChildCareUnder50k";
import { renderFitOutClean } from "./fitOutClean";
import { renderHousekeepingOver50k } from "./housekeepingOver50k";

export function renderTemplate(data: QuoteData): string {
  switch (data.templateId) {
    case "office-over-50k":
      return renderOfficeOver50k(data);
    case "body-corporate-small-over-50k":
      return renderBodyCorporateSmallOver50k(data);
    case "body-corporate-medium-large-over-50k":
      return renderBodyCorporateMediumLargeOver50k(data);
    case "body-corporate-medium-large-under-50k":
      return renderBodyCorporateMediumLargeUnder50k(data);
    case "one-off-quotes":
      return renderOneOffQuotes(data);
    case "high-pressure-job":
      return renderHighPressureJob(data);
    case "medical-centre-over-50k":
      return renderMedicalCentreOver50k(data);
    case "standard-child-care-over-50k":
      return renderStandardChildCareOver50k(data);
    case "office-under-50k":
      return renderOfficeUnder50k(data);
    case "body-corporate-small-under-50k":
      return renderBodyCorporateSmallUnder50k(data);
    case "medical-centre-under-50k":
      return renderMedicalCentreUnder50k(data);
    case "standard-child-care-under-50k":
      return renderStandardChildCareUnder50k(data);
    case "fit-out-clean":
      return renderFitOutClean(data);
    case "housekeeping-over-50k":
      return renderHousekeepingOver50k(data);
    default:
      throw new Error(`No renderer implemented for template "${data.templateId}".`);
  }
}
