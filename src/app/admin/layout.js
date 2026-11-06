
// // // export default function AdminLayout({ children }) {
// // //   return children;
// // // }


// // "use client";

// // import { usePathname } from "next/navigation";
// // import BmAdminSidebar from "../../component/admin/Bmadminsidebar.js";

// // const AdminLayout = ({ children }) => {
// //   const pathname = usePathname();

// //   // Login page par sidebar nahi dikhani
// //   if (pathname.startsWith("/admin/log-in")) return children;

// //   return (
// //     <div className="flex min-h-screen bg-[var(--off-white-background)]">
// //       <BmAdminSidebar />
// //       <main className="min-w-0 flex-1">{children}</main>
// //     </div>
// //   );
// // };

// // export default AdminLayout;




// "use client";

// import { usePathname } from "next/navigation";
// // import BmAdminSidebar from "./Bmadminsidebar.js";

// import BmAdminSidebar from "../../component/admin/Bmadminsidebar.js";

// const BmAdminShell = ({ children }) => {
//   const pathname = usePathname();

//   // Login page par sidebar nahi dikhani
//   if (pathname.startsWith("/admin/log-in")) return children;

//   return (
//     <div className="flex min-h-screen bg-[var(--off-white-background)]">
//       <BmAdminSidebar />
//       <main className="min-w-0 flex-1">{children}</main>
//     </div>
//   );
// };

// export default BmAdminShell;




"use client";

import "../globals.css";
import { usePathname } from "next/navigation";
import BmAdminSidebar from "../../component/admin/Bmadminsidebar.js";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();

  // Login page par sidebar nahi dikhani
  const isLogin = pathname.startsWith("/admin/log-in");

  return (
    <html lang="en">
      <body>
        <title>BuildMart Admin</title>
        {isLogin ? (
          children
        ) : (
          <div className="flex min-h-screen bg-[var(--off-white-background)]">
            <BmAdminSidebar />
            <main className="min-w-0 flex-1">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
};

export default AdminLayout;