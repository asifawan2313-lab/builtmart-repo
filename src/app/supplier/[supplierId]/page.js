import { notFound } from "next/navigation";
import { suppliers, getSupplier } from "../../../component/suppliers/SupplierGrid/suppliersData";
import SupplierShopHero from "../../../component/suppliers/SupplierShop/SupplierShopHero";
import SupplierShopBreadcrumb from "../../../component/suppliers/SupplierShop/SupplierShopBreadcrumb";
import SupplierShopContent from "../../../component/suppliers/SupplierShop/SupplierShopContent";

export function generateStaticParams() {
  return suppliers.map((s) => ({ supplierId: s.slug }));
}

export async function generateMetadata({ params }) {
  const { supplierId } = await params;
  const supplier = getSupplier(supplierId);
  if (!supplier) return { title: "Shop not found | BuildMart" };

  return { title: `${supplier.name} | BuildMart`, description: supplier.description };
}

export default async function SupplierShopPage({ params }) {
  const { supplierId } = await params;
  const supplier = getSupplier(supplierId);

  if (!supplier) notFound();

  return (
    <main className="min-h-screen bg-[#F4F4F2]">
      <SupplierShopHero supplier={supplier} />
      {/* Agli files yahan lagengi (Breadcrumb, Content) */}
      <SupplierShopBreadcrumb name={supplier.name} />
      <SupplierShopContent supplier={supplier} />
    </main>
  );
}