"use client";

import React from "react";
import { client } from "@/sanity/client";
import toast from "react-hot-toast";

interface VisaFormProps {
  destination?: string;
  version?: number;
  offre?: Offre;
}

interface Offre {
  periode?: string;
  prix?: string;
  destination?: string;
}
export default function VisaForm({
  destination = "",
  version = 1,
  offre,
}: VisaFormProps) {
  const [formData, setFormData] = React.useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    passport: null,
  });
  const [laoding, setLoading] = React.useState(false);
  const [visaType, setVisaType] = React.useState({
    type: "Visa de transit",
    destination: "USA",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    if (name === "type" || name === "destination") {
      setVisaType((prevData) => ({ ...prevData, [name]: value }));
    }
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    let imageAsset;
    if (formData.passport) {
      imageAsset = await client.assets.upload("image", formData.passport);
    } else {
      throw new Error("Passport file is required.");
    }
    const demande = offre
      ? `Demande Visa: ${destination}, ${offre?.periode}`
      : destination === ""
        ? `Demande ${visaType.type}: ${visaType.destination}`
        : `Demande Visa: pour le programme  ${destination}`;

    try {
      await client.create({
        _type: "visa",
        ...formData,
        destination: destination !== "" ? destination : visaType.destination,
        type: destination !== "" ? "Visa touristique" : visaType.type,
        passport: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
      });
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          subject: `${demande}, `,
        }),
      });

      if (res.ok) {
        toast.success("Email envoyé avec succès !");
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          passport: null,
        });
      }
    } catch {
      toast.error("Échec de l'envoi de l'e-mail.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="visa-form-container" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={formData.nom}
        placeholder="Your nom"
        type="text"
        name="nom"
        required
      />
      <input
        onChange={handleChange}
        value={formData.prenom}
        placeholder="Your prenom"
        type="text"
        name="prenom"
        required
      />
      <input
        onChange={handleChange}
        value={formData.telephone}
        placeholder="telephone number"
        type="number"
        name="telephone"
        required
      />
      <input
        onChange={handleChange}
        value={formData.email}
        placeholder="Email"
        type="email"
        name="email"
        required
      />
      {version === 2 && (
        <>
          <select
            onChange={handleChange}
            name="destination"
            className="filter-select"
          >
            <option value="USA">USA</option>
            <option value="France">France</option>
            <option value="Allmagne">Allmagne</option>
            <option value="Portugal">Portugal</option>
          </select>
          <select onChange={handleChange} name="type" className="filter-select">
            <option value="Visa de transit">Visa de transit</option>
            <option value="Visa de travail">Visa de travail</option>
            <option value="Visa touristique">Visa touristique</option>
          </select>
        </>
      )}
      <div className="input-grp">
        <label htmlFor="passport">photo de votre passport</label>
        <input
          onChange={handleChange}
          placeholder="Passport"
          type="file"
          name="passport"
          accept="application/pdf,image/*"
          required
        />
      </div>
      <button disabled={laoding} type="submit" className="order-visa-btn">
        {laoding ? <span>loading...</span> : <span>Envoyer</span>}
      </button>
    </form>
  );
}
