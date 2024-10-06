import React from "react";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";

const options = { next: { revalidate: 60 } };

const POST_SLUG_QUERY = defineQuery(`*[
    _type == "post" && slug.current == $slug
    ][0]`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
export default async function ProgramPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await client.fetch(POST_SLUG_QUERY, params, options);
  if (!post) {
    notFound();
  }
  const {
    titre,
    description,
    destination,
    prix,
    type,
    duration,
    periodes,
    serviceInclus,
    serviceNonInclus,
    mainImage,
    listImage,
    activites,
    sejours,
    hotels,
  } = post;
  return <div>{titre || "untitiled"}</div>;
}
{
  /* {post?.activites
    ? post?.activites.map((activite: string) => (
        <div key={activite} className="program-card">
          <p>
            <i className="fa-solid fa-check"></i>
            {activite}
          </p>
        </div>
      ))
    : null} */
}

{
  /* 
          <div className="visa-total">
            <div className="visa-order-container">
              <h4 className="order-title">Visa form</h4>
              <VisaForm />
            </div>
          </div> */
}
