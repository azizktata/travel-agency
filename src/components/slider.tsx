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
import { ReactNode } from "react";

export default function Slider({ children }: { children: ReactNode }) {
  React.useEffect(() => {
    const cardList = document.querySelector(".card-list");
    const maxScrollLeft = cardList!.scrollWidth - cardList!.clientWidth;

    // Add scroll event listener
    const handleScroll = () => {
      const prevButton = document.getElementById("prev-slide");
      const nextButton = document.getElementById("next-slide");

      prevButton!.style.display = cardList?.scrollLeft === 0 ? "none" : "block";
      nextButton!.style.display =
        cardList?.scrollLeft! >= maxScrollLeft ? "none" : "block";
    };

    cardList?.addEventListener("scroll", handleScroll);

    return () => {
      cardList?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="voyage-container">
      <i
        id="prev-slide"
        className="fa-solid slide-button fa-chevron-left"
        onClick={(e) => {
          const cardList = document.querySelector(".card-list");
          cardList?.scrollBy({
            left: cardList.clientWidth * -1,
            behavior: "smooth",
          });
        }}
      ></i>
      <div className="card-list">
        {children}
        <i
          id="next-slide"
          className="fa-solid slide-button fa-chevron-right"
          onClick={() => {
            const cardList = document.querySelector(".card-list");

            cardList?.scrollBy({
              left: cardList.clientWidth * 1,
              behavior: "smooth",
            });
          }}
        ></i>
      </div>
      {/* <div className="slider-scrollbar">
          <div className="scrollbar-track">
            <div className="scrollbar-thumb"></div>
          </div>
        </div> */}
    </div>
  );
}
