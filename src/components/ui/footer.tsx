"use client";

import React from "react";
import { usePageContext } from "@/app/context/PageContext";
import Link from "next/link";
export default function Footer() {
  const { contact, page } = usePageContext();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Your travel partner in exploring the best destinations.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href=".">Home</Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <Link href="/programmes">Voyages</Link>
            </li>
            <li>
              <Link href="/hotels">Hotels</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          {contact && (
            <>
              <h3>Contact Us</h3>
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.telephone}</p>
            </>
          )}
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a target="_blank" href={contact.fb}>
              <i className="fa-brands fa-facebook"></i>
            </a>
            {contact?.instagram && <i className="fa-brands fa-instagram"></i>}
            {contact?.instagram && <i className="fa-brands fa-instagram"></i>}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 {page.logoName} All rights reserved.</p>
      </div>
    </footer>
  );
}

{
  /* // <footer>
    //   <div className="socials">
    //     {contact?.fb && (
    //       <a target="_blank" href={contact.fb}>
    //         <i className="fa-brands fa-facebook"></i>
    //       </a>
    //     )}
    //     {contact?.instagram && <i className="fa-brands fa-instagram"></i>}
    //   </div>
    //   <p>
    //     {page?.logoName} | {contact?.email}
    //   </p>
    // </footer> */
}
