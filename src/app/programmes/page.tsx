"use client";

import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import Card from "@/components/card";
import Select from "@/components/ui/select";
import { useSearchParams } from "next/navigation";

const options = { next: { revalidate: 60 } };

const DEST_QUERY = defineQuery(`*[
  _type == "post"
  ]{destination}`);

const POST_QUERY3 = (typeFilter, destinationFilter) =>
  defineQuery(`
  *[_type == "post" 
  ${typeFilter ? `&& type == "${typeFilter}"` : ""}
  ${destinationFilter ? `&& destination == "${destinationFilter}"` : ""}
  ]
`);
export default async function Programmes() {
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("Type") || null;
  const destinationFilter = searchParams.get("destination") || null;
  const posts = await client.fetch(
    POST_QUERY3(typeFilter, destinationFilter),
    {},
    options
  );
  const data = await client.fetch(DEST_QUERY, {}, options);

  const destinations = data.map((post) => post.destination);

  return (
    <>
      <Header change={true} title={undefined} />
      <div className="list-main">
        <div className="list-container">
          <div className="accordion">
            <Link href={"."}>Accueil </Link> <span> / Voyages</span>
          </div>
          <div className="filter-options">
            <Select options={destinations} />
            <p>
              <strong> {posts?.length} Programmes</strong>
            </p>
          </div>
          <div className="elements-list">
            {posts?.map((post, index) => <Card post={post} key={index} />)}
            {/* <DisplayProducts /> */}
          </div>
        </div>
      </div>
    </>
  );
}
