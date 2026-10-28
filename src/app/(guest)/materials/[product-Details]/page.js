import ProductGallery from "../../../../component/product-Details/ProductGallery";
import ProductInfo from "../../../../component/product-Details/ProductInfo";
import TraderInfo from "../../../../component/product-Details/TraderInfo";
import ProductTabs from "../../../../component/product-Details/ProductTabs";
import ProductQuestions from "../../../../component/product-Details/ProductQuestions";

export default function ProductPage() {
  return (
    <section className="w-full px-4 py-8 sm:px-8">
      {/* Gallery (left) and product info (right) */}
      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery />
        <ProductInfo />
      </div>

      {/* Supplier */}
      <div className="mt-8">
        <TraderInfo />
      </div>

      {/* Description and reviews */}
      <div className="mt-10">
        <ProductTabs />
      </div>

      {/* Questions */}
      <div className="mt-10">
        <ProductQuestions />
      </div>
    </section>
  );
}