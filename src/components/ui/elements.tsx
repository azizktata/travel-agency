import React from "react";

import Card from "./card";
import { HOTEL_QUERYResult, POST_3_QUERYResult } from "@/sanity/types";

export default function Elements({
  type = "voyage",
  hotels,
  posts,
}: {
  type?: string;
  hotels?: HOTEL_QUERYResult[];
  posts?: POST_3_QUERYResult[];
}) {
  if (type === "hotel") {
    return (
      <>
        {hotels?.map((hotel: unknown, index: number) => (
          <Card type={type} post={hotel} key={index} />
        ))}
      </>
    );
  }
  if (type === "voyage") {
    return (
      <>
        {posts?.map((post: unknown, index: number) => (
          <Card type={type} post={post} key={index} />
        ))}
      </>
    );
  }
}
