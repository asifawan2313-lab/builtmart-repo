// import BmRiderSidebar from "../../component/rider/Bmridersidebar.js";

// export default function RiderLayout({ children }) {
//   return (
//     // Mobile: sidebar ka top bar upar, page neeche. Laptop: sidebar left, page right
//     <div className="bmRiderLayout-root min-h-screen bg-[var(--off-white-background)] lg:flex">
//       <BmRiderSidebar />

//       {/* min-w-0: lamba content layout ko side se bahar na dhakele */}
//       <div className="bmRiderLayout-content min-w-0 flex-1">{children}</div>
//     </div>
//   );
// }


import "../globals.css";
// import BmRiderSidebar from "../../../component/rider/BmRiderSidebar/page.js";

import BmRiderSidebar from "../../component/rider/Bmridersidebar.js";

export const metadata = {
  title: "Rider Workspace — BuildMart",
};

export default function RiderLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Mobile: sidebar ka top bar upar, page neeche. Laptop: sidebar left, page right */}
        <div className="bmRiderLayout-root min-h-screen bg-[var(--off-white-background)] lg:flex">
          <BmRiderSidebar />

          {/* min-w-0: lamba content layout ko side se bahar na dhakele */}
          <div className="bmRiderLayout-content min-w-0 flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}