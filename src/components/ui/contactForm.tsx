"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function ContactForm() {
  const [formData, setFormData] = React.useState({
    nom: "",
    email: "",
    phone: "",
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
  const { pending } = useFormStatus();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();

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
      setFormData({ nom: "", email: "", phone: "", subject: "", message: "" });
    } else {
      setStatus("Failed to send email.");
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
        value={formData.email}
        name="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        onChange={handleChange}
        value={formData.phone}
        name="phone"
        type="text"
        placeholder="Télephone"
        required
      />
      <input
        onChange={handleChange}
        value={formData.subject}
        name="subject"
        type="text"
        placeholder="Subject"
        required
      />
      <textarea
        onChange={handleChange}
        value={formData.message}
        name="message"
        placeholder="Message"
        required
      ></textarea>
      <button disabled={pending} type="submit" className="submit-btn">
        {pending ? <span>loading..</span> : <span>Send</span>}
      </button>
      <p>{status}</p>
    </form>
  );
}
