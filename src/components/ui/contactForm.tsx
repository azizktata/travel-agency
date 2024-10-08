"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function ContactForm() {
  const [formData, setFormData] = React.useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = React.useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    const value = e.target.value;
    const name = e.target.name;
    setFormData({ ...formData, [name]: value });
  }
  const [laoding, setLoading] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus("Email sent successfully!");
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          telephone: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setStatus("Failed to send email.");
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
      <input
        onChange={handleChange}
        value={formData.subject}
        name="subject"
        type="text"
        placeholder="Sujet"
        required
      />
      <textarea
        onChange={handleChange}
        value={formData.message}
        name="message"
        placeholder="Message"
        required
      ></textarea>
      <button disabled={laoding} type="submit" className="submit-btn">
        {laoding ? <span>loading..</span> : <span>Send</span>}
      </button>
      <p>{status}</p>
    </form>
  );
}
