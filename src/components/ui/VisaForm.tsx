"use client";

import React from "react";
import { client } from "@/sanity/client";

export default function VisaForm() {
  const [formData, setFormData] = React.useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    passport: null,
  });

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
    let imageAsset;
    if (formData.passport) {
      imageAsset = await client.assets.upload("image", formData.passport);
    } else {
      throw new Error("Passport file is required.");
    }

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
      alert("Form submitted successfully!");
      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        passport: null,
      }); // Reset form
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
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
      <input
        onChange={handleChange}
        placeholder="Passport"
        type="file"
        name="passport" // Changed from 'address' to 'passport'
        accept="application/pdf,image/*" // Optional: Restrict file types
        required
      />
      <button type="submit" className="order-visa-btn">
        Submit
      </button>
    </form>
  );
}
