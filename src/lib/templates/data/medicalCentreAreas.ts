import { DutyArea } from "../shared/types";

// "Medical Centre - Over $50k" — verbatim from Innova's Word template.
export const MEDICAL_CENTRE_AREAS: Omit<DutyArea, "frequency" | "included">[] = [
  {
    id: "entrance-area",
    name: "Entrance Area",
    tasks: [
      "Front entrance swept clean and litter removed",
      "Thoroughly clean glass entrance doors",
      "Vacuum door mats",
    ],
  },
  {
    id: "internal-windows",
    name: "Internal Windows",
    tasks: ["Dust clean", "Remove spots, stains, and marks", "Full clean: See periodicals"],
  },
  {
    id: "reception-waiting",
    name: "Reception/Waiting Area",
    tasks: [
      "Wipe reception desk & counter tops (we do not move paper/belongings on desks)",
      "Wipe all horizontal surfaces, chairs, tables, picture frames, aircon vents",
      "Remove spots, stains and marks",
      "Weekly: sanitize & clean chairs",
      "Re-arrange magazines",
    ],
  },
  {
    id: "consultation-rooms",
    name: "Consultation, Treatment, Pathology & Procedure Rooms",
    tasks: [
      "Wipe all horizontal surfaces, bench, desk, high railing & chairs",
      "Wipe and sanitise sink",
      "Wipe under examination couches",
      "All high-touch areas in the room including tabletops, bedside tabletop and inner drawer, phone and cradle, armchairs, door and cabinet handles, light switches, closet handles, etc.",
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
    id: "kitchenette",
    name: "Kitchenette/Tearoom",
    tasks: [
      "Clean and polish stainless steel sinks, wipe chairs, benches and tables",
      "Wipe down cabinet tops, vending machines, around coffee making areas, kettle, toaster, glass canisters and kitchen equipment. Appliances wiped clean (external only)",
      "Remove marks and spots from doors, cupboards, and tile walls. Check for spills",
      "Microwave: clean and sanitize interior and exterior",
      "Wipe refrigerator exterior",
      "Wash dishes left on sink",
    ],
  },
  {
    id: "general-other-rooms",
    name: "General/Other Rooms",
    tasks: [
      "Spot clean fingerprints, scuff marks from walls, cupboards, light switches, and surrounding area of wall",
      "Dust: doors, jambs, ledges, louvers, sills, and skirting boards",
      "Clean plant pots and remove any rubbish",
      "Remove cobwebs upon detection & vacuum exhaust fans and vents",
      "Refill all consumables",
    ],
  },
  {
    id: "toilets-bathrooms",
    name: "Toilets, Bathrooms",
    tasks: [
      "Clean and disinfect toilet pans, seats, lids, urinal, taps, chrome fittings, pipes, doors, door handles, basins, dryer and dispensers",
      "Remove calcium and mould build up around taps",
      "Wipe and disinfect toilet cisterns",
      "Tile walls: spot clean, paying attention to under hand dryers",
      "Vanity cupboards: clean and polish",
      "Mirrors: clean and shine",
      "Refill all consumables",
    ],
  },
  {
    id: "carpeted-floors",
    name: "Carpeted Floors",
    tasks: [
      "Detail vacuum: vacuum corners, edges and underneath furniture",
      "Spot clean marks and spills, remove marks and stains from soft floor where possible. NOTE: Carpet shampoo not included",
    ],
  },
  {
    id: "hard-floors",
    name: "Hard Floors",
    tasks: ["Vacuum thoroughly", "Spot clean marks, scuffs, stains and spills", "Detail mop"],
  },
];

// Fixed marketing/approach content shown above the Service Coverage
// checklist on this template — not editable via the wizard.
export const MEDICAL_CENTRE_APPROACH = [
  "Clean and inviting entrance",
  "Sanitized surfaces",
  "Safe floor procedure",
  "Sanitized bathrooms",
  "Hospital grade chemicals",
  "Overall attention to detail",
  "COVID-19 - Hospital Disinfectant / TGA Approved: based on proprietary hydrogen peroxide technology (AHP®), disinfects in 1-minute, Tuberculocidal in 5 minutes (US), excellent surface safety, HMIS ratings are all zeros, kills MRSA, VRE and Norovirus, AUST R 165058",
];

export const MEDICAL_CENTRE_DEFAULT_COVERAGE = [
  "Front entrance/reception/waiting area",
  "Consultation, treatment, pathology & procedure rooms",
  "Toilets",
  "Kitchenette/staff room",
];
