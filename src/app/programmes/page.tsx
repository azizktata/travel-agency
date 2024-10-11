import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import Link from "next/link";
import Select from "@/components/ui/select";
import React from "react";
import Footer from "@/components/ui/footer";
import { defineQuery } from "next-sanity";
import Elements from "@/components/elements";

const DEST_QUERY = defineQuery(`*[
  _type == "post"
  ]{destination}`);

const options = { next: { revalidate: 60 } };

export default async function Programmes() {
  const data = await client.fetch(DEST_QUERY, {}, options);
  const destinations = data
    .map((post) => post.destination)
    .filter((destination): destination is string => destination !== null);
  return (
    <>
      <Header change={true} />

      <div className="list-main">
        <div className="list-container">
          <div className="accordion">
            <Link href={"."}>Accueil /</Link> <span> Voyages</span>
          </div>
          <div className="filter-options">
            <Select type="voyage" options={destinations} />
          </div>
          <div className="elements-list">
            <Elements />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
