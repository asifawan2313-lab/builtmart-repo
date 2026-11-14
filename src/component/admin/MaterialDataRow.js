import { ImageIcon } from "lucide-react";
import React from "react";

const MaterialDataRow = ({m}) => {
  return (
    <tr
      key={m.id}
      className={`border-t border-[color:var(--border-color)] ${
        m.category === "Category removed" ? "bg-yellow-50" : ""
      }`}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-14 shrink-0 items-center justify-center rounded-md bg-[var(--charcoal-black)] text-[color:var(--white-cards)]">
            <ImageIcon size={20} />
          </span>
          <span className="font-medium text-[color:var(--primary-text)]">
            {m.name}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-[color:var(--primary-text)]">
        {m.category}
      </td>
      <td className="px-4 py-3 text-[color:var(--primary-text)]">
        {m.supplier}
      </td>
      <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.price}</td>
      <td className="px-4 py-3 text-[color:var(--primary-text)]">{m.stock}</td>
      <td className="px-4 py-3">
        <span
          className={`bmMaterialStatusBadge rounded-full px-2.5 py-1 text-xs ring-1 ${
            m.status == 'active'
              ? "bg-green-50 text-green-700 ring-green-200"
              : "bg-gray-100 text-gray-600 ring-gray-200"
          }`}
        >
          {m.status == 'deactive' ? "Active" : "Unavailable"}
        </span>
      </td>
      <td className="px-4 py-3 text-[color:var(--primary-text)]">
        {m.complaints}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleViewClick(m.name)}
            className={"bmMaterialViewButton rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"}
          >
            View
          </button>
          <button
            type="button"
            onClick={() => handleToggleClick(m.id)}
            className={"bmMaterialToggleButton rounded-md border border-[color:var(--border-color)] bg-[var(--white-cards)] px-3 py-1.5 text-xs text-[color:var(--primary-text)] hover:bg-[var(--off-white-background)]"}
          >
            {m.status == 'active' ? "Deactivate" : "Activate"}
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MaterialDataRow;
