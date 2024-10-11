"use client";
import { defineQuery } from "next-sanity";
import { useSearchParams } from "next/navigation";
import React from "react";
import { client } from "@/sanity/client";
import Card from "./card";
import Loading from "@/components/loading";
import { toast } from "react-hot-toast";

const options = { next: { revalidate: 60 } };

const POST_QUERY3 = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
  *[_type == "post" 
  ${typeFilter ? `&& type == "${typeFilter}"` : ""}
  ${destinationFilter ? `&& destination == "${destinationFilter}"` : ""}
  ]
`);

const POST_QUERY4 = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
    *[_type == "hotel" 
    ${typeFilter ? `&& etoile == ${typeFilter}` : ""}
    ${destinationFilter ? `&& adresse == "${destinationFilter}"` : ""}
    ]
  `);
export default function Elements({ type = "voyage" }) {
  const searchParams = useSearchParams();
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const typeFilter =
    type == "voyage"
      ? (searchParams.get("Type") ?? "")
      : (searchParams.get("etoile") ?? "");

  const destinationFilter = searchParams.get("destination") ?? "";
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const posts =
          type === "voyage"
            ? await client.fetch(
                POST_QUERY3(typeFilter, destinationFilter),
                {},
                options
              )
            : await client.fetch(
                POST_QUERY4(typeFilter, destinationFilter),
                {},
                options
              );
        setPosts(posts);
      } catch {
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [typeFilter, destinationFilter]);

  if (loading) {
    return <Loading />;
  }
  if (!loading) {
    return (
      <>
        {posts?.map((post: unknown, index: number) => (
          <Card type={type} post={post} key={index} />
        ))}
      </>
    );
  }
}
