// // DEMO DATA: sample blogs, sirf UI ke liye. Category, readTime aur featured demo fields hain.
// // Sirf status "Published" wale blogs public site par dikhte hain.

// export const blogCategories = [
//   "Construction Tips",
//   "Material Guides",
//   "Budget Planning",
//   "Home Design",
//   "Labour Guides",
//   "Reused Materials",
// ];

// const body = [
//   "This is a sample article. The real text will come from the admin panel.",
//   "Always compare prices and confirm stock with the supplier before you buy.",
// ];

// export const blogs = [
//   { id: 1, slug: "modern-home-design-ideas-for-your-dream-house", title: "Modern Home Design Ideas for Your Dream House", author: "BuildMart Team", category: "Home Design", keywords: [], image: null, status: "Published", featured: true, date: "2026-10-20", readTime: "5 min read", excerpt: "Discover the latest modern home design ideas that combine style, functionality and affordability in Pakistan.", content: body },
//   { id: 2, slug: "how-to-choose-the-right-cement-grade", title: "How to Choose the Right Cement Grade", author: "BuildMart Team", category: "Material Guides", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-18", readTime: "4 min read", excerpt: "Learn how to select the best cement grade for your construction needs.", content: body },
//   { id: 3, slug: "understanding-steel-in-construction", title: "Understanding Steel in Construction", author: "BuildMart Team", category: "Construction Tips", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-16", readTime: "6 min read", excerpt: "A complete guide to use steel correctly in your building project.", content: body },
//   { id: 4, slug: "reusing-materials-saves-money-and-the-planet", title: "Reusing Materials Saves Money and the Planet", author: "Maria Saeed", category: "Reused Materials", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-14", readTime: "4 min read", excerpt: "Discover how reused materials can reduce costs and help the environment.", content: body },
//   { id: 5, slug: "simple-home-design-ideas-for-every-budget", title: "Modern Home Design Ideas", author: "BuildMart Team", category: "Home Design", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-12", readTime: "3 min read", excerpt: "Simple and stylish home design ideas for every budget.", content: body },
//   { id: 6, slug: "how-to-plan-your-house-construction-budget", title: "How to Plan Your House Construction Budget", author: "BuildMart Team", category: "Budget Planning", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-10", readTime: "5 min read", excerpt: "Break your budget into grey structure, finishing and extras so nothing surprises you.", content: body },
//   { id: 7, slug: "how-to-hire-a-good-mason-or-plumber", title: "How to Hire a Good Mason or Plumber", author: "BuildMart Team", category: "Labour Guides", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-08", readTime: "4 min read", excerpt: "What to ask, what to check and how to compare bids before you hire a worker.", content: body },
//   { id: 8, slug: "five-common-construction-mistakes-to-avoid", title: "5 Common Construction Mistakes to Avoid", author: "Maria Saeed", category: "Construction Tips", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-06", readTime: "5 min read", excerpt: "Simple mistakes that increase cost and delay your project, and how to avoid them.", content: body },
//   { id: 9, slug: "choosing-tiles-for-floors-and-walls", title: "Choosing Tiles for Floors and Walls", author: "BuildMart Team", category: "Material Guides", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-04", readTime: "4 min read", excerpt: "Size, finish and price: what to look at before you order tiles.", content: body },
//   { id: 10, slug: "buying-used-bricks-what-to-check", title: "Buying Used Bricks: What to Check", author: "BuildMart Team", category: "Reused Materials", keywords: [], image: null, status: "Published", featured: false, date: "2026-10-02", readTime: "3 min read", excerpt: "How to inspect reused bricks for strength and condition before you buy.", content: body },
//   { id: 11, slug: "steel-prices-q4-2026-outlook", title: "Steel Prices: Q4 2026 Outlook", author: "BuildMart Team", category: "Material Guides", keywords: [], image: null, status: "Draft", featured: false, date: "2026-10-18", readTime: "4 min read", excerpt: "Draft article, not shown on the public site.", content: body },
// ];

