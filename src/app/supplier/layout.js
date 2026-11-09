// // // // // "use client";

// // // // // import "../globals.css";
// // // // // import { usePathname } from "next/navigation";
// // // // // import SupplierSidebar from "../../component/supplier/Bmsuppliersidebar.js";

// // // // // const SupplierLayout = ({ children }) => {
// // // // //   const pathname = usePathname();

// // // // //   // Login page par sidebar nahi dikhani
// // // // //   const isLogin = pathname.startsWith("/supplier/log-in");

// // // // //   return (
// // // // //     <html lang="en">
// // // // //       <body>
// // // // //         <title>BuildMart Supplier</title>
// // // // //         {isLogin ? (
// // // // //           children
// // // // //         ) : (
// // // // //           <div className="flex min-h-screen bg-[var(--off-white-background)]">
// // // // //             <SupplierSidebar />
// // // // //             <main className="min-w-0 flex-1">{children}</main>
// // // // //           </div>
// // // // //         )}
// // // // //       </body>
// // // // //     </html>
// // // // //   );
// // // // // };

// // // // // export default SupplierLayout;





// // // // // // // export default function AdminLayout({ children }) {
// // // // // // //   return children;
// // // // // // // }


// // // // // // "use client";

// // // // // // import { usePathname } from "next/navigation";
// // // // // // import BmAdminSidebar from "../../component/admin/Bmadminsidebar.js";

// // // // // // const AdminLayout = ({ children }) => {
// // // // // //   const pathname = usePathname();

// // // // // //   // Login page par sidebar nahi dikhani
// // // // // //   if (pathname.startsWith("/admin/log-in")) return children;

// // // // // //   return (
// // // // // //     <div className="flex min-h-screen bg-[var(--off-white-background)]">
// // // // // //       <BmAdminSidebar />
// // // // // //       <main className="min-w-0 flex-1">{children}</main>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default AdminLayout;




// // // // // "use client";

// // // // // import { usePathname } from "next/navigation";
// // // // // // import BmAdminSidebar from "./Bmadminsidebar.js";

// // // // // import BmAdminSidebar from "../../component/admin/Bmadminsidebar.js";

// // // // // const BmAdminShell = ({ children }) => {
// // // // //   const pathname = usePathname();

// // // // //   // Login page par sidebar nahi dikhani
// // // // //   if (pathname.startsWith("/admin/log-in")) return children;

// // // // //   return (
// // // // //     <div className="flex min-h-screen bg-[var(--off-white-background)]">
// // // // //       <BmAdminSidebar />
// // // // //       <main className="min-w-0 flex-1">{children}</main>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default BmAdminShell;




// // // "use client";

// // // import "../globals.css";
// // // import { usePathname } from "next/navigation";
// // // import SupplierSidebar from "../../component/supplier/Bmsuppliersidebar.js"

// // // const SupplierLayout = ({ children }) => {
// // //   const pathname = usePathname();

// // //   // Login page par sidebar nahi dikhani
// // //   const isLogin = pathname.startsWith("/admin/log-in");

// // //   return (
// // //     <html lang="en">
// // //       <body>
// // //         <title>BuildMart Admin</title>
// // //         {isLogin ? (
// // //           children
// // //         ) : (
// // //           <div className="flex min-h-screen bg-[var(--off-white-background)]">
// // //             <SupplierSidebar />
// // //             <main className="min-w-0 flex-1">{children}</main>
// // //           </div>
// // //         )}
// // //       </body>
// // //     </html>
// // //   );
// // // };

// // // export default SupplierLayout;







// // "use client";

// // import "../globals.css";
// // import { usePathname } from "next/navigation";
// // import SupplierSidebar from "../../component/supplier/Bmsuppliersidebar.js";

// // const SupplierLayout = ({ children }) => {
// //   const pathname = usePathname();

// //   // Supplier login page par sidebar nahi dikhani
// //   const isLogin = pathname.startsWith("/supplier/log-in");

// //   return (
// //     <div className="min-h-screen bg-[var(--off-white-background)]">
// //       {isLogin ? (
// //         children
// //       ) : (
// //         <div className="flex min-h-screen">
// //           <SupplierSidebar />

// //           <main className="min-w-0 flex-1 lg:ml-[306px]">
// //             {children}
// //           </main>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SupplierLayout;




// "use client";

// import "../globals.css";
// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import { Menu } from "lucide-react";
// import SupplierSidebar from "../../component/supplier/Bmsuppliersidebar.js";

// const SupplierLayout = ({ children }) => {
//   const pathname = usePathname();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const isLogin = pathname.startsWith("/supplier/log-in");

//   if (isLogin) {
//     return children;
//   }

//   return (
//     <html lang="en">
// // //       <body>
//     <div className="min-h-screen bg-[var(--off-white-background)]">
//       <SupplierSidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       <main className="min-w-0 lg:ml-[306px]">
//         {/* Mobile Navbar */}
//         <div className="sticky top-0 z-30 flex h-14 items-center border-b bg-white px-4 lg:hidden">
//           <button
//             type="button"
//             onClick={() => setSidebarOpen(true)}
//             className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
//             aria-label="Open sidebar"
//           >
//             <Menu size={24} />
//           </button>

//           <span className="ml-3 font-semibold">Supplier Panel</span>
//         </div>

//         {children}
//       </main>
//     </div>
//     </body>
//     </html>
//   );
// };

// export default SupplierLayout;




"use client";

import "../globals.css";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import SupplierSidebar from "../../component/supplier/Bmsuppliersidebar.js";

const SupplierLayout = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLogin = pathname.startsWith("/supplier/log-in");

  return (
    <html lang="en">
      <body>
        {isLogin ? (
          children
        ) : (
          <div className="min-h-screen bg-[var(--off-white-background)]">
            <SupplierSidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <main className="min-w-0 lg:ml-[306px]">
              {/* Mobile Navbar */}
              <div className="sticky top-0 z-30 flex h-14 items-center border-b bg-white px-4 lg:hidden">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-md p-2 hover:bg-gray-100"
                  aria-label="Open sidebar"
                >
                  <Menu size={24} />
                </button>

                <span className="ml-3 font-semibold">
                  Supplier Panel
                </span>
              </div>

              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
};

export default SupplierLayout;
