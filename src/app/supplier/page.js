
import SupplierHero from "../../component/suppliers/SupplierJoinHero/SupplierHero";

import SupplierSearchBar from "../../component/suppliers/SupplierSearchbar/SupplierSearchBar";
import SupplierCategoryBar from "../../component/suppliers/SupplierCategoryBar/SupplierCategoryBar";
import SupplierFilterBar from "../../component/suppliers/SupplierFilterBar/SupplierFilterBar";
import SupplierResultsBar from "../../component/suppliers/SupplierResultsBar/SupplierResultsBar";
import SupplierGrid from "../../component/suppliers/SupplierGrid/SupplierGrid";
export default function SupplierPage() {
  return (
    <main>
      <SupplierHero />
      <SupplierSearchBar />
         <SupplierCategoryBar />
           <SupplierFilterBar />
           <SupplierResultsBar />
           <SupplierGrid />
    </main>
  );
}
