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
          <h3>Qui sommes-nous</h3>
          <p>
            Votre partenaire de voyage dans l'exploration des meilleures
            destinations.
          </p>
        </div>
        <div className="footer-section">
          <h3>Liens</h3>
          <ul>
            <li>
              <Link href=".">Accueil</Link>
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
              <h3>Contactez-nous</h3>
              <p>E-mail: {contact.email}</p>
              <p>télephone: {contact.telephone}</p>
            </>
          )}
        </div>
        <div className="footer-section">
          <h3>Suivez-nous</h3>
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
