import Header from "@/components/ui/header";
import Image from "next/image";

import Footer from "@/components/ui/footer";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Carousel from "@/components/ui/carousel";
import Slider from "@/components/ui/slider";
import Card from "@/components/ui/card";
import ContactForm from "@/components/ui/contactForm";
import { Hotel, Post } from "@/sanity/types";

const options = { next: { revalidate: 60 } };

const PAGE_QUERY = defineQuery(`*[
_type=="page"][0]{
  titre,
  description,
  team,
  about,
  aboutImg,
  emplacement
}`);

const POST_QUERY = defineQuery(`*[
  _type == "post" && type == "voyage-organise"
  ]`);
const POST_CART_QUERY = defineQuery(`*[
  _type == "post" && type == "voyage-carte"
  ]`);

const POST_3_QUERY = defineQuery(`*[
    _type == "post"
  ] | order(_updatedAt desc)[0...3]`);

const HOTEL_QUERY = defineQuery(`*[
  _type == "hotel"
  ]`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset })
        .image(source)
        .width(1920)
        .height(1080)
        .quality(80)
        .format("webp")
        .auto("format")
    : null;

export default async function Home() {
  const page = await client.fetch(PAGE_QUERY, {}, options);

  const posts_org = await client.fetch(POST_QUERY, {}, options);
  const posts_cart = await client.fetch(POST_CART_QUERY, {}, options);
  const posts = await client.fetch(POST_3_QUERY, {}, options);
  const hotels = await client.fetch(HOTEL_QUERY, {}, options);
  const teamImg = page?.team?.mainImage
    ? urlFor(page?.team?.mainImage)?.url()
    : null;
  const aboutImg = page?.aboutImg ? urlFor(page?.aboutImg)?.url() : null;

  return (
    <main>
      <div className="carousel">
        <Header />
        <Carousel carousel={posts || []} titre={page?.titre ?? undefined} />
      </div>

      {posts_org?.length > 0 ? (
        <>
          <div className="voyages organise">
            <h2>Voyages organisés</h2>
            <Slider sliderClass="card-list">
              {posts_org?.map((post: Post, index: number) => (
                <Card type="voyage" post={post} key={index} />
              ))}
            </Slider>
          </div>
        </>
      ) : null}
      {posts_cart?.length > 0 ? (
        <>
          <div className="voyages">
            <h2>Voyages a la carte</h2>
            <Slider sliderClass="card-list2">
              {posts_cart?.map((post: Post, index: number) => (
                <Card type="voyage" post={post} key={index} />
              ))}
            </Slider>
          </div>
        </>
      ) : null}
      {hotels?.length > 0 ? (
        <>
          <div className="voyages hotels">
            <h2>Les Hotels</h2>
            <Slider sliderClass="card-list3">
              {hotels?.map((hotel: Hotel, index: number) => (
                <Card post={hotel} key={index} type="hotel" />
              ))}
            </Slider>
          </div>
        </>
      ) : null}

      {page?.team && (
        <div className="about">
          <h2>Team building</h2>
          <Image
            src={teamImg || "/team1.jpg"}
            // src={"/team1.jpg"}
            alt="team building"
            width={300}
            height={200}
            loading="lazy"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <div className="about-content-activities">
            {page?.team?.activites
              ? page?.team?.activites.map((activite: string) => (
                  <div key={activite} className="program-card">
                    <p>{activite}</p>
                  </div>
                ))
              : null}{" "}
          </div>
        </div>
      )}
      <div id="about" className="about">
        <h2>Pourquoi nous choisir?</h2>
        <Image
          src={aboutImg || "/photo-grp.webp"}
          alt="aboutus"
          width={300}
          height={200}
          loading="lazy"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <div className="about-content">
          {page?.about ? (
            <p className="about-content-txt">{page.about}</p>
          ) : (
            <p>
              Bienvenue chez Caprice Travel, votre compagnon de voyage dévoué
              depuis 2019. Notre mission est de créer des expériences de voyage
              exceptionnelles qui vous connecter au monde de manière à inspirer,
              rajeunir et Enrichissez votre vie. Que vous soyez à la recherche
              d&apos;une escapade à la plage, d&apos;un voyage culturel à
              travers l&apos;Europe, ou une aventure palpitante dans le Sauvage,
              nous avons ce qu&apos;il vous faut. Notre équipe expérimentée
              d&apos;experts en voyages est passionné par la prestation
              d&apos;un service personnalisé, la conservation des voyages qui
              reflètent vos goûts et vos intérêts uniques.
            </p>
          )}

          <div className="about-numbers">
            <div>
              <p>
                {" "}
                <strong>+10K </strong>{" "}
              </p>
              <p>clients satisfaits</p>
            </div>
            <div>
              <p>
                {" "}
                <strong> +12</strong>
              </p>
              <p>Destinations</p>
            </div>
            <div>
              <p>
                {" "}
                <strong>+5 </strong>{" "}
              </p>
              <p>Années d'expérience</p>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="contact">
        <h2>Contactez-nous</h2>
        <ContactForm />
      </div>
      {page?.emplacement && (
        <div className="location">
          <h2>Notre emplacement</h2>
          <iframe
            src={page?.emplacement}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}

      <Footer />
    </main>
  );
}
