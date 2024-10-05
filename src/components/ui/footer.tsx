import React from "react";

export default function Footer({
  email = "caprice@caprice.com",
  fb = "https://www.facebook.com/Capricetravelandevents",
}) {
  return (
    <footer>
      <div className="socials">
        <a target="_blank" href={fb}>
          <i className="fa-brands fa-facebook"></i>
        </a>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-twitter"></i>
      </div>
      <p>© 2024 Travel Agency | {email}</p>
    </footer>
  );
}
