import Header from "@/components/ui/header";
import Image from "next/image";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/ui/footer";
import Link from "next/link";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const PAGE_QUERY = defineQuery(`*[
_type=="page"][0]`);

const POST_QUERY = defineQuery(`*[
  _type == "post"
  ][0]`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default async function Home() {
  const page = await client.fetch(PAGE_QUERY);
  const post = await client.fetch(POST_QUERY);
  const postImageUrl = post?.mainImage
    ? urlFor(post?.mainImage)?.width(300).height(200).url()
    : null;
  // const pageImg = page?.image ? urlFor(page?.image)?.url() : null;

  return (
    <main>
      <Header />
      <div className="carousel">
        <Image
          src={"/hero-desktop.jpg"}
          alt="hero"
          layout="fill"
          objectFit="cover"
        />
        <div className="carousel-content">
          <h1 className="carousel-title">
            {page?.titre || "Travels & Events"}
          </h1>

          {page?.description ? (
            <p className="description">{page?.description}</p>
          ) : (
            <p className="description">
              Welcome to Caprice Travel, your dedicated travel companion since
              2019. Our mission is to craft exceptional travel experiences that
              connect you with the world in ways that inspire
            </p>
          )}

          <Link href="/program">
            <button className="learn_more-btn"> learn more</button>
          </Link>
        </div>
      </div>

      <div className="services">
        <h2>Our Services</h2>
        <div className="service-cards">
          <div className="service-card color-1">
            <i className="icon fa-solid fa-map-location-dot"></i>
            <h3>Check Our Program</h3>
            <p>
              Explore our exclusive travel package this month, offering
              unforgettable adventures, relaxation, and cultural
              experiences—tailored just for you.
            </p>
          </div>
          <div className="service-card color-2">
            <i className=" icon fa-brands fa-cc-visa"></i>{" "}
            <h3>Post for a Visa</h3>
            <p>
              Need a visa for your next trip? Our visa application service
              ensures that you get your travel documents quickly and
              efficiently, so you can focus on planning your adventure.
            </p>
            <Link href="/program">
              learn more <i className="fa-solid fa-up-right-from-square"></i>
            </Link>
          </div>
          <div className="service-card color-3">
            <i className="icon fa-solid fa-person-hiking"></i>
            <h3>Pay and Go</h3>
            <p>
              Ready to embark on your journey? Pack your bags and get ready for
              an adventure of a lifetime!
            </p>
          </div>
        </div>
      </div>

      <div className="our_package">
        <h2>Our Program</h2>
        <div className="package-container">
          <Image
            src={postImageUrl || "https://via.placeholder.com/300x200"}
            alt="destination-2"
            layout="responsive"
            width={300}
            height={200}
            objectFit="cover"
          />

          <div className="package-details">
            <h3>
              <i className="fa-solid fa-location-dot"></i>
              <span> {post?.destination || "Marroc"} </span>
            </h3>
            <p>
              <i className="fa-regular fa-clock"></i>{" "}
              {post?.duration || "10 days"}
            </p>
            <p>
              <i className="fa-regular fa-calendar"></i>
              {post?.startDate || "2024-01-01"} -{" "}
              {post?.endDate || "2024-01-01"}
            </p>
          </div>
          <div className="price-container">
            <h3>
              {" "}
              <strong>{post?.prix || "0"} DT </strong>
            </h3>
            <div className="stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
            </div>
            <Link href="/program">
              <button>Voir details</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="destinations">
        <h2>Previous Destinations</h2>
        <div className="destination-cards">
          <div className="destination-card ">
            <Image
              src={"/destination-1.jpg"}
              alt="destination-1"
              layout="responsive"
              width={300}
              height={200}
              objectFit="cover"
            />
            <h3>
              <i className="fa-solid fa-location-dot"></i>
              <span> Paris, France </span>
            </h3>
          </div>
          <div className="destination-card ">
            <Image
              src={"/destination-1.jpg"}
              alt="destination-2"
              layout="responsive"
              width={300}
              height={200}
              objectFit="cover"
            />
            <h3>
              <i className="fa-solid fa-location-dot"></i>
              <span> Marroc </span>
            </h3>
          </div>

          <div className="destination-card ">
            <Image
              src={"/destination-1.jpg"}
              alt="destination-2"
              layout="responsive"
              width={300}
              height={200}
              objectFit="cover"
            />
            <h3>
              <i className="fa-solid fa-location-dot"></i>{" "}
              <span> Maldives </span>
            </h3>
          </div>
        </div>
      </div>

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

      <div className="bookNow">
        <div className="book-call">
          <h1>
            Ask for Your <span> Visa </span>
          </h1>
          <p>Demand visa for this Month program</p>
        </div>
        <Link href="/program">
          <button>
            Demand Now <i className="fa-solid fa-caret-right"></i>
          </button>
        </Link>
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

      <Footer />
      {/* <Carousel */}
    </main>
  );
}
