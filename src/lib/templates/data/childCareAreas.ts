import { DutyAreaTemplate } from "../shared/types";

// "Standard Child Care - Over $50k" — verbatim from Innova's Word template.
export const CHILD_CARE_AREAS: DutyAreaTemplate[] = [
  {
    id: "entrance-area",
    name: "Entrance Area",
    tasks: [
      "Front entrance swept clean and litter, dirt and grime removed.",
      "Thoroughly clean glass entrance doors",
    ],
  },
  {
    id: "glass-partitions-windows",
    name: "Glass Partitions and Internal Windows",
    tasks: [
      "Squeegee clean all windows, glass doors & partition glass on a rotation basis except external windows other than kid's rooms & front entrance",
      "Clean tracks on a rotation basis",
    ],
  },
  {
    id: "staff-quarters",
    name: "Staff Quarters: laundry, kitchenette, toilets, break-out room",
    tasks: [
      "Clean benches, including sink",
      "Clean all front external cupboards & fridge",
      "Wipe all tables & chairs",
      "Clean internal microwave",
      "Commercial kitchen: Floor only",
    ],
  },
  {
    id: "office-reception",
    name: "Office & Reception Area",
    tasks: [
      "Wipe and sanitise telephone handset thoroughly",
      "Remove dust from office equipment, furniture using a damp cloth",
    ],
  },
  {
    id: "rubbish-bins",
    name: "Rubbish and Bins",
    tasks: [
      "Empty garbage containers",
      "Supply and replace bin liners",
      "Empty wastepaper bins into recycle bin",
      "Bins: wipe or wash if necessary",
      "Remove rubbish from site",
      "NOTE: Boxes, documents, paper & items left near the bins will be thrown away ONLY IF THEY ARE CLEARLY MARKED AS RUBBISH.",
    ],
  },
  {
    id: "general",
    name: "General",
    tasks: [
      "Counter tops and other horizontal surfaces",
      "Walls: remove all marks & fingerprints",
      "Remove cobwebs upon detection",
      "Clean ceiling fans on a rotation basis",
    ],
  },
  {
    id: "toilets-staff-kids",
    name: "Toilets (staff & kids)",
    tasks: [
      "Full clean, sanitize & disinfect toilet pans, seats, lids, chrome fittings, pipes, doors, door handles, basins, dryer and dispensers",
      "Remove calcium and mould build up around taps",
      "Wipe and disinfect toilet cisterns",
      "Tile walls: spot clean",
      "Vanity cupboards: clean and polish",
      "Mirrors: clean and shine",
      "Pour biological cleaner down the drains",
    ],
  },
  {
    id: "carpeted-floors-mats",
    name: "Carpeted Floors & Mats",
    tasks: ["Vacuum thoroughly", "Vacuum corners, edges and underneath furniture"],
  },
  {
    id: "internal-hard-floors",
    name: "Internal Hard Floors (including balcony)",
    tasks: ["Vacuum thoroughly", "Spot clean marks, scuffs, stains, and spills", "Full & detailed mop"],
  },
  {
    id: "lift",
    name: "Lift",
    tasks: ["Clean lift: internal/external panels, floor & tracks"],
  },
  {
    id: "external",
    name: "External",
    tasks: [
      "Clean stainless-steel outdoor water fountain",
      "Clean outdoor sink",
      "Sweep Bin area",
      "Air blow front carpark & playground area",
      "I-mop or rotobrush external tiled area",
    ],
  },
];

export const CHILD_CARE_EXCLUSIONS = [
  "External playground games & equipment",
  "External windows other than kid's rooms",
  "All kid's furniture & toys",
  "Any high-pressure work",
  "Carpet & mat steam cleaning",
  "Any steam cleaning",
];

export const CHILD_CARE_DEFAULT_COVERAGE = [
  "Offices/administration",
  "Reception",
  "Staff rooms",
  "All rooms & common areas",
  "All toilets (staff & kids)",
  "Externals",
];
