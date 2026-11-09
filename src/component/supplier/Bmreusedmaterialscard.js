"use client";

import Image from "next/image";
import { CircleHelp, MapPin, MessageSquare } from "lucide-react";

// Reused listings ke cards. Data aur handlers page se aate hain.
export default function BmSupplierReusedCards({ listings, onDetails, onMessage }) {
  return (
    <>
      {listings.map((item) => (
        <div
          key={item.id}
          className="bmReusedCards-card flex min-w-0 flex-col overflow-hidden rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm"
        >
          {/* Image + badge */}
          <div className="bmReusedCards-imageWrap relative aspect-[16/9] w-full overflow-hidden bg-[var(--border-color)]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
              className="object-cover"
            />
            <span className="absolute left-3 top-3 rounded-md bg-[var(--charcoal-black)] px-2.5 py-1 text-[11px] font-[family-name:Poppins-Medium] text-[color:var(--white-cards)]">
              Reused · Customer
            </span>
          </div>

          {/* Details */}
          <div className="bmReusedCards-body flex flex-1 flex-col p-4">
            <h3 className="break-words text-base leading-tight text-[color:var(--primary-text)] sm:text-lg">
              {item.title}
            </h3>
            <p className="mt-1 break-words text-xs text-[color:var(--secondary-text)]">
              {item.category} · by {item.seller} · {item.date}
            </p>

            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="min-w-0 text-[color:var(--primary-text)]">
                <span className="font-[family-name:Baloo2-Bold] text-xl sm:text-2xl">
                  Rs. {item.price.toLocaleString()}
                </span>
                <span className="ml-1 text-xs text-[color:var(--secondary-text)]">
                  / {item.unit}
                </span>
              </p>
              <span className="flex shrink-0 items-center gap-1 text-xs text-[color:var(--secondary-text)]">
                <MapPin size={13} />
                {item.location}
              </span>
            </div>

            {/* Buttons: hamesha card ke neeche */}
            <div className="mt-4 grid flex-1 grid-cols-1 content-end gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onDetails(item.id)}
                className="bmReusedCards-detailsBtn flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] py-2 text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--off-white-background)]"
              >
                <CircleHelp size={14} />
                Details / Enquire
              </button>
              <button
                type="button"
                onClick={() => onMessage(item.id)}
                className="bmReusedCards-messageBtn flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[var(--primary-yellow)] py-2 text-xs font-[family-name:Poppins-Medium] text-[color:var(--primary-text)] transition-colors duration-300 hover:bg-[var(--hover-yellow)]"
              >
                <MessageSquare size={14} />
                Message
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}