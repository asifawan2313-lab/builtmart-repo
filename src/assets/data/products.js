// Static demo data (frontend only). Every record uses the same fields as the ProductCard.
// Images go in: public/images/products/  (one image per material type is enough)
// To add a product later: copy one block below, give it a NEW id, and change the values.

const products = [
  { id: 1, name: "Portland Cement 50kg", category: "Cement", price: 1450, unit: "bag", shop: "Al-Rehman Building Materials", location: "Gujranwala City", quality: "New", inStock: true, image: "/images/products/cement.jpg" },
  { id: 2, name: "Bestway OPC Cement 50kg", category: "Cement", price: 1380, unit: "bag", shop: "Wazirabad Traders", location: "GT Road", quality: "New", inStock: true, image: "/images/products/cement.jpg" },
  { id: 3, name: "Used Cement Bags (50kg)", category: "Cement", price: 950, unit: "bag", shop: "Rebuild Materials", location: "Satellite Town", quality: "Reused", inStock: true, image: "/images/products/cement.jpg" },
  { id: 4, name: "Steel Rebar Grade 60 (12mm)", category: "Steel", price: 285000, unit: "ton", shop: "Shahid Steel Traders", location: "Sialkot Road", quality: "New", inStock: true, image: "/images/products/steel.jpg" },
  { id: 5, name: "Steel Rebar Grade 40 (10mm)", category: "Steel", price: 268000, unit: "ton", shop: "Ghakhar Iron Store", location: "Ghakhar Mandi", quality: "New", inStock: false, image: "/images/products/steel.jpg" },
  { id: 6, name: "Red Clay Bricks (First Class)", category: "Bricks", price: 14000, unit: "1000 pcs", shop: "Model Town Brick Kiln", location: "Model Town", quality: "New", inStock: true, image: "/images/products/bricks.jpg" },
  { id: 7, name: "Reused Bricks (Cleaned)", category: "Bricks", price: 8500, unit: "1000 pcs", shop: "Green Earth Materials", location: "Garden Town", quality: "Reused", inStock: true, image: "/images/products/bricks.jpg" },
  { id: 8, name: "Chenab Sand (Rait)", category: "Sand", price: 5200, unit: "100 cft", shop: "Chenab Sand Supply", location: "Wapda Town", quality: "New", inStock: true, image: "/images/products/sand.jpg" },
  { id: 9, name: "Ravi Sand (Fine)", category: "Sand", price: 4600, unit: "100 cft", shop: "Rahwali Sand Depot", location: "Rahwali", quality: "New", inStock: true, image: "/images/products/sand.jpg" },
  { id: 10, name: "Crush Stone (Margalla)", category: "Crush", price: 7800, unit: "100 cft", shop: "Sargodha Crush Traders", location: "Hafizabad Road", quality: "New", inStock: true, image: "/images/products/crush.jpg" },
  { id: 11, name: "Crush 3/4 inch (Bajri)", category: "Crush", price: 7200, unit: "100 cft", shop: "Eminabad Crush House", location: "Eminabad", quality: "New", inStock: false, image: "/images/products/crush.jpg" },
  { id: 12, name: "Floor Tiles 2x2 ft (Matt)", category: "Tiles", price: 1250, unit: "sq m", shop: "Citi Tiles Gallery", location: "Citi Housing", quality: "New", inStock: true, image: "/images/products/tiles.jpg" },
  { id: 13, name: "Wall Tiles 1x2 ft (Glossy)", category: "Tiles", price: 980, unit: "sq m", shop: "Peoples Tile Store", location: "Peoples Colony", quality: "New", inStock: true, image: "/images/products/tiles.jpg" },
  { id: 14, name: "Italian White Marble", category: "Marble", price: 3200, unit: "sq ft", shop: "Marble Palace", location: "Civil Lines", quality: "New", inStock: true, image: "/images/products/marble.jpg" },
  { id: 15, name: "Zebra Black Marble", category: "Marble", price: 2400, unit: "sq ft", shop: "Royal Marble House", location: "DC Colony", quality: "New", inStock: true, image: "/images/products/marble.jpg" },
  { id: 16, name: "Weather Shield Paint 4L", category: "Paint", price: 4800, unit: "bucket", shop: "Color World", location: "Nowshera Road", quality: "New", inStock: true, image: "/images/products/paint.jpg" },
  { id: 17, name: "Emulsion Paint 18L", category: "Paint", price: 15500, unit: "bucket", shop: "Satellite Paint Centre", location: "Satellite Town", quality: "New", inStock: true, image: "/images/products/paint.jpg" },
  { id: 18, name: "PVC Pipe 4 inch (Class B)", category: "Pipes", price: 2200, unit: "length", shop: "Kangniwala Pipe Store", location: "Kangniwala", quality: "New", inStock: true, image: "/images/products/pipes.jpg" },
  { id: 19, name: "CPVC Pipe 1 inch", category: "Pipes", price: 1100, unit: "length", shop: "Gondlanwala Sanitary", location: "Gondlanwala Road", quality: "New", inStock: true, image: "/images/products/pipes.jpg" },
  { id: 20, name: "Bathroom Mixer and Fittings Set", category: "Plumbing Materials", price: 6500, unit: "set", shop: "Aroop Sanitary Store", location: "Aroop", quality: "New", inStock: true, image: "/images/products/plumbing.jpg" },
];

export default products;