import Image from "next/image";
import Link from "next/link";

const cardClass =
  "flex h-full w-full cursor-pointer flex-col gap-2 rounded-xl border border-[#E2E4E7] bg-white p-2.5 text-center text-[#202124] shadow-sm transition-all duration-300 hover:border-[#ffc61a] hover:bg-[#ffc61a]/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc61a]/60";

// Reusable category card: upar image, neeche naam
// href diya ho to link banta hai, warna button
const MaterialCategoryCard = ({ name, image, href }) => {
  const content = (
    <>
      <span className="relative block aspect-square w-full overflow-hidden rounded-lg bg-[#E2E4E7]">
        {image ? (
          <Image
            src={image}
            alt={`${name} (demo image)`}
            fill
            sizes="(min-width: 1024px) 140px, 30vw"
            className="object-cover"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-xs text-[#45484D]">
            No image
          </span>
        )}
      </span>
      <span className="line-clamp-2 min-h-8 text-xs font-medium text-[#202124]">{name}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} title={name} className={cardClass}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" title={name} className={cardClass}>
      {content}
    </button>
  );
};

export default MaterialCategoryCard;