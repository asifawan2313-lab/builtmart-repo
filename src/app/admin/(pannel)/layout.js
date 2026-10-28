
// // "use client";

// // import { useState } from "react";
// // import { PanelLeft } from "lucide-react";
// // import Bmadminsidebar from "../../../component/admin/Bmadminsidebar.js";

// // export default function AdminPanelLayout({ children }) {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

// //   return (
// //     <div className="lg:flex min-h-screen">
// //       <Bmadminsidebar
// //         isOpen={isSidebarOpen}
// //         onClose={() => setIsSidebarOpen(false)}
// //       />

// //       <div className="min-w-0 flex-1">
// //         <button
// //           type="button"
// //           onClick={() => setIsSidebarOpen(true)}
// //           aria-label="Open sidebar"
// //           className="m-3 lg:hidden"
// //         >
// //           <PanelLeft size={24} />
// //         </button>

// //         {children}
// //       </div>
// //     </div>
// //   );
// // }



// "use client";

// import { useState } from "react";
// import { PanelLeft } from "lucide-react";
// import Bmadminsidebar from "../../../component/admin/Bmadminsidebar.js";

// export default function AdminPanelLayout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   return (
//     // <div className="flex min-h-screen">
//     <div className="flex min-h-screen w-full">
//       <Bmadminsidebar
//         isOpen={isSidebarOpen}
//         onClose={() => setIsSidebarOpen(false)}
//       />

//       <div className="min-w-0 flex-1">
//         <button
//           type="button"
//           onClick={() => setIsSidebarOpen(true)}
//           aria-label="Open sidebar"
//           className="m-3 lg:hidden"
//         >
//           <PanelLeft size={24} />
//         </button>

//         {children}
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { PanelLeft } from "lucide-react";
import BmAdminSidebar from "../../../component/admin/Bmadminsidebar.js";

export default function AdminPanelLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      <BmAdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
          className="m-3 lg:hidden"
        >
          <PanelLeft size={24} />
        </button>

        {children}
      </div>
    </div>
  );
}
