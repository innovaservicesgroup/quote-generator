// "Housekeeping Services Agreement - Over $50k" — verbatim from
// Innova's Word template, built for Sky Broadwater Apartments. Kept
// client-specific per Coraline's instruction (not genericized).
//
// Unlike the other templates, the Departures / Mid-Stay checklists are
// always fully included (not toggleable) — only the room-rate pricing
// and reference schedule terms vary per quote.

export interface HousekeepingSection {
  id: string;
  name: string;
  tasks: string[];
}

export const HOUSEKEEPING_DEPARTURES_SECTIONS: HousekeepingSection[] = [
  {
    id: "kitchen-living",
    name: "Kitchen & living areas",
    tasks: [
      "Enter room, open curtains & turn on lights",
      "Fridge: refill ice tray, wipe out fridge & fridge door seal, thermostat to be set on hotel standard (departure only) & dust top & sides of fridge. Note: we do not defrost fridges due to the time it takes to do so; the team will advise the Maintenance team that it requires attention.",
      "Take sheets off bed and leave bed to air.",
      "Remove linen to collection point.",
      "Remove rubbish, clean rubbish bin & replace liner (leave spare liner at bottom)",
      "Wash all room glassware/crockery/cutlery etc. and return to cupboards/drawers. Return any items that are not part of the room inventory to collection point (common kitchen), replace tea, coffee, milk & other items",
      "Clean microwave, stove & ovens inside & out (include foil in all ovens)",
      "Empty kettle & toaster & wipe over, return to cupboard, clean any other",
      "Clean coffee table & chairs, dust cupboard, bench, TV, bed head, mirrors, wall frames & air vents & all other surfaces",
      "Replace all consumables ensuring they are in their correct positions",
      "Dust off all skirting boards, door architraves, windowsills, ceiling fans, behind appliances & TV, vacuum behind & beside the fridge as required",
      "Disinfect telephone, remote controls, intercom & all door handles",
      "Replace any hotel in-room supplies or advertising materials as required",
      "Spot clean inside, outside (where possible) windows",
      "Spot clean any stains on carpets or furniture",
      "Spot clean any marks, stains, dirt on walls, door (internal), light switches & skirting boards as required.",
      "Detailed vacuum all floors",
      "Detailed mop all floors (microfiber flat mop)",
      "Remove cobwebs as required",
      "Ensure balconies are swept & mopped & outdoor furniture wiped over along with railings",
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    tasks: [
      "Make the beds using fresh linen, change mattress protector when required",
      "Check all lights are working",
      "Ensure all switches are on behind the beds & that the heating & air conditioning units are switched off (departure only)",
      "Wipe down table, chairs, benches & lamp tables",
      "Check & dust drawers & wardrobe, ensure that the coat hangers are tidy",
      "All telephone books are to be neat & tidy & dust free",
      "Clean mirror & dust ledges & skirting boards",
      "Clean around door handles & light switches",
      "Dust lamp shades & globes -- the lamp shade seam faces back",
      "Dust pictures, ceiling fans & air-conditioning vents",
      "Spot clean windows / squeegee if required",
      "Ensure curtains are correctly hooked; if not report to Maintenance for attention.",
      "Vacuum the floor to constant pattern up to edges",
      "Ensure a quick check that all lights are switched off, everything is neat & tidy, and bedspreads are straight & level with the carpet on entry side. Replace all guest consumables & supplies as required",
      "Lost property procedure to be followed (departure only)",
      "Spray deodorizer & close door",
    ],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    tasks: [
      "Remove rubbish",
      "Replace dirty towels with clean towels (or following Hotel Management experience)",
      "Clean & dry shower & bath",
      "Clean & dry bath tube/spa",
      "Clean & disinfect toilet bowl inside & out",
      "Clean benches, basins & plugs",
      "Clean & polish mirror & glass",
      "Clean & polish chrome surfaces & tapware",
      "Dust vertical surfaces",
      "Dust ceiling vents",
      "Replace all amenities",
      "Clean & vacuum floor",
      "Spot clean walls & doors",
      "Deodorize",
    ],
  },
  {
    id: "laundry",
    name: "Laundry",
    tasks: [
      "Clean top, side & doors of washing machine & dryer",
      "Clean dryer's filter",
      "Dust walls",
      "General touch-up",
      "Replenish consumables",
      "Vacuum & mop floor",
    ],
  },
  {
    id: "balcony",
    name: "Balcony",
    tasks: [
      "Spot clean balustrade glass",
      "Wipe outdoor furniture",
      "Vacuum or sweep all floors",
      "Mop all floors",
    ],
  },
  {
    id: "for-arrivals",
    name: "For arrivals",
    tasks: [
      "Lights switched on",
      "Radio on",
      "Air-con on",
      "Check list by Housekeeping Manager / Sky Broadwater Apartments Management",
    ],
  },
];

export const HOUSEKEEPING_MIDSTAY_SECTIONS: HousekeepingSection[] = [
  {
    id: "kitchen",
    name: "Kitchen",
    tasks: [
      "Remove rubbish to a collection point. Replace bin liners as required",
      "Place all dishes in dishwasher, turn on if full",
      "Wipe over kitchen bench & sink",
      "Clean internal microwave",
      "Wipe only internal oven",
      "Wipe all front cupboards & drawers",
    ],
  },
  {
    id: "living-areas",
    name: "Living areas",
    tasks: ["Touch up wipe furniture", "Re-arrange furniture"],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    tasks: [
      "Replace soiled towels with clean towels",
      "Clean toilet & wipe over vanity",
      "Replace amenities & remove rubbish",
      "Do not remove or reposition guest belongings",
      "Touch up clean shower, shower screen & bath tube/spa",
      "Deodorize",
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    tasks: ["Make the beds using fresh linen"],
  },
  {
    id: "floors",
    name: "Floors",
    tasks: ["Spot vacuum all floors & mop tiled area (microfibre flat mop)"],
  },
];

export const HOUSEKEEPING_ROOM_TYPES = [
  "Studio",
  "1 bedroom + 1 bath",
  "2 bedroom + 1 bath",
  "2 bedroom + 2 bath",
  "3 bedroom + 1 bath",
  "3 bedroom + 2 bath",
  "Common area",
];

// Fixed rows from the master template — not editable via the wizard.
export const HOUSEKEEPING_ADDITIONAL_SERVICES = [
  { service: "Emergency Call Out", frequency: "Refer to Annexure A", charge: "" },
  { service: "Out of Hours", frequency: "Refer to Annexure A", charge: "" },
  { service: "Spring Cleaning", frequency: "TBC", charge: "TBC" },
  { service: "Common Areas", frequency: "TBC", charge: "TBC" },
];

export const HOUSEKEEPING_CONSUMABLES = [
  { product: "Hotel Amenity Products", quantity: "TBC", qtyPerCarton: "TBC" },
  { product: "Common Area Consumables", quantity: "TBC", qtyPerCarton: "TBC" },
];
