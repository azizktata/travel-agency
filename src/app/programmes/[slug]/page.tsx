import React from "react";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import VisaForm from "@/components/ui/VisaForm";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

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
  return (
    <div className="main-program">
      <Header change={true} title={undefined} />
      <div className="header-program">
        <div className="accordion">
          <Link href=".">Acceuil </Link>{" "}
          <span> / Voyages / {destination} </span>
        </div>
        <h1>{destination}</h1>
        <p>
          {" "}
          {description}, {duration}{" "}
        </p>
        <Image
          src={urlFor(mainImage)?.url() || "/maldive.jpg"}
          alt="destination-2"
          layout="responsive"
          width={400}
          height={450}
        />
      </div>

      <div className="program-details-main">
        <div className="program-details">
          <h1>Programme du séjour</h1>
          <div className="sejours">
            {sejours
              ? sejours.map((sejour) => (
                  <div key={sejour} className="sejour-card">
                    <p>
                      <strong> {sejour?.jour} </strong>
                    </p>
                    <p>{sejour?.description}</p>
                  </div>
                ))
              : null}
          </div>

          <div className="services-inclus">
            <h1>Service Inclus</h1>
            {serviceInclus
              ? serviceInclus.map((service) => (
                  <p>
                    <i className="fa-solid fa-check"></i>
                    {service}
                  </p>
                ))
              : null}
          </div>
          <div className="services-noninclus">
            <h1>Service Non Inclus</h1>
            {serviceNonInclus
              ? serviceNonInclus.map((service) => (
                  <p>
                    <i className="fa-solid fa-exclamation"></i> {service}
                  </p>
                ))
              : null}
          </div>
          <div className="hotels">
            <h1>Hotels</h1>
            {hotels
              ? hotels.map((hotel) => (
                  <p>
                    <i className="fa-solid fa-hotel"></i>
                    {hotel.hotel} : {hotel.prix}dt (adulte par nuit)
                  </p>
                ))
              : null}
          </div>

          <div className="tarifs">
            <h1>Tarifs</h1>
            {periodes
              ? periodes.map((periode) => (
                  <p>
                    <i className="fa-solid fa-money-check-dollar"></i>
                    {periode.periode} : {periode.tarif}dt
                  </p>
                ))
              : null}
          </div>
          <div className="visa-total">
            <div className="visa-order-container">
              <h4 className="order-title">Visa form</h4>
              <VisaForm />
            </div>
          </div>
        </div>
        <div className="images">
          {listImage
            ? listImage.map((image) => (
                <Image
                  key={image}
                  src={urlFor(image)?.url() || "/maldive.jpg"}
                  alt="destination-2"
                  layout="responsive"
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
