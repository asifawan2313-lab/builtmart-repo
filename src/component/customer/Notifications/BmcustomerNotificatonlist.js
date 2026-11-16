import React from 'react'
import { Check, Trash2 } from "lucide-react";
const BmcustomerNotificatonlist = (
    {
        notification,
        onRead,
        onDelete,
        Icon,
        iconBtn
    }
) => {
    const {id,type,title,text,time,read}=notification;
  return (
    
       <div
                key={id}
                className={`flex items-start gap-2 border-t border-[#E2E4E7] px-4 py-4 transition-colors first:border-t-0 hover:bg-[#F4F4F2] sm:px-5 ${
                  read ? "bg-white" : "bg-[#FDC716]/10"
                }`}
              >
                {/* Click karne se sirf read hoti hai, koi page nahi khulta */}
                <button type="button" onClick={onRead} className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4F4F2] text-[#202124]">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm text-[#202124] ${read ? "font-medium" : "font-bold"}`}>{title}</p>
                    <p className="mt-0.5 text-xs text-[#45484D]">{text}</p>
                    <p className="mt-1 text-[11px] text-[#45484D]">{time}</p>
                  </div>
                  {!read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#FDC716]" aria-label="Unread" />}
                </button>

                {/* Is notification ke liye read aur delete */}
                <div className="flex shrink-0 gap-1.5">
                  <button
                    type="button"
                    onClick={ onRead}
                    disabled={read}
                    aria-label="Mark as read"
                    title="Mark as read"
                    className={iconBtn}
                  >
                    <Check size={15} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={onDelete}
                    aria-label="Delete notification"
                    title="Delete"
                    className={iconBtn}
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              
    </div>
  )
}

export default BmcustomerNotificatonlist
