"use client";
import React from "react";

import { ReactNode } from "react";
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";

export default function Slider({
  children,
  sliderClass,
}: {
  children: ReactNode;
  sliderClass: string;
}) {
  React.useEffect(() => {
    const cardList = document.querySelector(`.${sliderClass}`);
    const maxScrollLeft = cardList
      ? cardList.scrollWidth - cardList.clientWidth
      : 0;

    const handleScroll = () => {
      const prevButton = document.getElementById("prev-slide");
      const nextButton = document.getElementById("next-slide");

      if (cardList && prevButton && nextButton) {
        prevButton.style.display = cardList.scrollLeft === 0 ? "none" : "block";
        nextButton.style.display =
          cardList.scrollLeft >= maxScrollLeft ? "none" : "block";
      }
    };

    cardList?.addEventListener("scroll", handleScroll);

    return () => {
      cardList?.removeEventListener("scroll", handleScroll);
    };
  }, [sliderClass]);

  return (
    <div className="voyage-container">
      <ChevronLeftIcon
        // style={{ color: "#0e61a9", width: "16px", height: "16px" }}
        id="prev-slide"
        className="fa-solid slide-button fa-lg fa-chevron-left"
        onClick={() => {
          const cardList = document.querySelector(`.${sliderClass}`);
          cardList?.scrollBy({
            left: cardList.clientWidth * -1,
            behavior: "smooth",
          });
        }}
      />
      <div className={`${sliderClass}`}>{children}</div>
      <ChevronRightIcon
        id="next-slide"
        className="fa-solid slide-button fa-lg fa-chevron-right"
        onClick={() => {
          const cardList = document.querySelector(`.${sliderClass}`);

          cardList?.scrollBy({
            left: cardList.clientWidth * 1,
            behavior: "smooth",
          });
        }}
      />{" "}
      {/* <div className="slider-scrollbar">
          <div className="scrollbar-track">
            <div className="scrollbar-thumb"></div>
          </div>
        </div> */}
    </div>
  );
}
