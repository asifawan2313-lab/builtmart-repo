// DEMO DATA: naam, price, suppliers aur specs sirf UI ke liye hain
import doorsWindows from "../../../assets/images/guest/card/doorsWindows.jpg";
import electrical from "../../../assets/images/guest/card/copperwire.jpg";
import steelWelding from "../../../assets/images/guest/card/steelSaria.jpg";
import interiorDesign from "../../../assets/images/guest/card/ceiling.jpg";
import metalAluminum from "../../../assets/images/guest/card/grills.jpg";
import paintsFinishes from "../../../assets/images/guest/card/paint.jpg";
import architectural from "../../../assets/images/guest/card/tiles.jpg";
import usedBricks from "../../../assets/images/guest/card/briks.jpg";
import sandImage from "../../../assets/images/guest/card/sand.jpg";
import glassWindow from "../../../assets/images/guest/card/window.jpg";
import secWindow from "../../../assets/images/guest/card/secwindow.jpg";

export const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Ek product banane ka chhota helper (gallery optional)
const make = (name, price, supplier, location, image, availability, description, specs, gallery) => ({
  name,
  price,
  supplier,
  location,
  image,
  availability,
  description: `${description} Sample listing for demonstration.`,
  specs,
  ...(gallery && { gallery }),
});

