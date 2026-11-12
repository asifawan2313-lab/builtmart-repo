// import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
// import bricks from "../../../assets/images/guest/card/briks.jpg";
// import sand from "../../../assets/images/guest/card/sand.jpg";
// import paint from "../../../assets/images/guest/card/paint.jpg";
// import tiles from "../../../assets/images/guest/card/tiles.jpg";
// import secWindow from "../../../assets/images/guest/card/secwindow.jpg";
// import glassWindow from "../../../assets/images/guest/card/window.jpg";
// import copperWire from "../../../assets/images/guest/card/copperwire.jpg";
// import doors from "../../../assets/images/guest/card/doorsWindows.jpg";
// import grills from "../../../assets/images/guest/card/grills.jpg";

// // Demo data: sab naam, rates aur numbers sirf UI ke liye hain
// const delivery = { receiver: "Ahmed Khan", phone: "0300 1234567", address: "House 24, Model Town, Gujranwala" };

// // rider: null = abhi rider book nahi hua (card nahi dikhega)
// export const orders = [
//   { id: 1, code: "BM-1001", item: "Steel Saria Grade 60", category: "Steel & Welding", supplier: "Zahid Construction Materials", supplierLocation: "Peoples Colony, Gujranwala", date: "Nov 2, 2026", status: "Delivered", qty: 250, rate: "Rs. 270", amount: "Rs. 67,500", image: steelSaria, ...delivery,
//     rider: { name: "Bilal Ahmad", phone: "0333 1112223", vehicle: "Shehzore · GRW-1180", status: "Delivered", timeLabel: "Delivered On", time: "Nov 2, 2026" } },
//   { id: 2, code: "BM-1002", item: "Red Clay Bricks (A-Class)", category: "Bricks & Blocks", supplier: "Al-Noor Building Store", supplierLocation: "GT Road, Gujranwala", date: "Oct 30, 2026", status: "Processing", qty: 2, rate: "Rs. 20,000", amount: "Rs. 40,000", image: bricks, ...delivery, rider: null },
//   { id: 3, code: "BM-1003", item: "Ravi Sand (Rait)", category: "Sand & Crush", supplier: "City Material Traders", supplierLocation: "Satellite Town, Gujranwala", date: "Oct 27, 2026", status: "Shipped", qty: 2, rate: "Rs. 9,000", amount: "Rs. 18,000", image: sand, ...delivery,
//     rider: { name: "Imran Ali", phone: "0312 7654321", vehicle: "Loader rickshaw · GRW-2045", status: "On the way", timeLabel: "Expected Delivery", time: "Today, 3:00 PM" } },
//   { id: 4, code: "BM-1004", item: "Gold Emulsion Paint", category: "Paints & Finishes", supplier: "Modern Builders Mart", supplierLocation: "Satellite Town, Gujranwala", date: "Oct 24, 2026", status: "Processing", qty: 2, rate: "Rs. 7,800", amount: "Rs. 15,600", image: paint, ...delivery, rider: null },
//   { id: 5, code: "BM-1005", item: "Porcelain Floor Tiles", category: "Architectural Products", supplier: "Punjab Building Materials", supplierLocation: "GT Road, Gujranwala", date: "Oct 18, 2026", status: "Delivered", qty: 400, rate: "Rs. 105", amount: "Rs. 42,000", image: tiles, ...delivery, rider: null },
//   { id: 6, code: "BM-1006", item: "Aluminium Sliding Window", category: "Doors & Windows", supplier: "Rehman Builders Supply", supplierLocation: "Model Town, Gujranwala", date: "Oct 12, 2026", status: "Delivered", qty: 3, rate: "Rs. 9,500", amount: "Rs. 28,500", image: secWindow, ...delivery, rider: null },
//   { id: 7, code: "BM-1007", item: "Tempered Glass Window", category: "Glass & Glazing", supplier: "Ali & Sons Traders", supplierLocation: "Model Town, Gujranwala", date: "Oct 5, 2026", status: "Delivered", qty: 20, rate: "Rs. 450", amount: "Rs. 9,000", image: glassWindow, ...delivery, rider: null },
//   { id: 8, code: "BM-1008", item: "Copper Electrical Wire", category: "Electrical & Lighting", supplier: "Rana Construction Supply", supplierLocation: "Satellite Town, Gujranwala", date: "Sep 28, 2026", status: "Delivered", qty: 3, rate: "Rs. 3,200", amount: "Rs. 9,600", image: copperWire, ...delivery, rider: null },
//   { id: 9, code: "BM-1009", item: "Weather Shield Paint", category: "Paints & Finishes", supplier: "Modern Builders Mart", supplierLocation: "Satellite Town, Gujranwala", date: "Sep 21, 2026", status: "Delivered", qty: 2, rate: "Rs. 9,500", amount: "Rs. 19,000", image: paint, ...delivery, rider: null },
//   { id: 10, code: "BM-1010", item: "Chenab Sand", category: "Sand & Crush", supplier: "Rehman Builders Supply", supplierLocation: "Model Town, Gujranwala", date: "Sep 14, 2026", status: "Delivered", qty: 2, rate: "Rs. 8,500", amount: "Rs. 17,000", image: sand, ...delivery, rider: null },
//   { id: 11, code: "BM-1011", item: "Wooden Door (Deodar)", category: "Doors & Windows", supplier: "City Material Traders", supplierLocation: "Satellite Town, Gujranwala", date: "Sep 6, 2026", status: "Delivered", qty: 2, rate: "Rs. 18,000", amount: "Rs. 36,000", image: doors, ...delivery, rider: null },
//   { id: 12, code: "BM-1012", item: "Steel Grills & Gates", category: "Metal & Aluminum Works", supplier: "Zahid Construction Materials", supplierLocation: "Peoples Colony, Gujranwala", date: "Aug 29, 2026", status: "Delivered", qty: 6, rate: "Rs. 9,000", amount: "Rs. 54,000", image: grills, ...delivery, rider: null },
// ];

