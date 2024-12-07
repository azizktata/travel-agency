import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import Link from "next/link";
import Select from "@/components/ui/select";
import React, { Suspense } from "react";
import Footer from "@/components/ui/footer";
import { defineQuery } from "next-sanity";
import Elements from "@/components/ui/elements";

const DEST_QUERY = defineQuery(`*[
  _type == "post"
  ]{destination}`);

const POST_QUERY_COUNT = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
    count(
      *[_type == "post" 
      ${typeFilter ? `&& type == "${typeFilter}"` : ""}
      ${destinationFilter ? `&& destination == "${destinationFilter}"` : ""}
      ]
    )
  `);
const POST_QUERY3 = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
     *[_type == "post" 
      ${typeFilter ? `&& type == "${typeFilter}"` : ""}
      ${destinationFilter ? `&& destination == "${destinationFilter}"` : ""}
      ]
  `);

const options = { next: { revalidate: 60 } };

interface SearchParams {
  type?: string;
  destination?: string;
}

export default async function Programmes({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const data = await client.fetch(DEST_QUERY, {}, options);
  const destinations = data
    .map((post) => post.destination)
    .filter((destination): destination is string => destination !== null);
  const typeFilter = searchParams.type || "";

  const destinationFilter = searchParams.destination || "";
  const length = await client.fetch(
    POST_QUERY_COUNT(typeFilter, destinationFilter),
    {},
    options
  );
  const posts = await client.fetch(
    POST_QUERY3(typeFilter, destinationFilter),
    {},
    options
  );

  return (
    <>
      <Header change={true} />

      <div className="list-main">
        <div className="list-container">
          <div className="accordion">
            <Link href={"."}>Accueil /</Link> <span> Voyages</span>
          </div>
          <div className="filter-options">
            <Suspense>
              <Select type="voyage" options={destinations} />
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
            <Elements type="voyage" posts={posts} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
