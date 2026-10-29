import "../globals.css";
import { Suspense } from "react";
import Bmnavbar from "../../component/guest/Bmnavbar/Bmnavbar.js";
import Bmfooter from "../../component/guest/Bmfooter/Bmfooter.js";
// import BmFooter from "./Bmfooter/Bmfooter.js";

export const metadata = {
  title: "BuildMart",
  description: "Construction Material Management and Comparison Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div className="h-20" />}>
          <Bmnavbar />
        </Suspense>
        {children}
        <Bmfooter />
      </body>
    </html>
  );
}