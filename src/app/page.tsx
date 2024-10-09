import Header from "@/components/ui/header";
import Image from "next/image";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/ui/footer";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Carousel from "@/components/carousel";
import Slider from "@/components/slider";
import Card from "@/components/card";
import ContactForm from "@/components/ui/contactForm";

const options = { next: { revalidate: 60 } };

const PAGE_QUERY = defineQuery(`*[
_type=="page"][0]{
  titre,
  description,
  team,
  about
}`);

const POST_QUERY = defineQuery(`*[
  _type == "post" && type == "voyage-organise"
  ]`);
const POST_CART_QUERY = defineQuery(`*[
  _type == "post" && type == "voyage-carte"
  ]`);

const POST_3_QUERY = defineQuery(`*[
    _type == "post"
  ] | order(_createdAt desc)[0...3]`);

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

  return (
    <main>
      <div className="carousel">
        <Header />
        <Carousel
          carousel={posts || []}
          titre={page?.titre ?? undefined}
          description={page?.description ?? undefined}
        />
      </div>

      {posts_org?.length > 0 ? (
        <>
          <div className="voyages organise">
            <h2>Voyages organisés</h2>
            <Slider sliderClass="card-list">
              {posts_org?.map((post: any, index: number) => (
                <Card post={post} key={index} />
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
              {posts_cart?.map((post: any, index: number) => (
                <Card post={post} key={index} />
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
              {hotels?.map((hotel: any, index: number) => (
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
            src={teamImg || "/photo-grp.jpg"}
            alt="aboutus"
            width={300}
            height={200}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
          <div className="about-content">
            {page?.team?.activites
              ? page?.team?.activites.map((activite: string) => (
                  <div key={activite} className="program-card">
                    <p>
                      <i className="fa-solid fa-check"></i>
                      {activite}
                    </p>
                  </div>
                ))
              : null}{" "}
          </div>
        </div>
      )}
      <div id="about" className="about">
        <h2>Pourquoi nous choisir?</h2>
        <Image
          src={"/photo-grp.jpg"}
          alt="aboutus"
          width={300}
          height={200}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <div className="about-content">
          {page?.about ? (
            page.about
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

      <div className="location">
        <h2>Notre emplacement</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.6780880772712!2d10.25781777568998!3d36.85018497223294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd4aaa7de67f05%3A0x2107db4dcf53251c!2s1%20Rue%20du%20lac%2C%20Tunis!5e0!3m2!1sfr!2stn!4v1728110669533!5m2!1sfr!2stn"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <Footer />
      {/* <Carousel */}
    </main>
  );
}
