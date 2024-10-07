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
        .quality(100)
    : null;

interface CarouselProps {
  carousel: any[];
  titre?: string;
  description?: string;
}

export default function Carousel({
  carousel = [],
  titre = "Caprise",
  description = "",
}: CarouselProps) {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((counter) =>
        counter + 1 >= carousel.length ? 0 : counter + 1
      );
    }, 5000);
    return () => clearInterval(intervalId);
  }, [counter]);

  const pageImg = carousel[counter]?.image
    ? urlFor(carousel[counter]?.image)?.url()
    : null;
  return (
    <>
      <Image
        src={pageImg || "/hero-6.jpg"}
        alt="hero"
        fill
        objectFit="cover"
        quality={100}
      />
      <div className="carousel-content">
        {carousel[counter]?.duree ? (
          <>
            <div className="duree"> {carousel[counter]?.duree} </div>
            <h1 className="carousel-title">{carousel[counter]?.destination}</h1>
            <p className="description">{carousel[counter]?.prix}</p>
          </>
        ) : (
          <>
            <h1 className="carousel-title">{titre}</h1>
            <p className="description">{description}</p>
          </>
        )}
        {carousel[counter]?.slug?.current ? (
          <Link href={`/programmes/${carousel[counter]?.slug}`}>
            <button className="learn_more-btn"> learn more</button>
          </Link>
        ) : (
          <button className="learn_more-btn"> learn more</button>
        )}
      </div>
    </>
  );
}
