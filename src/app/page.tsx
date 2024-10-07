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
import { POST_CART_QUERYResult, POST_QUERYResult } from "@/sanity/types";

const options = { next: { revalidate: 60 } };

const PAGE_QUERY = defineQuery(`*[
_type=="page"][0]{
  ...,
  carousel[]{
    image,
    duree,
    destination
  }
}`);

const POST_QUERY = defineQuery(`*[
  _type == "post" && type == "voyage-organise"
  ]`);
const POST_CART_QUERY = defineQuery(`*[
  _type == "post" && type == "voyage-carte"
  ]`);
const HOTEL_QUERY = defineQuery(`*[
  _type == "hotel"
  ]`);
const CONTACT_QUERY = defineQuery(`*[
  _type == "contact"
  ][0]`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source).quality(100)
    : null;

export default async function Home() {
  const page = await client.fetch(PAGE_QUERY, {}, options);
  const posts_org = await client.fetch(POST_QUERY, {}, options);
  const posts_cart = await client.fetch(POST_CART_QUERY, {}, options);
  const hotels = await client.fetch(HOTEL_QUERY, {}, options);
  const contact = await client.fetch(CONTACT_QUERY, {}, options);
  // const postImageUrl = post?.mainImage
  //   ? urlFor(post?.mainImage)?.width(300).height(200).url()
  //   : null;
  // const pageImg = page?.image ? urlFor(page?.image)?.url() : null;

  return (
    <main>
      <div className="carousel">
        <Header
          title={page?.logoName}
          contact={contact?.telephone?.toString()}
        />
        <Carousel
          carousel={page?.carousel || []}
          titre={page?.titre}
          description={page?.description}
        />
      </div>

      {posts_org?.length > 0 ? (
        <>
          <div className="voyages">
            <h2>Voyages organisés</h2>
            <Slider>
              {posts_org?.map((post: POST_QUERYResult, index: number) => (
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
            <Slider>
              {posts_cart?.map((post: POST_CART_QUERYResult, index: number) => (
                <Card post={post} key={index} />
              ))}
            </Slider>
          </div>
        </>
      ) : null}
      {hotels?.length > 0 ? (
        <>
          <div className="voyages">
            <h2>Les Hotels</h2>
            <Slider>
              {hotels?.map((hotel, index) => (
                <Card post={hotel} key={index} type="hotel" />
              ))}
            </Slider>
          </div>
        </>
      ) : null}

      <div id="about" className="about">
        <h2>Why Choose Us ?</h2>
        <Image
          src={"/photo-grp.jpg"}
          alt="aboutus"
          layout="responsive"
          width={300}
          height={200}
          objectFit="cover"
        />
        <div className="about-content">
          {page?.about ? (
            page.about
          ) : (
            <p>
              Welcome to Caprice Travel, your dedicated travel companion since
              2019. Our mission is to craft exceptional travel experiences that
              connect you with the world in ways that inspire, rejuvenate, and
              enrich your life. Whether you’re seeking a beach escape, a
              cultural tour through Europe, or a thrilling adventure in the
              wild, we have you covered. Our experienced team of travel experts
              is passionate about delivering personalized service, curating
              trips that reflect your unique tastes and interests.
            </p>
          )}

          <div className="about-numbers">
            <div>
              <p>
                {" "}
                <strong>+10K </strong>{" "}
              </p>
              <p>Happy Customers</p>
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
              <p>Years of Experience</p>
            </div>
          </div>
        </div>
      </div>

      {page?.team ? (
        <div className="about">
          <h2>Team building</h2>
          <Image
            src={page?.team?.mainImage || "/hero-6.jpg"}
            alt="aboutus"
            layout="responsive"
            width={300}
            height={200}
            objectFit="cover"
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
      ) : null}

      <div id="contact" className="contact">
        <h2>Contact Us</h2>
        <ContactForm />
      </div>

      <div className="location">
        <h2>Our Location</h2>
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

      <Footer email={contact?.email} fb={contact?.facebook} />
      {/* <Carousel */}
    </main>
  );
}
