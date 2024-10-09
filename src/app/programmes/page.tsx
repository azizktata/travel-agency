"use client";

import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import Card from "@/components/card";
import Select from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import React from "react";
import Footer from "@/components/ui/footer";
import { Suspense } from "react";

const options = { next: { revalidate: 60 } };

const DEST_QUERY = defineQuery(`*[
  _type == "post"
  ]{destination}`);

const POST_QUERY3 = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
  *[_type == "post" 
  ${typeFilter ? `&& type == "${typeFilter}"` : ""}
  ${destinationFilter ? `&& destination == "${destinationFilter}"` : ""}
  ]
`);
function ProgramContent() {
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get("Type") || "";
  const destinationFilter = searchParams.get("destination") || "";

  const [destinations, setDestinations] = React.useState<string[]>([]);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const posts = await client.fetch(
        POST_QUERY3(typeFilter, destinationFilter),
        {},
        options
      );
      const data = await client.fetch(DEST_QUERY, {}, options);

      const destinations = data
        .map((post) => post.destination)
        .filter((destination): destination is string => destination !== null);
      setDestinations(destinations);
      setPosts(posts);
    }
    fetchData();
  }, [typeFilter, destinationFilter]);

  return (
    <>
      <Header change={true} />
      <div className="list-main">
        <div className="list-container">
          <div className="accordion">
            <Link href={"."}>Accueil </Link> <span> / Voyages</span>
          </div>
          <div className="filter-options">
            <Select type="voyage" options={destinations} />
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
      <Footer />
    </>
  );
}
export default function Programmes() {
  return (
    <>
      <Header change={true} />
      <Suspense fallback={<div>Loading...</div>}>
        <ProgramContent />
      </Suspense>
      <Footer />
    </>
  );
}
