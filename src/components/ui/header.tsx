"use client";

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
                className={pathname === "/programmes" ? "isActive" : ""}
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
                className={pathname === "/hotels" ? "isActive" : ""}
              >
                Hotels
              </Link>
            </li>
            <li>
              <Link
                style={blackStyle}
                href="/visa"
                className={pathname === "/visa" ? "isActive" : ""}
              >
                Visa
              </Link>
            </li>
            {contact.facebook && (
              <li>
                <a target="_blank" className="facebook" href={contact.facebook}>
                  Facebook
                </a>
              </li>
            )}
            {contact.instagram && (
              <li>
                <a
                  target="_blank"
                  className="instagram"
                  href={contact.instagram}
                >
                  instagram
                </a>
              </li>
            )}
          </ul>
          <button className="callus-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className="icon-text"
              viewBox="0 0 16 16"
            >
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
            </svg>{" "}
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
