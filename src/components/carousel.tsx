"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource, width = 1920, height = 1080) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
        .image(source)
        .width(width)
        .height(height)
        .quality(50)
        .format("webp")
        .auto("format")
    : null;

interface CarouselProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  carousel: any[];
  titre?: string;
  description?: string;
}

export default function Carousel({
  carousel = [],
  titre = "Caprise",
}: CarouselProps) {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((counter) =>
        counter + 1 >= carousel.length ? 0 : counter + 1
      );
    }, 4000);
    return () => clearInterval(intervalId);
  }, [carousel.length]);

  const pageImg = carousel[counter]?.mainImage
    ? urlFor(carousel[counter]?.mainImage)?.url()
    : null;

  return (
    <>
      <Image
        src={pageImg || "/hero-6.jpg"}
        alt="hero"
        fill
        style={{ objectFit: "cover" }}
        loading="eager"
        quality={100}
      />
      <div className="carousel-content">
        {carousel[counter]?.destination ? (
          <>
            <div className="carousel-duree">
              {" "}
              {carousel[counter]?.duration}{" "}
            </div>
            <h1 className="carousel-title">{carousel[counter]?.destination}</h1>
            <p className="carousel-price">
              <span className="a_partir">à partir de</span>
              <span className="prix-offre">
                <span className="price">{carousel[counter]?.prix}</span>
                <span className="DT"> DT</span>
              </span>
            </p>
          </>
        ) : (
          <>
            <h1 className="carousel-title">{titre}</h1>
          </>
        )}
        {carousel[counter]?.slug?.current && (
          <Link href={`/programmes/${carousel[counter]?.slug?.current}`}>
            <button className="learn_more-btn"> J&apos;en profite</button>
          </Link>
        )}
      </div>
    </>
  );
}
