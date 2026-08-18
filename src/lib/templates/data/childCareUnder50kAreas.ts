import { DutyAreaTemplate } from "../shared/types";

// "Standard Child Care - Under $50k" — verbatim from Innova's Word
// template. Genuinely different wording/area grouping from the Over
// $50k version, not just a smaller copy.
export const CHILD_CARE_UNDER_50K_AREAS: DutyAreaTemplate[] = [
  {
    id: "entrance-area",
    name: "Entrance Area",
    tasks: [
      "Sweep the front entrance, remove litter, spot mop if necessary",
      "Clean glass entrance doors both side",
      "Clean balustrades glass if any",
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
    id: "office-staff-quarters",
    name: "Office staff, laundry, kitchenette, staff toilets, break-out room",
    tasks: [
      "Clean benches, including sink",
      "Clean all front external cupboards & fridge",
      "Wipe all tables & chairs",
      "Clean internal microwave",
    ],
  },
  {
    id: "reception-area",
    name: "Reception Area",
    tasks: [
      "Wipe all horizontal surfaces",
      "Clean counter face of the reception desk",
      "Wipe all office equipment",
      "Wipe/dust skirtings, window sills, top of picture frames, all shelving's...etc",
      "Clean both side of the main glass doors & nearby panel glasses",
    ],
  },
  {
    id: "rubbish-bins",
    name: "Rubbish and Bins",
    tasks: [
      "Empty garbage containers",
      "Supply and replace bin liners",
      "Empty waste paper bins into recycle bin",
      "Bins: wipe or wash if necessary",
      "Remove rubbish from site",
      "NOTE: Boxes, documents, paper & items left near the bins will be thrown away ONLY IF THEY ARE CLEARLY MARKED AS RUBBISH.",
    ],
  },
  {
    id: "kids-rooms",
    name: "Kid's rooms",
    tasks: [
      "Wipe high shelves (staff use)",
      "Walls: remove main marks & fingerprints on rotation",
      "Remove cobwebs upon detection",
      "Clean ceiling fans on a rotation basis",
    ],
  },
  {
    id: "toilets-staff-kids",
    name: "Toilets (staff & kids)",
    tasks: [
      "Full clean, sanitise & disinfect toilet pans, seats, lids, chrome fittings, pipes, doors, door handles, basins, dryer and dispensers",
      "Remove calcium and mould build up around taps",
      "Wipe and disinfect toilet cisterns",
      "Tile walls: spot clean",
      "Vanity cupboards: clean and polish",
      "Mirrors: clean and shine",
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
    name: "Lift (if any)",
    tasks: ["Clean lift: internal/external panels, floor & tracks"],
  },
  {
    id: "external",
    name: "External",
    tasks: [
      "Clean stainless-steel outdoor water fountain",
      "Clean outdoor sink",
      "Sweep Bin area",
      "Remove litter in the carpark",
    ],
  },
];

export const CHILD_CARE_UNDER_50K_EXCLUSIONS = [
  "External playground games & equipment",
  "External windows other than kid's rooms",
  "All kid's furniture & toys",
  "Any high-pressure work",
  "Carpet & mat steam cleaning",
  "Any steam cleaning",
];

export const CHILD_CARE_UNDER_50K_DEFAULT_COVERAGE = [
  "Offices/administration",
  "Reception",
  "Staff rooms",
  "All rooms & common areas",
  "All toilets (staff & kids)",
  "Externals",
];
