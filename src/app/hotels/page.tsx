import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import Link from "next/link";
import Select from "@/components/ui/select";
import React, { Suspense } from "react";
import Footer from "@/components/ui/footer";
import { defineQuery } from "next-sanity";
import Elements from "@/components/elements";
import Loading from "@/components/loading";

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
            <Suspense>
              <Select type="hotel" options={destinations} />
            </Suspense>
          </div>
          <div className="elements-list">
            <Suspense fallback={<Loading />}>
              <Elements type="hotel" />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
