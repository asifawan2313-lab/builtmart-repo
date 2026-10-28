"use client";

import { useState } from "react";
import SupplierSidebar from "../../component/supplier-panel/SupplierLayout/SupplierSidebar";
import SupplierHeader from "../../component/supplier-panel/SupplierLayout/SupplierHeader";

export default function SupplierLayout({ children }) {
  const [open, setOpen] = useState(false); // mobile par menu khula hai ya band

  return (
    <div className="flex min-h-screen bg-[#F4F4F2]">
      <SupplierSidebar isOpen={open} onClose={() => setOpen(false)} />

      <div className="min-w-0 flex-1">
        <SupplierHeader onMenuClick={() => setOpen(true)} />
        <main>{children}</main>
      </div>
    </div>
  );
}