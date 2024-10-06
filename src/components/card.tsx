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

export default function Card({ type = "voyage", post }) {
  return (
    <div className="card ">
      <Image
        src={urlFor(post?.mainImage)?.url() || "/maldive.jpg"}
        alt="destination-2"
        layout="responsive"
        width={400}
        height={450}
      />
      {type == "voyage" && (
        <>
          <div className="card-info">
            <h3>{post?.destination}</h3>
          </div>
          <p className="price">{post?.prix}dt</p>
        </>
      )}
      {type == "hotel" && (
        <>
          <div className="card-hotel-info">
            <h3>{post?.nom}</h3>
            <p>
              {post?.etoile}
              <i className="fa-solid fa-star"></i>
            </p>
          </div>

          {post?.periodes
            ? post?.periodes?.map((p) => {
                const { periode, tarif } = p;
                return (
                  <p className="tarif">
                    {periode} : {tarif}dt
                  </p>
                );
              })
            : null}

          <p className="price">{post?.prix}dt</p>
        </>
      )}
    </div>
  );
}
