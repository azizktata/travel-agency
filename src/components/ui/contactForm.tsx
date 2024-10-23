"use client";
import React from "react";
import toast from "react-hot-toast";

export default function ContactForm({
  type = "contact",
  reservation = {
    hotel: "",
    arrive: "",
    depart: "",
    nombreAdultes: 1,
    nombreEnfants: 0,
    ageEnfant1: 1,
    ageEnfant2: 1,
    ageEnfant3: 1,
    ageEnfant4: 1,
    nombreChambres: 0,
    typeChambre0: 0,
    typeChambre1: 0,
    typeChambre2: 0,
    typeChambre3: 0,
    chambre0: "",
    chambre1: "",
    chambre2: "",
    chambre3: "",
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
    noms: [
      {
        nom: "",
        prenom: "",
      },
    ],
    email: "",
    telephone: "",
    subject: "",
    message: "",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleInputChange(e: any) {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any, index: number) {
    const { name, value } = e.target;

    // Update the specific `nom` or `prenom` based on the index
    const updatedNoms = [...formData.noms];
    updatedNoms[index] = { ...updatedNoms[index], [name]: value };

    setFormData({ ...formData, noms: updatedNoms });
  }
  const [laoding, setLoading] = React.useState(false);

  let copyFormData = { ...formData };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (type === "reservation_hotel") {
      const chambreMessage = `comprenant ${Array.from(
        { length: reservation?.nombreChambres },
        (_, i) => ` ${reservation[`chambre${i}` as keyof typeof reservation]}`
      ).join(" et ")}`;
      const ageEnfants = `les enfants avec les ages: ${Array.from(
        { length: reservation?.nombreEnfants },
        (_, i) => `${reservation[`ageEnfant${i}` as keyof typeof reservation]}`
      ).join(" et ")}`;

      const lesMembresMessage = `Les membres sont: ${reservation.nombreAdultes} Adultes et ${reservation.nombreEnfants} Enfants, ${ageEnfants}`;
      const reservationMessage = `J'aime bien réserver ${reservation?.nombreChambres} chambre(s) du ${reservation?.arrive} au ${reservation?.depart} dans ${reservation.hotel}, ${chambreMessage} avec le service ${reservation?.serviceName}. ${lesMembresMessage}`;
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
          noms: [],
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
      {Array.from({ length: reservation.nombreAdultes }).map((_, i) => (
        <>
          <input
            onChange={(e) => handleChange(e, i)}
            value={formData.noms[i]?.nom || ""}
            name="nom"
            type="text"
            placeholder={`Nom Adulte ${i + 1}`}
            required
            key={i}
          />
          <input
            onChange={(e) => handleChange(e, i)}
            value={formData.noms[i]?.prenom || ""}
            name="prenom"
            type="text"
            placeholder={`Prénom Adulte ${i + 1}`}
            required
          />
        </>
      ))}
      <input
        onChange={handleInputChange}
        value={formData.email}
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        onChange={handleInputChange}
        value={formData.telephone}
        name="telephone"
        type="text"
        placeholder="Télephone"
        required
      />
      {type === "contact" && (
        <>
          <input
            onChange={handleInputChange}
            value={formData.subject}
            name="subject"
            type="text"
            placeholder="Sujet"
            required
            className="subject"
          />
          <textarea
            onChange={handleInputChange}
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
    </form>
  );
}
