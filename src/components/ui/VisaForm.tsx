"use client";

import React from "react";
import { client } from "@/sanity/client";
import toast from "react-hot-toast";

export default function VisaForm({
  destination = "",
  offre = {},
}: {
  destination: string;
  offre: any;
}) {
  const [formData, setFormData] = React.useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    passport: null,
  });
  const [status, setStatus] = React.useState("");
  const [laoding, setLoading] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] })); // Save the file object
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
      : `Demande Visa: ${destination}`;

    try {
      await client.create({
        _type: "visa",
        ...formData,
        passport: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id, // Reference the uploaded image
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
        }); // Reset form
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
