// // icon: lucide icon component. Card sirf dikhta hai, koi link nahi
// const BmCustomerStatCard = ({ label, value, icon: StatIcon }) => (
//   <article className="flex items-center gap-4 rounded-xl border border-[#E2E4E7] bg-white p-4 shadow-sm">
//     <span className="flex h-14 w-14 shrink-0 items-center justify-center text-[#202124]">
//       <StatIcon size={32} aria-hidden="true" />
//     </span>

//     <div className="min-w-0 flex-1">
//       <p className="truncate text-sm text-[#45484D]">{label}</p>
//       <p className="text-3xl font-extrabold text-[#202124]">{value}</p>
//     </div>
//   </article>
// );

// export default BmCustomerStatCard;




import Link from "next/link";

// icon: lucide icon component. href ho to poora card link ban jata hai
const BmCustomerStatCard = ({ label, value, icon: StatIcon, href }) => {
  const card = (
    <article
      className={`flex items-center gap-4 rounded-xl border border-[#E2E4E7] bg-white p-4 shadow-sm ${
        href ? "transition-colors hover:border-[#FDC716]" : ""
      }`}
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center text-[#202124]">
        <StatIcon size={32} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-[#45484D]">{label}</p>
        <p className="text-3xl font-extrabold text-[#202124]">{value}</p>
      </div>
    </article>
  );

  return href ? <Link href={href}>{card}</Link> : card;
};

export default BmCustomerStatCard;
