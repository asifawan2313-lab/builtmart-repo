import { getSupplier, suppliers } from "../../../component/supplier/SupplierGrid/SupplierData";

// Har supplier ka page pehle se bana lena
export function generateStaticParams() {
  return suppliers.map((s) => ({ slug: s.slug }));
}

// Browser tab ka title aur description (har shop ka alag)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const supplier = getSupplier(slug);

  if (!supplier) return { title: "Shop not found | BuildMart" };

  return {
    title: `${supplier.name} | BuildMart`,
    description: supplier.description,
  };
}

export default function SupplierShopLayout({ children }) {
  return children;
}