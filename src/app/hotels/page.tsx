import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import Link from "next/link";
import Select from "@/components/ui/select";
import React from "react";
import Footer from "@/components/ui/footer";
import { defineQuery } from "next-sanity";
import Elements from "@/components/elements";

const DEST_QUERY = defineQuery(`*[
  _type == "hotel"
  ]{adresse}`);

const options = { next: { revalidate: 60 } };

export default async function Hotels() {
  const data = await client.fetch(DEST_QUERY, {}, options);
  const destinations = data
    .map((hotel) => hotel.adresse)
    .filter((adresse): adresse is string => adresse !== null);
  return (
    <>
      <Header change={true} />
      <div className="list-main">
        <div className="list-container">
          <div className="accordion">
            <Link href={"."}>Accueil /</Link> <span> Hotels</span>
          </div>
          <div className="filter-options">
            <Select type="hotel" options={destinations} />
          </div>
          <div className="elements-list">
            <Elements type="hotel" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
