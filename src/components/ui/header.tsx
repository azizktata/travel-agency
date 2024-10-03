"use client";
import React from "react";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <h1>Logo</h1>
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
              {" "}
              <a href="">Our Program</a>{" "}
            </li>
            <li>
              {" "}
              <a href="">About </a>{" "}
            </li>
            <li>
              {" "}
              <a href=""> Contact</a>{" "}
            </li>
          </ul>
        </nav>
        <button className="callus-btn">
          <i className="fa-solid fa-phone"></i> <span>45711258</span>
        </button>
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
