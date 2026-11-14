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

const toSlug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// image null ho to card "No image" dikhata hai
const categories = [
  { id: 1, name: "Doors & Windows", image: doorsWindows },
  { id: 2, name: "Construction Chemicals", image: null },
  { id: 3, name: "Electrical & Lighting", image: electrical },
  { id: 4, name: "Steel & Welding", image: steelWelding },
  { id: 5, name: "Interior Design", image: interiorDesign },
  { id: 6, name: "Furniture & Fixtures", image: null },
  { id: 7, name: "Solar Energy & Renewable Energy", image: null },
  { id: 8, name: "Metal & Aluminum Works", image: metalAluminum },
  { id: 9, name: "Paints & Finishes", image: paintsFinishes },
  { id: 10, name: "Woodworks", image: null },
  { id: 11, name: "Architectural Products", image: architectural },
  { id: 12, name: "Kitchen & Wardrobes", image: null },
  { id: 13, name: "Construction Site Equipment", image: null },
  { id: 14, name: "Demolition & Excavation", image: null },
  { id: 15, name: "Bricks & Blocks", image: usedBricks },
  { id: 16, name: "Sand & Crush", image: sandImage },
  { id: 17, name: "Glass & Glazing", image: glassWindow },
  { id: 18, name: "Aluminium Windows", image: secWindow },
  { id: 19, name: "Plumbing & Pipes", image: null },
  { id: 20, name: "Roofing Materials", image: null },
];

const reusedCategories = [
  { id: 1, name: "Used Bricks", image: usedBricks },
  { id: 2, name: "Reused Steel", image: steelWelding },
  { id: 3, name: "Leftover Cement", image: null },
  { id: 4, name: "Used Tiles", image: architectural },
  { id: 5, name: "Reusable Wood", image: interiorDesign },
  { id: 6, name: "Used Doors & Windows", image: doorsWindows },
  { id: 7, name: "Used Furniture", image: null },
  { id: 8, name: "Reusable Construction Equipment", image: null },
  { id: 9, name: "Leftover Sand", image: sandImage },
  { id: 10, name: "Used Glass Windows", image: glassWindow },
  { id: 11, name: "Used Aluminium Windows", image: secWindow },
  { id: 12, name: "Used Grills & Gates", image: metalAluminum },
  { id: 13, name: "Leftover Paint", image: paintsFinishes },
  { id: 14, name: "Used Electrical Wire", image: electrical },
  { id: 15, name: "Used Pipes", image: null },
  { id: 16, name: "Used Sanitary Items", image: null },
  { id: 17, name: "Used Ceiling Panels", image: interiorDesign },
  { id: 18, name: "Used Scaffolding", image: null },
  { id: 19, name: "Used Roofing Sheets", image: null },
  { id: 20, name: "Used Marble & Stone", image: architectural },
];

// Har card /materials/[category] par jata hai
const withHref = (list) => list.map((c) => ({ ...c, href: `/materials/${toSlug(c.name)}` }));

export const categoryLinks = withHref(categories);
export const reusedLinks = withHref(reusedCategories);