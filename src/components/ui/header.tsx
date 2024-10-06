"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Header({
  change = false,
  title = "Caprice",
  contact = "58 344 400",
}) {
  const pathname = usePathname();
  const blackStyle = change ? { color: "black" } : { color: "white" };
  return (
    <header>
      <div className="header-container">
        <h1>
          <Link style={blackStyle} className="logo" href="/">
            {title}{" "}
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
          </ul>
          <button className="callus-btn">
            <i className="fa-solid fa-phone"></i> <span>{contact}</span>
          </button>
        </nav>
        <div
          onClick={() => {
            document.querySelector("nav")?.classList.remove("hide-menu");
            document.querySelector("nav")?.classList.add("show-menu");
          }}
          className="menu-btn"
        >
          &#9776;
        </div>
      </div>
    </header>
  );
}
