import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jules Chasles",
  description: "Partner at Dopamine, working with emerging companies in MENA",
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