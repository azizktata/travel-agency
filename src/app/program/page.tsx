import Header from "@/components/ui/header";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";

export default function Program() {
  return (
    <>
      <div className="program-main">
        <div className="program-container">
          <h1>Programme</h1>
          <Link className="accordion" href={"/"}>
            <i className="fa-solid fa-angle-left"></i> Home
          </Link>
          <h3>Notre Programme de mois</h3>
          <div className="program-cards">
            <div className="program-card">
              <h4>1er semaine</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="program-card">
              <h4>2eme semaine</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="program-card">
              <h4>3eme semaine</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="program-card">
              <h4>4eme semaine</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>

        <div className="visa-total">
          <div className="visa-order-container">
            <h4 className="order-title">Visa form</h4>
            <form className="visa-form-container">
              <input
                placeholder="Your Firstname"
                type="text"
                className="name"
              />
              <input placeholder="Your Lastname" type="text" className="name" />
              <input
                placeholder="Phone number"
                type="number"
                className="phone"
              />
              <input placeholder="Region" type="text" className="region" />
              <input placeholder="City" type="text" className="address" />
              <input
                placeholder="Your Address"
                type="text"
                className="address"
              />
              <button className="order-visa-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
