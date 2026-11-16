import React from 'react'

const BmriderDisputes = () => {
    const { id, subject, against, role, date, status }=RiderDisputesPage;
  return (
    // <div>BmriderDisputes</div>
     <li key={id} className="flex flex-wrap items-center gap-3 px-4 py-4 sm:flex-nowrap sm:gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
                      <FileWarning size={20} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1 basis-48">
                      <p className="truncate text-sm font-semibold text-[#202124]">{subject}</p>
                      <p className="truncate text-xs text-[#45484D]">
                        {against} · {role}
                      </p>
                      <p className="truncate text-xs text-[#45484D]">
                        #{id} · {date}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass[status]}`}>{status}</span>
                    <button
                      type="button"
                      onClick={() => handleView(id)}
                      className="inline-flex h-9 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#D9E3E9] bg-white px-4 text-xs font-semibold text-[#202124] transition-colors hover:border-[#FDC716] hover:bg-[#FDC716]/20"
                    >
                      View
                      <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </li>
  )
}

export default BmriderDisputes