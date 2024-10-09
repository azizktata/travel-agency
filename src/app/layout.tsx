import type { Metadata } from "next";
import "./globals.css";
import { rubik } from "@/components/ui/fonts";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import { PageProvider } from "./context/PageContext";

export const metadata: Metadata = {
  title: "Caprise",
  description:
    "Caprise est une agence de voyages basée en Tunisie, spécialisée dans l'organisation de séjours sur mesure et de voyages organisés",
};
const options = { next: { revalidate: 60 } };
const PAGE_DEFAULT_QUERY = defineQuery(`*[ _type=="page"][0]`);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const page = await client.fetch(PAGE_DEFAULT_QUERY, {}, options);
  const contact = page?.contact || {
    name: "Unknown",
    email: "N/A",
    phone: "N/A",
  };

  return (
    <html lang="en">
      <body className={`${rubik.className}  antialiased`}>
        <PageProvider page={page} contact={contact}>
          {children}
        </PageProvider>
      </body>
    </html>
  );
}
