"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { usePageContext } from "@/app/context/PageContext";

export default function Header({ change = false }) {
  const pathname = usePathname();
  const blackStyle = change ? { color: "black" } : { color: "white" };
  const { contact, page } = usePageContext();

  return (
    <header>
      <div className="header-container">
        <h1>
          <Link style={blackStyle} className="logo" href="/">
            {page?.logoName}{" "}
          </Link>{" "}
        </h1>

        <nav className="nav">
          <ul>
            <li
              onClick={() => {
                document.querySelector("nav")?.classList.remove("show-menu");
                document.querySelector("nav")?.classList.add("hide-menu");
              }}
              className="close-btn"
            >
              &times;
            </li>
            <li>
              <Link
                style={blackStyle}
                href="/programmes"
                className={clsx({
                  isActive: pathname === "/programmes",
                })}
              >
                Programmes
              </Link>
            </li>
            <li>
              <Link style={blackStyle} href="/programmes?Type=voyage-organise">
                Voyages Organisés
              </Link>
            </li>
            <li>
              <Link style={blackStyle} href="/programmes?Type=voyage-carte">
                Voyage à la carte
              </Link>
            </li>
            <li>
              <Link
                style={blackStyle}
                href="/hotels"
                className={clsx({
                  isActive: pathname === "/hotels",
                })}
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                style={blackStyle}
                href="/visa"
                className={clsx({
                  isActive: pathname === "/visa",
                })}
              >
                Visa
              </Link>
            </li>
          </ul>
          <button className="callus-btn">
            <i className="fa-solid fa-phone"></i>{" "}
            <span>{contact?.telephone}</span>
          </button>
        </nav>
        <div
          onClick={() => {
            document.querySelector("nav")?.classList.remove("hide-menu");
            document.querySelector("nav")?.classList.add("show-menu");
          }}
          style={blackStyle}
          className="menu-btn"
        >
          &#9776;
        </div>
      </div>
    </header>
  );
}
