import Header from "@/components/ui/header";
import Image from "next/image";

import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "@/components/ui/footer";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="carousel">
        <Image
          src={"/hero-desktop.jpg"}
          alt="hero"
          layout="fill"
          objectFit="cover"
        />
        <div className="carousel-content">
          <h1 className="carousel-title">caprice travel & Event’s</h1>
          <p className="description">
            amco laboris nisi ut aliquip ex ea commodo coad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequatnsequat
          </p>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="service-card color-2">
            <i className=" icon fa-brands fa-cc-visa"></i>{" "}
            <h3>Post for a Visa</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Link href="/program">
              learn more <i className="fa-solid fa-up-right-from-square"></i>
            </Link>
          </div>
          <div className="service-card color-3">
            <i className="icon fa-solid fa-person-hiking"></i>
            <h3>Pay and Go</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>

      <div className="our_package">
        <h2>Our Program</h2>
        <div className="package-container">
          <Image
            src={"/destination-1.jpg"}
            alt="destination-2"
            layout="responsive"
            width={300}
            height={200}
            objectFit="cover"
          />

          <div className="package-details">
            <h3>
              <i className="fa-solid fa-location-dot"></i>
              <span> Paris, France </span>
            </h3>
            <p>
              <i className="fa-regular fa-clock"></i>7 Days
            </p>
            <p>
              <i className="fa-regular fa-calendar"></i>Availibility: Sept 2024
              - Dec 2024
            </p>
          </div>
          <div className="price-container">
            <h3>
              {" "}
              <strong>$2000 </strong>{" "}
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
              <i className="fa-solid fa-location-dot"></i>{" "}
              <span> Paris, France </span>
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
            aliquip ex ea commodo consequat ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
          </p>

          <div className="about-numbers">
            <div>
              <p>
                {" "}
                <strong>+12K </strong>{" "}
              </p>
              <p>Happy Customers</p>
            </div>
            <div>
              <p>
                {" "}
                <strong> +500</strong>
              </p>
              <p>Destinations</p>
            </div>
            <div>
              <p>
                {" "}
                <strong>+30 </strong>{" "}
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
          <p>Demand visa for this Month's program</p>
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
