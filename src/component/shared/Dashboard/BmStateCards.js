import React from 'react'

const BmStateCards = ({
state,


}) => {
    const {id, title, value, icon: Icon, highlight}=state;
  return (
   <div key={id} className="rounded-lg border border-[color:var(--border-color)] bg-[var(--white-cards)] p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs text-[color:var(--secondary-text)]">{title}</p>
          <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
              highlight ? "bg-[var(--primary-yellow)] text-[color:var(--charcoal-black)]" : "bg-[var(--off-white-background)] text-[color:var(--secondary-text)]"
            }`}
          >
            <Icon size={14} />
          </span>
        </div>
        <p className="mt-4 break-words text-3xl text-[color:var(--primary-text)]">{value}</p>
      </div>
  )
}

export default BmStateCards
