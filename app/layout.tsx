import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jules Chasles",
  description: "Co-founder and COO of Wusool Capital. Sell-side M&A advisor for GCC founders selling $1M-$20M businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}