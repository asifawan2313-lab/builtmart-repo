import React from 'react'

const BmInquiries = (
    {
       
      item,
      last,
      onSelect,
      selectedId,
      statusClass,
      
    }
) => {
     const {
    id,
    customer,
    material,
     supplier,
    date,
    token,
    status,
  } = item;
  const displayName = customer || supplier;
  return (
    // 
     <li key={id} className="border-b border-[#E2E4E7]">
            <button
              type="button"
              onClick={() => onSelect(id)}
              className={`flex w-full cursor-pointer items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-[#F4F4F2] ${
                id === selectedId ? "bg-[#F4F4F2]" : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#202124] text-base font-bold text-[#FDC716]">
                {displayName[0]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-[#202124]">{displayName}</span>
                  <span className="shrink-0 text-[11px] text-[#45484D]">{date}</span>
                </span>
                <span className="block truncate text-xs text-[#45484D]">{material}</span>
                <span className="block truncate text-xs text-[#45484D]">{last.from === "me" ? `You: ${last.text}` : last.text}</span>
                <span className="mt-1.5 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-[#384452]">{token}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusClass[status]}`}>{status}</span>
                </span>
              </span>
            </button>
          </li>
  )
}

export default BmInquiries