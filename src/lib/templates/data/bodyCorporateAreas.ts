import { DutyAreaTemplate } from "../shared/types";

// "Body Corporate (Small) - Over $50k" — verbatim from Innova's Word template.
export const BODY_CORP_SMALL_AREAS: DutyAreaTemplate[] = [
  {
    id: "general",
    name: "General",
    tasks: [
      "Sweep /vacuum all internal tiled floors",
      "Mop all internal Tiled floors",
      "Wipe all handrails with damp cloth",
      "Remove Cobwebs upon detection",
      "Dust/wipe window frames",
      "General wipe of pipe work, fire extinguisher etc in the stairwell",
    ],
  },
  {
    id: "external-area",
    name: "External Area",
    tasks: [
      "Air blow concrete floor in the undercover garage area",
      "Air blow bin area, visitor car park & driveway/pathway",
      "Pick up litter",
    ],
  },
  {
    id: "glass-doors-windows",
    name: "Glass Doors & Internal Windows (up to 2.4m)",
    tasks: ["Remove fingerprints", "Squeegee clean"],
  },
];

// "Body Corporate (Medium to Large) - Over $50k" — verbatim.
export const BODY_CORP_MED_LARGE_OVER_50K_AREAS: DutyAreaTemplate[] = [
  {
    id: "main-entrance-external",
    name: "Main Entrance (external)",
    tasks: [
      "Front entrance swept clean and litter removed",
      "Touch up clean glass entrance doors & glass panels. Wipe sills",
      "Wipe letterboxes & frames",
      "Vacuum door mats if applicable",
      "Remove cobwebs & wasps' nest upon detection",
      "Wipe main switchboard/fire door/communication doors & panel fire box",
      "Mop the tiled floor",
    ],
  },
  {
    id: "foyer-internal",
    name: "Foyer (Internal)",
    tasks: [
      "General dust/wipe clean",
      "Remove spots, stains, and marks",
      "Vacuum all floors",
      "Spot mop any stains, spillages",
      "Mop the tiled floor",
      "I-Mop the tiled floor",
    ],
  },
  {
    id: "all-levels",
    name: "All levels (4)",
    tasks: ["Vacuum all carpeted floors", "Remove cobwebs upon detection"],
  },
  {
    id: "communal-room",
    name: "Communal room",
    tasks: [
      "Wipe all outdoor furniture",
      "Clean glass panels & louvres",
      "Remove cobwebs upon detection",
      "Remove rubbish from planters",
      "Vacuum & mop all tiled floors",
    ],
  },
  {
    id: "lift",
    name: "Lift",
    tasks: [
      "Sanitize panels control",
      "Thoroughly clean all internal walls",
      "Polish all stainless steel",
      "Clean mirrors",
      "Vacuum floors & clean tracks",
    ],
  },
  {
    id: "bin-area",
    name: "Bin Area",
    tasks: ["Sweep or blow", "Collect rubbish on the floor", "Clean water wash spills, if any"],
  },
  {
    id: "externals",
    name: "Externals",
    tasks: ["Collect rubbish from garden beds & externals"],
  },
  {
    id: "report-to-body-corporate",
    name: "Report to Body Corporate",
    tasks: ["Report any issues like graffiti/defect light bulb, damage...etc (upon detection)"],
  },
  {
    id: "car-park",
    name: "Car Park (both levels)",
    tasks: [
      "Collect rubbish, leaves & debris",
      "Sweep ONLY edges along walls & columns",
      "Sweep & mop lift landing",
      "Remove cobwebs upon detection in the common areas of the carpark",
    ],
  },
];

// "Body Corporate (Medium to Large) - Under $50k" — verbatim.
export const BODY_CORP_MED_LARGE_UNDER_50K_AREAS: DutyAreaTemplate[] = [
  {
    id: "main-entrance-external",
    name: "Main Entrance (external)",
    tasks: [
      "Front entrance swept clean and litter removed",
      "Touch up clean glass entrance doors & glass panels. Wipe sills",
      "Wipe letterboxes & frames",
      "Vacuum door mats if applicable",
      "Remove cobwebs & wasps' nest upon detection",
      "Wipe main switchboard/fire door/communication doors & panel fire box",
      "Mop the tiled floor",
    ],
  },
  {
    id: "foyer-internal",
    name: "Foyer (Internal)",
    tasks: [
      "General dust/wipe clean",
      "Remove spots, stains, and marks",
      "Vacuum all floors",
      "Spot mop any stains, spillages",
      "Mop the tiled floor",
    ],
  },
  {
    id: "all-levels",
    name: "All levels",
    tasks: [
      "Vacuum all carpeted floors",
      "Vacuum & mop all hard floors",
      "Wipe handrails & window sills",
      "Remove cobwebs upon detection",
    ],
  },
  {
    id: "communal-room",
    name: "Communal room (if any)",
    tasks: [
      "Wipe all outdoor furniture",
      "Clean glass panels & louvres",
      "Remove cobwebs upon detection",
      "Remove rubbish from planters",
      "Vacuum & mop all tiled floors",
    ],
  },
  {
    id: "lift",
    name: "Lift (if any)",
    tasks: [
      "Sanitize panels control",
      "Thoroughly clean all internal walls",
      "Polish all stainless steel",
      "Clean mirrors",
      "Vacuum floors & clean tracks",
    ],
  },
  {
    id: "bin-area",
    name: "Bin Area",
    tasks: ["Sweep or blow", "Collect rubbish on the floor", "Clean water wash spills, if any"],
  },
  {
    id: "externals",
    name: "Externals",
    tasks: ["Collect rubbish from garden beds & externals"],
  },
  {
    id: "report-to-body-corporate",
    name: "Report to Body Corporate",
    tasks: ["Report any issues like graffiti/defect light bulb, damage...etc (upon detection)"],
  },
  {
    id: "car-park",
    name: "Car Park (both levels)",
    tasks: [
      "Collect rubbish, leaves & debris",
      "Sweep ONLY edges along walls & columns",
      "Sweep & mop lift landing",
      "Remove cobwebs upon detection in the common areas of the car park",
    ],
  },
];
