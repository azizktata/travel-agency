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
          />
          {post?.destination && (
            <>
              <div className="card-info">
                <h3>{post?.destination}</h3>
              </div>
              <p className="price">{post?.prix}dt</p>
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
                  {post?.etoile}
                  <i className="fa-solid fa-star"></i>
                </p>
              </div>
              <p className="adress">{post?.adresse}</p>
              <p className="prix-hotel">{post?.prix}dt</p>
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
