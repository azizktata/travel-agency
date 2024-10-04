import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { inter, lusitana } from "@/components/ui/fonts";
import Header from "@/components/ui/header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}  antialiased`}>{children}</body>
    </html>
  );
}
