import Header from "@/components/ui/header";
import Image from "next/image";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/ui/footer";
import Link from "next/link";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Carousel from "@/components/carousel";
import Slider from "@/components/slider";
import Card from "@/components/card";

const options = { next: { revalidate: 60 } };

const PAGE_QUERY = defineQuery(`*[
_type=="page"][0]`);

const POST_QUERY = defineQuery(`*[
  _type == "post"
  ]`);
const POST_CART_QUERY = defineQuery(`*[
  _type == "post"
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
  const posts = await client.fetch(POST_QUERY, {}, options);
  const hotels = await client.fetch(HOTEL_QUERY, {}, options);
  const contact = await client.fetch(CONTACT_QUERY, {}, options);
  // const postImageUrl = post?.mainImage
  //   ? urlFor(post?.mainImage)?.width(300).height(200).url()
  //   : null;
  // const pageImg = page?.image ? urlFor(page?.image)?.url() : null;

  return (
    <main>
      <div className="carousel">
        <Header title={page?.logoName} contact={contact?.telephone} />
        <Carousel
          carousel={page?.carousel}
          titre={page?.titre}
          description={page?.description}
        />
      </div>

      {/* {posts?.length > 0 ? (
        <div className="voyages">
          <h2>Voyages Organisés</h2>
          {posts?.map((post, index) => (
            <div className="card">
              <Image
                src={
                  urlFor(post?.mainImage)?.width(300).height(200).url() ||
                  "/maldive.jpg"
                }
                alt="destination-2"
                layout="responsive"
                width={400}
                height={450}
                objectFit="cover"
              />
              <div>
                <h3>{post?.destination}</h3>

                <p>{post?.prix}</p>
              </div>
              <Link href="/program">
                {" "}
                <button>learn more </button>{" "}
              </Link>
            </div>
          ))}
        </div>
      ) : null} */}
      {posts?.length > 0 ? (
        <>
          <div className="voyages">
            <h2>Voyages organisés</h2>
            <Slider>
              {posts?.map((post, index) => <Card post={post} key={index} />)}
            </Slider>
          </div>
        </>
      ) : null}
      {posts?.length > 0 ? (
        <>
          <div className="voyages">
            <h2>Voyages a la carte</h2>
            <Slider>
              {posts?.map((post, index) => <Card post={post} key={index} />)}
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

      <div id="contact" className="contact">
        <h2>Contact Us</h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button className="submit-btn">Submit</button>
        </form>
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
