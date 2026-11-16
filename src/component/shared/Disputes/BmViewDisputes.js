import React from 'react'

const BmViewDisputes = ({
    m,
handleImageOpen,
  bmProofSrc,
  RoleLabel,
b,

}) => {
  return (
    <div>
      <div key={m.id} className={`flex ${b.wrap}`}>
                      <div className={`max-w-[85%] rounded-lg px-3 py-2 sm:max-w-[70%] ${b.box}`}>
                        <p className="flex items-center gap-2 text-xs text-[color:var(--secondary-text)]">
                          {b.who.name}
                          {b.who.role && <RoleLabel role={b.who.role} />}
                        </p>
                        <p className="mt-1 break-words text-sm text-[color:var(--primary-text)]">{m.text}</p>
                        {m.image && (
                          <button
                            type="button"
                            onClick={() => handleImageOpen(m.image)}
                            aria-label={`Open ${m.image}`}
                            className="mt-2 block cursor-pointer overflow-hidden rounded-md border border-[color:var(--border-color)]"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={bmProofSrc(m.image).src} alt={m.image} className="h-auto w-56 max-w-full" />
                          </button>
                        )}
                        <p className="mt-1 text-right text-[10px] text-[color:var(--secondary-text)]">{m.date}</p>
                      </div>
                    </div>
    </div>
  )
}

export default BmViewDisputes
