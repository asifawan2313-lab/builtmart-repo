// DEMO DATA: sample values for UI only. Not real providers, ratings or verification.

export const labourAreas = ["Demo Area A", "Demo Area B", "Demo Area C", "Demo Area D"];

export const labourCategories = [
  { slug: "painting", name: "Painting", image: null },
  { slug: "plumbing", name: "Plumbing", image: null },
  { slug: "electrical-work", name: "Electrical Work", image: null },
  { slug: "masonry", name: "Masonry", image: null },
  { slug: "tiles-installation", name: "Tiles Installation", image: null },
  { slug: "carpenter-work", name: "Carpenter Work", image: null },
  { slug: "steel-work", name: "Steel Work", image: null },
  { slug: "welding", name: "Welding", image: null },
  { slug: "roof-work", name: "Roof Work", image: null },
  { slug: "general-construction", name: "General Construction", image: null },
  { slug: "other", name: "Other", image: null },
];

export const labourProviders = [
  { id: 1, name: "Demo Painter A", category: "Painting", skills: ["Wall painting", "Polish"], experience: 5, areas: ["Demo Area A", "Demo Area B"], verification: "Verified (demo)", rating: 4.5, reviews: 8, availability: "Available", trending: true },
  { id: 2, name: "Demo Plumber A", category: "Plumbing", skills: ["Pipe fitting", "Leak repair"], experience: 8, areas: ["Demo Area B", "Demo Area C"], verification: "Verified (demo)", rating: 4.2, reviews: 12, availability: "Available", trending: true },
  { id: 3, name: "Demo Electrician A", category: "Electrical Work", skills: ["Wiring", "Fault finding"], experience: 6, areas: ["Demo Area C"], verification: "Pending Verification", rating: null, reviews: 0, availability: "Busy this week", trending: false },
  { id: 4, name: "Demo Mason A", category: "Masonry", skills: ["Brick work", "Plaster"], experience: 10, areas: ["Demo Area A", "Demo Area D"], verification: "Verified (demo)", rating: 4.7, reviews: 15, availability: "Available", trending: true },
  { id: 5, name: "Demo Tiles Installer A", category: "Tiles Installation", skills: ["Floor tiles", "Grouting"], experience: 4, areas: ["Demo Area B"], verification: "Verified (demo)", rating: 4.0, reviews: 5, availability: "Available", trending: false },
  { id: 6, name: "Demo Carpenter A", category: "Carpenter Work", skills: ["Doors", "Cupboards"], experience: 7, areas: ["Demo Area A", "Demo Area C"], verification: "Pending Verification", rating: null, reviews: 0, availability: "Available", trending: true },
  { id: 7, name: "Demo Welder A", category: "Welding", skills: ["Gate repair", "Frames"], experience: 9, areas: ["Demo Area D"], verification: "Verified (demo)", rating: 4.4, reviews: 9, availability: "Busy this week", trending: false },
  { id: 8, name: "Demo Roof Worker A", category: "Roof Work", skills: ["Waterproofing", "Slab work"], experience: 3, areas: ["Demo Area B", "Demo Area D"], verification: "Verified (demo)", rating: 3.9, reviews: 4, availability: "Available", trending: true },
];