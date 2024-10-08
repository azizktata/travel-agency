import React, { Fragment } from "react";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { defineQuery } from "next-sanity";
import VisaForm from "@/components/ui/VisaForm";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { PortableText } from "@portabletext/react";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import ContactForm from "@/components/ui/contactForm";

const options = { next: { revalidate: 60 } };

const HOTEL_SLUG_QUERY = defineQuery(`*[
    _type == "hotel" && slug.current == $slug
    ][0]`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
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

    periodes,

    mainImage,
  } = hotel;
  return (
    <div className="main-program">
      <Header change={true} />
      <div className="header-program">
        <div className="accordion">
          <Link href="..">Acceuil /</Link> <Link href=".">Hotels /</Link>
          <span> {nom} </span>
        </div>
        <h1>{nom}</h1>
        <p>
          {description && `${description},`}
          {adresse && `${adresse},`}

          {prix && (
            <Fragment>
              <span> {prix}dt </span>
            </Fragment>
          )}
        </p>
        {mainImage && (
          <Image
            src={urlFor(mainImage)?.url() || "/maldive.jpg"}
            alt="destination-2"
            layout="responsive"
            width={400}
            height={450}
          />
        )}
      </div>

      <div className="program-details-main">
        <div className="program-details">
          {description && <PortableText value={description} />}

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
          <div className="form-main">
            <h4 className="form-title">Contact form</h4> <ContactForm />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
