"use client";

// Status chip ke rang
const BM_STATUS_COLORS = {
  Open: "bg-orange-100 text-orange-500",
  "Under Review": "bg-blue-100 text-blue-600",
  Resolved: "bg-green-100 text-green-600",
};

// Table ke headings
const BM_HEADINGS = ["Ticket ID", "Order", "Customer", "Category", "Date", "Status", ""];

// Tickets ki table. Data aur handler page se aate hain.
export default function BmSupplierDisputesTable({ disputes, onOpen }) {
  return (
    <div className="bmDisputesTable-wrap overflow-x-auto rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] shadow-sm">
      <table className="bmDisputesTable-table w-full min-w-[760px] text-left">
        <thead className="bg-[var(--off-white-background)]">
          <tr>
            {BM_HEADINGS.map((heading, index) => (
              <th
                key={index}
                className="px-5 py-3 text-[11px] font-[family-name:Poppins-Medium] uppercase tracking-wider text-[color:var(--secondary-text)]"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {disputes.map((item) => (
            <tr
              key={item.id}
              className="border-t border-[color:var(--border-color)] text-sm text-[color:var(--primary-text)]"
            >
              <td className="px-5 py-4 font-[family-name:Poppins-Medium]">{item.ticket}</td>
              <td className="px-5 py-4">{item.order}</td>
              <td className="px-5 py-4">{item.customer}</td>
              <td className="px-5 py-4">{item.category}</td>
              <td className="px-5 py-4">{item.date}</td>
              <td className="px-5 py-4">
                <span
                  className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-[family-name:Poppins-Medium] ${
                    BM_STATUS_COLORS[item.status]
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-5 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onOpen(item.id)}
                  className="bmDisputesTable-openBtn cursor-pointer rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-4 py-1.5 text-xs transition-colors duration-300 hover:bg-[var(--off-white-background)]"
                >
                  Open
                </button>
              </td>
            </tr>
          ))}

          {/* Koi ticket na ho */}
          {disputes.length === 0 && (
            <tr>
              <td
                colSpan={BM_HEADINGS.length}
                className="px-5 py-10 text-center text-sm text-[color:var(--secondary-text)]"
              >
                Abhi koi dispute ticket nahi hai.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}