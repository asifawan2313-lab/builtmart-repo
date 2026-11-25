import Image from "next/image";
import Link from "next/link";

// type = "new" ya "reused" (dono categories isi ek card se dikhti hain)
// image null ho to "No image" dikhta hai
const BmMaterialCategoryCard = ({ name, image, slug, type }) => (
  <Link
    href={`/materials/${slug}`}
    className="relative block rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-2 text-center shadow-sm transition-all hover:border-[var(--primary-yellow)] hover:shadow-md"
  >
    {type === "reused" && (
      <span className="absolute left-3 top-3 z-10 rounded-md bg-[#384452] px-2 py-0.5 text-[10px] font-semibold text-white">
        Reused
      </span>
    )}

    <div className="relative h-20 w-full overflow-hidden rounded-md bg-[var(--border-color)] sm:h-24">
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          unoptimized
          sizes="(min-width: 768px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-xs text-[color:var(--secondary-text)]">
          No image
        </span>
      )}
    </div>

    <p className="mt-2 text-xs font-medium text-[color:var(--primary-text)] sm:text-sm">
      {name}
    </p>
  </Link>
);

export default BmMaterialCategoryCard;