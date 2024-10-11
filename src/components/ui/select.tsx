"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";

const _options = { next: { revalidate: 60 } };

const POST_QUERY_COUNT = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
  count(
    *[_type == "post" 
    ${typeFilter ? `&& type == "${typeFilter}"` : ""}
    ${destinationFilter ? `&& destination == "${destinationFilter}"` : ""}
    ]
  )
`);
const POST_QUERY4_COUNT = (typeFilter: string, destinationFilter: string) =>
  defineQuery(`
  count(
    *[_type == "hotel" 
    ${typeFilter ? `&& etoile == ${typeFilter}` : ""}
    ${destinationFilter ? `&& adresse == "${destinationFilter}"` : ""}
    ]
  )
`);

export default function Select({
  options,
  type = "voyage",
}: {
  options: string[];
  type: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    const name = e.target.name;
    const value = e.target.value;
    if (value !== 0) {
      router.push(pathname + "?" + createQueryString(name, value));
    }
    if (value == 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(pathname + "?" + params.toString());
    }
  }
  const currentType = searchParams.get("Type") || false;
  const [length, setLength] = React.useState(0);
  const typeFilter =
    type === "voyage"
      ? searchParams.get("Type") || ""
      : searchParams.get("etoile") || "";
  const destinationFilter = searchParams.get("destination") || "";

  React.useEffect(() => {
    async function fetchData() {
      const postsLength =
        type === "voyage"
          ? await client.fetch(
              POST_QUERY_COUNT(typeFilter, destinationFilter),
              {},
              _options
            )
          : await client.fetch(
              POST_QUERY4_COUNT(typeFilter, destinationFilter),
              {},
              _options
            );
      setLength(postsLength);
    }
    fetchData();
  }, [typeFilter, destinationFilter, type]);

  return (
    <div className="select-container">
      <div>
        {type === "voyage" ? (
          <select onChange={handleChange} name="Type" className="filter-select">
            <option value={0}>tous les voyages</option>
            <option
              selected={currentType === "voyage-organise"}
              value="voyage-organise"
            >
              Organisés
            </option>
            <option
              selected={currentType === "voyage-carte"}
              value="voyage-carte"
            >
              A la carte
            </option>
          </select>
        ) : (
          <select
            onChange={handleChange}
            name="etoile"
            className="filter-select"
          >
            <option value={0}>tous les hotels</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        )}

        <select
          onChange={handleChange}
          name="destination"
          className="filter-select"
        >
          <option value={0}>tous les destinations</option>
          {options?.map((destination: string) => (
            <option key={destination} value={destination}>
              {destination}
            </option>
          ))}
        </select>
      </div>
      <p>
        <strong>
          {" "}
          {length > 1 ? `${length} Programmes` : `${length} Programme`}{" "}
        </strong>
      </p>
    </div>
  );
}