// const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// // "2026-10-20" ko "Oct 20, 2026" banata hai
// export const formatDate = (iso) => {
//   const [year, month, day] = iso.split("-");
//   return `${months[Number(month) - 1]} ${day}, ${year}`;
// };







// DEMO DATA: sample blogs, sirf UI ke liye. Asli articles admin panel se aayenge.
// Sirf status "Published" wale blogs public site par dikhte hain.
// content = blocks ki list: { type: "h2" | "p" | "ul" | "tip" | "img" }
// "p" aur "ul" ke text mein **bold** likhne se bold ho jata hai.

export const blogCategories = [
  "Construction Tips",
  "Material Guides",
  "Budget Planning",
  "Home Design",
  "Labour Guides",
  "Reused Materials",
];

export const blogs = [
  {
    id: 1, slug: "modern-home-design-ideas-for-your-dream-house", title: "Modern Home Design Ideas for Your Dream House",
    author: "BuildMart Team", category: "Home Design", keywords: [], image: null, status: "Published", featured: true,
    date: "2026-10-20", readTime: "5 min read",
    excerpt: "Discover the latest modern home design ideas that combine style, functionality and affordability in Pakistan.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "A modern home mixes good looks with everyday comfort. This is a **sample article**; the real text comes from the admin panel." },
      { type: "h2", text: "Ideas to consider" },
      { type: "ul", items: ["**Open living areas** that let in more light.", "**Simple facades** with clean lines.", "**Smart storage** to keep rooms uncluttered."] },
      { type: "tip", text: "Decide your budget before you choose a design." },
    ],
  },
  {
    id: 2, slug: "how-to-choose-the-right-cement-grade", title: "How to Choose the Right Cement Grade",
    author: "BuildMart Team", category: "Material Guides", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-18", readTime: "4 min read",
    excerpt: "Learn how to select the best cement grade for your construction needs.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Choosing the right cement grade matters for the **strength and life** of your construction. This is a sample article for demonstration." },
      { type: "h2", text: "Common Cement Grades" },
      { type: "p", text: "Cement is sold in different grades. Ask your supplier which grades are available:" },
      { type: "ul", items: ["**OPC 33 Grade**: general construction.", "**OPC 43 Grade**: heavier structures.", "**OPC 53 Grade**: high-strength and special projects."] },
      { type: "tip", text: "Confirm the grade, brand and price with the supplier before you buy." },
      { type: "h2", text: "Conclusion" },
      { type: "p", text: "Match the grade to your project and buy from a trusted supplier." },
    ],
  },
  {
    id: 3, slug: "understanding-steel-in-construction", title: "Understanding Steel in Construction",
    author: "BuildMart Team", category: "Construction Tips", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-16", readTime: "6 min read",
    excerpt: "A complete guide to use steel correctly in your building project.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Steel bars give a building its **tensile strength**. This is a sample article; the real text comes from the admin panel." },
      { type: "h2", text: "What to check" },
      { type: "ul", items: ["The **size and grade** marked on the bar.", "**Rust and bends** before you accept delivery.", "The **weight** against the bill."] },
      { type: "tip", text: "Store steel off the ground and cover it from rain." },
    ],
  },
  {
    id: 4, slug: "reusing-materials-saves-money-and-the-planet", title: "Reusing Materials Saves Money and the Planet",
    author: "Maria Saeed", category: "Reused Materials", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-14", readTime: "4 min read",
    excerpt: "Discover how reused materials can reduce costs and help the environment.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Leftover bricks, tiles and wood can find a **second use**. This is a sample article for demonstration." },
      { type: "h2", text: "Before you buy reused materials" },
      { type: "ul", items: ["Inspect the **condition** in person.", "Check the **quantity** is enough for your job.", "Ask the seller about **where it came from**."] },
      { type: "tip", text: "Compare the price with new material before you decide." },
    ],
  },
  {
    id: 5, slug: "simple-home-design-ideas-for-every-budget", title: "Modern Home Design Ideas",
    author: "BuildMart Team", category: "Home Design", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-12", readTime: "3 min read",
    excerpt: "Simple and stylish home design ideas for every budget.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Good design does not always need a big budget. This is a **sample article** for demonstration." },
      { type: "ul", items: ["Pick a **simple colour palette**.", "Use **natural light** wherever you can.", "Spend more on what you touch daily, like doors and fittings."] },
    ],
  },
  {
    id: 6, slug: "how-to-plan-your-house-construction-budget", title: "How to Plan Your House Construction Budget",
    author: "BuildMart Team", category: "Budget Planning", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-10", readTime: "5 min read",
    excerpt: "Break your budget into grey structure, finishing and extras so nothing surprises you.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "A clear budget stops costs from growing during the build. This is a sample article for demonstration." },
      { type: "h2", text: "Split the budget" },
      { type: "ul", items: ["**Grey structure**: foundation, walls and roof.", "**Finishing**: tiles, paint and fittings.", "**Extras**: a reserve for the unexpected."] },
      { type: "tip", text: "Keep a reserve so small changes do not stop the work." },
    ],
  },
  {
    id: 7, slug: "how-to-hire-a-good-mason-or-plumber", title: "How to Hire a Good Mason or Plumber",
    author: "BuildMart Team", category: "Labour Guides", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-08", readTime: "4 min read",
    excerpt: "What to ask, what to check and how to compare bids before you hire a worker.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "The right worker saves time and rework. This is a **sample article** for demonstration." },
      { type: "h2", text: "What to check" },
      { type: "ul", items: ["Ask about **past work** and experience.", "Compare **more than one bid**.", "Agree the **final price and time** before work starts."] },
    ],
  },
  {
    id: 8, slug: "five-common-construction-mistakes-to-avoid", title: "5 Common Construction Mistakes to Avoid",
    author: "Maria Saeed", category: "Construction Tips", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-06", readTime: "5 min read",
    excerpt: "Simple mistakes that increase cost and delay your project, and how to avoid them.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Most delays come from small mistakes made early. This is a sample article for demonstration." },
      { type: "ul", items: ["Starting **without a clear plan**.", "Buying material **without comparing prices**.", "Changing the design **after work begins**."] },
      { type: "tip", text: "Write down the plan and the budget before the first brick is laid." },
    ],
  },
  {
    id: 9, slug: "choosing-tiles-for-floors-and-walls", title: "Choosing Tiles for Floors and Walls",
    author: "BuildMart Team", category: "Material Guides", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-04", readTime: "4 min read",
    excerpt: "Size, finish and price: what to look at before you order tiles.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Floor and wall tiles have different needs. This is a **sample article** for demonstration." },
      { type: "ul", items: ["Check the **size and finish**.", "Order **a little extra** for cuts and breakage.", "Match the **batch number** on every box."] },
    ],
  },
  {
    id: 10, slug: "buying-used-bricks-what-to-check", title: "Buying Used Bricks: What to Check",
    author: "BuildMart Team", category: "Reused Materials", keywords: [], image: null, status: "Published", featured: false,
    date: "2026-10-02", readTime: "3 min read",
    excerpt: "How to inspect reused bricks for strength and condition before you buy.",
    content: [
      { type: "h2", text: "Introduction" },
      { type: "p", text: "Used bricks can cut cost if they are in good shape. This is a sample article for demonstration." },
      { type: "ul", items: ["Look for **cracks and chips**.", "Check that the **sizes match**.", "Clean off **old mortar** before use."] },
    ],
  },
  {
    id: 11, slug: "steel-prices-q4-2026-outlook", title: "Steel Prices: Q4 2026 Outlook",
    author: "BuildMart Team", category: "Material Guides", keywords: [], image: null, status: "Draft", featured: false,
    date: "2026-10-18", readTime: "4 min read",
    excerpt: "Draft article, not shown on the public site.",
    content: [{ type: "p", text: "Draft sample content." }],
  },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-10-20" ko "Oct 20, 2026" banata hai
export const formatDate = (iso) => {
  const [year, month, day] = iso.split("-");
  return `${months[Number(month) - 1]} ${day}, ${year}`;
};