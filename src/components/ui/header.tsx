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
                href="/program"
                className={clsx({
                  isActive: pathname === "/program",
                })}
              >
                Programme
              </Link>
            </li>
            <li>
              <Link style={blackStyle} href="/#about">
                About{" "}
              </Link>
            </li>
            <li>
              <Link style={blackStyle} href="/#contact">
                {" "}
                Contact
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
