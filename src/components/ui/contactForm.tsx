"use client";
import React from "react";
import toast from "react-hot-toast";

export default function ContactForm({
  type = "contact",
  reservation = {
    hotel: "",
    arrive: "",
    depart: "",
    nombreChambres: 0,
    typeChambre: "",
    chambre: "",
    service: 0,
    serviceName: "",
  },
  reservation_voyage = {
    periode: "",
    prix: "",
    destination: "",
  },
}) {
  const [formData, setFormData] = React.useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = React.useState("");

  // React.useEffect(() => {
  //   if (type === "reservation_hotel") {
  //     const reservationMessage = `J'aime bien réserver ${reservation?.nombreChambres} chambre(s) du ${reservation?.arrive} au ${reservation?.depart} dans ${reservation.hotel}, comprenant une chambre de type ${reservation?.chambre} avec le service ${reservation?.serviceName}. `;
  //     setFormData({
  //       ...formData,
  //       subject: `Demande Réservation ${reservation.hotel}`,
  //       message: reservationMessage,
  //     });
  //   }
  //   if (type === "reservation_voyage") {
  //     const reservationMessage = `J'aime bien réserver au voyage ${reservation_voyage?.destination}, avec l'offre ${reservation_voyage?.periode} `;
  //     setFormData({
  //       ...formData,
  //       subject: `Demande Réservation au voyage "${reservation_voyage.destination}"`,
  //       message: reservationMessage,
  //     });
  //   }
  // }, [reservation, reservation_voyage]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  }
  const [laoding, setLoading] = React.useState(false);

  let copyFormData = { ...formData };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (type === "reservation_hotel") {
      const reservationMessage = `J'aime bien réserver ${reservation?.nombreChambres} chambre(s) du ${reservation?.arrive} au ${reservation?.depart} dans ${reservation.hotel}, comprenant une chambre de type ${reservation?.chambre} avec le service ${reservation?.serviceName}. `;
      copyFormData = {
        ...formData,
        subject: `Demande Réservation ${reservation.hotel}`,
        message: reservationMessage,
      };
    }
    if (type === "reservation_voyage") {
      const reservationMessage = `J'aime bien réserver au voyage ${reservation_voyage?.destination}, avec l'offre ${reservation_voyage?.periode} `;
      copyFormData = {
        ...formData,
        subject: `Demande Réservation au voyage "${reservation_voyage.destination}"`,
        message: reservationMessage,
      };
    }
    try {
      setLoading(true);
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(copyFormData),
      });
      // const result = await res.json();
      if (res.ok) {
        toast.success("Email envoyé avec succès !", {
          duration: 4000,
        });
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          subject: "",
          message: "",
        });
      }
    } catch {
      toast.error("Échec de l'envoi de l'e-mail.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={formData.nom}
        name="nom"
        type="text"
        placeholder="Nom"
        required
      />
      <input
        onChange={handleChange}
        value={formData.prenom}
        name="prenom"
        type="text"
        placeholder="Prénom"
        required
      />
      <input
        onChange={handleChange}
        value={formData.email}
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        onChange={handleChange}
        value={formData.telephone}
        name="telephone"
        type="text"
        placeholder="Télephone"
        required
      />
      {type === "contact" && (
        <>
          <input
            onChange={handleChange}
            value={formData.subject}
            name="subject"
            type="text"
            placeholder="Sujet"
            required
            className="subject"
          />
          <textarea
            onChange={handleChange}
            value={formData.message}
            name="message"
            placeholder="Message"
            required
          ></textarea>
        </>
      )}
      <button disabled={laoding} type="submit" className="submit-btn">
        {laoding ? <span>loading..</span> : <span>Envoyer</span>}
      </button>
      {/* <p>{status}</p> */}
    </form>
  );
}
