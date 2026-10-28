// Images: src/assests/images/pictures/ se import (path apne mutabiq check karein)

import shop1 from "../../../assests/images/shop-1.jpg";
import shop2 from "../../../assests/images/shop-2.jpg";
import shop3 from "../../../assests/images/shop-3.jpg";
import shop4 from "../../../assests/images/shop-4.jpg";
import shop5 from "../../../assests/images/shop-5.jpg";
import shop6 from "../../../assests/images/shop-6.jpg";
import shop7 from "../../../assests/images/shop-7.jpg";
import shop8 from "../../../assests/images/shop-8.jpg";

const shopImages = [shop1, shop2, shop3, shop4, shop5, shop6, shop7, shop8];



// DEMO DATA: sab naam, ratings, reviews aur verification sirf UI ke liye hain
export const suppliers = [
  { id: 1, name: "Al-Noor Building Store", initials: "AN", rating: 4.6, reviews: 124, verified: true,
    description: "Complete range of construction materials at competitive prices. Trusted by builders and contractors in Gujranwala.",
    tags: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints", "Pipes", "Marble"] },
  { id: 2, name: "City Material Traders", initials: "CM", rating: 4.5, reviews: 98, verified: true,
    description: "Wide range of construction materials with reliable service and on-time delivery.",
    tags: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"] },
  { id: 3, name: "Rehman Builders Supply", initials: "RB", rating: 4.3, reviews: 76, verified: false,
    description: "Your one-stop shop for all construction needs. Best quality materials at affordable rates.",
    tags: ["Cement", "Steel", "Bricks", "Tiles", "Paints", "Pipes"] },
  { id: 4, name: "Zahid Construction Materials", initials: "ZC", rating: 4.7, reviews: 112, verified: true,
    description: "Premium quality materials for your dream projects. We value your trust.",
    tags: ["Cement", "Steel", "Bricks", "Sand", "Tiles", "Marble"] },
  { id: 5, name: "Punjab Building Materials", initials: "PB", rating: 4.4, reviews: 87, verified: true,
    description: "Quality construction materials and professional support for all projects.",
    tags: ["Cement", "Steel", "Bricks", "Tiles", "Paints", "Pipes"] },
  { id: 6, name: "Modern Builders Mart", initials: "MB", rating: 4.2, reviews: 34, verified: true,
    description: "High quality materials with professional customer support.",
    tags: ["Cement", "Steel", "Bricks", "Tiles", "Sand", "Paints"] },
  { id: 7, name: "Ali & Sons Traders", initials: "AS", rating: 4.1, reviews: 52, verified: true,
    description: "Reliable supplier with a wide range of building materials and competitive prices.",
    tags: ["Cement", "Steel", "Bricks", "Tiles", "Paints", "Pipes"] },
  { id: 8, name: "Rana Construction Supply", initials: "RC", rating: 3.9, reviews: 38, verified: false,
    description: "Quality materials for residential and commercial projects.",
    tags: ["Cement", "Bricks", "Sand", "Steel", "Tiles"] },
].map((s, i) => ({
  ...s,
  location: "Gujranwala, Punjab",
  image: shopImages[i], // har shop ko apni image
}));