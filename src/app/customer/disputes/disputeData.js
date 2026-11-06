// Demo data: sab naam, tareekhen aur likhai sirf UI ke liye hain
export const disputes = [
  { id: "DSP-2005", subject: "Wrong quantity delivered", supplier: "City Material Traders", supplierLocation: "Satellite Town, Gujranwala", material: "Ravi Sand (Rait)", issueType: "Wrong quantity", token: "BM-INQ-1002", date: "Nov 3, 2026", status: "Open", evidence: 2,
    description: "I ordered 2 trolleys of sand but only 1 trolley was delivered.", adminResponse: null, outcome: "" },
  { id: "DSP-2004", subject: "Quality not as described", supplier: "Al-Noor Building Store", supplierLocation: "GT Road, Gujranwala", material: "Red Clay Bricks (A-Class)", issueType: "Quality issue", token: "BM-INQ-1001", date: "Nov 3, 2026", status: "Under Review", evidence: 3,
    description: "The bricks delivered were of lower quality than the A-Class listing. Many bricks were cracked and uneven in size.",
    adminResponse: { text: "We have contacted the supplier and asked for a reply within 3 working days. You will be notified once there is an update.", date: "Nov 4, 2026" }, outcome: "" },
  { id: "DSP-2003", subject: "Price differs from listing", supplier: "Zahid Construction Materials", supplierLocation: "Peoples Colony, Gujranwala", material: "Steel Saria Grade 60", issueType: "Price mismatch", token: "BM-INQ-1003", date: "Oct 28, 2026", status: "Under Review", evidence: 1,
    description: "The price charged was higher than the rate shown on the listing.",
    adminResponse: { text: "We are checking the listing price with the supplier.", date: "Oct 29, 2026" }, outcome: "" },
  { id: "DSP-2002", subject: "Damaged tiles received", supplier: "Punjab Building Materials", supplierLocation: "GT Road, Gujranwala", material: "Porcelain Floor Tiles", issueType: "Quality issue", token: "BM-INQ-1004", date: "Oct 20, 2026", status: "Resolved", evidence: 2,
    description: "Several tiles in the delivered boxes were broken.",
    adminResponse: { text: "The supplier has accepted the issue and will replace the broken tiles.", date: "Oct 22, 2026" }, outcome: "The supplier agreed to replace the damaged tiles." },
  { id: "DSP-2001", subject: "No response from supplier", supplier: "Rehman Builders Supply", supplierLocation: "Model Town, Gujranwala", material: "Aluminium Sliding Window", issueType: "No response", token: "BM-INQ-1006", date: "Oct 12, 2026", status: "Rejected", evidence: 0,
    description: "The supplier did not reply to my inquiry.",
    adminResponse: { text: "Our review shows the supplier replied within the allowed time.", date: "Oct 14, 2026" }, outcome: "Rejected: the supplier had replied within the allowed time." },
];

export const getDispute = (id) => disputes.find((dispute) => dispute.id === id);

// Status badge ke Tailwind classes (list aur detail dono use karte hain)
export const statusClass = {
  Open: "bg-[#FDC716]/25 text-[#202124]",
  "Under Review": "bg-blue-50 text-blue-700",
  Resolved: "bg-green-50 text-green-700",
  Rejected: "bg-red-50 text-red-700",
};