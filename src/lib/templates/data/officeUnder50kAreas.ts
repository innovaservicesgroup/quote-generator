import { DutyArea } from "../shared/types";

// "Office - Under $50k" — a smaller-scope variant of the Office
// template, verbatim from Innova's Word template.
export const OFFICE_UNDER_50K_AREAS: Omit<DutyArea, "frequency" | "included">[] = [
  {
    id: "main-entrance",
    name: "Main Entrance",
    tasks: [
      "Front entrance swept clean and litter removed",
      "Thoroughly clean glass entrance doors",
      "Vacuum door mats, if applicable",
    ],
  },
  {
    id: "internal-windows-partition",
    name: "Internal Windows & partition glass",
    tasks: ["Remove fingerprints & other marks"],
  },
  {
    id: "reception",
    name: "Reception / Waiting Area",
    tasks: [
      "Wipe reception desk & counter tops (we do not move paper/belongings on desks)",
      "Wipe all horizontal surfaces, chairs, tables, picture frames, aircon vents & fixtures",
      "Re-arrange magazines",
    ],
  },
  {
    id: "office-equipment",
    name: "Office Equipment",
    tasks: ["Wipe with microfibre cloth all office equipment"],
  },
  {
    id: "office-meeting-boardroom",
    name: "Office, meeting & boardroom, common area, service room...etc",
    tasks: [
      "Wipe or dust, with microfibre cloth, all furniture including desks, chairs, computer tables, telephone tables, bookshelves with or without glass doors, pictures, maps, telephones, top of monitors, lamps and other common things found in an office environment.",
      "Remove any marks or fingerprints from all entrance glass and stainless-steel doors and windows including PAV entrances, walls, doors, door frames, windows and window frames, glass desk protectors and partitions.",
      "Dust: doors, jambs, ledges, sills and skirting boards",
      "Remove cobwebs upon detection & vacuum exhaust fans and vents",
    ],
  },
  {
    id: "lift",
    name: "Lift",
    tasks: [
      "Thoroughly clean all internal walls",
      "Polish all stainless steel",
      "Clean mirrors",
      "Vacuum floors & clean tracks",
      "Detail mop",
    ],
  },
  {
    id: "rubbish-bins",
    name: "Rubbish and Bins",
    tasks: [
      "Empty all bins, replace bin liners",
      "Bins: wipe or wash if necessary",
      "Remove all bags & rubbish to designated rubbish area",
      "NOTE: Boxes, documents, paper & items left near the bins will be thrown away ONLY IF THEY ARE CLEARLY MARKED AS RUBBISH.",
    ],
  },
  {
    id: "kitchenette",
    name: "Kitchenette / Tearoom",
    tasks: [
      "Clean and polish stainless steel sinks & drainer",
      "Wipe all tables, benches & chairs with a microfibre cloth",
      "Wipe down cabinet front, vending machines, around coffee making areas, kettle, toaster, glass canisters and kitchen equipment.",
      "Remove marks and spots from doors, cupboards, and tile walls. Check for spills",
      "Microwave: clean interior and exterior",
      "Wipe refrigerator exterior",
      "Wash dishes left on sink",
    ],
  },
  {
    id: "toilets-bathrooms",
    name: "Toilets / Bathrooms",
    tasks: [
      "Clean and disinfect toilet pans, seats, cisterns, lids, pipes, doors, door handles, basins, dryers, and all dispensers.",
      "Remove calcium and mould build up around taps",
      "Polish all tapware, chrome & stainless-steel surfaces",
      "Tile walls: spot clean, paying attention to under hand dryers",
      "Wipe front of vanity cupboards",
      "Mirrors: clean and shine",
      "Refill all consumables",
    ],
  },
  {
    id: "showers",
    name: "Showers",
    tasks: [
      "Shower stalls: clean and disinfect to be free of deposits, stains, and soap scum.",
      "Shower doors/curtains: clean and disinfect to be free of deposits, stains, and soap scum.",
      "Shower mats to be cleaned and disinfected to be free of deposits, stains, and soap scum. Shower mats shall be maintained to be mould and mildew free.",
    ],
  },
  {
    id: "carpeted-floors",
    name: "Carpeted Floors",
    tasks: [
      "Detail vacuum all rugs, carpet, runners, and carpet protectors so that they are free from dust, dirt, mud, etc.",
    ],
  },
  {
    id: "hard-floors",
    name: "Hard Floors",
    tasks: [
      "Vacuum thoroughly",
      "Damp mopping of areas such as tile, linoleum, marble floors, staircases and public areas.",
    ],
  },
];

export const OFFICE_UNDER_50K_EXCLUSIONS = [
  "All keyboards",
  "All internal/external windows",
  "Carpet shampoo",
  "Power scrub hard floors",
];
