import React from "react";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import TarifVoyage from "@/components/tarifVoyage";

const options = { next: { revalidate: 60 } };

const POST_SLUG_QUERY = defineQuery(`*[
    _type == "post" && slug.current == $slug
    ][0]`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
        .image(source)
        .width(1920)
        .height(1080)
        .quality(50)
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

    duration,
    periodes,
    serviceInclus,
    serviceNonInclus,
    mainImage,
    listImage,
    activites,
    sejours,
    hotels,
    visa,
  } = post;
  return (
    <div className="main-program">
      <Header change={true} />
      <div className="header-program">
        <div className="accordion">
          <Link href="..">Acceuil /</Link> <Link href=".">Voyages /</Link>
          <span> {destination} </span>
        </div>
        <div className="header-program-title">
          <h1>{destination}</h1>
          <p className="price">
            <span className="card-voyage-a_partir">à partir de </span>
            {prix}
            <span className="DT"> TND</span>
          </p>
        </div>
        <p>{titre}</p>

        <Image
          src={
            mainImage
              ? urlFor(mainImage)?.url() || "/maldive.webp"
              : "/maldive.webp"
          }
          alt="destination-2"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          width={400}
          height={450}
        />
      </div>

      <div className="program-details-main">
        <div className="program-details">
          {sejours && (
            <div className="sejours">
              <h1>Programme du séjour</h1>
              <p>{duration && `durée : ${duration}`}</p>
              {sejours.map((sejour) => (
                <div key={sejour._key} className="sejour-card">
                  <p>
                    <strong> {sejour?.jour} </strong>
                  </p>
                  <p>{sejour?.description}</p>
                </div>
              ))}
            </div>
          )}
          {activites && (
            <div className="Activités">
              <h1>Activités</h1>
              {activites.map((service) => (
                <p key={service}>
                  <i className="fa-solid fa-check"></i>
                  {service}
                </p>
              ))}
            </div>
          )}

          {serviceInclus && (
            <div className="services-inclus">
              <h1>Service Inclus</h1>
              {serviceInclus.map((service) => (
                <p key={service}>
                  <i className="fa-solid fa-check"></i>
                  {service}
                </p>
              ))}
            </div>
          )}
          {serviceNonInclus && (
            <div className="services-noninclus">
              <h1>Service Non Inclus</h1>
              {serviceNonInclus.map((service) => (
                <p>
                  <i className="fa-solid fa-exclamation"></i> {service}
                </p>
              ))}
            </div>
          )}

          {hotels && (
            <div className="hotelss">
              <h1>Hotels</h1>

              {hotels.map((hotel) => (
                <p key={hotel._key}>
                  <i className="fa-solid fa-hotel"></i>
                  {hotel.hotel} : {hotel.prix}dt (adulte par nuit)
                </p>
              ))}
            </div>
          )}
          <TarifVoyage
            periodes={periodes}
            visa={visa}
            destination={destination}
          />
        </div>
        <div className="images">
          {listImage
            ? listImage.map((image) => (
                <Image
                  key={image._key}
                  src={urlFor(image)?.url() || "/maldive.jpg"}
                  alt="destination-2"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                  width={400}
                  height={450}
                />
              ))
            : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
