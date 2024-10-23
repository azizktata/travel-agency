import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import Link from "next/link";
import Select from "@/components/ui/select";
import React, { Suspense } from "react";
import Footer from "@/components/ui/footer";
import { defineQuery } from "next-sanity";
import Elements from "@/components/elements";

const DEST_QUERY = defineQuery(`*[
  _type == "hotel"
  ]{adresse}`);

const options = { next: { revalidate: 60 } };

const POST_QUERY4_COUNT = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
  count(
    *[_type == "hotel" 
    ${typeFilter ? `&& etoile == ${typeFilter}` : ""}
    ${destinationFilter ? `&& adresse == "${destinationFilter}"` : ""}
    ]
  )
`);

const POST_QUERY4 = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
    *[_type == "hotel" 
    ${typeFilter ? `&& etoile == ${typeFilter}` : ""}
    ${destinationFilter ? `&& adresse == "${destinationFilter}"` : ""}
    ]
  `);
interface SearchParams {
  etoile?: string;
  destination?: string;
}

export default async function Hotels({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await client.fetch(DEST_QUERY, {}, options);
  const destinations = data
    .map((hotel) => hotel.adresse)
    .filter((adresse): adresse is string => adresse !== null);
  const typeFilter = searchParams.etoile || "";
  const destinationFilter = searchParams.destination || "";
  const length = await client.fetch(
    POST_QUERY4_COUNT(typeFilter, destinationFilter),
    {},
    options
  );
  const hotels = await client.fetch(
    POST_QUERY4(typeFilter, destinationFilter),
    {},
    options
  );
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
            <p>
              <strong>
                {" "}
                {length > 1
                  ? `${length} Programmes`
                  : `${length} Programme`}{" "}
              </strong>
            </p>
          </div>
          <div className="elements-list">
            <Elements type="hotel" hotels={hotels} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