// reused: true = Reused Materials ki category. tags: suppliers ke tags se milte hain
export const categoryList = [
  /* ---------- New materials ---------- */
  {
    name: "Doors & Windows",
    tags: [],
    products: [
      make("Wooden Door (Deodar)", "From Rs 18,000", "Al-Noor Building Store", "GT Road", doorsWindows, "In stock (demo)",
        "Solid deodar wood door suitable for main entrances and room doors.",
        [["Material", "Deodar wood"], ["Finish", "Natural polish"], ["Unit", "Per door"]]),
    ],
  },
  { name: "Construction Chemicals", tags: [], products: [] },
  {
    name: "Electrical & Lighting",
    tags: [],
    products: [
      make("Copper Electrical Wire", "From Rs 3,200", "Rana Construction Supply", "Peoples Colony", electrical, "In stock (demo)",
        "Copper core insulated wire for house wiring.",
        [["Conductor", "Copper"], ["Insulation", "PVC"], ["Unit", "Per coil"]]),
    ],
  },
  {
    name: "Steel & Welding",
    tags: ["Steel"],
    products: [
      make("Steel Saria Grade 60", "From Rs 265 / kg", "Zahid Construction Materials", "Peoples Colony", steelWelding, "In stock (demo)",
        "Deformed steel bars used for reinforcement in columns, beams and slabs.",
        [["Grade", "60"], ["Sizes", "8mm to 25mm"], ["Unit", "Per kg"]]),
      make("Custom Steel Main Gate", "From Rs 1,500 / sq ft", "City Material Traders", "Satellite Town", metalAluminum, "Made to order (demo)",
        "Fabricated steel gate made to your size and design.",
        [["Material", "Mild steel"], ["Finish", "Primer and paint"], ["Unit", "Per sq ft"]],
        [metalAluminum, steelWelding]),
    ],
  },
  {
    name: "Interior Design",
    tags: [],
    products: [
      make("False Ceiling Panels", "Contact for price", "Al-Noor Building Store", "GT Road", interiorDesign, "Contact supplier",
        "Decorative false ceiling panels for rooms and halls.",
        [["Type", "Gypsum / PVC"], ["Use", "Interior ceilings"], ["Unit", "Per sq ft"]]),
    ],
  },
  { name: "Furniture & Fixtures", tags: [], products: [] },
  { name: "Solar Energy & Renewable Energy", tags: [], products: [] },
  {
    name: "Metal & Aluminum Works",
    tags: [],
    products: [
      make("Steel Grills & Gates", "Contact for price", "Zahid Construction Materials", "Peoples Colony", metalAluminum, "Made to order (demo)",
        "Window grills and gates fabricated to measurement.",
        [["Material", "Steel"], ["Finish", "Painted"], ["Unit", "Per sq ft"]],
        [metalAluminum, steelWelding]),
    ],
  },
  {
    name: "Paints & Finishes",
    tags: ["Paints"],
    products: [
      make("Gold Emulsion Paint", "From Rs 7,800 / bucket", "Modern Builders Mart", "Satellite Town", paintsFinishes, "In stock (demo)",
        "Smooth emulsion paint for interior walls.",
        [["Type", "Emulsion"], ["Pack", "4 litre bucket"], ["Use", "Interior"]]),
      make("Weather Shield Paint", "From Rs 9,500 / bucket", "Punjab Building Materials", "GT Road", paintsFinishes, "In stock (demo)",
        "Weather resistant paint for exterior walls.",
        [["Type", "Exterior emulsion"], ["Pack", "16 litre bucket"], ["Use", "Exterior"]]),
    ],
  },
  { name: "Woodworks", tags: [], products: [] },
  {
    name: "Architectural Products",
    tags: ["Tiles", "Marble"],
    products: [
      make("Porcelain Floor Tiles", "From Rs 95 / sq ft", "Punjab Building Materials", "GT Road", architectural, "In stock (demo)",
        "Durable porcelain tiles for floors.",
        [["Size", "2 x 2 ft"], ["Finish", "Matt"], ["Unit", "Per sq ft"]]),
      make("Wall Tiles (Glossy)", "From Rs 95 / sq ft", "Modern Builders Mart", "Satellite Town", architectural, "In stock (demo)",
        "Glossy ceramic tiles for kitchen and bathroom walls.",
        [["Size", "1 x 2 ft"], ["Finish", "Glossy"], ["Unit", "Per sq ft"]]),
    ],
  },
  { name: "Kitchen & Wardrobes", tags: [], products: [] },
  { name: "Construction Site Equipment", tags: [], products: [] },
  { name: "Demolition & Excavation", tags: [], products: [] },
  {
    name: "Bricks & Blocks",
    tags: ["Bricks"],
    products: [
      make("Red Clay Bricks (A-Class)", "From Rs 16,500 / 1,000", "Al-Noor Building Store", "GT Road", usedBricks, "In stock (demo)",
        "First class red clay bricks for walls and foundations.",
        [["Class", "A"], ["Material", "Clay"], ["Unit", "Per 1,000 bricks"]]),
    ],
  },
  {
    name: "Sand & Crush",
    tags: ["Sand"],
    products: [
      make("Ravi Sand (Rait)", "From Rs 9,000 / trolley", "City Material Traders", "Satellite Town", sandImage, "Limited stock (demo)",
        "Ravi sand for plaster and concrete work.",
        [["Type", "Ravi sand"], ["Use", "Plaster, concrete"], ["Unit", "Per trolley"]]),
      make("Chenab Sand", "From Rs 8,500 / trolley", "Modern Builders Mart", "Satellite Town", sandImage, "In stock (demo)",
        "Chenab sand for masonry and filling.",
        [["Type", "Chenab sand"], ["Use", "Masonry, filling"], ["Unit", "Per trolley"]]),
    ],
  },
  {
    name: "Glass & Glazing",
    tags: [],
    products: [
      make("Tempered Glass Window", "From Rs 450 / sq ft", "Ali & Sons Traders", "Model Town", glassWindow, "In stock (demo)",
        "Toughened glass panels for windows and facades.",
        [["Type", "Tempered"], ["Thickness", "8mm"], ["Unit", "Per sq ft"]]),
    ],
  },
  {
    name: "Aluminium Windows",
    tags: [],
    products: [
      make("Aluminium Sliding Window", "Contact for price", "Rehman Builders Supply", "Model Town", secWindow, "Made to order (demo)",
        "Sliding aluminium window made to measurement.",
        [["Frame", "Aluminium"], ["Type", "Sliding"], ["Unit", "Per sq ft"]]),
    ],
  },
  { name: "Cement", tags: ["Cement"], products: [] },
  { name: "Plumbing & Pipes", tags: ["Pipes"], products: [] },
  { name: "Roofing Materials", tags: [], products: [] },

  /* ---------- Reused materials ---------- */
  {
    name: "Used Bricks", reused: true, tags: ["Bricks"],
    products: [
      make("Leftover Red Bricks", "From Rs 9,000 / 1,000", "Al-Noor Building Store", "GT Road", usedBricks, "Good condition (demo)",
        "Leftover red bricks from a finished project.",
        [["Condition", "Good"], ["Material", "Clay"], ["Unit", "Per 1,000 bricks"]]),
    ],
  },
  {
    name: "Reused Steel", reused: true, tags: ["Steel"],
    products: [
      make("Used Steel Rods", "From Rs 180 / kg", "Zahid Construction Materials", "Peoples Colony", steelWelding, "Good condition (demo)",
        "Reusable steel rods from demolished structures.",
        [["Condition", "Good"], ["Grade", "40 / 60"], ["Unit", "Per kg"]]),
    ],
  },
  { name: "Leftover Cement", reused: true, tags: ["Cement"], products: [] },
  {
    name: "Used Tiles", reused: true, tags: ["Tiles"],
    products: [
      make("Used Floor Tiles", "From Rs 60 / sq ft", "Punjab Building Materials", "GT Road", architectural, "Like new (demo)",
        "Lightly used floor tiles.",
        [["Condition", "Like new"], ["Size", "2 x 2 ft"], ["Unit", "Per sq ft"]]),
    ],
  },
  { name: "Reusable Wood", reused: true, tags: [], products: [] },
  {
    name: "Used Doors & Windows", reused: true, tags: [],
    products: [
      make("Used Door Frame (Deodar)", "From Rs 6,500", "Al-Noor Building Store", "GT Road", doorsWindows, "Used (demo)",
        "Reusable deodar door frame.",
        [["Condition", "Used"], ["Material", "Deodar wood"], ["Unit", "Per piece"]]),
    ],
  },
  { name: "Used Furniture", reused: true, tags: [], products: [] },
  { name: "Reusable Construction Equipment", reused: true, tags: [], products: [] },
  {
    name: "Leftover Sand", reused: true, tags: ["Sand"],
    products: [
      make("Leftover Ravi Sand", "From Rs 5,500 / trolley", "City Material Traders", "Satellite Town", sandImage, "Good condition (demo)",
        "Leftover sand from a finished construction site.",
        [["Condition", "Clean"], ["Type", "Ravi sand"], ["Unit", "Per trolley"]]),
    ],
  },
  {
    name: "Used Glass Windows", reused: true, tags: [],
    products: [
      make("Used Glass Window Panels", "From Rs 250 / sq ft", "Ali & Sons Traders", "Model Town", glassWindow, "Used (demo)",
        "Reusable glass window panels from renovated buildings.",
        [["Condition", "Used"], ["Type", "Glass"], ["Unit", "Per sq ft"]]),
    ],
  },
  {
    name: "Used Aluminium Windows", reused: true, tags: [],
    products: [
      make("Used Aluminium Window", "From Rs 4,500", "Rehman Builders Supply", "Model Town", secWindow, "Used (demo)",
        "Aluminium window frame in reusable condition.",
        [["Condition", "Used"], ["Frame", "Aluminium"], ["Unit", "Per piece"]]),
    ],
  },
  {
    name: "Used Grills & Gates", reused: true, tags: [],
    products: [
      make("Used Steel Gate", "From Rs 12,000", "Zahid Construction Materials", "Peoples Colony", metalAluminum, "Used (demo)",
        "Steel gate removed from a renovated house.",
        [["Condition", "Used"], ["Material", "Steel"], ["Unit", "Per piece"]]),
    ],
  },
  {
    name: "Leftover Paint", reused: true, tags: ["Paints"],
    products: [
      make("Leftover Emulsion Paint", "From Rs 3,000 / bucket", "Modern Builders Mart", "Satellite Town", paintsFinishes, "Sealed bucket (demo)",
        "Unused leftover paint from a finished project.",
        [["Condition", "Sealed"], ["Type", "Emulsion"], ["Unit", "Per bucket"]]),
    ],
  },
  {
    name: "Used Electrical Wire", reused: true, tags: [],
    products: [
      make("Used Copper Wire", "From Rs 1,800", "Rana Construction Supply", "Peoples Colony", electrical, "Used (demo)",
        "Reusable copper wire coil.",
        [["Condition", "Used"], ["Conductor", "Copper"], ["Unit", "Per coil"]]),
    ],
  },
  { name: "Used Pipes", reused: true, tags: ["Pipes"], products: [] },
  { name: "Used Sanitary Items", reused: true, tags: [], products: [] },
  {
    name: "Used Ceiling Panels", reused: true, tags: [],
    products: [
      make("Used False Ceiling Panels", "From Rs 40 / sq ft", "Al-Noor Building Store", "GT Road", interiorDesign, "Used (demo)",
        "Ceiling panels removed from a renovated hall.",
        [["Condition", "Used"], ["Type", "Gypsum / PVC"], ["Unit", "Per sq ft"]]),
    ],
  },
  { name: "Used Scaffolding", reused: true, tags: [], products: [] },
  { name: "Used Roofing Sheets", reused: true, tags: [], products: [] },
  {
    name: "Used Marble & Stone", reused: true, tags: ["Marble"],
    products: [
      make("Used Marble Slabs", "From Rs 400 / sq ft", "Zahid Construction Materials", "Peoples Colony", architectural, "Used (demo)",
        "Marble slabs from a renovated building.",
        [["Condition", "Used"], ["Material", "Marble"], ["Unit", "Per sq ft"]]),
    ],
  },
].map((c) => ({ ...c, slug: toSlug(c.name) }));

// Saare products ek list mein (har product apni category ke saath)
export const allProducts = categoryList.flatMap((c) =>
  c.products.map((p, i) => ({
    ...p,
    id: `${c.slug}-${i}`,
    slug: toSlug(p.name),
    category: c.name,
    categorySlug: c.slug,
    reused: !!c.reused,
  }))
);