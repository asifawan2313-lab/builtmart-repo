"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Store,
  User,
  X,
} from "lucide-react";
import BmProductCard from "../../../../../component/shared/productCard/BmProductCard";
import doorsWindows from "../../../../../assets/images/guest/card/doorsWindows.jpg";
import electrical from "../../../../../assets/images/guest/card/copperwire.jpg";
import steelSaria from "../../../../../assets/images/guest/card/steelSaria.jpg";
import metalAluminum from "../../../../../assets/images/guest/card/grills.jpg";
import paintsFinishes from "../../../../../assets/images/guest/card/paint.jpg";
import architectural from "../../../../../assets/images/guest/card/tiles.jpg";
import bricks from "../../../../../assets/images/guest/card/briks.jpg";
import sandImage from "../../../../../assets/images/guest/card/sand.jpg";
import glassWindow from "../../../../../assets/images/guest/card/window.jpg";
import secWindow from "../../../../../assets/images/guest/card/secwindow.jpg";

/* =========================================================
   TEMPORARY DATA — baad mein API se aayega
========================================================= */

// Products: category = category ka name, condition = "new" ya "reused",
// is_featured = true/false. moq = minimum order quantity (unit mein).
// images = detail page ki gallery (ek ya zyada images)
// unit / unitPlural = quantity ke saath dikhne wali unit (1 Door, 2 Doors)
const BM_MATERIAL_PRODUCTS = [
  {
    id: 1,
    name: "Red Clay Bricks (A-Class)",
    slug: "red-clay-bricks",
    price: 17,
    unit: "Piece",
    unitPlural: "Pieces",
    moq: 1000,
    image: bricks,
    images: [bricks],
    category: "Bricks & Blocks",
    categorySlug: "bricks-blocks",
    shop: "Al-Noor Building Store",
    location: "GT Road",
    condition: "new",
    is_featured: true,
    specifications: [
      { label: "Grade", value: "A-Class" },
      { label: "Size", value: "9 x 4.5 x 3 inch" },
    ],
    overview: "Well-burnt red clay bricks for load-bearing and partition walls. A common choice for house construction in Gujranwala.",
    features: ["Uniform size and shape", "Well-burnt with good strength", "Low breakage during delivery"],
    applications: ["House and building walls", "Boundary walls", "Foundation and plinth work"],
    benefits: ["Easy to lay and plaster", "Keeps rooms comfortable in hot weather", "Locally available at a fair price"],
    whyChoose: "Supplied by a local Gujranwala shop, so you can check the quality and arrange delivery quickly.",
    reviews: [
      { id: 1, name: "Usman R.", date: "03/11/2026", rating: 5, comment: "Good quality bricks with very few broken pieces." },
      { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 4, comment: "Delivery was on time and the colour was uniform." },
      { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 5, comment: "Strong bricks and the plaster sticks well." },
      { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 4, comment: "Fair rate compared to other shops." },
      { id: 5, name: "Sana B.", date: "08/10/2026", rating: 3, comment: "A few pieces were chipped but overall fine." },
    ],
  },
  {
    id: 2,
    name: "Ravi Sand (Rait)",
    slug: "ravi-sand",
    price: 9000,
    unit: "Trolley",
    unitPlural: "Trolleys",
    moq: 1,
    image: sandImage,
    images: [sandImage],
    category: "Sand & Crush",
    categorySlug: "sand-crush",
    shop: "City Material Traders",
    location: "Satellite Town",
    condition: "new",
    is_featured: true,
    specifications: [
      { label: "Type", value: "Ravi sand (Rait)" },
      { label: "Grain", value: "Medium-fine" },
    ],
    overview: "Clean Ravi sand (Rait) used for plaster, masonry mortar and concrete mixing.",
    features: ["Clean with low dust", "Medium-fine grain", "Supplied by the trolley"],
    applications: ["Plaster work", "Brick and block masonry", "Concrete mixing with cement"],
    benefits: ["Smooth finish in plaster", "Good binding with cement", "Easy to order by trolley"],
    whyChoose: "A local supplier near you means shorter delivery time and easier repeat orders for ongoing work.",
    reviews: [
      { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 4, comment: "Clean sand and a smooth plaster finish." },
      { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Full trolley as promised." },
      { id: 3, name: "Sana B.", date: "20/10/2026", rating: 5, comment: "Very little dust, good for masonry." },
      { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 3, comment: "Delivery took a day longer than expected." },
      { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 4, comment: "Good value for the price." },
    ],
  },
  {
    id: 3,
    name: "Steel Saria Grade 60",
    slug: "steel-saria",
    price: 265,
    unit: "Kg",
    unitPlural: "Kg",
    moq: 500,
    image: steelSaria,
    images: [steelSaria],
    category: "Steel & Welding",
    categorySlug: "steel-welding",
    shop: "Zahid Construction Materials",
    location: "Peoples Colony",
    condition: "new",
    is_featured: true,
    specifications: [
      { label: "Grade", value: "Grade 60" },
      { label: "Type", value: "Deformed bars" },
    ],
    overview: "Grade 60 deformed steel bars (saria) for reinforced concrete work in houses and commercial buildings.",
    features: ["High tensile strength", "Deformed surface grips concrete well", "Available in different sizes"],
    applications: ["Columns and beams", "Roof slabs", "Foundations"],
    benefits: ["Strong reinforcement for concrete", "Suitable for multi-storey work", "Sold by weight for exact billing"],
    whyChoose: "Buy by the kilogram from a Gujranwala supplier and compare the rate with other shops on BuildMart.",
    reviews: [
      { id: 1, name: "Sana B.", date: "03/11/2026", rating: 5, comment: "Bars were straight and the weight matched the bill." },
      { id: 2, name: "Hassan J.", date: "27/10/2026", rating: 4, comment: "Good rate for bulk quantity." },
      { id: 3, name: "Nadia F.", date: "20/10/2026", rating: 5, comment: "Strong steel, easy to bend and tie." },
      { id: 4, name: "Kamran W.", date: "14/10/2026", rating: 4, comment: "Delivered safely to site." },
      { id: 5, name: "Bilal N.", date: "08/10/2026", rating: 4, comment: "Supplier explained the sizes clearly." },
    ],
  },
  {
    id: 4,
    name: "Porcelain Floor Tiles",
    slug: "porcelain-floor-tiles",
    price: 95,
    unit: "Sq Ft",
    unitPlural: "Sq Ft",
    moq: 100,
    image: architectural,
    images: [architectural],
    category: "Architectural Products",
    categorySlug: "architectural-products",
    shop: "Punjab Building Materials",
    location: "GT Road",
    condition: "new",
    is_featured: false,
    specifications: [
      { label: "Type", value: "Porcelain" },
      { label: "Size", value: "2 x 2 ft" },
    ],
    overview: "Glossy porcelain floor tiles for living rooms, bedrooms and offices.",
    features: ["Smooth glossy surface", "Easy to clean", "Even size for neat fitting"],
    applications: ["Living rooms and bedrooms", "Offices and shops", "Corridors"],
    benefits: ["Gives rooms a clean modern look", "Simple daily cleaning", "Long lasting for indoor use"],
    whyChoose: "Choose by the square foot and order only what your floor needs from a local tile supplier.",
    reviews: [
      { id: 1, name: "Nadia F.", date: "03/11/2026", rating: 4, comment: "Tiles look nice and the fitting was neat." },
      { id: 2, name: "Kamran W.", date: "27/10/2026", rating: 4, comment: "Good finish for the price." },
      { id: 3, name: "Bilal N.", date: "20/10/2026", rating: 5, comment: "Easy to clean and shiny." },
      { id: 4, name: "Shazia M.", date: "14/10/2026", rating: 3, comment: "A few tiles had a minor size difference." },
      { id: 5, name: "Usman R.", date: "08/10/2026", rating: 4, comment: "Supplier helped me calculate the quantity." },
    ],
  },
  {
    id: 5,
    name: "Gold Emulsion Paint",
    slug: "gold-emulsion-paint",
    price: 7800,
    unit: "Bucket",
    unitPlural: "Buckets",
    moq: 1,
    image: paintsFinishes,
    images: [paintsFinishes],
    category: "Paints & Finishes",
    categorySlug: "paints-finishes",
    shop: "Modern Builders Mart",
    location: "Satellite Town",
    condition: "new",
    is_featured: false,
    specifications: [
      { label: "Type", value: "Emulsion paint" },
      { label: "Finish", value: "Smooth" },
    ],
    overview: "Smooth emulsion paint for interior walls and ceilings, sold in ready-to-use buckets.",
    features: ["Smooth even coverage", "Easy to apply with roller or brush", "Washable finish"],
    applications: ["Bedroom and lounge walls", "Ceilings", "Office interiors"],
    benefits: ["Fresh clean look for rooms", "Easy touch-ups", "Wide use in home renovation"],
    whyChoose: "Buy a full bucket from a local shop and confirm shade and quantity directly with the supplier.",
    reviews: [
      { id: 1, name: "Bilal N.", date: "03/11/2026", rating: 5, comment: "Even coverage and the walls look great." },
      { id: 2, name: "Shazia M.", date: "27/10/2026", rating: 4, comment: "Easy to apply with a roller." },
      { id: 3, name: "Usman R.", date: "20/10/2026", rating: 4, comment: "Colour matched what I selected." },
      { id: 4, name: "Ahmad K.", date: "14/10/2026", rating: 5, comment: "Smooth finish on ceilings." },
      { id: 5, name: "Faisal M.", date: "08/10/2026", rating: 3, comment: "Needed a second coat on one wall." },
    ],
  },
  {
    id: 6,
    name: "Aluminium Sliding Window",
    slug: "aluminium-sliding-window",
    price: null,
    unit: "Window",
    unitPlural: "Windows",
    moq: 1,
    image: secWindow,
    images: [secWindow, glassWindow],
    category: "Metal & Aluminum Works",
    categorySlug: "metal-aluminum-works",
    shop: "Rehman Builders Supply",
    location: "Model Town",
    condition: "new",
    is_featured: false,
    specifications: [
      { label: "Frame", value: "Aluminium" },
      { label: "Type", value: "Sliding" },
    ],
    overview: "Sliding windows with an aluminium frame, made to the size of your openings.",
    features: ["Smooth sliding action", "Rust-free aluminium frame", "Made-to-measure sizes"],
    applications: ["Bedrooms and lounges", "Offices", "Shops"],
    benefits: ["Saves space as it slides, not swings", "Low maintenance", "Clean modern look"],
    whyChoose: "Price depends on size, so contact the supplier with your measurements to get a quote.",
    reviews: [
      { id: 1, name: "Usman R.", date: "03/11/2026", rating: 4, comment: "Fitted neatly and slides smoothly." },
      { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 4, comment: "Quick quote after sending measurements." },
      { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 5, comment: "Frame looks clean and modern." },
      { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 3, comment: "Fitting took a little longer than planned." },
      { id: 5, name: "Sana B.", date: "08/10/2026", rating: 4, comment: "Good option for bedrooms." },
    ],
  },
  {
    id: 7,
    name: "Tempered Glass Window",
    slug: "tempered-glass-window",
    price: 850,
    unit: "Sq Ft",
    unitPlural: "Sq Ft",
    moq: 20,
    image: glassWindow,
    images: [glassWindow, secWindow],
    category: "Glass & Glazing",
    categorySlug: "glass-glazing",
    shop: "Ali & Sons Traders",
    location: "Model Town",
    condition: "new",
    is_featured: false,
    specifications: [
      { label: "Glass", value: "Tempered" },
      { label: "Thickness", value: "6 mm to 12 mm" },
    ],
    overview: "Tempered glass cut to size for windows, partitions and building fronts.",
    features: ["Stronger than normal glass", "Polished edges", "Cut to required size"],
    applications: ["Windows", "Office partitions", "Shop fronts and facades"],
    benefits: ["Better strength for daily use", "Bright and open look", "Suitable for commercial buildings"],
    whyChoose: "Order by the square foot from a Gujranwala glass trader and get it cut to your size.",
    reviews: [
      { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 5, comment: "Cut accurately and the edges were clean." },
      { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Good thickness options for our shop front." },
      { id: 3, name: "Sana B.", date: "20/10/2026", rating: 4, comment: "Glass is strong and clear." },
      { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 5, comment: "Delivered without any damage." },
      { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 3, comment: "Price is slightly high but quality is good." },
    ],
  },
  {
    id: 8,
    name: "Copper Electrical Wire",
    slug: "copper-electrical-wire",
    price: 2200,
    unit: "Coil",
    unitPlural: "Coils",
    moq: 1,
    image: electrical,
    images: [electrical],
    category: "Electrical & Lighting",
    categorySlug: "electrical-lighting",
    shop: "Rana Construction Supply",
    location: "Peoples Colony",
    condition: "new",
    is_featured: false,
    specifications: [
      { label: "Conductor", value: "Copper" },
      { label: "Insulation", value: "PVC" },
    ],
    overview: "PVC insulated copper wire for lighting and power wiring in homes and shops.",
    features: ["Copper conductor", "PVC insulation", "Easy to pull through conduit"],
    applications: ["House wiring", "Shop and office wiring", "Light and socket circuits"],
    benefits: ["Reliable electrical connection", "Flexible for easy installation", "Sold in ready coils"],
    whyChoose: "Buy a full coil from a local electrical supplier and ask about the wire size that suits your load.",
    reviews: [
      { id: 1, name: "Sana B.", date: "03/11/2026", rating: 4, comment: "Easy to pull and the insulation looked good." },
      { id: 2, name: "Hassan J.", date: "27/10/2026", rating: 4, comment: "Fair rate for a full coil." },
      { id: 3, name: "Nadia F.", date: "20/10/2026", rating: 5, comment: "Used it for full house wiring, no issues." },
      { id: 4, name: "Kamran W.", date: "14/10/2026", rating: 3, comment: "Coil length could be explained more clearly." },
      { id: 5, name: "Bilal N.", date: "08/10/2026", rating: 4, comment: "Supplier suggested the right wire size." },
    ],
  },
  {
    id: 9,
    name: "Wooden Door (Deodar)",
    slug: "wooden-door-deodar",
    price: 18000,
    unit: "Door",
    unitPlural: "Doors",
    moq: 1,
    image: doorsWindows,
    images: [doorsWindows],
    category: "Doors & Windows",
    categorySlug: "doors-windows",
    shop: "Al-Noor Building Store",
    location: "GT Road",
    condition: "new",
    is_featured: false,
    specifications: [
      { label: "Wood", value: "Deodar" },
      { label: "Type", value: "Solid panel door" },
    ],
    overview: "Solid deodar wood door with a natural polish, suitable for main entrances and rooms.",
    features: ["Solid deodar wood", "Natural polished look", "Standard and custom sizes"],
    applications: ["Main entrance doors", "Bedroom doors", "Interior rooms"],
    benefits: ["Strong and long lasting", "Classic wooden appearance", "Can be made to your size"],
    whyChoose: "Check the wood and polish in person at a local shop before you finalize your order.",
    reviews: [
      { id: 1, name: "Nadia F.", date: "03/11/2026", rating: 5, comment: "Solid door and the polish looks very good." },
      { id: 2, name: "Kamran W.", date: "27/10/2026", rating: 4, comment: "Delivered safely and fitted well." },
      { id: 3, name: "Bilal N.", date: "20/10/2026", rating: 5, comment: "Looks classic at our main entrance." },
      { id: 4, name: "Shazia M.", date: "14/10/2026", rating: 4, comment: "Wood quality is good for the price." },
      { id: 5, name: "Usman R.", date: "08/10/2026", rating: 3, comment: "Took a few days to prepare the size." },
    ],
  },
  {
    id: 10,
    name: "Used Red Bricks",
    slug: "used-red-bricks",
    price: 10,
    unit: "Piece",
    unitPlural: "Pieces",
    moq: 500,
    image: bricks,
    images: [bricks],
    category: "Used Bricks",
    categorySlug: "used-bricks",
    shop: "Hassan Used Materials",
    location: "Rahwali",
    condition: "reused",
    is_featured: false,
    specifications: [
      { label: "Source", value: "Dismantled buildings" },
      { label: "Condition", value: "Cleaned and reusable" },
    ],
    overview: "Cleaned red bricks recovered from dismantled buildings, sold at a lower price than new bricks.",
    features: ["Cleaned and sorted", "Lower cost than new bricks", "Standard size"],
    applications: ["Boundary walls", "Garden and outdoor work", "Non-structural walls"],
    benefits: ["Saves money on budget projects", "Reduces construction waste", "Quick availability"],
    whyChoose: "A good option for low-cost projects. Inspect the bricks before buying for the work you plan.",
    reviews: [
      { id: 1, name: "Bilal N.", date: "03/11/2026", rating: 4, comment: "Good value for a boundary wall." },
      { id: 2, name: "Shazia M.", date: "27/10/2026", rating: 4, comment: "Bricks were clean and mostly intact." },
      { id: 3, name: "Usman R.", date: "20/10/2026", rating: 5, comment: "Saved a lot on our budget project." },
      { id: 4, name: "Ahmad K.", date: "14/10/2026", rating: 3, comment: "A few bricks were cracked." },
      { id: 5, name: "Faisal M.", date: "08/10/2026", rating: 4, comment: "Quick delivery from Rahwali." },
    ],
  },
  {
    id: 11,
    name: "Reused Steel Saria",
    slug: "reused-steel-saria",
    price: 190,
    unit: "Kg",
    unitPlural: "Kg",
    moq: 200,
    image: steelSaria,
    images: [steelSaria],
    category: "Reused Steel",
    categorySlug: "reused-steel",
    shop: "Zahid Construction Materials",
    location: "Peoples Colony",
    condition: "reused",
    is_featured: false,
    specifications: [
      { label: "Source", value: "Dismantled structures" },
      { label: "Type", value: "Saria bars" },
    ],
    overview: "Reused steel saria recovered from old structures, suitable for non-critical work at a lower rate.",
    features: ["Lower price per kg", "Recovered from old structures", "Sold by weight"],
    applications: ["Fencing and gates", "Temporary structures", "Non-critical reinforcement"],
    benefits: ["Budget-friendly steel", "Helps reuse building material", "Available in bulk"],
    whyChoose: "Ask the supplier about the condition of the bars and get advice before using them in structural work.",
    reviews: [
      { id: 1, name: "Usman R.", date: "03/11/2026", rating: 4, comment: "Worked well for our boundary gate." },
      { id: 2, name: "Ahmad K.", date: "27/10/2026", rating: 3, comment: "Some bars were bent but the rate was low." },
      { id: 3, name: "Faisal M.", date: "20/10/2026", rating: 4, comment: "Good for fencing work." },
      { id: 4, name: "Tariq H.", date: "14/10/2026", rating: 4, comment: "Supplier was honest about the condition." },
      { id: 5, name: "Sana B.", date: "08/10/2026", rating: 3, comment: "Check the bars before buying." },
    ],
  },
  {
    id: 12,
    name: "Used Wooden Door",
    slug: "used-wooden-door",
    price: 7500,
    unit: "Door",
    unitPlural: "Doors",
    moq: 1,
    image: doorsWindows,
    images: [doorsWindows],
    category: "Used Doors & Windows",
    categorySlug: "used-doors-windows",
    shop: "Bilal Traders",
    location: "Wapda Town",
    condition: "reused",
    is_featured: false,
    specifications: [
      { label: "Material", value: "Solid wood" },
      { label: "Condition", value: "Good, minor wear" },
    ],
    overview: "Solid wood door in good condition, recovered from a dismantled house.",
    features: ["Solid wood", "Good condition with minor wear", "Lower price than a new door"],
    applications: ["Room doors", "Store rooms", "Workshops"],
    benefits: ["Saves money", "Solid build", "Can be repainted or polished"],
    whyChoose: "See the door in person at the shop before buying to check its size and condition.",
    reviews: [
      { id: 1, name: "Faisal M.", date: "03/11/2026", rating: 4, comment: "Sturdy door and looked fine after polish." },
      { id: 2, name: "Tariq H.", date: "27/10/2026", rating: 4, comment: "Good for our store room." },
      { id: 3, name: "Sana B.", date: "20/10/2026", rating: 5, comment: "Great price for solid wood." },
      { id: 4, name: "Hassan J.", date: "14/10/2026", rating: 3, comment: "Minor scratches but acceptable." },
      { id: 5, name: "Nadia F.", date: "08/10/2026", rating: 4, comment: "Easy to repaint." },
    ],
  },
];

// Delivery location dropdown ke options
const BM_LOCATIONS = [
  "GT Road",
  "Satellite Town",
  "Peoples Colony",
  "Model Town",
  "Rahwali",
  "Wapda Town",
  "Civil Lines",
  "Garden Town",
];

const BM_EMPTY_QUESTION = { name: "", question: "" };
const BM_EMPTY_REVIEW = { name: "", rating: 5, comment: "" };

const fieldClass =
  "mt-1 w-full rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2 text-sm text-[color:var(--primary-text)] outline-none focus:border-[var(--primary-yellow)] focus:ring-2 focus:ring-[var(--primary-yellow)]/40";
const labelClass = "block text-sm text-[color:var(--secondary-text)]";

const detailHeading =
  "text-sm font-bold text-[color:var(--primary-text)]";
const actionLink =
  "inline-flex items-center gap-1 text-[11px] text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]";

/* =========================================================
   PAGE  (/materials/[id]/[slug])
   id   = category ka slug (jaise bricks-blocks)
   slug = product ka slug (jaise red-clay-bricks)
   Product sirf slug se dhoondha jata hai.
========================================================= */

const Page = () => {
  const { slug } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [questionOpen, setQuestionOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [questionForm, setQuestionForm] = useState(BM_EMPTY_QUESTION);
  const [reviewForm, setReviewForm] = useState(BM_EMPTY_REVIEW);
  const reviewBoxRef = useRef(null);

  // URL ke slug se product dhoondhna (/materials/[id]/[slug])
  const selectedProduct = BM_MATERIAL_PRODUCTS.find(
    (product) => product.slug === slug
  );

  // Product badalne par detail page ki state reset
  useEffect(() => {
    setQuantity(1);
    setActiveTab("description");
    setSelectedImage(0);
    setDeliveryLocation("");
    if (reviewBoxRef.current) reviewBoxRef.current.scrollLeft = 0;
  }, [slug]);

  // Reviews har 3 second baad ek ek card aage move hote hain.
  // Reviews do dafa render hote hain, is liye end par jump nazar nahi aata.
  useEffect(() => {
    const timer = setInterval(() => {
      const box = reviewBoxRef.current;
      if (!box || !box.firstElementChild) return;

      if (box.scrollLeft >= box.scrollWidth / 2) box.scrollLeft = 0;
      box.scrollBy({ left: box.firstElementChild.offsetWidth, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Quantity: default 1, minus se 1 se kam nahi hoti.
  // Unit product ke dataset (unit / unitPlural) se aati hai.
  const handleMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const handlePlus = () => setQuantity(quantity + 1);
  const handleAddToCart = () =>
    alert(
      `${quantity} ${quantity > 1 ? selectedProduct.unitPlural : selectedProduct.unit} of ${selectedProduct.name} added to cart (demo)`
    );
  const handleViewSupplier = () =>
    alert(`Supplier page of ${selectedProduct.shop} will be added soon.`);
  const handleWishlist = () => alert("Please login to add to wishlist.");
  const handleShare = () => alert("Share this product (demo)");

  // Tab click: tab highlight ho aur page us section tak scroll kare
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    document.getElementById(tab).scrollIntoView({ behavior: "smooth" });
  };

  // Ask Question modal
  const handleCloseQuestion = () => {
    setQuestionOpen(false);
    setQuestionForm(BM_EMPTY_QUESTION);
  };
  const handleSubmitQuestion = () => {
    alert(`Question sent to ${selectedProduct.shop} (demo)`);
    handleCloseQuestion();
  };

  // Add Review modal
  const handleCloseReview = () => {
    setReviewOpen(false);
    setReviewForm(BM_EMPTY_REVIEW);
  };
  const handleSubmitReview = () => {
    alert(`Thank you! Your ${reviewForm.rating}-star review was submitted (demo)`);
    handleCloseReview();
  };

  // Product na mile
  if (!selectedProduct) {
    return (
      <main className="min-h-screen bg-[var(--off-white-background)] px-4 py-16 text-center">
        <p className="text-sm text-[color:var(--secondary-text)]">Product not found.</p>
        <Link
          href="/materials"
          className="mt-4 inline-flex items-center gap-1 rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
        >
          <ArrowLeft size={14} />
          Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--off-white-background)]">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-8">
        <Link
          href="/materials"
          className="inline-flex items-center gap-1 text-xs text-[color:var(--secondary-text)] hover:text-[color:var(--primary-text)]"
        >
          <ArrowLeft size={14} />
          Back to Products
        </Link>

        {/* TOP SECTION */}
        <div className="mt-4 grid gap-6 md:grid-cols-5">
          {/* Images */}
          <div className="md:col-span-2">
            <div className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-2 shadow-sm">
              <div className="relative aspect-square overflow-hidden rounded-md bg-[var(--border-color)]">
                {selectedProduct.images[selectedImage] ? (
                  <Image
                    src={selectedProduct.images[selectedImage]}
                    alt={selectedProduct.name}
                    fill
                    unoptimized
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
                    No image
                  </span>
                )}
              </div>

              {/* Thumbnails: sirf tab jab product ki ek se zyada images hon */}
              {selectedProduct.images.length > 1 && (
                <div className="mt-2 flex gap-2">
                  {selectedProduct.images.map((img, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(index)}
                      aria-label={`Show image ${index + 1}`}
                      className={`relative h-14 w-14 overflow-hidden rounded-md border-2 ${
                        selectedImage === index
                          ? "border-[var(--primary-yellow)]"
                          : "border-[color:var(--border-color)]"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${selectedProduct.name} ${index + 1}`}
                        fill
                        unoptimized
                        sizes="56px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-3">
            <div className="flex flex-wrap gap-4">
              <button type="button" onClick={handleWishlist} className={actionLink}>
                <Heart size={12} /> Wishlist
              </button>
              <button type="button" onClick={() => setQuestionOpen(true)} className={actionLink}>
                <MessageCircle size={12} /> Ask Question
              </button>
              <button type="button" onClick={() => setReviewOpen(true)} className={actionLink}>
                <Star size={12} /> Add Review
              </button>
              <button type="button" onClick={handleShare} className={actionLink}>
                <Share2 size={12} /> Share
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-[color:var(--primary-text)]">
                {selectedProduct.name}
              </h1>
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-semibold text-white ${
                  selectedProduct.condition === "reused"
                    ? "bg-[#384452]"
                    : "bg-[var(--charcoal-black)]"
                }`}
              >
                {selectedProduct.condition === "reused" ? "Reused" : "New"}
              </span>
            </div>

            <p className="mt-2 text-xs text-[color:var(--secondary-text)]">
              {selectedProduct.overview}
            </p>
            <p className="mt-2 text-xs font-semibold text-[color:var(--primary-text)]">
              Note: Minimum Order Quantity {selectedProduct.moq} (per {selectedProduct.unit})
            </p>

            <p className="mt-3 text-xl font-bold text-[color:var(--primary-text)]">
              {selectedProduct.price
                ? `Rs ${selectedProduct.price.toLocaleString("en-US")}`
                : "Contact for price"}
              {selectedProduct.price && (
                <span className="text-xs font-normal text-[color:var(--secondary-text)]">
                  {" "}
                  / {selectedProduct.unit}
                </span>
              )}
            </p>

            {/* Quantity */}
            <div className="mt-3 inline-flex items-center rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)]">
              <button
                type="button"
                onClick={handleMinus}
                aria-label="Decrease quantity"
                className="p-2 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              >
                <Minus size={12} />
              </button>
              <span className="min-w-24 px-2 text-center text-xs font-medium text-[color:var(--primary-text)]">
                {quantity}{" "}
                {quantity > 1 ? selectedProduct.unitPlural : selectedProduct.unit}
              </span>
              <button
                type="button"
                onClick={handlePlus}
                aria-label="Increase quantity"
                className="p-2 text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Delivery location */}
            <div className="mt-3 flex w-full max-w-xs items-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-2">
              <MapPin size={14} className="text-[color:var(--secondary-text)]" />
              <select
                value={deliveryLocation || selectedProduct.location}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                aria-label="Delivery location"
                className="w-full bg-transparent text-xs text-[color:var(--primary-text)] outline-none"
              >
                {BM_LOCATIONS.map((place) => (
                  <option key={place} value={place}>
                    {place}, Gujranwala
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="mt-3 flex max-w-sm gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] px-3 py-2 text-xs font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
              >
                <ShoppingCart size={14} />
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleViewSupplier}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[var(--charcoal-black)] bg-[var(--white-cards)] px-3 py-2 text-xs font-semibold text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
              >
                <Store size={14} />
                View Supplier
              </button>
            </div>

            <p className="mt-3 text-[11px] text-[color:var(--secondary-text)]">
              Supplier:{" "}
              <span className="font-semibold text-[color:var(--primary-text)]">
                {selectedProduct.shop}
              </span>
            </p>
          </div>
        </div>

        {/* SPECIFICATIONS */}
        <section className="mt-6 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
          <h2 className={detailHeading}>Specifications</h2>

          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[280px] border-collapse text-xs">
              <tbody>
                <tr className="border border-[color:var(--border-color)]">
                  <td className="px-3 py-2 text-[color:var(--secondary-text)]">Category</td>
                  <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
                    {selectedProduct.category}
                  </td>
                </tr>
                <tr className="border border-[color:var(--border-color)]">
                  <td className="px-3 py-2 text-[color:var(--secondary-text)]">Condition</td>
                  <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
                    {selectedProduct.condition === "reused" ? "Reused" : "New"}
                  </td>
                </tr>
                {selectedProduct.specifications.map((spec) => (
                  <tr
                    key={spec.label}
                    className="border border-[color:var(--border-color)]"
                  >
                    <td className="px-3 py-2 text-[color:var(--secondary-text)]">
                      {spec.label}
                    </td>
                    <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
                      {spec.value}
                    </td>
                  </tr>
                ))}
                <tr className="border border-[color:var(--border-color)]">
                  <td className="px-3 py-2 text-[color:var(--secondary-text)]">Unit</td>
                  <td className="px-3 py-2 text-right text-[color:var(--primary-text)]">
                    Per {selectedProduct.unit}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TABS: click par us section tak scroll hota hai */}
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => handleTabClick("description")}
            className={`rounded-full border px-4 py-1 text-xs transition-colors ${
              activeTab === "description"
                ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
            }`}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => handleTabClick("reviews")}
            className={`rounded-full border px-4 py-1 text-xs transition-colors ${
              activeTab === "reviews"
                ? "border-[var(--primary-yellow)] bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]"
                : "border-[color:var(--border-color)] bg-[var(--white-cards)] text-[color:var(--primary-text)]"
            }`}
          >
            Reviews
          </button>
        </div>

        {/* DESCRIPTION */}
        <section
          id="description"
          className="mt-4 scroll-mt-24 space-y-4 text-xs text-[color:var(--secondary-text)]"
        >
          <h3 className={detailHeading}>
            {selectedProduct.name} – Quality {selectedProduct.category} for Your
            Construction Needs
          </h3>

          <div>
            <h4 className={detailHeading}>Product Overview</h4>
            <p className="mt-1">{selectedProduct.overview}</p>
          </div>

          <div>
            <h4 className={detailHeading}>Key Features:</h4>
            <div className="mt-1 space-y-1">
              {selectedProduct.features.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className={detailHeading}>Applications:</h4>
            <div className="mt-1 space-y-1">
              {selectedProduct.applications.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className={detailHeading}>Benefits:</h4>
            <div className="mt-1 space-y-1">
              {selectedProduct.benefits.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div>
            <h4 className={detailHeading}>Why Choose This Product?</h4>
            <p className="mt-1">{selectedProduct.whyChoose}</p>
          </div>

          <p className="text-[11px]">
            Sample description shown for demonstration purposes.
          </p>
        </section>

        {/* REVIEWS (description ke neeche, khud badalte rehte hain) */}
        <section id="reviews" className="mt-8 scroll-mt-24">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className={detailHeading}>
              What buyers say about {selectedProduct.name}
            </h2>
            <button
              type="button"
              onClick={() => setReviewOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-[var(--primary-yellow)] px-3 py-1 text-[11px] font-semibold text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
            >
              <Plus size={12} />
              Add a Review
            </button>
          </div>

          <div ref={reviewBoxRef} className="mt-3 flex overflow-x-hidden">
            {selectedProduct.reviews
              .concat(selectedProduct.reviews)
              .map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="w-full flex-none pr-3 sm:w-1/2 lg:w-1/4"
                >
                  <div className="h-full rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3 shadow-sm">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={11}
                          className={
                            star <= review.rating
                              ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
                              : "text-[color:var(--border-color)]"
                          }
                        />
                      ))}
                    </div>
                    <p className="mt-2 min-h-12 text-xs text-[color:var(--primary-text)]">
                      {review.comment}
                    </p>
                    <div className="mt-2 flex items-center gap-2 border-t border-[color:var(--border-color)] pt-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[color:var(--border-color)] text-[color:var(--secondary-text)]">
                        <User size={12} />
                      </span>
                      <div>
                        <p className="text-[11px] font-medium text-[color:var(--primary-text)]">
                          {review.name}
                        </p>
                        <p className="text-[10px] text-[color:var(--secondary-text)]">
                          {review.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <p className="mt-2 text-[11px] text-[color:var(--secondary-text)]">
            Sample reviews shown for demonstration purposes.
          </p>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="mt-8">
          <h2 className={detailHeading}>Related Products</h2>

          {BM_MATERIAL_PRODUCTS.filter(
            (product) =>
              product.category === selectedProduct.category &&
              product.id !== selectedProduct.id
          ).length === 0 ? (
            <p className="mt-3 rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-3 text-xs text-[color:var(--secondary-text)]">
              No other sample products in this category yet.
            </p>
          ) : (
            <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {BM_MATERIAL_PRODUCTS.filter(
                (product) =>
                  product.category === selectedProduct.category &&
                  product.id !== selectedProduct.id
              ).map((product) => (
                <BmProductCard
                  key={product.id}
                  name={product.name}
                  slug={product.slug}
                  categorySlug={product.categorySlug}
                  price={product.price}
                  unit={product.unit}
                  image={product.image}
                  shop={product.shop}
                  location={product.location}
                  condition={product.condition}
                  is_featured={product.is_featured}
                />
              ))}
            </div>
          )}
        </section>

        {/* ASK QUESTION MODAL */}
        {questionOpen && (
          <div
            onClick={handleCloseQuestion}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-[color:var(--primary-text)]">
                  Ask a Question
                </h2>
                <button
                  type="button"
                  onClick={handleCloseQuestion}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mb-4 text-xs text-[color:var(--secondary-text)]">
                About {selectedProduct.name} • {selectedProduct.shop}
              </p>

              <div>
                <label htmlFor="bm-q-name" className={labelClass}>
                  Your Name
                </label>
                <input
                  id="bm-q-name"
                  value={questionForm.name}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, name: e.target.value })
                  }
                  className={fieldClass}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="bm-q-text" className={labelClass}>
                  Your Question
                </label>
                <textarea
                  id="bm-q-text"
                  rows={4}
                  value={questionForm.question}
                  onChange={(e) =>
                    setQuestionForm({ ...questionForm, question: e.target.value })
                  }
                  className={fieldClass}
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseQuestion}
                  className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitQuestion}
                  className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
                >
                  Send Question
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD REVIEW MODAL */}
        {reviewOpen && (
          <div
            onClick={handleCloseReview}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-xl bg-[var(--white-cards)] p-5 shadow-xl sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-[color:var(--primary-text)]">
                  Add a Review
                </h2>
                <button
                  type="button"
                  onClick={handleCloseReview}
                  aria-label="Close modal"
                  className="rounded-md p-1 text-[color:var(--secondary-text)] hover:bg-[var(--off-white-background)]"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mb-4 text-xs text-[color:var(--secondary-text)]">
                {selectedProduct.name}
              </p>

              <div>
                <label htmlFor="bm-r-name" className={labelClass}>
                  Your Name
                </label>
                <input
                  id="bm-r-name"
                  value={reviewForm.name}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, name: e.target.value })
                  }
                  className={fieldClass}
                />
              </div>

              <div className="mt-4">
                <span className={labelClass}>Rating</span>
                <div className="mt-1 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      aria-label={`${star} star`}
                    >
                      <Star
                        size={22}
                        className={
                          star <= reviewForm.rating
                            ? "fill-[var(--primary-yellow)] text-[color:var(--primary-yellow)]"
                            : "text-[color:var(--border-color)]"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="bm-r-text" className={labelClass}>
                  Your Review
                </label>
                <textarea
                  id="bm-r-text"
                  rows={4}
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  className={fieldClass}
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseReview}
                  className="rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-2 text-sm text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitReview}
                  className="rounded-md bg-[var(--primary-yellow)] px-4 py-2 text-sm text-[color:var(--charcoal-black)] hover:bg-[var(--hover-yellow)]"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;