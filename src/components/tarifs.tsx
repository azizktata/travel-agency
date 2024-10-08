"use client";
import React from "react";
import ContactForm from "./ui/contactForm";
import { toast } from "react-hot-toast";

export default function Tarifs({
  chambres,
  services,
  hotel = "",
  prix,
}: {
  chambres: any;
  services: any;
  hotel: string;
  prix: number;
}) {
  const [numberOfNights, setNumberOfNights] = React.useState(1);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [reserve, setReserve] = React.useState({
    hotel: hotel,
    arrive: today.toISOString().split("T")[0],
    depart: tomorrow.toISOString().split("T")[0],
    nombreChambres: 1,
    typeChambre: chambres?.[0]?.prix || prix,
    chambre: chambres?.[0]?.chambre || "",
    service: +services?.[0]?.prix || 0,
    serviceName: services?.[0]?.service || "",
    total: 0,
  });

  const [total, setTotal] = React.useState(0);
  const [show, setShow] = React.useState(false);
  const isDisplayed = show ? { display: "none" } : { display: "block" };
  // Update total when reserve state changes
  React.useEffect(() => {
    const arriveDate = new Date(reserve.arrive);
    const departDate = new Date(reserve.depart);
    const differenceInTime = departDate.getTime() - arriveDate.getTime();
    if (differenceInTime < 0) {
      toast.error(
        "Choisissez une date de départ antérieure à la date d'arrivée."
      );
      return;
    }

    const numberOfNights = differenceInTime / (1000 * 3600 * 24);
    const calculatedTotal =
      reserve.nombreChambres *
      (+reserve.typeChambre + +reserve.service) *
      numberOfNights;

    setTotal(calculatedTotal);

    setNumberOfNights(numberOfNights);
  }, [reserve]);

  const handleDateChange = (e: any) => {
    const { name, value } = e.target;
    setReserve((prevReserve) => ({ ...prevReserve, [name]: value }));
  };
  const handleChange = (e: any) => {
    const { name, value, selectedOptions } = e.target;
    const numericValue = parseFloat(value);
    setReserve((prevReserve) => ({ ...prevReserve, [name]: numericValue }));
    if (name === "service" && selectedOptions.length > 0) {
      const selectedKey = selectedOptions[0].getAttribute("data-key");
      setReserve((prevReserve) => ({
        ...prevReserve,
        serviceName: selectedKey,
      }));
    }

    if (name === "typeChambre" && selectedOptions.length > 0) {
      const selectedKey = selectedOptions[0].getAttribute("data-key");
      setReserve((prevReserve) => ({
        ...prevReserve,
        chambre: selectedKey,
      }));
    }
  };
  return (
    <>
      <div className="tarifs">
        <div className="tarifs-dates">
          <div className="input-grp">
            <label htmlFor="arrive">Début</label>
            <input
              onChange={handleDateChange}
              type="date"
              id="arrive"
              name="arrive"
              value={reserve.arrive}
            />
          </div>

          <div className="input-grp">
            <label htmlFor="depart">Fin</label>
            <input
              onChange={handleDateChange}
              type="date"
              id="depart"
              name="depart"
              value={reserve.depart}
            />
          </div>

          <p>{numberOfNights !== null ? `${numberOfNights} nuit(s)` : ""}</p>
        </div>

        <div className="tarifs-services">
          <div className="input-grp">
            <label htmlFor="nombre">Nombre</label>
            <select onChange={handleChange} name="nombreChambres" id="nombre">
              <option value={1}>1 chambre</option>
              <option value={2}>2 chambres</option>
              <option value={3}>3 chambres</option>
              <option value={4}>4 chambres</option>
            </select>
          </div>
          {chambres && (
            <div className="input-grp">
              <label htmlFor="chambre">Chambre</label>
              <select onChange={handleChange} name="typeChambre" id="chambre">
                {chambres?.map((c: any) => (
                  <option key={c.chamber} value={c.prix} data-key={c.chambre}>
                    {c.chambre}
                  </option>
                ))}
              </select>
            </div>
          )}
          {services && (
            <div className="input-grp">
              <label htmlFor="service">Service</label>
              <select onChange={handleChange} name="service" id="service">
                {services?.map((s: any) => (
                  <option key={s.service} value={s.prix} data-key={s.service}>
                    {s.service}
                  </option>
                ))}
              </select>
            </div>
          )}
          <p className="tarifs-price">
            {total} <span className="DT">TND</span>{" "}
          </p>
        </div>
        <div className="tarifs-reserver">
          <button onClick={() => setShow((prev) => !prev)}>réserver</button>
        </div>
      </div>
      <div style={isDisplayed} className="form-main">
        <h4 className="form-title">Formulaire de réservation</h4>{" "}
        <ContactForm type="reservation_hotel" reservation={reserve} />
      </div>
    </>
  );
}
