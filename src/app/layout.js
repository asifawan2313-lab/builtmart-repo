import "./globals.css";

export const metadata = {
  title: "BuildMart",
  description: "Construction Material Management and Comparison Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}