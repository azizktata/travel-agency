import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import React from "react";

const options = { next: { revalidate: 60 } };

const VISAS_QUERY = defineQuery(`*[
    _type == "pageVisa"
    ]`);
export default async function Visas() {
  const visas = await client.fetch(VISAS_QUERY, {}, options);
  return (
    <>
      <Header change={true} title={undefined} />
      <div className="visa-page">
        <div className="visa-header">
          <div className="accordion">
            <Link href="..">Acceuil / </Link>
            <span> Visa </span>
          </div>
          <h3>Les different Types de Visas</h3>
        </div>
        <div className="visa-content">
          {visas?.map((visa, index) => (
            <div key={index}>
              <strong>{visa.type}</strong>
              <p>{visa.description}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
