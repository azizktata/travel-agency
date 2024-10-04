import Header from "@/components/ui/header";
import { client } from "@/sanity/client";
import Image from "next/image";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { defineQuery } from "next-sanity";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY2 = defineQuery(`*[
  _type == "post"
  ][0]`);

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;
export default async function Program() {
  const post = await client.fetch(POST_QUERY2);
  const postImageUrl = post?.mainImage
    ? urlFor(post.mainImage)?.width(500).height(310).url()
    : null;

  return (
    <>
      <Header />
      <div className="program-main">
        <div className="program-container">
          <h1>{post?.titre || "Programme"}</h1>
          <Link className="accordion" href={"/"}>
            <i className="fa-solid fa-angle-left"></i> Home / Programme
          </Link>

          <Image
            src={postImageUrl || "https://via.placeholder.com/500x310"}
            alt="destination-2"
            layout="responsive"
            width={500}
            height={310}
            objectFit="cover"
          />

          <div className="program-cards">
            <h4> {post?.description} </h4>

            <h5>
              Destination: <span>{post?.destination} </span>{" "}
            </h5>

            <h5>
              Date:{" "}
              <span>
                {" "}
                {post?.startDate} - {post?.endDate}
              </span>{" "}
            </h5>

            <h5>
              Prix: <span>{post?.prix} </span>{" "}
            </h5>
            <h5>
              Duree: <span> {post?.duration}</span>{" "}
            </h5>
            {post?.activites &&
              post?.activites.map((activite: string) => (
                <div key={activite} className="program-card">
                  <p>{activite}</p>
                </div>
              ))}
            <br></br>
            <br></br>
          </div>
        </div>

        <div className="visa-total">
          <div className="visa-order-container">
            <h4 className="order-title">Visa form</h4>
            <form className="visa-form-container">
              <input
                placeholder="Your Firstname"
                type="text"
                className="name"
              />
              <input placeholder="Your Lastname" type="text" className="name" />
              <input
                placeholder="Phone number"
                type="number"
                className="phone"
              />
              <input placeholder="Region" type="text" className="region" />
              <input placeholder="City" type="text" className="address" />
              <input
                placeholder="Your Address"
                type="text"
                className="address"
              />
              <button className="order-visa-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
