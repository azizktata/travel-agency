"use client";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header>
      <div className="header-container">
        <h1>
          <Link className="logo" href="/">
            caprice{" "}
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
                href="/program"
                className={clsx({
                  isActive: pathname === "/program",
                })}
              >
                Programme
              </Link>
            </li>
            <li>
              <Link href="/#about">About </Link>
            </li>
            <li>
              <Link href="/#contact"> Contact</Link>
            </li>
          </ul>
          <button className="callus-btn">
            <i className="fa-solid fa-phone"></i> <span>45711258</span>
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
