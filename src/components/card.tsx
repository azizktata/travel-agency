"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
        .image(source)
        .width(1920)
        .height(1080)
        .quality(50)
    : null;

interface Post {
  slug?: { current: string };
  mainImage?: SanityImageSource;
  destination?: string;
  prix?: number;
  nom?: string;
  etoile?: number;
  adresse?: string;
}

interface CardProps {
  type?: "voyage" | "hotel";
  post: any;
}

export default function Card({ type = "voyage", post }: CardProps) {
  if (type == "voyage") {
    return (
      <div className="card ">
        <Link href={`/programmes/${post?.slug?.current}`}>
          <Image
            src={
              post?.mainImage
                ? urlFor(post.mainImage)?.url() || "/maldive.jpg"
                : "/maldive.jpg"
            }
            alt="destination-2"
            layout="responsive"
            width={400}
            height={450}
            style={{ objectFit: "cover" }}
          />
          {post?.destination && (
            <>
              <div className="card-info">
                <h3>{post?.destination}</h3>
                <p className="card-prix-voyage">
                  <span className="card-voyage-a_partir">à partir de</span>
                  <span>
                    <span className="price"> {post?.prix}</span>{" "}
                    <span className="DT"> DT</span>{" "}
                  </span>
                </p>
                <button className="voir-offre-btn">j'en profite</button>
              </div>
            </>
          )}
        </Link>
      </div>
    );
  }
  if (type == "hotel") {
    return (
      <div className="card-hotel">
        <Link href={`/hotels/${post?.slug?.current}`}>
          <Image
            className="hotel-image"
            src={
              post?.mainImage
                ? urlFor(post.mainImage)?.url() || "/maldive.jpg"
                : "/maldive.jpg"
            }
            alt="destination-2"
            layout="responsive"
            width={300}
            height={250}
          />
          {post?.nom && (
            <div className="card-hotel-info">
              <div className="card-header-info">
                <h3>{post?.nom}</h3>
                <p>
                  {post?.etoile &&
                    // post?.etoile?.array.forEach(() => {
                    //   <i className="fa-solid fa-star"></i>;
                    // })
                    "⭐".repeat(post?.etoile)}
                </p>
              </div>
              <p className="adress">
                <i className="fa-solid fa-location-dot"></i>
                {post?.adresse}
              </p>

              <div className="card-footer">
                <p className="prix-hotel">
                  <span className="card-a_partir">à partir de</span>
                  <span className="card-prix-hotel">
                    <span className="price"> {post?.prix} </span>{" "}
                    <span className="DT"> DT</span>{" "}
                  </span>
                </p>
                <button className="voir-offre-btn">voir l'offre</button>
              </div>
            </div>
          )}
        </Link>
      </div>
    );
  }
}
// {post?.periodes
//   ? post?.periodes?.map((p) => {
//       const { periode, tarif } = p;
//       return (
//         <p className="tarif">
//           {periode} : {tarif}dt
//         </p>
//       );
//     })
//   : null}
