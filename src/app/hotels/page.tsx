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

const options = { next: { revalidate: 60 } };

const ADRS_QUERY = defineQuery(`*[
  _type == "hotel"
  ]{adresse}`);

const POST_QUERY4 = (etoile: string, adresse: string) =>
  defineQuery(`
  *[_type == "hotel" 
  ${etoile ? `&& etoile == "${etoile}"` : ""}
  ${adresse ? `&& adresse == "${adresse}"` : ""}
  ]
`);
export default function Hotels() {
  const searchParams = useSearchParams();
  const etoileFilter = searchParams.get("etoile") || "";
  const adresseFilter = searchParams.get("destination") || "";

  const [adresses, setAdresses] = React.useState<string[]>([]);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const posts = await client.fetch(
        POST_QUERY4(etoileFilter, adresseFilter),
        {},
        options
      );
      const data = await client.fetch(ADRS_QUERY, {}, options);

      const adresses = data
        .map((hotel) => hotel.adresse)
        .filter((adresse): adresse is string => adresse !== null);
      setAdresses(adresses);
      setPosts(posts);
    }
    fetchData();
  }, [etoileFilter, adresseFilter]);

  return (
    <>
      <Header change={true} />
      <div className="list-main">
        <div className="list-container">
          <div className="accordion">
            <Link href={"."}>Accueil </Link> <span> / Hotels</span>
          </div>
          <div className="filter-options">
            <Select type={"hotel"} options={adresses} />
            <p>
              <strong> {posts?.length} Hotels</strong>
            </p>
          </div>
          <div className="elements-list">
            {posts?.map((post, index) => (
              <Card type="hotel" post={post} key={index} />
            ))}
            {/* <DisplayProducts /> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
