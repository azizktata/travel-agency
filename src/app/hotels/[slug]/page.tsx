import React, { Suspense } from "react";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Tarifs from "@/components/ui/tarifs";
import { SewingPinIcon } from "@radix-ui/react-icons";
import Loading from "@/components/ui/loading";

const options = { next: { revalidate: 60 } };

const HOTEL_SLUG_QUERY = defineQuery(`*[
    _type == "hotel" && slug.current == $slug
    ][0]`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
        .image(source)
        .width(1920)
        .height(1080)
        .quality(80)
        .format("webp")
        .auto("format")
    : null;
export default async function HotelPage({
  params,
}: {
  params: { slug: string };
}) {
  const hotel = await client.fetch(HOTEL_SLUG_QUERY, params, options);
  if (!hotel) {
    notFound();
  }
  const {
    nom,
    adresse,
    etoile,
    prix,
    description,
    chambres,
    services,

    mainImage,
    listImage,
  } = hotel;
  return (
    <div className="main-program">
      <Header change={true} />
      <div className="header-program">
        <div className="accordion">
          <Link href="..">Acceuil /</Link> <Link href=".">Hotels /</Link>
          <span> {nom} </span>
        </div>
        <div className="header-program-title">
          <h1>
            {nom} {etoile && "⭐".repeat(etoile)}
          </h1>
          <p className="card-prix-voyage">
            <span className="card-voyage-a_partir">à partir de</span>
            <span>
              <span className="price"> {prix}</span>{" "}
              <span className="DT"> DT</span>{" "}
            </span>
          </p>
        </div>
        {adresse && (
          <p className="program-description">
            <SewingPinIcon
              style={{ color: "#0e61a9", width: "20px", height: "20px" }}
            />
            {adresse}
          </p>
        )}

        <Suspense fallback={<Loading />}>
          {mainImage && (
            <Image
              src={urlFor(mainImage)?.url() || "/maldive.jpg"}
              alt="destination-2"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              width={400}
              height={450}
            />
          )}
        </Suspense>
      </div>

      <div className="program-details-main">
        <div className="program-details">
          {description && (
            <>
              <h1>Description</h1>
              <PortableText value={description} />
            </>
          )}
          <div>
            <h1>Tarifs</h1>

            {nom && (
              <Tarifs
                hotel={nom}
                chambres={chambres || []}
                services={services || []}
                prix={prix || 0}
              />
            )}
          </div>
        </div>
        <div className="images">
          <Suspense fallback={<Loading />}>
            {listImage
              ? listImage.map((image) => (
                  <Image
                    key={image._key}
                    src={urlFor(image)?.url() || "/maldive.jpg"}
                    alt="destination-2"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                    width={400}
                    height={450}
                  />
                ))
              : null}
          </Suspense>
        </div>
      </div>

      <Footer />
    </div>
  );
}