// export const getOrder = (code) => orders.find((order) => order.code === code);







import steelSaria from "../../../assets/images/guest/card/steelSaria.jpg";
import bricks from "../../../assets/images/guest/card/briks.jpg";
import sand from "../../../assets/images/guest/card/sand.jpg";
import paint from "../../../assets/images/guest/card/paint.jpg";
import tiles from "../../../assets/images/guest/card/tiles.jpg";
import secWindow from "../../../assets/images/guest/card/secwindow.jpg";
import glassWindow from "../../../assets/images/guest/card/window.jpg";
import copperWire from "../../../assets/images/guest/card/copperwire.jpg";
import doors from "../../../assets/images/guest/card/doorsWindows.jpg";
import grills from "../../../assets/images/guest/card/grills.jpg";

// Demo data: sab naam, rates aur numbers sirf UI ke liye hain
const delivery = { receiver: "Ahmed Khan", phone: "0300 1234567", address: "House 24, Model Town, Gujranwala" };

// rider: null = abhi rider book nahi hua (card nahi dikhega)
// status "Rejected" = supplier ne order reject kiya (rejectReason dikhta hai)
export const orders = [
  { id: 1, code: "BM-1001", item: "Steel Saria Grade 60", category: "Steel & Welding", supplier: "Zahid Construction Materials", supplierLocation: "Peoples Colony, Gujranwala", date: "Nov 2, 2026", status: "Delivered", qty: 250, rate: "Rs. 270", amount: "Rs. 67,500", image: steelSaria, ...delivery,
    rider: { name: "Bilal Ahmad", phone: "0333 1112223", vehicle: "Shehzore · GRW-1180", status: "Delivered", timeLabel: "Delivered On", time: "Nov 2, 2026" } },
  { id: 2, code: "BM-1002", item: "Red Clay Bricks (A-Class)", category: "Bricks & Blocks", supplier: "Al-Noor Building Store", supplierLocation: "GT Road, Gujranwala", date: "Oct 30, 2026", status: "Processing", qty: 2, rate: "Rs. 20,000", amount: "Rs. 40,000", image: bricks, ...delivery, rider: null },
  { id: 3, code: "BM-1003", item: "Ravi Sand (Rait)", category: "Sand & Crush", supplier: "City Material Traders", supplierLocation: "Satellite Town, Gujranwala", date: "Oct 27, 2026", status: "Shipped", qty: 2, rate: "Rs. 9,000", amount: "Rs. 18,000", image: sand, ...delivery,
    rider: { name: "Imran Ali", phone: "0312 7654321", vehicle: "Loader rickshaw · GRW-2045", status: "On the way", timeLabel: "Expected Delivery", time: "Today, 3:00 PM" } },
  { id: 4, code: "BM-1004", item: "Gold Emulsion Paint", category: "Paints & Finishes", supplier: "Modern Builders Mart", supplierLocation: "Satellite Town, Gujranwala", date: "Oct 24, 2026", status: "Processing", qty: 2, rate: "Rs. 7,800", amount: "Rs. 15,600", image: paint, ...delivery, rider: null },
  { id: 5, code: "BM-1005", item: "Porcelain Floor Tiles", category: "Architectural Products", supplier: "Punjab Building Materials", supplierLocation: "GT Road, Gujranwala", date: "Oct 18, 2026", status: "Delivered", qty: 400, rate: "Rs. 105", amount: "Rs. 42,000", image: tiles, ...delivery, rider: null },
  { id: 6, code: "BM-1006", item: "Aluminium Sliding Window", category: "Doors & Windows", supplier: "Rehman Builders Supply", supplierLocation: "Model Town, Gujranwala", date: "Oct 12, 2026", status: "Delivered", qty: 3, rate: "Rs. 9,500", amount: "Rs. 28,500", image: secWindow, ...delivery, rider: null },
  { id: 7, code: "BM-1007", item: "Tempered Glass Window", category: "Glass & Glazing", supplier: "Ali & Sons Traders", supplierLocation: "Model Town, Gujranwala", date: "Oct 5, 2026", status: "Delivered", qty: 20, rate: "Rs. 450", amount: "Rs. 9,000", image: glassWindow, ...delivery, rider: null },
  { id: 8, code: "BM-1008", item: "Copper Electrical Wire", category: "Electrical & Lighting", supplier: "Rana Construction Supply", supplierLocation: "Satellite Town, Gujranwala", date: "Sep 28, 2026", status: "Delivered", qty: 3, rate: "Rs. 3,200", amount: "Rs. 9,600", image: copperWire, ...delivery, rider: null },
  { id: 9, code: "BM-1009", item: "Weather Shield Paint", category: "Paints & Finishes", supplier: "Modern Builders Mart", supplierLocation: "Satellite Town, Gujranwala", date: "Sep 21, 2026", status: "Rejected", rejectReason: "Item is out of stock.", qty: 2, rate: "Rs. 9,500", amount: "Rs. 19,000", image: paint, ...delivery, rider: null },
  { id: 10, code: "BM-1010", item: "Chenab Sand", category: "Sand & Crush", supplier: "Rehman Builders Supply", supplierLocation: "Model Town, Gujranwala", date: "Sep 14, 2026", status: "Delivered", qty: 2, rate: "Rs. 8,500", amount: "Rs. 17,000", image: sand, ...delivery, rider: null },
  { id: 11, code: "BM-1011", item: "Wooden Door (Deodar)", category: "Doors & Windows", supplier: "City Material Traders", supplierLocation: "Satellite Town, Gujranwala", date: "Sep 6, 2026", status: "Rejected", rejectReason: "Supplier cannot deliver to your area.", qty: 2, rate: "Rs. 18,000", amount: "Rs. 36,000", image: doors, ...delivery, rider: null },
  { id: 12, code: "BM-1012", item: "Steel Grills & Gates", category: "Metal & Aluminum Works", supplier: "Zahid Construction Materials", supplierLocation: "Peoples Colony, Gujranwala", date: "Aug 29, 2026", status: "Delivered", qty: 6, rate: "Rs. 9,000", amount: "Rs. 54,000", image: grills, ...delivery, rider: null },
];

export const getOrder = (code) => orders.find((order) => order.code === code);