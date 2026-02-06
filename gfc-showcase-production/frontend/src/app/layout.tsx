import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GFC Showcase | Premium Home Appliances",
  description: "Experience GFC's premium ceiling fans, air coolers, and washing machines. Three decades of innovation in Pakistan.",
  keywords: "GFC, ceiling fans, air coolers, washing machines, Pakistan, home appliances",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
