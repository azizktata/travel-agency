"use client";

import React from "react";
import VisaForm from "./ui/VisaForm";
import ContactForm from "./ui/contactForm";

export default function TarifVoyage({
  periodes,
  visa,
  destination,
}: {
  periodes: any;
  visa: any;
  destination: any;
}) {
  const [selectedPeriode, setSelectedPeriode] = React.useState({
    periode: "",
    prix: "",
    destination: destination,
  });

  const handlePeriodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = JSON.parse(e.target.value); // Parse the string back to an object

    setSelectedPeriode({
      ...selectedPeriode,
      periode: selectedValue.periode,
      prix: selectedValue.tarif,
    });
  };
  const [show, setShow] = React.useState(false);
  const isDisplayed = show ? { display: "block" } : { display: "none" };
  return (
    <div>
      {periodes && (
        <div className="tarifs">
          <h1>Tarifs</h1>
          <div className="tarifs-services-voyage">
            {periodes.map((periode: any) => (
              <div key={periode._key}>
                <input
                  type="radio"
                  id={periode._key}
                  name="periode" // Group the radio buttons
                  value={JSON.stringify(periode)}
                  onChange={handlePeriodeChange} // Handle change
                />
                <label htmlFor={periode._key}>
                  <i className="fa-solid fa-money-check-dollar"></i>
                  <span className="periode"> {periode.periode} </span>{" "}
                </label>
              </div>
            ))}
            <p className="tarifs-price">
              {selectedPeriode.prix && (
                <>
                  {selectedPeriode?.prix}
                  <span className="DT"> TND</span>
                </>
              )}{" "}
            </p>
          </div>
          <div className="tarifs-reserver">
            <button onClick={() => setShow((prev) => !prev)}>reserver</button>
          </div>
        </div>
      )}
      {visa == "visa-required" ? (
        <div style={isDisplayed} className="form-main">
          <h4 className="form-title">Réservation</h4>
          <VisaForm destination={destination} offre={selectedPeriode} />
        </div>
      ) : (
        <div style={isDisplayed} className="form-main">
          <h4 className="form-title">Réservation</h4>{" "}
          <ContactForm
            type="reservation_voyage"
            reservation_voyage={selectedPeriode}
          />
        </div>
      )}
    </div>
  );
}
