// DEMO DATA: naam, rating, reviews, verification aur contact sirf UI ke liye hain
import shop1 from "../../../assets/images/supplier/shops/shop-1.jpg";
import shop2 from "../../../assets/images/supplier/shops/shop-2.jpg";
import shop3 from "../../../assets/images/supplier/shops/shop-3.jpg";
import shop4 from "../../../assets/images/supplier/shops/shop-4.jpg";
import shop5 from "../../../assets/images/supplier/shops/shop-5.jpg";
import shop6 from "../../../assets/images/supplier/shops/shop-6.jpg";
import shop7 from "../../../assets/images/supplier/shops/shop-7.jpg";
import shop8 from "../../../assets/images/supplier/shops/shop-8.jpg";

const list = [
  { id: 1, name: "Al-Noor Building Store", initials: "AN", location: "GT Road, Gujranwala", rating: 4.6, reviews: 124, verified: true, image: shop1,
    description: "Complete range of construction materials at competitive prices for builders and contractors.",
    tags: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"] },
  { id: 2, name: "City Material Traders", initials: "CM", location: "Satellite Town, Gujranwala", rating: 4.5, reviews: 98, verified: true, image: shop2,
    description: "Wide range of construction materials with reliable service and on-time delivery.",
    tags: ["Cement", "Steel", "Bricks", "Sand"] },
  { id: 3, name: "Rehman Builders Supply", initials: "RB", location: "Model Town, Gujranwala", rating: 4.3, reviews: 76, verified: false, image: shop3,
    description: "One-stop shop for construction needs with affordable rates.",
    tags: ["Cement", "Steel", "Paints", "Pipes"] },
  { id: 4, name: "Zahid Construction Materials", initials: "ZC", location: "Peoples Colony, Gujranwala", rating: 4.7, reviews: 112, verified: true, image: shop4,
    description: "Premium quality materials for residential and commercial projects.",
    tags: ["Cement", "Steel", "Tiles", "Marble"] },
  { id: 5, name: "Punjab Building Materials", initials: "PB", location: "GT Road, Gujranwala", rating: 4.4, reviews: 87, verified: true, image: shop5,
    description: "Quality construction materials and professional support for all projects.",
    tags: ["Cement", "Bricks", "Paints", "Pipes"] },
  { id: 6, name: "Modern Builders Mart", initials: "MB", location: "Satellite Town, Gujranwala", rating: 4.2, reviews: 34, verified: true, image: shop6,
    description: "High quality materials with friendly customer support.",
    tags: ["Cement", "Steel", "Sand", "Tiles"] },
  { id: 7, name: "Ali & Sons Traders", initials: "AS", location: "Model Town, Gujranwala", rating: 4.1, reviews: 52, verified: true, image: shop7,
    description: "Reliable supplier of building materials at competitive prices.",
    tags: ["Bricks", "Tiles", "Paints", "Pipes"] },
  { id: 8, name: "Rana Construction Supply", initials: "RC", location: "Peoples Colony, Gujranwala", rating: 3.9, reviews: 38, verified: false, image: shop8,
    description: "Quality materials for residential and commercial projects.",
    tags: ["Cement", "Bricks", "Sand", "Steel"] },
];

export const suppliers = list.map((s) => ({
  ...s,
  slug: s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), // e.g. al-noor-building-store
  address: "Main Road, Gujranwala, Punjab (demo address)",
  phone: "+92 300 0000000 (sample)",
  hours: "9:00 AM – 9:00 PM",
  delivery: "Within Gujranwala",
}));

// Link se supplier dhoondta hai (na mile to undefined)
export const getSupplier = (slug) => suppliers.find((s) => s.slug === slug);