import React from 'react'

const BmListcards = ({row,card,tones}) => {
    
  return (
    
    <div>
      
            <span className="min-w-0 text-xs text-[color:var(--primary-text)]">
              <span className={card.boldTitle ? "font-semibold" : ""}>{row.title}</span>
              {row.sub && <> · {row.sub}</>}
            </span>
            <span className="flex items-center gap-3">
              {row.amount && <span className="whitespace-nowrap text-xs text-[color:var(--primary-text)]">{row.amount}</span>}
              {row.badges &&
                row.badges.map((b) => (
                  <span key={b.text} className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[10px] ${tones[b.tone]}`}>
                    {b.text}
                  </span>
                ))}
              {row.button && <span className="text-[11px] text-[color:var(--secondary-text)]">{row.button}</span>}
            </span>
          
    </div>
  )
}

export default BmListcards
